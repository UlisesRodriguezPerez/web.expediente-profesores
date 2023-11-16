import React, { createContext, useState, useEffect, useContext } from 'react';
import dataService from '../services/dataService';
import ROUTES from '../enums/routes';
import { NotificationContext } from './NotificationContext/NotificationContext';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [campuses, setCampuses] = useState([]);
    const [academicDegrees, setAcademicDegrees] = useState([]);
    const [appointmentTypes, setAppointmentTypes] = useState([]);
    const [tecCategories, setTecCategories] = useState([]);
    const [positions, setPositions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);

    const { showNotification } = useContext(NotificationContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Promise.all([
                    dataService.readData(ROUTES.CAMPUSES),
                    dataService.readData(ROUTES.ACADEMIC_DEGREES),
                    dataService.readData(ROUTES.APPOINTMENT_TYPES),
                    dataService.readData(ROUTES.TEC_CATEGORIES),
                    dataService.readData(ROUTES.POSITIONS),
                    dataService.readData(ROUTES.ROLES),
                ]);
                
                setCampuses(data[0].data.data);
                setAcademicDegrees(data[1].data.data);
                setAppointmentTypes(data[2].data.data);
                setTecCategories(data[3].data.data);
                setPositions(data[4].data.data);
                setRoles(data[5].data.data);
            } catch (error) {
                setError(error);
                showNotification('error', 'Error al cargar los datos');
            }
        };

        fetchData();
    }, []);

    const contextValue = {
        campuses,
        academicDegrees,
        appointmentTypes,
        tecCategories,
        positions,
        roles,
    };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
