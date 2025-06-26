"use client";
import React, { useState } from "react";
import "../../css/bank.css";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
// import { downloadPDF } from "@/lib/utils";

const BankLedgerTable = () => {
  const [showEntry, setShowEntry] = useState(false);
  const [entries, setEntries] = useState([
    {
      date: "05-Apr-2024",
      description: "Interest Paid",
      received: 50,
      spent: 0,
      balance: 50745,
    },
    {
      date: "05-Apr-2024",
      description: "Deposit",
      received: 800,
      spent: 0,
      balance: 50695,
    },
    {
      date: "22-Mar-2024",
      description: "Office Supplies",
      received: 120,
      spent: 120,
      balance: 49895,
    },
    {
      date: "22-Mar-2024",
      description: "Transfer",
      received: 2000,
      spent: 2000,
      balance: 50015,
    },
    {
      date: "01-Mar-2024",
      description: "Payment Received",
      received: 5000,
      spent: 5000,
      balance: 52015,
    },
    {
      date: "01-Mar-2024",
      description: "Rent",
      received: 3000,
      spent: 3000,
      balance: 47015,
    },
  ]);
  const handleEntry = () => {
    setShowEntry(true);
    // setEntries((prev) => [
    //   ...prev,
    //   {
    //     date: "",
    //     description: "",
    //     received: 0,
    //     spent: 0,
    //     balance: 0, // or calculate based on prev[prev.length - 1].balance
    //   },
    // ]);
  };


 const downloadPDF = () => {
    const doc = new jsPDF();

    // Table header
    const headers = [["Date", "Description", "Received", "Spent", "Balance"]];

    // Table rows
    const data = [
      ["05-Apr-2024", "Interest Paid", "50", "—", "$50745.000"],
      ["05-Apr-2024", "Deposit", "800", "—", "$50695.000"],
      ["22-Mar-2024", "Office Supplies", "120", "$120", "$49895.000"],
      ["22-Mar-2024", "Transfer", "2000", "$2000", "$50015.000"],
      ["01-Mar-2024", "Payment Received", "5000", "$5000", "$52015.000"],
      ["01-Mar-2024", "Rent", "3000", "$3000", "$47015.000"],
    ];

    // Add table to PDF
  autoTable(doc, {
  head: [["Date", "Description", "Received", "Spent", "Balance"]],
  body: [
    ["05-Apr-2024", "Interest Paid", "50", "—", "$50745.000"],
    ["05-Apr-2024", "Deposit", "800", "—", "$50695.000"],
    ["22-Mar-2024", "Office Supplies", "120", "$120", "$49895.000"],
    ["22-Mar-2024", "Transfer", "2000", "$2000", "$50015.000"],
    ["01-Mar-2024", "Payment Received", "5000", "$5000", "$52015.000"],
    ["01-Mar-2024", "Rent", "3000", "$3000", "$47015.000"],
  ],
  styles: {
    halign: 'center',
    fontSize: 8,
    cellPadding:2,
  },
  headStyles: {
    fillColor: [220, 220, 220], // Light grey background
    textColor: 20,              // Dark text
    fontStyle: 'bold',
  },
});


    doc.save("bank-ledger.pdf");
  };
  return (
    <div className="ledger-container">
      <h1>Bank Transaction Details</h1>
      <div className="ledger-controls">
        <select>
          <option>Account</option>
          <option value="jan">Acc 1</option>
          <option value="jan">Acc 2</option>
          <option value="jan">Acc 3</option>
          <option value="jan">Acc 4</option>
          <option value="jan">Acc 5</option>
          <option value="jan">Acc 6</option>
        </select>
        l
        <input type="date" />
        <input type="date" />
        <button className="add-button" onClick={handleEntry}>
          + Add Entry
        </button>
        <button onClick={downloadPDF}>Download PDF</button>;
      </div>

      <table className="ledger-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Received</th>
            <th>Spent</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.description}</td>
              <td>{entry.received}</td>
              <td>{entry.spent > 0 ? `$${entry.spent}` : "—"}</td>
              <td>${entry.balance.toFixed(3)}</td>
            </tr>
          ))}
          {showEntry && (
            <>
              <tr>
                <input
                  type="date"
                  className="border p-2 rounded w-full"
                  defaultValue="Entry date"
                />
                <td>
                  {" "}
                  <input
                    type="text"
                    className="border p-2 rounded w-full"
                    defaultValue="descrption"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="border p-2 rounded w-full"
                    defaultValue="0.00"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="border p-2 rounded w-full"
                    defaultValue="0.00"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="border p-2 rounded w-full"
                    defaultValue="0.00"
                  />
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BankLedgerTable;
