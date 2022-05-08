import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import { useEffect, useState } from 'react'
import CampaignModal from '../components/CampaignModal/CampaignModal'
import Wrapper from '../components/Wrapper/Wrapper'
import Accord from '../components/Accord/Accord'

import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error("Yo that's NOT OK!!!");
  }
  const data = await res.json();
  return data;
};

function Settings() {
    const [expanded, setExpanded] = useState('')
    const [state, setState] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const result = useSWR(`/api/user/1`, fetcher);
    const data = result.data;
    

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

    useEffect(()=>{
        if(data){
            setState(data);
            setIsLoading(false);
        }
    },[data])

    return (
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
            <Wrapper pageName={'Settings'} />
            <Box
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
                        create
                    </Button>
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
                    {!isLoading ? state.map((item: any) => {
                        debugger;
                            return (
                                <Accord
                                    key={item.id}
                                    setState={setState}
                                    seniorites={item.seniorites}
                                    keywords={item.keywords}
                                    companysList={item.companysList}
                                    isExpanded={expanded == item.id.toString()}
                                    id={item.id}
                                    handleChange={handleChange}
                                    name={item.name}
                                    state={item.state}
                                />
                            )}): <div>loading</div>}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Settings
