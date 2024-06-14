import ThemedSkeleton from 'src/components/Map/components/Skeleton'
import { ToggleButton } from 'src/components/Map/components/ToggleButton'

import { MeasuredDataGridCard } from './MeasuredDataPhoto'

export const MeasuredTreesGrid = ({
  sortBy,
  setSortBy,
  measuredData,
  handleSpeciesClick,
  selectedSpecies,
  loading,
}) => {
  if (loading) {
    return (
      <>
        <h3>
          <ThemedSkeleton width={'120px'} />
        </h3>
        <div></div>
      </>
    )
  } else {
    if (measuredData.length > 0) {
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {measuredData.map((group, idx) => (
            <div style={{ flex: '1 1 50%' }} key={group.title + idx}>
              <div
                style={{
                  border: '1px solid #2f3030',
                  height: '80px',
                  width: '160px',
                  margin: '16px 0px',
                  borderRadius: '10px',
                }}
              >
                <h4 style={{ margin: '16px' }}>
                  Total {group.title.toLowerCase()}
                </h4>
                <h2 style={{ float: 'right', margin: '0 16px' }}>
                  {group.total}
                </h2>
              </div>
              <h3>{group.title}</h3>
              {group.title === 'Trees' && (
                <p style={{ marginTop: '8px' }}>
                  Click a species to highlight them on the map
                </p>
              )}
              <p>Sort By:</p>
              <ToggleButton
                active={sortBy}
                setToggle={setSortBy}
                options={['Name', 'Count']}
              />
              {group.species.map((species) => (
                <div
                  className={
                    species.name == selectedSpecies ? null : 'species-button'
                  }
                  key={species.name}
                >
                  <MeasuredDataGridCard
                    {...species}
                    handleSpeciesClick={handleSpeciesClick}
                    selectedSpecies={selectedSpecies}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )
    } else {
      return <p>There is not yet any measured trees for this project.</p>
    }
  }
}
