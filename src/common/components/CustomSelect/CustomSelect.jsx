import React from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './CustomSelect.css';

export const DropdownIndicator = (props) => (
    <div
        className="dropdown-indicator"
        onClick={() => props.selectProps.menuIsOpen ? props.selectProps.onMenuClose() : props.selectProps.onMenuOpen()}
    >
        <FontAwesomeIcon icon={faSearch} />
    </div>
);

export const CustomSelect = ({ options, onChange, label,placeholder, value }) => (
    <div className="custom-select-container">
        <label className='label'>
            {label}:</label>
        <Select
            className='width-select'
            components={{ DropdownIndicator }}
            options={options}
            onChange={(selectedOption) => onChange(selectedOption)}
            placeholder={placeholder}
            value={value}
        />
    </div>
);