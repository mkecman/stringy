import React from 'react';
import Sketch from 'react-p5';

function P5Renderer(props)
{
    const data = props.data;
    console.log(data);

    const setup = (p5, canvasParentRef) =>
    {
        p5.createCanvas(data.width, data.height).parent(canvasParentRef);
    }

    const draw = (p5) =>
    {
        p5.background('gray');
        p5.stroke('black')
        drawPins(p5)
        p5.stroke('red')

        for (let s = 0; s < data.strings.length; s++)
        {
            for (let p = 0; p < data.strings[s].length - 1; p++)
            {
                p5.line(data.strings[s][p].x, data.strings[s][p].y, data.strings[s][p + 1].x, data.strings[s][p + 1].y)
            }
        }
    }

    function drawPins(p5)
    {
        for (let i = 0; i < data.pins.length; i++)
        {
            p5.circle(data.pins[i].x, data.pins[i].y, data.pins[i].radius)
        }
    }

    return (
        <Sketch setup={setup} draw={draw} />
    )
}

export default P5Renderer;