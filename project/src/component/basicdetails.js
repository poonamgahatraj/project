import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import styles from './basicdetails.module.css'


export default function BasicDetails() {
    const [clients, setClients] = useState([]); // Store fetched clients
  const [selectedClient, setSelectedClient] = useState('');
  const [departments, setDepartments] = useState([]); 
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [contacts, setContacts] = useState([]);
  const [salespersons, setSalespersons] = useState([]);
const [selectedSalesperson, setSelectedSalesperson] = useState('');
const [addresses, setAddresses] = useState([]); // Store fetched addresses
const [selectedAddress, setSelectedAddress] = useState(''); // Store selected address
const [isDropdownVisible, setIsDropdownVisible] = useState(false);


  useEffect(() => {
    // Fetch clients on component mount
    axios
      .get('http://localhost:3001/api/clients')
      .then((response) => {
        setClients(response.data); // Update state with fetched clients
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/departments')
      .then((response) => {
        console.log('Departments data:', response.data); // Check if data is correct
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching departments:', error);
      });
  }, []);

  useEffect(() => {
    axios
        .get('http://localhost:3001/api/contacts')
        .then((response) => {
            setContacts(response.data); // Update state with fetched contacts
        })
        .catch((error) => {
            console.error('Error fetching contacts:', error);
        });
}, []);

useEffect(() => {
    const fetchSalespersons = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/salespersons');
            setSalespersons(response.data); // Update the state with fetched data
        } catch (error) {
            console.error('Error fetching salespersons:', error);
        }
    };

    fetchSalespersons();
}, []);
useEffect(() => {
    const fetchAddresses = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/addresses');
            setAddresses(response.data); // Update state with fetched addresses
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };
    fetchAddresses();
}, []);
const handleInputClick = () => {
    setIsDropdownVisible(!isDropdownVisible); // Show dropdown on input click
  };

  const handleOptionClick = (client) => {
    setSelectedClient(client.client_name); // Set selected client name
    setIsDropdownVisible(false); // Hide dropdown after selection
  };


  return (
    <div style={{boxSizing:"border-box"}}>
      <p>Let’s start with basic details.</p>

      {/* Client Name */}
      <div style={{marginTop:"8px", position: "relative" }}>
        <label style={{fontSize:"14px",fontWeight:"bold"}}>Client Name:</label><br></br>
        <input placeholder='Select a clent...' value={selectedClient} className={styles.seelct} id="client"   onClick={handleInputClick}></input>
        {isDropdownVisible && (
    <div
      style={{
        border: "1px solid black",
        width: "30%",
        marginTop: "4px",
        backgroundColor: "#fff",
        
        
        position: "absolute",
        top: "100%", // Position below the input field
        left: 0,
        zIndex: 10,
      }}
    >
      {clients.map((client) => (
        <div
          key={client.client_id}
          style={{
            padding: "8px",
            cursor: "pointer",
            borderBottom: "1px solid #ccc",
          }}
          onClick={() => handleOptionClick(client)}
        >
          {client.client_name}
        </div>
      ))}
    </div>
  )}
       
     
      </div>

      

      {/* Department Name */}
      <div style={{marginTop:"8px"}}>
     
  <label style={{fontSize:"14px",fontWeight:"bold"}}>Department Name:</label><br />
  <select
    id="department"
    value={selectedDepartment}
    onChange={(e) => setSelectedDepartment(e.target.value)}
    className={styles.seelct}
  >
    <option value="">Select a department</option>
    {departments.length > 0 ? (
      departments.map((department) => (
        <option key={department.department_id} value={department.department_id}>
          {department.department_name}
        </option>
      ))
    ) : (
      <option value="">No departments available</option>
    )}
  </select>
</div>

      {/* Contact Name */}
      <div style={{marginTop:"8px"}}>
    <label style={{fontSize:"14px",fontWeight:"bold"}}>Contact Name:</label><br />
    <select
        id="contact-name"
       
       
        className={styles.seelct}
    >
        <option value="">Select a contact</option>
        {contacts.length > 0 ? (
            contacts.map((contact, index) => (
                <option key={index} value={contact.contact_name}>
                    {contact.contact_name}
                </option>
            ))
        ) : (
            <option value="">No contacts available</option>
        )}
    </select>
</div>

<div style={{marginTop:"8px"}}>
  <label style={{fontSize:"14px",fontWeight:"bold"}}>Sales Person:</label><br />
  <select
    id="salesperson"
    value={selectedSalesperson}
    onChange={(e) => setSelectedSalesperson(e.target.value)}
    className={styles.seelct}
  >
    <option value="">Select a salesperson</option>
    {salespersons.length > 0 ? (
      salespersons.map((salesperson) => (
        <option key={salesperson.sales_person_id} value={salesperson.sales_person_id}>
          {salesperson.sales_person_name}
        </option>
      ))
    ) : (
      <option value="">No salespersons available</option>
    )}
  </select>
</div>

      {/* Address */}
      <div style={{marginTop:"8px"}}>
            <label style={{fontSize:"14px",fontWeight:"bold"}}>Address:</label><br />
            <select
                id="address"
                value={selectedAddress}
                onChange={(e) => {
                    setSelectedAddress(e.target.value);
                    // Pass selected value to parent
                }}
                className={styles.seelct}
            >
                <option value="">Select an address</option>
                {addresses.length > 0 ? (
                    addresses.map((address) => (
                        <option
                            key={address.address_id}
                            value={`${address.street}, ${address.city}, ${address.state}, ${address.zip_code}`}
                        >
                            {address.street}, {address.city}, {address.state}, {address.zip_code}
                        </option>
                    ))
                ) : (
                    <option value="">No addresses available</option>
                )}
            </select>
        </div>
        <div style={{marginTop:"50%"}} >
        <hr ></hr>

{/* Next Step Button */}
<button  style={{width:"100%",padding:'15px',border:"none" ,backgroundColor: "#D15B2C",color:"white",fontSize:"16px"}}>Next Step</button>
        </div>
        
    </div>
  );
}
