import React, { useContext, useEffect, useState } from 'react';
import useCourses from './hooks/useCourses';
import { SearchBar } from '../../../common/components/SearchBar/SearchBar';
import { Table } from '../../../common/components/Table/Table';
import { Pagination } from '../../../common/components/Pagination/Pagination';

import './CoursesComponent.css';
import { CustomSelect } from '../../../common/components/CustomSelect/CustomSelect';
import { NotificationContext } from '../../../contexts/NotificationContext/NotificationContext';
import dataService from '../../../services/dataService';
import ROUTES from '../../../enums/routes';
import usePagination from '../../../hooks/usePagination';
import { set } from 'date-fns';

const PAGE_SIZE = 10;

export const CoursesComponent = () => {


    const { currentPage,
        setCurrentPage,
        totalItems,
        setTotalItems,
        handlePageChange} = usePagination();

    const { showNotification } = useContext(NotificationContext);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courses, setCourses] = useState([]);
    // const [courseOptions, setCourseOptions] = useState([]);
    const [allCourses, setAllCourses] = useState([]);


    const handleSearchChange = (option) => {
        setSelectedCourse(option)
    };

    const fetchAllCourses = async () => {
        try {
            const response = await dataService.readData(`${ROUTES.COURSES}?included=periods`);

            setAllCourses(response.data.data);
        } catch (error) {
            console.error('Error fetching all courses:', error);
            showNotification('error', 'Error al cargar todos los cursos');
        }
    };

    useEffect(() => {
        fetchAllCourses();
    }, []);

    const courseOptions = [
        { value: null, label: "Todos" }, // Opción para resetear la selección
        ...allCourses.map(course => ({
            value: course.id,
            label: course.name 
        }))
    ];

    const transformAndCountItems = (courses) => {
        // return courses.flatMap(course => 
        //     course.periods.map(period => ({
        //         ...course,
        //         period
        //     }))
        // );

        const transformedCourses   = courses.flatMap(course => 
            course.periods.map(period => ({
                ...course,
                period
            }))
        );

        // setTotalItems(transformedCourses.length);
        console.log('transformedCourses.length:', transformedCourses.length)
        return {
            transformedCourses,
            totalItems: transformedCourses.length
        };
        
    };

    const getCurrentPageData =(transformedCourses, currentPage) => {
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        return transformedCourses.slice(startIndex, startIndex + PAGE_SIZE);
    }

    const fetchCourses = async () => {
        try {
            const filterQuery = selectedCourse?.value ? `&exactfilter[id]=${selectedCourse.value}` : '';
            const response = await dataService.readData(`${ROUTES.COURSES}?included=periods&perPage=10&page=${currentPage}${filterQuery}`);
            const { transformedCourses, totalItems } = transformAndCountItems(response.data.data);
            setTotalItems(totalItems);

            // setCourses(transformedCourses);
            setCourses(getCurrentPageData(transformedCourses, currentPage));

        } catch (error) {
            console.error('Error fetching courses:', error);
            showNotification('error', 'Error al cargar los cursos');
        }
    }
    
    useEffect(() => {
        if (courses.length > 0) {
            const { transformedCourses, totalItems } = transformAndCountItems(courses);
            console.log('totalItems:', totalItems);
            setCourses(getCurrentPageData(transformedCourses, currentPage));
        }
    }, [currentPage]);

    useEffect(() => {
        fetchCourses();
        setCurrentPage(1);
    }, [selectedCourse]);

    useEffect(() => {
        fetchCourses();
    }
    , []);



    const CourseColumn = ({ row }) => row.name;

    const PeriodColumn = ({ row }) => {    
        if (!row.period) {
            return <span>No period data</span>;
        }
    
        return `${row.period.name} (${row.period.start_date} - ${row.period.end_date})`;
    };

    const columns = [
        { header: 'Curso', render: row => <CourseColumn row={row} /> },
        { header: 'Periodo', render: row => <PeriodColumn row={row} /> },
    ];



    return (
        <div className="semester-workload-container">
            <h1>Mis Cursos</h1>

            <div className="box-container">
                <div className="header-container">
                    <div className="search-filter-container-user">
                    <CustomSelect
                        options={courseOptions}
                        onChange={(option) => handleSearchChange(option)}
                        placeholder="Curso"
                        value={selectedCourse}
                    />
                    </div>
                </div>

                <Table className="records-table" columns={columns} data={courses} />

                <Pagination currentPage={currentPage} totalItems={totalItems} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export default CoursesComponent;
