import { css, DefaultTheme } from 'styled-components';

const colors = {
  MainGreen: '#93B797',
  BackGround: '#FAFDF9',
  White: '#FFFFFF',
  Black: '#000000',
  Gray900: '#212121',
  Gray800: '#424242',
  Gray700: '#616161',
  Gray600: '#757575',
  Gray500: '#9E9E9E',
  Gray400: '#BDBDBD',
  Gray300: '#E0E0E0',
  Gray200: '#EEEEEE',
  Gray100: '#F5F5F5',
  Gray50: '#FAFAFA',
  ErrorRed: '#FF4C4C',
};

const fonts = {
  Title0: css`
    font-family: 'Pretendard';
    font-size: 3rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Title1: css`
    font-family: 'Pretendard';
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Title2: css`
    font-family: 'Pretendard';
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Title3: css`
    font-family: 'Pretendard';
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Title4: css`
    font-family: 'Pretendard';
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Title5: css`
    font-family: 'Pretendard';
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Title6: css`
    font-family: 'Pretendard';
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;
  `,
  Body0: css`
    font-family: 'Pretendard';
    font-size: 1.7rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
  `,
  Body1: css`
    font-family: 'Pretendard';
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
  `,
  Body2: css`
    font-family: 'Pretendard';
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
  `,
  Body3: css`
    font-family: 'Pretendard';
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
  `,
  Body4: css`
    font-family: 'Pretendard';
    font-size: 1.1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
  `,
  Body5: css`
    font-family: 'Pretendard';
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
  `,
  Body6: css`
    font-family: 'Pretendard';
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
  `,
};

const theme: DefaultTheme = {
  colors,
  fonts,
};

export default theme;
