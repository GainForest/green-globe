import { useState } from 'react'

import { useSelector } from 'react-redux'

import { breakpoints } from 'src/constants'
import { State } from 'src/types'

interface TreeData {
  treeName: string
  treeHeight: string
  treeDBH: string
  dateOfMeasurement: string
  treePhotos: string[]
  fileName: string[] // string of aws endpoints
}

export const TreeInfoBox = ({ mediaSize }) => {
  const hoveredInformation: TreeData = useSelector(
    (state: State) => state.map.hoveredInformation
  )

  const [photoIndex, setPhotoIndex] = useState(0)
  if (
    hoveredInformation.treePhotos[photoIndex]?.endsWith('mov') ||
    hoveredInformation.treePhotos[photoIndex]?.endsWith('MOV') ||
    hoveredInformation.treePhotos[photoIndex]?.endsWith('mp4')
  )
    return (
      <div>
        <video
          className="tree-photo"
          key={hoveredInformation.treePhotos[photoIndex]}
          style={{
            borderRadius: '8px',
          }}
          autoPlay
        >
          <track kind="captions" />
          <source src={hoveredInformation.treePhotos[photoIndex]} />
        </video>
      </div>
    )
  else {
    return (
      <>
        {/* <div
          className="tree-info"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-around',
            backgroundColor: theme.colors.background as string,
            position: 'absolute',
            top: 160,
            right: 8,
            borderRadius: hoveredInformation.treePhotos[0]?.endsWith(
              'taxa_plants.png'
            )
              ? '8px'
              : '8px 8px 0 0 ',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ margin: '0 4px', flexDirection: 'column' }}>
              <p className="tree-key">Species</p>
              <p className="tree-val">{hoveredInformation.treeName}</p>
            </div>
            <div style={{ margin: '0 4px', flexDirection: 'column' }}>
              <p className="tree-key">Height</p>
              <p className="tree-val">{hoveredInformation.treeHeight}</p>
            </div>
            <div style={{ margin: '0 4px', flexDirection: 'column' }}>
              <p className="tree-key">Width</p>
              <p className="tree-val">{hoveredInformation.treeDBH}</p>
            </div>
            <div style={{ margin: '0 4px', flexDirection: 'column' }}>
              <p className="tree-key">Date Measured</p>
              <p className="tree-val">{hoveredInformation.dateOfMeasurement}</p>
            </div>
            <CloseButton
              style={null}
              fontSize="22px"
              onClick={() => {
                dispatch(setHoveredInformation({}))
              }}
            />
          </div>
        </div> */}

        {!hoveredInformation.treePhotos[0].endsWith('taxa_plants.png') && (
          <div>
            <img
              className="tree-photo"
              alt={hoveredInformation.treeName}
              src={hoveredInformation.treePhotos[photoIndex]}
            />
            {hoveredInformation.treePhotos?.length > 1 && (
              <div>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    position: 'absolute',
                    top:
                      mediaSize >= breakpoints.xl
                        ? 640
                        : mediaSize > breakpoints.m
                        ? 610
                        : mediaSize > breakpoints.s
                        ? 540
                        : 470,
                    right:
                      mediaSize >= breakpoints.xl
                        ? 160
                        : mediaSize > breakpoints.m
                        ? 150
                        : mediaSize > breakpoints.s
                        ? 125
                        : 100,
                    fontSize: '32px',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    setPhotoIndex((photoIndex) =>
                      photoIndex === 0
                        ? hoveredInformation.treePhotos?.length - 1
                        : photoIndex - 1
                    )
                  }
                >
                  {'<'}
                </button>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    position: 'absolute',
                    top:
                      mediaSize >= breakpoints.xl
                        ? 640
                        : mediaSize > breakpoints.m
                        ? 610
                        : mediaSize > breakpoints.s
                        ? 540
                        : 470,
                    right:
                      mediaSize >= breakpoints.xl
                        ? 120
                        : mediaSize > breakpoints.m
                        ? 110
                        : mediaSize > breakpoints.s
                        ? 85
                        : 70,
                    fontSize: '32px',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    setPhotoIndex((photoIndex) =>
                      photoIndex === hoveredInformation.treePhotos?.length - 1
                        ? 0
                        : photoIndex + 1
                    )
                  }
                >
                  {'>'}
                </button>
              </div>
            )}
          </div>
        )}
      </>
    )
  }
}
