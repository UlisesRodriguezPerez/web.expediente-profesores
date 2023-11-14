import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import ROUTES from '../../enums/routes';
import dataService from '../../services/dataService';

export const PasswordLoss = () => {

    const [email, setEmail] = useState('');

    // para varaibles anteriores
    const navigate = useNavigate();  // Agrega esta línea
    
    const handleEmailChange = (e) => { setEmail(e.target.value); };

    const generateSixDigitCode = () => {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      
    const [verificationCode, setVerificationCode] = useState(generateSixDigitCode());

    const [formData, setFormData] = useState({
        email: '',
        token: '',
        created_at: ''
    });

    const [errors, setErrors] = useState({});

    const sendResetCode = async () => {
        try {
            const newVerificationCode = generateSixDigitCode();
            setVerificationCode(newVerificationCode);

            formData.email = email;
            formData.token = verificationCode.toString();

            // aqui el api para el password_resets
            //await dataService.createData(`${ROUTES.}`)

            navigate(`/password-reset`);

        } catch (error) {
            console.error('Error sending reset code:', error);
            // Agrega lógica adicional para manejar el error
        }
    }

    return (
        <div>
            <h2 type="auth-text">¿Olvidó su contraseña?</h2>
            <p type="auth-text">Ingrese su dirección electrónica y le </p>
            <p type="auth-text">enviaremos un código para reiniciar su contraseña.</p>
            <p type="auth-text">__________________________________________________</p>
            <p type="auth-text">Ingresa su correo:</p>
            <input 
                type="pass-loss-text" 
                id="loss_email" 
                placeholder="Correo electrónico"
                value={email}
                onChange={handleEmailChange}
            >
            </input>
            <button type="submit" onClick={sendResetCode}>Mandar</button>
            <p> </p>
            <button type="button" onClick={() => window.history.back()}>Atrás</button>
            
        </div>
    );
}