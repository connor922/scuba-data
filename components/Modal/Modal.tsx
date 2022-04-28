import Button from '@mui/material/Button'
import Stepper from '../Stepper/Stepper'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function FormDialog({ isOpen, handleClose }: any) {
    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Upload</DialogTitle>
            <DialogContent>
                <Stepper />
            </DialogContent>
        </Dialog>
    )
}
