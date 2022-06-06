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
            <DialogTitle>Create a Campaign</DialogTitle>
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
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                            ev.preventDefault()
                            onSubmit(name)
                        }
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    onClick={() => {
                        onSubmit(name)
                    }}
                    disabled={name.length === 0}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}
