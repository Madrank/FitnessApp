import React from 'react';
import { Layout } from './components/Layout';
import { AppRouter } from './routes/AppRouter';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { WorkoutProvider } from './context/WorkoutContext';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <WorkoutProvider>
          <Layout>
            <AppRouter />
          </Layout>
        </WorkoutProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;