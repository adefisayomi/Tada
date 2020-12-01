import { useState} from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Form, Button, Container } from 'semantic-ui-react'
import {Auth} from '../firebase/Config'
import '../style/account.css'

const ResetPassword = () => {

    const history = useHistory()

    const [form, setForm] = useState({email: ''})

    const resetForm = (e) => setForm({email: ''})

    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState({isError: false, msg: '', email: false})

    const [confirm, setConfirm] = useState({form: '', confirm: 'none'})

    const confirmSubmit = () => setConfirm({form: 'none', confirm: ''})

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        if(form.email === '') {
            setLoading(false)
            setError({...error, isError: true, email: 'Email is required.'})
        }else {
            setLoading(true)
            setError({isError: false})
                Auth.sendPasswordResetEmail(form.email).then(() => {
                   //resetForm() 
                   confirmSubmit()
                   setLoading(false)
                }).catch (err => {
                    if(err.message === 'There is no user record corresponding to this identifier. The user may have been deleted.'){
                        setLoading(false)
                        setError({msg: 'This email is not registerd on this app.'})
                    }else{
                        setLoading(false)
                    setError({msg: err.message})
                    }
                })
            
        }

    }

    return (
        <div className="password">
            <div className="signup__header">
                <h2>Tada</h2> <span>a note app that keeps track.</span>
            </div>
            <Form onSubmit= {handleSubmit}  style= {{display: confirm.form}}>
                <Form.Input
                    type= 'email'
                    placeholder= 'Enter your valid email address'
                    icon= 'at'
                    iconPosition= 'right'
                    fluid
                    name= 'email'
                    onChange= {getForm}
                    error= {error.email}
                />
                <Container textAlign= 'center'>
                    <Button
                        content= 'Reset Password'
                        color= 'black'
                        onClick= {handleSubmit}
                        loading= {loading}
                    />
                </Container>
            </Form>
                {error.msg && <span className= 'password__err'>{error.msg}</span>}
            <div className= {`password__confirm`} style= {{display: confirm.confirm}}>
                <p>We sent a password reset link to your email @</p>
                    <span>{form.email}</span>
                    <p>Go to your inbox and confirm password reset</p>
            </div>
        </div>
    )
}

export default ResetPassword