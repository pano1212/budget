import React, { useState, useEffect } from 'react';
import { CustomerService } from '../service/CustomerService';
import { Link } from 'react-router-dom';
import Popup from '../components/popup';

export default function Departmanage() {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [popup, setPopup] = useState(false);
    const statuses = ['unqualified', 'qualified', 'new', 'negotiation', 'renewal'];

    useEffect(() => {
        CustomerService.getCustomersLarge().then((data) => {
            const formattedCustomers = getCustomers(data);
            setCustomers(formattedCustomers);
            setFilteredCustomers(formattedCustomers);
        });
    }, []);

    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);
            return d;
        });
    };

    const filterCustomers = () => {
        let updatedCustomers = [...customers];
        if (globalFilterValue) {
            updatedCustomers = updatedCustomers.filter(customer =>
                customer.name.toLowerCase().includes(globalFilterValue.toLowerCase())
            );
        }
        if (selectedStatus) {
            updatedCustomers = updatedCustomers.filter(customer => customer.status === selectedStatus);
        }
        setFilteredCustomers(updatedCustomers);
        setCurrentPage(1); // Reset to the first page on filter change
    };

    const handleOpen = () => {
        setPopup(true);
    };

    const handleClose = () => {
        setPopup(false);
    };

    const handleGlobalFilterChange = (e) => {
        setGlobalFilterValue(e.target.value);
        filterCustomers();
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
        filterCustomers();
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const getSeverity = (status) => {
        switch (status) {
            case 'unqualified':
                return 'danger';
            case 'qualified':
                return 'success';
            case 'new':
                return 'info';
            case 'negotiation':
                return 'warning';
            case 'renewal':
                return 'default';
            default:
                return null;
        }
    };

    const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);
    const currentCustomers = filteredCustomers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSelectCustomer = (id) => {
        setSelectedCustomers((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(customerId => customerId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const handleDeleteSelected = () => {
        const remainingCustomers = customers.filter(
            (customer) => !selectedCustomers.includes(customer.id)
        );
        setCustomers(remainingCustomers);
        setFilteredCustomers(remainingCustomers);
        setSelectedCustomers([]);
    };

    return (
        <div className="card">
            <div className="h-40">
                <div className="h-1/2 items-center flex px-10 gap-3">
                    <Link to="/">
                        <button className="h-14 bg-blue-600 px-2 rounded-lg text-white hover:bg-blue-700 transition">
                            <i className="fas fa-home mr-2"></i> Home
                        </button>
                    </Link>
                    <p className="text-4xl"><strong> Manage Department </strong></p>
                </div>

                <div className="flex flex-wrap justify-between px-10 items-center h-1/2">
                    <div className="flex items-center gap-2">
                        <h4 className="m-0">Customers</h4>
                        <input
                            value={globalFilterValue}
                            onChange={handleGlobalFilterChange}
                            className="border p-2"
                            placeholder="Keyword Search"
                        />
                        <select
                            value={selectedStatus}
                            onChange={handleStatusChange}
                            className="border p-2"
                        >
                            <option value="">Select Status</option>
                            {statuses.map((status) => (
                                <option key={status} value={status}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </option>
                            ))}
                        </select>
                        <button
                            className="h-10 bg-green-600 px-2 rounded-lg text-white hover:bg-green-700 transition"
                            onClick={handleOpen}
                        >
                            <i className="fas fa-plus mr-2"></i> Add
                        </button>
                        <button
                            className="h-10 bg-red-600 px-2 rounded-lg text-white hover:bg-red-700 transition"
                            onClick={handleDeleteSelected}
                            disabled={selectedCustomers.length === 0}
                        >
                            <i className="fas fa-trash mr-2"></i> Delete
                        </button>
                        <button className="h-10 bg-blue-600 px-2 rounded-lg text-white hover:bg-blue-700 transition">
                            <i className="fas fa-sync-alt mr-2"></i> Refresh
                        </button>
                    </div>
                    <div className="items-center flex border">
                        <label>Select</label>
                        <select name="" id="" className="ml-2"></select>
                    </div>
                </div>
            </div>

            <table className="min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Edit</th>
                        <th className="border px-4 py-2">Select</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Country</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Balance</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCustomers.length > 0 ? (
                        currentCustomers.map((customer) => (
                            <tr key={customer.id}>
                                <td className="border px-4 py-2 text-center">
                                    <button className="border px-2 hover:bg-gray-200 transition" onClick={handleOpen}>
                                        Edit
                                    </button>
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedCustomers.includes(customer.id)}
                                        onChange={() => handleSelectCustomer(customer.id)}
                                    />
                                </td>
                                <td className="border px-4 py-2">{customer.name}</td>
                                <td className="border px-4 py-2">{customer.country.name}</td>
                                <td className="border px-4 py-2">{formatDate(customer.date)}</td>
                                <td className="border px-4 py-2">
                                    {customer.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </td>
                                <td className="border px-4 py-2">
                                    <span className={`tag ${getSeverity(customer.status)}`}>
                                        {customer.status}
                                    </span>
                                </td>
                                <td className="border px-4 py-2">
                                    <button className="h-8 w-8 bg-gray-400 rounded-full hover:bg-gray-500 transition">
                                        ⚙️
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="border px-4 py-2 text-center">No customers found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="flex justify-between mt-4 mb-5 border-2 mx-20 px-2">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="hover:text-gray-600 transition"
                >
                    <i className="fas fa-arrow-left"></i> Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="hover:text-gray-600 transition"
                >
                    Next <i className="fas fa-arrow-right"></i>
                </button>
            </div>

            {popup && (
                <Popup close={handleClose} />
            )}
        </div>
    );
}
