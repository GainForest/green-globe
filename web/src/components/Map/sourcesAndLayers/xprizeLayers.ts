import { GeospatialLayer } from 'src/types'

const RESTOR_KEYS = {
  "GLOBAL_CANOPY_HEIGHT": "2b0818037a480c08d879178ff259268e",
  "FOREST_CARBON_POTENTIAL": "49a11bc8da66f2b43196b13ece11cd61",
  "CARBON_WALKER_AGB_CURRENT": "3bc81acf4902ec294adbbe7fb1cdaf66",
  "CARBON_WALKER_BGB_CURRENT": "fb831160dc69bc3ce116ad8c55c02b58",
  "CARBON_WALKER_SOC_CURRENT": "077de02af03a5976e1c28e2b0d93a555",
  "CARBON_WALKER_AGB_POTENTIAL": "8e9dfee966ee8c1efe5d1d4c3ad312dc",
  "CARBON_WALKER_BGB_POTENTIAL": "3e0775b7adbc6c2e6d990f49759b425b",
  "CARBON_WALKER_SOC_POTENTIAL": "8b13d3a39381593c1c7450af2064de27",
  "CARBON_PRODUCTIVITY": "9665d91ba337e89f28fceea1dc22c7bd",
  "BIODIVERSITY": "39e1e4872a0c940605e4f7e198df655c",
  "BIODIVERSITY_MAMMALS": "532cd9a7f511c62e9465b306ecb57be9",
  "BIODIVERSITY_BIRDS": "717540596530bcf7f8613156ec14fcfc",
  "BIODIVERSITY_AMPHIBIANS": "c5175847b19f6c0c9d95d3ed64362ff7",
  "LAND_COVER": "41f7fa855a479038d3c11f46f5464620",
  "TREE_COVER": "68807f694820361ed8011ecc9599671e",
  "TREE_COVER_2010": "48404038ed2748b8890cba74852b6e29",
  "TREE_COVER_LOSS": "0c327d5a222e78bc1f7cef437d8b4344",
  "TREE_COVER_POTENTIAL": "45ff4be99e7d32710f9a8d01d16fa6f7",
  "WETLANDS": "8856076205be8540d17b9206020a29ca",
  "ANNUAL_PRECIPITATION": "92ff063acd6d2ab805df4afda115ece3",
  "DEPTH_TO_WATER": "3978bdcfac32fc367683a703f71fa769",
  "SOIL_PH": "7415d76f3edb8480c8524ee3d194f4fd",
  "ANNUAL_MEAN_TEMPERATURE": "aeafa337aa7d17435d0021ac9caeaffc",
  "ARIDITY_INDEX": "5e6fa972da26c840f21e605465946a31",
  "POPULATION_DENSITY": "6256cfd07a8083c0e4fd7369bfc6a5a2",
  "ELEVATION": "1d15954440935993d1e4e7081f853b51",
  "HUMAN_MODIFICATION": "92398acf0fce66d1737b462b97ff2fd1"
}

