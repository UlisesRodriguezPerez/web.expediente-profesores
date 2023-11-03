import React, { useContext, useState } from 'react';
import { SearchBar } from '../../../../../common/components/SearchBar/SearchBar';
import { Table } from '../../../../../common/components/Table/Table';
import { Pagination } from '../../../../../common/components/Pagination/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faFileExport, faPlus } from '@fortawesome/free-solid-svg-icons';
import dataService from '../../../../../services/dataService';
import { NotificationContext } from '../../../../../contexts/NotificationContext/NotificationContext';
import './ListingTab.css';

export const ListingTab = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const { showNotification } = useContext(NotificationContext);
    const [selectedRows, setSelectedRows] = useState(new Set());


    const [data, setData] = useState([
        { id: 1, name: 'Juan', campus: 'Campus 1', grade: '1', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 2, name: 'Pedro', campus: 'Campus 2', grade: '2', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 3, name: 'Luis', campus: 'Campus 3', grade: '3', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 4, name: 'Carlos', campus: 'Campus 4', grade: '4', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 5, name: 'Juan', campus: 'Campus 1', grade: '1', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 6, name: 'Pedro', campus: 'Campus 2', grade: '2', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 7, name: 'Luis', campus: 'Campus 3', grade: '3', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 8, name: 'Carlos', campus: 'Campus 4', grade: '4', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 9, name: 'Juan', campus: 'Campus 1', grade: '1', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 10, name: 'Pedro', campus: 'Campus 2', grade: '2', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 11, name: 'Luis', campus: 'Campus 3', grade: '3', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 12, name: 'Carlos', campus: 'Campus 4', grade: '4', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 12, name: 'Juan', campus: 'Campus 1', grade: '1', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 14, name: 'Pedro', campus: 'Campus 2', grade: '2', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 15, name: 'Luis', campus: 'Campus 3', grade: '3', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 16, name: 'Carlos', campus: 'Campus 4', grade: '4', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 17, name: 'Juan', campus: 'Campus 1', grade: '1', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 18, name: 'Pedro', campus: 'Campus 2', grade: '2', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 19, name: 'Luis', campus: 'Campus 3', grade: '3', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 20, name: 'Carlos', campus: 'Campus 4', grade: '4', appoinmentType: 'Planta', position: 'Profesor' },
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

    const handleExportButton = () => {
        alert(`Acciones para el boton de exportar`);
    };

    const handleAddButton = () => {
        alert(`Acciones para el boton de anadir`);
    };

    const handleDeleteButton= () => {
        alert(`Acciones para el boton de borrar`);
    };

    const handleRowSelect = (id) => {
        const newSelectedRows = new Set(selectedRows);
        if (newSelectedRows.has(id)) {
            newSelectedRows.delete(id);
        } else {
            newSelectedRows.add(id);
        }
        setSelectedRows(newSelectedRows);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (event) => {

    };

    const handleEditClick = (workloadId, workloadValue) => {

    };

    const handleRemoveClick = async (workloadId) => {
    };

    const ActionColumn = ({ row, editingWorkloadId, handleSaveWorkload, handleEditClick }) => (
        <div>
            {editingWorkloadId === row.id 
                ? (<button onClick={() => handleSaveWorkload(row.id, row.collaborator.id, row.period.id)} className="btn-guardar"> Guardar </button>)
                : (<button className="btn-editar" onClick={() => handleEditClick(row.id, row.workload)}> <FontAwesomeIcon icon={faEdit} /> Editar </button>)
            }
        </div>
    );

    const columns = [
        {
            header: (
                <input type="checkbox"
                    onChange={(e) => {
                        const isSelected = e.target.checked;
                        const newSelectedRows = isSelected ? new Set(data.map(row => row.id)) : new Set();
                        setSelectedRows(newSelectedRows);
                    }}
                    checked={data.length > 0 && selectedRows.size === data.length}
                />
            ),
            render: row => (
                <input type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                />
            )
        },
        { header: 'Campus', render: row => <span>{row.campus}</span> },
        { header: 'Nombre', render: row => <span>{row.name}</span> },
        { header: 'Grado Académico', render: row => <span>{row.grade}</span> },
        { header: 'Tipo de nombramiento', render: row => <span>{row.appoinmentType}</span> },
        { header: 'Cargo', render: row => <span >{row.position}</span> },
        { header: '', render: row => <ActionColumn row={row} editingWorkloadId={() => {}}  /> },

    ];

    return (
        <div className="listing-tab-container">
            <div className="listing-tab-box-container">
                <div className="header-container">
                    <div className="header-title-filter-container">
                        <div className="header-title-container">
                            <h2 className="header-title">Listado de Profesores</h2>
                            <span className="period">*filtrar</span>
                        </div>
                        <p className="header-subtitle">Escuela de Computación</p>
                    </div>

                    <div className="listing-actions-container">
                        <button className="action-button delete-button" onClick={handleDeleteButton}>
                            <FontAwesomeIcon icon={faTrash} /> Eliminar
                        </button>
                        <button className="filter-button" onClick={handleFilterButtonClick}>
                            <span className="filter-lines">
                                <span className="line line-large"></span>
                                <span className="line line-medium"></span>
                                <span className="line line-small"></span>
                            </span>
                            Filtros  {/* PENDIENTE */}
                        </button>
                        {/* Las opciones del filtro */}
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
                        <button className="action-button export-button" onClick={handleExportButton}>
                            <FontAwesomeIcon icon={faFileExport} /> Exportar
                        </button>
                        <button className="action-button add-button" onClick={handleAddButton}>
                            <FontAwesomeIcon icon={faPlus} /> Agregar
                        </button>
                    </div>
                </div>

                <Table className="listing-tab-table" columns={columns} data={data} />

                <Pagination currentPage={currentPage} totalItems={totalItems} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};