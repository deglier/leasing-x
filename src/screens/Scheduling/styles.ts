import { ScrollView } from 'react-native-gesture-handler';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface DateValueProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled.View`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.header};

  justify-content: center;
  padding: ${getStatusBarHeight() + 6}px 8px 24px;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_600 };
  font-size: ${RFValue(34)}px;
  padding: 0 16px;
  margin-top: 24px;
`;

export const RentalPeriod = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0 16px;
  margin: 24px 0 0;
`;

export const DateInfo = styled.View<DateValueProps>`
  width: 30%;

  ${({selected, theme}) => !selected && css`
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.text};
    padding-bottom: 5px;
  `}
`;

export const DateTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary_500 };
  font-size: ${RFValue(10)}px;
`;

export const DateValue = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.primary_500 };
  font-size: ${RFValue(15)}px;

`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingVertical: 0,
    alignItems: 'stretch'
  },
  ShowsVerticalScrollIndicator: false,
})``;

export const Footer = styled.View`
  padding: 24px 24px ${getBottomSpace() + 24}px;
`;
