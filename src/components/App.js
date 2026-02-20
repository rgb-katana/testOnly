import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import CircularSlider from './CircularSlider';
import DateRange from './DateRange';
import EventCard from './EventCard';
import categories from '../utils/categories';
import { ArrowLeftIcon, ArrowRightIcon } from '../assets/icons';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  border: 1px solid rgba(66, 86, 122, 0.1);
  position: relative;

  @media (max-width: 320px) {
    border: none;
  }

  &::before {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    background: rgba(66, 86, 122, 0.1);
    top: 0%;
    left: 50%;

    @media (max-width: 320px) {
      display: none;
    }
  }

  &::after {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    background: rgba(66, 86, 122, 0.1);
    top: -15%;
    left: 50%;
    height: 1440px;
    transform: rotate(90deg);
    @media (max-width: 320px) {
      display: none;
    }
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1920px;
  position: relative;
  margin-top: 170px;

  @media (max-width: 320px) {
    margin-top: 59px;
  }
`;

const Title = styled.h1`
  font-size: 56px;
  font-weight: 700;
  color: #42567a;
  margin-bottom: 96px;
  position: relative;
  left: 78px;
  max-width: 353px;

  @media (max-width: 320px) {
    left: 0;
    font-size: 15px;
    margin-bottom: 56px;
    max-width: 100px;
    line-height: 120%;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    left: -78px;
    height: 120px;
    background: linear-gradient(180deg, #3877ee 0%, #ef5da8 100%);

    @media (max-width: 320px) {
      display: none;
    }
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 40px;
  margin-top: 170px;

  @media (max-width: 320px) {
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  margin: 20px 0 30px;
  margin-top: 167px;
  margin-left: 80px;

  @media (max-width: 320px) {
    position: absolute;
    margin-top: 0px;
    margin-bottom: 0px;
    align-self: flex-start;
    margin-left: 0;
    gap: 10px;
    z-index: 500;
  }
`;

const PaginationInfo = styled.div`
  font-size: 14px;
  color: #42567a;
  font-weight: 400;
  min-width: 60px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid rgba(66, 86, 122, 0.3);
  background: white;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #42567a;

  @media (max-width: 320px) {
    width: 25px;
    height: 25px;
  }

  &:hover:not(:disabled) {
    background: #f0f0f0;
    border-color: #42567a;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const EventWrapper = styled.div`
  @media (max-width: 320px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 30px;
  overflow: hidden;
  padding-left: 80px;

  @media (max-width: 320px) {
    padding-left: 0px;
    margin-top: 0px;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent 0%, transparent 46%, rgba(255, 255, 255, 0.7) 100%);
      pointer-events: none;
      z-index: 10;
    }
  }

  .swiper {
    width: 100%;
    overflow: visible;
    @media (max-width: 320px) {
      border-top: 1px solid rgba(66, 86, 122, 0.3);
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    width: 40px;
    height: 40px;
    padding: 14px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    @media (max-width: 320px) {
      display: none;
    }

    &::after {
      font-size: 16px;
      color: #42567a;
    }

    &.swiper-button-disabled {
      opacity: 0;
      pointer-events: none;
    }
  }

  .swiper-button-next {
    right: 80px;
  }

  .swiper-button-prev {
    left: -60px;
  }

  .swiper-pagination {
    position: relative;
    margin-top: 50px;

    @media (min-width: 321px) {
      display: none;
    }

    .swiper-pagination-bullet {
      width: 6px;
      height: 6px;
      background: rgba(66, 86, 122, 0.3);
      opacity: 1;
      margin: 0 6px;

      &-active {
        background: #42567a;
        width: 6px;
        height: 6px;
      }
    }
  }
`;

const App = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const swiperRef = useRef(null);

  const currentCategory = categories[activeCategory];

  const handlePrev = () => {
    setActiveCategory((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveCategory((prev) => Math.min(categories.length - 1, prev + 1));
  };

  return (
    <AppContainer>
      <ContentWrapper>
        <Title>Исторические даты</Title>
        <TopSection>
          <DateRange startYear={currentCategory.startYear} endYear={currentCategory.endYear} />
          <CircularSlider
            categories={categories.map((c) => c.name)}
            activeCategory={activeCategory}
            onCategorySelect={setActiveCategory}
          />
        </TopSection>
        <EventWrapper>
          <ControlsContainer>
            <PaginationInfo>
              {String(activeCategory + 1).padStart(2, '0')}/{String(categories.length).padStart(2, '0')}
            </PaginationInfo>
            <ButtonGroup>
              <Button onClick={handlePrev} disabled={activeCategory === 0}>
                <ArrowLeftIcon />
              </Button>
              <Button onClick={handleNext} disabled={activeCategory === categories.length - 1}>
                <ArrowRightIcon />
              </Button>
            </ButtonGroup>
          </ControlsContainer>
          <SliderWrapper>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1.5,
                  spaceBetween: 0,
                },
                321: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              {currentCategory.events.map((event, idx) => (
                <SwiperSlide key={idx}>
                  <EventCard year={event.year} description={event.description} />
                </SwiperSlide>
              ))}
            </Swiper>
          </SliderWrapper>
        </EventWrapper>
      </ContentWrapper>
    </AppContainer>
  );
};

export default App;
