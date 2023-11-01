import React, { useState } from 'react';
import api from '../../api/api';
import ROUTES from '../../enums/routes';
import { Link, useNavigate } from 'react-router-dom';
import dataService from '../../services/dataService';

export const PasswordReset = () => {

    const [vCode, setVCode] = useState(0);
    const [code, setCode] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    
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

    const sendResetPassword = async () => {

        try {
            console.error('Probando el boton');
            console.error('Codigo: ', vCode);
            console.error('Email1: ', newPassword);
            console.error('Email2: ', newPasswordV);
            // aqui halamos el code de la base de datos

            if (vCode === code){
                console.error('Los codigos son iguales');
                setCodeMatchError('');
            }
            else{
                console.error('Los codigos no son iguales');
                setCodeMatchError('Los codigos no son iguales');
            }

            if (newPassword === newPasswordV){
                console.error('Las contraseñas son iguales');
                setPasswordMatchError('');
            }
            else{
                console.error('Las contraseñas no son iguales');
                setPasswordMatchError('Las contraseñas no son iguales');
            }
            //sendMail(email, verificationCode);
            // primero debo verificar que el correo exista
            // if else de la respuesta
        } catch (error) {
            console.error('Error sending password');
        }
        setVCode(0);
        setnewPassword('');
        setnewPasswordV('');
    }

    return (
        <div>
            <h2>Reinicio de contraseña</h2>
            <p>Enviamos el código a -variable del correo- </p>
            
            <input 
                type="text"
                id="code" 
                placeholder="Código"
                value={vCode}
                onChange={handleVCodeChange}
            >
            </input>
            <input 
                name="password"
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

            {passwordMatchError && <p>{passwordMatchError}</p>}
            {codeMatchError && <p>{codeMatchError}</p>}

            <button onClick={togglePasswordVisibility}>
                {showPassword ? "Ocultar Contraseña" : "Mostrar Contraseña"}
            </button>
            <p> </p>
            <button type="submit" onClick={sendResetPassword}>Reiniciar contraseña</button>
            <p>¿No recibió el correo?</p>
            <p>
                <Link to="/password-loss">
                    Presione para volver a enviar 
                </Link> 
            </p>

            <button type="button" onClick={() => window.history.back()}>Atrás</button>
        </div>
    );
}