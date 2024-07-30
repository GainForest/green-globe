import React, { useEffect, useRef } from 'react'

import * as d3 from 'd3'

export const SpeciesRichnessLegend = () => {
  const ref = useRef()

  useEffect(() => {
    const width = 300
    const height = 40
    const margin = { top: 20, right: 20, bottom: 30, left: 40 }

    const svg = d3
      .select(ref.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Set domain from 0 to 12
    const colorScale = d3.scaleSequential(d3.interpolateViridis).domain([0, 12])

    // Color bar
    svg
      .append('g')
      .selectAll('rect')
      .data(d3.range(0, 12.01, 0.01)) // Use 12.01 to ensure we include 12
      .enter()
      .append('rect')
      .attr('x', (d) => d * (width / 12))
      .attr('y', 0)
      .attr('width', width / 1200)
      .attr('height', height)
      .style('fill', (d) => colorScale(d))

    // Create axis
    const axisScale = d3.scaleLinear().domain([0, 12]).range([0, width])
    const axis = d3.axisBottom(axisScale).tickValues([0, 2, 4, 6, 8, 10, 12])

    svg.append('g').attr('transform', `translate(0,${height})`).call(axis)
  }, [])

  return (
    <div>
      <h4>Species Richness</h4>
      <svg ref={ref}></svg>
    </div>
  )
}

export default SpeciesRichnessLegend
