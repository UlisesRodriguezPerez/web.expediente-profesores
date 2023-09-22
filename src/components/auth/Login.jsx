import React, { useState } from 'react';
import api from '../../api/api';
import ROUTES from '../../enums/routes';
import { useNavigate } from 'react-router-dom';
import dataService from '../../services/dataService';

export const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isAdmin = (roles) => {
        return roles.some(role => role.name === 'admin');
    };

    const handleLoginResponse = async (response) => {

        // Save/Update user data in localStorage
        const userData = response.data.data;
        console.log('userData', userData);
        if (!userData) {
            // send error message
            setErrors('Error al iniciar sesión');
            return;
        }
        localStorage.setItem('user', JSON.stringify({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            roles: userData.roles,
        }));

        // Second request to get tokens
        try {
            console.log('formData', formData);
            console.log('process.env.REACT_APP_CLIENT_ID', process.env.REACT_APP_CLIENT_ID);
            console.log('process.env.REACT_APP_CLIENT_SECRET', process.env.REACT_APP_CLIENT_SECRET);
            console.log('username', formData.email);
            console.log('password', formData.password);
            const tokenResponse = await api.post(`${process.env.REACT_APP_API_BASE_URL}/oauth/token`, {
                grant_type: 'password',
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
                username: formData.email,
                password: formData.password,
            }, {
                headers: {
                    'Authorization': undefined
                }
            });

            console.log('tokenResponse', tokenResponse);

            // Check if access_token is NOT in localStorage
            if (!localStorage.getItem('token')) {
                // parse response to JSON
                const tokenData = tokenResponse.data;

                const expires_in = tokenData.expires_in;

                // get current date and time
                const now = new Date().getTime();

                // convert expiresIn to milliseconds and add to current time
                const expirationTime = new Date(now + expires_in * 1000).toISOString(); // toISOString() to save it as a string

                // save in localStorage in unic variable
                localStorage.setItem('token', JSON.stringify({
                    access_token: tokenData.access_token,
                    refresh_token: tokenData.refresh_token,
                    expires_at: expirationTime,
                    service_id: userData.id,
                }));
            }

            // Redirect or handle after successful token storage
            const userRoles = userData.roles;
            console.log('isAdmin', isAdmin(userRoles));
            if (isAdmin(userRoles)) {
                // window.location.href = '/admin-dashboard';
                navigate('/admin-dashboard');
            } else {
                // window.location.href = '/user-dashboard';
                navigate('/user-dashboard');
            }

        } catch (error) {
            console.error('Error al obtener los tokens:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Accept: 'application/json'
                }
            };

            const response = await api.post(ROUTES.LOGIN, formData, config, {
                headers: {
                    'Authorization': undefined
                }
            });
            
            // check if don't have 401 error
            if (response.status !== 401) {
                console.log('Login successful');
                console.log(response);
                handleLoginResponse(response);
            } else {
                setErrors(response.data.errors);
            }

        } catch (err) {
            setErrors(err.response.data.errors);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
                {errors.email && <p>{errors.email[0]}</p>}

                <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                {errors.password && <p>{errors.password[0]}</p>}

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

