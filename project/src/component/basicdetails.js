import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './basicdetails.module.css';

export default function BasicDetails({ details, setBasicDetails, handlenextstep }) {
  const [clients, setClients] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [salespersons, setSalespersons] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const [selectedClient, setSelectedClient] = useState(details.client_name || '');
  const [selectedDepartment, setSelectedDepartment] = useState(details.department || '');
  const [selectedContact, setSelectedContact] = useState(details.contact || '');
  const [selectedSalesperson, setSelectedSalesperson] = useState(details.salesperson || '');
  const [selectedAddress, setSelectedAddress] = useState(details.address || '');

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
    console.log('Selected client:', client.client_name);
    setSelectedClient(client.client_name);
    setShowClientDropdown(false);
    setBasicDetails((prevDetails) => ({
      ...prevDetails,
      client_name: client.client_name,
    }));

     // 
  };
  useEffect(() => {
    console.log('Updated Basic Details after client selection:', details);
  }, [details]);

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department.department_name);
    setShowDepartmentDropdown(false);
    setBasicDetails((prevDetails) => ({
      ...prevDetails,
      department: department.department_name,
    }));
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact.contact_name);
    setShowContactDropdown(false);
    setBasicDetails((prevDetails) => ({
      ...prevDetails,
      contact: contact.contact_name,
    }));
  };

  const handleSalespersonSelect = (salesperson) => {
    setSelectedSalesperson(salesperson.sales_person_name);
    setShowSalespersonDropdown(false);
    setBasicDetails((prevDetails) => ({
      ...prevDetails,
      salesperson: salesperson.sales_person_name,
    }));
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address.city);
    setShowAddressDropdown(false);
    setBasicDetails((prevDetails) => ({
      ...prevDetails,
      address: address.city,
    }));
  };

  const DropdownField = ({
    label,
    value,
    onClick,
    showDropdown,
    data,
    handleSelect,
    fetchFunction,
  }) => {
    const [searchTerm, setSearchTerm] = useState("");
  
    const filteredData = data.filter((item) =>
      (item.client_name || item.department_name || item.contact_name || item.sales_person_name || item.city)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  
    return (
      <div style={{ marginTop: "8px", position: "relative" }}>
        <label className={styles.label}>{label}</label>
        <br />
        <div style={{ position: "relative" }}>
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
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: showDropdown
                ? "translateY(-50%) rotate(180deg)"
                : "translateY(-50%)",
              transition: "transform 0.2s ease-in-out",
              cursor: "pointer",
            }}
          >
            <img
              src=".\images\arrow-down-bold.svg"
              style={{ height: "10px", width: "10px" }}
            />
          </span>
        </div>
        {showDropdown && (
  <div className={styles.dropdown}>
    {/* Search Input with Icon */}
    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
  <input
    type="text"
    placeholder="Type to search here"
    className={styles.searchInput}
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{ backgroundColor: "#F7F7F7", padding: "10px 10px 10px 30px",outline:"none",border:"none",width:"100%" }} // Adjust padding for icon space
  />
  <span
    style={{
      position: "absolute",
      left: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
    }}
  >
    <img
      src="./images/search1.png" // Replace with your actual icon path
      alt="Search"
      style={{ width: "16px", height: "16px" }}
    />
  </span>
 
</div>
<hr style={{margin:"0"}}></hr>

    {filteredData.length > 0 ? (
      filteredData.map((item) => (
        <div
          key={item.id}
          className={styles.dropdownItem}
          onClick={() => {
            handleSelect(item);
            setSearchTerm(""); // Clear search term after selection
          }}
        >
          {item.client_name ||
            item.department_name ||
            item.contact_name ||
            item.sales_person_name ||
            item.city}
        </div>
      ))
    ) : (
      <div className={styles.noData}>No data found</div>
    )}
  </div>
)}

      </div>
    );
  };
  

  useEffect(() => {
    fetchClients();
    fetchDepartments();
    fetchContacts();
    fetchSalespersons();
    fetchAddresses();
  }, []);

  return (
    <div style={{ boxSizing: 'border-box', backgroundColor: 'white', width: '100%' }}>
      
      <div style={{ padding: '0px 20px', backgroundColor: "white",paddingBottom:"80px"}}>
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
          label="Salesperson Name"
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
    

      <div style={{ position: "relative", minHeight: "100vh" ,paddingTop:"15%"}}>
  {/* Content Area */}
  <div style={{ padding: "0px 20px", paddingBottom: "100px" }}>
    {/* Your main content goes here */}
  </div>

  {/* Footer Area */}
  <div
    style={{
      position: "fixed",
      bottom: "0",
      
      width: "35%",
      background: "#fff", // Optional for a consistent background
    }}
  >
    {/* Divider */}
    <div style={{ width: "100%", border: "0.5px solid #E0DFDF" }}></div>

    {/* Button Area */}
    <div
      style={{
        padding: "18px 20px",
        boxSizing: "border-box",
        display: "flex", // Optional for aligning content
        justifyContent: "flex-start", // Adjust alignment as needed
      }}
    >
      <button className={styles.btn} onClick={handlenextstep}>
      Next step
      </button>
    </div>
  </div>
</div>
    </div>
  );
}
