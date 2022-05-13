const iconImportant = "iconImportant fas fa-star";
const iconNotImportant = "iconNotImportant far fa-star";
const formOpen = "Hide Form";
const formClosed = "Show Form";
const taskWidthFormOpen = "max-width: calc(100% - 285px)";
const taskWidthFormClosed = "Max-width: calc(100% - 20px";
let iconImportantState = false;
let formVisible = true;
let taskRemaining = 0;

function toggleImportant(){

    if(!iconImportantState){

        console.log("Clicked");
        $("#important").removeClass(iconNotImportant).addClass(iconImportant);
        iconImportantState = true;
        return;

    }

    console.log("Clicked");
    $("#important").removeClass(iconImportant).addClass(iconNotImportant);
    iconImportantState = false;
}

function saveTask(){

    let task = new Task(
        iconImportantState,
        $("#txtName").val(),
        $("#txtDescription").val(),
        $("#txtDueDate").val(),
        $("#txtLocation").val(),
        $("#txtInvites").val(),
        $("#txtColor").val(),
        $("#txtFrequency").val(),
        $("#txtStatus").val(),
    );

    // ajax request for server
    $.ajax({
        type: "post",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function(response){
            displayTask(task);
            clearForm();
            console.log("Task saved", response);
            // location.reload();
        },
        error: function(errorDetails){
            console.error("Save failed", errorDetails);
        }
    });
}

function getFrequencyText(frequency){
    switch(frequency){
        case "1": return "One-Time";
        case "2": return "Daily";
        case "3": return "Weekly";
        case "4": return "Monthly";
        case "5": return "Annually";
        default:
            return "Other";
    }
}

function getStatusText(status){
    switch(status){
        case "1": return "Pending";
        case "2": return "In Progress";
        case "3": return "Pause";
        case "4": return "Completed";
        case "5": return "Abandoned";
        default:
            return "Other";
    }
}

function displayTask(task){

    let iconClass = iconNotImportant;
    if(task.important){
        iconClass = iconImportant;
    }

    let syntax = `
    <div class="task-card" style="border: 2px solid ${task.color}">
        <div class="task-title">
            <label><i class="${iconClass}"></i></label>
            <h4><span class="accent">Task: </span>${task.title}</h4>
        </div>
        <div class="card-info-container">
            <div class="card-left">
                <div class="task-long-info">
                    <label><span class="accent"> Description:</span> ${task.description}</label>
                    <label><span class="accent"> Invites:</span> ${task.invites}</label>
                </div>
            </div>
            <div class="card-right">
                <div class="task-short-info"> 
                    <label><span class="accent"> Recurrence:</span> ${getFrequencyText(task.frequency)}</label>
                    <label><span class="accent"> Due:</span> ${task.dueDate}</label>
                    <label><span class="accent"> Location:</span> ${task.taskLocation}</label>
                    <label><span class="accent"> Status: </span>${getStatusText(task.status)}</label>
                </div>
            </div>
        </div>
    </div>
    `;

    $("#tasks").append(syntax);
}

function fetchTasks(){
    $.ajax({
        type: "get",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        success: function(response){
            let data = JSON.parse(response); // (decode) from string to obj
            taskRemaining = 0;
           
            // for loop over data
            for(let i = 0; i < data.length; i++){

                let newTask = data[i];

                // only if its my task
                if (newTask.name === "Christopher"){
                    taskRemaining++;
                    displayTask(newTask);
                }
            }
            $(".task-count").html(taskRemaining);
            // get every element inside the array
            // send the element to the display fn
        },
        error: function(error){
            console.log("Error retrieving data", error);
        }
    });
}

function deleteTasks(){
    // DELETE req    /api/products/clear/<Christopher>

    $.ajax({
        type: "delete",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/Christopher",
        success: function(response){
            console.log("Successfully cleared", response);
            location.reload();
        },
        error: function(err){
            console.log(err);
        }
    });
}

function clearForm(){
    $(".inputs > * ").val("");
    iconImportantState = true;
    toggleImportant();
}

function toggleFormVisible(){
    let form = $(".form");
    let button = $(".toggleFormButton");
    if(formVisible){
        
        form.hide();
        console.log(form.val());
        button.html(formClosed);
        formVisible = false;
        return;
    }

    form.show();
    button.html(formOpen);
    formVisible = true;
}

function init(){
    console.log("Script linked");
    
    // assing events
    $("#important").click(toggleImportant);
    $(".toggleFormButton").click(toggleFormVisible);
    $("#saveBtn").click(saveTask);
    $(".clear-all-tasks-button").click(deleteTasks);
    // load data
    fetchTasks();
}

window.onload=init;