import React, { useState } from 'react';
import api from '../../api/api';
import ROUTES from '../../enums/routes';
import { Link, useNavigate } from 'react-router-dom';
import dataService from '../../services/dataService';

export const PasswordLoss = () => {

    return (
        <div>
            <h2>¿Olvidó su contraseña?</h2>
            <p>Ingrese su dirección electrónica y le enviaremos un código para reiniciar su contraseña.</p>
            <label for="loss_email">Ingresa su correo:</label>
            <input type="text" id="loss_email" placeholder="Correo electrónico"></input>
            <button type="submit">Continuar</button>
            <button type="button" onclick="goBack()">Atrás</button>
        </div>
    );
}