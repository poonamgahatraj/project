import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './basicdetails.module.css';

export default function BasicDetails({handlenextstep}) {
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
    setSelectedSalesperson(salesperson.salesperson_name);
    setShowSalespersonDropdown(false);
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address.address);
    setShowAddressDropdown(false);
  };

  return (
    <div style={{ boxSizing: 'border-box',backgroundColor:"#FDFBFB" }}>
      <p style={{fontSize:"14px"}}>Let’s start with basic details.</p>

      {/* Client Name */}
      <div style={{ marginTop: '8px', position: 'relative' }}>
        <label className={styles.label}>Client Name</label>
        <br />
        <input
          placeholder="Select a client..."
          className={styles.seelct}
          value={selectedClient}
          onClick={() => {
            setShowClientDropdown(!showClientDropdown);
            if (!showClientDropdown) fetchClients();
          }}
          onChange={(e) => setSelectedClient(e.target.value)}
        />
        {showClientDropdown && (
          <div className={styles.dropdown}>
            {clients.length > 0 ? (
              clients.map((client) => (
                <div
                  key={client.id}
                  className={styles.dropdownItem}
                  onClick={() => handleClientSelect(client)}
                >
                  {client.client_name}
                </div>
              ))
            ) : (
              <div className={styles.noData}>No clients found</div>
            )}
          </div>
        )}
      </div>

      {/* Department Name */}
      <div style={{ marginTop: '8px', position: 'relative' }}>
        <label className={styles.label}>Department Name</label>
        <br />
        <input
          placeholder="Select a department..."
          className={styles.seelct}
          value={selectedDepartment}
          onClick={() => {
            setShowDepartmentDropdown(!showDepartmentDropdown);
            if (!showDepartmentDropdown) fetchDepartments();
          }}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        />
        {showDepartmentDropdown && (
          <div className={styles.dropdown}>
            {departments.length > 0 ? (
              departments.map((department) => (
                <div
                  key={department.id}
                  className={styles.dropdownItem}
                  onClick={() => handleDepartmentSelect(department)}
                >
                  {department.department_name}
                </div>
              ))
            ) : (
              <div className={styles.noData}>No departments found</div>
            )}
          </div>
        )}
      </div>

      {/* Contact Name */}
      <div style={{ marginTop: '8px', position: 'relative' }}>
        <label className={styles.label}>Contact Name</label>
        <br />
        <input
          placeholder="Select a contact..."
          className={styles.seelct}
          value={selectedContact}
          onClick={() => {
            setShowContactDropdown(!showContactDropdown);
            if (!showContactDropdown) fetchContacts();
          }}
          onChange={(e) => setSelectedContact(e.target.value)}
        />
        {showContactDropdown && (
          <div className={styles.dropdown}>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  className={styles.dropdownItem}
                  onClick={() => handleContactSelect(contact)}
                >
                  {contact.contact_name}
                </div>
              ))
            ) : (
              <div className={styles.noData}>No contacts found</div>
            )}
          </div>
        )}
      </div>

      {/* Salesperson */}
      <div style={{ marginTop: '8px', position: 'relative' }}>
        <label className={styles.label}>Sales Person</label>
        <br />
        <input
          placeholder="Select a salesperson..."
          className={styles.seelct}
          value={selectedSalesperson}
          onClick={() => {
            setShowSalespersonDropdown(!showSalespersonDropdown);
            if (!showSalespersonDropdown) fetchSalespersons();
          }}
          onChange={(e) => setSelectedSalesperson(e.target.value)}
        />
        {showSalespersonDropdown && (
          <div className={styles.dropdown}>
            {salespersons.length > 0 ? (
              salespersons.map((salesperson) => (
                <div
                  key={salesperson.id}
                  className={styles.dropdownItem}
                  onClick={() => handleSalespersonSelect(salesperson)}
                >
                  {salesperson.sales_person_name}
                </div>
              ))
            ) : (
              <div className={styles.noData}>No salespersons found</div>
            )}
          </div>
        )}
      </div>

      {/* Address */}
      <div style={{ marginTop: '8px', position: 'relative' }}>
        <label className={styles.label}>Address</label>
        <br />
        <input
          placeholder="Select an address..."
          className={styles.seelct}
          value={selectedAddress}
          onClick={() => {
            setShowAddressDropdown(!showAddressDropdown);
            if (!showAddressDropdown) fetchAddresses();
          }}
          onChange={(e) => setSelectedAddress(e.target.value)}
        />
        {showAddressDropdown && (
          <div className={styles.dropdown}>
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <div
                  key={address.id}
                  className={styles.dropdownItem}
                  onClick={() => handleAddressSelect(address)}
                >
                  {address.street}
                </div>
              ))
            ) : (
              <div className={styles.noData}>No addresses found</div>
            )}
          </div>
        )}
      </div>

      {/* Next Step Button */}
      <div style={{ position: 'fixed', bottom: '0', width: '28%', marginBottom: '0.5%' }}>
        <hr />
        <button className={styles.btn} onClick={handlenextstep}>
          Next Step
        </button>
      </div>
    </div>
  );
}
