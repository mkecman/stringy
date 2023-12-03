import * as React from 'react';

export default function Spacer(props)
{
    let newHeight = 20;
    if (props.height != undefined)
        newHeight = props.height;

    return (
        <div style={{width:20, height:newHeight}} ></div>
    );
}