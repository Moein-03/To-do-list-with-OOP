class Task {
    constructor(TaskTitle) {
        this.Title = TaskTitle;
        this.condition = false;
    }
}

class ToDo  {
    constructor(TaskContainer) {
        this.todos = JSON.parse(localStorage.getItem('ToDos')) || [];
        this.container = TaskContainer;
        this.addButton = document.getElementById('addItem');
        this.clearButton = document.getElementById('clearItems');
        this.InputTxt = document.getElementById('txt');

        this.render()
    }

    render() {
        this.addButton.addEventListener('click', () => {
            if(this.InputTxt.value != "") {
                this.AddNewItem(this.InputTxt.value)
            }
        });

        this.clearButton.addEventListener('click' , () => {
            this.DeleteAllItems()
        });

        this.ToDoInList();
        this.saveToDoInStorage();
    }

    AddNewItem(textVal) {
        if(textVal.trim() && isNaN(textVal)) {
            this.InputTxt.value = '';

            this.todos.push(new Task(textVal));

            this.saveToDoInStorage();
            this.render();
        }
    }

    saveToDoInStorage() {
        localStorage.setItem('ToDos', JSON.stringify(this.todos));
    }

    DeleteAllItems() {
        this.todos = [];

        this.saveToDoInStorage();
        this.render();
    }

    ToDoInList() {
        this.container.innerHTML = "";

        this.todos.forEach(element => {
            let MainDiv = document.createElement('div');
            MainDiv.className = 'Item';
            
            let TextDiv = document.createElement('div');
            TextDiv.className = 'ItemText';
            TextDiv.innerHTML = element.Title;
            
            let CompleteBtn = document.createElement('button');
            CompleteBtn.className = 'CompeleteItem';
    
            element.condition ? TextDiv.classList.add('completeCondition') : TextDiv.classList.remove('completeCondition');
            element.condition ? (CompleteBtn.innerHTML = `Uncomplete`) : (CompleteBtn.innerHTML = `Complete`);

            CompleteBtn.addEventListener('click', () => {
                element.condition = !element.condition;

                this.saveToDoInStorage();
                this.ToDoInList();
            })

            let DeleteBtn = document.createElement('button');
            DeleteBtn.className = 'DeleteItem';
            DeleteBtn.innerHTML = 'Delete';

            DeleteBtn.addEventListener('click', () => {
                let DeletedItem = this.todos.findIndex(ThisToDo => ThisToDo == element);

                this.todos.splice(DeletedItem , 1);

                this.saveToDoInStorage();
                this.ToDoInList();
            })

            MainDiv.append(TextDiv,CompleteBtn,DeleteBtn);

            this.container.append(MainDiv);
        });
    }
}

new ToDo(document.getElementById('sec2'));
