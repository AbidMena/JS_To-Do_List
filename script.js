document.addEventListener("DOMContentLoaded", setup); 

function setup() { 
    // This function will run after the page loads 
    console.log("Page is fully loaded!"); 

     // Get the input field by its ID 
     const taskInput = document.getElementById("taskInput"); 

     //Get the textarea field by its ID
    const description = document.getElementById("description");

     // Get the "Add Task" button by its ID 
    const addTaskButton = document.getElementById("addTaskButton"); 

    //Get section to add children
    const section = document.querySelector(".column");

    // Get the "Add Task" button by its ID 
    const highlightTasksButton = document.getElementById("highlightTasksButton"); 

    // Get the "Add Task" button by its ID 
    const removeCompletedButton = document.getElementById("removeCompletedButton"); 

     // Test to make sure we have access to these elements 
     console.log("Input field:", taskInput); 
     console.log("Textearea field:", description); 
     console.log("Add Task button:", addTaskButton);
     console.log("Section", section);
     
     // Make the "Add Task" button run a function when clicked 
    addTaskButton.onclick = handleAddTask; 

    // Make the "Highlight Task" button run a function when clicked 
    highlightTasksButton.onclick = highlightTasks;

    removeCompletedButton.onclick = removeCompletedTasks;

    section.addEventListener("click", toggleCompleted);
    
    // Define the function that will run when we click the button 
    function handleAddTask(event) { 
        // Get the value from the input field and trim extra spaces 
        const taskText = taskInput.value.trim(); 

        // Get the value from the textarea field and trim extra spaces 
        const descriptionText = description.value.trim(); 

        // Check if the input is empty or not 
        if (taskText === "" || descriptionText === "") { 
            alert("No task or description entered."); 
        } else { 
            //create a new <article> element
            const article = document.createElement("article");
            //Adding a class to the article element
            article.classList.add("card");

            //create a new <h2> element
            const h2 = document.createElement("h2"); 
            //Adding a class to the h2 element
            h2.classList.add("card_title");
            //Set the text of the <h2> to the task text
            h2.innerText = taskInput.value;

            //create a new div element
            const cardItems = document.createElement("div"); 
            //Adding a class to the div element
            cardItems.classList.add("card_items");

            //create a new <p> element
            const p = document.createElement("p"); 
            //Set the text of the <p> to the description text
            p.innerText = description.value;

            //create button to complete task
            const completeBtn = document.createElement("button");
            completeBtn.innerText = "Complete Task";
            completeBtn.classList.add("completed_btn");
            completeBtn.onclick = () => toggleCompleted;

            // Add the all the elements to the task list 
            cardItems.appendChild(p);
            article.appendChild(h2);
            article.appendChild(cardItems);
            article.appendChild(completeBtn);
            section.appendChild(article);

            //Cleaning input texts
            description.value = "";
            taskInput.value = "";
        } 
        event. preventDefault() ;
    } 

    //Adding and removing css classes when completing task
    function toggleCompleted(event) { 
        if(event.target.tagName.toLowerCase() === "button"){
            event.target.parentElement.classList.toggle("card");
            event.target.parentElement.classList.toggle("completed_task-card");
            event.target.parentElement.childNodes[0].classList.toggle("completed_task-card-title");
            event.target.parentElement.childNodes[1].classList.toggle("completed_task-card-items");
            if(event.target.innerText === "Complete Task"){
                event.target.innerText = "Uncomplete Task";
            } else {
                event.target.innerText = "Complete Task"
            }
        }          
    } 

    //Adding and removing css classes when higlighting task
    function highlightTasks(){
        const completedTasks = document.getElementsByClassName("completed_task-card");
        if(completedTasks.length > 0){
            for(let i = 0; i < completedTasks.length; i++){
                completedTasks[i].childNodes[0].classList.toggle("completed_task-card-title");
                completedTasks[i].childNodes[0].classList.toggle("highlight_task-card-title");
                completedTasks[i].childNodes[1].classList.toggle("completed_task-card-items");
                completedTasks[i].childNodes[1].classList.toggle("highlight_task-card-items");
            }
        }
    }

    //Removing all the completed task
    function removeCompletedTasks(event) { 
        event.stopPropagation();
        const completedTasks = document.getElementsByClassName("completed_task-card");
        if(completedTasks.length > 0){
            let i = completedTasks.length - 1;
            for(let i = completedTasks.length - 1; i >= 0; i--){
                completedTasks[i].remove();    
            }
        }
    } 
} 