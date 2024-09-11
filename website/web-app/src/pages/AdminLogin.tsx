
import logo from '../pictures/logo.gif'; 


export default function AdminLogin() {




  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="login-container" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '300px', textAlign: 'center' }}>
        <img src={logo} alt="logo" style={{ alignSelf: 'center', width: '23pc', height: '21pc', marginBottom: '-80px', marginInlineStart: '-25px', marginTop: '-90px' }} /> 
        <h2 style={{ marginTop: '15', marginInlineStart: '75px' }}>LOGIN</h2>
        <form style={{ margin: '10px 0' }}>
          <label style={{ fontSize: 16, marginBottom: 10, marginInline: '4px', textAlign:'left' }}>Username:</label>&nbsp;
          <input type="text" style={{ width: '175px', padding: '4px', marginBottom: '20px', backgroundColor: '#F08080', textAlign: 'left', border: 'none', borderRadius: '15px' }} />
          <label style={{ fontSize: 16, marginBottom: 10, marginInline: '6px', textAlign: 'left' }}>Password:</label>&nbsp;
          <input type="password" style={{ width: '175px', padding: '4px', marginBottom: '20px', backgroundColor: '#F08080', textAlign: 'left', border: 'none', borderRadius: '15px' }} />
          <button type="submit" style={{ width: '183px', padding: '5px', marginBottom: '20px', backgroundColor: 'maroon', border: 'none', borderRadius: '15px', color: 'white', fontSize: 16, marginInline: '99px' }}>Sign In</button>
        </form>
      </div>
    </div>
  )
}
