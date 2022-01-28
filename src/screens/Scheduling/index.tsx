import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';
import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { useTheme } from 'styled-components';
import { CarDTO } from '../../dtos/CarDTO';

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling() {
  const [lastSelectDate, setLastSelectDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { car } = route.params as Params;

  function handleCheckRentalResume () {
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates)
    });
  }

  function handleChangeDate(date: DayProps) {
    let start =  !lastSelectDate.timestamp ? date : lastSelectDate;
    let end = date;

    if(start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectDate(end)
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const lastDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(lastDate)), 'dd/MM/yyyy'),
    });
  }
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
        <RentalPeriod>

          <DateInfo selected={!!rentalPeriod.startFormatted}>
            <DateTitle>DE</DateTitle>
            <DateValue >{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo selected={!!rentalPeriod.endFormatted}>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>

        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button 
          title='Confirmar'
          onPress={handleCheckRentalResume}
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>

    </Container>
  );
}