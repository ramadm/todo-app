import { add } from "date-fns";

export class TodoItem {
    constructor(title = "", content = "", priority = 0) {
        this.title = title;
        this.content = content;
        this.priority = priority;
        this.dueDate = add(new Date(), {days: 1});
    }
}

export class Project {
    constructor(title = "", todoList = []) {
        this.title = title;
        this.todoList = todoList;
    }      
}

export class Board {
    constructor(pList=[new Project()], selected="all") {
        this.projectList = pList
        this.selected = selected
    }
}