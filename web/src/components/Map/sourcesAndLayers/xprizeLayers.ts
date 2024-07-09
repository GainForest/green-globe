import { GeospatialLayer } from 'src/types'

const hardcodedLayers: GeospatialLayer[] = [
  {
    name: 'Illegal mining',
    type: 'geojson_points',
    endpoint: `${process.env.AWS_STORAGE}/layers/illegal-mining.geojson`,
    description: 'Source: Earthrise Media',
    category: 'Illegal Activity',
  },
  {
    name: 'Illegal Airstrips',
    type: 'geojson_points',
    endpoint: `${process.env.AWS_STORAGE}/layers/illegal-airstrips-nyt-intercept-public.geojson`,
    description: 'Source: Earthrise Media',
    category: 'Illegal Activity',
  },
  {
    name: 'Species Richness',
    type: 'choropleth',
    endpoint: `${process.env.AWS_STORAGE}/layers/species_richness/example-project.geojson`,
    description:
      'Choropleth layer detailing the level of species richness for each grid.',
    category: 'tumbira',
    legend: 'species_richness',
  },
  {
    name: 'Global Tree Canopy Height',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/a2b0f58bcf25eecaca86b49ea36b08f9-0fe8ae80f3bc89b5bebb9f1fbf12ef3e/tiles/{z}/{x}/{y}',
    description:
      'Tolan et al (2024). Tree canopy height, with a resolution of 1m per pixel. Estimates are based on a self-supervised model trained on Maxar imagery from 2017 to 2020, with model validation via use of aerial lidar maps.',
    category: 'carbon related data layers',
  },
  {
    name: 'Forest Carbon Potential',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/ac40136bfe92501e6ca9261828925ac9-b46bee21d8baece64621717cba262873/tiles/{z}/{x}/{y}',
    description:
      'Mo et al. 2023. This resource contains information about the global unrealized potential for above ground carbon storage in forest ecosystems. The map provides an estimate for the tonnes of carbon per hectare that would be stored in forests if fully mature native plants were allowed to recover in a given area. Areas unsuitable for supporting forest cover – including grassland and dryland habitats – are displayed in black. Areas unable to support natural forest cover are masked out.',
    category: 'carbon related data layers',
  },
  {
    name: 'Above Ground Woody Biomass - Current',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/c46da94543333e1232b2c14ab8a6b777-3c87cba7479cf56ad2c2de31663404f6/tiles/{z}/{x}/{y}',
    description:
      'Walker et al (2022). Data layer of current mean carbon density in above ground woody biomass',
    category: 'carbon related data layers',
  },
  {
    name: 'Below Ground Woody Biomass - Current',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/fa797f4cf1e5ce225a72f02af404d905-db396a182801d5befb2046788f04edf8/tiles/{z}/{x}/{y}',
    description:
      'Walker et al (2022). Data layer of current mean carbon density in below ground woody biomass',
    category: 'carbon related data layers',
  },
  {
    name: 'Soil Organic Carbon - Current',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/5ea431de2de6e6c83711a1b6a2b37bc7-5488c7bbb3b6fdb2cde2acdd776a29bc/tiles/{z}/{x}/{y}',
    description:
      'Walker et al (2022). Data layer of current mean density of soil organic carbon',
    category: 'carbon related data layers',
  },
  {
    name: 'Above Ground Woody Biomass - Potential',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/2b3a008fcf83f0eae359b79de16e5efe-36c43c69aaa7935e4318819015bf3af5/tiles/{z}/{x}/{y}',
    description:
      'Walker et al (2022). Data layer of potential mean carbon density in above ground woody biomass',
    category: 'carbon related data layers',
  },
  {
    name: 'Below Ground Woody Biomass - Potential',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/a21beda622e83dced1ecc3a681cb9927-2f43cc18f8f6e4eda6345642c4270461/tiles/{z}/{x}/{y}',
    description:
      'Walker et al (2022). Data layer of potential mean carbon density in below ground woody biomass',
    category: 'carbon related data layers',
  },
  {
    name: 'Soil Organic Carbon - Potential',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/1e27888f9370ec8efd9f7080b4a3c72a-bb51d021ed3c8687e64392ac43db3890/tiles/{z}/{x}/{y}',
    description:
      'Walker et al (2022). Data layer of potential mean density of soil organic carbon',
    category: 'carbon related data layers',
  },
  {
    name: 'Net Primary Productivity',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/6098c1aff307dcd4f40af6932979ba63-ec747a0b90176d32b618e1368b82476b/tiles/{z}/{x}/{y}',
    description:
      'Running et al (2019). Mean annual Net Primary Productivity for the years 2001–2019 (inclusive).',
    category: 'carbon related data layers',
  },
  {
    name: 'Total Plant Species',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/b28ea9733a2e920a4f92001e8f2881f5-1f952da0faebc16a352e523ea401412b/tiles/{z}/{x}/{y}',
    category: 'biodiversity related data layers',
    description:
      'Kreft et al (2007). The species-richness maps show area-standardized predictions across an equal area grid (≈12,100 km2, ≈1° latitude × 1° longitude near the equator) based on the combined multipredictor model - ordinary kriging of species richness (where species richness is interpolated purely as a function of spatial autocorrelation in the response variable)',
  },
  {
    name: 'Biodiversity Mammals',
    type: 'raster_tif',
    endpoint: null,
    category: 'biodiversity related data layers',
    description: 'Jenkins et al (2013). ',
  },
  {
    name: 'Biodiversity Birds',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/b1657894ff8cf3f0f7b4f99823cd7645-5e62624e6142ef9544f18c244516ed78/tiles/{z}/{x}/{y}',
    category: 'biodiversity related data layers',
    description: 'Jenkins et al (2013)',
  },
  {
    name: 'Biodiversity Amphibians',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/8b61aa4552f4cd0c7fba3c4101357b77-23768a508434adc71b2c910996cc2ee3/tiles/{z}/{x}/{y}',
    category: 'biodiversity related data layers',
    description: 'Jenkins et al (2013)',
  },
  {
    name: 'ESRI Landcover 2020',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/79610241108ffa77a3fbf492ffef7940-9188cc42a5569dd149e8180de8bf0139/tiles/{z}/{x}/{y}',
    category: 'land cover related data layers',
    description: 'Karra, Kontgis, et al (2021)',
  },
  {
    name: 'Global Tree Cover 2010',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/1a5b8e6c753abc03057f6e9dac95f437-8adfe48e4f54af23389c7760daf45e97/tiles/{z}/{x}/{y}',
    category: 'land cover related data layers',
    description:
      'Hansen et al(2013). Global tree cover data (treecover2010) are per pixel estimates of circa 2010 percent maximum (peak of growing season) tree canopy cover derived from cloud-free annual growing season composite Landsat 7 ETM+ data. A regression tree model estimating per pixel percent tree canopy cover was applied to annual composites from 2000 to 2012 inclusive (Hansen and others, 2013). Data gaps and noise from individual years were replaced using multi-year median values. First, a median from annual tree canopy cover values from 2009-2011 was used to estimate 2010 tree cover. For pixels still lacking an estimate, the median calculation was expanded to include tree cover values from 2008-2011, then from 2008-2012. Any remaining gaps were filled with tree canopy cover values derived from a regression tree model using all growing season Landsat ETM+ data as inputs. The resulting layer represents estimated maximum tree canopy cover per pixel, 1-100% for the year 2010 in integer values (1-100).',
  },
  {
    name: 'Global Tree Cover Loss',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/a1f192b54ff7e80ec7bd0e0f163a2331-f48402cf93a991c19fd30de116ae64e6/tiles/{z}/{x}/{y}',
    category: 'land cover related data layers',
    description: 'Hansen et al(2013)',
  },
  {
    name: 'Global Tree Cover Potential',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/61656cc4ddd685befa6e87be32c46ac8-37982807fcd2395219cb6e986f42a78e/tiles/{z}/{x}/{y}',
    category: 'land cover related data layers',
    description:
      'Bastin et al (2019). This resource contains information about which areas of the planet could theoretically support tree cover, based on prevailing environmental conditions. The resulting map reveals Earths full tree cover capacity at a spatial resolution ~1km. When areas currently supporting tree cover or occupied by croplands and human settlements are subtracted, it also provides a global map of areas theoretically available for tree cover restoration.',
  },
  {
    name: 'Wetlands',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/5689875196a1219d0894bf127fcf8d95-77245e96cf06d9cbc08c3fabcf0d8c0d/tiles/{z}/{x}/{y}',
    description:
      'Tootchi et al., 2018. Map of global wetland prevalence. Shows absence of wetlands (0) or presence of four different kinds.',
    category: 'land cover related data layers',
  },
  {
    name: 'Annual Mean Precipitation',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/06c576906eb5958ce74f8e75d490071b-33bd683fb3c689c2d4be5a98b942dbb4/tiles/{z}/{x}/{y}',
    category: 'water related data layers',
    description:
      'Karger et al (2017). Data layer of mean annual precipitation.',
  },
  {
    name: 'Depth to Water',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/51cc0b112519719762ac4df87f783c82-059a9b503e61d85b8f6464537f5ef461/tiles/{z}/{x}/{y}',
    category: 'water related data layers',
    description: 'Bastin et al (2019)',
  },
  {
    name: 'Soil PH',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/002161bbe9484ced930786c91ce240cb-160b6d4bbc4cd8511c4db248d7e38d5a/tiles/{z}/{x}/{y}',
    category: 'environment related data layers',
    description:
      'Hengl et al (2017). Estimated soil pH in the top 5cm of soil globally.',
  },
  {
    name: 'Annual Mean Temperature',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/b44bc50a4ca22ddd5b0e761bc8f10db2-2b79d6f30d3a7c4bf57ef64f55a083c5/tiles/{z}/{x}/{y}',
    category: 'environment related data layers',
    description:
      'Karger et al (2017). Data layer of mean annual air temperature.',
  },
  {
    name: 'Aridity Index',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/734539289b8317f08db3ea9c57f79c29-18968c153e00592bc403dee11fb193aa/tiles/{z}/{x}/{y}',
    description:
      'Zomer et al (2008). Data layer of an aridity (i.e. dryness) metric at 30 arc second resolution. Here, Aridity Index (AI) is defined as Mean Annual Precipitation / Mean Annual Evapotranspiration',
    category: 'environment related data layers',
  },
  {
    name: 'Population Density',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/7a5e5a6cbaae392790f5dc919e875b16-4c2b2204f6b6f71bbef0e0b45a8034e8/tiles/{z}/{x}/{y}',
    category: 'environment related data layers',
    description:
      'Schiavina et al (2019). Maximum population count is capped at 3000 people in pixel (saturation)',
  },
  {
    name: 'Elevation',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/08ff5c66dc2354c8ba5a6cac9ca36870-c042ab4f477a7388421fe9de804ec89b/tiles/{z}/{x}/{y}',
    description:
      'Jarvis et al (2008). High-resolution digital elevation model with global coverage.',
    category: 'environment related data layers',
  },
  {
    name: 'Global Human Modification',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/4f0a229d75c380f0d7f8e5f13304ab42-2b325d544c3a1ac3d270ae705ab2e5b1/tiles/{z}/{x}/{y}',
    category: 'environment related data layers',
    description: 'Kennedy et al (2019)',
  },
  {
    name: 'Tree Crown Delineations',
    type: 'geojson_line',
    endpoint: `${process.env.AWS_STORAGE}/layers/tree_crowns.geojson`,
    description: 'Outlines the canopy extents of individual trees.',
    category: 'tumbira',
  },
  {
    name: 'Toca do Tatu Drone Flights',
    type: 'tms_tile',
    endpoint: `${process.env.AWS_STORAGE}/layers/tms_tiles/{z}/{x}/{y}.png`,
    description: 'High-resolution drone layer of the competition area.',
    category: 'tumbira',
  },
  {
    name: 'Tumbira SkySat April 14th',
    type: 'raster_tif',
    endpoint: `${process.env.TITILER_ENDPOINT}/drone/tumbira/20240414_stitched.tif`,
    description:
      'High-resolution PlanetLabs SkySat layer of the Tumbira region.',
    category: 'tumbira',
  },
  {
    name: 'PM 2.5 (MK Tau)',
    type: 'raster_tif',
    endpoint: `${process.env.TITILER_ENDPOINT}/layers/pm2.5/FinalSite_RescaleAOD_01-22_MK_tau_rescaled_recolored.tif`,
    description:
      'Measures increased pollution. Darker colors represent increases in levels of PM2.5 (particulate matter of less than 2.5 micrometers) between 2001 and 2022.',
    category: 'tumbira',
    legend: 'pm2.5',
  },
  {
    name: 'PM 2.5 (MK Tau 95% Confidence Level)',
    type: 'raster_tif',
    endpoint: `${process.env.TITILER_ENDPOINT}/layers/pm2.5/FinalSite_RescaleAOD_01-22_MK_tau_95Signif_rescaled_recolored.tif`,
    description:
      'Measures increased pollution. Darker colors represent increases in levels of PM2.5 (particulate matter of less than 2.5 micrometers) between 2001 and 2022.',
    category: 'tumbira',
    legend: 'pm2.5',
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
    name: 'Spectral Diversity (Mean 10m Avg)',
    type: 'raster_tif',
    endpoint: `${process.env.TITILER_ENDPOINT}/layers/spectral_diversity/CV_planet_Mean10m_avg_rescaled_recolored.tif`,
    description:
      'Mean Coefficient of variation across bands. The CV was calculated by extracting for each band the mean and standard deviation of reflectance on a circular moving kernel of 10 m radius. Areas with higher values have higher spectral variability.',
    category: 'tumbira',
    legend: 'spectral_diversity',
  },
  {
    name: 'Orthomosaic Inhaã-bé (Feb 2024)',
    type: 'raster_tif',
    endpoint: `${process.env.TITILER_ENDPOINT}/drone/inhaa-be/2024-02-23/orthophoto.tif`,
    description: 'Inhaã-bé drone image from 2024-02-23',
    category: 'Inhaã-bé',
  },
  {
    name: 'Orthomosaic Parque das Tribos (Feb 2024)',
    type: 'raster_tif',
    endpoint: `${process.env.TITILER_ENDPOINT}/drone/parque-das-tribos/2024-02-06/orthophoto.tif`,
    description: 'Parque das Tribos drone image from 2024-02-06',
    category: 'Parque das Tribos',
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
    category: 'global',
  },
]

