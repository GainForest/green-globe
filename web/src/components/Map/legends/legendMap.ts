import { SpeciesRichnessLegend } from './speciesRichnessLegend'

export type LegendName = 'species_richness'

type LegendComponent = React.ComponentType<any>

export const legendMap: Record<LegendName, LegendComponent> = {
  species_richness: SpeciesRichnessLegend,
}
