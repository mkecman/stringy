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
import { BottomNavigation, BottomNavigationAction, ButtonGroup, Paper, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HistoryIcon from '@mui/icons-material/History';
import TaskIcon from '@mui/icons-material/Task';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BarChartIcon from '@mui/icons-material/BarChart';
import ListAltIcon from '@mui/icons-material/ListAlt';

function AppBarNavigation()
{
    const navigate = useNavigate();
    const user = useSelector(getUser);

    const pages = [
        { name: 'Stats', path: '/statistics', icon: "BarChartIcon" },
        { name: 'Tasks', path: '/tasks', icon: "ListAltIcon" },
        { name: 'Today', path: '/', icon: "AddCircleOutlineIcon" },
    ];

    const location = useLocation();

    const getIcon = name =>
    {
        switch (name)
        {
            case "AddCircleOutlineIcon": return <AddCircleOutlineIcon />;
            case "HistoryIcon": return <HistoryIcon />;
            case "TaskIcon": return <TaskIcon />;
            case "ListAltIcon": return <ListAltIcon />;
            case "BarChartIcon": return <BarChartIcon />;
            default: return <TaskIcon />
        }
    }

    return (
        <Stack direction="row" spacing={3}>
            <ToggleButtonGroup
                color="secondary"
                value={location.pathname}
                exclusive
                onChange={(event, newValue) =>
                {
                    navigate(newValue);
                }}
            >
                {pages.length && pages.map(page => (
                    <ToggleButton key={page.name} value={page.path} color="primary">
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                        >
                            {getIcon(page.icon)}
                            {page.name}
                        </Stack>
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Stack>
    );
}
export default AppBarNavigation;