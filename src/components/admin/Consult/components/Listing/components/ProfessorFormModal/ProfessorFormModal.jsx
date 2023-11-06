import React, { useState } from 'react';
import './ProfessorFormModal.css';

// Supongamos que estos datos vienen de la API
const campuses = [{ id: 1, name: 'Campus 1' }, /* ...otros campus... */];
const academicDegrees = [{ id: 1, name: 'Grado 1' }, /* ...otros grados... */];
const appointmentTypes = [{ id: 1, name: 'Tipo 1' }, /* ...otros tipos... */];
const tecCategories = [{ id: 1, name: 'Categoría 1' }, /* ...otras categorías... */];
const positions = [{ id: 1, name: 'Posición 1' }, /* ...otras posiciones... */];
const roles = [{ id: 1, name: 'Rol 1' }, /* ...otros roles... */];

export const ProfessorFormModal = ({ isVisible, onClose, onSubmit, professor }) => {
  // Estados para cada campo del formulario
  const [formData, setFormData] = useState({
    name: professor?.name || '',
    lastName: professor?.lastName || '',
    secondLastName: professor?.secondLastName || '',
    phone: professor?.phone || '',
    email: professor?.email || '',
    campusId: professor?.campusId || '',
    academicDegreeId: professor?.academicDegreeId || '',
    appointmentTypeId: professor?.appointmentTypeId || '',
    tecCategoryId: professor?.tecCategoryId || '',
    positionId: professor?.positionId || '',
    roleIds: professor?.roles?.map(role => role.id) || []
  });

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // Función para manejar el cambio en los roles seleccionados
  const handleRoleChange = (roleId) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      roleIds: formData.roleIds.includes(roleId)
        ? formData.roleIds.filter(id => id !== roleId)
        : [...formData.roleIds, roleId]
    }));
  };

  // Manejador del envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  // Solo renderizamos si `isVisible` es true
  if (!isVisible) return null;

  // Componente para los campos de texto
const TextField = ({ label, name, value, onChange, type = 'text' }) => (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
  
  // Componente para los selectores
  const SelectField = ({ label, name, value, options, onChange }) => (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} value={value} onChange={onChange}>
        <option value="">{label}</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
      </select>
    </div>
  );
  
  // Componente para los checkboxes
  const CheckboxField = ({ label, id, checked, onChange }) => (
    <div className="form-checkbox">
      <label htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
        />
        {label}
      </label>
    </div>
  );
  
  // El Modal Component
  const Modal = ({ isVisible, onClose, formData, handleChange, handleSubmit, campuses, academicDegrees, appointmentTypes, tecCategories, positions, roles, handleRoleChange }) => {
    // Esta función se llama cuando se hace clic en el fondo del modal
  const handleBackdropClick = (event) => {
    // Si el usuario hace clic directamente en el fondo, cerramos el modal
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isVisible ? 'modal--active' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>&times;</button>
        <form onSubmit={handleSubmit} className="form">
          
          <div className="form-row">
            <TextField label="Nombre" name="name" value={formData.name} onChange={handleChange} />
            <TextField label="Apellido Paterno" name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
          <div className="form-row">
            <TextField label="Apellido Materno" name="secondLastName" value={formData.secondLastName} onChange={handleChange} />
            <TextField label="Teléfono" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="form-row">
            <TextField label="Correo Electrónico" name="email" value={formData.email} onChange={handleChange} type="email" />
            <SelectField label="Selecciona un campus" name="campusId" value={formData.campusId} options={campuses} onChange={handleChange} />
          </div>
          <div className="form-row">
            <SelectField label="Selecciona un grado académico" name="academicDegreeId" value={formData.academicDegreeId} options={academicDegrees} onChange={handleChange} />
            <SelectField label="Selecciona un tipo de nombramiento" name="appointmentTypeId" value={formData.appointmentTypeId} options={appointmentTypes} onChange={handleChange} />
          </div>
          <div className="form-row">
            <SelectField label="Selecciona una categoría técnica" name="tecCategoryId" value={formData.tecCategoryId} options={tecCategories} onChange={handleChange} />
            <SelectField label="Selecciona una posición" name="positionId" value={formData.positionId} options={positions} onChange={handleChange} />
          </div>
          <div className="form-roles">
            {roles.map(role => (
              <CheckboxField
                key={role.id}
                label={role.name}
                id={`role-${role.id}`}
                checked={formData.roleIds.includes(role.id)}
                onChange={() => handleRoleChange(role.id)}
              />
            ))}
          </div>
  
          <button type="submit" className="form__submit-button">Guardar</button>
        </form>
      </div>
    </div>
  );
  
};

  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      campuses={campuses}
      academicDegrees={academicDegrees}
      appointmentTypes={appointmentTypes}
      tecCategories={tecCategories}
      positions={positions}
      roles={roles}
      handleRoleChange={handleRoleChange}
    />
  );
};

export default ProfessorFormModal;
