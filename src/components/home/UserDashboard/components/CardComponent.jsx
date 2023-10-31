import React from 'react';

const CardComponent = ({ backgroundColor, imageSrc, altText, title, onClick }) => {
    return (
        <div className={`card ${backgroundColor}`} onClick={onClick}>
            <img src={imageSrc} alt={altText} />
            <h2 className='white-text'>{title}</h2>
        </div>
    );
}

export default CardComponent;