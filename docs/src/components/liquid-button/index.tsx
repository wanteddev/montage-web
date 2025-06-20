import {
  Box,
  FlexBox,
  Slot,
  Typography,
  useComposedRefs,
  useSize,
} from '@wanteddev/wds';
import { forwardRef, useCallback, useEffect, useId, useState } from 'react';

import Filter from './filter';
import {
  liquidButtonContentStyle,
  liquidButtonGlassFilterStyle,
  liquidButtonGlassStyle,
  liquidButtonInteractionOverlayFirstStyle,
  liquidButtonInteractionOverlaySecondStyle,
  liquidButtonInteractionOverlayThirdStyle,
  liquidButtonLineBaseStyle,
  liquidButtonLineOverlayFirstStyle,
  liquidButtonLineOverlaySecondaryStyle,
  liquidButtonShadowStyle,
  liquidButtonStyle,
  liquidButtonWrapperStyle,
} from './style';
import { DEFAULT_SIZE } from './constants';

import type { PolymorphicComponent, PolymorphicProps } from '@wanteddev/wds';
import type { ElementType, ForwardedRef } from 'react';

type Props = {
  containerRef?: React.RefObject<HTMLDivElement>;
};

const LiquidButton = forwardRef(
  <T extends ElementType = 'button'>(
    { children, containerRef, ...props }: PolymorphicProps<Props, T>,
    ref: ForwardedRef<T>,
  ) => {
    const filterId = useId();

    const [node, setNode] = useState<HTMLButtonElement | null>(null);

    const composedRefs = useComposedRefs(ref, setNode as (v: T | null) => void);

    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const size = useSize(node) || DEFAULT_SIZE;

    const [mousePos, setMousePos] = useState({
      x: 0,
      y: 0,
    });
    const [mouseOffset, setMouseOffset] = useState({
      x: 0,
      y: 0,
    });

    // Internal mouse tracking
    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        const container = containerRef?.current || node;
        if (!container) {
          return;
        }

        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        setMouseOffset({
          x: ((e.clientX - centerX) / rect.width) * 100,
          y: ((e.clientY - centerY) / rect.height) * 100,
        });

        setMousePos({
          x: e.clientX,
          y: e.clientY,
        });
      },
      [containerRef, node],
    );

    // Calculate directional scaling based on mouse position
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

      // Calculate distance from mouse to pill edges (not center)
      const edgeDistanceX = Math.max(0, Math.abs(deltaX) - pillWidth / 2);
      const edgeDistanceY = Math.max(0, Math.abs(deltaY) - pillHeight / 2);
      const edgeDistance = Math.sqrt(
        edgeDistanceX * edgeDistanceX + edgeDistanceY * edgeDistanceY,
      );

      // Activation zone: 200px from edges
      const activationZone = 200;

      // If outside activation zone, no effect
      if (edgeDistance > activationZone) {
        return 'scaleX(1) scaleY(1)';
      }

      // Calculate fade-in factor (1 at edge, 0 at activation zone boundary)
      const fadeInFactor = 1 - edgeDistance / activationZone;

      // Normalize the deltas for direction
      const centerDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (centerDistance === 0) {
        return 'scaleX(1) scaleY(1)';
      }

      const normalizedX = deltaX / centerDistance;
      const normalizedY = deltaY / centerDistance;

      // Calculate stretch factors with fade-in
      const stretchIntensity =
        Math.min(centerDistance / 300, 1) * 0.35 * fadeInFactor;

      // X-axis scaling: stretch horizontally when moving left/right, compress when moving up/down
      const scaleX =
        1 +
        Math.abs(normalizedX) * stretchIntensity * 0.3 -
        Math.abs(normalizedY) * stretchIntensity * 0.15;

      // Y-axis scaling: stretch vertically when moving up/down, compress when moving left/right
      const scaleY =
        1 +
        Math.abs(normalizedY) * stretchIntensity * 0.3 -
        Math.abs(normalizedX) * stretchIntensity * 0.15;

      return `scaleX(${Math.max(0.8, scaleX)}) scaleY(${Math.max(0.8, scaleY)})`;
    }, [mousePos.x, mousePos.y, node, size.height, size.width]);

    // Helper function to calculate fade-in factor based on distance from element edges
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

    // Helper function to calculate elastic translation
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

    const transformStyle = `translate(${calculateElasticTranslation().x}px, ${calculateElasticTranslation().y}px) ${isActive ? 'scaleX(0.96) scaleY(0.96)' : calculateDirectionalScale()}`;

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

    return (
      <Box
        sx={liquidButtonWrapperStyle}
        style={
          {
            '--liquid-button-transform': transformStyle,
            '--liquid-button-transform-relative': transformStyle,
            '--liquid-button-transition': 'all ease-out 0.2s',
            '--liquid-button-radius': '145px',
            '--liquid-button-width': `${size.width}px`,
            '--liquid-button-height': `${size.height}px`,
            '--liquid-button-filter': `url(#${filterId})`,
          } as React.CSSProperties
        }
      >
        <Slot ref={composedRefs} {...props}>
          <Box
            as={props.as || 'button'}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            sx={[liquidButtonStyle, props.sx]}
          >
            <Filter filterId={filterId} aria-hidden />

            <FlexBox alignItems="center" sx={liquidButtonGlassStyle}>
              <Box role="presentation" sx={liquidButtonGlassFilterStyle} />

              <Box role="presentation" sx={liquidButtonShadowStyle} />

              <FlexBox alignItems="center" sx={liquidButtonContentStyle}>
                <Typography weight="bold" color="semantic.static.white">
                  {children}
                </Typography>
              </FlexBox>
            </FlexBox>
          </Box>
        </Slot>

        <Box
          role="presentation"
          sx={[liquidButtonLineBaseStyle, liquidButtonLineOverlayFirstStyle]}
          style={{
            background: `linear-gradient(
            ${135 + mouseOffset.x * 1.2}deg,
            rgba(255, 255, 255, 0.0) 0%,
            rgba(255, 255, 255, ${0.12 + Math.abs(mouseOffset.x) * 0.008}) ${Math.max(10, 33 + mouseOffset.y * 0.3)}%,
            rgba(255, 255, 255, ${0.4 + Math.abs(mouseOffset.x) * 0.012}) ${Math.min(90, 66 + mouseOffset.y * 0.4)}%,
            rgba(255, 255, 255, 0.0) 100%
          )`,
          }}
        />

        <Box
          role="presentation"
          sx={[
            liquidButtonLineBaseStyle,
            liquidButtonLineOverlaySecondaryStyle,
          ]}
          style={{
            background: `linear-gradient(
            ${135 + mouseOffset.x * 1.2}deg,
            rgba(255, 255, 255, 0.0) 0%,
            rgba(255, 255, 255, ${0.32 + Math.abs(mouseOffset.x) * 0.008}) ${Math.max(10, 33 + mouseOffset.y * 0.3)}%,
            rgba(255, 255, 255, ${0.6 + Math.abs(mouseOffset.x) * 0.012}) ${Math.min(90, 66 + mouseOffset.y * 0.4)}%,
            rgba(255, 255, 255, 0.0) 100%
          )`,
          }}
        />

        <Box
          role="presentation"
          sx={[
            liquidButtonLineBaseStyle,
            liquidButtonInteractionOverlayFirstStyle,
          ]}
          style={{
            opacity: isHovered || isActive ? 0.5 : 0,
          }}
        />

        <Box
          role="presentation"
          sx={[
            liquidButtonLineBaseStyle,
            liquidButtonInteractionOverlaySecondStyle,
          ]}
          style={{
            opacity: isActive ? 0.5 : 0,
          }}
        />
        <Box
          role="presentation"
          sx={[
            liquidButtonLineBaseStyle,
            liquidButtonInteractionOverlayThirdStyle,
          ]}
          style={{
            opacity: isHovered ? 0.4 : isActive ? 0.8 : 0,
          }}
        />
      </Box>
    );
  },
) as PolymorphicComponent<Props, 'button'>;

export default LiquidButton;
