import Skeleton, { SkeletonStyleProps } from 'react-loading-skeleton'

const ThemedSkeleton = ({
  width,
  height,
  inline,
  duration,
  direction,
  enableAnimation,
  count,
}: SkeletonStyleProps & { count?: number }) => {
  return (
    <>
      <Skeleton
        baseColor={'#f2f2f1'}
        highlightColor={'#f5f5f5'}
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
