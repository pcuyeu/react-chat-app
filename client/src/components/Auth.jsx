import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
const [form, setForm] = useState(initialState);
const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {username, password, phoneNumber, avatarURL} = form;

        // For testing locally, should be http only (not https)
        const URL = 'https://chatting-application.herokuapp.com/auth'

        // POST request (for both pages) will talk to the backend to return some data. Data 
        // will be store into the cookie.
        const { data: {token, userId, hashedPassword, fullName} } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`,{
            username, password, fullName: form.fullName, phoneNumber, avatarURL,
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        // Stores the info below into the cookie for ease of access for the entire application
        if(isSignup){
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }
        // reloads the application in order for authentication token to now exist.
        window.location.reload();
    }

    const switchMode = () => {
        // Get previous state and return a negation of it
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }
    // inputs
  return (
    <div className="auth__form-container">
        <div className = "auth__form-container_fields">
            <div className='auth__form-container_fields-content'>
                <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                <form onSubmit={handleSubmit}>
                    {isSignup &&(
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='fullName'>Full Name</label>
                            <input
                                name='fullName'
                                type='text'
                                placeholder='Full Name'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='username'>Username</label>
                            <input
                                name='username'
                                type='text'
                                placeholder='Username'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    {isSignup &&(
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='phoneNumber'>Phone Number</label>
                            <input
                                name='phoneNumber'
                                type='text'
                                placeholder='Phone Number'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    {isSignup &&(
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='avatarURL'>Avatar URL</label>
                            <input
                                name='avatarURL'
                                type='text'
                                placeholder='Avatar URL'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='password'>Password</label>
                            <input
                                name='password'
                                type='password'
                                placeholder='Password'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    {isSignup &&(
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <input
                                name='confirmPassword'
                                type='password'
                                placeholder='Confirm Password'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className='auth__form-container_fields-content_button'>
                        <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                    </div>
                </form>
                <div className='auth__form-container_fields-account'>
                    <p>
                        {isSignup ? "Already have an account?" : "Don't have an account?"}
                        <span onClick = {switchMode}>
                        {isSignup ? 'Sign In' : 'Sign Up'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div className = "auth__form-container_image">
            <img src={signinImage} alt="sign in" />
        </div>
    </div>
  )
}

export default Auth