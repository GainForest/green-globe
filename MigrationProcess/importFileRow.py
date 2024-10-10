import csv
import requests
import time
import os
import pandas as pd
from dotenv import load_dotenv

load_dotenv()


LOG_CSV = 'upload_errors_log.csv'
DIRECTUS_URL = os.getenv('DIRECTUS_URL')
DIRECTUS_TOKEN = os.getenv('DIRECTUS_TOKEN')
CSV_FILE = os.getenv('CSV_FILE')
COLLECTION_NAME = os.getenv('COLLECTION_NAME')
IMAGE_FIELD = os.getenv('IMAGE_FIELD')
FOLDER_ID = os.getenv('FOLDER_ID')
MAX_RETRIES = 5
RETRY_DELAY = 5

fetch_failures = 0
check_failures = 0
upload_failures = 0
update_failures = 0
item = 0

headers = {
    'Authorization': f'Bearer {DIRECTUS_TOKEN}'
}

#GET UPLOAD ERRORS AND STORE FOR ReRun
def log_error(legacyId, photo_url, file_name):
    log_data = {
        'legacyId': [legacyId],
        'photo_url': [photo_url],
        'file_name': [file_name]
    }
    log_df = pd.DataFrame(log_data)
    if not os.path.exists(LOG_CSV):
        log_df.to_csv(LOG_CSV, mode='w', header=True, index=False)
    else:
        log_df.to_csv(LOG_CSV, mode='a', header=False, index=False)

#GET THE PROJECT ID TO UPDATE REFERENCING THE CURRENT COLLECTION
def get_project_id_by_legacy(legacyId):
    global fetch_failures 
    for attempt in range(MAX_RETRIES):
        try:
            response = requests.get(f'{DIRECTUS_URL}/items/project', headers=headers, params={'filter[legacyId][_eq]': legacyId})
            if response.status_code == 200 and response.json()['data']:
                return response.json()['data'][0]['id']
            else:
                fetch_failures += 1
                print(f"Failed to find projectid, will try until max attempts")
        except Exception as e:
                fetch_failures += 1
                print(f"Attempt {attempt + 1} to find project failed: {e}")
                if attempt < MAX_RETRIES - 1:
                    print(f"Waiting {RETRY_DELAY} seconds before retrying...")
                    time.sleep(RETRY_DELAY)
                else:
                    print(f"Max retries reached for finding id")
    return None

#GET ASSET ID ON THE CURRENT COLECTION FOR THE MIGRATION
def get_asset_id_by_legacy(legacyId):
    global fetch_failures
    for attempt in range(MAX_RETRIES):
        try:
            response = requests.get(f'{DIRECTUS_URL}/items/{COLLECTION_NAME}', headers=headers, params={'filter[legacyId][_eq]': legacyId,'filter[name][_eq]': file_name})
            if response.status_code == 200 and response.json()['data']:
                return response.json()['data'][0]['id']
            else:
                print(f"Failed to find projectid, will try until max attempts")
                fetch_failures += 1
        except Exception as e:
                fetch_failures += 1
                print(f"Attempt {attempt + 1} to find project failed: {e}")
                if attempt < MAX_RETRIES - 1:
                    print(f"Waiting {RETRY_DELAY} seconds before retrying...")
                    time.sleep(RETRY_DELAY)
                else:
                    print(f"Max retries reached for finding id")
    return None

#VERIFY DUPLICATE AND CORRUPTED FILES BEFORE UPDLOAD
def check_existing_file(disk_filename, file_size):
    global check_failures
    params = {
        'filter[filename_download][_eq]': disk_filename,
    }
    for attempt in range(MAX_RETRIES):
        try:
            response = requests.get(f'{DIRECTUS_URL}/files', headers=headers, params=params)

            if response.status_code == 200:
                files = response.json().get('data', [])
                for file in files:
                    expected_size = file.get('filesize', 0)
                    expected_size = int(expected_size)
                    if expected_size > 0:
                        if file_size == expected_size:
                            print(f"File {disk_filename} already exists with correct size: {file_size} bytes")
                            return True
                        else:
                            print(f"File {disk_filename} exists but has different size: {file_size} bytes (expected {expected_size} bytes)")
                            return False
                print(f"No previous file found with name {disk_filename}")
                return False
            elif response.status_code == 503:
                check_failures += 1
                print(f"Server unavailable (503), retrying attempt {attempt + 1} of {MAX_RETRIES}")
            else:
                print(f"Failed with status code {response.status_code}")
                return False

        except Exception as e:
            print(f"Failed to check existing file: {e}")

        if attempt < MAX_RETRIES - 1:
            time.sleep(RETRY_DELAY)
        else:
            print(f"Max retries reached: {MAX_RETRIES} failed attempts")
            return False
    return False

