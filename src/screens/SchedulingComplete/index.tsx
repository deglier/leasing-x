import React from 'react';

import {StatusBar, useWindowDimensions} from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'

import {
  Container,
  Content,
  Title,
  Message,
  Footer,
  ContentWrapper,
} from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';
import { useNavigation } from '@react-navigation/native';

export function SchedulingComplete() {
  const {width} = useWindowDimensions();

  const navigation = useNavigation();
  function handleOKButon () {
    navigation.navigate('Home');
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <LogoSvg width={width} />
      <ContentWrapper>
        <Content>
          <DoneSvg width={80} height={80} />
          <Title>Carro alugado!</Title>
          <Message>
            Agora você só precisa ir {'\n'}
            até um concessionária da RENTX {'\n'}
            pegar seu automóvel.
          </Message>
        </Content>

        <Footer>
          <ConfirmButton title='OK' onPress={handleOKButon} />
        </Footer>
      </ContentWrapper>
    </Container>
  );
}