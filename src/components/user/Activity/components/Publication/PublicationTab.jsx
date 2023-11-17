import React, { useContext, useEffect, useState } from 'react';
import './PublicationTab.css';
import dataService from '../../../../../services/dataService.js'
import ROUTES from '../../../../../enums/routes';
import { NotificationContext } from '../../../../../contexts/NotificationContext/NotificationContext.jsx';

export const PublicationTab = () => {

    const [name, setName] = useState('');
    const [publicationType, setPublicationType] = useState('');
    const [publicationOptions, setPublicationOptions] = useState([]);
    const [students, setStudents] = useState('');
    const [TFG, setTFG] = useState(null);
    const [scholarship, setScholarship] = useState('');
    const [dissemination_medium, setDissemination_medium] = useState('');
    const [orcid, setOrcid] = useState('');
    const [coauthors, setCoauthors] = useState('');
    const [objectives, setObjetives] = useState('');
    const [goals, setGoals] = useState('');
    const YesOrNoOptions = [{ value: 1, label: 'SI' }, { value: 0, label: 'NO' }];

    const currentUserId = JSON.parse(localStorage.getItem('user')).id;

    const { showNotification } = useContext(NotificationContext);

    const getPublicationOptions = async () => {
        try {
          const response = await dataService.readData(`${ROUTES.PUBLICATION_TYPES}`);
          console.log('publication types', response.data.data)
          const publicationOptions = response.data.data.map(publication => ({ value: publication.id, label: publication.name }));
          
          setPublicationOptions(publicationOptions);
          
    
        } catch (error) {
          console.error('Error fetching activity types:', error);
          showNotification('error', 'Error al cargar los tipos de actividad');
        }
      }

    const handleAddPublication = async() => {
        try{
            if (!name || !publicationType || !students || !TFG || !scholarship || !dissemination_medium || !orcid || !coauthors || !objectives || !goals) {
                showNotification('error', 'Todos los campos son requeridos.');
                return;
            }

            const response = await dataService.createData(`${ROUTES.PUBLICATIONS}`, { //CONFIRMAR RUTA CORRECTA Y NOMBRES EN ING
                publication_type_id: publicationType,
                name: name,
                students: students,
                TFG: TFG,
                postgraduate_scholarship: scholarship,
                coauthors: coauthors,
                objectives: objectives,
                goals: goals,
                dissemination_medium: dissemination_medium,
                ORCID: orcid,
                user_id: currentUserId,
            });

            setName('');
            setPublicationType('');
            setStudents('');
            setTFG('');
            setScholarship('');
            setDissemination_medium('');
            setOrcid('');
            setCoauthors('');
            setObjetives('');
            setGoals('');
       
            showNotification('success', 'Actividad asignada exitosamente');
        }
        catch (error) {
        console.error('Error al guardar Publicación:', error);
        }
    };
    
    useEffect(() => {
        getPublicationOptions();
      }
      , []);

    return (
        <div className="publication-container">
            <div className="input-pair">
                <input 
                    className="input-publication" 
                    placeholder="Nombre de la Publicación"
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                />
                <select 
                    className="dropdown-technique"
                    value={publicationType}
                    onChange={(e) => setPublicationType(e.target.value)}
                >
                    <option value="" disabled selected hidden>Tipo de Publicación</option>
                    {publicationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                    ))}

                </select>
            </div>
            <div className="input-pair">
                <input 
                    className="input-publication" 
                    placeholder="Estudiante(s) Participante(s)"
                    value={students}
                    onChange={(e) => setStudents(e.target.value)}  
                />
                <select 
                    className="dropdown-TFG"
                    value={TFG}
                    onChange={(e) => setTFG(e.target.value)}
                >
                    <option value="" disabled selected hidden>El Estudiante realiza TFG</option>
                    {YesOrNoOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                    ))}
                </select>
            </div>
            <div className="input-pair">
                <select 
                    className="dropdown-Beca"
                    value={scholarship}
                    onChange={(e) => setScholarship(e.target.value)}
                >
                    <option value="" disabled selected hidden>Cuenta con Beca</option>
                    {YesOrNoOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                    ))}
                </select>
                <input 
                    className="input-publication" 
                    placeholder="Medio de Divulgación"
                    value={dissemination_medium}
                    onChange={(e) => setDissemination_medium(e.target.value)} 
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
                    value={coauthors}
                    onChange={(e) => setCoauthors(e.target.value)} 
                />
            </div>
            <div className="input-pair">
                <input 
                    className="input-publication" 
                    placeholder="Objetivo(s)" 
                    value={objectives}
                    onChange={(e) => setObjetives(e.target.value)}
                />
                <input 
                    className="input-publication" 
                    placeholder="Metas" 
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                />
            </div>
            <button className="button-publication" onClick={handleAddPublication}>+ AGREGAR</button>
        </div>
    );
}
