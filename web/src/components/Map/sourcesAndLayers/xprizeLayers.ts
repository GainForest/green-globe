const hardcodedLayers: GeospatialLayer[] = [
  {
    name: 'Global Tree Canopy Height',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/a2b0f58bcf25eecaca86b49ea36b08f9-1a4c9f052c2cbc5b0790782d8585e1fa/tiles/{z}/{x}/{y}`,
    description:
      'Tolan et al (2024). Tree canopy height, with a resolution of 1m per pixel. Estimates are based on a self-supervised model trained on Maxar imagery from 2017 to 2020, with model validation via use of aerial lidar maps.',
    category: 'carbon related data layers',
  },
  {
    name: 'Forest Carbon Potential',
    type: 'raster_tif',
    endpoint: `  https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/ac40136bfe92501e6ca9261828925ac9-15c1b5acb0d6e14ca275c5ae9751e0b7/tiles/{z}/{x}/{y}`,
    description:
      'Mo et al. 2023. This resource contains information about the global unrealized potential for above ground carbon storage in forest ecosystems. The map provides an estimate for the tonnes of carbon per hectare that would be stored in forests if fully mature native plants were allowed to recover in a given area. Areas unsuitable for supporting forest cover – including grassland and dryland habitats – are displayed in black. Areas unable to support natural forest cover are masked out.',
    category: 'carbon related data layers',
  },
  {
    name: 'Current Above Ground Woody Biomass',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/c46da94543333e1232b2c14ab8a6b777-2ba4f0ec1f966932c661c02d3d2d3f1d/tiles/{z}/{x}/{y}`,
    description:
      'Walker et al (2022). Data layer of current mean carbon density in above ground woody biomass',
    category: 'carbon related data layers',
  },
  {
    name: "Below Ground Woody Biomass - Current",
    type: "raster_tif",
    endpoint: "https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/fa797f4cf1e5ce225a72f02af404d905-c080006b9bb52d101eaa61b70c122a06/tiles/{z}/{x}/{y}",
    description: "Walker et al (2022). Data layer of current mean carbon density in below ground woody biomass",
    category: "carbon related data layers"
  },
  {
    name: "Soil Organic Carbon - Current",
    type: "raster_tif",
    endpoint: "https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/5ea431de2de6e6c83711a1b6a2b37bc7-b7c0b5fd652b92c61c092c443bb2f0b9/tiles/{z}/{x}/{y}",
    description: "Walker et al (2022). Data layer of current mean density of soil organic carbon",
    category: "carbon related data layers"
  },
  {
    name: "Above Ground Woody Biomass - Potential",
    type: "raster_tif",
    endpoint: "https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/2b3a008fcf83f0eae359b79de16e5efe-aa2fa3253e159dc529b1c61b42ca9a98/tiles/{z}/{x}/{y}",
    description: "Walker et al (2022). Data layer of potential mean carbon density in above ground woody biomass",
    category: "carbon related data layers"
  },
  {
    name: "Below Ground Woody Biomass - Potential",
    type: "raster_tif",
    endpoint: "https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/a21beda622e83dced1ecc3a681cb9927-f26cfa3db8c696d71cd5ffd8109b6d3b/tiles/{z}/{x}/{y}",
    description: "Walker et al (2022). Data layer of potential mean carbon density in below ground woody biomass",
    category: "carbon related data layers"
  },
  {
    name: "Soil Organic Carbon - Potential",
    type: "raster_tif",
    endpoint: "https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/1e27888f9370ec8efd9f7080b4a3c72a-1f7e46a2080751d4cb2f6f84849d5621/tiles/{z}/{x}/{y}",
    description: "Walker et al (2022). Data layer of potential mean density of soil organic carbon",
    category: "carbon related data layers"
  },
  {
    name: "Net Primary Productivity",
    type: "raster_tif",
    endpoint: "https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/83536c022210398f7691e1a6fa98cf2a-a939dfa7afc8f59a08b7e23a11725303/tiles/{z}/{x}/{y}",
    description: "Running et al (2019). Mean annual Net Primary Productivity for the years 2001–2019 (inclusive).",
    category: "carbon related data layers"
  },
  {
    name: 'Total Plant Species',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/b28ea9733a2e920a4f92001e8f2881f5-3cd18280a31996613d07da494f665322/tiles/{z}/{x}/{y}',
    category: 'biodiversity related data layers',
    description: 'Kreft et al (2007). The species-richness maps show area-standardized predictions across an equal area grid (≈12,100 km2, ≈1° latitude × 1° longitude near the equator) based on the combined multipredictor model - ordinary kriging of species richness (where species richness is interpolated purely as a function of spatial autocorrelation in the response variable)',
  },
  {
    name: "Biodiversity Mammals",
    type: "raster_tif",
    endpoint: "https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/6a915b6d07bfa6c85d6563c72417f55d-06ba6e80d194745d7e97e1c041f286b0/tiles/{z}/{x}/{y}",
    category: "biodiversity related data layers",
    description: "Jenkins et al (2013). ",
  },
  {
    name: "Biodiversity Birds",
    type: "raster_tif",
    endpoint: "https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/b1657894ff8cf3f0f7b4f99823cd7645-79697882c7f6a1fb33d25208cb9422df/tiles/{z}/{x}/{y}",
    category: "biodiversity related data layers",
    description: "Jenkins et al (2013)",
  },
  {
    name: "Biodiversity Amphibians",
    type: "raster_tif",
    endpoint: "https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/8b61aa4552f4cd0c7fba3c4101357b77-b1f8b785f9f5dcc0764ca4ebe398f249/tiles/{z}/{x}/{y}",
    category: "biodiversity related data layers",
    description: "Jenkins et al (2013)",
  },
  {
    name: "ESRI Landcover 2020",
    type: "raster_tif",
    endpoint: "https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/79610241108ffa77a3fbf492ffef7940-045df24005945836a817ca33fa3527f3/tiles/{z}/{x}/{y}",
    category: "land cover related data layers",
    description: "Karra, Kontgis, et al (2021)",
  },
  {
    name: 'Global Tree Cover 2010',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/1a5b8e6c753abc03057f6e9dac95f437-a09624926c5f0fa19c92d050c08e652a/tiles/{z}/{x}/{y}',
    category: 'land cover related data layers',
    description: 'Hansen et al(2013). Global tree cover data (treecover2010) are per pixel estimates of circa 2010 percent maximum (peak of growing season) tree canopy cover derived from cloud-free annual growing season composite Landsat 7 ETM+ data. A regression tree model estimating per pixel percent tree canopy cover was applied to annual composites from 2000 to 2012 inclusive (Hansen and others, 2013). Data gaps and noise from individual years were replaced using multi-year median values. First, a median from annual tree canopy cover values from 2009-2011 was used to estimate 2010 tree cover. For pixels still lacking an estimate, the median calculation was expanded to include tree cover values from 2008-2011, then from 2008-2012. Any remaining gaps were filled with tree canopy cover values derived from a regression tree model using all growing season Landsat ETM+ data as inputs. The resulting layer represents estimated maximum tree canopy cover per pixel, 1-100% for the year 2010 in integer values (1-100).',
  },
  {
    name: 'Global Tree Cover Loss',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/a1f192b54ff7e80ec7bd0e0f163a2331-05d989540683b8e9df2692ab37cb204e/tiles/{z}/{x}/{y}',
    category: 'land cover related data layers',
    description: 'Hansen et al(2013)'
  },
  {
    name: 'Global Tree Cover Potential',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/61656cc4ddd685befa6e87be32c46ac8-b4b2e20bd42e43dcf431d358945ade33/tiles/{z}/{x}/{y}',
    category: 'land cover related data layers',
    description: 'Bastin et al (2019). This resource contains information about which areas of the planet could theoretically support tree cover, based on prevailing environmental conditions. The resulting map reveals Earth’s full tree cover capacity at a spatial resolution ~1km. When areas currently supporting tree cover or occupied by croplands and human settlements are subtracted, it also provides a global map of areas theoretically available for tree cover restoration.'
  },
  {
    name: "Wetlands",
    type: "raster_tif",
    endpoint: "https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/5689875196a1219d0894bf127fcf8d95-517f5777ec04897ba9b41ffdd828a194/tiles/{z}/{x}/{y}",
    description: "Tootchi et al., 2018. Map of global wetland prevalence. Shows absence of wetlands (0) or presence of four different kinds.",
    category: "land cover related data layers"
  },
  {
    name: 'Annual Mean Precipitation',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/06c576906eb5958ce74f8e75d490071b-480987b94fb03851e5c9d18d5c3c4043/tiles/{z}/{x}/{y}',
    category: 'water related data layers',
    description: 'Karger et al (2017). Data layer of mean annual precipitation.',
  },
  {
    name: "Depth to Water",
    type: "raster_tif",
    endpoint: "https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/51cc0b112519719762ac4df87f783c82-f902332ae1691694f243174e13951aa2/tiles/{z}/{x}/{y}",
    category: "water related data layers",
    description: "Bastin et al (2019)",
  },
  {
    name: 'Soil PH',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/002161bbe9484ced930786c91ce240cb-61cd82b619f9286bcb3eeed71449e978/tiles/{z}/{x}/{y}`,
    category: 'environment related data layers',
    description: 'Hengl et al (2017). Estimated soil pH in the top 5cm of soil globally.',
  },
  {
    name: 'Annual Mean Temperature',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/b44bc50a4ca22ddd5b0e761bc8f10db2-9213a54b93af54401407faa0cc954759/tiles/{z}/{x}/{y}',
    category: 'environment related data layers',
    description: 'Karger et al (2017). Data layer of mean annual air temperature.',
  },
  {
    name: "Aridity Index",
    type: "raster_tif",
    endpoint: "https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/734539289b8317f08db3ea9c57f79c29-aee1b26236e605a1afab8a94090b851f/tiles/{z}/{x}/{y}",
    description: "Zomer et al (2008). Data layer of an aridity (i.e. dryness) metric at 30 arc second resolution. Here, Aridity Index (AI) is defined as Mean Annual Precipitation / Mean Annual Evapotranspiration",
    category: "environment related data layers"
  },
  {
    name: 'Population Density',
    type: 'raster_tif',
    endpoint:
      'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/7a5e5a6cbaae392790f5dc919e875b16-397f63f41861b69276955d3efb29006a/tiles/{z}/{x}/{y}',
    category: 'environment related data layers',
    description: 'Schiavina et al (2019). Maximum population count is capped at 3000 people in pixel (saturation)',
  },
  {
    name: "Elevation",
    type: "raster_tif",
    endpoint: "https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/08ff5c66dc2354c8ba5a6cac9ca36870-cd498cf2eb5ca9fa0b6ed951a0cd062d/tiles/{z}/{x}/{y}",
    description: "Jarvis et al (2008). High-resolution digital elevation model with global coverage.",
    category: "environment related data layers"
  },
  {
    name: 'Global Human Modification',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/4f0a229d75c380f0d7f8e5f13304ab42-c97ef1b26c39d1c0d1eb1d0d8869c288/tiles/{z}/{x}/{y}`,
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
    endpoint: `${process.env.TITILER_ENDPOINT}/layers/competition_area_drone_cog.tif`,
    description:
      'High-resolution PlanetLabs SkySat layer of the Tumbira region.',
    category: 'tumbira',
  },
  {
    name: 'PM 2.5 (MK Tau)',
    type: 'raster_tif',
    endpoint: `${process.env.TITILER_ENDPOINT}/layers/pm2.5/FinalSite_RescaleAOD_01-22_MK_tau_rescaled.tif`,
    description:
      'Measures increased pollution. Darker colors represent increases in levels of PM2.5 (particulate matter of less than 2.5 micrometers) between 2001 and 2022.',
    category: 'tumbira',
  },
  {
    name: 'PM 2.5 (MK Tau 95% Confidence Level)',
    type: 'raster_tif',
    endpoint: `${process.env.TITILER_ENDPOINT}/layers/pm2.5/FinalSite_RescaleAOD_01-22_MK_tau_95Signif_rescaled.tif`,
    description:
      'Measures increased pollution. Darker colors represent increases in levels of PM2.5 (particulate matter of less than 2.5 micrometers) between 2001 and 2022.',
    category: 'tumbira',
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
