
import logo from '../pictures/logo.gif'; 


export default function AdminLogin() {




  return (
    <div style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <img src={logo} alt="logo" />
        <title>Admin Login</title>
      <div className="login-container" style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <h2>Admin Login</h2>
          
          <form>
            <input
              type="text"
              placeholder="Username"
            
            />
            <input
              type="password"
              placeholder="Password"
              
            />
            <button type="submit">Sign In</button>
          </form>
      </div>
            
    </div>
  )
}


