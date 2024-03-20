import { useState } from 'react'

import { useThemeUI } from 'theme-ui'

import { CloseButton } from 'src/components/Buttons/Close'
import { breakpoints } from 'src/constants'

export const TreeInfoBox = ({ treeData, setTreeData, mediaSize }) => {
  const { theme } = useThemeUI()
  const [photoIndex, setPhotoIndex] = useState(0)
  if (
    treeData.treePhotos[photoIndex]?.endsWith('mov') ||
    treeData.treePhotos[photoIndex]?.endsWith('MOV') ||
    treeData.treePhotos[photoIndex]?.endsWith('mp4')
  )
    return (
      <div>
        <video
          className="tree-photo"
          key={treeData.treePhotos[photoIndex]}
          style={{
            borderRadius: '8px',
          }}
          autoPlay
        >
          <track kind="captions" />
          <source src={treeData.treePhotos[photoIndex]} />
        </video>
      </div>
    )
  else
    return (
      <>
        <div
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
            borderRadius: treeData.treePhotos[0]?.endsWith('taxa_plants.png')
              ? '8px'
              : '8px 8px 0 0 ',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div style={{ margin: '0 4px', flexDirection: 'column', flex: 1 }}>
              <p className="tree-key">Species</p>
              <p className="tree-val">{treeData.treeName}</p>
            </div>
            <div style={{ margin: '0 4px', flexDirection: 'column', flex: 1 }}>
              <p className="tree-key">Height</p>
              <p className="tree-val">{treeData.treeHeight}</p>
            </div>
            <div style={{ margin: '0 4px', flexDirection: 'column', flex: 1 }}>
              <p className="tree-key">Width</p>
              <p className="tree-val">{treeData.treeDBH}</p>
            </div>
            <div style={{ margin: '0 4px', flexDirection: 'column', flex: 1 }}>
              <p className="tree-key">Date Measured</p>
              <p className="tree-val">{treeData.dateOfMeasurement}</p>
            </div>
            <CloseButton
              style={{ position: 'absolute', right: '0', top: '0' }}
              fontSize="22px"
              onClick={() => {
                setTreeData({})
              }}
            />
          </div>
        </div>
        {!treeData.treePhotos[0].endsWith('taxa_plants.png') && (
          <div>
            <img
              className="tree-photo"
              alt={treeData.name}
              src={treeData.treePhotos[photoIndex]}
            />
            {treeData.treePhotos?.length > 1 && (
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
                        : 460,
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
                        ? treeData.treePhotos?.length - 1
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
                      photoIndex === treeData.treePhotos?.length - 1
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
