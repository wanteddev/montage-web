import { Skeleton } from '@wanteddev/wds';

export const TextSkeleton = () => {
  return (
    <>
      <Skeleton variant="text" width="200px" height="16px" />
      <Skeleton variant="text" width="300px" height="16px" />
      <Skeleton variant="text" width="150px" height="16px" />
      <Skeleton variant="text" width="250px" height="16px" animation={false} />
    </>
  );
};

export const CircleSkeleton = () => {
  return (
    <>
      <Skeleton variant="circle" width="40px" height="40px" />
      <Skeleton variant="circle" width="60px" height="60px" />
      <Skeleton variant="circle" width="80px" height="80px" />
      <Skeleton variant="circle" width="40px" height="40px" animation={false} />
    </>
  );
};

export const RectangleSkeleton = () => {
  return (
    <>
      <Skeleton variant="rectangle" width="200px" height="100px" />
      <Skeleton variant="rectangle" width="300px" height="150px" />
      <Skeleton variant="rectangle" width="150px" height="80px" />
      <Skeleton
        variant="rectangle"
        width="250px"
        height="120px"
        animation={false}
      />
    </>
  );
};
