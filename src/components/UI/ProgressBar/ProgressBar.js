import React from "react";
import './ProgressBar.scss';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// const value = 10;

const ProgressBar = (props) => {
    let { percentageNo, status, className, classNameText, value, trailColor, pathColor, maxValue } = props;

    return (

        <CircularProgressbarWithChildren
            value={value}
            maxValue={maxValue}
            className='customProgressBar'
            strokeWidth='12'
            styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0,
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'round',
                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,
                // Colors
                trailColor: trailColor,
                pathColor: pathColor,
            })}
        >
            <div className='textStyle'>
                <p className={className}>{percentageNo}</p>
                <p className={classNameText}>{status}</p>
            </div>
        </CircularProgressbarWithChildren>

    )
}



export default ProgressBar;