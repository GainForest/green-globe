import { useEffect } from 'react'

import { useSelector } from 'react-redux'

import { navigate } from '@redwoodjs/router'

const UrlUpdater = ({ urlProjectId }) => {
  const infoOverlay = useSelector((state: State) => state.overlays.info)

  useEffect(() => {
    if (infoOverlay != null) {
      navigate(`/${urlProjectId}/${infoOverlay}`, { replace: true })
    }
  }, [infoOverlay])

  return null
}

export default UrlUpdater
