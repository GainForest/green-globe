import Skeleton, { SkeletonStyleProps } from 'react-loading-skeleton'
import { useThemeUI } from 'theme-ui'

const ThemedSkeleton = ({
  width,
  height,
  inline,
  duration,
  direction,
  enableAnimation,
  count,
}: SkeletonStyleProps & { count?: number }) => {
  const { theme } = useThemeUI()
  return (
    <>
      <Skeleton
        baseColor={theme.colors.hinted as string}
        highlightColor={theme.colors.skeletonHighlight as string}
        width={width}
        height={height}
        borderRadius={'8px'}
        inline={inline}
        duration={duration}
        direction={direction}
        enableAnimation={enableAnimation}
        count={count}
      />
    </>
  )
}
export default ThemedSkeleton
