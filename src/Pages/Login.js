import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// APIs
import { isAuthenticated, login } from '../APIs/authAPIs';
import Swal from  'sweetalert2';

function Login() {

    const [passwordSeen, setPasswordSeen] = useState(true);
    const [user, setUser] = useState();
    const [password, setPassword] = useState();
    const InvalidToast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    useEffect(() => {
        if(isAuthenticated()) {
            window.location.href='/task-view';
        }
    }, [])

    const setPasswordVisibility = () => {
        setPasswordSeen(!passwordSeen);
    }

    const userLogin = async () => {

        const success = await login(user, password);
        console.log(success)
        if (!success) {
            InvalidToast.fire({
                icon: 'error',
                title: 'Invalid Credentials!'
            })
        }
        else {
            window.location.href='/task-view'
        };
    }

    return (
        <>
        <div style={{ marginTop: '100px', fontFamily: 'Poppins', color: '#333333' }} className='form-div position-relative font'>
            <h2 style={{textAlign: 'center', color: 'black'}}>Login</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" className="custom-field" onChange={(e) => {setUser(e.target.value);}} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type={passwordSeen ? 'password' : 'text' } placeholder="Enter Password" className="custom-field" onChange={(e) => {setPassword(e.target.value);}} />
                    <div className="float-right password-icon">
                        <i onClick={setPasswordVisibility} className="float-right"><FontAwesomeIcon icon={passwordSeen ? faEye : faEyeSlash} /></i>
                    </div>
                </Form.Group>
                <Button onClick={userLogin} className="btn btn-primary">Login</Button>
            </Form>
        </div>
        </>
    )
}

export default Login