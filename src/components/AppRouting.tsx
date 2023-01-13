import { Component } from 'solid-js'
import { Route, Routes } from '@solidjs/router'

import Welcome from '../pages/Welcome'
import Api from '../pages/Api'
import Oopsie from '../pages/Oopsie'
import Controller from '../pages/Controller'

const AppRouting: Component = () => {
    return (
        <Routes>
            <Route path="/" component={Welcome} />
            <Route path="/api" component={Api} />
            <Route path="/controller" component={Controller} />
            <Route path="*" component={Oopsie} />
        </Routes>
    )
}

export default AppRouting
