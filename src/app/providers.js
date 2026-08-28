'use client';

import { ThemeProvider } from '../utils/ThemeContext';
import ErrorBoundary from '../components/ErrorBoundary';
import Header from '../components/Header';
import '../utils/i18n';

export default function Providers({ children }) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="App">
          <Header />
          {children}
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
