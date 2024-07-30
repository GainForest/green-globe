# Running XPRIZE Locally

Start by installing dependencies:

```
yarn install
```

Then change into that directory and start the development server:

```
cd xprize
yarn redwood dev
```

Your browser should automatically open to http://localhost:8910.

# How to upload data locally

All data must be stored in the `public/data` folder. You'll see folders for audio, drone, edna, and flight paths, accordingly.

# Drone Files

# Displaying Drone Flight Paths

Extract your flight paths from a DJI drone flight: They're either .srt or .csv files. Run the script found in github.com/GainForest/scripts/drone-paths to convert them to `.geojson` files and move those output files into this folder. Update `config.ts` accordingly, with the flight path. Sample geojsons have been provided.