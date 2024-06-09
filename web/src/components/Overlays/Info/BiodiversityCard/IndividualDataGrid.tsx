import { HexagonalImage } from 'src/components/HexagonalImage/HexagonalImage'

// These are taken from the XPRIZE observations table
interface Individual {
  'Filename/Run': string //imageUrl
  class: string
}

export const IndividualDataGrid = ({ data }) => {
  console.log('the data is', data)
  if (data.length) {
    return (
      <div>
        {data.map((d) => (
          <div>
            <HexagonalImage
              key={d.class}
              alt={d.class}
              src={`${process.env.AWS_STORAGE}/${d['Filename/Run']}`}
            />
            {d.class}
          </div>
        ))}
      </div>
    )
  } else {
    return <div></div>
  }
}
