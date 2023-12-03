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
import { useNavigate, useLocation  } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { getUser } from '../user/UserSlice';
import { useSelector } from 'react-redux';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import FaceIcon from '@mui/icons-material/Face';
import TaskIcon from '@mui/icons-material/Task';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function Footer()
{
    const navigate = useNavigate();
    const user = useSelector(getUser);
    

    const pages = [{ name: 'Pacijenti', path: '/', icon: "GroupsIcon" }];
    
    const location = useLocation();
    let currentPageIndex = 0;
    for (var i = 0; i < pages.length; i++)
    {
        if (location.pathname == pages[i].path)
            currentPageIndex = i;
    }

    const getIcon = name =>
    {
        switch (name)
        {
            case "GroupsIcon": return <GroupsIcon />;
            case "FaceIcon": return <FaceIcon />;
            case "TaskIcon": return <TaskIcon />;
            case "AdminPanelSettingsIcon": return <AdminPanelSettingsIcon />;
            default: return <TaskIcon />
        }
    }

    return <div />;

    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, padding: 1 }}>
            <BottomNavigation
                showLabels
                sx={{ backgroundColor: '#7d1c12' }}
                value={currentPageIndex}
                onChange={(event, newValue) =>
                {
                    navigate(pages[newValue].path);
                }}
            >

                {pages.length && pages.map(page => (
                    <BottomNavigationAction sx={{color:'white'}} label={page.name} icon={getIcon(page.icon)} />
                ))}
            </BottomNavigation>
        </AppBar>
    );
}
export default Footer;