import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Router from './Router';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
