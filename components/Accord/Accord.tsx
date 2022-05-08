import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

function List({
    items,
    filterProp,
    newState,
    listName,
    setState,
    id,
    colour,
}: any) {
    return items
        .filter((a: any) => a[filterProp] === newState)
        .map((a: any) => {
            return (
                <Chip
                    key={a.name}
                    sx={{
                        bgcolor: `${colour}`,
                        color: 'white',
                    }}
                    label={a.name}
                    onClick={() => {
                        setState((prevstate: any) => {
                            return prevstate.map((long: any) => {
                                let data = {
                                    ...long,
                                }

                                if (long.id === id) {
                                    data = {
                                        ...data,
                                        [listName]: data[listName].map(
                                            (r: any) => {
                                                if (a.id === r.id) {
                                                    return {
                                                        ...r,
                                                        [filterProp]: !newState,
                                                    }
                                                }
                                                return r
                                            }
                                        ),
                                    }
                                }

                                return data
                            })
                        })
                    }}
                    onDelete={() => {
                        setState((prevstate: any) => {
                            return prevstate.reduce((memo: any, long: any) => {
                                if (long.id === id) {
                                    memo.push({
                                        ...long,
                                        [listName]: long[listName].filter(
                                            (r: any) => {
                                                return a.id !== r.id
                                            }
                                        ),
                                    })
                                } else {
                                    memo.push(long)
                                }

                                return memo
                            }, [])
                        })
                    }}
                />
            )
        })
}

