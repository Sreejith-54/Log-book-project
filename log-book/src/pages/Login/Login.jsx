import React from 'react'
import Navbar from '../../components/Navbar'
import './Login.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const Navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleLogin(e) {
        e.preventDefault();
        if(username === 'admin' && password === 'admin123'){
            alert('Login Successful');
            Navigate('/admin');
        }
        else if(username === 'faculty' && password === 'faculty123'){
            alert('Login Successful');
            Navigate('/Faculty');
        }else if(username === 'cr' && password === 'cr123'){
            alert('Login Successful');
            Navigate('/cr');
        }else{
            alert('Invalid Credentials');
        }
        setPassword('');
        setUsername('');
    }

  return (
    <div className='login-page'>
        <Navbar />
        <div className='login-container' style={{display:'flex',flexDirection:'column', backgroundColor:'#AD3A3C', height:'60vh', border:'2px solid black', borderRadius:'10px', margin:'auto', marginTop:'10vh', padding:'20px', color:'white'}}>
            <h2 style={{margin: '20px 0px', fontSize: '5vh', textAlign:'center', fontFamily:'ui-sans-serif'}}>Login Page</h2>
            <form onSubmit={(e) => handleLogin(e)} style={{display: 'flex', flexDirection: 'column', gap: '2vh',margin: '5vh auto'}}>
                <label>Username</label>
                <input type="text" name="username" placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <label>Password</label>
                <input type="password" name="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit" style={{width:'50%', padding:'1vh', borderRadius:'1vh', margin:'5vh auto'}}>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login