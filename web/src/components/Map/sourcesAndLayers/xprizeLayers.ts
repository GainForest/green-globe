type Layer = {
  name: string
  type: string
  endpoint: string
  description?: string
}

const hardcodedLayers: Layer[] = [
  {
    name: 'Tree Crown Delineations',
    type: 'geojson_line',
    endpoint: `${process.env.AWS_STORAGE}/layers/tree_crowns.geojson`,
    description: 'Outlines the canopy extents of individual trees.',
  },
  {
    name: 'Drone Flights',
    type: 'tms_tile',
    endpoint: `${process.env.AWS_STORAGE}/layers/tms_tiles/{z}/{x}/{y}.png`,
    description: 'High-resolution drone layer of the competition area.',
  },
  {
    name: 'Tumbira Drone Flights',
    type: 'raster_tif',
    endpoint: `${process.env.TITILER_ENDPOINT}/layers/competition_area_drone_cog.tif`,
    description: 'High-resolution drone layer of the Tumbira region.',
  },
  {
    name: 'PM 2.5 (MK Tau)',
    type: 'raster_tif',
    endpoint: `${process.env.TITILER_ENDPOINT}/layers/pm2.5/FinalSite_RescaleAOD_01-22_MK_tau_rescaled.tif`,
    description:
      'Measures increased pollution. Darker colors represent increases in levels of PM2.5 (particulate matter of less than 2.5 micrometers) between 2001 and 2022.',
  },
  {
    name: 'PM 2.5 (MK Tau 95% Confidence Level)',
    type: 'raster_tif',
    endpoint: `${process.env.TITILER_ENDPOINT}/layers/pm2.5/FinalSite_RescaleAOD_01-22_MK_tau_95Signif_rescaled.tif`,
    description:
      'Measures increased pollution. Darker colors represent increases in levels of PM2.5 (particulate matter of less than 2.5 micrometers) between 2001 and 2022.',
  },
  {
    name: 'Tumbira Regrowth (Year of regrowth)',
    type: 'raster_tif',
    endpoint: `${process.env.TITILER_ENDPOINT}/layers/tumbira_deforestation/tumbira_deforestation_yod.tif`,
  },
  {
    name: 'Temperature of Warmest Month',
    type: 'raster_tif',
    endpoint: `${process.env.TITILER_ENDPOINT}/layers/global_ecological_layers/CHELSA_BIO_Annual_Mean_Temperature_webmercator.tif`,
    description: 'Source: CHELSA BIO',
  },
  {
    name: 'Annual Precipitation',
    type: 'raster_tif',
    endpoint: `${process.env.TITILER_ENDPOINT}/layers/global_ecological_layers/CHELSA_BIO_Annual_Precipitation.tif`,
  },
  {
    name: 'NICFI Tiles',
    type: 'raster_tif',
    endpoint: `${process.env.TITILER_ENDPOINT}/layers/nicfi/`,
    tilePattern: 'L15-{x}E-{y}N.tif',
    tileRange: {
      x: { min: 677, max: 683 },
      y: { min: 1004, max: 1008 },
    },
  },
]

const tumbiraDeforestationData = (): Layer[] => {
  const tumbiraTifArray = []
  for (let year = 1985; year <= 2023; year++) {
    tumbiraTifArray.push({
      name: `Tumbira Deforestation ${year}`,
      type: 'raster_tif',
      endpoint: `${process.env.TITILER_ENDPOINT}/layers/tumbira_deforestation/tumbira_deforestation_yod_${year}.tif`,
    })
  }
  return tumbiraTifArray
}

const tumbiraRegrowthData = (): Layer[] => {
  const tumbiraTifArray = []
  for (let year = 1985; year <= 2023; year++) {
    tumbiraTifArray.push({
      name: `Tumbira Regrowth ${year}`,
      type: 'raster_tif',
      endpoint: `${process.env.TITILER_ENDPOINT}/layers/tumbira_regrowth/tumbira_regrowth_yod_${year}.tif`,
    })
  }
  return tumbiraTifArray
}

export const layersData: Layer[] = [
  ...hardcodedLayers,
  ...tumbiraDeforestationData(),
  ...tumbiraRegrowthData(),
]
