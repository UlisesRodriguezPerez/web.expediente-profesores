import React, { useState } from 'react';
import './TabContainer.css';

export const TabContainer = ({ selectedTab, setSelectedTab, tabs }) => {

    return (
        <div>
            <div className="tab-container">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={selectedTab === tab.title.toLowerCase() ? 'active-tab' : ''}
                        onClick={() => setSelectedTab(tab.title.toLowerCase())}
                    >
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