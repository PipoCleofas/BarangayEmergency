import logo from '../pictures/logo.gif'; 
import { useHandleClicks } from '../hooks/useHandleClicks';
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { onLoginClick, error } = useHandleClicks();

  const onLogin = (e: any) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    
    onLoginClick(e, navigate, username, password);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="login-container" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '300px', textAlign: 'center' }}>
        <img src={logo} alt="logo" style={{ alignSelf: 'center', width: '23pc', height: '21pc', marginBottom: '-80px', marginInlineStart: '-56px', marginTop: '-90px' }} /> 
        <h2 style={{ marginTop: '15', marginInlineStart: '74px' }}>LOGIN</h2>
        <form onSubmit={onLogin} style={{ margin: '10px 0' }}>
          <label style={{ fontSize: 14, marginBottom: 10, marginInline: '4px', textAlign: 'left' }}>Username:</label>&nbsp;
          <input type="text" name="username" style={{ width: '175px', padding: '4px', marginBottom: '20px', backgroundColor: '#F08080', textAlign: 'left', border: 'none', borderRadius: '15px' }} />
          <label style={{ fontSize: 14, marginBottom: 10, marginInline: '6px', textAlign: 'left' }}>Password:</label>&nbsp;
          <input type="password" name="password" style={{ width: '175px', padding: '4px', marginBottom: '20px', backgroundColor: '#F08080', textAlign: 'left', border: 'none', borderRadius: '15px' }} />
         
          {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

          <button type="submit" style={{ width: '175px', padding: '4px', marginBottom: '20px', backgroundColor: 'maroon', border: 'none', borderRadius: '15px', color: 'white', fontSize: 16, marginInline: '84px' }}>Sign In</button>
        </form>
      </div>
    </div>
  );
}
