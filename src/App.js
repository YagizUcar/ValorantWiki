import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AgentList from './AgentList';
import Agent from './Agent';
import WeaponsList from './WeaponsList';
import WeaponDetail from './WeaponDetail';
import Maps from './Maps';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/App.css';
import ValorantWiki from './ValorantWiki';

const App = () => {
  const CACHE_EXPIRATION = 60 * 1000; // 1 dakika
  const [cachedData, setCachedData] = useState({});

  const fetchData = async (endpoint) => {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  };

  const getCachedData = (endpoint) => {
    const cachedItem = cachedData[endpoint];
    if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_EXPIRATION) {
      return cachedItem.data;
    }
    return null;
  };

  const updateCachedData = (endpoint, data) => {
    const newCachedData = { ...cachedData };
    newCachedData[endpoint] = {
      data,
      timestamp: Date.now(),
    };
    setCachedData(newCachedData);
  };

  useEffect(() => {
    const cachedAgentList = getCachedData('/agentList');
    if (!cachedAgentList) {
      fetchData('/agentList').then((data) => {
        updateCachedData('/agentList', data);
      });
    }
  },[]);

  return (
    <Router>
      <div>
        {/* Bootstrap Navbar */}
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/ValorantWiki">ValorantWiki</Nav.Link>
              <Nav.Link as={Link} to="/agentList" className="nav-link-hover">Ajan Listesi</Nav.Link>
              <Nav.Link as={Link} to="/WeaponsList" className="nav-link-hover">Silah Listesi</Nav.Link>
              <Nav.Link as={Link} to="/Maps" className="nav-link-hover">Haritalar</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* Sayfa rotaları */}
        <Routes>
          <Route path="/agentList" element={<AgentList />} />
          <Route path="/agent/:agentUuid" element={<Agent />} />
          <Route path="/WeaponsList" element={<WeaponsList />} />
          <Route path="/Weapons/:weaponUuid" element={<WeaponDetail />} />
          <Route path="Maps" element={<Maps/>}/>
          <Route path="/valorantWiki" element={<ValorantWiki />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
