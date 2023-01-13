// https://dev.to/kalimahapps/ps4-controller-in-css-4g22

import { Component } from 'solid-js'
import './Controller.css'
import {
    DragDropProvider,
    DragDropSensors,
    DragEventHandler,
    createDraggable,
    useDragDropContext,
    Transformer,
} from '@thisbeyond/solid-dnd'
import { Transform } from '@thisbeyond/solid-dnd/dist/types/layout'

const Draggable = (props) => {
    const draggable = createDraggable(1)
    return (
        <div use:draggable class="draggable">
            {props.children}
        </div>
    )
}

const limit = 40
const ConstrainDragAxis = () => {
    const [, { onDragStart, onDragEnd, addTransformer, removeTransformer }] = useDragDropContext()

    const transformer: Transformer = {
        id: 'constrain-x-axis',
        order: 100,
        callback: (transform: Transform) => {
            let xx = transform.x
            let yy = transform.y
            if (xx > limit) {
                xx = limit
            } else if (xx < -limit) {
                xx = -limit
            }
            if (yy > limit) {
                yy = limit
            } else if (yy < -limit) {
                yy = -limit
            }
            console.log(xx, yy)
            return { x: xx - 10, y: yy }
        },
    }

    onDragStart(({ draggable }) => {
        addTransformer('draggables', draggable.id, transformer)
    })

    onDragEnd(({ draggable }) => {
        removeTransformer('draggables', draggable.id, transformer.id)
    })
    return <></>
}

