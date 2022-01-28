import React from 'react';

import LottieView from 'lottie-react-native';

import loadingCar from '../../assets/loadingCar.json';
import loadingCarGif from '../../assets/loadingCar.gif';

import {
  Container,
} from './styles';
import { Image, Platform } from 'react-native';

export function LoadAnimation() {
  return (
    <Container>
      {
        Platform.OS === 'ios' ?
        <Image
          source={loadingCarGif}
          style={{ height: 200 }}
          resizeMode='contain'
        /> :

        <LottieView 
          source={loadingCar}
          style={{ height: 200 }}
          resizeMode='contain'
          autoPlay
          loop
        />
      }

    </Container>
  );
}