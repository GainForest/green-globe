import React, { useState, useMemo, useRef, useEffect } from 'react'

import { csv } from 'd3-fetch'
import { scaleLinear } from 'd3-scale'

const parseFrequency = (frequencyString) => {
  const parseValue = (val) => {
    if (val.toLowerCase().endsWith('k')) {
      return parseFloat(val) * 1000
    }
    return parseFloat(val)
  }

  if (frequencyString.includes('-')) {
    const [min, max] = frequencyString.split('-').map(parseValue)
    return (min + max) / 2
  }
  return parseValue(frequencyString)
}

export const useCSVToData = (csvPath) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [debugInfo, setDebugInfo] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const csvData = await csv(csvPath)

        const headers = Object.keys(csvData[0]).filter((key) => key !== '')

        const convertedData = csvData.map((row) => {
          const timeValue = parseFloat(row[''])

          // Find max frequency for this row
          let maxFrequency = ''
          let maxValue = -Infinity

          headers.forEach((header) => {
            const value = parseFloat(row[header])
            if (!isNaN(value) && value > maxValue) {
              maxValue = value
              maxFrequency = header
            }
          })

          return {
            time: (timeValue / 100) * 24,
            value: Math.floor(maxValue),
            frequency: parseFrequency(maxFrequency),
          }
        })

        setData(convertedData)
        setDebugInfo({
          headers,
          sampleRawData: csvData.slice(0, 5),
          sampleConvertedData: convertedData.slice(0, 5),
        })
        setLoading(false)
      } catch (error) {
        console.error('Error fetching or processing CSV:', error)
        setError(error)
        setLoading(false)
      }
    }

    fetchData()
  }, [csvPath])

  return { data, loading, error, debugInfo }
}

