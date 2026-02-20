import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: transparent;
  padding: 20px 0;
  height: 100%;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  border: none;
  box-shadow: none;
`;

const Year = styled.div`
  font-size: 25px;
  font-weight: 400;
  color: #3877ee;
  margin-bottom: 15px;
  line-height: 1.2;

  @media (max-width: 320px) {
    font-size: 16px;
    line-height: 120%;
  }
`;

const Description = styled.p`
  font-size: 20px;
  color: #42567a;
  line-height: 30px;
  flex-grow: 1;
  margin: 0;
  font-weight: 400;
  max-width: 320px;

  @media (max-width: 320px) {
    font-size: 14px;
    line-height: 145%;
    max-width: 166px;
    min-width: 166px;
  }
`;

const EventCard = ({ year, description }) => {
  return (
    <Card>
      <Year>{year}</Year>
      <Description>{description}</Description>
    </Card>
  );
};

export default EventCard;