export default function HorizontalLinearStepper({
    isExpanded,
    handleChange,
    id,
    name,
    state,
    setState,
    seniorites,
    keywords,
    companysList,
}: any) {
    const [senority, setSenority] = useState('')
    const [companyList, setCompanyList] = useState('')
    const [keyword, setKeyword] = useState('')

    return (
        <Accordion expanded={isExpanded} onChange={() => handleChange(id)}>
            <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography
                    sx={{
                        fontWeight: 700,
                        width: '33%',
                        flexShrink: 0,
                        fontSize: '125%',
                        margin: 'auto',
                        marginLeft: '1rem',
                    }}
                >
                    {name}
                </Typography>
                <ToggleButtonGroup
                    color="primary"
                    value={state}
                    exclusive
                    onChange={(
                        event: React.MouseEvent<HTMLElement>,
                        newAlignment: string
                    ) => {
                        event.preventDefault()
                        event.stopPropagation()

                        setState((prevState: any) => {
                            const conan = prevState.map((elm: any) => {
                                let newItem = {
                                    ...elm,
                                }
                                if (elm.id == id) {
                                    newItem.state = newAlignment
                                }
                                return newItem
                            })

                            return conan
                        })
                    }}
                >
                    <ToggleButton value="LIVE">LIVE</ToggleButton>
                    <ToggleButton value="INACTIVE">INACTIVE</ToggleButton>
                    <ToggleButton value="ARCHIVE">ARCHIVE</ToggleButton>
                </ToggleButtonGroup>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    borderTop: 'lightgray solid 1px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: '60%',
                        maxWidth: '60%',
                        paddingLeft: '1rem',
                        paddingRight: '1rem',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '1rem',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography sx={{ fontWeight: 600, mt: '1rem' }}>
                            Seniorites
                        </Typography>
                        <div style={{ display: 'flex' }}>
                            <TextField
                                id="standard-basic"
                                placeholder="Position in company"
                                variant="standard"
                                value={senority}
                                onChange={(event) => {
                                    setSenority(event.target.value)
                                }}
                            />
                            <Button
                                onClick={() => {
                                    setState((prevstate: any) => {
                                        return prevstate.map((long: any) => {
                                            let data = {
                                                ...long,
                                            }

                                            if (long.id === id) {
                                                data = {
                                                    ...data,
                                                    seniorites: [
                                                        ...data.seniorites,
                                                        {
                                                            id: data.seniorites
                                                                .length,
                                                            name: senority,
                                                            isIncluded: true,
                                                        },
                                                    ],
                                                }
                                            }

                                            return data
                                        })
                                    })
                                }}
                            >
                                Add
                            </Button>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                gap: '1rem',
                                flexWrap: 'wrap',
                            }}
                        >
                            <List
                                items={seniorites}
                                filterProp="isIncluded"
                                newState={true}
                                listName={'seniorites'}
                                setState={setState}
                                id={id}
                                colour="green"
                            />
                            <List
                                items={seniorites}
                                filterProp="isIncluded"
                                newState={false}
                                listName={'seniorites'}
                                setState={setState}
                                id={id}
                                colour="crimson"
                            />
                        </div>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '1rem',
                            flexDirection: 'column',
                            pt: '2rem',
                        }}
                    >
                        <Typography sx={{ fontWeight: 600 }}>
                            Keywords
                        </Typography>
                        <div style={{ display: 'flex' }}>
                            <TextField
                                id="standard-basic"
                                placeholder="job title"
                                variant="standard"
                                value={keyword}
                                onChange={(event) => {
                                    setKeyword(event.target.value)
                                }}
                            />
                            <Button
                                onClick={() => {
                                    setState((prevstate: any) => {
                                        return prevstate.map((long: any) => {
                                            let data = {
                                                ...long,
                                            }

                                            if (long.id === id) {
                                                data = {
                                                    ...data,
                                                    keywords: [
                                                        ...data.keywords,
                                                        {
                                                            id: data.keywords
                                                                .length,
                                                            name: keyword,
                                                            isIncluded: true,
                                                        },
                                                    ],
                                                }
                                            }

                                            return data
                                        })
                                    })
                                }}
                            >
                                Add
                            </Button>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                gap: '1rem',
                                flexWrap: 'wrap',
                            }}
                        >
                            <List
                                items={keywords}
                                filterProp="isIncluded"
                                newState={true}
                                listName={'keywords'}
                                setState={setState}
                                id={id}
                                colour="green"
                            />
                            <List
                                items={keywords}
                                filterProp="isIncluded"
                                newState={false}
                                listName={'keywords'}
                                setState={setState}
                                id={id}
                                colour="crimson"
                            />
                        </div>
                    </Box>
                </Box>
                <Box sx={{ flex: '40%', maxwidth: '40%' }}>
                    <Typography sx={{ fontWeight: 600, pt: '1rem' }}>
                        Companys List
                    </Typography>
                    <div style={{ display: 'flex', paddingTop: '1rem' }}>
                        <TextField
                            id="standard-basic"
                            placeholder="company"
                            variant="standard"
                            value={companyList}
                            onChange={(event) => {
                                setCompanyList(event.target.value)
                            }}
                        />
                        <Button
                            onClick={() => {
                                setState((prevstate: any) => {
                                    return prevstate.map((long: any) => {
                                        let data = {
                                            ...long,
                                        }

                                        if (long.id === id) {
                                            data = {
                                                ...data,
                                                companysList: [
                                                    ...data.companysList,
                                                    {
                                                        id: data.companysList
                                                            .length,
                                                        name: companyList,
                                                        isIncluded: true,
                                                    },
                                                ],
                                            }
                                        }

                                        return data
                                    })
                                })
                            }}
                        >
                            Add
                        </Button>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '1rem',
                            flexWrap: 'wrap',
                            paddingTop: '1rem',
                        }}
                    >
                        <List
                            items={companysList}
                            filterProp="isIncluded"
                            newState={true}
                            listName={'companysList'}
                            setState={setState}
                            id={id}
                            colour="green"
                        />
                        <List
                            items={companysList}
                            filterProp="isIncluded"
                            newState={false}
                            listName={'companysList'}
                            setState={setState}
                            id={id}
                            colour="crimson"
                        />
                    </div>
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}