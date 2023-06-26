import { useEffect, useState } from 'react'

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
  const [activeShortname, setActiveShortname] = useState<string>(undefined)

  useEffect(() => {
    const defaultShapefile = assets.filter(
      (d) => d.classification == 'Shapefiles' && d.shapefile?.default
    )[0]?.shapefile?.shortName
    setActiveShortname(defaultShapefile)
  }, [assets])

  if (!assets || !assets.length || !activeShapefile) {
    return <></>
  }

  const sites = assets.filter(
    (d) => d.classification == 'Shapefiles' && d.shapefile?.shortName
  )

  const fetchAndSetSite = async (endpoint) => {
    if (!endpoint) {
      return
    }
    await fetchProjectPolygon(endpoint, setActiveShapefile)
  }

  return (
    <>
      {sites.length > 0 && <h3>Sites</h3>}
      <div style={{ display: 'flex', gap: '10px' }}>
        {sites.map((site) => {
          const shortName = site.shapefile?.shortName || ''
          return (
            <Button
              key={`${shortName}-shapefile-button`}
              active={activeShortname == shortName}
              onClick={() => {
                fetchAndSetSite(site?.awsCID)
                setActiveShortname(shortName)
              }}
            >
              {shortName}
            </Button>
          )
        })}
      </div>
    </>
  )
}
