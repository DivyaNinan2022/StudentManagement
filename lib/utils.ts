import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";

export const exportToExcel = (data: any[], filename: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const fileData = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(fileData, `${filename}.xlsx`);
};

export const formatEmailMessage = (msg: any, user: string) => {
  // capitalize letter
  function capitalizeFirstLetter(name: any) {
    return name
      .toLocaleLowerCase()
      .split(" ")
      .map((word: string) => word[0]?.toLocaleUpperCase() + word.slice(1))
      .join(" ");
  }
  return encodeURIComponent(`
  Dear ${capitalizeFirstLetter(msg.assignee)},
  
  The task "${msg.tasktitle}" (ID: ${msg.id}) has been assigned to you.  
  Please find the task details below:
  
  ------------------------------------------------------------
  Task Details
  -------------
  
  * Title: ${msg.tasktitle}  
  * Description:  ${msg.description}  
  
  * Start Date:  ${new Date(msg.startdate).toDateString()}  
  * End Date: ${new Date(msg.enddate).toDateString()}  
  
  * Priority: ${msg.priority}  
  * Assigned Mail:  ${msg.email}  
  
  * Status:  ${msg.status}  
  * Progress:  ${msg.progress}%
  
  ------------------------------------------------------------
  
  If you have any queries, please let me know.  
  
  Best regards,  
  ${user}
    `);
};

export const downloadPDF = () => {
  const doc = new jsPDF();
  doc.text("Hello, this is your PDF content!", 10, 10);
  doc.save("download.pdf");
};