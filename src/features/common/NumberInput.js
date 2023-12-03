import * as React from 'react';
import { unstable_useNumberInput as useNumberInput } from '@mui/base/unstable_useNumberInput';
import { styled } from '@mui/system';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { Button, Stack, TextField, IconButton } from '@mui/material';

const NumberInput = (props) =>
{
    return (
        <Stack direction="row">
            <TextField {...props} />
            <Stack>
                <IconButton size="small" variant="outlined" onClick={e => props.onIncrement(props.value + 1)}><ArrowDropUpRoundedIcon /></IconButton>
                <IconButton size="small" variant="outlined" onClick={e => props.onIncrement(props.value - 1)}><ArrowDropDownRoundedIcon /></IconButton>
            </Stack>
        </Stack>
    );
};

export default NumberInput;
