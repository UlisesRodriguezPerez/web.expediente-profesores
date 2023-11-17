import React, { useState } from 'react';
import { TabContainer } from './../../../common/components/TabContainer/TabContainer';
import { HistoricTab } from './components/Historic/HistoricTab';
import './Consult.css'; 
import { ListingTab } from './components/Listing/ListingTab';
//import { DownloadReportTab } from './components/DownloadReport/DownloadReportTab';
import { PublicationTab } from './components/Publication/PublicationTab';
import { TrainingTab } from './components/Training/TrainingTab';
import { InternationalizationTab } from './components/Internationalization/InternationalizationTab';

const PlaceholderComponent = () => <div>Placeholder</div>;

export const Consult = () => {

    const [selectedTab, setSelectedTab] = useState('histórico');
    

    const tabs = [
        { title: 'HISTÓRICO', component: <HistoricTab /> },
        { title: 'LISTADO', component: <ListingTab /> },
        // { title: 'DESCARGAR INFORME', component: <DownloadReportTab /> },
        { title: 'CAPACITACIONES', component: <TrainingTab /> },
        { title: 'PUBLICACIONES', component: <PublicationTab /> },
        { title: 'INTERNACIONALIZACIONES', component: <InternationalizationTab /> },
    ];

  return (
    <div className="consult-view-container">
      <h1 className="consult-title">Consultas</h1>
      <TabContainer selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs} />
    </div>
  );
}