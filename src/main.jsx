import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { MainContextProvider } from '@/context/main-context.jsx';
import { ThemeProvider } from '@/provider/ThemeProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <MainContextProvider>
      <App />
    </MainContextProvider>
  </ThemeProvider>
);
