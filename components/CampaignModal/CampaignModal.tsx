import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import { useState } from 'react'
import {useSWRConfig} from 'swr'

import DialogTitle from '@mui/material/DialogTitle'

export default function CampaignModal({ isOpen, handleClose, onSubmit }: any) {
    const [name, setName] = useState('')
    const { mutate } = useSWRConfig()

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Choose a Campaign name</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value)
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    onClick={async () => {
                        const aa = {
                            id: 2,
                            name: name,
                            state: 'LIVE',
                            seniorites: [],
                            keywords: [],
                            companysList: [],
                            jobTitles: [],
                        };

                        try {
                            await mutate("/api/settings/1", async (todos:any) => {
                                const updatedTodo = await fetch('/api/settings/1', {
                                  method: 'POST',
                                  headers: new Headers({
                                    'Content-Type': 'application/json',
                                    Accept: 'application/json',
                                  }),
                                  body: JSON.stringify(aa)
                                })
                              
                                return [...todos, aa]
                              })

                          
                        } catch (e) {
                          console.log("shizz")
                        }

                        onSubmit()
                    }}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}
