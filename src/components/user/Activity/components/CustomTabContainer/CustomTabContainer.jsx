import React from 'react';
import './CustomTabContainer.css';

export const CustomTabContainer = ({ selectedTab, setSelectedTab, tabs, title='' }) => {
    return (
        <div className="custom-tab-wrapper">
            <div className="custom-tab-header">
                <h3>{` ${title}`}</h3>
                <div className="custom-tab-buttons">
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
            </div>
            <div className="custom-tab-content">
                {tabs.map((tab, index) => selectedTab === tab.title.toLowerCase() && React.cloneElement(tab.component, { key: index }))}
            </div>
        </div>
    );
};
