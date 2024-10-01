import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoute } from '@/appRoute/index';
import './reset.css';
import './index.css';
import { ThemeProvider } from '@/components/index';
import { ThemeContext } from './context/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContext.Provider>
      <ThemeProvider useSettingBoard>
        <AppRoute />
      </ThemeProvider>
    </ThemeContext.Provider>
  </React.StrictMode>
);
