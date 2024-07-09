import { useEffect, useRef } from 'react'

import * as d3 from 'd3'

const PM2point5Legend = () => {
  const svgRef = useRef(null)

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current)
      const width = 300
      const height = 60
      const margin = { top: 20, right: 10, bottom: 30, left: 10 }

      svg.attr('width', width).attr('height', height)

      const gradient = svg
        .append('defs')
        .append('linearGradient')
        .attr('id', 'gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%')

      gradient.append('stop').attr('offset', '0%').attr('stop-color', '#67a9cf')

      gradient
        .append('stop')
        .attr('offset', '50%')
        .attr('stop-color', '#f7f7f7')

      gradient
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#ef8a62')

      svg
        .append('rect')
        .attr('x', margin.left)
        .attr('y', margin.top)
        .attr('width', width - margin.left - margin.right)
        .attr('height', 20)
        .style('fill', 'url(#gradient)')

      const scale = d3
        .scaleLinear()
        .domain([-0.6, 0.6])
        .range([margin.left, width - margin.right])

      const tickValues = [-0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6]

      const axis = d3
        .axisBottom(scale)
        .tickValues(tickValues)
        .tickFormat(d3.format('.2f'))

      svg
        .append('g')
        .attr('transform', `translate(0,${margin.top + 20})`)
        .call(axis)
        .call((g) => g.select('.domain').remove()) // Remove the axis line
        .call((g) => g.selectAll('.tick line').attr('y2', 6)) // Extend tick marks
    }
  }, [])
  return <svg ref={svgRef}></svg>
}

export default PM2point5Legend
