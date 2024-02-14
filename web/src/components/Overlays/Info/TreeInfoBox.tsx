import { useThemeUI } from 'theme-ui'

import { CloseButton } from 'src/components/Buttons/Close'

export const TreeInfoBox = ({ treeData, setTreeData }) => {
  const { theme } = useThemeUI()
  if (
    treeData.treePhoto.endsWith('mov') ||
    treeData.treePhoto.endsWith('MOV') ||
    treeData.treePhoto.endsWith('mp4')
  )
    return (
      <div>
        <video
          key={treeData.treePhoto}
          style={{
            maxWidth: '300px',
            position: 'absolute',
            top: 240,
            right: 8,
            borderRadius: '8px',
          }}
          autoPlay
        >
          <track kind="captions" />
          <source src={treeData.treePhoto} />
        </video>
      </div>
    )
  else
    return (
      <>
        <div
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
            borderRadius: treeData.treePhoto.endsWith('taxa_plants.png')
              ? '8px'
              : '8px 8px 0 0 ',
            padding: '8px',
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
              <p
                style={{
                  fontSize: '10px',
                  width: '36px',
                  color: theme.colors.secondary as string,
                }}
              >
                Species
              </p>
              <p style={{ fontSize: '14px' }}>{treeData.treeName}</p>
            </div>
            <div style={{ margin: '0 4px', flexDirection: 'column' }}>
              <p
                style={{
                  fontSize: '10px',
                  width: '36px',
                  color: theme.colors.secondary as string,
                }}
              >
                Height
              </p>
              <p style={{ fontSize: '14px' }}>{treeData.treeHeight}</p>
            </div>
            <div style={{ margin: '0 4px', flexDirection: 'column' }}>
              <p
                style={{
                  fontSize: '10px',
                  width: '36px',
                  color: theme.colors.secondary as string,
                }}
              >
                Width
              </p>
              <p style={{ fontSize: '14px' }}>{treeData.treeDBH}</p>
            </div>
            <div style={{ margin: '0 4px', flexDirection: 'column' }}>
              <p
                style={{
                  fontSize: '10px',
                  width: '36px',
                  color: theme.colors.secondary as string,
                }}
              >
                Date Measured
              </p>
              <p style={{ fontSize: '14px' }}>{treeData.dateOfMeasurement}</p>
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
        {!treeData.treePhoto.endsWith('taxa_plants.png') && (
          <div>
            <img
              style={{
                width: '300px',
                maxHeight: '500px',
                position: 'absolute',
                top: 240,
                right: 8,
                borderRadius: '0px 0px 8px 8px',
              }}
              alt={treeData.name}
              src={treeData.treePhoto}
            />
          </div>
        )}
      </>
    )
}
