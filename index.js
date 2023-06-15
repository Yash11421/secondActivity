const entries= [];


const editButton=document.getElementById("edit");
const addButton = document.getElementById("add");
const resetButton = document.getElementById("reset");
const status12=document.getElementById("status");
const special=document.getElementById("special");
const search=document.getElementById("search");

resetButton.addEventListener("click", function(event) {
  event.preventDefault();
  editButton.style.display = "none";
  addButton.style.display = "block";
  resetForm();
});


//<---------Disable the Error Message once value is entered----------->
// var rnd1= document.getElementById("activityname").value;
// var rnd2= document.getElementById("StartDate").value;
// var rnd3= document.getElementById("EndDate").value;
// var rnd4= document.getElementById("status").value;
// rnd1.addEventListener=('change',disablemessage);
// rnd2.addEventListener=('change',disablemessage);
// rnd3.addEventListener=('change',disablemessage);
// rnd4.addEventListener=('change',disablemessage);


// const disablemessage=()=>{
//   var errorMessages = document.getElementsByClassName("errorMessage");
//   for (var i = 0; i < errorMessages.length; i++) {
//     errorMessages[i].textContent = "";
//   }

// }

document.getElementById("activityname").addEventListener("input", clearErrorMessage);
document.getElementById("StartDate").addEventListener("input", clearErrorMessage);
document.getElementById("EndDate").addEventListener("input", clearErrorMessage);
document.getElementById("status").addEventListener("input", clearErrorMessage);

function clearErrorMessage(){
  const errorMessages = document.getElementsByClassName("errorMessage");
  for (let i = 0; i < errorMessages.length; i++) {
    errorMessages[i].textContent = "";
  }
};


const resetForm=()=> {
    document.getElementById("activityname").value = "";
    document.getElementById("StartDate").value = "";
    document.getElementById("EndDate").value = "";
    document.getElementById("status").value = "";

  
    var errorMessages = document.getElementsByClassName("errorMessage");
    for (var i = 0; i < errorMessages.length; i++) {
      errorMessages[i].textContent = "";
    }

    var options = status12.getElementsByTagName("option");
    for (var i = 0; i < options.length; i++) {
      options[i].disabled = false;
    }
  }

// Get the start date and end date input elements
const startDateInput = document.getElementById("StartDate");
const endDateInput = document.getElementById("EndDate");

const dateProcessing=()=>{
let todayDate = new Date();
let startDate = new Date(startDateInput.value);
let endDate = new Date(endDateInput.value);

const Started = status12.querySelector("option[value='Started']");
const notStarted = status12.querySelector("option[value='Not-Started']");
const inProgress = status12.querySelector("option[value='In-Progress']");
const completed = status12.querySelector("option[value='Completed']");
const duePassed = status12.querySelector("option[value='Due-Passed']");

todayDate = getDate(todayDate);
startDate = getDate(startDate);
endDate = getDate(endDate);
console.log(todayDate,startDate,endDate);

if (startDate < todayDate && endDate < todayDate) {
  Started.disabled = true;
  notStarted.disabled = true;
  inProgress.disabled = true;
  completed.disabled = false;
  duePassed.disabled = false;
}

else if (todayDate > endDate) {
    Started.disabled = true;
    notStarted.disabled = true;
    inProgress.disabled = true;
    completed.disabled = true;
    duePassed.disabled = false;
} else if (todayDate < endDate) {
    Started.disabled = false;
    notStarted.disabled = false;
    inProgress.disabled = false;
    completed.disabled = false;
    duePassed.disabled = true;
}


  if (startDate > endDate) {
    addButton.style.display = "none";
    special.textContent = "StartDate cannot be more than End Date";
  }
  // else {
  //   addButton.style.display = "block";
  //   special("special").textContent = "";

  // }

  // Perform actions when start date crosses end date

  // You can display an error message or perform any other actions here
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
  var StartDate = document.getElementById("StartDate").value;
  var EndDate = document.getElementById("EndDate").value;
  var status = document.getElementById("status").value;
  var errorMessage = document.getElementsByClassName("errorMessage");

  function readFormData() {
    var formData = {};
    formData["activityname"] = activityname;
    formData["StartDate"] = StartDate;
    formData["EndDate"] = EndDate;
    formData["status"] = status;
    return formData;
}


  var formData = readFormData();
  insertNewRecord(formData,errorMessage);
});


