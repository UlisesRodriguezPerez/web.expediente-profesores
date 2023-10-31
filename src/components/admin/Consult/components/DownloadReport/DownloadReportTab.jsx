import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import './DownloadReportTab.css';

export const DownloadReportTab = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('');

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
                        {/* Aquí puedes agregar las opciones de tu periodo */}
                        <option value="2023-1">2023-1</option>
                        <option value="2023-2">2023-2</option>
                        {/* ... */}
                    </select>
                    <FontAwesomeIcon icon={faArrowDown} className="arrow-icon" />
                </div>
                <button className="search-button">
                    <FontAwesomeIcon icon={faSearch} />
                </button>

            </div>
            <div className="download-button-container">
                <button className="download-button">
                    <FontAwesomeIcon icon={faArrowDown} />
                    DESCARGAR
                </button>
            </div>
        </div>
    );
}
