

const form = document.querySelector("form");
const input=document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNesTast");
const btnDeleteAll=document.querySelector("#btnDeleteAll");
const taskList=document.querySelector("#task-list");
let todos;


//load items
loadItems();

eventListeners();
function eventListeners(){
    //Submit
   form.addEventListener("submit",addNewItem);
   //Delete
   taskList.addEventListener("click",deleteItem);
   //Delete all
   btnDeleteAll.addEventListener("click",deleteAllItems);
    
}

function loadItems(){
    todos = getItemsFromLS();
        todos.forEach(function(item){
            creatItem(item);
        })
}

// Get items from local storage
function getItemsFromLS(){
         if(localStorage.getItem("todos")=== null){
            todos = [];

         }
         else{
            todos =JSON.parse(localStorage.getItem("todos"))
         }
         return todos;
}
// Set item to local storage
function setItemToLS(newToDo){
   todos = getItemsFromLS();
   todos.push(newToDo);
   localStorage.setItem("todos",JSON.stringify(todos));

}


function creatItem(newToDo){
       // li oluşturma

    const li= document.createElement("li");
    li.className="list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(newToDo));

    // a oluşturma

    const a=document.createElement("a");
    a.classList="delete-item float-right";
    a.setAttribute("href","#");
    a.innerHTML='<i class="fas fa-times"></i>';

    li.appendChild(a);
    
    taskList.appendChild(li);
}

function addNewItem(e){
    if(input.value===''){
        alert("Lütfen boş değer girmeyin");
        //console.log("submit");
    }

    //create Item

    creatItem(input.value);

    setItemToLS(input.value);

    
    input.value= "";


    e.preventDefault();
}

   //Eleman silme
   function deleteItem(e){
   
         if(e.target.className === "fas fa-times"){
            if(confirm("Silmek istediğinize emin misiniz?")){
         e.target.parentElement.parentElement.remove();
    }}
    
        e.preventDefault();
   }
     
   // Tüm elemanları silme 

   function deleteAllItems(e){
    if(confirm("Tüm elemanları silmek istediğinize emin misiniz?"))
        {
           taskList.childNodes.forEach(function(item){
            if(item.nodeType ===1){
                item.remove();
            }
           })
    }
   }