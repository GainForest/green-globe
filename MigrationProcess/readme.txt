For the Import File Row
Instructions:
  - Configure the .env with
  DIRECTUS_TOKEN = '***' -- access token for directus  
  DIRECTUS_URL = 'https://directus.gainforest.app' -- directus.gainforest.app
  CSV_FILE = 'communityPhotos.csv'  -- the name of the csv file
  COLLECTION_NAME = 'communityPhotos'-- the name of the colection to be imported
  IMAGE_FIELD = 'communityPhoto' -- the image field that will be imported
  FOLDER_ID = '4c415350-9ce5-4a2f-b686-9cb88bea27b5' -- the folder id created on directus library
    
  - Configure the csv to be read with three collumn names and its data recovered in database query
  -- legacyId
  -- photo_url
  -- file_name
  #We can change this convention later


  For the csv used to geojson convertion
  -- we need the names of the collumns at the csv to be read as lat, lon, height, diameter, species, dateMeasured, treeKoboUrl, leafKoboUrl, barkKoboUrl, recordKobboUrl   
  #We can change this convention later
  
    
    