const tumbiraDeforestationData = (): GeospatialLayer[] => {
  const tumbiraTifArray: GeospatialLayer[] = []
  for (let year = 1985; year <= 2023; year++) {
    tumbiraTifArray.push({
      name: `Tumbira Deforestation ${year}`,
      type: 'raster_tif',
      endpoint: `${process.env.TITILER_ENDPOINT}/layers/tumbira_deforestation/tumbira_deforestation_yod_${year}.tif`,
      description: `Areas of deforestation in ${year}`,
      category: 'tumbira',
    })
  }
  return tumbiraTifArray
}

const tumbiraRegrowthData = (): GeospatialLayer[] => {
  const tumbiraTifArray: GeospatialLayer[] = []
  for (let year = 1985; year <= 2023; year++) {
    tumbiraTifArray.push({
      name: `Tumbira Regrowth ${year}`,
      type: 'raster_tif',
      endpoint: `${process.env.TITILER_ENDPOINT}/layers/tumbira_regrowth/tumbira_regrowth_yod_${year}.tif`,
      description: `Areas of regrowth in ${year}`,
      category: 'tumbira',
    })
  }
  return tumbiraTifArray
}

export const layersData: GeospatialLayer[] = [
  ...hardcodedLayers,
  ...tumbiraDeforestationData(),
  ...tumbiraRegrowthData(),
]
