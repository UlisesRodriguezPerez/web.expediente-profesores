import React, { useState } from 'react';
import { TabContainer } from '../../../../../common/components/TabContainer/TabContainer';
import './TrainingTab.css';
import { TechniqueTab } from './tabs/Technique/TechniqueTab';
import { FormationTab } from './tabs/Formation/FormationTab';


const PlaceholderComponent = () => <div>Placeholder</div>;

export const TrainingTab = () => {

    const [selectedTab, setSelectedTab] = useState('técnicas');
    

    const tabs = [
        { title: 'PEDAGÓGICAS', component: <PlaceholderComponent/> },
        { title: 'TÉCNICAS', component: <TechniqueTab/> },
        { title: 'FORMACIÓN', component: <FormationTab/> },
    ];

  return (
    <div className="training-container">
      <TabContainer selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs} className="training-tab-container"/>
    </div>
  );
}