import React, { useEffect, useRef } from 'react'

import * as d3 from 'd3'

export const ShannonIndexLegend = () => {
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

    // Set domain from 0 to 5
    const colorScale = d3.scaleSequential(d3.interpolateViridis).domain([0, 5])

    // Color bar
    svg
      .append('g')
      .selectAll('rect')
      .data(d3.range(0, 5.01, 0.01)) // Use 5.01 to ensure we include 5
      .enter()
      .append('rect')
      .attr('x', (d) => d * (width / 5))
      .attr('y', 0)
      .attr('width', width / 500)
      .attr('height', height)
      .style('fill', (d) => colorScale(d))

    // Create axis
    const axisScale = d3.scaleLinear().domain([0, 5]).range([0, width])
    const axis = d3.axisBottom(axisScale).tickValues([0, 1, 2, 3, 4, 5])

    svg.append('g').attr('transform', `translate(0,${height})`).call(axis)
  }, [])

  return (
    <div>
      <h4>Shannon Index</h4>
      <svg ref={ref}></svg>
    </div>
  )
}

export default ShannonIndexLegend