#GET FILE
def import_image(legacyId,photo_url,file_name):
  global upload_failures, update_failures, item
  print("--- Row #",item,"---")  
  
  project_id = get_project_id_by_legacy(legacyId)
  print("Found the projectId for update", (project_id), " by filtering legacyId on csv")
  if not project_id:
        print(f"Fail to find project with {legacyId}")
        return None
  
  asset_id = get_asset_id_by_legacy(legacyId)
  print("Found the assetId for update", (asset_id), " by filtering legacyId on csv")
  if not project_id:
        print(f"Fail to find asset with {legacyId}")
        return None
  
  response = requests.get(photo_url)
  if response.status_code != 200:
        print(f"Fail to download: {photo_url}")
        return None

  # GET FILE NAME
  #file_name = os.path.basename(photo_url) or f"{file_name}.jpg"
  temp_file_name = f"{os.path.splitext(file_name)[0]}.jpg"

  # SAVE TEMP FILE
  with open(temp_file_name, 'wb') as f:
        f.write(response.content)

  # Verifica o tamanho do arquivo baixado
  file_size = os.path.getsize(temp_file_name)

  if check_existing_file(file_name, file_size):
        print(f"File {file_name} already exists, skipping upload.")
        os.remove(temp_file_name)
        return None

  # PREPARE TO UPLOAD
  files = {'file': (file_name, open(temp_file_name, 'rb'), 'image/jpeg')}
  data = {
        'folder': FOLDER_ID
    }
  
  # START TRY UPLOAD IMAGE ON DIRECTUS
  for attempt in range(1):
        try:
            # UPLOAD TO DIRECTUS FILES
                response = requests.post(f'{DIRECTUS_URL}/files', headers=headers, files=files, data=data)
                if response.status_code == 200:
                        file_id = response.json()['data']['id']
                        print(f"Uploaded on attempt: {attempt + 1}")
                        break
                else:
                    print(f"Upload attempt {attempt + 1} failed with response: {response.status_code}\n")
                    upload_failures += 1
                    log_error(legacyId,photo_url,file_name)
        except Exception as e:
                print(f"Failed on attempt: {attempt + 1}: {e}\n")
                log_error(legacyId,photo_url,file_name)
                upload_failures += 1

        if attempt < 1:
                print(f"Waiting {RETRY_DELAY} seconds before new try...\n")
                time.sleep(RETRY_DELAY)
        else:
                print(f"Max attempts reached: {MAX_RETRIES} failed attempts\n")
                os.remove(file_name)
                return None

  os.remove(temp_file_name)

  # TRY TO UPDATE PROJECT WITH FILE
  for attempt in range(1):
        try:
            # UPDATE THE FILE INTO PROJECT VIA ID
            data = {
                IMAGE_FIELD: file_id,
                'projectId': project_id
            }
            response = requests.patch(f'{DIRECTUS_URL}/items/{COLLECTION_NAME}/{asset_id}', headers=headers, json=data)
            if response.status_code == 200:
                print(f"Updated asset entry {asset_id} on attempt: {attempt + 1}\n")
                return file_id
            else:
                print(f"Update Attempt: {attempt + 1} failed with response: {response.status_code}\n")
                update_failures += 1
        except Exception as e:
            print(f"Failed asset update on attempt: {attempt + 1} {e}\n")
            update_failures += 1

        if attempt < 1:
            print(f"Waiting {RETRY_DELAY} seconds before new continue...\n")
            time.sleep(RETRY_DELAY)
        else:
            print(f"Failed to upload asset {asset_id} after max tries\n")
            return None
  return None
  
  # READ THE CSV CONTAINING [ID,URL]
with open(CSV_FILE, 'r') as csvfile:
    csvreader = csv.DictReader(csvfile)
    for row in csvreader:
        item += 1
        project_id = row['legacyId'] #id used for migration
        photo_url = row['photo_url'] #photo_url is aws_storage+awsCID
        file_name = row['file_name'] #get the name
        result = import_image(project_id,photo_url,file_name)
        if result:
            print(f"File uploaded\n ---------------\n")
        else:
            print(f"File not uploaded\n ---------------")

# Log
print(f"\n--Total upload fails: {upload_failures} --")
print(f"--Total update fails: {update_failures} --")
print(f"--Total fetch fails: {fetch_failures} --")

