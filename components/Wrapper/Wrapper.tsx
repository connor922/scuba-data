import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ScubaDivingIcon from '@mui/icons-material/ScubaDiving'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'
import MuiAppBar from '@mui/material/AppBar'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import { Fragment, useState } from 'react'
import useUser from '../../data/use-user'
import { logout } from '../../libs/auth'

const drawerWidth = 240

const AppBar: any = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }: any) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        }),
    },
}))

export const secondaryListItems = (
    <Fragment>
        <ListItemButton>
            <ListItemIcon>
                <Link href="/dashboard">
                    <DashboardIcon />
                </Link>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <Link href="/settings">
                    <SettingsApplicationsIcon />
                </Link>
            </ListItemIcon>
            <ListItemText primary="Settings" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <Link href="/profile">
                    <AccountCircleIcon />
                </Link>
            </ListItemIcon>
            <ListItemText primary="Profile" />
        </ListItemButton>
    </Fragment>
)

export default function Wrapper({ pageName }: any) {
    const [open, setOpen] = useState(false)

    const toggleDrawer = () => {
        setOpen(!open)
    }

    const { user, loading, mutate } = useUser()

    let profile = null
    if (loading) {
        profile = 'loading...'
    }

    if (user) {
        profile = (
            <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                    logout()
                    mutate()
                }}
            >
                <LogoutIcon />
            </IconButton>
        )
    }

    return (
        <>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    {' '}
                    <Box sx={{ display: 'flex' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link href="/" sx={{ color: '#FFFFFF' }}>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1, color: '#FFFFFF' }}
                            >
                                <IconButton
                                    color="inherit"
                                    sx={{ color: '#FFFFFF' }}
                                >
                                    <ScubaDivingIcon
                                        sx={{ color: '#FFFFFF' }}
                                    />
                                </IconButton>
                            </Typography>
                        </Link>
                    </Box>
                    {profile}
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: [1],
                    }}
                >
                    {pageName}
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    {secondaryListItems}
                    <Divider sx={{ my: 1 }} />
                </List>
            </Drawer>
        </>
    )
}
