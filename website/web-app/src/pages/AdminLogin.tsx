
import logo from '../pictures/logo.gif'; 


export default function AdminLogin() {




  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="login-container" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '300px' }}>
        <img src={logo} alt="logo" style={{ margin: '20px auto', alignSelf: 'center' }} />
        <h2>LOGIN</h2>
        <form>
          <label>Username:</label>
          <input
            type="text"
            placeholder="Username"
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
          />
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: '#fff', border: 'none' }}>Sign In</button>
        </form>
      </div>
    </div>
  )
}