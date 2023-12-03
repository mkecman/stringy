import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { getUser } from '../user/UserSlice';
import { useSelector } from 'react-redux';
import AppBarNavigation from './AppBarNavigation';
import { Stack } from '@mui/material';

function ResponsiveAppBar()
{
    const navigate = useNavigate();
    const user = useSelector(getUser);

    const pages = [{ name: 'Patients', path: '/' }, { name: 'Patient', path: '/patient' }];
    const settings = [{ name: 'Logout', path: '/logout' }];

    if (user.role == "admin")
        pages.unshift({ name: 'Protocols', path: '/protocols' });

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) =>
    {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) =>
    {
        setAnchorElUser(event.currentTarget);
    };

    const handleClickNavMenu = (path) =>
    {
        navigate(path);
        setAnchorElNav(null);
    };

    const handleCloseNavMenu = (event) =>
    {
        setAnchorElNav(null);
    };

    const handleClickUserMenu = (path) =>
    {
        if (path == "/logout")
            handleLogout();
        else
            navigate(path);

        setAnchorElUser(null);
    };

    const handleCloseUserMenu = (event) =>
    {
        setAnchorElUser(null);
    };

    const handleLogout = () =>
    {
        const auth = getAuth();

        signOut(auth)
            .then(() =>
            {
                // Sign-out successful, you can navigate to a different route if you want
                navigate('/login');
            })
            .catch((error) =>
            {
                // An error occurred during sign out
                console.error('Sign out error', error);
            });
    };

    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
            <Container maxWidth="lg">
                <Stack direction="row" justifyContent="space-between" alignItems="center" >
                    {/*<Button>
                    <img src="lifetracker-appbar-logo.png" style={{ width: '95px', height: '40px' }} />
                    </Button>*/}
                    
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key="app-version">
                                <Typography>LifeTracker - v23.11.29</Typography>
                            </MenuItem>
                            <MenuItem key="email">
                                <Typography>{user.email}</Typography>
                            </MenuItem>
                            {settings.map((setting) => (
                                <MenuItem key={setting.name} onClick={() => handleClickUserMenu(setting.path)}>
                                    <Typography>{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <AppBarNavigation />
                </Stack>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;