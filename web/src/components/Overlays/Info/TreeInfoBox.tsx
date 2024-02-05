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
      <p>Date measured: {treeData.dateOfMeasurement}</p>
      <p>Height: {treeData.treeHeight}</p>
      <p>Id: {treeData.treeID}</p>
      <p>Name: {treeData.treeName}</p>
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
