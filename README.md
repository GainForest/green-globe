# Welcome to the Green Globe! 

The Green Globe is GainForest's central hub for visualizing and understanding environmental data from around the world. The goal of our platform is to help researchers, funders, and citizens make informed decisions about our planet's future.

# Running the Green Globe

Start by installing dependencies:

```
yarn install
```

Then change into that directory and start the development server:

```
yarn redwood dev
```

Your browser should automatically open to http://localhost:8910.


# How to upload data locally

All data must be stored in the `public/data` folder. You'll see folders for audio, drone, edna, and flight paths, accordingly.

# Displaying Drone Flight Paths

Extract your flight paths from a DJI drone flight: They're either .srt or .csv files. Run the script found in github.com/GainForest/scripts/drone-paths to convert them to `.geojson` files and move those output files into this folder. Update `config.ts` accordingly, with the flight path. Sample geojsons have been provided.

# How can I contribute? 

Have an idea that you would like to build? Join our telegram group and let us know your proposal! 

https://t.me/+g9KzmLsZh882YWE1

More in-depth documentation coming soon. 
