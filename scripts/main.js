const iconImportant = "iconImportant fas fa-star";
const iconNotImportant = "iconNotImportant far fa-star";
const formOpen = "Hide Form";
const formClosed = "Show Form";
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

    console.log(
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