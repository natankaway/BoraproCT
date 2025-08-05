import React from 'react';
import { ThemeProvider, AppStateProvider, NotificationProvider } from './context';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Toaster } from './utils/toast';

// Placeholder main system component for now
const CTFutevoleiSystem = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            🏐 BoraProCT
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Sistema de Gestão de Centro de Treinamento de Futevôlei
          </p>
          <p className="text-green-600 font-semibold">
            ✅ Modularização concluída com sucesso!
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Arquitetura React + Vite funcionando
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente principal exportado
const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <NotificationProvider>
          <AppStateProvider>
            <Toaster />
            <CTFutevoleiSystem />
          </AppStateProvider>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;