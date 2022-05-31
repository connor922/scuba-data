import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Link from '@mui/material/Link'
import Toolbar from '@mui/material/Toolbar'
import { useEffect, useState } from 'react'
import CampaignModal from '../components/CampaignModal/CampaignModal'
import Wrapper from '../components/Wrapper/Wrapper'
import Accord from '../components/Accord/Accord'
import CircularProgress from '@mui/material/CircularProgress'

import useSWR from 'swr'

const fetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
        throw Error("Yo that's NOT OK!!!")
    }
    const data = await res.json()
    return data
}

function Settings() {
    const [expanded, setExpanded] = useState('')
    const [state, setState] = useState<any[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const result = useSWR(`/api/settings/1`, fetcher)
    const data = result.data

    const handleClickOpen = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false)
    }

    const handleChange = (event: any) => {
        setExpanded((prevstate: any) => {
            return event == prevstate ? '' : event
        })
    }

    useEffect(() => {
        if (data) {
            setState(data.filter((a: any) => a.state !== 'ARCHIVED'))
            setIsLoading(false)
        }
    }, [data])

    return (
        <Box sx={{ display: 'flex' }}>
            <CampaignModal
                isOpen={isOpen}
                handleClose={handleClose}
                onSubmit={() => {
                    handleClose()
                }}
            />
            <CssBaseline />
            <Wrapper pageName={'Settings'} />
            <Box
                sx={{
                    backgroundColor: 'grey',
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Box sx={{ m: 4 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Create
                        </Button>
                        <Link href="/archieved-campaigns">
                            <Button variant="contained">
                                View Archieved Campaigns
                            </Button>
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            width: '100%',
                            marginTop: 2,
                            gap: '2rem',
                        }}
                    >
                        {!isLoading ? (
                            state.map((item: any) => {
                                return (
                                    <Accord
                                        key={item.id}
                                        setState={setState}
                                        seniorites={item.seniorites}
                                        keywords={item.keywords}
                                        companysList={item.companysList}
                                        jobTitles={item.jobTitles}
                                        isExpanded={
                                            expanded == item.id.toString()
                                        }
                                        id={item.id}
                                        handleChange={handleChange}
                                        name={item.name}
                                        state={item.state}
                                    />
                                )
                            })
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
        </Box>
    )
}

export default Settings
