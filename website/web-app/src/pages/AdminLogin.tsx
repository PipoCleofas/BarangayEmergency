import logo from '../pictures/logo.gif';
import { useHandleClicks } from '../hooks/useHandleClicks';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { onLoginClick, error } = useHandleClicks();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onLogin = (e: any) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    onLoginClick(e, navigate, username, password);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="login-container" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '300px', textAlign: 'center' }}>
        <img
          src={logo}
          alt="logo"
          style={{
            alignSelf: 'center',
            width: '23pc',
            height: '21pc',
            marginBottom: '-80px',
            marginInlineStart: '-56px',
            marginTop: '-90px'
          }}
        />
        <h2 style={{ marginTop: '15px', marginBottom: '20px' }}>LOGIN</h2>
        <form onSubmit={onLogin} style={{ margin: '10px 0' }}>
          <div style={{ textAlign: 'left', marginBottom: '20px' }}>
            <label style={{ fontSize: 14, display: 'block', marginBottom: '5px' }}>Username:</label>
            <input
              type="text"
              name="username"
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: '#F08080',
                border: 'none',
                borderRadius: '10px',
              }}
            />
          </div>
          <div style={{ textAlign: 'left', marginBottom: '20px' }}>
            <label style={{ fontSize: 14, display: 'block', marginBottom: '5px' }}>Password:</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#F08080',
                  border: 'none',
                  borderRadius: '10px',
                }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>

          {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: 'maroon',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              fontSize: 16,
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
