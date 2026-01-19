import React from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="App min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        <ChatInterface />
      </main>
    </div>
  );
}

export default App;
