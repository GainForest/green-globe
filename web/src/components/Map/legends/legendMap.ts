import PM2point5Legend from './pm2point5Legend'
import { SpeciesRichnessLegend } from './speciesRichnessLegend'
import SpectralDiversityLegend from './spectralDiversityLegend'

export type LegendName = 'species_richness' | 'pm2.5' | 'spectral_diversity'

type LegendComponent = React.ComponentType<any>

export const legendMap: Record<LegendName, LegendComponent> = {
  species_richness: SpeciesRichnessLegend,
  'pm2.5': PM2point5Legend,
  spectral_diversity: SpectralDiversityLegend,
}
