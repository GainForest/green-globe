import React, { useEffect, useRef } from 'react'

import * as d3 from 'd3'

const DigitalElevationLegend = () => {
  const svgRef = useRef()

  useEffect(() => {
    const width = 400
    const height = 100
    const margin = { top: 20, right: 20, bottom: 30, left: 20 }

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    // Create color scale
    const colorScale = d3.scaleLinear().domain([0, 188]).range(['blue', 'red'])

    // Create horizontal gradient
    const defs = svg.append('defs')
    const linearGradient = defs
      .append('linearGradient')
      .attr('id', 'linear-gradient')

    linearGradient
      .selectAll('stop')
      .data(colorScale.range())
      .enter()
      .append('stop')
      .attr('offset', (d, i) => i / (colorScale.range().length - 1))
      .attr('stop-color', (d) => d)

    // Draw the rectangle and fill with gradient
    svg
      .append('rect')
      .attr('x', margin.left)
      .attr('y', margin.top)
      .attr('width', width - margin.left - margin.right)
      .attr('height', 20)
      .style('fill', 'url(#linear-gradient)')

    // Create a scale for the axis
    const axisScale = d3
      .scaleLinear()
      .domain([0, 188])
      .range([margin.left, width - margin.right])

    // Create and call the axis
    const axis = d3.axisBottom(axisScale).ticks(5)

    svg
      .append('g')
      .attr('transform', `translate(0, ${margin.top + 20})`)
      .call(axis)

    // Add a title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height - 5)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .text('Values are in meters above sea level')
  }, [])

  return <svg ref={svgRef}></svg>
}

export default DigitalElevationLegend
