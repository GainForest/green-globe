import { fetchProjectPolygon } from '../mapfetch'

import { Button } from './Button'

export const ProjectSiteButtons = ({
  assets,
  activeShapefile,
  setActiveShapefile,
}: {
  assets: Asset[]
  activeShapefile: Asset
  setActiveShapefile: any
}) => {
  if (!assets || !assets.length || !activeShapefile) {
    return <></>
  }

  const sites = assets.filter((d) => d.classification == 'Shapefiles')

  const fetchAndSetSite = async (endpoint) => {
    if (!endpoint) {
      return
    }
    await fetchProjectPolygon(endpoint, setActiveShapefile)
  }

  return (
    <div>
      {sites.map((site) => {
        const shortName = site.shapefile?.shortName || ''

        return (
          <Button
            key={`${shortName}-shapefile-button`}
            active={activeShapefile.id == site.id}
            onClick={() => {
              fetchAndSetSite(site?.awsCID)
            }}
          >
            {shortName}
          </Button>
        )
      })}
    </div>
  )
}
