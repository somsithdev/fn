import React from "react";
import styled from "styled-components";
import useClock from "react-use-clock-hook";

const Clock = () => {
  const { time } = useClock("HH:mm:ss");
  return <ClockContainer>{time}</ClockContainer>;
};

const ClockContainer = styled.div`
  font-size: 7rem;
  grid-area: clock;
  text-align: center;

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export default Clock;
