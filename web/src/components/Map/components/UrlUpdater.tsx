import { useEffect } from 'react'

import { useSelector } from 'react-redux'

import { navigate } from '@redwoodjs/router'

const UrlUpdater = () => {
  const infoOverlay = useSelector((state: State) => state.overlays.info)
  const projectId = useSelector((state: State) => state.project.id)

  useEffect(() => {
    if (infoOverlay != null) {
      navigate(`/${projectId}/${infoOverlay}`, { replace: true })
    }
  }, [infoOverlay])

  return null
}

export default UrlUpdater
