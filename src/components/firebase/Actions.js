import { DB } from './Config'
import {NoteState} from '../context/StateProvider'
import moment from 'moment'
import uuid from 'uuid/v1'


export const doSaveNote = async (form) => {
    const {user} = NoteState()

    const note = {
        note: form.note,
        title: form.title,
        date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        id: uuid()
    }

    const data = await DB.collection('Users').doc(user.uid).collection('Notes')
                .doc(note.title).set(note)
    if(data){
        return data
    }

}