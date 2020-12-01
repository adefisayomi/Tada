import { useEffect, useState } from 'react'
import { Form, Button, Container, Divider, Label, Input } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import {Auth, Storage, Provider} from '../firebase/Config'
import '../style/account.css'
import { NoteState } from '../context/StateProvider'

const Signup = () => {
    const history = useHistory()
    const {user} = NoteState()
    ;

    // useEffect(() => {
    //     if(user) {
    //         history.goBack()
    //     }
    // }, [])
    
    const [form, setForm] = useState({email: '', password: '', username: '', image: ''})

    const resetForm = () => setForm({email: '', password: '', username: '', image: ''})

    const getForm = (e) => {
        validateForm()
        setForm({...form, [e.target.name]: e.target.value})
    }

    const [error, setError] = useState({isError: true, email: false, password: false, username: false, image: false, msg: ''})

    const [loading, setLoading] = useState(false)

    const validateForm = () => {

        if(form.email.length === 0){
            setError({...error, email: 'All fields are reaquired.', isError: true})
        }
        else if(form.username.length === 0) {
            setError({...error, email: false, username: 'Username is required.', isError: true})
        }
        else if(form.password.length === 0) {
            setError({...error, email: false, username: false, password: 'Password is required.', isError: true})
        }
        else {
            setError({isError: false, email: false, password: false, username: false})
        }
    }

    const getPicture = (e) => {
        const validImageType = ['image/jpeg', 'image/png']

        const img = e.target.files[0]

        if( img && validImageType.includes(img.type)) {
            setForm({...form, image: img})
            setError({image: ''})
        }else {
            setForm({...form, image: ''})
            setError({image: 'Image type not supported.'})
        }
   
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        setLoading(true)

        await Auth.createUserWithEmailAndPassword(form.email, form.password).then(data => {
                const uploader = Storage.ref().child("Users/images/ " + data.user.uid)
                uploader.put(form.image).then(async () => {
                const imageUrl = await uploader.getDownloadURL()
                return imageUrl
            }).then((imageUrl) => {
                data.user.updateProfile({
                    displayName: form.username,
                    photoURL: imageUrl
                })
            })})
            .then(() => {
                resetForm()
                history.push('/')
            })
            .catch(err => {
                setLoading(false) 
                setError({msg: err.message})
            })
    }

    const googleSignup = () => {
        Auth.signInWithPopup(Provider).then(() => {
            history.push('/')
        })
    }
    

    return (
        <div className="signup">
            <div className="signup__header">
                <h2>Tada</h2> <span>a note app that keeps track.</span>
            </div>
            <Form onSubmit= {handleSubmit}>
                <Form.Input
                    type= 'email'
                    placeholder= 'Email'
                    fluid
                    icon= 'at'
                    name= 'email'
                    iconPosition= 'left'
                    onChange= {getForm}
                    value= {form.email}
                    error= {error.email}
                />
                <Form.Input
                    type= 'text'
                    placeholder= 'Username'
                    fluid
                    icon= 'user'
                    name= 'username'
                    iconPosition= 'left'
                    onChange= {getForm}
                    value= {form.username}
                    error= {error.username}
                />
                <Form.Input
                    type= 'password'
                    placeholder= 'Password'
                    fluid
                    icon= 'lock'
                    name= 'password'
                    iconPosition= 'left'
                    onChange= {getForm}
                    value= {form.password}
                    error= {error.password}
                />
                <Container className = 'signup__fileUpload' textAlign= 'left' >
                    <Label
                        color= {form.image ? 'grey' : 'blue'}
                        size= 'large'
                        icon=  {form.image ? 'upload' : 'camera'}
                        content= {<label for= 'imageUpload' >{form.image ? 'Profile picture selected' : 'Select a profile picture'}</label>}
                    />
                    {error.image && <p> {error.image}</p> }
                    <Input
                        type="file"
                        name="imageUpload"
                        id="imageUpload"
                        onChange = {getPicture}
                            />
                </Container>

                <Container textAlign= 'center' >
                    <Button 
                        content= 'Create account'
                        color= 'black'
                        onClick= {handleSubmit}
                        loading= {loading}
                    />
                </Container>
            </Form>
                {error.msg && <span className = 'signup__err'>{error.msg}</span> }
            
            <div className="signup__details">
                <span>
                   Already have an account? <Link to= '/account/login'>Login</Link>
                </span>
                <span>
                     I forgot my  <span><Link to= '/account/password/reset'>Password</Link></span>
                </span>
            </div>
            <Divider 
                horizontal
                content= 'OR'
             />
             <div className= 'google__signup'>
                 <Button 
                 fluid
                    content= 'Signup with Google'
                    icon= 'google'
                    iconPosition= 'left'
                    color= 'google plus'
                    onClick= {googleSignup}
                 />
             </div>
        </div>
    )
}

export default Signup