import React, { useState, useMemo, useRef, useEffect } from 'react';
import { scaleLinear } from 'd3-scale';

const CircularLineChart = ({ data, maxFixedValue = null }) => {
  const [size, setSize] = useState(0);
  const containerRef = useRef(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setSize(Math.min(width, height));
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = size / 2 - 60;
  const innerRadius = size / 6;

  const frequencyExtent = useMemo(() => {
    const frequencies = data.map(d => d.frequency);
    return [Math.min(...frequencies), Math.max(...frequencies)];
  }, [data]);

  const rainbowColorScale = (frequency) => {
    const normalized = (frequency - frequencyExtent[0]) / (frequencyExtent[1] - frequencyExtent[0]);
    const hue = (1 - normalized) * 270; // Red is at 0, Violet is at 270
    return `hsl(${hue}, 100%, 50%)`;
  };

  const maxValue = useMemo(() => {
    if (maxFixedValue !== null) {
      return maxFixedValue;
    }
    return Math.max(...data.map(item => item.value));
  }, [data, maxFixedValue]);

  const linePath = useMemo(() => {
    const linePoints = data.map((item, index) => {
      const angle = (index / data.length) * Math.PI * 2 - Math.PI / 2;
      const radius = innerRadius + (maxRadius - innerRadius) * (item.value / maxValue);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return `${x},${y}`;
    });
    return `M ${linePoints.join(' L ')} Z`;
  }, [data, maxValue, innerRadius, maxRadius]);

  const axisLines = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * Math.PI * 2 - Math.PI / 2;
      const x1 = Math.cos(angle) * innerRadius;
      const y1 = Math.sin(angle) * innerRadius;
      const x2 = Math.cos(angle) * (maxRadius + 10);
      const y2 = Math.sin(angle) * (maxRadius + 10);
      return { x1, y1, x2, y2 };
    });
  }, [innerRadius, maxRadius]);

  const interactionPoints = useMemo(() => {
    return data.map((item, index) => {
      const angle = (index / data.length) * Math.PI * 2 - Math.PI / 2;
      const radius = innerRadius + (maxRadius - innerRadius) * (item.value / maxValue);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return { x, y, item };
    });
  }, [data, maxValue, innerRadius, maxRadius]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', aspectRatio: '1 / 1' }}>
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

            {/* Line chart */}
            <path
              d={linePath}
              fill="none"
              stroke="url(#rainbowGradient)"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Interaction points */}
            {interactionPoints.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="5"
                fill="transparent"
                stroke="transparent"
                onMouseEnter={() => setHoveredPoint(point.item)}
                onMouseLeave={() => setHoveredPoint(null)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </g>

          {/* Time labels */}
          {[0, 3, 6, 9, 12, 15, 18, 21].map((hour, index) => {
            const angle = (hour / 24) * Math.PI * 2 - Math.PI / 2;
            const x = centerX + Math.cos(angle) * (maxRadius + 25);
            const y = centerY + Math.sin(angle) * (maxRadius + 25);
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
            );
          })}

          {/* Color legend */}
          <defs>
            <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(270, 100%, 50%)" />
              <stop offset="20%" stopColor="hsl(216, 100%, 50%)" />
              <stop offset="40%" stopColor="hsl(162, 100%, 50%)" />
              <stop offset="60%" stopColor="hsl(108, 100%, 50%)" />
              <stop offset="80%" stopColor="hsl(54, 100%, 50%)" />
              <stop offset="100%" stopColor="hsl(0, 100%, 50%)" />
            </linearGradient>
          </defs>
          <rect x={size - 120} y={20} width={100} height={20} fill="url(#rainbowGradient)" />
          <text x={size - 120} y={55} fontSize={size / 60} fill="#666">Frequency</text>
          <text x={size - 120} y={70} fontSize={size / 60} fill="#666">{frequencyExtent[0].toFixed(0)}</text>
          <text x={size - 20} y={70} fontSize={size / 60} fill="#666" textAnchor="end">{frequencyExtent[1].toFixed(0)}</text>

          {/* Center label */}
          <text x={centerX} y={centerY} textAnchor="middle" fontSize={size / 50} fill="#666">461279</text>

          {/* Hover information */}
          {hoveredPoint && (
            <text x={centerX} y={size - 20} textAnchor="middle" fontSize={size / 40}>
              Time: {hoveredPoint.time.toFixed(2)} | Value: {hoveredPoint.value.toFixed(2)} | Frequency: {hoveredPoint.frequency.toFixed(2)}
            </text>
          )}

          {/* Max Value indicator */}
          <text x={size - 20} y={size - 20} textAnchor="end" fontSize={size / 50} fill="#666">
            Max Value: {maxValue.toFixed(2)}
          </text>
        </svg>
      )}
    </div>
  );
};

export default CircularLineChart;
