const entries= [];


const editButton=document.getElementById("edit");
const addButton = document.getElementById("add");
const resetButton = document.getElementById("reset");
const status12=document.getElementById("status");

resetButton.addEventListener("click", function(event) {
  event.preventDefault();
  editButton.style.display = "none";
  addButton.style.display = "block";
  

  resetForm();
});

function resetForm() {
    document.getElementById("activityname").value = "";
    document.getElementById("StartDate").value = "";
    document.getElementById("EndDate").value = "";
    document.getElementById("status").value = "";
  
    var errorMessages = document.getElementsByClassName("errorMessage");
    for (var i = 0; i < errorMessages.length; i++) {
      errorMessages[i].textContent = "";
    }
  }

// Get the start date and end date input elements
const startDateInput = document.getElementById("StartDate");
const endDateInput = document.getElementById("EndDate");

const dateProcessing=()=>{
let todayDate = new Date();
let startDate = new Date(startDateInput.value);
let endDate = new Date(endDateInput.value);

const started = status12.querySelector("option[value='Started']");
const notStarted = status12.querySelector("option[value='Not-Started']");
const inProgress = status12.querySelector("option[value='In-Progress']");
const completed = status12.querySelector("option[value='Completed']");
const duePassed = status12.querySelector("option[value='Due-Passed']");

todayDate = getDate(todayDate);
startDate = getDate(startDate);
endDate = getDate(endDate);
console.log(todayDate,startDate,endDate);

 if (todayDate < endDate) {
    started.disabled = true;
    notStarted.disabled = true;
    inProgress.disabled = true;
    completed.disabled = true;
    duePassed.disabled = false;
} else if (todayDate > endDate) {
    started.disabled = false;
    notStarted.disabled = false;
    inProgress.disabled = false;
    completed.disabled = false;
    duePassed.disabled = true;
}
}

const getDate = (date) => {

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
};

endDateInput.addEventListener('change', dateProcessing);
startDateInput.addEventListener('change', dateProcessing);




// Add event listener to start date input change event
// startDateInput.addEventListener('change', function() {
//     const startDate = new Date(startDateInput.value);
//     const endDate1 = new Date(endDateInput.value);
//     const today =new Date();
//     // const year1 = endDate1.getFullYear();
//     // const month1 = String(endDate1.getMonth() + 1).padStart(2, '0');
//     // const day1 = String(endDate1.getDate()).padStart(2, '0');
//     // console.log(year1,month1,day1);
//     // const formattedDate1 = `${year1}-${month1}-${day1}`;
// const year = today.getFullYear();
// const month = String(today.getMonth() + 1).padStart(2, '0');
// const day = String(today.getDate()).padStart(2, '0');
// const formattedDate = `${year}-${month}-${day}`;
// console.log(formattedDate);
// // console.log(formattedDate1);
// console.log(today);



// endDateInput.min = startDate.toISOString().split('T')[0];
// endDateInput.value = endDateInput.min;
// console.log(endDateInput.value)

//     const selectElement = document.getElementById('status');
//     for (let i = 0; i < selectElement.options.length; i++) {
//         const option = selectElement.options[i];
//         if (option.value !== 'Due-Passed' && formattedDate > endDateInput.value) {
//             console.log("Inside");
//             option.disabled = true;
//         }

//     }
// });



addButton.addEventListener("click", (e) => {
  e.preventDefault();

  var activityname = document.getElementById("activityname").value;
  var startDate = document.getElementById("StartDate").value;
  var EndDate = document.getElementById("EndDate").value;
  var status = document.getElementById("status").value;
  var errorMessage = document.getElementsByClassName("errorMessage");

  function readFormData() {
    var formData = {};
    formData["activityname"] = activityname;
    formData["StartDate"] = startDate;
    formData["EndDate"] = EndDate;
    formData["status"] = status;
    return formData;
}


  var formData = readFormData();
  insertNewRecord(formData,errorMessage);
});


const insertNewRecord = (data,errorMessage) =>{
  if(validate(data.activityname,data.startDate,data.EndDate,data.status,errorMessage)){
    var task = {

        activityname: data.activityname,
        startDate: data.startDate,
        EndDate: data.EndDate,
        status: data.status
        };
    
    
       entries.push(task);
       updatetable();

    //    entries.sort(function(a, b) {
    //     return a.EndDate - b.EndDate;
    //   });

    }
   else{
        return false;
    }  

}

const validate = (activityName, startDate, endDate, status, errorMessage) => {
    if (activityName === "") {
      errorMessage[0].innerHTML = "Activity Name is required";
      return false;
    }
  
    if (startDate === "") {
      errorMessage[1].innerHTML = "Start Date is required";
      return false;
    }
  
    if (endDate === "") {
      errorMessage[2].innerHTML = "End Date is required";
      return false;
    }
  
    if (status === "") {
      errorMessage[3].innerHTML = "Status is required";
      return false;
    }
  
    return true;
  };


  
  const updatetable=()=> {
    var table = document.getElementById("taskList");
    var tbody = table.getElementsByTagName("tbody")[0];
  
    tbody.innerHTML = "";
 
    entries.forEach( (ent , index ) => {
  
      var newRow = tbody.insertRow(-1); // Insert new row after table headers
  
      var cell1 = newRow.insertCell(0);
      cell1.innerHTML = ent.activityname;
      var cell2 = newRow.insertCell(1);
      cell2.innerHTML = ent.startDate;
      var cell3 = newRow.insertCell(2);
      cell3.innerHTML = ent.EndDate;
      var cell4 = newRow.insertCell(3);
      cell4.innerHTML = ent.status;
      var cell5 = newRow.insertCell(4);
      cell5.innerHTML = `<button class="edit" onclick="onEdit(this , ${index})">Edit</button> <button class="delete" onclick="onDelete(this)">Delete</button>`;
  
    });
  }

const onEdit= (button, index) => {
    // Hide the "ADD" button
    addButton.style.display = "none";
  
    // Display the "Edit" button
    editButton.style.display = "block";
  
    var row = button.closest("tr");
    var cells = row.cells;
    var activityname = cells[0].innerHTML;
    var StartDate = cells[1].innerHTML;
    var EndDate = cells[2].innerHTML;
    var status = cells[3].innerHTML;
  
    // Set the values in the form for editing
    document.getElementById("activityname").value = activityname;
    document.getElementById("StartDate").value = StartDate;
    document.getElementById("EndDate").value = EndDate;
    document.getElementById("status").value = status;
  
    editButton.onclick = (e) => {
      e.preventDefault();
      
      entries[index].activityname = document.getElementById("activityname").value;
      entries[index].startDate = document.getElementById("StartDate").value;
      entries[index].EndDate = document.getElementById("EndDate").value;
      entries[index].status = document.getElementById("status").value;

      updatetable();
      resetForm();
      addButton.style.display = "block";
      editButton.style.display = "none";
  
  
    }
  }


  

