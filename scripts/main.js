const iconImportant = "iconImportant fas fa-star";
const iconNotImportant = "iconNotImportant far fa-star";
const formOpen = "Hide Form";
const formClosed = "Show Form";
const taskWidthFormOpen = "max-width: calc(100% - 285px)";
const taskWidthFormClosed = "Max-width: calc(100% - 20px";
let iconImportantState = false;
let formVisible = true;

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

    console.log(task);
    displayTask(task);
    clearFields();
    
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
    console.log(status);
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
                    <label><span class="accent"> Re-occurance:</span> ${getFrequencyText(task.frequency)}</label>
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

function clearFields(){
    $(".inputs > * ").val("");
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
    // load data
}

window.onload=init;