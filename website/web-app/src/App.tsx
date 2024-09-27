import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './pictures/logo.gif'; 
import './App.css';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login'); 
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className='welcome'>
      <img src={logo} alt="logo"/> 
    </div>
  );
}

export default App;