const insertNewRecord = (data,errorMessage) =>{
  if(validate(data.activityname,data.StartDate,data.EndDate,data.status,errorMessage)){
    var task = {

        activityname: data.activityname,
        StartDate: data.StartDate,
        EndDate: data.EndDate,
        status: data.status
        };
    
    
       entries.push(task);
       updatetable();
       resetForm();

    //    entries.sort(function(a, b) {
    //     return a.EndDate - b.EndDate;
    //   });

    }
    

}

const validate = (activityName, StartDate, EndDate, status, errorMessage) => {
    if (activityName === "") {
      errorMessage[0].innerHTML = "Activity Name is required";
      return false;
    }
  
    if (StartDate === "") {
      errorMessage[1].innerHTML = "Start Date is required";
      return false;
    }
  
    if (EndDate === "") {
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
      cell2.innerHTML = ent.StartDate;
      var cell3 = newRow.insertCell(2);
      cell3.innerHTML = ent.EndDate;
      var cell4 = newRow.insertCell(3);
      cell4.innerHTML = ent.status;
      var cell5 = newRow.insertCell(4);
      cell5.innerHTML = `<button class="edit together" onclick="onEdit(this , ${index})">Edit</button> <button class="delete together" onclick="onDelete(this)">Delete</button>`;
      if (ent.status === "Due-Passed") {
        newRow.style.textDecoration = "line-through";
        for (var i = 1; i < newRow.cells.length-1; i++) {
          newRow.cells[i].style.textDecoration = "line-through";
        }
      }
    });
    resetForm();
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

    dateProcessing();
  
    editButton.onclick = (e) => {
      e.preventDefault();
      
      entries[index].activityname = document.getElementById("activityname").value;
      entries[index].StartDate = document.getElementById("StartDate").value;
      entries[index].EndDate = document.getElementById("EndDate").value;
      entries[index].status = document.getElementById("status").value;

      updatetable();
      resetForm();
      addButton.style.display = "block";
      editButton.style.display = "none";
  
  
    }
  }

  const onDelete = (td) => {
    row = td.parentElement.parentElement;
    var index = row.rowIndex - 1;
    entries.splice(index, 1);

    document.getElementById("taskList").deleteRow(row.rowIndex);
  }


  //<------------------Search Based Filtering-------------------->

  const err = document.getElementsByClassName('errorMessage123');

  search.addEventListener("keyup", () => {
    let filter = document.getElementById("search").value.toUpperCase();
    let table = document.getElementById("taskList");
    let tr = table.getElementsByTagName("tr");
  
    for (var i = 0; i < tr.length; i++) {
      let foundMatch = false;
      let tds = tr[i].getElementsByTagName("td");
  
      for (var j = 0; j < tds.length; j++) {
        let td = tds[j];
        let textValue = td.textContent || td.innerText;
  
        if (textValue.toUpperCase().indexOf(filter) > -1) {
          foundMatch = true;
          break;
        }
      }
  
      if (foundMatch) {
        tr[i].style.display = ""; // Show the row
        err.textContent = "Search is Available";
      } else {
        // Check if it is a table header row
        let ths = tr[i].getElementsByTagName("th");
        if (ths.length > 0) {
          tr[i].style.display = ""; // Show the header row
        } else {
          tr[i].style.display = "none"; // Hide the data row
        }
        err.textContent = "No search found";
      }
    }
  });
  
  

  

