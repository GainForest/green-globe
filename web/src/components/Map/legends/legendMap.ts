import PM2point5Legend from './pm2point5Legend'
import { SpeciesRichnessLegend } from './speciesRichnessLegend'

export type LegendName = 'species_richness' | 'pm2.5'

type LegendComponent = React.ComponentType<any>

export const legendMap: Record<LegendName, LegendComponent> = {
  species_richness: SpeciesRichnessLegend,
  'pm2.5': PM2point5Legend,
}
