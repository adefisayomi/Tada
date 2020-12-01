import Home from './Home'
import {Redirect, useHistory} from 'react-router-dom'
import {NoteState} from './context/StateProvider'
import { useEffect, useState } from 'react'

const Index = () => {
    const history = useHistory()
    const {user} = NoteState()
    useEffect(() => {
        if(user === null) {
            history.push('/account/login')
        }
    }, [user])
    return (
        <>
        <Home /> 
        </>
    )
}

export default Index