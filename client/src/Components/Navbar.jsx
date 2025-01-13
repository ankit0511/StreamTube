
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h1 className="navTitle">Stream Tube</h1>
      <div className="navLinks">
        <button className="navButton" onClick={() => navigate('/')}>
          Home
        </button>
        <button className="navButton" onClick={() => navigate('/stream')}>
          Stream
        </button>
        <button className="navButton" onClick={() => navigate('/about')}>
          About
        </button>
      </div>
    </nav>
  );
};

export default Navbar;