const Controller: Component = () => {
    const onDragMove: DragEventHandler = ({ overlay }) => {
        if (overlay) {
            console.log(overlay)
        }
    }
    const buttonPressed = () => {
        console.log('buttonPressed')
    }
    return (
        <DragDropProvider onDragMove={onDragMove}>
            <DragDropSensors />
            <ConstrainDragAxis />
            <div>
                <p class="text-6xl text-white text-center py-10">PS4 Controller</p>
                <div class="flex justify-center">
                    <div class="PS4-dualshock">
                        <div class="inner">
                            <div class="top-buttons">
                                <span class="left"></span>
                                <span class="right"></span>
                            </div>
                            <div class="body-bottom"></div>
                            <div class="body">
                                <div class="share-btn"></div>
                                <div class="options-btn"></div>
                                <div class="screen"> </div>

                                <div class="arrows">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div class="left-joystick">
                                    <div class="inner-joystick"></div>
                                </div>

                                <div class="buttons">
                                    <span class="triangle" onClick={buttonPressed} onTouchStart={buttonPressed}></span>
                                    <span class="circle"></span>
                                    <span class="x"></span>
                                    <span class="square"></span>
                                </div>
                                <div class="right-joystick">
                                    <Draggable>
                                        <div class="inner-joystick"></div>
                                    </Draggable>
                                </div>

                                <div class="speaker">
                                    <div>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                    </div>
                                    <div>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                    </div>
                                    <div>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                    </div>
                                </div>
                                <div class="logo">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        version="1.1"
                                        id="svg41117"
                                        viewBox="0 0 200 154.81912"
                                        height="154.81912"
                                        width="200"
                                        preserveAspectRatio="xMidYMid"
                                    >
                                        <path
                                            class="cls-2"
                                            id="path-1"
                                            d="m 197.23914,117.96194 c -3.8677,4.8796 -13.34356,8.36053 -13.34356,8.36053 0,0 -70.49109,25.31994 -70.49109,25.31994 0,0 0,-18.67289 0,-18.67289 0,0 51.87665,-18.48401 51.87665,-18.48401 5.887,-2.10924 6.79096,-5.09097 2.00581,-6.65604 -4.77616,-1.56957 -13.42451,-1.11983 -19.31601,0.99841 0,0 -34.56645,12.17426 -34.56645,12.17426 0,0 0,-19.37898 0,-19.37898 0,0 1.99232,-0.6746 1.99232,-0.6746 0,0 9.98856,-3.534896 24.03371,-5.09097 14.04515,-1.547081 31.24291,0.211374 44.74389,5.32933 15.21445,4.80764 16.92793,11.89543 13.06473,16.77502 z M 120.11451,86.165853 c 0,0 0,-47.752601 0,-47.752601 0,-5.608163 -1.03439,-10.771093 -6.29626,-12.232725 -4.0296,-1.290734 -6.53012,2.45104 -6.53012,8.054706 0,0 0,119.583887 0,119.583887 0,0 -32.250314,-10.23591 -32.250314,-10.23591 0,0 0,-142.58321 0,-142.58321 13.712343,2.54549 33.689454,8.56291 44.429074,12.18326 27.31226,9.376917 36.57225,21.047482 36.57225,47.343343 0,25.630256 -15.82159,35.344478 -35.92463,25.63925 z M 15.862004,131.01768 C 0.24279269,126.6193 -2.3566614,117.45375 4.7626047,112.17389 c 6.5795883,-4.8751 17.7689333,-8.54492 17.7689333,-8.54492 0,0 46.241498,-16.442224 46.241498,-16.442224 0,0 0,18.744854 0,18.744854 0,0 -33.275709,11.90892 -33.275709,11.90892 -5.878004,2.10924 -6.781967,5.09547 -2.005807,6.66054 4.780657,1.56506 13.433512,1.11983 19.320511,-0.99391 0,0 15.961005,-5.79256 15.961005,-5.79256 0,0 0,16.77053 0,16.77053 -1.011893,0.17989 -2.140724,0.35978 -3.184104,0.53518 -15.965505,2.60845 -32.969893,1.5201 -49.726928,-4.00262 z m 171.105246,7.42508 c 2.0193,0 3.91267,0.78254 5.33832,2.22618 1.42566,1.42115 2.21269,3.31903 2.21269,5.33383 0,2.02379 -0.78703,3.91267 -2.21269,5.33383 -1.42565,1.43464 -3.31902,2.21718 -5.33832,2.21718 -2.0193,0 -3.90818,-0.78254 -5.33833,-2.21718 -1.42565,-1.42116 -2.20818,-3.31004 -2.20818,-5.33383 0,-4.16453 3.38198,-7.56001 7.54651,-7.56001 z m -6.27827,7.56001 c 0,1.6775 0.65211,3.25606 1.83941,4.43436 1.18279,1.19629 2.76585,1.8439 4.43886,1.8439 3.46743,0 6.27826,-2.81532 6.27826,-6.27826 0,-1.682 -0.64761,-3.26056 -1.8394,-4.44336 -1.1828,-1.19629 -2.76586,-1.83941 -4.43886,-1.83941 -1.67301,0 -3.25607,0.64312 -4.43886,1.83941 -1.1873,1.1828 -1.83941,2.76136 -1.83941,4.44336 z m 8.55841,-4.07008 c 0.82751,0.36428 1.24576,1.06586 1.24576,2.06427 0,0.5127 -0.10794,0.94444 -0.3283,1.28174 -0.15741,0.24285 -0.38228,0.44074 -0.63413,0.61163 0.19788,0.11694 0.37328,0.25635 0.50371,0.41826 0.17988,0.23386 0.28332,0.60713 0.29682,1.11533 0,0 0.0405,1.07486 0.0405,1.07486 0.0135,0.28783 0.0315,0.5082 0.0765,0.64312 0.045,0.19788 0.13042,0.32381 0.23835,0.36429 0,0 0.11244,0.054 0.11244,0.054 0,0 0,0.12143 0,0.12143 0,0 0,0.18439 0,0.18439 0,0 0,0.18439 0,0.18439 0,0 -0.18439,0 -0.18439,0 0,0 -1.33571,0 -1.33571,0 0,0 -0.10793,0 -0.10793,0 0,0 -0.054,-0.0944 -0.054,-0.0944 -0.045,-0.0899 -0.0764,-0.19338 -0.10793,-0.3283 -0.0225,-0.12143 -0.045,-0.3328 -0.0585,-0.65661 0,0 -0.0675,-1.33571 -0.0675,-1.33571 -0.018,-0.46322 -0.1754,-0.75105 -0.47222,-0.90396 -0.18439,-0.0854 -0.49021,-0.12592 -0.90396,-0.12592 0,0 -2.28914,0 -2.28914,0 0,0 0,3.26056 0,3.26056 0,0 0,0.18439 0,0.18439 0,0 -0.18889,0 -0.18889,0 0,0 -1.08836,0 -1.08836,0 0,0 -0.18438,0 -0.18438,0 0,0 0,-0.18439 0,-0.18439 0,0 0,-8.03672 0,-8.03672 0,0 0,-0.18439 0,-0.18439 0,0 0.18438,0 0.18438,0 0,0 3.71929,0 3.71929,0 0.63863,0 1.17381,0.0944 1.58756,0.28782 z m -4.0296,3.38648 c 0,0 2.32961,0 2.32961,0 0.46772,0 0.841,-0.0855 1.10634,-0.26084 0.24286,-0.1754 0.35979,-0.49471 0.35979,-0.95793 0,-0.5037 -0.1664,-0.83201 -0.51719,-1.0074 -0.19338,-0.0944 -0.46323,-0.14841 -0.80503,-0.14841 0,0 -2.47352,0 -2.47352,0 0,0 0,2.37458 0,2.37458 z"
                                        />
                                    </svg>
                                </div>
                                <div class="handles">
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DragDropProvider>
    )
}

export default Controller
