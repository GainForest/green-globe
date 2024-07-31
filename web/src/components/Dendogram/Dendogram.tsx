import React, { useEffect, useState, useRef, useCallback } from 'react'

import { useSelector } from 'react-redux'

import { toKebabCase } from 'src/utils/toKebabCase'

const Dendogram = () => {
  const [imageExists, setImageExists] = useState(false)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showPDF, setShowPDF] = useState(false)
  const [loading, setLoading] = useState(true)
  const containerRef = useRef(null)

  const kebabCasedProjectName = useSelector((state) =>
    toKebabCase(state.project.name)
  )

  useEffect(() => {
    const img = new Image()
    img.src = `${process.env.AWS_STORAGE}/dendogram/${kebabCasedProjectName}_dendogram.svg`
    img.onload = () => {
      setImageExists(true)
      setLoading(false)
    }
    img.onerror = () => {
      setImageExists(false)
      setLoading(false)
    }
  }, [kebabCasedProjectName])

  const handleZoomIn = useCallback(() => {
    setScale((prevScale) => Math.min(prevScale * 1.2, 3))
  }, [])

  const handleZoomOut = useCallback(() => {
    setScale((prevScale) => Math.max(prevScale / 1.2, 0.5))
  }, [])

  const handleReset = useCallback(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [])

  const handleMouseDown = useCallback(
    (e) => {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    },
    [position]
  )

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        })
      }
    },
    [isDragging, dragStart]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  const toggleView = () => {
    setShowPDF(!showPDF)
  }

  if (loading) {
    return <Loading />
  }
  if (!imageExists) {
    return <NoData />
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold">Species Dendrogram</h2>
        <p className="text-sm text-gray-600">
          All species recorded in this project.
        </p>
      </div>
      <div className="p-4">
        <div className="flex justify-center space-x-2 mb-4">
          <button
            onClick={handleZoomIn}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Zoom In
          </button>
          <button
            onClick={handleZoomOut}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Zoom Out
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Reset
          </button>
          <button
            onClick={toggleView}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            {showPDF ? 'Show Dendrogram' : 'Show PDF'}
          </button>
        </div>
        {showPDF ? (
          <PDFViewer projectId={kebabCasedProjectName} />
        ) : (
          <div
            ref={containerRef}
            className="overflow-hidden"
            style={{
              width: '100%',
              height: '500px',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onMouseDown={handleMouseDown}
          >
            <div
              style={{
                transform: `scale(${scale}) translate(${
                  position.x / scale
                }px, ${position.y / scale}px)`,
                transformOrigin: '0 0',
                transition: isDragging ? 'none' : 'transform 0.3s ease-out',
              }}
            >
              <img
                src={`${process.env.AWS_STORAGE}/dendogram/${kebabCasedProjectName}_dendogram.svg`}
                alt="Species dendrogram"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const Loading = () => (
  <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
    <p className="text-center text-gray-600">
      Searching for the project dendrogram...
    </p>
  </div>
)

const NoData = () => (
  <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
    <p className="text-center text-gray-600">
      No species dendrogram has been generated for this project.
    </p>
  </div>
)

const PDFViewer = ({ projectId }) => {
  return (
    <div className="w-full h-[500px]">
      <iframe
        src={`${process.env.AWS_STORAGE}/dendogram/${projectId}.pdf`}
        title="PDF Viewer"
        width="100%"
        height="500px"
        style={{ border: 'none' }}
      />
    </div>
  )
}

export default Dendogram
