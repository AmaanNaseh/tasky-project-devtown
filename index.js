// console.log("Check");

// Section 1 : Fn to store user input & display on save changes
// It has object having key value pair, along with unique id for each card.
// Using camelCasing in object key names to keep it diff. from id

const taskContainer = document.querySelector(".task__container"); // fetching card container/body to modify.
// console.log(taskContainer); // Debugging purpose

const globalStore = []; 
// Creating array of objects just below task container, we'll store required objects in it.
// Name globalStore as it's storing data globally, no effect of refresh.

// using taskData below so here too.
const generateNewCard = (taskData) => `
    <div class="col-sm-12 col-md-6 col-lg-4" id=${taskData.id}>

                    <div class="card">
                        <div class="card-header d-flex justify-content-end gap-2">
                            <button type="button" class="btn btn-outline-success"><i
                                    class="fa-solid fa-pencil"></i></button>
                            <button type="button" class="btn btn-outline-danger"><i
                                    class="fa-solid fa-trash-alt"></i></button>
                            
                        </div>
                        <div class="card-body">
                            <img src=${taskData.imageUrl}
                                class="card-img-top" alt="">
                            <h5 class="card-title mt-3 fw-bold text-primary">${taskData.taskTitle}</h5>
                            <p class="card-text">${taskData.taskDescription}</p>
                            <a href="#" class="btn btn-primary">${taskData.taskType}</a>
                        </div>
                    </div>
                </div>
    `;

// {} work with backtick`` only if we return it.

// We want this fn to be loaded on body whenever we refresh our screen.
const loadInitialCardData = () => {
   // Step 1 : localStorage to get tasky card data
    const getCardData = localStorage.getItem("tasky");
   
   // Step 2 : convert to normal object (nested)
    const {cards} = JSON.parse(getCardData); // de-structured format : cards is object having parsed data in it & act as object of objects.
 
    // converting string to normal object : string is array.


   // Step 3 : loop over those array of card object to create HTML card & inject it to DOM. Best method is map & de-structuring for looping.
   // .map is used to iterate/loop over entire cards object of objects
   // Step 4 : Update globalStore
    cards.map((cardObject) => {
        taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject)); //newCard
        // exact same thing is configured for reload & add same card. generateNewCard is modification of newCard fn 
        // (only newCard can also be used, but it's local variable so we have to create a function & call as per need here & in save changes).
        
        // cardObject is each entity/element inside object/array named cards.
        globalStore.push(cardObject); // update globalStore by putting card object in it when card is added to screen.
    }
    )
};

// Whenever we update, globalStore is updated with whatever values we had previously & that values are stored inside local storage.

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value
    };
    // console.log(taskData); // Testing purpose

    
// Section 2 : New Card as per modal input

    // const newCard is made a fn rather than local variable.

    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData)); // we want to add new card just after taskContainer, 
    //just before ending of taskContainer. For 1st time, taskContainer is previous else every time code runs,
    // latest taskContainer is considered.

    globalStore.push(taskData); // Just pushed in array, no local storage reln.
    // To insert taskData in globalStore, normal .push method for pushing object as normal array.

    localStorage.setItem("tasky", JSON.stringify({cards:globalStore})); // tasky is unique id related to our localStorage only in online too.
    // Now value is printed.
};

// Filling modal inputs in these keys :
// We want this fn to execute when Save Changes button is triggered.

// `` is used as multi line & line breaks, etc. Now change data as per object i.e. id in parent div.col, all input fields, etc.
// ${} is used as dynamic/changing data (no need for static data).
// No need of src="${taskData.imageUrl}" as input type is url so normal data os enough.

// How to push new card next to previous card in html code : .insertAdjacentHTML("position", what_to_add); method