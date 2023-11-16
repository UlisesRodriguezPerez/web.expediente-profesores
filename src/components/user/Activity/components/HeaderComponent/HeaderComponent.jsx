import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

import "./HeaderComponent.css";
import { CustomTabContainer } from './../CustomTabContainer/CustomTabContainer';
import { TrainingTab } from "../TrainingTab/TrainingTab";
import { PublicationTab } from "../Publication/PublicationTab";
import { InternationalizationTab } from "../InternationalizationTab/InternationalizationTab";

const tempComponent = () => {
    return <div>Temp</div>;
};

export const HeaderComponent = () => {

    const [selectedTab, setSelectedTab] = useState('capacitaciones');

    const tabs = [
        { title: 'CAPACITACIONES', component: <TrainingTab /> },
        { title: 'PUBLICACIONES', component: <PublicationTab /> },
        { title: 'INTERNACIONALIZACIONES', component: <InternationalizationTab /> },
    ];

    const handleDownloadExcel = () => {
        alert("Se preciono el boton para descargar el excel");
    }

    return (
        <div className="header-container">
        <div className="header-top">
            <h2>Mis Actividades</h2>
            <button className="header-btn" onClick={handleDownloadExcel}>
                <FontAwesomeIcon icon={faArrowDown} />
                DESCARGAR EXCEL
            </button>
        </div>

        <CustomTabContainer selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs}  title="Registrar actividad:" />
    </div>
    );
}
