import { Button, Form, Container, Confirm } from 'semantic-ui-react'
import {NoteState} from '../context/StateProvider'
import moment from 'moment'
import uuid from 'uuid/v1'
import { useState } from 'react'
import '../style/notes.css'
import { useHistory } from 'react-router-dom'



export const SingleNote = ({title, date, id, action, edited, version}) => {
    const history = useHistory()

    const {dispatch, note, user} = NoteState()

    const removeNote = () => { dispatch({type: 'removeNote', payload: {id}}) }

    const [confirm, setConfirm] = useState(false)
    const openConfirm = () => setConfirm(true)
    const closeConfirm = () => setConfirm(false)

    const handleDeleteNote = () => {
        removeNote()
        closeConfirm()
    }
    const handleEdit = () => {
        action()
        history.push(`/edit/${id}`)
    }
   

    return (
        <>
        <div className="singlenote">

            <div className= 'singlenote__placeholder' onClick= {handleEdit}>
                <span>
                    {title.length <= 15 ? title : (title.slice(0, 15) + '...')}
                </span>
                
                <span> {date} </span>
            </div>
            <Button 
                icon= 'cancel'
                negative
                onClick= {openConfirm}
            />
            <Confirm
                header='Confirm delete'
                content= 'Are you sure you want to delete this note'
                open={confirm}
                onCancel={closeConfirm}
                onConfirm= {handleDeleteNote}
                size='mini'
                />
           
        </div>
        {edited && <div className="singlenote__version">
                        <span  onClick= {() => history.push(`/edit/${id}/${version.id}`)}>
                            v1
                        </span>
                    </div>}
            
        </>
    )
}

export const NoteForm = ({closeNote}) => {

    const {dispatch, note, user} = NoteState()

    const [form, setForm] = useState({title: '', note: ''})

    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})

    const resetForm = () => setForm({title: '', note: ''})

    const clearForm = () => {
        resetForm()
        setError({isError:false})
    }

    const [error, setError] = useState({isError: false, msg: 'All fields are required'})

    const addNote = () => {
        dispatch({type: 'addNote', payload: {
                user_id: user.uid,
                title: form.title,
                note: form.note,
                date: moment().format("MMM Do YY"),
                edited: false,
                version: [],
                id: uuid()
            }})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // validat form
        if(form.title === '' || form.note === ''){
            setError({...error, isError: true})
        }else{
            setError({...error, isError: false})
            addNote()
            closeNote()
            resetForm()
        }
    }
    
    return (
        <div className="noteform">
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
        </div>
    )
}
