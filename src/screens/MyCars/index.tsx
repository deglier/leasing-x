import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons'
import { BackButton } from '../../components/BackButton';
import { Car, CarListSeparator } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

import { LoadAnimation } from '../../components/LoadAnimation';
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterPeriodDate,
} from './styles';


interface CarProps {
  id: string;
  car: CarDTO;
  use_id: string;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([] as CarProps[]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const theme = useTheme();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');
        console.log(response.data);
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <BackButton onPress={() => {navigation.goBack()}} />
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>
        <SubTitle>
          Conforto, segurança e praticidade
        </SubTitle>
      </Header>
      { loading ? <LoadAnimation /> : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <CarListSeparator />}
            renderItem={({ item }) => (
              <CarWrapper>
              <Car data={item.car} />
              <CarFooter>
                <CarFooterTitle>Período</CarFooterTitle>
                <CarFooterPeriod>
                  <CarFooterPeriodDate>{item.startDate}</CarFooterPeriodDate>
                  <AntDesign
                    name="arrowright"
                    size={20}
                    color={theme.colors.title}
                    style={{ marginHorizontal: 10 }}
                    />
                  <CarFooterPeriodDate>{item.endDate}</CarFooterPeriodDate>
                </CarFooterPeriod>
              </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}