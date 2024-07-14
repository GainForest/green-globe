import DigitalElevationLegend from './digitalElevationLegend'
import PM2point5Legend from './pm2point5Legend'
import ShannonIndexLegend from './shannonIndexLegend'
import { SpeciesRichnessLegend } from './speciesRichnessLegend'
import SpectralDiversityLegend from './spectralDiversityLegend'

export type LegendName =
  | 'species_richness'
  | 'shannon_index'
  | 'pm2.5'
  | 'spectral_diversity'
  | 'digital_elevation'

type LegendComponent = React.ComponentType<any>

export const legendMap: Record<LegendName, LegendComponent> = {
  species_richness: SpeciesRichnessLegend,
  shannon_index: ShannonIndexLegend,
  'pm2.5': PM2point5Legend,
  spectral_diversity: SpectralDiversityLegend,
  digital_elevation: DigitalElevationLegend,
}
