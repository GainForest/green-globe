import { RedlistStatus } from './biodiversityCardHelpers'

interface Species {
  image_url: string
  common: string
  family: string
  family_common: string
  scientificname: string
  redlist: string
}

export const AnimalPhoto = ({
  species,
  taxa,
}: {
  species: Species
  taxa: string
}) => {
  const src = species.image_url
    ? species.image_url
    : `https://mol.org/static/img/groups/taxa_${
        !taxa.includes('(')
          ? taxa.toLowerCase()
          : taxa.split(' ')[0].toLowerCase()
      }.png`

  return (
    <div style={{ display: 'flex' }}>
      <img
        alt={species.common}
        src={src}
        style={{
          objectFit: 'cover',
          clipPath:
            'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
          height: '120px',
          width: '120px',
        }}
      />
      <div style={{ margin: '12px 0 0 24px' }}>
        <p style={{ fontSize: '1rem', marginBottom: '0px' }}>
          {species.common}
        </p>
        <i style={{ fontSize: '0.75rem' }}>{species.scientificname}</i>
        <RedlistStatus redlist={species.redlist} />
      </div>
    </div>
  )
}
