import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useCSVReader } from 'react-papaparse'
import MultiSelect from '../MultiSelect/MultiSelect'
import useSWR, { useSWRConfig } from 'swr'

const fetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
        throw Error("Yo that's NOT OK!!!")
    }
    const data = await res.json()
    return data
}

const steps = ['Upload file', 'Choose Campaign']

export default function HorizontalLinearStepper({ onClose }: any) {
    const [activeStep, setActiveStep] = React.useState(0)
    const [state, setState] = React.useState([]);
    const [campaigns, setCampaigns] = React.useState([])

    const { CSVReader } = useCSVReader()
    const {data} = useSWR('/api/settings/1', fetcher);

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
                    <Button onClick={() => onClose({data:state, campaigns})}>Calculate</Button>
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
                                    <div
                                        style={{
                                            margin: 'auto',
                                            marginLeft: '1rem',
                                        }}
                                    >
                                        {acceptedFile && acceptedFile.name}
                                    </div>
                                    {acceptedFile && acceptedFile.name && (
                                        <Button
                                            variant="contained"
                                            component="span"
                                            {...getRemoveFileProps()}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>
                                <ProgressBar />
                            </>
                        )}
                    </CSVReader>
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    {activeStep !== 0 && (
                        <Button
                            color="inherit"
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                    )}
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
                            items={data.map(({id, name}:any)=>{
                                return {id, name}
                            })}
                            campaigns={campaigns}
                            setCampaigns={(val:any)=>{
                                setCampaigns(val)
                            }}
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
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            {stepContent}
        </Box>
    )
}
