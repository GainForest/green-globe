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
          className="tree-photo"
          key={treeData.treePhoto}
          style={{
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
          className="tree-info"
          style={{
            borderRadius: treeData.treePhoto.endsWith('taxa_plants.png')
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
        {!treeData.treePhoto.endsWith('taxa_plants.png') && (
          <div>
            <img
              className="tree-photo"
              alt={treeData.name}
              src={treeData.treePhoto}
            />
          </div>
        )}
      </>
    )
}
