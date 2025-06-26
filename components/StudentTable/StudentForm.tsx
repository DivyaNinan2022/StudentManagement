import "../../css/student.css";

interface StudentFormProps {
  onClose?: () => void;
}
export default function StudentForm({ onClose }: StudentFormProps) {
  return (
    <div>
      <form className="student-form">
          <button className="close-button" onClick={onClose}>×</button>
        <h2>Student Admission Form</h2>
        <div className="form-grid">
          <input placeholder="Admission No" />
          <input type="date" placeholder="Date of Admission" />
          <input placeholder="Student Name" />
          <input placeholder="Contact Number" />
          <input placeholder="Tutor Name" />
          <input placeholder="Coordinator Name" />
          <input type="number" placeholder="Total Fees" />
          <input type="number" placeholder="Advance Payment" />
          <select>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          <select>
            <option>Cash</option>
            <option>Bank</option>
            <option>Direct</option>
          </select>
        </div>
        <button className="submit-btn">Submit</button>
      </form>
    </div>
  );
}
