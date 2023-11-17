import React, { useContext, useState } from 'react';
import api from '../../api/api';
import ROUTES from '../../enums/routes';
import { Link, useNavigate } from 'react-router-dom';
import dataService from '../../services/dataService';
import { NotificationContext } from '../../contexts/NotificationContext/NotificationContext';
 

export const PasswordReset = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { showNotification } = useContext(NotificationContext);

    const navigate = useNavigate();

    //el usuario actual
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [newPassword, setnewPassword] = useState('');

    const handleNewPasswordChange = (e) => { setnewPassword(e.target.value); };

    const [newPasswordV, setnewPasswordV] = useState('');

    const handleNewPasswordVChange = (e) => { setnewPasswordV(e.target.value); };

    const [passwordMatchError, setPasswordMatchError] = useState('');

    const sendResetPassword = async () => {
        try {
            const response = await dataService.createData(`${ROUTES.USERS}/reset-password`, {
                user_id: currentUser.id,
                password: newPassword,
                password_confirmation: newPasswordV,
            });

            console.log('response', response);
            showNotification('success', 'Se ha cambiado la contraseña exitosamente');

            // Delete local Storage
            localStorage.removeItem('user');
            localStorage.removeItem('token');

            navigate(`/login`);

        } catch (error) {
            showNotification('error', 'Error al enviar la peticion');
        }
        setnewPassword('');
        setnewPasswordV('');
    };


    return (
        <div>
            <h2 type="auth-text">Reinicio de contraseña</h2>
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

            <button type="show" onClick={togglePasswordVisibility}>
                {showPassword ? "Ocultar Contraseña" : "Mostrar Contraseña"}
            </button>
            <p type="auth-text"> </p>
            <button type="submit" onClick={sendResetPassword}>Reiniciar contraseña</button>
            {<p type="auth-text">
                <Link to="/login">
                    Presione para volver al login
                </Link>
            </p>}
        </div>
    );
}