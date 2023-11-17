// CourseContent.jsx
import React, { useContext } from 'react';
import { CustomSelect } from '../../../common/components/CustomSelect/CustomSelect';
import { ConfirmationBox } from '../../../common/components/ConfirmationBox/ConfirmationBox';
import './CourseTab.css';
import dataService from '../../../services/dataService';
import ROUTES from '../../../enums/routes';
import { NotificationContext } from '../../../contexts/NotificationContext/NotificationContext';
export const CourseTab = ({ courseOptions, setCourse, textBoxValue, onCancel, onConfirm, data }) => {
    const { showNotification } = useContext(NotificationContext);

    const handleConfirm = async () => {
        try {
            if(!data.course || !data.teacher || !data.period) {
                
                showNotification('error', 'Todos los campos son requeridos.');
                return;
            }
            const response = await dataService.createData(ROUTES.COLLABORATOR_COURSE_PERIOD, { //RUTA NO EXISTE
                course: courseOptions,
                teacher: teacher,
                period: period
            });

            setCourse('');
            
            showNotification('success', 'Curso asignado exitosamente (pendiente guardar en DB)');
        } catch (error) {
            console.error('error');
            showNotification('error', 'Error al asignar el curso');
        }
    }


    return (
        <div className='course-tab-container'>
        <div className="course-selection">
            <CustomSelect
                options={courseOptions}
                onChange={setCourse}
                label="Curso"
                placeholder="Cursos"
            />
            <ConfirmationBox
                text={textBoxValue}
                onConfirm={handleConfirm}
                onCancel={onCancel}
            />
        </div>
    </div>
    );

};