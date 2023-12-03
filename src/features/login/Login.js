import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate  } from 'react-router-dom';
import { Button, TextField, Container, Typography, Paper, Grid } from '@mui/material';
import { getDataAsync } from '../../app/firebase';
import { loginUser } from '../../features/user/UserSlice';
import { useDispatch } from 'react-redux';
import Spacer from '../common/Spacer';

const Login = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) =>
    {
        e.preventDefault();

        const auth = getAuth();
        try
        {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            getDataAsync('/users/' + user.uid, handleGetUserData); 
        } catch (error)
        {
            setError(error.message); // Show error message if something went wrong
        }
    };

    const handleGetUserData = (user) =>
    {
        dispatch(loginUser(user));
        navigate('/');
    }

    return (
        <Grid container direction="column" justify="center" alignItems="center" style={{ height: '100vh' }}>
            <Spacer height={40} />
            <img src="lifetracker-login-logo.png" style={{ width: '225px', height: '87px' }} />
            <Spacer height={40} />
            <Typography>Please login to continue</Typography>
            <Spacer />
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
                <Spacer />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Login
                </Button>
            </form>
            <Spacer height={60} />
        </Grid>
    );
};

export default Login;