const hardcodedLayers: GeospatialLayer[] = [
  {
    name: 'Amazon Mining Watch',
    type: 'geojson_points',
    endpoint: `${process.env.AWS_STORAGE}/layers/illegal-mining.geojson`,
    description: 'Source: Earthrise Media',
    category: 'deforestation related data layers',
  },
  {
    name: 'Detected Airstrips in Amazon',
    type: 'geojson_points',
    endpoint: `${process.env.AWS_STORAGE}/layers/illegal-airstrips-nyt-intercept-public.geojson`,
    description: 'Source: Earthrise Media',
    category: 'deforestation related data layers',
  },
  {
    name: 'Indigenous Lands in Brazil',
    type: 'geojson_line',
    endpoint: `${process.env.AWS_STORAGE}/layers/tis-poligonais-light.geojson`,
    description: 'Source: FUNAI',
    category: 'land cover related data layers',
  },
  {
    name: 'Global Tree Canopy Height',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/a2b0f58bcf25eecaca86b49ea36b08f9-${RESTOR_KEYS.GLOBAL_CANOPY_HEIGHT}/tiles/{z}/{x}/{y}`,
    description:
      'Tolan et al (2024). Tree canopy height, with a resolution of 1m per pixel. Estimates are based on a self-supervised model trained on Maxar imagery from 2017 to 2020, with model validation via use of aerial lidar maps.',
    category: 'carbon related data layers',
  },
  {
    name: 'Forest Carbon Potential',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/ac40136bfe92501e6ca9261828925ac9-${RESTOR_KEYS.FOREST_CARBON_POTENTIAL}/tiles/{z}/{x}/{y}`,
    description:
      'Mo et al. 2023. This resource contains information about the global unrealized potential for above ground carbon storage in forest ecosystems. The map provides an estimate for the tonnes of carbon per hectare that would be stored in forests if fully mature native plants were allowed to recover in a given area. Areas unsuitable for supporting forest cover – including grassland and dryland habitats – are displayed in black. Areas unable to support natural forest cover are masked out.',
    category: 'carbon related data layers',
  },
  {
    name: 'Above Ground Woody Biomass - Current',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/c46da94543333e1232b2c14ab8a6b777-${RESTOR_KEYS.CARBON_WALKER_AGB_CURRENT}/tiles/{z}/{x}/{y}`,
    description:
      'Walker et al (2022). Data layer of current mean carbon density in above ground woody biomass',
    category: 'carbon related data layers',
  },
  {
    name: 'Below Ground Woody Biomass - Current',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/fa797f4cf1e5ce225a72f02af404d905-${RESTOR_KEYS.CARBON_WALKER_BGB_CURRENT}/tiles/{z}/{x}/{y}`,
    description:
      'Walker et al (2022). Data layer of current mean carbon density in below ground woody biomass',
    category: 'carbon related data layers',
  },
  {
    name: 'Soil Organic Carbon - Current',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/5ea431de2de6e6c83711a1b6a2b37bc7-${RESTOR_KEYS.CARBON_WALKER_SOC_CURRENT}/tiles/{z}/{x}/{y}`,
    description:
      'Walker et al (2022). Data layer of current mean density of soil organic carbon',
    category: 'carbon related data layers',
  },
  {
    name: 'Above Ground Woody Biomass - Potential',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/2b3a008fcf83f0eae359b79de16e5efe-${RESTOR_KEYS.CARBON_WALKER_AGB_POTENTIAL}/tiles/{z}/{x}/{y}`,
    description:
      'Walker et al (2022). Data layer of potential mean carbon density in above ground woody biomass',
    category: 'carbon related data layers',
  },
  {
    name: 'Below Ground Woody Biomass - Potential',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/a21beda622e83dced1ecc3a681cb9927-${RESTOR_KEYS.CARBON_WALKER_BGB_POTENTIAL}/tiles/{z}/{x}/{y}`,
    description:
      'Walker et al (2022). Data layer of potential mean carbon density in below ground woody biomass',
    category: 'carbon related data layers',
  },
  {
    name: 'Soil Organic Carbon - Potential',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/1e27888f9370ec8efd9f7080b4a3c72a-${RESTOR_KEYS.CARBON_WALKER_SOC_POTENTIAL}/tiles/{z}/{x}/{y}`,
    description:
      'Walker et al (2022). Data layer of potential mean density of soil organic carbon',
    category: 'carbon related data layers',
  },
  {
    name: 'Net Primary Productivity',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/85a08d199fb9c6a54b7e4c42147587d2-${RESTOR_KEYS.CARBON_PRODUCTIVITY}/tiles/{z}/{x}/{y}`,
    description:
      'Running et al (2019). Mean annual Net Primary Productivity for the years 2001–2019 (inclusive).',
    category: 'carbon related data layers',
  },
  {
    name: 'Total Plant Species',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/b28ea9733a2e920a4f92001e8f2881f5-${RESTOR_KEYS.BIODIVERSITY}/tiles/{z}/{x}/{y}`,
    category: 'biodiversity related data layers',
    description:
      'Kreft et al (2007). The species-richness maps show area-standardized predictions across an equal area grid (≈12,100 km2, ≈1° latitude × 1° longitude near the equator) based on the combined multipredictor model - ordinary kriging of species richness (where species richness is interpolated purely as a function of spatial autocorrelation in the response variable)',
  },
  {
    name: 'Biodiversity Mammals',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/6a915b6d07bfa6c85d6563c72417f55d-${RESTOR_KEYS.BIODIVERSITY_MAMMALS}/tiles/{z}/{x}/{y}`,
    category: 'biodiversity related data layers',
    description: 'Jenkins et al (2013).',
  },
  {
    name: 'Biodiversity Birds',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/b1657894ff8cf3f0f7b4f99823cd7645-${RESTOR_KEYS.BIODIVERSITY_BIRDS}/tiles/{z}/{x}/{y}`,
    category: 'biodiversity related data layers',
    description: 'Jenkins et al (2013)',
  },
  {
    name: 'Biodiversity Amphibians',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/8b61aa4552f4cd0c7fba3c4101357b77-${RESTOR_KEYS.BIODIVERSITY_AMPHIBIANS}/tiles/{z}/{x}/{y}`,
    category: 'biodiversity related data layers',
    description: 'Jenkins et al (2013)',
  },
  {
    name: 'ESRI Landcover 2020',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/79610241108ffa77a3fbf492ffef7940-${RESTOR_KEYS.LAND_COVER}/tiles/{z}/{x}/{y}`,
    category: 'land cover related data layers',
    description: 'Karra, Kontgis, et al (2021)',
  },
  {
    name: 'Global Tree Cover 2010',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/1a5b8e6c753abc03057f6e9dac95f437-${RESTOR_KEYS.TREE_COVER_2010}/tiles/{z}/{x}/{y}`,
    category: 'land cover related data layers',
    description:
      'Hansen et al(2013). Global tree cover data (treecover2010) are per pixel estimates of circa 2010 percent maximum (peak of growing season) tree canopy cover derived from cloud-free annual growing season composite Landsat 7 ETM+ data. A regression tree model estimating per pixel percent tree canopy cover was applied to annual composites from 2000 to 2012 inclusive (Hansen and others, 2013). Data gaps and noise from individual years were replaced using multi-year median values. First, a median from annual tree canopy cover values from 2009-2011 was used to estimate 2010 tree cover. For pixels still lacking an estimate, the median calculation was expanded to include tree cover values from 2008-2011, then from 2008-2012. Any remaining gaps were filled with tree canopy cover values derived from a regression tree model using all growing season Landsat ETM+ data as inputs. The resulting layer represents estimated maximum tree canopy cover per pixel, 1-100% for the year 2010 in integer values (1-100).',
  },
  {
    name: 'Global Tree Cover Loss',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/a1f192b54ff7e80ec7bd0e0f163a2331-${RESTOR_KEYS.TREE_COVER_LOSS}/tiles/{z}/{x}/{y}`,
    category: 'land cover related data layers',
    description: 'Hansen et al(2013)',
  },
  {
    name: 'Global Tree Cover Potential',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/61656cc4ddd685befa6e87be32c46ac8-${RESTOR_KEYS.TREE_COVER_POTENTIAL}/tiles/{z}/{x}/{y}`,
    category: 'land cover related data layers',
    description:
      'Bastin et al (2019). This resource contains information about which areas of the planet could theoretically support tree cover, based on prevailing environmental conditions. The resulting map reveals Earths full tree cover capacity at a spatial resolution ~1km. When areas currently supporting tree cover or occupied by croplands and human settlements are subtracted, it also provides a global map of areas theoretically available for tree cover restoration.',
  },
  {
    name: 'Wetlands',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/5689875196a1219d0894bf127fcf8d95-${RESTOR_KEYS.WETLANDS}/tiles/{z}/{x}/{y}`,
    description:
      'Tootchi et al., 2018. Map of global wetland prevalence. Shows absence of wetlands (0) or presence of four different kinds.',
    category: 'land cover related data layers',
  },
  {
    name: 'Annual Mean Precipitation',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/06c576906eb5958ce74f8e75d490071b-${RESTOR_KEYS.ANNUAL_PRECIPITATION}/tiles/{z}/{x}/{y}`,
    category: 'water related data layers',
    description:
      'Karger et al (2017). Data layer of mean annual precipitation.',
  },
  {
    name: 'Depth to Water',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/51cc0b112519719762ac4df87f783c82-${RESTOR_KEYS.DEPTH_TO_WATER}/tiles/{z}/{x}/{y}`,
    category: 'water related data layers',
    description: 'Bastin et al (2019)',
  },
  {
    name: 'Soil PH',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/002161bbe9484ced930786c91ce240cb-${RESTOR_KEYS.SOIL_PH}/tiles/{z}/{x}/{y}`,
    category: 'environment related data layers',
    description:
      'Hengl et al (2017). Estimated soil pH in the top 5cm of soil globally.',
  },
  {
    name: 'Annual Mean Temperature',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/b44bc50a4ca22ddd5b0e761bc8f10db2-${RESTOR_KEYS.ANNUAL_MEAN_TEMPERATURE}/tiles/{z}/{x}/{y}`,
    category: 'environment related data layers',
    description:
      'Karger et al (2017). Data layer of mean annual air temperature.',
  },
  {
    name: 'Aridity Index',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/734539289b8317f08db3ea9c57f79c29-${RESTOR_KEYS.ARIDITY_INDEX}/tiles/{z}/{x}/{y}`,
    description:
      'Zomer et al (2008). Data layer of an aridity (i.e. dryness) metric at 30 arc second resolution. Here, Aridity Index (AI) is defined as Mean Annual Precipitation / Mean Annual Evapotranspiration',
    category: 'environment related data layers',
  },
  {
    name: 'Population Density',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/7a5e5a6cbaae392790f5dc919e875b16-${RESTOR_KEYS.POPULATION_DENSITY}/tiles/{z}/{x}/{y}`,
    category: 'environment related data layers',
    description:
      'Schiavina et al (2019). Maximum population count is capped at 3000 people in pixel (saturation)',
  },
  {
    name: 'Elevation',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/08ff5c66dc2354c8ba5a6cac9ca36870-${RESTOR_KEYS.ELEVATION}/tiles/{z}/{x}/{y}`,
    description:
      'Jarvis et al (2008). High-resolution digital elevation model with global coverage.',
    category: 'environment related data layers',
  },
  {
    name: 'Global Human Modification',
    type: 'raster_tif',
    endpoint: `https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/4f0a229d75c380f0d7f8e5f13304ab42-${RESTOR_KEYS.HUMAN_MODIFICATION}/tiles/{z}/{x}/{y}`,
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
    name: 'XPRIZE Finals Orthomosaic Map',
    type: 'raster_tif',
    endpoint: `${process.env.TITILER_ENDPOINT}/layers/finals/ortho_25_cog_3857.tif`,
    description: 'High resolution orthomosaic map of the XPRIZE finals testing site by ETH BiodivX. Downsized for web display.',
    category: 'XPRIZE',
  },
  {
    name: 'XPRIZE Finals Site',
    type: 'geojson_line',
    endpoint: `${process.env.AWS_STORAGE}/layers/test.geojson`,
    description: 'Test Site for the XPRIZE Rainforest Finals',
    category: 'XPRIZE',
  },
  {
    name: 'BiodivX Raft Deployment',
    type: 'geojson_points',
    endpoint: `${process.env.AWS_STORAGE}/layers/finals/rafts.geojson`,
    description:
      'Canopy rafts deployed by ETH BiodivX',
    category: 'XPRIZE',
  },
  {
    name: 'BiodivX Surface DNA Sampling (11 & 12 July)',
    type: 'geojson_points',
    endpoint: `${process.env.AWS_STORAGE}/layers/finals/dna_surface.geojson`,
    description:
      'Canopy rafts deployed by ETH BiodivX',
    category: 'XPRIZE',
  },
  {
    name: 'BiodivX Water DNA Sampling (11 July)',
    type: 'geojson_points',
    endpoint: `${process.env.AWS_STORAGE}/layers/finals/dna_water.geojson`,
    description:
      'Canopy rafts deployed by ETH BiodivX',
    category: 'XPRIZE',
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
  {
    name: 'Elevation Map',
    type: 'raster_tif',
    endpoint: `${process.env.TITILER_ENDPOINT}/layers/dsm_colored_webmercator.tif`,
    description: 'Elevation of the tumbira area.',
    category: 'tumbira',
    legend: 'digital_elevation',
  },
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

const tumbiraLayers: GeospatialLayer[] = [
  {
    name: 'Tumbira Deforestation',
    type: 'raster_tif',
    endpoint: `${process.env.TITILER_ENDPOINT}/layers/deforestation_regeneration/Tumbira_lt-gee_deforestation_dur_w_rescaled_webmercator_cog.tif`,
    description: 'Duration of deforestation events in the Tumbira region',
    category: 'tumbira',
  },
  {
    name: 'Tumbira Regrowth',
    type: 'raster_tif',
    endpoint: `${process.env.TITILER_ENDPOINT}/layers/deforestation_regeneration/Tumbira_lt-gee_regrowth_map_dur_w_rescaled_webmercator_cog.tif`,
    description: 'Duration of regrowth events in the Tumbira region',
    category: 'tumbira',
  },
]

export const layersData: GeospatialLayer[] = [
  ...hardcodedLayers,
  ...tumbiraLayers,
]
