import React, { useState } from 'react';
import { Table } from '../../../common/components/Table/Table';
import { Pagination } from '../../../common/components/Pagination/Pagination';
import { SearchBar } from './../../../common/components/SearchBar/SearchBar';
import './CoursesComponent.css';

export const CoursesComponent = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    // Datos falsos para visualización
    const [data, setData] = useState([
        { nombre: 'Curso 01', periodo: '2023-II' },
        { nombre: 'Curso 02', periodo: '2023-I' },
        { nombre: 'Curso 03', periodo: '2023-II' },
        { nombre: 'Curso 04', periodo: '2023-I' },
        { nombre: 'Curso 05', periodo: '2023-II' },
        { nombre: 'Curso 06', periodo: '2023-I' },
        { nombre: 'Curso 07', periodo: '2023-II' },
        { nombre: 'Curso 08', periodo: '2023-II' },
        { nombre: 'Curso 09', periodo: '2023-I' },
        { nombre: 'Curso 10', periodo: '2023-II' },
        { nombre: 'Curso 11', periodo: '2023-II' },
        { nombre: 'Curso 12', periodo: '2023-I' },
        { nombre: 'Curso 13', periodo: '2023-II' },
    ]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setDebouncedSearchTerm(event.target.value);
    };

    const handlePageChange = (pageNumber) => {
        
        if (pageNumber === 'next'){
            setCurrentPage(currentPage + 1);
            alert(`Page +1`);
        }
        else if(pageNumber === 'prev'){
            if(currentPage > 0) {
                setCurrentPage(currentPage + -1);
                alert(`Page -1`);
            }
            
        }
        
        //setCurrentPage(pageNumber);
        // Actualizar datos basados en la nueva página
    };

    const columns = [
        { header: 'Nombre', render: row => <span>{row.nombre}</span> },
        { header: 'Periodo', render: row => <span>{row.periodo}</span> },   
    ];

    return (
        <div className="courses-tab-container">
            <div className="courses-header-container">
                <h2>Mis Cursos</h2>
            </div>
            <Table 
                className="courses-table" 
                columns={columns} 
                data={data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
            />
            <Pagination currentPage={currentPage} totalItems={data.length} onPageChange={handlePageChange} className='width-95' />
        </div>
    );
};