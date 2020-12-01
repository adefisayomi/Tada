
import { useState, useContext, createContext, useReducer, useEffect } from 'react'
import NoteReducer from './reducers/NoteReducer'
import {Auth, DB, Storage} from '../firebase/Config'

const NoteContext = createContext()

const StateProvider = ({children}) => {
   
    // user state
    const [user, setUser] = useState(null)

// ------------------------------------------------------------------------

// monitor user state
    useEffect(() => {
        // const currenUser = null
        // console.log(currenUser)
        Auth.onAuthStateChanged(user => {
            if(user) {
                setUser(user)
            }
            else {
                setUser(null)
            }
        })
    }, [user])
// -------------------------------------------------------------------------

  const [note, dispatch] = useReducer(NoteReducer, [], () => {
      const initialNote = localStorage.getItem('Notes')
      return ( initialNote ? JSON.parse(initialNote) : [])
  })

    useEffect(() => {
        localStorage.setItem('Notes', JSON.stringify([...note]))
    }, [note])
  

    return (
        <NoteContext.Provider value = {{ note, user, dispatch }}>
            {children}
        </NoteContext.Provider>
    )
}

export default StateProvider

export const NoteState = () => useContext(NoteContext)