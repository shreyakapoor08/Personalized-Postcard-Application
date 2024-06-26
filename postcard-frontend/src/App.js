import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './Components/Navbar';
import Banner from './Components/Banner';
import Home from './Components/Home';
import Footer from './Components/Footer';
import MediaControlCard from './Components/MediaControlCard';
import PostcardDetails from './Components/PostcardDetails';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path="/" element={<><Banner /><Home /></>} />
          <Route path="/personalized-cards" element={<MediaControlCard />} />
          <Route path="/postcard/:postId" element={<PostcardDetails />} />
          {/* Add more routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
