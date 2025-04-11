export const formatEmailMessage = (msg: any, user: string) => {
      // capitalize letter
  function capitalizeFirstLetter(name: any) {
    return name
    .toLocaleLowerCase()
    .split(" ")
    .map((word:string) => word[0]?.toLocaleUpperCase() + word.slice(1))
    .join(" ")
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
  