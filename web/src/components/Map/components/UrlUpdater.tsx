import { useEffect } from 'react'

import { useSelector } from 'react-redux'

import { navigate } from '@redwoodjs/router'

const UrlUpdater = ({ urlProjectId }) => {
  const infoOverlay = useSelector((state: State) => state.overlays.info)

  useEffect(() => {
    if (infoOverlay != null) {
      // Assuming `infoOverlay` is null or undefined by default
      // Update the URL without navigating
      navigate(`/${urlProjectId}/${infoOverlay}`, { replace: true })
    }
  }, [infoOverlay, urlProjectId])

  return null // This component does not render anything
}

export default UrlUpdater
