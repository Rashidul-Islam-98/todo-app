const container=document.querySelector(".container");
const todoForm=document.querySelector(".todoform");
const todoInput=document.querySelector("#todoinput");
const todoButton=document.querySelector("#todobutton");
const todoList=document.querySelector("#lists");
const todoMessage=document.querySelector("#message");

//get todos from localstorage
const getTodos=()=>{
    return localStorage.getItem("mytodos")?JSON.parse(localStorage.getItem("mytodos")) : [];
}
//showmessage
const showMessage=(text,status)=>{
    todoMessage.textContent=text;
    todoMessage.classList.add(`bg${status}`);
    setTimeout(()=>{
        todoMessage.textContent="";
        todoMessage.classList.remove(`bg${status}`);
    },1000);
}
//creating todo
const createTodo=(todoId,todoValue)=>{
    const todoElement=document.createElement("li");
    todoElement.id=todoId;
    todoElement.classList.add("liststyle");
    todoElement.innerHTML=`<span>${todoValue}</span>
    <span><button class="btn" id="deletebutton"><i class="fa fa-trash"></i></button></span>`;
    todoList.appendChild(todoElement);

    const deleteButton=todoElement.querySelector("#deletebutton");
    deleteButton.addEventListener("click",deleteTodo);
}
//delete todos
const deleteTodo=(event)=>{
    const selectedTodo=event.target.parentElement.parentElement.parentElement;
    todoList.removeChild(selectedTodo);
    showMessage("todo is deleted","deleted");
    
    let todos=getTodos();
    todos= todos.filter((todo)=>todo.todoId !== selectedTodo.id);
    localStorage.setItem("mytodos", JSON.stringify(todos));
}
//adding listener
const addTodo=(event)=>{
    event.preventDefault();
    const todoValue=todoInput.value;
    const todoId=Date.now().toString();
    createTodo(todoId,todoValue);
    showMessage("todo is created","success");
    
    //adding todo localstorage
    const todos=getTodos();
    todos.push({todoId,todoValue});
    localStorage.setItem("mytodos", JSON.stringify(todos));
    todoInput.value="";
}
//load todos
const loadTodos=()=>{
   const todos=getTodos();
   todos.map((todo)=>createTodo(todo.todoId,todo.todoValue)); 
}
todoForm.addEventListener("submit",addTodo);
window.addEventListener("DOMContentLoaded",loadTodos);