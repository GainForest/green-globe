import React, { useState, useEffect, useMemo, useRef } from 'react';
import { csv } from 'd3-fetch';
import { scaleLinear } from 'd3-scale';

const CircularMultiLineChart = ({ data, maxFixedValue = null }) => {
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

  const frequencies = useMemo(() => {
    return ['low', 'medium', 'high', '20000', '60000'];
  }, []);

  const colorScale = scaleLinear()
    .domain([0, frequencies.length - 1])
    .range([240, 0]); // From blue (240) to red (0)

  const getColor = (index) => `hsl(${colorScale(index)}, 100%, 50%)`;

  const maxValue = useMemo(() => {
    if (maxFixedValue !== null) {
      return maxFixedValue;
    }
    return Math.max(...data.flatMap(item => frequencies.map(freq => item[freq])));
  }, [data, maxFixedValue, frequencies]);

  const linePaths = useMemo(() => {
    return frequencies.map(freq => {
      const linePoints = data.map((item, index) => {
        const angle = (index / data.length) * Math.PI * 2 - Math.PI / 2;
        const radius = innerRadius + (maxRadius - innerRadius) * (item[freq] / maxValue);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return `${x},${y}`;
      });
      return `M ${linePoints.join(' L ')} Z`;
    });
  }, [data, maxValue, innerRadius, maxRadius, frequencies]);

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
      return frequencies.map(freq => {
        const radius = innerRadius + (maxRadius - innerRadius) * (item[freq] / maxValue);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return { x, y, item, freq };
      });
    }).flat();
  }, [data, maxValue, innerRadius, maxRadius, frequencies]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', aspectRatio: '1 / 1' }}>
      {size > 0 && (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <g transform={`translate(${centerX},${centerY})`}>
            <circle r={maxRadius} fill="none" stroke="#666" strokeWidth="2" />
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
            {linePaths.map((path, index) => (
              <path
                key={index}
                d={path}
                fill="none"
                stroke={getColor(index)}
                strokeWidth="2"
                strokeLinejoin="round"
              />
            ))}
            {interactionPoints.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="5"
                fill="transparent"
                stroke="transparent"
                onMouseEnter={() => setHoveredPoint(point)}
                onMouseLeave={() => setHoveredPoint(null)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </g>
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
          {frequencies.map((freq, index) => (
            <g key={freq} transform={`translate(${size - 120}, ${20 + index * 20})`}>
              <rect width="20" height="10" fill={getColor(index)} />
              <text x="25" y="9" fontSize={size / 60} fill="#666">{freq}</text>
            </g>
          ))}
          <text x={centerX} y={centerY} textAnchor="middle" fontSize={size / 50} fill="#666">{maxValue.toFixed(2)}</text>
          {hoveredPoint && (
            <text x={centerX} y={size - 20} textAnchor="middle" fontSize={size / 40}>
              Time: {hoveredPoint.item.time.toFixed(2)} | {hoveredPoint.freq}: {hoveredPoint.item[hoveredPoint.freq].toFixed(2)}
            </text>
          )}
          <text x={size - 20} y={size - 20} textAnchor="end" fontSize={size / 50} fill="#666">
            Max Average Value: {maxValue.toFixed(2)}
          </text>
        </svg>
      )}
    </div>
  );
};

const CircularMultiLineChartWithCSVLoader = ({ csvPath, maxFixedValue = null }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvData = await csv(csvPath, d => ({
          time: +d.time,
          low: +d.low,
          medium: +d.medium,
          high: +d.high,
          '20000': +d['20000'],
          '60000': +d['60000']
        }));
        setData(csvData);
      } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
      }
    };

    fetchData();
  }, [csvPath]);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return <CircularMultiLineChart data={data} maxFixedValue={maxFixedValue} />;
};

export default CircularMultiLineChartWithCSVLoader;
