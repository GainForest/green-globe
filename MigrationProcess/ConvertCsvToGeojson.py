import pandas as pd
import json

df = pd.read_csv('GFtoGeo.csv')
#df.head()

# Convert current row into a geojson feature
def row_to_geojson_feature(row):
    return {
        "type": "Feature",
        "properties": row.drop(['lat', 'lon']).to_dict(), #Remove lat and lon from properties
        "geometry": {
            "type": "Point",
            "coordinates": [row['lon'], row['lat']]  # GeoJSON using [lon, lat]
        }
    }

#GeoJSON Features
features = df.apply(row_to_geojson_feature, axis=1).tolist()

#FeatureCollection GeoJSON
geojson = {
    "type": "FeatureCollection",
    "features": features
}

geojson_str = json.dumps(geojson, indent=4)

# Save GeoJSON
with open('output.geojson', 'w') as geojson_file:
    json.dump(geojson, geojson_file, indent=4)

#print("GeoJSON saved as'output.geojson'.")

