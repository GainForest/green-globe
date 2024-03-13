import { useEffect, useState } from 'react'

import Button from '../../../Map/components/Button'
import { fetchProjectPolygon } from '../../../Map/mapfetch'

export const ProjectSiteButtons = ({
  assets,
  activeShapefile,
  setActiveShapefile,
}: {
  assets: Asset[]
  activeShapefile: Asset
  setActiveShapefile: any
}) => {
  const [activeShortname, setActiveShortname] = useState<string>(undefined)

  useEffect(() => {
    const defaultShapefile = assets?.filter(
      (d) => d.classification == 'Shapefiles' && d.shapefile?.default
    )[0]?.shapefile?.shortName
    setActiveShortname(defaultShapefile)
  }, [assets])

  if (!assets || !assets.length || !activeShapefile) {
    return <></>
  }

  const sites = assets.filter(
    (d) =>
      d.classification == 'Shapefiles' &&
      d.shapefile?.shortName &&
      !d.shapefile?.isReference
  )

  const fetchAndSetSite = async (endpoint) => {
    if (!endpoint) {
      return
    }
    await fetchProjectPolygon(endpoint, setActiveShapefile)
  }

  return (
    <>
      {sites.length > 0 && (
        <>
          <h2>Sites</h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              maxWidth: '360px',
              marginBottom: '24px',
            }}
          >
            {sites.map((site) => {
              const shortName = site.shapefile?.shortName || ''
              return (
                <Button
                  style={{ margin: '0px' }}
                  key={site.id}
                  active={activeShortname == shortName}
                  onClick={() => {
                    fetchAndSetSite(site?.awsCID)
                    setActiveShortname(shortName)
                  }}
                >
                  <span
                    style={{ fontSize: '0.75rem', textTransform: 'capitalize' }}
                  >
                    {shortName}
                  </span>
                </Button>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}
