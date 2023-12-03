import { Button, Container, Divider, Pagination, Paper, Stack, Table, TableContainer, TableHead, TableRow, TableCell, IconButton, TextField, Typography, Grid, Autocomplete } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { writeData, getListOrderByChildEndBeforeLimit, pushData, stopListening, getDataAsync, startListening, getSearchPatients, getPatientsProtocols, deleteData, getListOrderByChild, updateData, getTaskLogsForDate } from '../../app/firebase';
import { withAuthentication } from '../login/withAuthentication';
import ResponsiveAppBar from '../appbar/ResponsiveAppBar';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../user/UserSlice';
import Spacer from '../common/Spacer';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import Footer from '../appbar/Footer';
import P5Renderer from './P5Renderer';
import { cloneDeep } from 'lodash';

function Editor(props)
{
    dayjs.extend(relativeTime);
    const user = useSelector(getUser);

    const [p5Data, setP5Data] = useState(
        {
            width: 800,
            height: 800,
            pins_amount: 40,
            pins: [],
            stringsDef: [{ index: 0, steps: 40, start_pin: 0, move_right: 14, color: 'red' }, { index: 1, steps: 40, start_pin: 0, move_right: 15, color: 'blue' }, { index: 2, steps: 40, start_pin: 0, move_right: 16, color: 'green' }],
            strings: [[{ x: 0, y: 0, color: 'red' }, { x: 10, y: 10, color: 'red' }]]
        });
    
    useEffect(() =>
    {
        generate(p5Data);
        // cleanup function
        return () =>
        {
        };
    }, []);

    const generate = data =>
    {
        //generate Pins
        let pins = [];
        const dimension = data.width;
        const radius = dimension / 2;
        const center = dimension / 2;
        const theta = ((Math.PI * 2) / data.pins_amount);

        for (let i = 0; i < data.pins_amount; i++)
        {
            // Start from -π/2 to align the 0 index at the top (12 o'clock position)
            let angle = theta * i - Math.PI / 2;

            let pointX1 = (radius * Math.cos(angle) + center);
            let pointY1 = (radius * Math.sin(angle) + center);
            pins.push({ index: i, x: pointX1, y: pointY1, radius: 5 });
        }
        
        //generate Strings
        let strings = [];
        for (var stringDefIndex = 0; stringDefIndex < data.stringsDef.length; stringDefIndex++)
        {
            let stringDef = data.stringsDef[stringDefIndex];

            let startPin = pins[stringDef.start_pin];
            strings.push([]);
            strings[stringDefIndex].push({ x: startPin.x, y: startPin.y, color: stringDef.color });
            let nextPin = {};
            let nextPinIndex = 0;
            for (var p = 0; p < stringDef.steps; p++)
            {
                nextPinIndex = (startPin.index + parseInt(stringDef.move_right)) % data.pins_amount;
                nextPin = pins[nextPinIndex];
                strings[stringDefIndex].push({ x: nextPin.x, y: nextPin.y, color: stringDef.color });
                startPin = nextPin;
            }
        }
        data.pins = pins;
        data.strings = strings;
        setP5Data(data);
    }

    const onP5DataChange = (property, value) =>
    {
        let p5 = { ...p5Data };
        p5[property] = value;
        generate(p5);
    }

    const onP5StringDefChange = (index, property, value) =>
    {
        let p5 = { ...p5Data };
        p5.stringsDef[index][property] = value;
        generate(p5);
    }

    return (
        <div>
            <ResponsiveAppBar />
            <Spacer />
            <Container maxWidth="lg">
                <Stack spacing={3}>
                    <Typography align="center" variant="h5">
                        Editor
                    </Typography>
                    <Paper elevation={1}>
                        <div className='container'>
                            <div className='sketch'>
                                <P5Renderer data={p5Data} />
                            </div>
                        </div>
                    </Paper>
                    <Paper elevation={1}>
                        <TextField label='width' defaultValue={p5Data.width} onBlur={e => onP5DataChange('width', e.target.value)} variant="standard" />
                        <TextField label='height' defaultValue={p5Data.height} onBlur={e => onP5DataChange('height', e.target.value)} variant="standard" />
                        <TextField label='pins' defaultValue={p5Data.pins_amount} onBlur={e => onP5DataChange('pins_amount', e.target.value)} variant="standard" />
                        {p5Data && p5Data.stringsDef.map(stringDef =>
                        {
                            return (<Paper elevation={3} key={stringDef.index}>
                                <TextField label='steps' defaultValue={stringDef.steps} onBlur={e => onP5StringDefChange(stringDef.index, 'steps', e.target.value)} variant="standard" />
                                <TextField label='start pin' defaultValue={stringDef.start_pin} onBlur={e => onP5StringDefChange(stringDef.index, 'start_pin', e.target.value)} variant="standard" />
                                <TextField label='move right' defaultValue={stringDef.move_right} onBlur={e => onP5StringDefChange(stringDef.index, 'move_right', e.target.value)} variant="standard" />
                                <TextField label='color' defaultValue={stringDef.color} onBlur={e => onP5StringDefChange(stringDef.index, 'color', e.target.value)} variant="standard" />
                            </Paper>)
                        })}
                    </Paper>
                </Stack>
            </Container>
            <Spacer height={80} />
            <Footer />
        </div>
    );
}

export default Editor;