const CircularBarChart = ({ csvPath, maxFixedValue = null }) => {
  const { data, error } = useCSVToData(csvPath)

  const [size, setSize] = useState(0)
  const containerRef = useRef(null)
  const [hoveredBar, setHoveredBar] = useState(null)

  useEffect(() => {
    if (!containerRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setSize(Math.min(width, height))
      }
    })

    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const centerX = size / 2
  const centerY = size / 2
  const maxRadius = size / 2 - 60
  const innerRadius = size / 6
  const barWidth = (2 * Math.PI) / data.length

  const frequencyExtent = useMemo(() => {
    const frequencies = data.map((d) => d.frequency)
    return [Math.min(...frequencies), Math.max(...frequencies)]
  }, [data])

  const rainbowColorScale = (frequency) => {
    const normalized =
      (frequency - frequencyExtent[0]) /
      (frequencyExtent[1] - frequencyExtent[0])
    const hue = (1 - normalized) * 270 // Red is at 0, Violet is at 270
    return `hsl(${hue}, 100%, 50%)`
  }

  const maxValue = useMemo(() => {
    if (maxFixedValue !== null) {
      return maxFixedValue
    }
    return Math.max(...data.map((item) => item.value))
  }, [data, maxFixedValue])

  const bars = useMemo(() => {
    return data.map((item, index) => {
      const angle = (index / data.length) * Math.PI * 2 - Math.PI / 2
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const barHeight = (maxRadius - innerRadius) * (item.value / maxValue)

      const path = [
        `M ${cos * innerRadius} ${sin * innerRadius}`,
        `L ${cos * (innerRadius + barHeight)} ${
          sin * (innerRadius + barHeight)
        }`,
        `A ${innerRadius + barHeight} ${innerRadius + barHeight} 0 0 1 ${
          Math.cos(angle + barWidth) * (innerRadius + barHeight)
        } ${Math.sin(angle + barWidth) * (innerRadius + barHeight)}`,
        `L ${Math.cos(angle + barWidth) * innerRadius} ${
          Math.sin(angle + barWidth) * innerRadius
        }`,
        'Z',
      ].join(' ')

      return { path, color: rainbowColorScale(item.frequency), item }
    })
  }, [data, maxValue, innerRadius, maxRadius, barWidth, rainbowColorScale])

  const axisLines = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * Math.PI * 2 - Math.PI / 2
      const x1 = Math.cos(angle) * innerRadius
      const y1 = Math.sin(angle) * innerRadius
      const x2 = Math.cos(angle) * (maxRadius + 10)
      const y2 = Math.sin(angle) * (maxRadius + 10)
      return { x1, y1, x2, y2 }
    })
  }, [innerRadius, maxRadius])

  if (error) {
    // pretty bad but !data.length doesn't work
    return <p>No soundscape detected in this project.</p>
  }
  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', aspectRatio: '1 / 1' }}
    >
      {size > 0 && (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <g transform={`translate(${centerX},${centerY})`}>
            {/* Bounding circle */}
            <circle r={maxRadius} fill="none" stroke="#666" strokeWidth="2" />

            {/* Axis lines */}
            {axisLines.map((line, index) => (
              <line
                key={index}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#666"
                strokeWidth="0.5"
              />
            ))}

            {/* Bars */}
            {bars.map((bar, index) => (
              <path
                key={index}
                d={bar.path}
                fill={bar.color}
                stroke="none"
                onMouseEnter={() => setHoveredBar(bar.item)}
                onMouseLeave={() => setHoveredBar(null)}
                style={{ transition: 'opacity 0.2s' }}
                opacity={hoveredBar && hoveredBar !== bar.item ? 0.3 : 1}
              />
            ))}
          </g>

          {/* Time labels */}
          {[0, 3, 6, 9, 12, 15, 18, 21].map((hour, index) => {
            const angle = (hour / 24) * Math.PI * 2 - Math.PI / 2
            const x = centerX + Math.cos(angle) * (maxRadius + 25)
            const y = centerY + Math.sin(angle) * (maxRadius + 25)
            return (
              <text
                key={index}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={size / 50}
                fill="#666"
              >
                {`${hour}:00`}
              </text>
            )
          })}

          {/* Color legend */}
          <defs>
            <linearGradient
              id="rainbowGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="hsl(270, 100%, 50%)" />
              <stop offset="20%" stopColor="hsl(216, 100%, 50%)" />
              <stop offset="40%" stopColor="hsl(162, 100%, 50%)" />
              <stop offset="60%" stopColor="hsl(108, 100%, 50%)" />
              <stop offset="80%" stopColor="hsl(54, 100%, 50%)" />
              <stop offset="100%" stopColor="hsl(0, 100%, 50%)" />
            </linearGradient>
          </defs>
          <rect
            x={size - 120}
            y={20}
            width={100}
            height={20}
            fill="url(#rainbowGradient)"
          />
          <text x={size - 120} y={55} fontSize={size / 60} fill="#666">
            Frequency
          </text>
          <text x={size - 120} y={70} fontSize={size / 60} fill="#666">
            {frequencyExtent[0].toFixed(0)}
          </text>
          <text
            x={size - 20}
            y={70}
            fontSize={size / 60}
            fill="#666"
            textAnchor="end"
          >
            {frequencyExtent[1].toFixed(0)}
          </text>

          {/* Center label */}
          <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            fontSize={size / 50}
            fill="#666"
          >
            {maxValue.toFixed(2)}
          </text>

          {/* Hover information */}
          {hoveredBar && (
            <text
              x={centerX}
              y={size - 20}
              textAnchor="middle"
              fontSize={size / 40}
            >
              Time: {hoveredBar.time.toFixed(2)} | Value:{' '}
              {hoveredBar.value.toFixed(2)} | Frequency:{' '}
              {hoveredBar.frequency.toFixed(2)}
            </text>
          )}

          {/* Max Value indicator */}
          <text
            x={size - 20}
            y={size - 20}
            textAnchor="end"
            fontSize={size / 50}
            fill="#666"
          >
            Max Value: {maxValue.toFixed(2)}
          </text>
        </svg>
      )}
    </div>
  )
}

export default CircularBarChart
