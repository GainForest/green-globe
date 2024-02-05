import { useThemeUI } from 'theme-ui'

export const TreeInfoBox = ({ treeData }) => {
  const { theme } = useThemeUI()
  return (
    <div
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-around',
        width: '250px',
        height: '100px',
        backgroundColor: theme.colors.background as string,
        position: 'absolute',
        bottom: 250,
        right: 8,
        borderRadius: '8px',
        padding: '16px 8px 8px 8px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ margin: '0 4px', flexDirection: 'column' }}>
          <p
            style={{
              fontSize: '10px',
              width: '48px',
            }}
          >
            Date measured: {treeData.dateOfMeasurement}
          </p>
        </div>
        <div style={{ margin: '0 4px', flexDirection: 'column' }}>
          <p
            style={{
              fontSize: '10px',
              width: '48px',
            }}
          >
            Height: {treeData.treeHeight}
          </p>
        </div>
        <div style={{ margin: '0 4px', flexDirection: 'column' }}>
          <p
            style={{
              fontSize: '10px',
              width: '48px',
            }}
          >
            Id: {treeData.treeID}
          </p>
        </div>
        <div style={{ margin: '0 4px', flexDirection: 'column' }}>
          <p
            style={{
              fontSize: '10px',
              width: '48px',
            }}
          >
            Name: {treeData.treeName}
          </p>
        </div>
      </div>
      {/*
      dateOfMeasurement
:
"unknown"
treeDBH
:
"unknown"
treeHeight
:
"0.18m"
treeID
:
"2504"
treeName
:
"Blue Pine"
treePhoto */}
    </div>
  )
}
