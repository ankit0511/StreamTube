import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import StreamingApp from './Components/StreamingApp';
import PlatformsPage from './Components/PlatformsPage';
import StreamingDetails from './Components/StreamingDetails';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stream" element={<StreamingApp />} />
        <Route path="/platforms" element={<PlatformsPage />} />
        <Route path = "/streaming-details" element={<StreamingDetails/>}/>
      </Routes>
    </Router>
  );
}

export default App;