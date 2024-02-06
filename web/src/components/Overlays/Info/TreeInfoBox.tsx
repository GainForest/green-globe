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
          width: '350px',
          height: '100px',
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
          <div style={{ margin: '0 6px', flexDirection: 'column' }}>
            <p
              style={{
                fontSize: '10px',
                width: '48px',
              }}
            >
              Species
            </p>
            <p>{treeData.treeName}</p>
          </div>
          <div style={{ margin: '0 6px', flexDirection: 'column' }}>
            <p
              style={{
                fontSize: '10px',
                width: '48px',
              }}
            >
              Height
            </p>
            <p>{treeData.treeHeight}</p>
          </div>
          <div style={{ margin: '0 6px', flexDirection: 'column' }}>
            <p
              style={{
                fontSize: '10px',
                width: '48px',
              }}
            >
              Width
            </p>
            <p>{treeData.treeDBH}</p>
          </div>
          <div style={{ margin: '0 6px', flexDirection: 'column' }}>
            <p
              style={{
                fontSize: '10px',
                width: '48px',
              }}
            >
              Date
            </p>
            <p>{treeData.dateOfMeasurement}</p>
          </div>
          <CloseButton
            style={null}
            fontSize="24px"
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
              maxWidth: '350px',
              position: 'absolute',
              top: 250,
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
