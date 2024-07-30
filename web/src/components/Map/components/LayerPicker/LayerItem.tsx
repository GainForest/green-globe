import { Tooltip } from 'react-tooltip'
import { useThemeUI } from 'theme-ui'

import { LayerItemContainer, LayerIcon, LayerLabel } from './LayerItemStyles'

export const LayerItem = ({
  layer,
  handleToggle,
}: {
  layer: GeospatialLayer & { isActive: boolean }
  handleToggle: (layerName: string) => void
}) => {
  const { theme } = useThemeUI()
  return (
    <LayerItemContainer onClick={() => handleToggle(layer.name)}>
      <LayerIcon
        className="material-icons-round"
        isActive={layer.isActive}
        theme={theme}
      >
        {layer.isActive ? 'toggle_on' : 'toggle_off'}
      </LayerIcon>
      <LayerLabel
        htmlFor={layer.name}
        isActive={layer.isActive}
        data-tooltip-id={`info-button-clipTip-${layer.name}`}
      >
        {layer.name}
      </LayerLabel>
      <Tooltip
        id={`info-button-clipTip-${layer.name}`}
        delayShow={10}
        place={'right'}
        opacity={1}
        style={{ maxWidth: '300px' }}
      >
        {layer.description}
      </Tooltip>
    </LayerItemContainer>
  )
}
