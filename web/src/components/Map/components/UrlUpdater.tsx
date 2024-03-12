import { useEffect } from 'react'

import { useSelector } from 'react-redux'

import { navigate } from '@redwoodjs/router'

const UrlUpdater = ({ urlProjectId }) => {
  const infoOverlay = useSelector((state: State) => state.overlays.info)
  const selectedId = useSelector((state: State) => state.project.id)

  useEffect(() => {
    if (infoOverlay != null) {
      if (selectedId) {
        navigate(`/${selectedId}/${infoOverlay}`, { replace: true })
      } else {
        navigate(`/${urlProjectId}/${infoOverlay}`, { replace: true })
      }
    }
  }, [infoOverlay])

  return null
}

export default UrlUpdater
