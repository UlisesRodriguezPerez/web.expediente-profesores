import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit } from '@fortawesome/free-solid-svg-icons';

import './SemesterWorkload.css';
import dataService from '../../../services/dataService'; // Asegúrate de ajustar la ruta correcta
import ROUTES from '../../../enums/routes';
import { NotificationContext } from '../../../contexts/NotificationContext/NotificationContext';

export const SemesterWorkload = () => {

    const [workloads, setWorkloads] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [editingWorkloadId, setEditingWorkloadId] = useState(null);
    const [tempWorkloadValue, setTempWorkloadValue] = useState(null);


    const { showNotification } = useContext(NotificationContext);


    const fetchWorkloads = async (page = 1) => {
        try {
            const responseData = await dataService.readData(`${ROUTES.WORKLOADS}?included=collaborator.user,period.creator.user&perPage=10&page=${page}`);
            setWorkloads(responseData.data.data);
            setTotalItems(responseData.data.total);
            console.log('workloads', responseData.data);
        } catch (error) {
            console.error('Error fetching workloads:', error);
            showNotification('error', 'Error al obtener la carga semestral');
        }
    };

    useEffect(() => {
        fetchWorkloads();
    }, []); // Este useEffect se ejecutará una vez cuando el componente se monte.

    useEffect(() => {
        fetchWorkloads(currentPage);
    }, [currentPage]); // Este useEffect se ejecutará cada vez que currentPage cambie.


    const handleNextPage = () => {
        if (currentPage * 10 < totalItems) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleEditClick = (workloadId, workloadValue) => {
        setEditingWorkloadId(workloadId);
        setTempWorkloadValue(workloadValue);
    };

    const handleWorkloadChange = (e) => {
        let value = e.target.value;
        if (value < 0) value = 0; // Establecer el valor a 0 si es negativo
        setTempWorkloadValue(value);
    };

    const handleSaveWorkload = async (workloadId, collaboratorId, periodId) => {
        if (tempWorkloadValue < 0) return showNotification('error', 'El valor del workload debe ser mayor o igual a cero.');
    
        try {
            console.log('workloadId', workloadId);
            const response = await dataService.updateData(`${ROUTES.WORKLOADS}/${workloadId}`, { 
                workload: tempWorkloadValue,
                collaborator_id: collaboratorId, // Añadido
                period_id: periodId, // Añadido
            });
            console.log('Workload updated successfully:', response.data);
            setWorkloads(workloads.map(w => w.id === workloadId ? { ...w, workload: tempWorkloadValue } : w));
            setEditingWorkloadId(null);
            setTempWorkloadValue(null);
            showNotification('success', 'Workload actualizado con éxito.');
        } catch (error) {
            console.error('Error updating workload:', error);
            console.error('Validation errors:', error.response.data);
            showNotification('error', 'Error al actualizar el workload.');
         }
    };


    return (
        <div className="semester-workload-container">
            <h1 className="title">Carga Semestral</h1>

            <div className="box-container">
                <div className="header-container">
                    <div className="header-title-filter-container">
                        <div className="header-title-container">
                            <h2 className="header-title">Carga Semestral</h2>
                            <span className="period">Periodo actual</span>
                        </div>
                        <p className="header-subtitle">Ingrese o modifique la carga semestral</p>
                    </div>
                    <div className="search-filter-container">
                        <div className="search-box">
                            <input type="text" placeholder="Búsqueda" className="search-input" />
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        </div>
                        <button className="filter-button">
                            <span className="filter-lines">
                                <span className="line line-large"></span>
                                <span className="line line-medium"></span>
                                <span className="line line-small"></span>
                            </span>
                            Filtros
                        </button>
                    </div>
                </div>

                <table className="workload-table">
                    <thead>
                        <tr className="custom-background">
                            <th>Nombre</th>
                            <th>Carga</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {workloads.map((workload) => (
                        <tr key={workload.id}>
                            <td>{`${workload.collaborator.user.name} ${workload.collaborator.user.last_name} ${workload.collaborator.user.second_last_name}`}</td>
                            <td className="workload-container">
                                {editingWorkloadId === workload.id ? (
                                    <input
                                        type="number"
                                        value={tempWorkloadValue}
                                        onChange={handleWorkloadChange}
                                        // onBlur={handleSaveWorkload} 
                                        className="input-edit" // Clase CSS para estilo
                                    />
                                ) : (
                                    <div className="bar-container">
                                        <div className="workload-bar" style={{ width: `${(workload.workload / 1.5) * 100}%` }}></div>
                                    </div>
                                )}
                            </td>
                            <td className="workload-number-container">
                                <span className="workload-number">{editingWorkloadId === workload.id ? tempWorkloadValue : workload.workload}</span>
                            </td>
                            <td>
                                {editingWorkloadId === workload.id ? (
                                    <button onClick={() => handleSaveWorkload(workload.id, workload.collaborator.id, workload.period.id)} className="btn-guardar"> 
                                    Guardar
                                </button>
                                ) : (
                                    <button className="btn-editar" onClick={() => handleEditClick(workload.id, workload.workload)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                        Editar
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>

                <div className="pagination-container">
                    <span className="items-info">{(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, totalItems)} of {totalItems} items</span>
                    <div className="pagination-buttons">
                        <button className="pagination-button" onClick={handlePreviousPage} disabled={currentPage <= 1}>Anterior</button>
                        <button className="pagination-button" onClick={handleNextPage} disabled={currentPage * 10 >= totalItems}>Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


