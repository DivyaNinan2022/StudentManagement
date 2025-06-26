"use client";
import { SetStateAction, useState } from "react";
import "../../css/student.css";
import StudentForm from "./StudentForm";
import { useRouter } from "next/navigation";
import { exportToExcel } from "../../lib/utils";
// import "../../css/bank.css";

export default function StudentTable() {
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedStudents, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (student: any) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const router = useRouter();
  const goToForm = () => {
    router.push("/bankTransaction");
  };
  const data = [
    {
      serialNo: 1,
      admissionNo: "123256",
      dateOfAdmission: "01-Apr-2022",
      studentName: "Joe Listin",
      contactNumber: "9876543210",
      tutorName: "Mr. John",
      coordinator: "Ms. Alice",
      dueFees: "₹8,400",
      totalFees: "₹84,000",
      advancePaid: "₹20,000",
      paymentMode: "Cash",
      paymentScheme: "Monthly",
    },
    {
      serialNo: 2,
      admissionNo: "123256",
      dateOfAdmission: "01-Apr-2022",
      studentName: "aaaa bbbb",
      contactNumber: "9876543210",
      tutorName: "Mr. Peter",
      coordinator: "Ms. Alice",
      dueFees: "₹8,400",
      totalFees: "₹94,000",
      advancePaid: "₹20,000",
      paymentMode: "Cash",
      paymentScheme: "Monthly",
    },
    {
      serialNo: 3,
      admissionNo: "123256",
      dateOfAdmission: "01-Apr-2022",
      studentName: "Joe Listin",
      contactNumber: "9876543210",
      tutorName: "Mr. John",
      coordinator: "Ms. Alice",
      dueFees: "₹8,400",
      totalFees: "₹84,000",
      advancePaid: "₹20,000",
      paymentMode: "Cash",
      paymentScheme: "Monthly",
    },
    {
      serialNo: 4,
      admissionNo: "123256",
      dateOfAdmission: "01-Apr-2022",
      studentName: "Joe Listin",
      contactNumber: "9876543210",
      tutorName: "Ms. Diya",
      coordinator: "Ms. Alice",
      dueFees: "₹8,400",
      totalFees: "₹84,000",
      advancePaid: "₹20,000",
      paymentMode: "Cash",
      paymentScheme: "Monthly",
    },
    {
      serialNo: 5,
      admissionNo: "123256",
      dateOfAdmission: "01-Apr-2022",
      studentName: "Joe Listin",
      contactNumber: "9876543210",
      tutorName: "Mr. John",
      coordinator: "Ms. Alice",
      dueFees: "₹8,400",
      totalFees: "₹84,000",
      advancePaid: "₹20,000",
      paymentMode: "Cash",
      paymentScheme: "Monthly",
    },
    {
      serialNo: 6,
      admissionNo: "123256",
      dateOfAdmission: "01-Apr-2022",
      studentName: "Joe Listin",
      contactNumber: "9876543210",
      tutorName: "Mr. John",
      coordinator: "Ms. Alice",
      dueFees: "₹8,400",
      totalFees: "₹84,000",
      advancePaid: "₹20,000",
      paymentMode: "Cash",
      paymentScheme: "Monthly",
    },
  ];

  const handleExport = () => {
    exportToExcel(data, "StudentData");
  };

  const selectedStudent = {
    name: "Joe Listin",
    admissionNo: "123256",
    contact: "9876543210",
    dateOfAdm: "01-Apr-2024",
    tutor: "Mr. John",
    coordinator: "Ms. Alice",
    course: "stock",
    location: "Kochi",
    installments: [
      {
        no: 1,
        amount: 14000,
        mode: "Cash",
        date: "01-May-2024",
      },
      {
        no: 2,
        amount: 14000,
        mode: "Cheque",
        date: "01-Jun-2024",
      },
      {
        no: 3,
        amount: 14000,
        mode: "Cash",
        date: "01-Jul-2024",
      },
      {
        no: 4,
        amount: 14000,
        mode: "Director",
        date: "01-Aug-2024",
      },
      {
        no: 5,
        amount: 14000,
        mode: "Cheque",
        date: "01-Sep-2024",
      },
      {
        no: 6,
        amount: 14000,
        mode: "Cash",
        date: "01-Oct-2024",
      },
    ],
  };
  const studentData = selectedStudent;

  return (
    <div className="student-container">
      <h1 style={{ marginTop: "1rem" }}>Student Management System</h1>
      {showForm ? (
        <StudentForm onClose={() => setShowForm(false)} />
      ) : (
        <>
          <div className="filters">
            <select className="filter-dropdown" defaultValue={"Month"}>
              <option disabled>Month</option>
              <option value="jan">January</option>
              <option value="feb">February</option>
              <option value="mar">March</option>
              <option value="apr">April</option>
              <option value="may">May</option>
              <option value="jun">June</option>
              <option value="jul">July</option>
              <option value="aug">August</option>
              <option value="sep">September</option>
              <option value="oct">October</option>
              <option value="nov">November</option>
              <option value="dec">December</option>
            </select>

            <select className="filter-dropdown" defaultValue={"Batch"}>
              <option disabled>Batch</option>
              <option value="batch1">Batch 1</option>
              <option value="batch2">Batch 2</option>
              <option value="batch3">Batch 3</option>
              <option value="batch4">Batch 4</option>
            </select>

            <select className="filter-dropdown" defaultValue={"Location"}>
              <option disabled>Location</option>
              <option value="kochi">Kochi</option>
              <option value="calicut">Calicut</option>
              <option value="bangalore">Bangalore</option>
              <option value="dubai">Dubai</option>
              <option value="delhi">Delhi</option>
            </select>

            <button className="primary" onClick={() => setShowForm(true)}>
              + Add Student
            </button>
            <button className="primary" onClick={goToForm}>
              Bank Transaction Details
            </button>
            <button className="secondary" onClick={handleExport}>
              Export to Excel
            </button>
          </div>

          <table className="student-table">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-2 text-left">Serial No</th>
                <th className="px-4 py-2 text-left">Admission No</th>
                <th className="px-4 py-2 text-left">Date_of_Adm</th>
                <th className="px-4 py-2 text-left">Student_Name</th>
                <th className="px-4 py-2 text-left">Contact_Number</th>
                <th className="px-4 py-2 text-left">Tutor'sName </th>
                <th className="px-4 py-2 text-left">Coordinator</th>
                <th className="px-4 py-2 text-left">Due_Fees</th>
                <th className="px-4 py-2 text-left">Total_Fees</th>
                <th className="px-4 py-2 text-left">Advance_Paid</th>
                <th className="px-4 py-2 text-left">Payment_Mode</th>
                <th className="px-4 py-2 text-left">Batch_Name</th>
                <th className="px-4 py-2 text-left">Mode</th>
                <th
                  className="px-4 py-2 text-center"
                  colSpan={2}
                  align="justify"
                  style={{ textAlign: "center" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {/* Repeat for each student */}
              {isEdit ? (
                <tr className="border-t">
                  <td>1</td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      className="border p-2 rounded w-full"
                      defaultValue="123256"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="date"
                      className="border p-2 rounded w-full"
                      defaultValue="2022-04-01"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      className="border p-2 rounded w-full"
                      defaultValue="Joe Listin"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="tel"
                      className="border p-2 rounded w-full"
                      defaultValue="9876543210"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      className="border p-2 rounded w-full"
                      defaultValue="Mr. John"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      className="border p-2 rounded w-full"
                      defaultValue="Ms. Alice"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      className="border p-2 rounded w-full"
                      defaultValue="8400"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      className="border p-2 rounded w-full"
                      defaultValue="84000"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      className="border p-2 rounded w-full"
                      defaultValue="20000"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <select
                      className="border p-2 rounded w-full"
                      defaultValue="Cash"
                      style={{ width: "70px" }}
                    >
                      <option>Cash</option>
                      <option>Bank</option>
                      <option>Direct</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <select
                      className="border p-2 rounded w-full"
                      defaultValue="Payment Mode"
                      style={{ width: "90px" }}
                    >
                      <option disabled>Select</option>
                      <option>Batch 1</option>
                      <option>Batch 2</option>
                      <option>Batch 3</option>
                      <option>Batch 4</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <select
                      className="border p-2 rounded w-full"
                      defaultValue="Payment Mode"
                      style={{ width: "70px" }}
                    >
                      <option disabled>Select</option>
                      <option>Online</option>
                      <option>Offline</option>
                    </select>
                  </td>

                  <td>
                    <button
                      className="text-green-600 hover:underline"
                      onClick={() =>
                        handleViewDetails({
                          name: "Joe Listin",
                          admissionNo: "123256",
                          contact: "9876543210",
                          dateOfAdm: "01-Apr-2022",
                          tutor: "Mr. John",
                          coordinator: "Ms. Alice",
                          installments: [
                            {
                              no: 1,
                              amount: 14000,
                              mode: "Cash",
                              date: "01-May-2022",
                            },
                            {
                              no: 2,
                              amount: 14000,
                              mode: "Cheque",
                              date: "01-Jun-2022",
                            },
                            {
                              no: 3,
                              amount: 14000,
                              mode: "Cash",
                              date: "01-Jul-2022",
                            },
                            {
                              no: 4,
                              amount: 14000,
                              mode: "Director",
                              date: "01-Aug-2022",
                            },
                            {
                              no: 5,
                              amount: 14000,
                              mode: "Cheque",
                              date: "01-Sep-2022",
                            },
                            {
                              no: 6,
                              amount: 14000,
                              mode: "Cash",
                              date: "01-Oct-2022",
                            },
                          ],
                        })
                      }
                    >
                      View
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <div
                      style={{
                        display: "inline-flex",
                        gap: "8px",
                        alignItems: "center",
                      }}
                    >
                      <button
                        className="text-green-600 hover:underline border-none bg-transparent cursor-pointer"
                        onClick={() => setIsEdit(false)}
                      >
                        Save
                      </button>
                      <button
                        className="text-red-500 hover:underline border-none bg-transparent cursor-pointer"
                        onClick={() => setIsEdit(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr className="border-t">
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">123256</td>
                  <td className="px-4 py-2">01-Apr-2022</td>
                  <td className="px-4 py-2">Joe Listin</td>
                  <td className="px-4 py-2">9876543210</td>
                  <td className="px-4 py-2">Mr. John</td>
                  <td className="px-4 py-2">Ms. Alice</td>
                  <td className="px-4 py-2">₹8,400</td>
                  <td className="px-4 py-2">₹84,000</td>
                  <td className="px-4 py-2">₹20,000</td>
                  <td className="px-4 py-2">Cash</td>
                  <td className="px-4 py-2">Batch 2</td>
                  <td className="px-4 py-2">Online</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => setIsEdit(true)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="text-green-600 hover:underline"
                      onClick={() =>
                        handleViewDetails({
                          name: "Joe Listin",
                          admissionNo: "123256",
                          contact: "9876543210",
                          dateOfAdm: "01-Apr-2022",
                          tutor: "Mr. John",
                          coordinator: "Ms. Alice",
                          installments: [
                            {
                              no: 1,
                              amount: 14000,
                              mode: "Cash",
                              date: "01-May-2022",
                            },
                            {
                              no: 2,
                              amount: 14000,
                              mode: "Cheque",
                              date: "01-Jun-2022",
                            },
                            {
                              no: 3,
                              amount: 14000,
                              mode: "Cash",
                              date: "01-Jul-2022",
                            },
                            {
                              no: 4,
                              amount: 14000,
                              mode: "Director",
                              date: "01-Aug-2022",
                            },
                            {
                              no: 5,
                              amount: 14000,
                              mode: "Cheque",
                              date: "01-Sep-2022",
                            },
                            {
                              no: 6,
                              amount: 14000,
                              mode: "Cash",
                              date: "01-Oct-2022",
                            },
                          ],
                        })
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              )}
              <tr className="border-t">
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">123256</td>
                <td className="px-4 py-2">01-Apr-2022</td>
                <td className="px-4 py-2">aaaa bbbb</td>
                <td className="px-4 py-2">9876543210</td>
                <td className="px-4 py-2">Mr. Peter</td>
                <td className="px-4 py-2">Ms. Alice</td>
                <td className="px-4 py-2">₹8,400</td>
                <td className="px-4 py-2">₹94,000</td>
                <td className="px-4 py-2">₹20,000</td>
                <td className="px-4 py-2">Cash</td>
                <td className="px-4 py-2">Batch 1</td>
                <td className="px-4 py-2">Offline</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => setIsEdit(true)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => handleViewDetails(studentData)}
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">3</td>
                <td className="px-4 py-2">123256</td>
                <td className="px-4 py-2">01-Apr-2022</td>
                <td className="px-4 py-2">Joe Listin</td>
                <td className="px-4 py-2">9876543210</td>
                <td className="px-4 py-2">Mr. John</td>
                <td className="px-4 py-2">Ms. Alice</td>
                <td className="px-4 py-2">₹8,400</td>
                <td className="px-4 py-2">₹84,000</td>
                <td className="px-4 py-2">₹20,000</td>
                <td className="px-4 py-2">Cash</td>
                <td className="px-4 py-2">Batch 1</td>
                <td className="px-4 py-2">Offline</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => handleViewDetails(studentData)}
                  >
                    View
                  </button>
                </td>
              </tr>

              <tr className="border-t">
                <td className="px-4 py-2">4</td>
                <td className="px-4 py-2">123256</td>
                <td className="px-4 py-2">01-Apr-2022</td>
                <td className="px-4 py-2">Joe Listin</td>
                <td className="px-4 py-2">9876543210</td>
                <td className="px-4 py-2">Ms. Diya</td>
                <td className="px-4 py-2">Ms. Alice</td>
                <td className="px-4 py-2">₹8,400</td>
                <td className="px-4 py-2">₹84,000</td>
                <td className="px-4 py-2">₹20,000</td>
                <td className="px-4 py-2">Cash</td>
                <td className="px-4 py-2">Batch 3</td>
                <td className="px-4 py-2">Online</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => handleViewDetails(studentData)}
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">5</td>
                <td className="px-4 py-2">123256</td>
                <td className="px-4 py-2">01-Apr-2022</td>
                <td className="px-4 py-2">Joe Listin</td>
                <td className="px-4 py-2">9876543210</td>
                <td className="px-4 py-2">Mr. John</td>
                <td className="px-4 py-2">Ms. Alice</td>
                <td className="px-4 py-2">₹8,400</td>
                <td className="px-4 py-2">₹84,000</td>
                <td className="px-4 py-2">₹20,000</td>
                <td className="px-4 py-2">Cash</td>
                <td className="px-4 py-2">Batch 3</td>
                <td className="px-4 py-2">Online</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => handleViewDetails(studentData)}
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">6</td>
                <td className="px-4 py-2">123256</td>
                <td className="px-4 py-2">01-Apr-2022</td>
                <td className="px-4 py-2">Joe Listin</td>
                <td className="px-4 py-2">9876543210</td>
                <td className="px-4 py-2">Mr. John</td>
                <td className="px-4 py-2">Ms. Alice</td>
                <td className="px-4 py-2">₹8,400</td>
                <td className="px-4 py-2">₹84,000</td>
                <td className="px-4 py-2">₹20,000</td>
                <td className="px-4 py-2">Cash</td>
                <td className="px-4 py-2">Batch 3</td>
                <td className="px-4 py-2">Online</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => handleViewDetails(studentData)}
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="footer-summary">
            <span>Total Students: 6</span>
            <span>
              Total Dues: <strong>25,200 INR</strong>
            </span>
          </div>
        </>
      )}
      {showModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Student Details</h2>
            <div className="mb-4">
              <p>
                <strong>Name:</strong> {selectedStudent.name}
              </p>
              <p>
                <strong>Admission No:</strong> {selectedStudent.admissionNo}
              </p>
              <p>
                <strong>Date of Admission:</strong> {selectedStudent.dateOfAdm}
              </p>
              <p>
                <strong>Contact:</strong> {selectedStudent.contact}
              </p>
              <p>
                <strong>Tutor:</strong> {selectedStudent.tutor}
              </p>
              <p>
                <strong>Coordinator:</strong> {selectedStudent.coordinator}
              </p>
            </div>

            <h3 className="text-lg font-semibold mb-2">Fee Installments</h3>
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-1">Installment No</th>
                  <th className="px-2 py-1">Amount</th>
                  <th className="px-2 py-1">Payment Mode</th>
                  <th className="px-2 py-1">Date</th>
                </tr>
              </thead>
              <tbody>
                {selectedStudent.installments.map((inst, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-2 py-1 text-center">{inst.no}</td>
                    <td className="px-2 py-1 text-center">₹{inst.amount}</td>
                    <td className="px-2 py-1 text-center">{inst.mode}</td>
                    <td className="px-2 py-1 text-center">{inst.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right mt-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
