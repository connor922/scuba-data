import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import { useState } from 'react'
import CampaignModal from '../components/CampaignModal/CampaignModal'
import Wrapper from '../components/Wrapper/Wrapper'
import Accord from '../components/Accord/Accord'

function Settings() {
    const [expanded, setExpanded] = useState('')
    const [state, setState] = useState([
        {
            id: 1,
            name: 'Campaign 1',
            state: 'LIVE',
            seniorites: [
                { id: 1, name: 'Director', isIncluded: true },
                { id: 2, name: 'Manager', isIncluded: true },
                { id: 3, name: 'CEO', isIncluded: true },
                { id: 4, name: 'CFO', isIncluded: false },
                { id: 5, name: 'COO', isIncluded: false },
                { id: 6, name: 'Senior', isIncluded: false },
            ],
            keywords: [
                { id: 1, name: 'Technology', isIncluded: true },
                { id: 2, name: 'Logistics', isIncluded: true },
                { id: 3, name: 'Property', isIncluded: true },
                { id: 4, name: 'Management', isIncluded: false },
                { id: 5, name: 'Info Security', isIncluded: false },
            ],
            companysList: [
                { id: 1, name: 'Google', isIncluded: true },
                { id: 2, name: 'Amazon', isIncluded: true },
                { id: 3, name: 'Foxtons', isIncluded: true },
                { id: 4, name: 'Statpro', isIncluded: false },
                { id: 5, name: 'Conflience', isIncluded: false },
                { id: 6, name: 'Sainsburys', isIncluded: false },
            ],
        },
    ])

    const [isOpen, setIsOpen] = useState(false)
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
                        {state.map((item: any) => {
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
                            )
                        })}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Settings
