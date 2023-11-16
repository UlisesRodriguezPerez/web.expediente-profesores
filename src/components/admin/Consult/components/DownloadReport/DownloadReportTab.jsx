import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import './DownloadReportTab.css';
import { NotificationContext } from '../../../../../contexts/NotificationContext/NotificationContext';
import ROUTES from '../../../../../enums/routes';
import dataService from '../../../../../services/dataService';

export const DownloadReportTab = () => {
    const { showNotification } = useContext(NotificationContext);
    const [selectedPeriod, setSelectedPeriod] = useState('');

    const [periods, setPeriods] = useState([]);



    const fetchPeriods = async () => {
        try {
            const response = await dataService.readData(`${ROUTES.PERIODS}`);

            setPeriods(response.data.data.map(period => ({
                label: period.name,
                value: period.id
            })));

            console.log('periods', periods);

        } catch (error) {
            console.error('Error fetching periods:', error);
            showNotification('error', 'Error al cargar los periodos');
        }
    }

    useEffect(() => {
        fetchPeriods();
    }
        , []);

    const handleDownload = async () => {
        try{
            // const response = await dataService.readData(`RUTA AL API`);
            const response ='pending';
            console.log('response', response);

        } catch (error) {
            console.error('Error fetching periods:', error);
            showNotification('error', 'Error al cargar los periodos');
        }
    }


    return (
        <div className='download-container'>
            <div className="period-dropdown-search-container" style={{ paddingTop: '20px' }}>
                <label className='label-font'>Periodo:</label>
                <div className="period-dropdown">
                    <select
                        value={selectedPeriod}
                        onChange={e => setSelectedPeriod(e.target.value)}
                        placeholder="Periodo"
                    >
                        <option value="" disabled>Periodo</option>
                        {periods.map(period => (
                            <option key={period.value} value={period.value}>
                                {period.label}
                            </option>
                        ))}
                    </select>
                    <FontAwesomeIcon icon={faArrowDown} className="arrow-icon" />
                </div>
                <button className="search-button">
                    <FontAwesomeIcon icon={faSearch} />
                </button>

            </div>
            <div className="download-button-container">
                
                <button className={`download-button  ${!selectedPeriod ? 'download-button-inactive' : ''}`}
                disabled={!selectedPeriod} onClick={handleDownload}>
                    <FontAwesomeIcon icon={faArrowDown} />
                    DESCARGAR
                </button>
            </div>
        </div>
    );
}
