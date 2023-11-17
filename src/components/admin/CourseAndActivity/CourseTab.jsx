// CourseContent.jsx
import React, { useContext } from 'react';
import { CustomSelect } from '../../../common/components/CustomSelect/CustomSelect';
import { ConfirmationBox } from '../../../common/components/ConfirmationBox/ConfirmationBox';
import './CourseTab.css';
import dataService from '../../../services/dataService';
import ROUTES from '../../../enums/routes';
import { NotificationContext } from '../../../contexts/NotificationContext/NotificationContext';
export const CourseTab = ({ courseOptions, setSelectedCourse, textBoxValue, onCancel, onConfirm, data }) => {
    const { showNotification } = useContext(NotificationContext);


    // const [course, setCourse] = useState('');
    const handleConfirm = async () => {
        try {
            if(!data.course || !data.teacher || !data.period) {
                
                showNotification('error', 'Todos los campos son requeridos.');
                return;
            }
            const response = await dataService.createData(`${ROUTES.COLLABORATORS}/${data.teacher.value}/assign-course` ,{
                course_id: data.course.value,
                period_id: data.period.value
            });

            console.log('response', response);

            setSelectedCourse('');
            
            showNotification('success', 'Curso asignado exitosamente');
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
                onChange= { (option) => setSelectedCourse(option) }
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