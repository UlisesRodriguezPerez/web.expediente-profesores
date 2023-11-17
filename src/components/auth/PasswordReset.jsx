import React, { useState } from 'react';
import api from '../../api/api';
import ROUTES from '../../enums/routes';
import { Link, useNavigate } from 'react-router-dom';
//import { NotificationContext } from '../../../contexts/NotificationContext/NotificationContext';
import dataService from '../../services/dataService';

export const PasswordReset = () => {

    const [vCode, setVCode] = useState(0);
    const [code, setCode] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    //ocultar cosas
    const [showStats, setShowStats] = useState(false);

    //el usuario actual
    const currentUser = JSON.parse(localStorage.getItem('user'));
    
    //const { showNotification } = useContext(NotificationContext);
    
    const handleVCodeChange = (e) => { setVCode(e.target.value); };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    const [newPassword, setnewPassword] = useState('');

    const handleNewPasswordChange = (e) => { setnewPassword(e.target.value); };

    const [newPasswordV, setnewPasswordV] = useState('');

    const handleNewPasswordVChange = (e) => { setnewPasswordV(e.target.value); };

    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [codeMatchError, setCodeMatchError] = useState('');

    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => { setEmail(e.target.value); };


    const sendResetPassword = async () => { 
        try {
            console.error('Probando el boton');
            console.error('Codigo: ', vCode);
            console.error('password1: ', newPassword);
            console.error('password2: ', newPasswordV);
            console.error('Email: ', email);
            console.error('Info: ', currentUser.email)
            let response;

            const collaboratorsResponse = await dataService.readData(`${ROUTES.COLLABORATORS}?exactfilter[user.id]=${currentUser.id}&include=users`);
            console.error('User :', collaboratorsResponse.data);
    
            // Aquí deberías realizar una solicitud a la API para enviar el código de restablecimiento y la nueva contraseña
            // ...
    
            if (vCode === code) {
                console.error('Los codigos son iguales');
                setCodeMatchError('');
                if (newPassword === newPasswordV) {
                    console.error('Las contraseñas son iguales');
                    setPasswordMatchError('');
                    // aqui va el codigo de update
                    // ...
                    /*response = await dataService.updateData(`${ROUTES.USERS}/${newPassword}`, {
                        name:,
                        last_name:,
                        second_last_name:,
                        email:,
                        email_verified_at:,
                        phone:,
                        password: newPassword,
                    });*/
                    
                } else {
                    console.error('Las contraseñas no son iguales');
                    setPasswordMatchError('Las contraseñas no son iguales');
                }
            } else {
                console.error('Los codigos no son iguales');
                setCodeMatchError('Los codigos no son iguales');
            }
    
        } catch (error) {
            console.error('Error sending password:', error);
            // Aquí puedes manejar el error, mostrar una notificación, etc.
        }
        setVCode(0);
        setnewPassword('');
        setnewPasswordV('');
        setEmail('');
        
        //window.history.back();
    };
    

    return (
        <div>
            <h2 type="auth-text">Reinicio de contraseña</h2>
            {showStats && <p type="auth-text">Enviamos el código </p> }

            <input
                type="reset-email-text"
                id="email"
                placeholder="Correo"
                value={email}
                onChange={handleEmailChange}
            >
            </input>
            {showStats && <input 
                type="pass-reset-text"
                id="code" 
                placeholder="Código"
                value={vCode}
                onChange={handleVCodeChange}
            >
            </input> }
            <input 
                name="pass-reset-password"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={handleNewPasswordChange}
            >
            </input>
            <input 
                name="password-confirmation" 
                type={showPassword ? "text" : "password"}
                id="password-confirmation" 
                placeholder="Confirme contraseña"
                value={newPasswordV}
                onChange={handleNewPasswordVChange}
            >
            </input>

            {passwordMatchError && <p type="auth-text">{passwordMatchError}</p>}
            {codeMatchError && <p type="auth-text">{codeMatchError}</p>}

            <button type="show" onClick={togglePasswordVisibility}>
                {showPassword ? "Ocultar Contraseña" : "Mostrar Contraseña"}
            </button>
            <p type="auth-text"> </p>
            <button type="submit" onClick={sendResetPassword}>Reiniciar contraseña</button>
            {showStats && <p type="auth-text">¿No recibió el correo?</p> }
            {showStats && <p type="auth-text">
                <Link to="/password-loss">
                    Presione para volver a enviar 
                </Link> 
            </p>}
            {showStats && <p type="auth-text">
                <Link to="/login">
                    Presione para volver al login
                </Link> 
            </p>}
        </div>
    );
}