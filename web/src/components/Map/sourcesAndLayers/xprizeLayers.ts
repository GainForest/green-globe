type Layer = {
  name: string
  type: string
  endpoint: string
  description?: string
}

const hardcodedLayers: Layer[] = [
  {
    name: 'Global Human Modification',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/4f0a229d75c380f0d7f8e5f13304ab42-c97ef1b26c39d1c0d1eb1d0d8869c288/tiles/{z}/{x}/{y}`,
  },
  {
    name: 'Global Tree Canopy Height',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/a2b0f58bcf25eecaca86b49ea36b08f9-1a4c9f052c2cbc5b0790782d8585e1fa/tiles/{z}/{x}/{y}`,
  },
  {
    name: 'Soil PH',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/002161bbe9484ced930786c91ce240cb-61cd82b619f9286bcb3eeed71449e978/tiles/{z}/{x}/{y}`,
  },
  {
    name: 'Annual mean temperature',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/b44bc50a4ca22ddd5b0e761bc8f10db2-9213a54b93af54401407faa0cc954759/tiles/{z}/{x}/{y}',
  },
  {
    name: 'Population Density',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/7a5e5a6cbaae392790f5dc919e875b16-397f63f41861b69276955d3efb29006a/tiles/{z}/{x}/{y}',
  },
  {
    name: 'Total plant species',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/b28ea9733a2e920a4f92001e8f2881f5-3cd18280a31996613d07da494f665322/tiles/{z}/{x}/{y}',
  },
  {
    name: 'Tree Crown Delineations',
    type: 'geojson_line',
    endpoint: `${process.env.AWS_STORAGE}/layers/tree_crowns.geojson`,
    description: 'Outlines the canopy extents of individual trees.',
  },
  {
    name: 'Toca do Tatu Drone Flights',
    type: 'tms_tile',
    endpoint: `${process.env.AWS_STORAGE}/layers/tms_tiles/{z}/{x}/{y}.png`,
    description: 'High-resolution drone layer of the competition area.',
  },
  {
    name: 'Tumbira SkySat April 14th',
    type: 'raster_tif',
    endpoint: `${process.env.TITILER_ENDPOINT}/layers/competition_area_drone_cog.tif`,
    description: 'High-resolution PlanetLabs SkySat layer of the Tumbira region.',
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
  // These need to be converted.
  // {
  //   name: 'Temperature of Warmest Month',
  //   type: 'raster_tif',
  //   endpoint: `${process.env.TITILER_ENDPOINT}/layers/global_ecological_layers/CHELSA_BIO_Annual_Mean_Temperature_webmercator.tif`,
  //   description: 'Source: CHELSA BIO',
  // },
  // {
  //   name: 'Annual Precipitation',
  //   type: 'raster_tif',
  //   endpoint: `${process.env.TITILER_ENDPOINT}/layers/global_ecological_layers/CHELSA_BIO_Annual_Precipitation.tif`,
  // },
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
      description: `Areas of deforestation in ${year}`,
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
      description: `Areas of regrowth in ${year}`,
    })
  }
  return tumbiraTifArray
}

export const layersData: Layer[] = [
  ...hardcodedLayers,
  ...tumbiraDeforestationData(),
  ...tumbiraRegrowthData(),
]
