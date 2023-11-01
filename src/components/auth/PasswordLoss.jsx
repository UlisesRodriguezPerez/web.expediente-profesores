import React, { useState } from 'react';
import api from '../../api/api';
import ROUTES from '../../enums/routes';
import { Link, useNavigate } from 'react-router-dom';
import dataService from '../../services/dataService';

export const PasswordLoss = () => {

    const [email, setEmail] = useState('');
    
    const handleEmailChange = (e) => { setEmail(e.target.value); };

    const generateSixDigitCode = () => {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      
    const [verificationCode, setVerificationCode] = useState(generateSixDigitCode());

    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey('TU_API_KEY_DE_SENDGRID');

    const sendMail = async (D_email, V_code) => {
        const msg = {
            to: D_email,
            from: 'tu_email@tudominio.com', // Debe ser un email verificado en SendGrid
            subject: 'Código de restablecimiento de contraseña',
            text: `Tu código de verificación es: ${V_code}`,
            html: `<strong>Tu código de verificación es:</strong> ${V_code}`
        };
        
        try {
            await sgMail.send(msg);
            console.log('Email sendig');
        } catch (error) {
            console.error('Error to sending the email', error);
        }
    };
    */

    const sendResetCode = async () => {

        try {
            setVerificationCode(generateSixDigitCode());
            console.error('Probando el boton');
            console.error('Email: ', email);
            console.error('Codigo: ', verificationCode);
            //sendMail(email, verificationCode);
            // primero debo verificar que el correo exista
            // if else de la respuesta
        } catch (error) {
            console.error('Error sending message');
        }
    }

    return (
        <div>
            <h2>¿Olvidó su contraseña?</h2>
            <p>Ingrese su dirección electrónica y le </p>
            <p>enviaremos un código para reiniciar su contraseña.</p>
            <p>__________________________________________________</p>
            <p>Ingresa su correo:</p>
            <input 
                type="text" 
                id="loss_email" 
                placeholder="Correo electrónico"
                value={email}
                onChange={handleEmailChange}
            >
            </input>
            <button type="submit" onClick={sendResetCode}>Continuar</button>
            <p> </p>
            <button type="button" onClick={() => window.history.back()}>Atrás</button>
        </div>
    );
}