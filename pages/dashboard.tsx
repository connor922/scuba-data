import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { usePapaParse } from 'react-papaparse'
import Modal from '../components/Modal/Modal'
import Wrapper from '../components/Wrapper/Wrapper'
import useUser from '../data/use-user'

const initialCards: any = [
    {
        name: 'Example upload',
        errorCount: '24 errors',
        rowCount: '223 rows',
        file: `Column 1,Column 2,Column 3,Column 4
      1-1,1-2,1-3,1-4
      2-1,2-2,2-3,2-4
      3-1,3-2,3-3,3-4
      4,5,6,7`,
    },
]

function DashboardContent() {
    const [isOpen, setIsOpen] = useState(false)
    const [cards, setCards] = useState(initialCards)
    const { jsonToCSV } = usePapaParse()

    const { user, loading, loggedOut, mutate } = useUser()

    const handleClickOpen = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false)
    }

    useEffect(() => {
        if (loggedOut) {
            Router.replace('/')
        }
    }, [loggedOut])
    if (loggedOut) return 'redirecting...'

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Wrapper pageName={'Dashboard'} />
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
                <Box sx={{ m: 4 }}>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Upload
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        handleClose={handleClose}
                        processfile={(data: any) => {
                            const a = data.map((array: any) => {
                                const b: any = {}

                                array.forEach((element: any, index: any) => {
                                    b[`column ${index}`] = element
                                        .split('')
                                        .reverse()
                                        .join('')
                                })

                                return b
                            })

                            const file = jsonToCSV(a)

                            handleClose()

                            setCards((prevState: any) => {
                                return [
                                    {
                                        name: data[0][0],
                                        errorCount: `${data.length} errors`,
                                        rowCount: `${data.length} errors`,
                                        file: file,
                                    },
                                    ...prevState,
                                ]
                            })
                        }}
                    />

                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            width: '100%',
                            marginTop: 2,
                            minHeight: '60vh',
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
                                            sx={{
                                                flex: '1 1 0px',
                                                fontWeight: 'bold',
                                                lineHeight: 2,
                                            }}
                                        >
                                            {name}
                                        </Typography>
                                        <Typography
                                            variant={'h6'}
                                            sx={{
                                                flex: '1 1 0px',
                                                lineHeight: 2,
                                            }}
                                        >
                                            {rowCount}
                                        </Typography>
                                        <Typography
                                            variant={'h6'}
                                            sx={{
                                                flex: '1 1 0px',
                                                color: 'darkRed',
                                                lineHeight: 2,
                                            }}
                                        >
                                            {errorCount}
                                        </Typography>
                                        <div
                                            style={{
                                                display: 'flex',
                                                gap: '5px',
                                                flex: '1 1 0px',
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    bgcolor: 'green',
                                                    fontSize: '0.95rem',
                                                    paddingLeft: '5px',
                                                    paddingTop: '2px',
                                                }}
                                            >
                                                20%
                                            </Avatar>
                                            <Avatar
                                                sx={{
                                                    bgcolor: 'orange',
                                                    fontSize: '0.95rem',
                                                    paddingLeft: '5px',
                                                    paddingTop: '2px',
                                                }}
                                            >
                                                40%
                                            </Avatar>
                                            <Avatar
                                                sx={{
                                                    bgcolor: 'crimson',
                                                    fontSize: '0.95rem',
                                                    paddingLeft: '5px',
                                                    paddingTop: '2px',
                                                }}
                                            >
                                                40%
                                            </Avatar>
                                        </div>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                color: 'blue',
                                                flex: '1 1 0px',
                                            }}
                                            onClick={() => {
                                                var csvData = new Blob([file], {
                                                    type: 'text/csv;charset=utf-8;',
                                                })
                                                var csvURL =
                                                    window.URL.createObjectURL(
                                                        csvData
                                                    )

                                                var tempLink =
                                                    document.createElement('a')
                                                tempLink.href = csvURL
                                                tempLink.setAttribute(
                                                    'download',
                                                    'download.csv'
                                                )
                                                tempLink.click()
                                            }}
                                        >
                                            Export
                                        </Button>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </Paper>
                </Box>
            </Box>
        </Box>
    )
}

export default DashboardContent
