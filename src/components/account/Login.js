import { Form, Button, Container, Divider } from 'semantic-ui-react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import '../style/account.css'
import { useEffect, useState } from 'react'
import {  NoteState} from '../context/StateProvider'
import { Auth, Provider } from '../firebase/Config'

const Login = () => {
    const history = useHistory()

    const {user} = NoteState()

    useEffect(() => {
        if(user) {
            history.goBack()
        }
    })

    const [form, setForm] = useState({email: '', password: ''})

    const resetForm = () => setForm({email: '', password: ''})

    const getForm = (e) => {
        validateForm()
        setForm({...form, [e.target.name]: e.target.value})
    }

    const [error, setError] = useState({isError: true, email: false, password: false, msg: ''})

    const [loading, setLoading] = useState(false)

    const validateForm = () => {

        if(form.email.length === 0){
            setError({...error, email: 'All fields are reaquired.', isError: true})
        }
        else if(form.password.length === 0) {
            setError({...error, email: false, password: 'Password is required.', isError: true})
        }
        else {
            setError({isError: false, email: false, password: false})
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        await Auth.signInWithEmailAndPassword(form.email, form.password)
        .then(() => {
            resetForm()
            history.push('/')
        })
        .catch(err => {
            setLoading(false)
            if(err.message === 'The email address is badly formatted.'){
                setError({msg: 'Email is not valid'})
            }
            else if (err.message === 'There is no user record corresponding to this identifier. The user may have been deleted.'){
                setError({msg: 'User does not exist'})
            }
            else {
                setError({msg : err.message})
            }
            
        })

    }
    const googleLogin = () => {
        Auth.signInWithPopup(Provider).then(() => {
            history.goBack()
        })
    }

    return (
        <div className="login">
            <div className="signup__header">
                <h2>Tada</h2> <span>a note app that keeps track.</span>
            </div>
            <div className= 'google__signup'>
                 <Button 
                    fluid
                    content= 'Continue with Google'
                    icon= 'google'
                    iconPosition= 'left'
                    color= 'blue'
                    onClick= {googleLogin}
                 />
             </div>
             <Divider 
                horizontal
                content= 'OR'
             />
            <Form onSubmit= {handleSubmit}>
                <Form.Input
                    type= 'email' 
                    name= 'email'
                    placeholder= 'Email'
                    icon= 'at'
                    iconPosition= 'left'
                    fluid
                    onChange= {getForm}
                    value= {form.email}
                    error= {error.email}
                />
                <Form.Input 
                    type= 'password'
                    name= 'password'
                    placeholder= 'Password'
                    icon= 'lock'
                    iconPosition= 'left'
                    fluid
                    onChange= {getForm}
                    value= {form.password}
                    error= {error.password}
                />
                <Container textAlign= 'center'>
                   <Button 
                    content='Login'
                    color= 'black'
                    onClick= {handleSubmit}
                    loading= {loading}
                /> 
                </Container>
                
            </Form>
            {error.msg && <span className= 'login__err'>{error.msg}</span>}
            <div className= 'login__details'>
                <span>
                    Forgot your password? click <span><Link to= '/account/password/reset'>Here</Link></span>
                </span>
                <span>
                   <Link to= '/account/signup'>Create account.</Link>
                </span>
            </div>
            
        </div>
    )
}

export default Login