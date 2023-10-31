import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CustomSelect } from '../../../common/components/CustomSelect/CustomSelect';
import { TabContainer } from '../../../common/components/TabContainer/TabContainer';
import { CourseTab } from './CourseTab';
import { ActivityTab } from './ActivityTab';
import './CourseAndActivity.css';
// import { CourseTab } from './CourseTab';

export const CourseAndActivity = () => {

    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [selectedTab, setSelectedTab] = useState('curso');
    const [selectedCourse, setSelectedCourse] = useState(null);

    const defaultTextBoxValue = `Agregar el curso ${selectedCourse ? selectedCourse.value : '[ ]'} al profesor ${selectedTeacher ? selectedTeacher.value : '[ ]'}`
    const [textBoxValue, setTextBoxValue] = useState(defaultTextBoxValue);

    const teacherOptions = [{ value: 'profesor1', label: 'Profesor 1 profesor test' }, { value: 'profesor2', label: 'Profesor 2' }];
    const periodOptions = [{ value: 'periodo1', label: 'Periodo 1' }, { value: 'periodo2', label: 'Periodo 2' }];
    const courseOptions = [{ value: 'curso1', label: 'Curso 1' }, { value: 'curso2', label: 'Curso 2' }];

    useEffect(() => {
        setTextBoxValue(`Agregar el curso ${selectedCourse ? selectedCourse.value : '[ ]'} al profesor ${selectedTeacher ? selectedTeacher.value : '[ ]'}`)
      }, [selectedCourse, selectedTeacher]);
      

    const handleCancel = () => {
        setSelectedCourse(null);
        setSelectedTeacher(null);
        setSelectedPeriod(null);
        setTextBoxValue(defaultTextBoxValue);
    }

    const tabs = [
        {
            title: 'CURSO',
            component: 
                <CourseTab 
                    courseOptions={courseOptions} 
                    setSelectedCourse={setSelectedCourse} 
                    textBoxValue={textBoxValue} 
                    onCancel={handleCancel} 
                    value={selectedCourse}
                    data={{selectedCourse, selectedTeacher, selectedPeriod}}
                />
        },
        {
            title: 'ACTIVIDAD',
            component: 
                <ActivityTab
                    textBoxValue={textBoxValue}
                    onCancel={handleCancel}
                    data={{selectedTeacher, selectedPeriod}}
                />
        }
    ];

    return (
        <div className="assignment-container">
            <div className="title-container">
                <h2>Asignar Cursos y Actividades</h2>
            </div>
            <div className="filters-container">
                <div className="filter">
                    <CustomSelect
                        options={teacherOptions}
                        onChange={(option) => setSelectedTeacher(option)}
                        label="Profesor"
                        placeholder="Profesor"
                        value={selectedTeacher}
                    />
                </div>
                <div className="filter">
                    <CustomSelect
                        options={periodOptions}
                        onChange={(option) => setSelectedPeriod(option)}
                        label="Periodo"
                        placeholder="Periodo"
                        value={selectedPeriod}
                    />
                </div>
            </div>
            <TabContainer selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs} />
        </div>
    );            
};


