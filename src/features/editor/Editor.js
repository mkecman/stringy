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
            pins_amount: 60,
            pins: [],
            strings: [[{ x: 0, y: 0 }, { x: 10, y: 10 }]]
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
            let pointX1 = (radius * Math.cos(theta * i) + center);
            let pointY1 = (radius * Math.sin(theta * i) + center);
            pins.push({ index: i, x: pointX1, y: pointY1, radius: 5 });
        }
        
        //generate Strings
        let strings = [];
        strings.push({ x: 0, y: 0 });
        strings.push({ x: 100, y: 100 });

        data.pins = pins;
        data.strings = strings;
        setP5Data(data);
    }

    const onP5DataChange = (property, value) =>
    {
        let p5 = cloneDeep(p5Data);
        p5[property] = value;
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
                        <TextField label='width' value={p5Data.width} onChange={e => onP5DataChange('width', e.target.value)} variant="standard" />
                        <TextField label='height' value={p5Data.height} onChange={e => onP5DataChange('height', e.target.value)} variant="standard" />
                        <TextField label='pins' value={p5Data.pins_amount} onChange={e => onP5DataChange('pins_amount', e.target.value)} variant="standard" />
                    </Paper>
                </Stack>
            </Container>
            <Spacer height={80} />
            <Footer />
        </div>
    );
}

export default Editor;
