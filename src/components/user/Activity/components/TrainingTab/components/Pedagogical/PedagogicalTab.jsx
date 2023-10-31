import React from "react";
import './PedagogicalTab.css';

export const PedagogicalTab = () => {
    
    return (
        <div className="div-pedagogical">
          <input className="input-pedagogical" placeholder="Curso" />
          <input className="input-pedagogical" placeholder="Institución" />
          <button className="button-pedagogical">+ AGREGAR</button>
        </div>
      );
        
    };
