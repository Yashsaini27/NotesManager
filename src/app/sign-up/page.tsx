"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, InputAdornment, IconButton, Link as MuiLink, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

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

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://managerserver-4.onrender.com/auth/signup', { name, email, password });
      console.log('User signed up successfully:', response.data);
      // Store JWT token in localStorage
      localStorage.setItem('token', response.data.token);
      // Redirect to login page
      router.push('/');
    } catch (error) {
      console.error('Error during sign-up:', error);
      // Handle error based on type
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.msg || 'An error occurred during sign-up');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Root>
      <FormContainer>
        <FormTitle variant="h4">
          Welcome to <span style={{ color: '#673ab7' }}>Workflo</span>!
        </FormTitle>
        <form onSubmit={handleSubmit}>
          <FormField
            fullWidth
            label="Your Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FormField
            fullWidth
            label="Your Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            helperText={password.length < 6 ? 'Password must be at least 6 characters long' : ''}
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
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <FormButton
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading} // Disable button while loading
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign up'} {/* Show spinner when loading */}
          </FormButton>
        </form>
        <Typography variant="body2" sx={{ marginTop: '1rem' }}>
          Already have an account?{' '}
          <Link href="/" passHref>
            <MuiLink variant="body2" color="primary" underline="hover">
              Log in.
            </MuiLink>
          </Link>
        </Typography>
      </FormContainer>
    </Root>
  );
};

export default SignUp;
