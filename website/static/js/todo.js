
const todoInput = document.getElementById("todo_input");
const tbody = document.getElementById("todo_list");

const todoList = [{}]
const myStorage = window.sessionStorage;



function createRow(todo){
    const newRow = document.createElement('tr');
    newRow.id = todo.index;

    const index = document.createElement('th');
    index.scope = "row";
    index.innerText = todo.index;

    const item = document.createElement('th');
    index.scope = "row";
    item.innerText = todo.item;

    const completed = document.createElement('th');
    index.scope = "row";
    completed.innerText = todo.completed;

    newRow.appendChild(index);
    newRow.appendChild(item);
    newRow.appendChild(completed);

    //Add to html
    tbody.appendChild(newRow);
}

function addTodo(){

    if(todoInput.value != ""){
        const newTodo = {index: todoList.length, item: htmlEncode(todoInput.value), completed: false};
        createRow(todo = newTodo);
        todoList.push(newTodo);
    }
    todoInput.value = "";
}

function htmlEncode(str){
    return String(str).replace(/[^\w. ]/gi, function(c){
       return '&#'+c.charCodeAt(0)+';';
    });
  }
