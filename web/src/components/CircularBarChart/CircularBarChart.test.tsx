import { render } from '@redwoodjs/testing/web'

import CircularBarChart from './CircularBarChart'

import React, { useMemo } from 'react';


//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CircularBarChart', () => {
  const sampleData = useMemo(() => {
    return Array.from({ length: 1000 }, (_, i) => ({
      time: (i / 1000) * 24,
      value: Math.random() * 100,
      frequency: Math.floor(Math.random() * 10000)
    }));
  }, []);

  it('renders successfully', () => {
    expect(() => {
      render(<div style={{ width: '100%', height: '100vh' }}>
      <CircularBarChart data={sampleData} width={800} height={600} />
    </div>)
    }).not.toThrow()
  })
})
