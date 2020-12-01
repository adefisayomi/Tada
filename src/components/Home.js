import { Input, Button, Container, Label } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { NoteState } from './context/StateProvider'
import {NoteForm, SingleNote} from './note/Note'
import { Auth } from './firebase/Config'
import './style/home.css'
import { Fragment, useState, useEffect } from 'react'

const Home = ({children}) => {
    const history = useHistory()

    const {user, note} = NoteState()
    const [sample, setSample] = useState({username: '', image: null})

    // update user info
    const updateUser = () => {
        if(user) {
            if (user.displayName === null) {
                    setSample({username: 'Pal', image: null})
                }
                if (user.photoURL === null && user.displayName) {

                    const sampleImage = user ? user.displayName.split('').shift().toUpperCase() : 'User'

                    setSample({username: user.displayName, image: sampleImage})
                }
            }
        else {
            history.push('/')
        }
            }

    useEffect(() => {
        updateUser()
    }, [user])

    //setTimeout(() => updateUser(), 2000)


    const [addnote, setAddnote] = useState({form: '', button: ''})
    const openNote = () => {
        history.push('/')
        setAddnote({form: 'add__note', button: 'close__notepad'})
    }
    const closeNote = () => setAddnote('')

    // serach function section
    const [form, setForm] = useState('')

    const [showSearch, setShowSearch] = useState('none')

    const getInput = (e) => {
        setForm(e.target.value)
    }

    const [searchNote, setSearchNote] = useState([])

    const doOpenSearch = () => setShowSearch('')

    const doCloseSearch = () => setShowSearch('none')

    const doSearch = () => {

        if(form.length > 0 ) {
            doOpenSearch()
            // -------------
           const array = []
           const query = form.toLowerCase().split('')
           const filterd = note.filter(note => {
               
               return query.some(item => note.title.split('').includes(item))
            
           })
           setSearchNote(filterd)
        }
        else{
            doCloseSearch()
        }

    }
    useEffect(() => {
        doSearch()
    }, [form])

    return (
        <div className="home" onClick= {doCloseSearch}>
            <div className="home__header">
                <div className="home__profile">
                {user && user.photoURL ? 
                    <span className= 'home__picture'>
                        <img 
                            src= {user && user.photoURL}
                            alt="Profile picture" 
                            accepts="image/*"
                        />
                        <p>Welcome  {user && user.displayName}</p>
                    </span>
                    
                    : 
                    <span className= 'home__picture'>
                        <div  className= 'namePlaceholder'>
                            <p>{sample.image}</p>
                        </div> 
                        <p>Welcome  {user && sample.username}</p>
                    </span> 
                    }
                    
                    <span className= 'home__modalButton'>
                        <Container>
                            <Button 
                                content= 'Note'
                                icon= 'pencil'
                                primary
                                onClick= {openNote}
                            />
                        </Container>
                    </span>
                </div>
                <div className="home__nav">
                    <div className= 'home__searchBar'>
                        <Input
                            placeholder= 'Search notes...'
                            icon= 'search'
                            iconPosition= 'right'
                            fluid
                            value= {form}
                            onChange= {getInput}
                        />
                    </div>
                    {/* search box------------------------- */}
                    <div className="searchBox" style= {{display: showSearch}}>
                        {note.length === 0 ? <p>Note pad is empty</p> : searchNote.map(note => (
                            <span onClick= {() =>{
                                openNote()
                                doCloseSearch()
                                history.push(`/edit/${note.id}`)
                                }
                                }
                                >{note.title}</span>
                        ))}
                        
                    </div>
                    <div className= 'home__loginButton'>
                        {user ? <Button
                                    content= 'Logout'
                                    color= 'black'
                                    onClick= {() => Auth.signOut()}
                                    />:
                                 <Button
                                    content= 'Login'
                                    color= 'black'
                                    onClick= {() => history.push('/account/login')}
                                    />
                        }
                        
                    </div>
                </div>
            </div>
            {/* body section ---------------------------- */}

            <div className="home__body">
                <div className=  {`home__aside ${addnote.form}`}>
                    {children ? children : <NoteForm
                            closeNote= {closeNote}
                        />}
                        
                        <div className= {`close__notepadButton ${addnote.button}`}>
                            <Button 
                                content= 'Close Note-Pad'
                                color= 'blue'
                                onClick= {closeNote}
                            />
                        </div>
                        
                    
                </div>
                <div className="home__main">
                    {note.length > 0 ? 
                        <Fragment>
                            {note.map(note => (
                                <SingleNote
                                    title= {note.title}
                                    date= {note.date}
                                    key= {note.id}
                                    id= {note.id}
                                    action= {openNote}
                                    edited= {note.edited}
                                    version= {note.version}
                                />
                            ))}
                        </Fragment> : 
                        <Fragment>
                            <p>
                                Start taking note...
                            </p>
                        </Fragment>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home