export const HexagonalImage = ({ alt, src }) => (
  <img
    alt={alt}
    src={src}
    style={{
      objectFit: 'cover',
      clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
      height: '120px',
      width: '120px',
      minWidth: '120px',
    }}
  />
)
