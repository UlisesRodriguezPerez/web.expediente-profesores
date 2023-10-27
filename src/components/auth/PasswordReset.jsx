import React, { useState } from 'react';
import api from '../../api/api';
import ROUTES from '../../enums/routes';
import { Link, useNavigate } from 'react-router-dom';
import dataService from '../../services/dataService';

export const PasswordReset = () => {

    return (
        <div>
            <h2>Reinicio de contraseña</h2>
            <p>Enviamos el código a -variable del correo- </p>
            
            <input type="text" id="code" placeholder="Código"></input>
            <button type="submit">Reiniciar contraseña</button>
            <p>
                ¿No recibió el correo? 
                <Link to="/password-loss">
                    Presione para volver a enviar 
                </Link> 
            </p>

            <button type="button" onclick="goBack()">Atrás</button>
        </div>
    );
}