'use client';

import { StrictMode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './utils/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import './utils/i18n';
import App from './App';
import { routerBase } from './utils/baseUrl';

if (typeof window !== 'undefined') {
  const location = window.location;
  if (location.search.startsWith('?/')) {
    const decoded = location.search
      .slice(1)
      .split('&')
      .map((segment) => segment.replace(/~and~/g, '&'))
      .join('?');
    const base = routerBase === '/' ? '' : routerBase;
    window.history.replaceState(null, '', `${base}${decoded}${location.hash}`);
  }
}

export default function ClientApp() {
  return (
    <StrictMode>
      <ErrorBoundary>
        <ThemeProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}
