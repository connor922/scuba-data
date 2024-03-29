import * as React from 'react'
import { Theme, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Chip from '@mui/material/Chip'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

interface item {
    name: string
    id: string
}
interface MultiSelectProps {
    items: item[]
    campaigns: string[]
    setCampaigns: (value: string[]) => void
}

export default function MultiSelect({
    items,
    campaigns,
    setCampaigns,
}: MultiSelectProps) {
    const handleChange = ({ target: { value } }: SelectChangeEvent) => {
        setCampaigns(value as unknown as string[])
    }

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Campaign</InputLabel>
                <Select
                    multiple
                    value={campaigns as unknown as string}
                    onChange={handleChange}
                    input={
                        <OutlinedInput
                            id="select-multiple-chip"
                            label="Campaign"
                        />
                    }
                    renderValue={(selected) => (
                        <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                            {campaigns.map((value: string) => (
                                <Chip
                                    key={value}
                                    label={
                                        items.find((a) => a.id === value)?.name
                                    }
                                />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {items.map(({ id, name }) => (
                        <MenuItem key={id} value={id}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
