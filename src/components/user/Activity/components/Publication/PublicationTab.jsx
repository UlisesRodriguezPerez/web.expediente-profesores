import React, { useState } from 'react';
import './PublicationTab.css';
import dataService from '../../../../../services/dataService.js'
import ROUTES from '../../../../../enums/routes';

export const PublicationTab = () => {

    const [nombrePublicacion, setNombrePublicacion] = useState('');
    const [tipoPublicacion, setTipoPublicacion] = useState('');
    const [estudiantesParticipantes, setEstudiantesParticipantes] = useState('');
    const [estudianteRealizaTFG, setEstudianteRealizaTFG] = useState('');
    const [becado, setBecado] = useState('');
    const [medioDivulgacion, setMedioDivulgacion] = useState('');
    const [orcid, setOrcid] = useState('');
    const [coautores, setCoautores] = useState('');
    const [objetivos, setObjetivos] = useState('');
    const [metas, setMetas] = useState('');

    const handleAddPublication = () => {
        
        alert(
          `Nombre de la Publicación: ${nombrePublicacion}\nTipo de Publicación: ${tipoPublicacion}\nEstudiante(s) Participante(s): ${estudiantesParticipantes}\nEl Estudiante realiza TFG: ${estudianteRealizaTFG}\nBecado SI/NO: ${becado}\nMedio de Divulgación: ${medioDivulgacion}\nORCID: ${orcid}\nNombre de los coautores: ${coautores}\nObjetivo(s): ${objetivos}\nMetas: ${metas}`
        );

        try{
            if (!actividad || !tipoActividad || !universidad || !pais) {
              showNotification('error', 'Todos los campos son requeridos.');
              return; // Not continue if any field is empty
            }

            /*
            //CREAR TIPO DE PUBLICACION
            await dataService.createData(`${ROUTES.PUBLICATIONS}`, { //CONFIRMAR RUTA CORRECTA Y NOMBRES EN ING
                name: tipoPublicacion,
                description: 0
            });

            //agregar actividad PUBLICACION
            await dataService.createData(`${ROUTES.PUBLICATIONS}`, { //CONFIRMAR RUTA CORRECTA Y NOMBRES EN ING
                publication_type_id: idTipoPublicacion,
                name: nombrePublicacion,
                coauthors: coautores,
                objectives: objetivos,
                goals: metas,
                dissemination_medium: medioDivulgacion,
                ORCID: orcid
            });

            //OBTENER EL ID DE LA PUBLICACION CREADA
            id_publication = dataService.readData(`${ROUTES.ACTIVITIES}`) //agregar el filtro para la última

            //FALTA AGREGAR ESTUDIANTES
            await dataService.createData(`${ROUTES.STUDENTS}`, { //CONFIRMAR RUTA CORRECTA Y NOMBRES EN ING
                publication_id: id_publication,
                full_name: estudiantesParticipantes,
                postgraduate_scholarship: becado,
                TFG: estudianteRealizaTFG
            });

            */
       
            showNotification('success', 'Actividad asignada exitosamente');
        }
        catch (error) {
        console.error('Error al guardar actividad pedagogica:', error);
        }
    };
    
    return (
        <div className="publication-container">
            <div className="input-pair">
                <input 
                    className="input-publication" 
                    placeholder="Nombre de la Publicación"
                    value={nombrePublicacion}
                    onChange={(e) => setNombrePublicacion(e.target.value)} 
                />
                <input 
                    className="input-publication" 
                    placeholder="Tipo de Publicación"
                    value={tipoPublicacion}
                    onChange={(e) => setTipoPublicacion(e.target.value)} 
                />
            </div>
            <div className="input-pair">
                <input 
                    className="input-publication" 
                    placeholder="Estudiante(s) Participante(s)"
                    value={estudiantesParticipantes}
                    onChange={(e) => setEstudiantesParticipantes(e.target.value)}  
                />
                <input 
                    className="input-publication" 
                    placeholder="El Estudiante realiza TFG" 
                    value={estudianteRealizaTFG}
                    onChange={(e) => setEstudianteRealizaTFG(e.target.value)}
                />
            </div>
            <div className="input-pair">
                <input 
                    className="input-publication" 
                    placeholder="Becado SI/NO"
                    value={becado}
                    onChange={(e) => setBecado(e.target.value)} 
                />
                <input 
                    className="input-publication" 
                    placeholder="Medio de Divulgación"
                    value={medioDivulgacion}
                    onChange={(e) => setMedioDivulgacion(e.target.value)} 
                />
            </div>
            <div className="input-pair">
                <input 
                    className="input-publication" 
                    placeholder="ORCID" 
                    value={orcid}
                    onChange={(e) => setOrcid(e.target.value)}
                />
                <input 
                    className="input-publication" 
                    placeholder="Nombre de los coautores"
                    value={coautores}
                    onChange={(e) => setCoautores(e.target.value)} 
                />
            </div>
            <div className="input-pair">
                <input 
                    className="input-publication" 
                    placeholder="Objetivo(s)" 
                    value={objetivos}
                    onChange={(e) => setObjetivos(e.target.value)}
                />
                <input 
                    className="input-publication" 
                    placeholder="Metas" 
                    value={metas}
                    onChange={(e) => setMetas(e.target.value)}
                />
            </div>
            <button className="button-publication" onClick={handleAddPublication}>+ AGREGAR</button>
        </div>
    );
}
