// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// var global_number = 0;

let todos = [];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById("delete").addEventListener('click', function (event) {
    // check if the event is on checkbox
    // if (event.target.type === 'checkbox') {
        
    //     toggle(event.target.parentElement.getAttribute('data-key'));
    // }

    // check if that is a delete-button
    if (event.target.classList.contains('delete')) {
        // get id from data-key attribute's value of parent <li> where the delete-button is present
        remove(event.target.parentElement.getAttribute('data-key'));
    }
});

function myFunction() {
    var txt = document.getElementById("txtbox").value;
    if (txt != "" && txt != " ") {
        const todo = {
            id: Date.now(),
            name: txt,
            completed: false
        };
        todos.push(txt);
        addToLocalStorage(todos);
        document.getElementById("txtbox").value = "";
    }

    else {
        // When the user clicks the button, open the modal 
        modal.style.display = "block";
    }
}
function cleartable() {
    localStorage.clear();
    location.reload();
}


function remove(id) {
    // localStorage.removeItem(item);
    todos = todos.filter(function (item) {
        // use != not !==, because here types are different. One is number and other is string
        return item.id != id;
    });

    // remove
    // var elem = document.getElementById("myDiv");
    // elem.parentNode.removeChild(elem);

    // update the localStorage
    addToLocalStorage(todos);
    location.reload();
}


function renderTodos(todos) {
    var txt = document.getElementById("txtbox").value;
    var tbodyRef = document.getElementById('list').getElementsByTagName('tbody')[0];

    // run through each item inside todos
    todos.forEach(function (item) {
        // check if the item is completed
        var btn = [2];
        btn[0] = document.createElement("button");
        btn[0].textContent = "delete";
        btn[0].id = "delete";//change
        btn[0].className = "delete";
        // btn[0].setAttribute("onclick", "remove(" + item + ")");
        console.log(item);
        btn[1] = document.createElement("button");
        btn[1].textContent = ("Edit");
        btn[1].id = "Edit";//change
        btn[1].className = "Edit";
        // creat textbox
        var textbox = document.createElement("input");
        textbox.value = (item);
        textbox.id = "Task-text";
        textbox.className = "Task";
        textbox.disabled = true;

        var tr = document.createElement("tr");
        tr.id = "new-row-"+item;
        // const name = "New-row" + a
        // tr.id=name;
        var cell = [3];
        for (var i = 0; i < 3; i++) {
            cell[i] = document.createElement("td");
            cell[i].id = "Cell" + i
        }

        cell[0].textContent = (1);
        cell[1].appendChild(textbox);
        cell[2].appendChild(btn[0]);
        cell[2].appendChild(btn[1]);

        tbodyRef.appendChild(tr);
        tr.appendChild(cell[0]);
        tr.appendChild(cell[1]);
        tr.appendChild(cell[2]);
        document.getElementById("txtbox").value = "";
    });

}

function addToLocalStorage(todos) {
    // conver the array to string then store it.
    localStorage.setItem('todos', JSON.stringify(todos));
    // render them to screen
    renderTodos(todos);
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    // if reference exists
    if (reference) {
        // converts back to array and store it in todos array
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

function toggle(id) {
    todos.forEach(function(item) {
      // use == not ===, because here types are different. One is number and other is string
      if (item.id == id) {
        // toggle the value
        item.completed = !item.completed;
      }
    });
  
    addToLocalStorage(todos);
  }