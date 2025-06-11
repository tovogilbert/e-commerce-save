import React from 'react';
import TopBar from './components/TopBar';
import Footer from "./components/Footer"
import { Outlet } from 'react-router-dom';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />    
      <main className="flex-grow pt-16 bg-white xl:px-45">
        <Outlet />
      </main>
      <Footer /> 
    </div>
  );
};

export default Index;
