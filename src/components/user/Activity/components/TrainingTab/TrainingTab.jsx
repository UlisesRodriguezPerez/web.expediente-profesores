import React, { useState } from "react";
import { CustomTabContainer } from "../CustomTabContainer/CustomTabContainer";
import { PedagogicalTab } from "./components/Pedagogical/PedagogicalTab";
import { TechniqueTab } from "./components/Technique/TechniqueTab";
import { FormationTab } from "./components/Formation/FormationTab";


export const TrainingTab = () => {

    const [selectedTab, setSelectedTab] = useState('pedagogicas');

    const tabs = [
        { title: 'PEDAGOGICAS', component: <PedagogicalTab /> },
        { title: 'TECNICAS', component: <TechniqueTab /> },
        { title: 'FORMACIÓN', component: <FormationTab /> }
    ];

    return (
        <div className="div">
        <CustomTabContainer selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs} />
        </div>
    );
    
};