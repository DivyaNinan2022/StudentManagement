"use client";
import React, { useState } from "react";

type Student = {
  name: string;
  amount: number;
};

type Director = {
  name: string;
  receivedFromStudents: number;
  salaryPaid: number;
  students: Student[];
};

const initialData: Director[] = [
  {
    name: "Mr. John",
    receivedFromStudents: 54000,
    salaryPaid: 30000,
    students: [
      { name: "Student A", amount: 10000 },
      { name: "Student B", amount: 20000 },
      { name: "Student C", amount: 24000 },
    ],
  },
  {
    name: "Ms. Alice",
    receivedFromStudents: 48000,
    salaryPaid: 25000,
    students: [
      { name: "Student D", amount: 18000 },
      { name: "Student E", amount: 30000 },
    ],
  },
];

export default function BankTransactionAndSalary() {
  const [directors, setDirectors] = useState<Director[]>(initialData);
  const [newPayments, setNewPayments] = useState<{ [key: number]: number }>({});
  const [showAddStudent, setShowAddStudent] = useState<{ [key: number]: boolean }>({});
  const [newStudentData, setNewStudentData] = useState<{
    [key: number]: { name: string; amount: number };
  }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value) || 0;
    setNewPayments({ ...newPayments, [index]: value });
  };

  const handlePayNow = (index: number) => {
    const amountToAdd = newPayments[index] || 0;
    setDirectors((prev) =>
      prev.map((dir, i) =>
        i === index
          ? {
              ...dir,
              salaryPaid: dir.salaryPaid + amountToAdd,
            }
          : dir
      )
    );
    setNewPayments({ ...newPayments, [index]: 0 });
  };

  const handleAddStudentFieldToggle = (index: number) => {
    setShowAddStudent((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleStudentInputChange = (
    index: number,
    field: "name" | "amount",
    value: string | number
  ) => {
    setNewStudentData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]:
          field === "amount" ? parseInt(value as string) || 0 : (value as string),
      },
    }));
  };

  const handleSaveStudent = (index: number) => {
    const student = newStudentData[index];
    if (!student?.name || !student.amount) return;

    setDirectors((prev) =>
      prev.map((dir, i) =>
        i === index
          ? {
              ...dir,
              students: [...dir.students, { name: student.name, amount: student.amount }],
              receivedFromStudents: dir.receivedFromStudents + student.amount,
            }
          : dir
      )
    );

    setNewStudentData((prev) => ({ ...prev, [index]: { name: "", amount: 0 } }));
    setShowAddStudent((prev) => ({ ...prev, [index]: false }));
  };

  const totalBankTransaction = directors.reduce(
    (acc, dir) => acc + dir.receivedFromStudents,
    0
  );

  return (
    <div className="p-6 font-sans">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Bank Transactions & Director Salaries
      </h2>

      {/* Bank Transaction Summary */}
      <div className="mb-6 bg-blue-100 p-4 rounded shadow-sm">
        <h3 className="text-lg font-medium text-blue-800">Total Bank Transaction</h3>
        <p className="text-2xl font-bold text-blue-900 mt-1">
          ₹{totalBankTransaction.toLocaleString()}
        </p>
      </div>

      {/* Director Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {directors.map((director, index) => {
          const remaining = director.receivedFromStudents - director.salaryPaid;
          return (
            <div key={index} className="border rounded p-4 shadow bg-white">
              <h4 className="text-lg font-bold mb-2">{director.name}</h4>
              <p><strong>Received from Students:</strong> ₹{director.receivedFromStudents.toLocaleString()}</p>
              <p><strong>Salary Paid:</strong> ₹{director.salaryPaid.toLocaleString()}</p>
              <p className="text-red-600 font-semibold">
                Salary Remaining: ₹{remaining.toLocaleString()}
              </p>

              <div className="mt-3">
                <label className="text-sm font-medium">Enter Amount to Pay Now:</label>
                <input
                  type="number"
                  min="0"
                  className="border mt-1 p-2 w-full rounded"
                  value={newPayments[index] || ""}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <button
                  className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  onClick={() => handlePayNow(index)}
                >
                  Pay Now
                </button>
              </div>

              <div className="mt-4">
                <h5 className="font-medium mb-1 text-sm text-gray-700">
                  Students Paid via {director.name}:
                </h5>
                <ul className="text-sm list-disc list-inside text-gray-700">
                  {director.students.map((student, i) => (
                    <li key={i}>
                      {student.name} - ₹{student.amount.toLocaleString()}
                    </li>
                  ))}
                </ul>

                <button
                  className="mt-2 text-blue-600 hover:underline text-sm"
                  onClick={() => handleAddStudentFieldToggle(index)}
                >
                  + Add Student Payment
                </button>

                {showAddStudent[index] && (
                  <div className="mt-2 space-y-2">
                    <input
                      type="text"
                      placeholder="Student Name"
                      className="border p-1 w-full rounded text-sm"
                      value={newStudentData[index]?.name || ""}
                      onChange={(e) =>
                        handleStudentInputChange(index, "name", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      placeholder="Amount Paid"
                      className="border p-1 w-full rounded text-sm"
                      value={newStudentData[index]?.amount || ""}
                      onChange={(e) =>
                        handleStudentInputChange(index, "amount", e.target.value)
                      }
                    />
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                      onClick={() => handleSaveStudent(index)}
                    >
                      Save Student
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
