import React, { useState } from 'react';
import api from '../../api/api';
import ROUTES from '../../enums/routes';
import { Link, useNavigate } from 'react-router-dom';
// import headerimage from './src/assets/images/layouts/header-tec.png';
import './estilo.css';

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
        const userData = response.data.data;

        if (!userData) {
            setErrors({ general: 'Error al iniciar sesión' });
            return;
        }

        localStorage.setItem('user', JSON.stringify({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            roles: userData.roles,
        }));

        try {
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

            if (!localStorage.getItem('token')) {
                const tokenData = tokenResponse.data;
                const expires_in = tokenData.expires_in;
                const now = new Date().getTime();
                const expirationTime = new Date(now + expires_in * 1000).toISOString();
                localStorage.setItem('token', JSON.stringify({
                    access_token: tokenData.access_token,
                    refresh_token: tokenData.refresh_token,
                    expires_at: expirationTime,
                    service_id: userData.id,
                }));
            }

            const userRoles = userData.roles;

            if (isAdmin(userRoles)) {
                navigate('/admin-dashboard');
            } else {
                navigate('/user-dashboard');
            }

        } catch (error) {
            console.error('Error al obtener los tokens:', error);
            if (error.response) {
                if (error.response.status === 401) {
                    setErrors({ password: 'Contraseña incorrecta' });
                } else {
                    setErrors(error.response.data.errors);
                }
            } else {
                setErrors({ general: 'Error al iniciar sesión' });
            }
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
            
            // Check if there is no 401 error
            if (response.status !== 401) {
                console.log('Login successful');
                console.log(response);
                handleLoginResponse(response);
            } else {
                setErrors({ general: 'Correo o contraseña incorrectos' });
            }

        } catch (err) {
            console.error('Error al realizar la solicitud:', err);
            setErrors({ general: 'Error al realizar la solicitud' });
        }
    };

    return (
        <div>
            <h2 type="auth-text">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                {errors.general && <p type="auth-text">{errors.general}</p>}
                <input type="login-email" name="email" placeholder="Email" onChange={handleInputChange} />
                {errors.email && <p type="auth-text">{errors.email[0]}</p>}

                <div>
                    <input type="login-password" name="password" placeholder="Password" onChange={handleInputChange} />
                    {errors.password && <p type="auth-text">{errors.password}</p>}
                </div>

                <p type="auth-text">
                    <Link to="/password-loss">
                        ¿Olvidó su contraseña? 
                    </Link> 
                </p>
                <button type="submit">Login</button>
                
            </form>
            
        </div>
    );
};
