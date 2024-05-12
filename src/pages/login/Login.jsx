import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import * as Components from './Components';
import './login.scss';
import { loginUser, registerUser } from '../../api'; // Import loginUser and registerUser functions

function Login() {
  const navigate = useNavigate(); // Use useNavigate hook
  const [signIn, setSignIn] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleToggle = (value) => {
    setSignIn(value);
    setError('');
    if (!value) {
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  try {
    const userData = { email, password };
    const data = await loginUser(userData);
    if (data.token) {
      localStorage.setItem('token', data.token);
      navigate('/');
    } else {
      setError(data.error || 'Login failed. Please check your email and password.');
    }
  } catch (error) {
    console.error(error);
    setError('An error occurred. Please try again later.');
  }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userData = { name, email, password };
      const data = await registerUser(userData);
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="mainbody">
      <div className="insidebody">
        <Components.Container>
          <Components.SignUpContainer signinIn={signIn}>
            <Components.Form onSubmit={handleRegister}>
              <Components.Title>Create Account</Components.Title>
              <Components.Input 
                type="text" 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
              <Components.Input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <Components.Input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <Components.Button type="submit">Sign Up</Components.Button>
              {error && <div className="error">{error}</div>}
            </Components.Form>
          </Components.SignUpContainer>

          <Components.SignInContainer signinIn={signIn}>
            <Components.Form onSubmit={handleLogin}>
              <Components.Title>Sign in</Components.Title>
              <Components.Input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <Components.Input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <Components.Anchor href="#">Forgot your password?</Components.Anchor>
              <Components.Button type="submit">Sign In</Components.Button>
              {error && <div className="error">{error}</div>}
            </Components.Form>
          </Components.SignInContainer>

          <div className="desccontent">
            <Components.OverlayContainer signinIn={signIn}>
              <Components.Overlay signinIn={signIn}>
                <Components.LeftOverlayPanel className="contentbody" signinIn={signIn}>
                  <Components.Title>staff.io</Components.Title>
                  <Components.Paragraph>Please login with your personal info</Components.Paragraph>
                  <Components.GhostButton onClick={() => handleToggle(true)}>Sign In</Components.GhostButton>
                </Components.LeftOverlayPanel>
                <Components.RightOverlayPanel className="contentbody" signinIn={signIn}>
                  <Components.Title>staff.io</Components.Title>
                  <Components.Paragraph>Enter Your personal details</Components.Paragraph>
                  <Components.GhostButton onClick={() => handleToggle(false)}>Sign Up</Components.GhostButton>
                </Components.RightOverlayPanel>
              </Components.Overlay>
            </Components.OverlayContainer>
          </div>

        </Components.Container>
      </div>
    </div>
  );
}

export default Login;
