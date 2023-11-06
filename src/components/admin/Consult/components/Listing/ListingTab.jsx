import React, { useContext, useState } from 'react';
import { Table } from '../../../../../common/components/Table/Table';
import { Pagination } from '../../../../../common/components/Pagination/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faFileExport, faPlus } from '@fortawesome/free-solid-svg-icons';
import dataService from '../../../../../services/dataService';
import { NotificationContext } from '../../../../../contexts/NotificationContext/NotificationContext';
import './ListingTab.css';
import { ProfessorFormModal } from './components/ProfessorFormModal/ProfessorFormModal';

export const ListingTab = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const { showNotification } = useContext(NotificationContext);
    const [selectedRows, setSelectedRows] = useState(new Set());

    const [isFormModalVisible, setIsFormModalVisible] = useState(false);
    const [editingProfessor, setEditingProfessor] = useState(null);

    const [data, setData] = useState([
        { id: 1, name: 'Juan', campus: 'Campus 1', grade: '1', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 2, name: 'Pedro', campus: 'Campus 2', grade: '2', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 3, name: 'Luis', campus: 'Campus 3', grade: '3', appoinmentType: 'Planta', position: 'Profesor' },
        { id: 4, name: 'Carlos', campus: 'Campus 4', grade: '4', appoinmentType: 'Planta', position: 'Profesor' },
    ]);


    const handleDeleteSelected = async () => {
        try {
            // Aquí llamarías al método del API para eliminar los profesores,
            // luego actualizarías tu estado para reflejar los cambios.
            await Promise.all([...selectedRows].map(id => dataService.deleteData(id)));
            setSelectedRows(new Set());
            showNotification('Profesores eliminados con éxito', 'success');



        } catch (error) {
            console.error('Error deleting selected professors:', error);
            showNotification('Error al eliminar profesores', 'error');
        }
    };

    const handleAddClick = () => {
        setEditingProfessor(null);
        setIsFormModalVisible(true);
    };

    const handleEditClick = (professor) => {
        setEditingProfessor(professor); // current professor
        setIsFormModalVisible(true);
    };

    const handleSubmitForm = async (professorData) => {
        try {
            let response;
            if (editingProfessor) {
                response = await dataService.updateData(professorData);
            } else {
                response = await dataService.createData(professorData);
            }

            setIsFormModalVisible(false);
            showNotification('Profesor guardado con éxito', 'success');
        } catch (error) {
            console.error('Error saving professor:', error);
            showNotification('Error al guardar profesor', 'error');
        }
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
        { header: '', render: row => <ActionColumn row={row} editingWorkloadId={() => { }} /> },

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
                            className="action-button delete-button"
                            onClick={handleDeleteSelected}
                            disabled={selectedRows.size === 0}
                        >
                            <FontAwesomeIcon icon={faTrash} /> Eliminar
                        </button>
                        <button className="filter-button">
                            <span className="filter-lines">
                                <span className="line line-large"></span>
                                <span className="line line-medium"></span>
                                <span className="line line-small"></span>
                            </span>
                            Filtros  {/* PENDIENTE */}
                        </button>
                        <button className="action-button export-button">
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