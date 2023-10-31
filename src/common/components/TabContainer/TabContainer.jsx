import React, { useState } from 'react';
import './TabContainer.css';

export const TabContainer = ({ selectedTab, setSelectedTab, tabs, className='', other='' }) => {

    return (
        <div className={`${other}`}>
            <div className={`tab-container ${className}`}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={selectedTab === tab.title.toLowerCase() ? 'active-tab' : ''}
                        onClick={() => setSelectedTab(tab.title.toLowerCase())}
                    >
                        {console.log('selectedTab', selectedTab)}
                        {console.log('tab.title', tab.title)}
                        {tab.title}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {tabs.map((tab, index) => selectedTab === tab.title.toLowerCase() && React.cloneElement(tab.component, { key: index }))}
            </div>
        </div>
    );
};