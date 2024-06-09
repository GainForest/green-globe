import { HexagonalImage } from 'src/components/HexagonalImage/HexagonalImage'

// These are taken from the XPRIZE observations table
interface Individual {
  'Filename/Run': string //imageUrl
  class: string
}

export const IndividualDataGrid = ({ data }) => {
  if (data.length) {
    return (
      <div>
        <h1> Insects Spotted </h1>
        <p> Insects detected by our insect trap. </p>
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
