import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stepper from '../Stepper/Stepper'

export default function FormDialog({ isOpen, handleClose, processfile }: any) {
    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Upload</DialogTitle>
            <DialogContent>
                <Stepper onClose={processfile} />
            </DialogContent>
        </Dialog>
    )
}
