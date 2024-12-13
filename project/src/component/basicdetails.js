import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './basicdetails.module.css';

export default function BasicDetails({ handlenextstep }) {
  const [clients, setClients] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [salespersons, setSalespersons] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const [selectedClient, setSelectedClient] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedContact, setSelectedContact] = useState('');
  const [selectedSalesperson, setSelectedSalesperson] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');

  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [showContactDropdown, setShowContactDropdown] = useState(false);
  const [showSalespersonDropdown, setShowSalespersonDropdown] = useState(false);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);

  // Fetch functions
  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const fetchSalespersons = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/salespersons');
      setSalespersons(response.data);
    } catch (error) {
      console.error('Error fetching salespersons:', error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/addresses');
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  // Field handlers
  const handleClientSelect = (client) => {
    setSelectedClient(client.client_name);
    setShowClientDropdown(false);
  };

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department.department_name);
    setShowDepartmentDropdown(false);
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact.contact_name);
    setShowContactDropdown(false);
  };

  const handleSalespersonSelect = (salesperson) => {
    setSelectedSalesperson(salesperson.sales_person_name);
    setShowSalespersonDropdown(false);
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address.city);
    setShowAddressDropdown(false);
  };

  const DropdownField = ({ label, value, onClick, showDropdown, data, handleSelect, fetchFunction }) => (
    <div style={{ marginTop: '8px', position: 'relative' }}>
      <label className={styles.label}>{label}</label>
      <br />
      <div style={{ position: 'relative' }}>
        <input
          placeholder="Select here"
          className={styles.seelct}
          value={value}
          onClick={() => {
            onClick(!showDropdown);
            if (!showDropdown) fetchFunction();
          }}
          readOnly
        />
        <span
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: showDropdown ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)',
            transition: 'transform 0.2s ease-in-out',
            cursor: 'pointer',
          }}
        >
          <img src='.\images\arrow-down-bold.svg' style={{height:"10px",width:"10px"}}></img>
        </span>
      </div>
      {showDropdown && (
        <div className={styles.dropdown}>
          {data.length > 0 ? (
            data.map((item) => (
              <div key={item.id} className={styles.dropdownItem} onClick={() => handleSelect(item)}>
                {item.client_name || item.department_name || item.contact_name || item.sales_person_name || item.city}
              </div>
            ))
          ) : (
            <div className={styles.noData}>No data found</div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ boxSizing: 'border-box', backgroundColor: 'white', width: '100%' }}>
      <div style={{ padding: '0px 20px',backgroundColor:"white" }}>
        <p style={{ fontSize: '16px' }}>Let’s start with basic details.</p>

        <DropdownField
          label="Client Name"
          value={selectedClient}
          onClick={setShowClientDropdown}
          showDropdown={showClientDropdown}
          data={clients}
          handleSelect={handleClientSelect}
          fetchFunction={fetchClients}
         
        />
        <DropdownField
          label="Department Name"
          value={selectedDepartment}
          onClick={setShowDepartmentDropdown}
          showDropdown={showDepartmentDropdown}
          data={departments}
          handleSelect={handleDepartmentSelect}
          fetchFunction={fetchDepartments}
        />
        <DropdownField
          label="Contact Name"
          value={selectedContact}
          onClick={setShowContactDropdown}
          showDropdown={showContactDropdown}
          data={contacts}
          handleSelect={handleContactSelect}
          fetchFunction={fetchContacts}
        />
        <DropdownField
          label="Salesperson"
          value={selectedSalesperson}
          onClick={setShowSalespersonDropdown}
          showDropdown={showSalespersonDropdown}
          data={salespersons}
          handleSelect={handleSalespersonSelect}
          fetchFunction={fetchSalespersons}
        />
        <DropdownField
          label="Address"
          value={selectedAddress}
          onClick={setShowAddressDropdown}
          showDropdown={showAddressDropdown}
          data={addresses}
          handleSelect={handleAddressSelect}
          fetchFunction={fetchAddresses}
        />
      </div>

      {/* Next Step Button */}
      <div style={{ position: 'fixed', bottom: '0', width: '35%', padding: '0px 20px 18px 18px', boxSizing: 'border-box' }}>
        <div style={{ width: '100%', border: '0.5px solid #E0DFDF' }}></div>
        <button className={styles.btn} onClick={handlenextstep}>
          Next Step
        </button>
      </div>
    </div>
  );
}
