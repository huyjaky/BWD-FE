import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonShowHouse = () => {
  return (
    <>
      <SkeletonTheme >
          <Skeleton width='100%' height={300}/>
          <Skeleton count={3} width='100%' height={30}/>
      </SkeletonTheme>
    </>
  );
};
export default SkeletonShowHouse;
