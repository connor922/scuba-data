import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import DashboardIcon from '@mui/icons-material/Dashboard'
import MenuIcon from '@mui/icons-material/Menu'
import Avatar from '@mui/material/Avatar'


import ScubaDivingIcon from '@mui/icons-material/ScubaDiving'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
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
import Typography from '@mui/material/Typography'
import { Fragment, useState } from 'react'
import { usePapaParse } from 'react-papaparse'
import Modal from '../components/Modal/Modal'

const drawerWidth = 240



const config = {
	quotes: false, //or array of booleans
	quoteChar: '"',
	escapeChar: '"',
	delimiter: ",",
	header: true,
	newline: "\r\n",
	skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
	columns: null //or array of strings
};

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
        </ListItemButton>{' '}
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


const cardsT: any = [
  {
      name: 'example',
      errorCount: '24 errors',
      rowCount: '223 rows',
      file:`Column 1,Column 2,Column 3,Column 4
      1-1,1-2,1-3,1-4
      2-1,2-2,2-3,2-4
      3-1,3-2,3-3,3-4
      4,5,6,7`
  },
]

function DashboardContent() {
    const [open, setOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
  const [cards, setCards ] = useState(cardsT)
    const { jsonToCSV } = usePapaParse();

    
    const handleClickOpen = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false)
    }
    const toggleDrawer = () => {
        setOpen(!open)
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
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
                        Dashboard
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
                            Upload
                        </Button>
                        <Modal isOpen={isOpen} handleClose={handleClose} processfile={(data:any)=>{


                          const a = data.map((array:any )=>{

                            const b:any = {};

                            array.forEach((element:any, index: any)  => {
                              b[`column ${index}`] = element.split("").reverse().join("");
                            });

                            return b;
                          })

                          const file = jsonToCSV(a);
                          

                          handleClose()

                          setCards((prevState:any)=>{
                            return [{
                              name: data[0][0],
                              errorCount: `${data.length}errors`,
                              rowCount: `${data.length}errors`,
                              file: file
                            }, ...prevState]})

                          }} />

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
                            {cards.map((cards: any, index: any) => {
                                const { errorCount, name, rowCount, file } = cards
                                return (
                                    <Card key={index} sx={{ mb: '2rem' }}>
                                        <CardContent
                                            sx={{
                                                display: 'flex',
                                                gap: '1rem',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Typography
                                                variant={'h6'}
                                                gutterBottom
                                            >
                                                {name}
                                            </Typography>
                                            <Typography variant={'h6'}>
                                                {rowCount}
                                            </Typography>
                                            <Typography
                                                variant={'h6'}
                                                sx={{ color: 'red' }}
                                            >
                                                {errorCount}
                                            </Typography>
                                            <div style={{display:"flex", gap:"5px"}}>
                                            <Avatar sx={{ bgcolor: "green",fontSize:"1rem" }}>20%</Avatar>
<Avatar sx={{ bgcolor: "orange",fontSize:"1rem" }}>40%</Avatar>
<Avatar sx={{ bgcolor: "red",fontSize:"1rem" }}>40%</Avatar>
                                            </div>
                                            <Button
                                                variant="outlined"
                                                sx={{ color: 'blue' }}
                                                onClick={() => {
                                                    var csvData = new Blob([file], {type: 'text/csv;charset=utf-8;'});
                                                    var csvURL = window.URL.createObjectURL(csvData);
                                                
                                                    var tempLink = document.createElement('a');
                                                    tempLink.href = csvURL;
                                                    tempLink.setAttribute('download', 'download.csv');
                                                    tempLink.click();
                                                }}
                                            >
                                                Export
                                            </Button>
                                        </CardContent>
                                    </Card>
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
