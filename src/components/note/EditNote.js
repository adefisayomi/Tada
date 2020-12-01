import '../style/notes.css'
import Home from '../Home'
import { Form, Container, Button } from 'semantic-ui-react'
import {NoteState} from '../context/StateProvider'
import { useEffect, useState } from 'react'
import moment from 'moment'
import uuid from 'uuid/v1'
import { useHistory } from 'react-router-dom'

const EditNote = ({match}) => {

    const history = useHistory()
    const {user, note, dispatch} = NoteState()

    useEffect(() => {
        if(user === null) {
            history.push('/account/login')
        }
    }, [user])

    useEffect(() => {
        if(note.length === 0) {
            history.push('/')
        }
    },[note])

    const [requestMode, setRequestMode] = useState('')
    
    useEffect(() => {

        if(match.path === "/edit/:id/:version") {
            setRequestMode('version')

            const edit = note.filter(note => note.id === match.params.id)
            edit.map(note => {
                setForm({
                    version: null,
                    title: note.version.title,
                    note: note.version.note,
                    date: note.version.date,
                    id: note.version.id,
                    user_id: note.version.user_id,
                    edited: true
                })
            })
      
        }
        if(match.path === "/edit/:id") {
            setRequestMode('id')
              const edit = note.filter(note => note.id === match.params.id)
                edit.map(note => {
            setForm({
                version: {
                    title: note.title,
                    note: note.note,
                    date: note.date,
                    id: note.id,
                    user_id: note.user_id,
                    edited: false
                },
                title: note.title,
                note: note.note,
                date: note.date,
                id: note.id,
                user_id: note.user_id,
                edited: true
            })
        })
        }
      
    },[match.params])

 
    // --------------------------------

    const [form, setForm] = useState({title: '', note: ''})

    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})

    const resetForm = () => setForm({title: '', note: ''})

    const clearForm = () => {
        resetForm()
        setError({isError:false})
    }
    const [error, setError] = useState({isError: false, msg: 'All fields are required'})

    const addNote = () => {
        if(requestMode === 'id') {
             dispatch({type: 'editNote', payload: {
            user_id: user.uid,
            title: form.title,
            note: form.note,
            date: moment().format("MMM Do YY"),
            edited: true,
            version: form.version,
            id: form.id
            }})
        }
        else if (requestMode === 'version') {
            dispatch({type: 'editVersion', payload: {
                user_id: user.uid,
                title: form.title,
                note: form.note,
                date: moment().format("MMM Do YY"),
                edited: true,
                version: form.version,
                id: form.id
                }})
        }
       
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // validat form
        if(form.title === '' || form.note === ''){
            setError({...error, isError: true})
        }else{
            setError({...error, isError: false})
            addNote()
            resetForm()
            history.push('/')
        }
    }

    

    return (
        <div className="editnote">
            <Home>
                
                <div className= 'home__button'>
                    <p>Editing ...</p>
                    <Button
                    content= 'create new note'
                    primary
                    onClick= { () => history.push('/')}
                />
                
                </div>
                
            <Form onSubmit= {handleSubmit}>
                <Form.Input
                    name= 'title'
                    placeholder= 'Title'
                    icon= 'pencil'
                    onChange= {getForm}
                    value= {form.title}
                    error= {error.isError ? error.msg : false}
                />
                <Form.TextArea
                    name= 'note'
                    placeholder= 'Note'
                    style= {{minHeight: 200}}
                    onChange= {getForm}
                    value= {form.note}
                    error= {error.isError ? error.msg : false}
                />
                <Container textAlign= 'center'>
                    <Button
                        content= 'Clear'
                        negative
                        onClick= {clearForm}
                    />
                    <Button
                        content= 'Save'
                        primary
                        onClick= {handleSubmit}
                    />
                </Container>
            </Form>
            </Home>
        </div>
    )
}

export default EditNote