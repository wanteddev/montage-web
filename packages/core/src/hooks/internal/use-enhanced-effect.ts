import { useEffect, useLayoutEffect } from 'react';

const useEnhancedEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useEnhancedEffect;
