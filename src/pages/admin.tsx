// pages/admin.tsx
import React from 'react';
import AdminPanel from '../components/login/AdminPanel';
import { BrowserRouter as Router } from 'react-router-dom';

const AdminPage: React.FC = () => {
  return (
    <Router>
      <div>
        <AdminPanel />
      </div>
    </Router>
  );
};

export default AdminPage;
