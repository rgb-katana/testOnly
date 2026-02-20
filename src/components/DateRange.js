import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const RangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  @media (max-width: 320px) {
    margin-bottom: 77px;
  }
`;

const YearBlock = styled.div`
  font-size: 200px;
  line-height: 160px;
  letter-spacing: -2px;
  font-weight: 700;

  @media (max-width: 320px) {
    font-size: 56px;
    line-height: 56px;
  }

  &:first-child {
    color: #3877ee;
  }

  &:last-child {
    color: #ef5da8;
  }
`;

const DateRange = ({ startYear, endYear }) => {
  const startRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(startRef.current, { scale: 1.2, color: '#5D5FEF' }, { scale: 1, duration: 0.5, ease: 'back.out(1.7)' });

    gsap.fromTo(endRef.current, { scale: 1.2, color: '#EF5DA8' }, { scale: 1, duration: 0.5, ease: 'back.out(1.7)' });
  }, [startYear, endYear]);

  return (
    <RangeContainer>
      <YearBlock ref={startRef}>{startYear}</YearBlock>
      <YearBlock ref={endRef}>{endYear}</YearBlock>
    </RangeContainer>
  );
};

export default DateRange;
