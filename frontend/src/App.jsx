import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Events from './components/Events/Events';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={<div>My Profile Page (Placeholder)</div>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;