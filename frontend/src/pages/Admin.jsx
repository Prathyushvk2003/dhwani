import React, { useState } from 'react';
import AdminEvents from '../components/admin/AdminEvents';
import AdminResults from '../components/admin/AdminResults';
import AdminGallery from '../components/admin/AdminGallery';
import AdminStudents from '../components/admin/AdminStudents';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('events');

  const renderTabContent = () => {
    switch(activeTab) {
      case 'events':
        return <AdminEvents />;
      case 'results':
        return <AdminResults />;
      case 'gallery':
        return <AdminGallery />;
      case 'students':
        return <AdminStudents />;
      default:
        return <AdminEvents />;
    }
  };

  return (
    <div className="admin-page">
      <div className="container">
        <h1 className="page-title">ADMIN PANEL</h1>
        
        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
          <button 
            className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
            onClick={() => setActiveTab('results')}
          >
            Results
          </button>
          <button 
            className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            Gallery
          </button>
          <button 
            className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            Students
          </button>
        </div>
        
        <div className="tab-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Admin;