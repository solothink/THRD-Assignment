import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { FashionNav } from './components/navigation/FashionNav';
import { HomePage } from './components/HomePage';
import { LandingPage } from './components/LandingPage';
import { Footer } from './components/layout/Footer';
import { useAuth } from './context/AuthContext';

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-luxury-pearl">
      <Navbar />
      {user ? (
        <>
          <FashionNav />
          <main className="flex-grow">
            <HomePage />
          </main>
        </>
      ) : (
        <main className="flex-grow">
          <LandingPage />
        </main>
      )}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;