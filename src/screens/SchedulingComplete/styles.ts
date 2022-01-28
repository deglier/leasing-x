import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;

  background-color: ${({theme}) => theme.colors.header};

  padding-top: 96px;
`;

export const ContentWrapper = styled.View`
  position: absolute;
  bottom: 0;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding-bottom: 80px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.secondary_600};
  text-align: center;

  margin-top: 40px;
`;
export const Message = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({theme}) => theme.colors.text_detail};
  font-family: ${({theme}) => theme.fonts.primary_400};
  line-height: ${RFValue(25)}px;
  text-align: center;

  margin-top: 16px;
`;

export const Footer = styled.View`
  width: ${wp('100%')}px;
  align-items: center;
  
  margin: 0 0 ${getBottomSpace() + 80}px;
`;
