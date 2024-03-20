import { breakpoints } from 'src/constants'

export const LandCoverLegend = ({ mediaSize }) => {
  const options = [
    ['#006400', 'Tree cover'],
    ['#ffbb22', 'Shrubland'],
    ['#ffff4c', 'Grassland'],
    ['#f096ff', 'Cropland'],
    ['#fa0000', 'Built-up'],
    ['#b4b4b4', 'Bare / sparse vegetation'],
    ['#f0f0f0', 'Snow and ice'],
    ['#0064c8', 'Permanent water bodies'],
    ['#0096a0', 'Herbaceous wetland'],
    ['#00cf75', 'Mangroves'],
    ['#fae6a0', 'Moss and lichen'],
  ]

  return (
    <div
      style={{
        position: 'absolute',
        bottom: mediaSize < breakpoints.m ? null : '120px',
        top: mediaSize < breakpoints.m ? '160px' : null,
        right: mediaSize < breakpoints.m ? null : '10px',
        left: mediaSize < breakpoints.m ? '5px' : null,
        zIndex: 0,
      }}
    >
      {options.map((option) => (
        <div
          key={option[0]}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '4px',
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              backgroundColor: option[0],
            }}
          />
          <p
            style={{
              margin: '0 4px',
              fontSize: mediaSize < breakpoints.m ? '10px' : '16px',
              padding: 0,
              textShadow:
                '1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, -1px 1px 1px black',
            }}
          >
            {option[1]}
          </p>
        </div>
      ))}
    </div>
  )
}
