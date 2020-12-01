import uuid from 'uuid/v1'

const NoteReducer = (state, action) => {
    switch(action.type) {

        case 'addNote' : 
            return [...state, action.payload]

        case 'removeNote' : 
            return (state = state.filter(note => note.id !== action.payload.id))

        case 'editNote' :
            const currentNote = [...state]
            const array = []
            currentNote.map(note => array.push(note.id))
            const index = array.indexOf(action.payload.id)
            currentNote[index] = action.payload
            return (state = currentNote)
        
        case 'editVersion' :
        const currentVersion = [...state]
        const arr = []
        currentVersion.map(note => arr.push(note.id))
        const Index = arr.indexOf(action.payload.id)
        currentVersion[Index].version = action.payload
        return (state = currentVersion)
        
        default :
            return state
    }
}

export default NoteReducer
