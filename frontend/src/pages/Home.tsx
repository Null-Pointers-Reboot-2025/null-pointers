import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Home: React.FC = () => {
  const { getThemeClasses } = useTheme();

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-green-600 mb-2">FinwiseOS</h1>
        <p className="text-gray-700 mb-8">Your personal growth operating system</p>
        
        <div className="space-y-4 max-w-md mx-auto">
          <Link
            to="/character"
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-green-500 transition-colors"
          >
            <div className="flex items-center">
              <div className="text-green-600 bg-green-100 p-3 rounded-lg mr-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-green-600"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              </div>
              <div className="text-left">
                <h2 className="text-lg font-semibold text-black">Character</h2>
                <p className="text-gray-700 text-sm">View your stats</p>
              </div>
            </div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-green-600"
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          </Link>
          
          <Link
            to="/chat"
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-green-500 transition-colors"
          >
            <div className="flex items-center">
              <div className="text-green-600 bg-green-100 p-3 rounded-lg mr-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-green-600"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
                  />
                </svg>
              </div>
              <div className="text-left">
                <h2 className="text-lg font-semibold text-black">Chat</h2>
                <p className="text-gray-700 text-sm">Start here to guide your System</p>
              </div>
            </div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-green-600"
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          </Link>
          
          <Link
            to="/quests"
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-green-500 transition-colors"
          >
            <div className="flex items-center">
              <div className="text-green-600 bg-green-100 p-3 rounded-lg mr-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-green-600"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
                  />
                </svg>
              </div>
              <div className="text-left">
                <h2 className="text-lg font-semibold text-black">Quest Log</h2>
                <p className="text-gray-700 text-sm">Track your assigned quests</p>
              </div>
            </div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-green-600"
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          </Link>
        </div>
        
        <div className="mt-12 text-gray-700 text-sm">
          <p>Control your personal development with precision</p>
          <p>Unlock new achievements and transform your life</p>
        </div>
        <div className="mt-12 text-gray-700 text-sm">
          <p>Use the Chat to work with the System</p>
          <p>to create your personalised quest log</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
