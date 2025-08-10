// src/pages/SettingsPage.jsx
import React, { useState } from 'react';
import UpdateAdminForm from "./UpdateAdminForm";
import ChangePasswordForm from './ChangePasswordform';
import SidebarLayout from '../components/SidebarLayout';
import "../styles/Settings.css"
const SettingsPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <SidebarLayout>
    <div className="settings-container">
      <h2 className="settings-title">Admin Settings</h2>
      <div className="settings-buttons">
        <button onClick={() => setSelectedOption('password')}>Change Password</button>
        <button onClick={() => setSelectedOption('admin')}>Update Admin</button>
      </div>

      <div className="settings-form-container">
        {selectedOption === 'password' && <ChangePasswordForm />}
        {selectedOption === 'admin' && <UpdateAdminForm />}
      </div>
    </div>
    </SidebarLayout>
  );
};

export default SettingsPage;
