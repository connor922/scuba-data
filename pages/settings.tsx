import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import DashboardIcon from '@mui/icons-material/Dashboard'
import MenuIcon from '@mui/icons-material/Menu'
import ScubaDivingIcon from '@mui/icons-material/ScubaDiving'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CampaignModal from '../components/CampaignModal/CampaignModal'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import { createTheme, styled, ThemeProvider } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import { Fragment, useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'

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

const mdTheme = createTheme()

function DashboardContent() {
    const [open, setOpen] = useState(false)
    const [expanded, setExpanded] = useState('')
    const [senority, setSenority] = useState('')
    const [state, setState] = useState([
        {
            id: 1,
            name: 'campaign 1',
            state: 'LIVE',
            seniorites: [
                { id: 1, name: 'conan', isIncluded: true },
                { id: 2, name: 'conan2', isIncluded: true },
                { id: 3, name: 'coansndsad', isIncluded: true },
                { id: 4, name: 'adsadsad', isIncluded: false },
                { id: 5, name: 'asdsdasd', isIncluded: false },
                { id: 6, name: 'sadasdsdfd', isIncluded: false },
            ],
            keywords: ['lentil'],
            companysList: ['scare'],
        },
    ])

    const [isOpen, setIsOpen] = useState(false)
    const handleClickOpen = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false)
    }

    const toggleDrawer = () => {
        setOpen(!open)
    }

    const handleChange = (panel: any) => (event: any, isExpanded: any) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CampaignModal
                    isOpen={isOpen}
                    handleClose={handleClose}
                    onSubmit={(name: any) => {
                        handleClose()
                        setState((prevstate: any) => {
                            return [
                                {
                                    id: prevstate.length + 1,
                                    name: name,
                                    state: 'LIVE',
                                    seniorites: [],
                                    keywords: [],
                                    companysList: [],
                                },
                                ...prevstate,
                            ]
                        })
                    }}
                />
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
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
                                <Link href="/" sx={{ color: '#FFFFFF' }}>
                                    <ScubaDivingIcon
                                        sx={{ color: '#FFFFFF' }}
                                    />
                                </Link>
                            </IconButton>
                        </Typography>
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
                        Settings
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
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            create
                        </Button>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                width: '100%',
                                marginTop: 2,
                            }}
                        >
                            {state.map((item: any) => {
                                return (
                                    <Accordion
                                        expanded={
                                            expanded == item.id.toString()
                                        }
                                        onChange={handleChange(item.id)}
                                        key={item.id}
                                    >
                                        <AccordionSummary
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography
                                                sx={{
                                                    width: '33%',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {item.name}
                                            </Typography>
                                            <ToggleButtonGroup
                                                color="primary"
                                                value={item.state}
                                                exclusive
                                                onChange={(
                                                    event: React.MouseEvent<HTMLElement>,
                                                    newAlignment: string
                                                ) => {
                                                    event.preventDefault()
                                                    event.stopPropagation()

                                                    setState(
                                                        (prevState: any) => {
                                                            const conan =
                                                                prevState.map(
                                                                    (
                                                                        elm: any
                                                                    ) => {
                                                                        let newItem =
                                                                            {
                                                                                ...elm,
                                                                            }
                                                                        if (
                                                                            elm.id ==
                                                                            item.id
                                                                        ) {
                                                                            newItem.state =
                                                                                newAlignment
                                                                        }
                                                                        return newItem
                                                                    }
                                                                )

                                                            return conan
                                                        }
                                                    )
                                                }}
                                            >
                                                <ToggleButton value="LIVE">
                                                    LIVE
                                                </ToggleButton>
                                                <ToggleButton value="INACTIVE">
                                                    INACTIVE
                                                </ToggleButton>
                                                <ToggleButton value="ARCHIVE">
                                                    ARCHIVE
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Card sx={{ mb: '2rem' }}>
                                                <CardContent
                                                    sx={{
                                                        display: 'flex',
                                                        gap: '1rem',
                                                    }}
                                                >
                                                    <div>
                                                        <TextField
                                                            id="standard-basic"
                                                            label="item"
                                                            variant="standard"
                                                            value={senority}
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                setSenority(
                                                                    event.target
                                                                        .value
                                                                )
                                                            }}
                                                        />
                                                        <Button
                                                            onClick={() => {
                                                                setState(
                                                                    (
                                                                        prevstate: any
                                                                    ) => {
                                                                        return prevstate.map(
                                                                            (
                                                                                long:any
                                                                            ) => {
                                                                                let data =
                                                                                    {
                                                                                        ...long,
                                                                                    }

                                                                                if (
                                                                                    long.id ===
                                                                                    item.id
                                                                                ) {
                                                                                    data =
                                                                                        {
                                                                                            ...data,
                                                                                            seniorites:
                                                                                                [
                                                                                                    ...data.seniorites,
                                                                                                    {
                                                                                                        id: data
                                                                                                            .seniorites
                                                                                                            .length,
                                                                                                        name: senority,
                                                                                                        isIncluded:
                                                                                                            true,
                                                                                                    },
                                                                                                ],
                                                                                        }
                                                                                }

                                                                                return data
                                                                            }
                                                                        )
                                                                    }
                                                                )
                                                            }}
                                                        >
                                                            Add
                                                        </Button>
                                                    </div>
                                                    {item.seniorites
                                                        .filter(
                                                            (a: any) =>
                                                                a.isIncluded
                                                        )
                                                        .map((a: any) => {
                                                            return (
                                                                <Chip
                                                                    key={a.name}
                                                                    sx={{
                                                                        bgcolor:
                                                                            'green',
                                                                        color: 'white',
                                                                    }}
                                                                    label={
                                                                        a.name
                                                                    }
                                                                    onClick={() => {
                                                                        setState(
                                                                            (
                                                                                prevstate: any
                                                                            ) => {
                                                                                return prevstate.map(
                                                                                    (
                                                                                        long:any
                                                                                    ) => {
                                                                                        let data =
                                                                                            {
                                                                                                ...long,
                                                                                            }

                                                                                        if (
                                                                                            long.id ===
                                                                                            item.id
                                                                                        ) {
                                                                                            data =
                                                                                                {
                                                                                                    ...data,
                                                                                                    seniorites:
                                                                                                        data.seniorites.map(
                                                                                                            (
                                                                                                                r:any
                                                                                                            ) => {
                                                                                                                if (
                                                                                                                    a.id ===
                                                                                                                    r.id
                                                                                                                ) {
                                                                                                                    return {
                                                                                                                        ...r,
                                                                                                                        isIncluded:
                                                                                                                            false,
                                                                                                                    }
                                                                                                                }
                                                                                                                return r
                                                                                                            }
                                                                                                        ),
                                                                                                }
                                                                                        }

                                                                                        return data
                                                                                    }
                                                                                )
                                                                            }
                                                                        )
                                                                    }}
                                                                    onDelete={() => {
                                                                        setState(
                                                                            (
                                                                                prevstate: any
                                                                            ) => {
                                                                                return prevstate.map(
                                                                                    (
                                                                                        long:any
                                                                                    ) => {
                                                                                        let data =
                                                                                            {
                                                                                                ...long,
                                                                                            }

                                                                                        if (
                                                                                            long.id ===
                                                                                            item.id
                                                                                        ) {
                                                                                            data =
                                                                                                {
                                                                                                    ...data,
                                                                                                    seniorites:
                                                                                                        data.seniorites.filter(
                                                                                                            (
                                                                                                                r:any
                                                                                                            ) => {
                                                                                                                
                                                                                                                return    a.id !==
                                                                                                                    r.id
                                                                                                               
                                                                                                            }
                                                                                                        ),
                                                                                                }
                                                                                        }

                                                                                        return data
                                                                                    }
                                                                                )
                                                                            }
                                                                        )


                                                                    }}
                                                                />
                                                            )
                                                        })}
                                                    {item.seniorites
                                                        .filter(
                                                            (a: any) =>
                                                                !a.isIncluded
                                                        )
                                                        .map((a: any) => {
                                                            return (
                                                                <Chip
                                                                    key={a.name}
                                                                    sx={{
                                                                        bgcolor:
                                                                            'red',
                                                                        color: 'white',
                                                                    }}
                                                                    label={
                                                                        a.name
                                                                    }
                                                                    onClick={() => {
                                                                        setState(
                                                                            (
                                                                                prevstate: any
                                                                            ) => {
                                                                                return prevstate.map(
                                                                                    (
                                                                                        long:any
                                                                                    ) => {
                                                                                        let data =
                                                                                            {
                                                                                                ...long,
                                                                                            }

                                                                                        if (
                                                                                            long.id ===
                                                                                            item.id
                                                                                        ) {
                                                                                            data =
                                                                                                {
                                                                                                    ...data,
                                                                                                    seniorites:
                                                                                                        data.seniorites.map(
                                                                                                            (
                                                                                                                r:any
                                                                                                            ) => {
                                                                                                                if (
                                                                                                                    a.id ===
                                                                                                                    r.id
                                                                                                                ) {
                                                                                                                    return {
                                                                                                                        ...r,
                                                                                                                        isIncluded:
                                                                                                                            true,
                                                                                                                    }
                                                                                                                }
                                                                                                                return r
                                                                                                            }
                                                                                                        ),
                                                                                                }
                                                                                        }

                                                                                        return data
                                                                                    }
                                                                                )
                                                                            }
                                                                        )
                                                                    }}
                                                                    onDelete={() => {}}
                                                                />
                                                            )
                                                        })}
                                                </CardContent>
                                            </Card>
                                            <Card sx={{ mb: '2rem' }}>
                                                <CardContent
                                                    sx={{
                                                        display: 'flex',
                                                        gap: '1rem',
                                                        justifyContent:
                                                            'space-between',
                                                    }}
                                                >
                                                    {item.companysList.map(
                                                        (a: any) => {
                                                            return (
                                                                <Typography
                                                                    variant={
                                                                        'h6'
                                                                    }
                                                                    gutterBottom
                                                                    key={a}
                                                                >
                                                                    {a}
                                                                </Typography>
                                                            )
                                                        }
                                                    )}
                                                </CardContent>
                                            </Card>
                                            <Card sx={{ mb: '2rem' }}>
                                                <CardContent
                                                    sx={{
                                                        display: 'flex',
                                                        gap: '1rem',
                                                        justifyContent:
                                                            'space-between',
                                                    }}
                                                >
                                                    {item.keywords.map(
                                                        (a: any) => {
                                                            return (
                                                                <Typography
                                                                    variant={
                                                                        'h6'
                                                                    }
                                                                    gutterBottom
                                                                    key={a}
                                                                >
                                                                    {a}
                                                                </Typography>
                                                            )
                                                        }
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })}
                        </Paper>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default DashboardContent
