import React, { useState } from 'react';
import api from '../../api/api';
import ROUTES from '../../enums/routes';


export const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        second_last_name: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post(ROUTES.REGISTER, formData);
            // Redirect or handle after successful register
        } catch (err) {
            setErrors(err.response.data.errors);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="register-text" name="name" placeholder="Name" onChange={handleInputChange} />
                {errors.name && <p>{errors.name[0]}</p>}

                <input type="register-text" name="last_name" placeholder="Last Name" onChange={handleInputChange} />
                {errors.last_name && <p>{errors.last_name[0]}</p>}

                <input type="register-text" name="second_last_name" placeholder="Second Last Name" onChange={handleInputChange} />
                {errors.second_last_name && <p>{errors.second_last_name[0]}</p>}

                <input type="register-text" name="phone" placeholder="Phone" onChange={handleInputChange} />
                {errors.phone && <p>{errors.phone[0]}</p>}

                <input type="register-text" name="email" placeholder="Email" onChange={handleInputChange} />
                {errors.email && <p>{errors.email[0]}</p>}

                <input type="register-text" name="password" placeholder="Password" onChange={handleInputChange} />
                {errors.password && <p>{errors.password[0]}</p>}

                <input type="register-text" name="password_confirmation" placeholder="Confirm Password" onChange={handleInputChange} />
                {errors.password_confirmation && <p>{errors.password_confirmation[0]}</p>}

                <button type="submit">Register</button>
            </form>
        </div>
    );
}
