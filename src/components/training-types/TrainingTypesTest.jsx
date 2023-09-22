import React, { useState, useEffect } from 'react';
import api from '../../api';
import ROUTES from '../../enums/routes';

export const  TrainingTypesTest = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(ROUTES.TRAINING_TYPES);
        setData(response.data.data);
      } catch (error) {
        console.error("Error al cargar los tipos de entrenamiento:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

