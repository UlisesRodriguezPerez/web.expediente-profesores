// HistoricTab.jsx
import React, { useState } from 'react';
import { Table } from '../../../../../common/components/Table/Table';
import { Pagination } from '../../../../../common/components/Pagination/Pagination';
import { SearchBar } from './../../../../../common/components/SearchBar/SearchBar';
import './HistoricTab.css';

export const HistoricTab = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    // Datos falsos para visualización
    const [data, setData] = useState([
        { periodo: '2023-I', cursos: 5, actividades: 10, workload: 1.5 },
        { periodo: '2023-II', cursos: 3, actividades: 8, workload: 1.2 },
        { periodo: '2024-I', cursos: 4, actividades: 12, workload: 1.8 },
        { periodo: '2024-II', cursos: 2, actividades: 6, workload: 0.9 },
        { periodo: '2025-I', cursos: 6, actividades: 14, workload: 2.0 },
        { periodo: '2025-II', cursos: 3, actividades: 9, workload: 1.3 },
        { periodo: '2026-I', cursos: 5, actividades: 11, workload: 1.6 },
        { periodo: '2026-II', cursos: 4, actividades: 10, workload: 1.4 },
        { periodo: '2027-I', cursos: 5, actividades: 13, workload: 1.7 },
        { periodo: '2027-II', cursos: 3, actividades: 8, workload: 1.2 },
        { periodo: '2028-I', cursos: 6, actividades: 15, workload: 2.1 },
        { periodo: '2028-II', cursos: 2, actividades: 7, workload: 1.0 },
        { periodo: '2029-I', cursos: 4, actividades: 10, workload: 1.4 },
        { periodo: '2029-II', cursos: 5, actividades: 12, workload: 1.6 },
    ]);

    // mostrar el filtro
    const [showFilters, setShowFilters] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
  
    const handleFilterButtonClick = () => {
      setShowFilters(!showFilters);
    };
    // filtro
    const handleOptionChange = (event) => {
        const option = event.target.value;
        if (selectedOptions.includes(option)) {
          setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
          setSelectedOptions([...selectedOptions, option]);
        }
        handleAlertOptions();
      };
  
      const handleAlertOptions = () => {
          alert(`Opciones seleccionadas: ${selectedOptions.join(', ')}`);
        };
      // filtro

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

    const CargaHistoricaColumn = ({ row }) => (
        <div className="bar-container">
            <div
                className={`workload-bar ${row.workload > 1.5 ? 'workload-bar-red' : 'workload-bar-blue'}`}
                style={{ width: `${(row.workload / 1.5) * 100}%` }}
            />
        </div>
    );

    const columns = [
        { header: 'Periodo', render: row => <span>{row.periodo}</span> },
        { header: 'Cursos', render: row => <span>{row.cursos}</span> },
        { header: 'Actividades', render: row => <span>{row.actividades}</span> },
        { header: 'Carga', render: row => <CargaHistoricaColumn row={row} /> },
        { header: '', render: row => <span className="worload-value">{row.workload}</span>, headerClass: 'workload-header' },
    ];

    return (
        <div className="historic-tab-container">
            <div className="search-filter-container">
                <SearchBar className="search-box" value={searchTerm} onChange={handleSearchChange} placeholder={'Búsqueda'} />

                <button className="filter-button" onClick={handleFilterButtonClick}>
                    <span className="filter-lines">
                        <span className="line line-large"></span>
                        <span className="line line-medium"></span>
                        <span className="line line-small"></span>
                    </span>
                    Filtros  {/* PENDIENTE */}
                </button>

                {showFilters && (
                    <div className="filter-options">
                        <label>
                            <input
                            type="checkbox"
                            value="option1"
                            checked={selectedOptions.includes('option1')}
                            onChange={handleOptionChange}
                            />{' '}
                            Opción 1
                        </label>
                        <label>
                            <input
                            type="checkbox"
                            value="option2"
                            checked={selectedOptions.includes('option2')}
                            onChange={handleOptionChange}
                            />{' '}
                            Opción 2
                        </label>
                        {/* Agrega más opciones de filtros según lo necesites */}
                    </div>
                )}
            </div>
            <Table 
                className="historic-table" 
                columns={columns} 
                data={data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
            />
            <Pagination currentPage={currentPage} totalItems={data.length} onPageChange={handlePageChange} />
        </div>
    );
};

