import type { Component } from 'solid-js'

import robot from '../assets/adabot.png'

const Welcome: Component = () => {
    return (
        <div>
            <p class="text-6xl text-white text-center py-20">Hello User!</p>
            <div class="flex justify-center">
                <img src={robot} class="w-80 h-80 animate-spin" />
            </div>
        </div>
    )
}

export default Welcome
