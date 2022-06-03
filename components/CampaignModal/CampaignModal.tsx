import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

interface CampaignModalProps {
    isOpen: boolean
    handleClose: () => void
    onSubmit: (name: string) => void
}
export default function CampaignModal({
    isOpen,
    handleClose,
    onSubmit,
}: CampaignModalProps) {
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
