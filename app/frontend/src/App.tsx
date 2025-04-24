import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/fonts.css';
import Home from './pages/Home';
import ChatView from './pages/ChatView';
import QuestLog from './pages/QuestLog';
import Character from './pages/Character';
import PhysicalDetail from './components/character/PhysicalDetail';
import MentalDetail from './components/character/MentalDetail';
import EmotionalDetail from './components/character/EmotionalDetail';
import SystemDetail from './components/character/SystemDetail';
import FinancialDetail from './components/character/FinancialDetail';
import Navigation from './components/Navigation';
import Settings from './pages/Settings';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { QuestProvider } from './contexts/QuestContext';

function AppContent() {
  const { getThemeClasses } = useTheme();
  
  return (
    <Router>
      <div className={`min-h-screen ${getThemeClasses('background')} ${getThemeClasses('text')}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatView />} />
          <Route path="/quests" element={<QuestLog />} />
          <Route path="/character" element={<Character />} />
          <Route path="/character/physical" element={<PhysicalDetail />} />
          <Route path="/character/mental" element={<MentalDetail />} />
          <Route path="/character/emotional" element={<EmotionalDetail />} />
          <Route path="/character/system" element={<SystemDetail />} />
          <Route path="/character/financial" element={<FinancialDetail />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QuestProvider>
        <AppContent />
      </QuestProvider>
    </ThemeProvider>
  );
}

export default App;
