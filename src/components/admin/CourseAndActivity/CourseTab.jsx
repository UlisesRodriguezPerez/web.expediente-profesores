// CourseContent.jsx
import React, { useContext } from 'react';
import { CustomSelect } from '../../../common/components/CustomSelect/CustomSelect';
import { ConfirmationBox } from '../../../common/components/ConfirmationBox/ConfirmationBox';
import './CourseTab.css';
import dataService from '../../../services/dataService';
import { NotificationContext } from '../../../contexts/NotificationContext/NotificationContext';
export const CourseTab = ({ courseOptions, setSelectedCourse, textBoxValue, onCancel, onConfirm, data }) => {
    const { showNotification } = useContext(NotificationContext);

    const handleConfirm = async () => {
        try {
            if(!data.selectedCourse || !data.selectedTeacher || !data.selectedPeriod) {
                
                showNotification('error', 'Todos los campos son requeridos.');
                return; // Not continue if any field is empty
            }
            // await dataService.createData('courendpoint', {
            //     course: data.selectedCourse.value,
            //     teacher: data.selectedTeacher.value,
            //     period: data.selectedPeriod.value
            // });
            console.log('course', data.selectedCourse);
            console.log('teacher', data.selectedTeacher.value);
            console.log('period', data.selectedPeriod.value);
            console.log('success');
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
                onChange={setSelectedCourse}
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