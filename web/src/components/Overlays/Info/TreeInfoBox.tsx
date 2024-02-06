import { useThemeUI } from 'theme-ui'

import { CloseButton } from 'src/components/Buttons/Close'

export const TreeInfoBox = ({ treeData, setTreeData }) => {
  const { theme } = useThemeUI()
  return (
    <>
      <div
        style={{
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-around',
          maxWidth: '300px',
          height: '80px',
          backgroundColor: theme.colors.background as string,
          position: 'absolute',
          top: 150,
          right: 8,
          borderRadius: treeData.treePhoto.endsWith('taxa_plants.png')
            ? '8px'
            : '8px 8px 0 0 ',
          padding: '16px 8px 8px 8px',
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
              }}
            >
              Date
            </p>
            <p style={{ fontSize: '14px' }}>{treeData.dateOfMeasurement}</p>
          </div>
          <CloseButton
            style={null}
            fontSize="36px"
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
              maxWidth: '300px',
              position: 'absolute',
              top: 230,
              right: 8,
            }}
            alt={treeData.name}
            src={treeData.treePhoto}
          />
        </div>
      )}
    </>
  )
}
