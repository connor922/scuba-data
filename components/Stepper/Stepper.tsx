import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useCSVReader } from 'react-papaparse'
import MultiSelect from '../MultiSelect/MultiSelect'

const steps = ['Upload file', 'Choose Campaign']

export default function HorizontalLinearStepper({ onClose }: any) {
    const [activeStep, setActiveStep] = React.useState(0)
    const [state, setState] = React.useState([])
    const { CSVReader } = useCSVReader()

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    let stepContent = null

    if (activeStep === steps.length) {
        stepContent = (
            <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={() => onClose(state)}>Calculate</Button>
                </Box>
            </>
        )
    } else if (activeStep == 0) {
        stepContent = (
            <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    <Stepper />
                    <CSVReader
                        onUploadAccepted={(results: any) => {
                            setState(results.data)
                        }}
                    >
                        {({
                            getRootProps,
                            acceptedFile,
                            ProgressBar,
                            getRemoveFileProps,
                        }: any) => (
                            <>
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '0.5rem',
                                        paddingTop: '1rem',
                                        paddingBottom: '0.5rem',
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        component="span"
                                        {...getRootProps()}
                                    >
                                        Upload
                                    </Button>
                                    <div>
                                        {acceptedFile && acceptedFile.name}
                                    </div>
                                    <Button
                                        variant="contained"
                                        component="span"
                                        {...getRemoveFileProps()}
                                    >
                                        Remove
                                    </Button>
                                </div>
                                <ProgressBar />
                            </>
                        )}
                    </CSVReader>
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleNext}>Next</Button>
                </Box>
            </>
        )
    } else {
        stepContent = (
            <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    Choose the Campaign to run on
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto', pb: '1rem' }}>
                        <MultiSelect
                            items={[
                                'Test Campaign 1',
                                'Test Campaign 2',
                                'Test Campaign 3',
                                'Test Campaign 4',
                            ]}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}>Next</Button>
                    </Box>
                </Box>
            </>
        )
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => {
                    const stepProps: { completed?: boolean } = {}
                    const labelProps: {
                        optional?: React.ReactNode
                    } = {}
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            {stepContent}
        </Box>
    )
}
