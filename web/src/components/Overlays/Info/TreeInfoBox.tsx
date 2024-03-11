import { useState } from 'react'

import { useThemeUI } from 'theme-ui'

import { CloseButton } from 'src/components/Buttons/Close'

export const TreeInfoBox = ({ treeData, setTreeData }) => {
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
            width: '300px',
            height: '80px',
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
            }}
          >
            <div style={{ margin: '0 4px', flexDirection: 'column' }}>
              <p className="tree-key">Species</p>
              <p className="tree-val">{treeData.treeName}</p>
            </div>
            <div style={{ margin: '0 4px', flexDirection: 'column' }}>
              <p className="tree-key">Height</p>
              <p className="tree-val">{treeData.treeHeight}</p>
            </div>
            <div style={{ margin: '0 4px', flexDirection: 'column' }}>
              <p className="tree-key">Width</p>
              <p className="tree-val">{treeData.treeDBH}</p>
            </div>
            <div style={{ margin: '0 4px', flexDirection: 'column' }}>
              <p className="tree-key">Date Measured</p>
              <p className="tree-val">{treeData.dateOfMeasurement}</p>
            </div>
            <CloseButton
              style={null}
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
                    top: 640,
                    right: 160,
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
                    top: 640,
                    right: 120,
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
