import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import Router from 'next/router'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { usePapaParse } from 'react-papaparse'
import Modal from '../components/Modal/Modal'
import Wrapper from '../components/Wrapper/Wrapper'
import CircularProgress from '@mui/material/CircularProgress'
import useSWR, { useSWRConfig } from 'swr'
import { supabase } from '../libs/initSupabase'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const baseURL = process.env.NEXT_PUBLIC_FUNCTIONS_BASE_URL

interface obje {
    [key: string]: string
}

const fetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
        throw Error("Yo that's NOT OK!!!")
    }
    const data = await res.json()
    return data
}

interface formPost {
    user?: string
    name: string
    error_count: number
    row_count: number
    file: string
    campaigns: string[],
    high: number,
    medium: number,
    low: number
}

const updateFn = async (newData: formPost) => {
    await fetch('/api/dashboard/1', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }),
        body: JSON.stringify(newData),
    })
}

function DashboardContent() {
    const [isOpen, setIsOpen] = useState(false)
    const [cards, setCards] = useState([])
    const { jsonToCSV } = usePapaParse()
    const { mutate } = useSWRConfig()
    const [isLoading, setIsLoading] = useState(true)
    const profile = supabase.auth.user()
    const { data } = useSWR(`/api/dashboard/${profile?.id}`, fetcher)

    const handleClickOpen = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false)
    }

    useEffect(() => {
        if (!profile) {
            Router.replace('/')
        }
    }, [profile])

    useEffect(() => {
        if (data) {
            setCards(data)
            setIsLoading(false)
        }
    }, [data])

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
                        processfile={async (
                            newData: string[][],
                            campaigns: any
                        ) => {
                            const jobtitles = newData.reduce((memo, val) => {
                                memo.push(val[0])
                                return memo;
                            }, [])



                            //const jobtitles = ['head of it', 'Director of Finance', 'Director of IT Human Resources', 'Associate Director of IT & Cloud', 'Global Head of IT and government services and something like this'];
                            const kw = campaigns.keywords.filter((a: any) => a.isIncluded).map((a: any) => a.name);
                            const exclude_kw = campaigns.keywords.filter((a: any) => !a.isIncluded).map((a: any) => a.name);
                            const sen = campaigns.seniorites.filter((a: any) => a.isIncluded).map((a: any) => a.name);
                            const exclude_sen: string[] = campaigns.seniorites.filter((a: any) => a.isIncluded).map((a: any) => a.name);
                            const jt: string[] = campaigns.jobTitles.filter((a: any) => a.isIncluded).map((a: any) => a.name);
                            const exclude_jt: string[] = campaigns.jobTitles.filter((a: any) => a.isIncluded).map((a: any) => a.name);
                            debugger;

                            const fomattedData = await fetch(
                                (baseURL ? baseURL + '/' : '') +
                                'api/updatedata',
                                {
                                    method: 'POST',
                                    headers: new Headers({
                                        'Content-Type': 'application/json',
                                        Accept: 'application/json',
                                    }),
                                    body: JSON.stringify({
                                        jobtitles: jobtitles,
                                        kw: kw,
                                        exclude_kw: exclude_kw,
                                        sen: sen,
                                        exclude_sen: exclude_sen,
                                        jt: jt,
                                        exclude_jt: exclude_jt
                                    }
                                    ),
                                }
                            )
                            const score = await fomattedData.json()

                            const jobs: any = score.a;
                            const conan = Object.values(jobs)
                            const finalResults: any = conan.reduce((memo: any, job: any) => {

                                if (job == "No match" || job == 'Exclude') {
                                    memo.high = memo.high + 1;
                                } else if (job == "Clean match" || job == 'Strong match') {
                                    memo.medium = memo.medium + 1;

                                } else {
                                    memo.low = memo.low + 1;
                                }
                                return memo;
                            }, { high: 0, medium: 0, low: 0 })

                            debugger;

                            console.log(score)
                            handleClose()



                            const newTodo = {
                                high: Math.round(finalResults.high / conan.length) * 100,
                                medium: Math.round(finalResults.medium / conan.length) * 100,
                                low: Math.round(finalResults.low / conan.length) * 100,
                                user: profile?.id,
                                name: newData[0][0],
                                error_count: 0,
                                row_count: newData.length,
                                file: jsonToCSV(
                                    newData.map((array: string[]) => {
                                        const b: obje = {}

                                        array.forEach(
                                            (
                                                element: string,
                                                index: number
                                            ) => {
                                                b[`column ${index}`] = element
                                                    .split('')
                                                    .reverse()
                                                    .join('')
                                            }
                                        )

                                        return b
                                    })
                                ),
                                campaigns: [campaigns.id.toString()],
                            }

                            mutate(
                                `/api/dashboard/${profile?.id}`,
                                updateFn(newTodo),
                                {
                                    optimisticData: [...data, newTodo],
                                    rollbackOnError: true,
                                }
                            )
                        }}
                    />

                    {!isLoading ? (
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
                            {cards.length > 0 ? cards.map((cards: formPost, index: number) => {
                                const { error_count, name, row_count, file, high, medium, low } =
                                    cards
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
                                                {row_count}
                                            </Typography>
                                            <Typography
                                                variant={'h6'}
                                                sx={{
                                                    flex: '1 1 0px',
                                                    color: 'darkRed',
                                                    lineHeight: 2,
                                                }}
                                            >
                                                {error_count}
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
                                                    {high}%
                                                </Avatar>
                                                <Avatar
                                                    sx={{
                                                        bgcolor: 'orange',
                                                        fontSize: '0.95rem',
                                                        paddingLeft: '5px',
                                                        paddingTop: '2px',
                                                    }}
                                                >
                                                    {medium}%
                                                </Avatar>
                                                <Avatar
                                                    sx={{
                                                        bgcolor: 'crimson',
                                                        fontSize: '0.95rem',
                                                        paddingLeft: '5px',
                                                        paddingTop: '2px',
                                                    }}
                                                >
                                                    {low}%
                                                </Avatar>
                                            </div>
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    color: 'blue',
                                                    flex: '1 1 0px',
                                                }}
                                                onClick={() => {
                                                    var csvData = new Blob(
                                                        [file],
                                                        {
                                                            type: 'text/csv;charset=utf-8;',
                                                        }
                                                    )
                                                    var csvURL =
                                                        window.URL.createObjectURL(
                                                            csvData
                                                        )

                                                    var tempLink =
                                                        document.createElement(
                                                            'a'
                                                        )
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
                            }) : <Box
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'center',
                                    margin: "auto"
                                }}
                            >
                                <AddCircleOutlineIcon sx={{
                                    color: "#1976d2"
                                }} />      Please upload some results
                            </Box>
                            }
                        </Paper>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'center',
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default DashboardContent
