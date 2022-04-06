import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faDungeon,
  faWalking,
  faLightbulb,
  faTemperatureEmpty,
  faCar,
  faPeopleRoof,
  faCloudRain,
  faTree,
} from "@fortawesome/free-solid-svg-icons";

const icons = {
  bolt: faBolt,
  dungeon: faDungeon,
  walking: faWalking,
  bulb: faLightbulb,
  temp: faTemperatureEmpty,
  car: faCar,
  roof: faPeopleRoof,
  rain: faCloudRain,
  tree: faTree,
};

export const Card = ({ heading, icon, backgrounds }) => {
  return (
    <Container>
      <Heading>{heading}</Heading>
      <Content>
        <FontAwesomeIcon icon={icons[icon]} />
      </Content>
    </Container>
  );
};

export const Cardb = ({ heading, icon, backgrounds }) => {
  return (
    <Containergreen>
      <Heading>{heading}</Heading>
      <Content>
        <FontAwesomeIcon icon={icons[icon]} />
      </Content>
    </Containergreen>
  );
};

const Container = styled.div`
  background: rgb(32, 42, 59);
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  min-width: 130px;
  flex-basis: auto;
  justify-content: space-between;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.125);
  border-radius: 1rem;
  margin: 0.5rem;
`;

const Containergreen = styled.div`
  background: rgb(50, 205, 50);
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  min-width: 130px;
  flex-basis: auto;
  justify-content: space-between;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.125);
  border-radius: 1rem;
  margin: 0.5rem;
`;
const Heading = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  min-height: 30px;
  align-self: center;
`;
const Content = styled.div`
  font-size: 3rem;
  align-self: center;
`;
