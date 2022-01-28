import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import GasolineSvg from '../../assets/gasoline.svg';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
  CarListSeparator,
} from './styles';


interface Props extends RectButtonProps {
  data: CarDTO;
}

function Car({ data, ...rest }: Props) {
  const FuelType = getAccessoryIcon(data.fuel_type);
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>
          <Type>
            <FuelType />
          </Type>
        </About>
      </Details>
      <CarImage 
        source={{uri: data.thumbnail}}
        resizeMode='contain'
      />
    </Container>
  );
}

export {Car, CarListSeparator}