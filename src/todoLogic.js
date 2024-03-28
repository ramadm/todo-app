import { add } from "date-fns";

export class todoItem {
    constructor(title = "", content = "", priority = 0) {
        this.title = title;
        this.content = content;
        this.priority = priority;
        this.dueDate = add(new Date(), {days: 1});
    }
}

export class project {
    constructor(title = "", todoList = []) {
        this.title = title;
        this.todoList = todoList;
    }      
}

export class board {
    constructor(pList=[new project()], selected="all") {
        this.projectList = pList
        this.selected = selected
    }
}