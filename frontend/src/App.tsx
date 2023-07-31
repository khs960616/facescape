import './App.css';
import './index.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";

// router
import MainPage from './pages/MainPage';
import RankingPage from './pages/RankingPage';
import MyPage from './pages/MyPage';
import MarketPage from './pages/MarketPage';

// background image
import BackgroundImage from '../src/assets/images/background_img.png';

const App: React.FC = () => {
  return (
    <div className='app-container'>
      <div className="background-image" style={{ backgroundImage: `url(${BackgroundImage})` }}>
      </div>
      
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/rank' element={<RankingPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/market' element={<MarketPage />} />
      </Routes>
    </div>
  );
}

export default App;
