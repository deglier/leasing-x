import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BackHandler, StatusBar, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);


import {Ionicons} from '@expo/vector-icons'

import Logo from '../../assets/logo.svg'
import { Car, CarListSeparator } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
} from './styles';
import { getBottomSpace } from 'react-native-iphone-x-helper';


export function Home() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<CarDTO[]>([]);
  
  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: positionY.value },
        { translateX: positionX.value }
      ]
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionY.value = ctx.positionY + event.translationY;
      positionX.value = ctx.positionX + event.translationX;
    },
    onEnd() {
      positionY.value = withSpring(0);
      positionX.value = withSpring(0);
    },
  });

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpnMyCars() {
    navigation.navigate('MyCars');

  }

  useEffect((): void => {
    async function fetchCars(){
      try {
        const response = await api.get('/cars')
        setCars(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          {
            !loading &&
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
        </HeaderContent>
      </Header>
      { loading ? <LoadAnimation /> : (
        <CarList
          data={cars}
          keyExtractor={item => String(item.id) }
          ItemSeparatorComponent={() => <CarListSeparator />}
          renderItem={({ item }) => 
          <Car data={item} onPress={() => handleCarDetails(item)} />}
        />
      )}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: getBottomSpace() + RFValue(13),
              right: RFValue(22),
            }
          ]}
        >
          <ButtonAnimated
            style={[styles.button, { backgroundColor: theme.colors.main }]}
            onPress={handleOpnMyCars}
          >
            <Ionicons name="ios-car-sport" size={32} color={theme.colors.background_secondary} />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: RFValue(60),
    height: RFValue(60),
    borderRadius: RFValue(30),
    justifyContent: 'center',
    alignItems: 'center',
  }
});