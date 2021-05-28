// 1 - refer input
let input = document.querySelector('input[name=task]');

// 2 - refer button
let btn = document.querySelector('#button');

// 3 - refer list
let list = document.querySelector('#list');

// 4 - refer the card class div
let card = document.querySelector('.card');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks(){
    // Clear the list before render the screen
    list.innerHTML = '';

    for(task of tasks){
        // Create the item list
        let itemList = document.createElement('li');

        // Add list item classes
        itemList.setAttribute('class', 'list-group-item list-group-item-action');
        
        // Add onclick event in the list item
        itemList.onclick = function(){
            deleteTask(this);
        };

        // Create text
        let itemText = document.createTextNode(task);
        
        // Add text in the item list
        itemList.appendChild(itemText);
        
        // Add item on the list
        list.appendChild(itemList);
    };
};

input.addEventListener("keyup", function(key) {
    if (key.keyCode === 13) btn.click();
})

// Call the function to render the tasks
renderTasks();

// 5 - Listen the event button onclick
btn.onclick = function(){
    // 6 - Get the input value typed
    let newTask = input.value;

    // Validate the entry
    if(newTask !== ""){
        // 7 - Update the new task on the task list array
        tasks.push(newTask);
    
        // 8 - re-render the screen
        renderTasks();
    
        // Clear the input value
        input.value = '';

        // CLear the error messages (spans)
        clearErrors();

        // Save new data on the storage
        saveStorageData();
    }else{
        // CLear the error messages (spans)
        clearErrors();
        // Lack of text error message
        // Create a span element
        let span = document.createElement('span');
        // Set Bootstrap classes for this element
        span.setAttribute('class', 'alert alert-warning');
        // Create the span text
        let msg = document.createTextNode('You have to type the task.');
        // Insert the text into the span
        span.appendChild(msg);
        // Insert the span into the div
        card.appendChild(span);
    };
};

function clearErrors(){
    let spans = document.querySelectorAll('span');
    for (let i = 0; i < spans.length; i++){
        card.removeChild(spans[i]);
    };
};

function deleteTask(task){
    // Remove the task from the tasks array
    tasks.splice(tasks.indexOf(task.textContent), 1);

    // Render the tasks again
    renderTasks();

    // Save new data on the storage
    saveStorageData();

    // Clear the errors
    clearErrors();
};

function saveStorageData(){
    // All web browsers have a local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}