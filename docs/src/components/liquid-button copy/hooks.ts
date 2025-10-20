import { useSize } from '@wanteddev/wds';
import { useCallback, useEffect, useState } from 'react';

import { DEFAULT_SIZE } from './constants';

import type { CSSProperties, RefObject } from 'react';

type UseLiquidButtonAnimationParams = {
  containerRef?: RefObject<HTMLDivElement | null>;
  node: HTMLButtonElement | null;
};

export const useLiquidButtonAnimation = ({
  containerRef,
  node,
}: UseLiquidButtonAnimationParams) => {
  const size = useSize(node) || DEFAULT_SIZE;

  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const container = containerRef?.current || node;
      if (!container) {
        return;
      }

      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    },
    [containerRef, node],
  );

  const calculateDirectionalScale = useCallback(() => {
    if (!mousePos.x || !mousePos.y || !node) {
      return 'scaleX(1) scaleY(1)';
    }

    const rect = node.getBoundingClientRect();
    const pillCenterX = rect.left + rect.width / 2;
    const pillCenterY = rect.top + rect.height / 2;
    const pillWidth = size.width;
    const pillHeight = size.height;

    const deltaX = mousePos.x - pillCenterX;
    const deltaY = mousePos.y - pillCenterY;

    const edgeDistanceX = Math.max(0, Math.abs(deltaX) - pillWidth / 2);
    const edgeDistanceY = Math.max(0, Math.abs(deltaY) - pillHeight / 2);
    const edgeDistance = Math.sqrt(
      edgeDistanceX * edgeDistanceX + edgeDistanceY * edgeDistanceY,
    );

    const activationZone = 200;

    if (edgeDistance > activationZone) {
      return 'scaleX(1) scaleY(1)';
    }

    const fadeInFactor = 1 - edgeDistance / activationZone;

    const centerDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (centerDistance === 0) {
      return 'scaleX(1) scaleY(1)';
    }

    const normalizedX = deltaX / centerDistance;
    const normalizedY = deltaY / centerDistance;

    const stretchIntensity =
      Math.min(centerDistance / 300, 1) * 0.35 * fadeInFactor;

    const scaleX =
      1 +
      Math.abs(normalizedX) * stretchIntensity * 0.3 -
      Math.abs(normalizedY) * stretchIntensity * 0.15;

    const scaleY =
      1 +
      Math.abs(normalizedY) * stretchIntensity * 0.3 -
      Math.abs(normalizedX) * stretchIntensity * 0.15;

    return `scaleX(${Math.max(0.8, scaleX)}) scaleY(${Math.max(0.8, scaleY)})`;
  }, [mousePos.x, mousePos.y, node, size.height, size.width]);

  const calculateFadeInFactor = useCallback(() => {
    if (!mousePos.x || !mousePos.y || !node) {
      return 0;
    }

    const rect = node.getBoundingClientRect();
    const pillCenterX = rect.left + rect.width / 2;
    const pillCenterY = rect.top + rect.height / 2;
    const pillWidth = size.width;
    const pillHeight = size.height;

    const edgeDistanceX = Math.max(
      0,
      Math.abs(mousePos.x - pillCenterX) - pillWidth / 2,
    );
    const edgeDistanceY = Math.max(
      0,
      Math.abs(mousePos.y - pillCenterY) - pillHeight / 2,
    );
    const edgeDistance = Math.sqrt(
      edgeDistanceX * edgeDistanceX + edgeDistanceY * edgeDistanceY,
    );

    const activationZone = 200;
    return edgeDistance > activationZone
      ? 0
      : 1 - edgeDistance / activationZone;
  }, [mousePos, size, node]);

  const calculateElasticTranslation = useCallback(() => {
    if (!node) {
      return { x: 0, y: 0 };
    }

    const fadeInFactor = calculateFadeInFactor();
    const rect = node.getBoundingClientRect();
    const pillCenterX = rect.left + rect.width / 2;
    const pillCenterY = rect.top + rect.height / 2;

    return {
      x: (mousePos.x - pillCenterX) * 0.35 * 0.1 * fadeInFactor,
      y: (mousePos.y - pillCenterY) * 0.35 * 0.1 * fadeInFactor,
    };
  }, [mousePos, calculateFadeInFactor, node]);

  useEffect(() => {
    const container = containerRef?.current || node;
    if (!container) {
      return;
    }

    container.addEventListener('mousemove', handleMouseMove as EventListener);

    return () => {
      container.removeEventListener(
        'mousemove',
        handleMouseMove as EventListener,
      );
    };
  }, [handleMouseMove, node, containerRef]);

  return {
    '--liquid-button-transform-translate-x': `${calculateElasticTranslation().x}px`,
    '--liquid-button-transform-translate-y': `${calculateElasticTranslation().y}px`,
    '--liquid-button-transform-scale': calculateDirectionalScale(),
  } as CSSProperties;
};
