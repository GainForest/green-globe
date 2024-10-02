import csv
import requests
import time
import os
from dotenv import load_dotenv

load_dotenv()

DIRECTUS_URL = os.getenv('DIRECTUS_URL')
DIRECTUS_TOKEN = os.getenv('DIRECTUS_TOKEN')
CSV_FILE = os.getenv('CSV_FILE')
COLLECTION_NAME = os.getenv('COLLECTION_NAME')
IMAGE_FIELD = os.getenv('IMAGE_FIELD')
FOLDER_ID = os.getenv('FOLDER_ID')
MAX_RETRIES = 5
RETRY_DELAY = 5

upload_failures = 0
update_failures = 0

headers = {
    'Authorization': f'Bearer {DIRECTUS_TOKEN}'
}

#GET THE PROJECT ID TO UPDATE
def get_project_id_by_legacy(legacyId):
    for attempt in range(MAX_RETRIES):
        try:
            response = requests.get(f'{DIRECTUS_URL}/items/project', headers=headers, params={'filter[legacyId][_eq]': legacyId})
            if response.status_code == 200 and response.json()['data']:
                return response.json()['data'][0]['id']
            else:
                print(f"Failed to find projectid, will try until max attempts")
        except Exception as e:
                print(f"Attempt {attempt + 1} to find project failed: {e}")
                if attempt < MAX_RETRIES - 1:
                    print(f"Waiting {RETRY_DELAY} seconds before retrying...")
                    time.sleep(RETRY_DELAY)
                else:
                    print(f"Max retries reached for finding id")
    return None

def get_asset_id_by_legacy(legacyId):
    for attempt in range(MAX_RETRIES):
        try:
            response = requests.get(f'{DIRECTUS_URL}/items/communityPhotos', headers=headers, params={'filter[legacyId][_eq]': legacyId,'filter[name][_eq]': file_name})
            if response.status_code == 200 and response.json()['data']:
                return response.json()['data'][0]['id']
            else:
                print(f"Failed to find projectid, will try until max attempts")
        except Exception as e:
                print(f"Attempt {attempt + 1} to find project failed: {e}")
                if attempt < MAX_RETRIES - 1:
                    print(f"Waiting {RETRY_DELAY} seconds before retrying...")
                    time.sleep(RETRY_DELAY)
                else:
                    print(f"Max retries reached for finding id")
    return None

def check_existing_file(disk_filename, file_size):
    params = {
        'filter[filename_download][_eq]': disk_filename,
        'filter[filesize][_eq]': file_size
    }
    print(disk_filename)
    print(file_size)
    response = requests.get(f'{DIRECTUS_URL}/files', headers=headers, params=params)
    if response.status_code == 200 and response.json()['data']:
        print('2')
        return True  
    print('3')
    return False

#GET FILE
def import_image(legacyId,photo_url,file_name):
  global upload_failures, update_failures
  
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
        print(f"File {file_name} already exists and is not corrupted, skipping upload.")
        os.remove(temp_file_name)
        return None

  # PREPARE TO UPLOAD
  files = {'file': (file_name, open(temp_file_name, 'rb'), 'image/jpeg')}
  data = {
        'folder': FOLDER_ID
    }

  # START TRY UPLOAD IMAGE ON DIRECTUS
  for attempt in range(MAX_RETRIES):
        try:
          # UPLOAD TO DIRECTUS FILES
            response = requests.post(f'{DIRECTUS_URL}/files', headers=headers, files=files, data=data)

            if response.status_code == 200:
                print(f"\nUploaded on attempt: {attempt + 1}\n")
                file_id = response.json()['data']['id']
                break
            else:
                print(f"\nUpload attempt {attempt + 1} failed with response: {response.status_code}\n")
                upload_failures += 1
        except Exception as e:
            print(f"\nFailed on attempt: {attempt + 1}: {e}\n")
            upload_failures += 1

        if attempt < MAX_RETRIES - 1:
            print(f"\nWaiting {RETRY_DELAY} seconds before new try...\n")
            time.sleep(RETRY_DELAY)
        else:
            print(f"\nMax attempts reached: {MAX_RETRIES} failed attempts\n")
            os.remove(file_name)
            return None

  os.remove(temp_file_name)

  # TRY TO UPDATE PROJECT WITH FILE
  for attempt in range(MAX_RETRIES):
        try:
            # UPDATE THE FILE INTO PROJECT VIA ID
            data = {
                IMAGE_FIELD: file_id,
                'projectId': project_id
            }
            response = requests.patch(f'{DIRECTUS_URL}/items/{COLLECTION_NAME}/{asset_id}', headers=headers, json=data)
            if response.status_code == 200:
                print(f"\nUpdated asset entry {asset_id} on attempt: {attempt + 1}\n")
                return file_id
            else:
                print(f"\nUpdate Attempt: {attempt + 1} failed with response: {response.status_code}\n")
                update_failures += 1
        except Exception as e:
            print(f"\nFailed asset update on attempt: {attempt + 1} {e}\n")
            update_failures += 1

        if attempt < MAX_RETRIES - 1:
            print(f"\nWaiting {RETRY_DELAY} seconds before new try...\n")
            time.sleep(RETRY_DELAY)
        else:
            print(f"\nFailed to upload asset {asset_id} after {MAX_RETRIES} tries\n")
            return None
  return None
  
  # READ THE CSV CONTAINING [ID,URL]
with open(CSV_FILE, 'r') as csvfile:
    csvreader = csv.DictReader(csvfile)
    for row in csvreader:
        project_id = row['legacyId'] #id used for migration
        photo_url = row['communityPhoto'] #coverPhoto is aws_storage+awsCID
        file_name = row['name'] #get the name
        result = import_image(project_id,photo_url,file_name)
        if result:
            print(f"File uploaded\n")
        else:
            print(f"Failed to upload file\n")

# Log
print(f"\n--Total upload fails: {upload_failures}--")
print(f"\n--Total update fails: {update_failures}--")

