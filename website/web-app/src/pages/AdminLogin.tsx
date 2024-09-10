
import logo from '../pictures/logo.gif'

export default function AdminLogin() {




  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f4' }}>
      <div className="login-container" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '350px', textAlign: 'center' }}>
        {/* Logo Section */}
        <img src={logo} alt="Rescue Link Logo" style={{ width: '150px', marginBottom: '30px' }} /> {/* Adjust the path to the correct image */}
  
        {/* Form Section */}
        <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>LOGIN</h2>
        <form>
          {/* Username Field */}
          <div style={{ textAlign: 'left', marginBottom: '15px' }}>
            <label style={{ fontSize: '16px', color: '#333', display: 'block', marginBottom: '5px' }}>Username:</label>
            <input
              type="text"
              placeholder="Username"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                backgroundColor: '#F1A099',
                color: 'white',
                fontSize: '14px',
              }}
            />
          </div>
  
          {/* Password Field */}
          <div style={{ textAlign: 'left', marginBottom: '20px' }}>
            <label style={{ fontSize: '16px', color: '#333', display: 'block', marginBottom: '5px' }}>Password:</label>
            <input
              type="password"
              placeholder="Password"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                backgroundColor: '#F1A099',
                color: 'white',
                fontSize: '14px',
              }}
            />
          </div>
  
          {/* Sign-In Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#8E3B46',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
  
}

