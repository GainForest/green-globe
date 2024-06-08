import { useEffect, useState } from 'react'

import * as d3 from 'd3'

export const RadialChart = () => {
  const [csvData, setCsvData] = useState()
  const width = 928
  const height = width
  const margin = 10
  const innerRadius = width / 5
  const outerRadius = width / 2 - margin

  const fetchCsv = async () => {
    await d3
      .csv(
        `${process.env.AWS_STORAGE}/pmn/median_results_final.csv`,
        d3.autoType
      )
      .then((d) => setCsvData(d))
  }

  useEffect(() => {
    fetchCsv()
  }, [])

  useEffect(() => {
    if (csvData) {
      // Time
      const x = d3
        .scaleRadial()
        .domain([0, 24])
        .range([0, 2 * Math.PI])

      const y = d3
        .scaleRadial()
        .domain([-20000, 20000])
        .range([0, width / 12])

      const line = d3
        .lineRadial()
        .curve(d3.curveLinearClosed)
        .angle((d) => x(d.time))

      const area = d3
        .areaRadial()
        .curve(d3.curveLinearClosed)
        .angle((d) => x(d.time))

      const svg = d3
        .select('#radial-svg')
        .attr('viewBox', [-width / 2, -height / 2, width, height])
        .attr('style', 'width: 100%; height: auto; font: 10px sans-serif;')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')

      svg
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', line.radius((d) => y(d.low))(csvData))

      svg
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-width', 1.5)
        .attr('d', line.radius((d) => y(d.medium))(csvData))

      svg
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', 'yellow')
        .attr('stroke-width', 1.5)
        .attr('d', line.radius((d) => y(d.high))(csvData))

      svg
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', line.radius((d) => y(d[1500]))(csvData))

      // svg
      //   .append('g')
      //   .selectAll()
      //   .data(x.ticks())
      //   .join('g')
      //   .each((d, i) => d.id)
      //   .call((g) =>
      //     g
      //       .append('path')
      //       .attr('stroke', '#000')
      //       .attr('stroke-opacity', 0.2)
      //       .attr(
      //         'd',
      //         (d) => `
      //           M${d3.pointRadial(x(d), innerRadius)}
      //           L${d3.pointRadial(x(d), outerRadius)}
      //         `
      //       )
      //   )
      //   .call((g) =>
      //     g
      //       .append('path')
      //       .attr('id', (d) => d.id.id)
      //       .datum((d) => [d, d3.utcMonth.offset(d, 1)])
      //       .attr('fill', 'none')
      //       .attr(
      //         'd',
      //         ([a, b]) => `
      //           M${d3.pointRadial(x(a), innerRadius)}
      //           A${innerRadius},${innerRadius} 0,0,1 ${d3.pointRadial(
      //           x(b),
      //           innerRadius
      //         )}
      //         `
      //       )
      //   )
      //   .call((g) =>
      //     g
      //       .append('text')
      //       .append('textPath')
      //       .attr('startOffset', 6)
      //       .attr('xlink:href', (d) => d.id.href)
      //       .text(d3.utcFormat('%B'))
      //   )
    }
  }, [csvData])

  return <svg width="50" height="50" id="radial-svg"></svg>
}
