import React from 'react';
import './PublicationTab.css';

export const PublicationTab = () => {
    return (
        <div className="publication-container">
            <div className="input-pair">
                <input className="input-publication" placeholder="Nombre de la Publicación" />
                <input className="input-publication" placeholder="Tipo de Publicación" />
            </div>
            <div className="input-pair">
                <input className="input-publication" placeholder="Estudiante(s) Participante(s)" />
                <input className="input-publication" placeholder="El Estudiante realiza TFG" />
            </div>
            <div className="input-pair">
                <input className="input-publication" placeholder="Becado SI/NO" />
                <input className="input-publication" placeholder="Medio de Divulgación" />
            </div>
            <div className="input-pair">
                <input className="input-publication" placeholder="ORCID" />
                <input className="input-publication" placeholder="Nombre de los coautores" />
            </div>
            <div className="input-pair">
                <input className="input-publication" placeholder="Objetivo(s)" />
                <input className="input-publication" placeholder="Metas" />
            </div>
            <button className="button-publication">+ AGREGAR</button>
        </div>
    );
}
