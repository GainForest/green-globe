export const processBiodiversityData = (b) => {
  const threatened = b.species.filter(
    (d) =>
      d.redlist === 'CR' ||
      d.redlist === 'EN' ||
      d.redlist === 'VU' ||
      d.redlist === 'EW'
  )
  const numThreatened = threatened.length
  const lowRisk = b.species.filter(
    (d) => d.redlist === 'CD' || d.redlist === 'NT' || d.redlist === 'LC'
  )
  const numLowRisk = lowRisk.length
  const numExtinct = b.species.filter((d) => d.redlist == 'EX').length
  const dataDeficient = b.species.filter(
    (d) => d.redlist === 'DD' || !d.redlist
  )
  const numDataDeficient = dataDeficient.length
  const total = b.species.length
  const threatenedPercentage = (numThreatened + numExtinct) / total
  const lowRiskPercentage = numLowRisk / total
  const dataDeficientPercentage = numDataDeficient / total
  return {
    ...b,
    numExtinct,
    lowRisk,
    numLowRisk,
    dataDeficient,
    numDataDeficient,
    threatened,
    numThreatened,
    threatenedPercentage,
    lowRiskPercentage,
    dataDeficientPercentage,
  }
}
