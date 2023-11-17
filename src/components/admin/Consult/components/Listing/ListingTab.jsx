import React, { useContext, useEffect, useState } from 'react';
import { Table } from '../../../../../common/components/Table/Table';
import { Pagination } from '../../../../../common/components/Pagination/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faFileExport, faPlus } from '@fortawesome/free-solid-svg-icons';
import dataService from '../../../../../services/dataService';
import { NotificationContext } from '../../../../../contexts/NotificationContext/NotificationContext';
import './ListingTab.css';
import { ProfessorFormModal } from './components/ProfessorFormModal/ProfessorFormModal';
import ROUTES from '../../../../../enums/routes';

const ITEMS_PER_PAGE = 10;
const DEFAULT_TEACHER_VALUE = -1;

export const ListingTab = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const { showNotification } = useContext(NotificationContext);
    const [selectedRows, setSelectedRows] = useState(new Set());

    const [isFormModalVisible, setIsFormModalVisible] = useState(false);
    const [editingProfessor, setEditingProfessor] = useState(null);

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async (page = 1, teacherId = DEFAULT_TEACHER_VALUE) => {
            try {
                const queryId = teacherId !== null ? teacherId : DEFAULT_TEACHER_VALUE;
                const response = await dataService.readData(
                    `${ROUTES.COLLABORATORS}?included=user,position,category,appointment,degree,campus&perPage=${ITEMS_PER_PAGE}&page=${page}`);
                setData(response.data.data);
                setTotalItems(response.data.total);
                console.log('collaborators', response.data);
            } catch (error) {
                showNotification('error', 'Error al cargar los datos');
            }
        };

        fetchData( currentPage, DEFAULT_TEACHER_VALUE);
    }, [DEFAULT_TEACHER_VALUE, ITEMS_PER_PAGE, ROUTES.COLLABORATORS, currentPage]);


    const handleDeleteSelected = async () => {
        try {
            // Aquí llamarías al método del API para eliminar los profesores,
            // luego actualizarías tu estado para reflejar los cambios.
            await Promise.all([...selectedRows].map(id => dataService.deleteData(`${ROUTES.COLLABORATORS}/${id}`)));
            setSelectedRows(new Set());
            showNotification('success', 'Profesores eliminados con éxito');



        } catch (error) {
            console.error('Error deleting selected professors:', error);
            showNotification('error', 'Error al eliminar profesores');
        }
    };

    const handleAddClick = () => {
        setEditingProfessor(null);
        setIsFormModalVisible(true);
    };

    const handleEditClick = (professor) => {
        console.log('professor', professor);
        setEditingProfessor(professor); // current professor
        setIsFormModalVisible(true);
    };

    const handleSubmitForm = async (professorData) => {
        try {
            let response;
            if (editingProfessor) {

                console.log('professorData update', professorData);
                // Update user table
                response = await dataService.updateData(`${ROUTES.USERS}/${professorData.userId}`, {
                    id: professorData.userId,
                    name: professorData.name,
                    last_name: professorData.lastName,
                    second_last_name: professorData.secondLastName,
                    phone: professorData.phone,
                    email: professorData.email,
                    roles: professorData.roleIds,
                });

                console.log('professorData update reponse', professorData);

                // Update collaborator table
                response = await dataService.updateData(`${ROUTES.COLLABORATORS}/${professorData.collaboratorId}`, {
                    id: professorData.collaboratorId,
                    user_id: professorData.userId,
                    position_id: professorData.positionId,
                    category_id: professorData.tecCategoryId,
                    appointment_id: professorData.appointmentTypeId,
                    degree_id: professorData.academicDegreeId,
                    campus_id: professorData.campusId,
                });

                showNotification('success', 'Profesor actualizado con éxito');
                
            } else {
                console.log('professorData create', professorData);
                response = await dataService.createData(ROUTES.USERS, {
                    name: professorData.name,
                    last_name: professorData.lastName,
                    second_last_name: professorData.secondLastName,
                    phone: professorData.phone,
                    email: professorData.email,
                    password: '12345678',
                    password_confirmation: '12345678',
                    roles: professorData.roleIds,
                });

                const user = response.data.data;
                console.log('user create', response.data.data);

                response = await dataService.createData(ROUTES.COLLABORATORS, {
                    user_id: user.id,
                    position_id: professorData.positionId,
                    category_id: professorData.tecCategoryId,
                    appointment_id: professorData.appointmentTypeId,
                    degree_id: professorData.academicDegreeId,
                    campus_id: professorData.campusId,
                });

                console.log('collaborator create', response.data.data);

                showNotification('success', 'Profesor creado con éxito');
            }

            setIsFormModalVisible(false);
            
        } catch (error) {
            console.error('Error saving professor:', error);
            showNotification('error', 'Error al guardar profesor');
        }
    };

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

    const ActionColumn = ({ row, handleEditClick }) => (
        <div>
          <button className="btn-editar" onClick={() => handleEditClick(row)}> 
            <FontAwesomeIcon icon={faEdit} /> Editar 
          </button>
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
        { header: 'Campus', render: row => <span>{row.campus.name}</span> },
        { header: 'Nombre', render: row => <span>{row.user.name}</span> },
        { header: 'Grado Académico', render: row => <span>{row.degree.name}</span> },
        { header: 'Tipo de nombramiento', render: row => <span>{row.appointment.name}</span> },
        { header: 'Cargo', render: row => <span >{row.position.name}</span> },
        { header: '', render: row => <ActionColumn row={row} handleEditClick={handleEditClick} /> },

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
                        <button
                            // className="action-button delete-button"
                            className={`action-button delete-button ${selectedRows.size === 0 ? 'delete-button-inactive' : ''}`}
                            onClick={handleDeleteSelected}
                            disabled={selectedRows.size === 0}
                        >
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
                        
                        <button className="action-button export-button" onClick={handleExportButton}>
                            <FontAwesomeIcon icon={faFileExport} /> Exportar
                        </button>
                        <button
                            className="action-button add-button"
                            onClick={handleAddClick}
                        >
                            <FontAwesomeIcon icon={faPlus} /> Agregar
                        </button>
                    </div>
                </div>

                <Table className="listing-tab-table" columns={columns} data={data} />

                <Pagination currentPage={currentPage} totalItems={totalItems} onPageChange={handlePageChange} />
            </div>
            {isFormModalVisible && (
                <ProfessorFormModal
                    isVisible={isFormModalVisible}
                    onClose={() => setIsFormModalVisible(false)}
                    onSubmit={handleSubmitForm}
                    professor={editingProfessor}
                />
            )}
        </div>
    );
};