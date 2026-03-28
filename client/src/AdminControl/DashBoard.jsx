import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCity from './CityController/AddCity';
import DeleteCity from './CityController/DeleteCity';
import AddUser from './UserController/AddUser';
import DeleteUser from './UserController/DeleteUser';
import ManageWhatsAppSettings from './ManageWhatsAppSettings';

function WhatsAppGlyph({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.123 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'add-city': return <AddCity />;
      case 'delete-city': return <DeleteCity />;
      case 'add-user': return <AddUser />;
      case 'delete-user': return <DeleteUser />;
      case 'whatsapp': return <ManageWhatsAppSettings />;
      default: return <p className="text-gray-500">Select an option to manage</p>;
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Redirect to login or home page
    navigate('/login'); 

  }

  return (
    <div className="p-8 mx-auto max-w-4xl bg-violet-50 min-h-screen rounded-lg shadow-lg">
  <div className="mb-8 flex items-center justify-between gap-2">
    <div className="w-11 shrink-0" aria-hidden />
    <h1 className="text-3xl font-bold text-center text-violet-800 flex-1 min-w-0">
      Admin Dashboard
    </h1>
    <div className="w-11 shrink-0 flex justify-end">
      <button
        type="button"
        onClick={() => setActiveTab('whatsapp')}
        className="p-1.5 rounded-full text-green-600 hover:bg-violet-100 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-400"
        aria-label="Edit WhatsApp number for website visitors"
        title="WhatsApp number"
      >
        <WhatsAppGlyph className="w-9 h-9" />
      </button>
    </div>
  </div>

  <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 mb-8">
    {/* Manage City */}
    <div className="bg-white border border-violet-200 p-6 rounded-xl shadow hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-violet-700 mb-4">Manage City</h2>
      <button
        onClick={() => setActiveTab('add-city')}
        className="w-full p-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg mb-3 transition"
      >
        ➕ Add City
      </button>
      <button
        onClick={() => setActiveTab('delete-city')}
        className="w-full p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
      >
        🗑️ Delete City
      </button>
    </div>

    {/* Manage User */}
    <div className="bg-white border border-violet-200 p-6 rounded-xl shadow hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-violet-700 mb-4">Manage User</h2>
      <button
        onClick={() => setActiveTab('add-user')}
        className="w-full p-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg mb-3 transition"
      >
        ➕ Add User
      </button>
      <button
        onClick={() => setActiveTab('delete-user')}
        className="w-full p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
      >
        🗑️ Delete User
      </button>
    </div>
  </div>

  {/* Dynamic Content Section */}
  <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-inner">
    {renderContent()}
  </div>

  {/* Logout */}
  <div className="mt-6">
    <button
      onClick={handleLogout}
      className="w-full p-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition"
    >
      🔒 Log Out
    </button>
  </div>
</div>

  );
}
