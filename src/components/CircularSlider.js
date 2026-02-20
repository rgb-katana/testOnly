import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

/* ================= CONSTANTS ================= */

const SIZE = 530;
const CENTER = SIZE / 2;
const RADIUS = 265;
const TARGET_ANGLE = -65;

/* ================= STYLES ================= */

const CircleContainer = styled.div`
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: ${SIZE}px;
  height: ${SIZE}px;

  @media (max-width: 320px) {
    display: none;
  }
`;

const CircleBorder = styled.div`
  position: absolute;
  inset: 0;
  border: 1px solid rgba(66, 86, 122, 0.1);
  border-radius: 50%;
  pointer-events: none;
`;

const RotatingContainer = styled.div`
  position: absolute;
  inset: 0;
  transform-origin: center center;
`;

const SmallDot = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  background: #42567a;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 5;
  transition: transform 0.2s ease;

  &:hover {
    transform: translate(-50%, -50%) scale(1.6);
  }
`;

const NumberCircle = styled.div`
  position: absolute;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${(p) => (p.active ? '#fff' : '#f4f4f4')};
  border: 1px solid ${(p) => (p.active ? '#42567a' : 'rgba(66, 86, 122, 0.3)')};

  transform: translate(-50%, -50%) scale(${(p) => (p.visible ? 1 : 0.6)});
  opacity: ${(p) => (p.visible ? 1 : 0)};
  transition: all 0.25s ease;
  pointer-events: none;
  z-index: 10;
`;

const NumberContent = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #42567a;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transform-origin: center center;
`;

const CategoryLabel = styled.div`
  position: absolute;
  font-size: 20px;
  font-weight: 600;
  color: #42567a;
  white-space: nowrap;
  background: white;
  padding: 8px 20px;
  border-radius: 40px;
  transform: translate(10%, 50%);
  transition: opacity 0.3s ease;
  z-index: 20;
  pointer-events: none;
  opacity: 1;
`;

const CircularSlider = ({ categories, activeCategory, onCategorySelect }) => {
  const total = categories.length;
  const rotatingRef = useRef(null);
  const numberContentsRef = useRef([]);
  const labelRef = useRef(null);
  const isFirstRender = useRef(true);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [displayCategory, setDisplayCategory] = useState(activeCategory);
  const [isAnimating, setIsAnimating] = useState(false);

  const getPosition = (index) => {
    const angle = (index / total) * 2 * Math.PI;

    return {
      x: CENTER + RADIUS * Math.cos(angle),
      y: CENTER + RADIUS * Math.sin(angle),
    };
  };

  const getLabelPosition = () => {
    const labelRadius = RADIUS + 45;
    const labelAngle = (TARGET_ANGLE * Math.PI) / 180;

    return {
      x: CENTER + labelRadius * Math.cos(labelAngle),
      y: CENTER + labelRadius * Math.sin(labelAngle),
    };
  };

  /* ---------- Initial rotation ---------- */

  useLayoutEffect(() => {
    if (rotatingRef.current) {
      const activeAngle = (activeCategory / total) * 360;
      const initialRotation = TARGET_ANGLE - activeAngle;

      gsap.set(rotatingRef.current, {
        rotation: initialRotation,
        transformOrigin: 'center center',
      });
    }
  }, []);

  useEffect(() => {
    if (!rotatingRef.current) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setIsAnimating(true);

    if (labelRef.current) {
      gsap.set(labelRef.current, { opacity: 0 });
    }

    const activeAngle = (activeCategory / total) * 360;
    const targetRotation = TARGET_ANGLE - activeAngle;

    let delta = targetRotation - gsap.getProperty(rotatingRef.current, 'rotation');
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    const finalRotation = gsap.getProperty(rotatingRef.current, 'rotation') + delta;

    const tl = gsap.timeline({
      onComplete: () => {
        setDisplayCategory(activeCategory);
        setIsAnimating(false);
        if (labelRef.current) {
          gsap.set(labelRef.current, { opacity: 1 });
        }
      },
    });

    tl.to(rotatingRef.current, {
      rotation: finalRotation,
      duration: 0.9,
      ease: 'power3.inOut',
      transformOrigin: 'center center',
      onUpdate: function () {
        const currentRotation = gsap.getProperty(rotatingRef.current, 'rotation');

        numberContentsRef.current.forEach((content) => {
          if (content) {
            gsap.set(content, {
              rotation: -currentRotation,
              transformOrigin: 'center center',
            });
          }
        });
      },
    });
  }, [activeCategory, total]);

  const labelPos = getLabelPosition();

  return (
    <CircleContainer>
      <CircleBorder />

      <RotatingContainer ref={rotatingRef}>
        {categories.map((_, index) => {
          const pos = getPosition(index);
          const active = index === activeCategory;
          const visible = active || hoveredIndex === index;

          return (
            <React.Fragment key={index}>
              <SmallDot
                style={{ left: pos.x, top: pos.y }}
                onClick={() => onCategorySelect(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />

              <NumberCircle style={{ left: pos.x, top: pos.y }} active={active} visible={visible}>
                <NumberContent ref={(el) => (numberContentsRef.current[index] = el)}>{index + 1}</NumberContent>
              </NumberCircle>
            </React.Fragment>
          );
        })}
      </RotatingContainer>

      <CategoryLabel
        ref={labelRef}
        style={{
          left: labelPos.x,
          top: labelPos.y,
          opacity: !isAnimating ? 1 : 0,
        }}
      >
        {categories[displayCategory]}
      </CategoryLabel>
    </CircleContainer>
  );
};

export default CircularSlider;
