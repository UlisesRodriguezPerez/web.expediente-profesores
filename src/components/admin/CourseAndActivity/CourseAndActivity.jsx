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

    //const [selectedTeacher, setSelectedTeacher] = useState(null);
    //const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [selectedTab, setSelectedTab] = useState('curso');
    //const [selectedCourse, setSelectedCourse] = useState(null);
    const [teacher, setTeacher] = useState('');
    const [teacherOptions, setTeacherOptions] = useState([]);
    const [period, setPeriod] = useState('');
    const [periodOptions, setPeriodOptions] = useState([]);
    const [course, setCourse] = useState('');
    const [courseOptions, setCourseOptions] = useState([]);

    const defaultTextBoxValue = `Agregar el curso ${selectedCourse ? selectedCourse.value : '[ ]'} al profesor ${selectedTeacher ? selectedTeacher.value : '[ ]'}`
    const [textBoxValue, setTextBoxValue] = useState(defaultTextBoxValue);

    //const teacherOptions = [{ value: 'profesor1', label: 'Profesor 1 profesor test' }, { value: 'profesor2', label: 'Profesor 2' }];
    //const periodOptions = [{ value: 'periodo1', label: 'Periodo 1' }, { value: 'periodo2', label: 'Periodo 2' }];
    //const courseOptions = [{ value: 'curso1', label: 'Curso 1' }, { value: 'curso2', label: 'Curso 2' }];

    const getTeacherOptions = async () => {
        try {
          const response = await dataService.readData(`${ROUTES.COLLABORATORS}`);
          console.log('Profesores', response.data.data)
          const teacherOptions = response.data.data.map(teacher => ({ value: teacher.id, label: teacher.name }));
          
          setTeacherOptions(teacherOptions);
          
    
        } catch (error) {
          console.error('Error fetching teacher options:', error);
          showNotification('error', 'Error al cargar los profesores');
        }
    }

    const getPeriodOptions = async () => {
        try {
          const response = await dataService.readData(`${ROUTES.PERIODS}`);
          console.log('Periodos', response.data.data)
          const periodOptions = response.data.data.map(period => ({ value: period.id, label: period.name }));
          
          setPeriodOptions(periodOptions);
          
    
        } catch (error) {
          console.error('Error fetching period options:', error);
          showNotification('error', 'Error al cargar los periodos');
        }
    }

    const getCourseOptions = async () => {
        try {
          const response = await dataService.readData(`${ROUTES.COURSES}`);
          console.log('Cursos', response.data.data)
          const courseOptions = response.data.data.map(course => ({ value: course.id, label: course.name }));
          
          setCourseOptions(courseOptions);
          
    
        } catch (error) {
          console.error('Error fetching courses options:', error);
          showNotification('error', 'Error al cargar los cursos');
        }
    }

    useEffect(() => {
        setTextBoxValue(`Agregar el curso ${selectedCourse ? selectedCourse.value : '[ ]'} al profesor ${selectedTeacher ? selectedTeacher.value : '[ ]'}`)
      }, [selectedCourse, selectedTeacher]);
    
    useEffect(() => {
        getTeacherOptions();
    }
    , []);

    useEffect(() => {
        getPeriodOptions();
    }
    , []);

    useEffect(() => {
        getCourseOptions();
    }
    , []);

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
                    setSelectedCourse={setCourse} 
                    textBoxValue={textBoxValue} 
                    onCancel={handleCancel} 
                    value={course}
                    data={{course, teacher, period}}
                />
        },
        {
            title: 'ACTIVIDAD',
            component: 
                <ActivityTab
                    textBoxValue={textBoxValue}
                    onCancel={handleCancel}
                    data={{teacher, period}}
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
                        onChange={(option) => setTeacher(option)}
                        label="Profesor"
                        placeholder="Profesor"
                        value={teacher}
                    />
                </div>
                <div className="filter">
                    <CustomSelect
                        options={periodOptions}
                        onChange={(option) => setPeriod(option)}
                        label="Periodo"
                        placeholder="Periodo"
                        value={period}
                    />
                </div>
            </div>
            <TabContainer selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs} />
        </div>
    );            
};


