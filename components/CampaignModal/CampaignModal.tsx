import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import { useState } from 'react'

import DialogTitle from '@mui/material/DialogTitle'

export default function CampaignModal({ isOpen, handleClose, onSubmit }: any) {
    const [name, setName] = useState('')

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
                    onClick={() => {
                        onSubmit(name)
                    }}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}
