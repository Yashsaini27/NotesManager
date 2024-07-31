"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Root = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(to bottom, #ffffff, #d1c4e9)',
});

const FormContainer = styled(Box)({
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '1rem', // Increased border radius
  boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  width: '100%', // Ensure container takes full width on smaller screens
  maxWidth: '400px', // Set maximum width to make the container smaller
});

const FormTitle = styled(Typography)({
  marginBottom: '1.5rem',
});

const FormField = styled(TextField)({
  marginBottom: '1rem',
});

const FormButton = styled(Button)({
  marginTop: '1rem',
  backgroundColor: '#673ab7', // Purple color
  color: '#fff', // White text color
  '&:hover': {
    backgroundColor: '#5e35b1', // Darker purple on hover
  },
});

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [emailError, setEmailError] = useState<string | null>(null); // Add email error state
  const [passwordError, setPasswordError] = useState<string | null>(null); // Add password error state
  const [isMounted, setIsMounted] = useState(false); // Add mount state
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // Set mounted state after initial render
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null); // Clear previous email errors
    setPasswordError(null); // Clear previous password errors
    setLoading(true); // Start loading

    // Simple client-side validation
    if (!email) {
      setEmailError('Please fill in your email.');
      setLoading(false);
      return;
    }

    if (!password) {
      setPasswordError('Please fill in your password.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://managerserver-4.onrender.com/auth/login', { email, password });
      console.log('User logged in successfully:', response.data);

      // Store the token in localStorage or context/state
      localStorage.setItem('token', response.data.token);

      // Redirect to a different page after login
      router.push('pages/dashboard'); // Example route, change as needed
    } catch (error) {
      // console.error('Error during login:', error.response?.data || error.message);
      setEmailError('Failed to login. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (!isMounted) return null; // Ensure client-side only rendering after component mounts

  return (
    <Root>
      <FormContainer>
        <FormTitle variant="h4">
          Welcome to <span style={{ color: '#673ab7' }}>Workflo</span>!
        </FormTitle>
        <form onSubmit={handleSubmit}>
          <FormField
            fullWidth
            label="Your email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={!!emailError} // Show error state if any
            helperText={emailError}
          />
          <FormField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            error={!!passwordError} // Show error state if any
            helperText={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormButton
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading} // Disable button while loading
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'} {/* Show spinner when loading */}
          </FormButton>
        </form>
        <Typography variant="body2" sx={{ marginTop: '1rem' }}>
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" passHref>
            <Typography component="a" color="primary" sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
              Create a new account.
            </Typography>
          </Link>
        </Typography>
      </FormContainer>
    </Root>
  );
};

export default Login;
