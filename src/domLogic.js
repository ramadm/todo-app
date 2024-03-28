import 'material-symbols';
import { compareAsc, endOfDay, format, formatDistance } from "date-fns";

function todoElem(todo, todoID) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.id = todoID;

    const titleElem = document.createElement("input");
    titleElem.classList.add("title");
    titleElem.setAttribute("value", todo.title);
    titleElem.setAttribute("placeholder", "Untitled");
    todoDiv.appendChild(titleElem);

    const contentElem = document.createElement("input");
    contentElem.classList.add("content");
    contentElem.setAttribute("value", todo.content);
    contentElem.setAttribute("placeholder", "Write a description");
    todoDiv.appendChild(contentElem);

    const dueDateElem = document.createElement("button");
    dueDateElem.classList.add("dueDate");
    dueDateElem.textContent = "Due: " + formatDistance(endOfDay(todo.dueDate), new Date(), {addSuffix:true});
    todoDiv.appendChild(dueDateElem);
    
    const prioElem = document.createElement("button");
    prioElem.classList.add("priority");
    prioElem.id = "prio" + todo.priority;
    const warningIcon = document.createElement("span");
    warningIcon.classList.add("material-symbols-outlined");
    warningIcon.classList.add("warning");
    warningIcon.textContent = "warning";
    prioElem.appendChild(warningIcon);
    const prioText = document.createElement("p");
    prioText.textContent = "Priority " + (todo.priority + 1);
    prioElem.appendChild(prioText);
    todoDiv.appendChild(prioElem);
    const removeButton = document.createElement("button");
    removeButton.classList.add("removeButton");
    const closeIcon = document.createElement("span");
    closeIcon.classList.add("material-symbols-outlined");
    closeIcon.classList.add("close");
    closeIcon.textContent = "close";
    removeButton.appendChild(closeIcon);
    todoDiv.appendChild(removeButton);

    return todoDiv;
}

function projElem(proj, projID) {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("projectOuter");
    projectDiv.id = projID;

    const topBar = document.createElement("div");
    topBar.classList.add("projTitleBar");
    const projTitle = document.createElement("input");
    projTitle.setAttribute("value", proj.title);
    projTitle.setAttribute("placeholder", "Untitled Project");
    projTitle.classList.add("projTitle");
    topBar.appendChild(projTitle);

    projectDiv.appendChild(topBar);

    const listDiv = document.createElement("div");
    listDiv.classList.add("project");
    for (let i = 0; i < proj.todoList.length; i++) {
        const todoDiv = todoElem(proj.todoList[i]);
        todoDiv.id = i;
        listDiv.appendChild(todoDiv);
    }
    const addButton = document.createElement("button");
    addButton.textContent = "+ Add Note";
    addButton.classList.add("addButton");
    listDiv.appendChild(addButton);
    projectDiv.appendChild(listDiv);

    return projectDiv;
}

export function renderProjDisplay(projDisplay, board) {
    if (board.selected === "all") {
        projDisplay.textContent = "All Projects";
    } else {
        const currProj = board.projectList[board.selected];
        projDisplay.textContent = (currProj.title === "") ?
            "Untitled Project" : currProj.title;
    }
}

export function renderSideBar(navBar, board) {
    navBar.innerHTML = "";
    const navTitle = document.createElement("h1");
    navTitle.textContent = "Welcome";
    navBar.appendChild(navTitle);

    const allProjects = document.createElement("button");
    allProjects.classList.add("navButton");
    allProjects.id = "all";
    allProjects.textContent = "View all projects";
    const selected = board.selected;
    if (selected === "all") {
        allProjects.classList.add("currProj");
    }
    const projList = board.projectList;
    navBar.appendChild(allProjects);
    for (let i = 0; i < projList.length; i++) {
        const projNavDiv = document.createElement("div");
        projNavDiv.classList.add("projNavDiv");
        projNavDiv.id = i;

        const projButton  = document.createElement("button");
        projButton.classList.add("navButton");
        if (selected == i) {
            projButton.classList.add("currProj");
        }
        projButton.id = i;
        projButton.textContent = `View ${projList[i].title}`;
        if (projList[i].title === "") {
            projButton.textContent = "View Untitled Project";
        }
        projNavDiv.appendChild(projButton);

        const delProjButton = document.createElement("button");
        delProjButton.classList.add("deleteProj");
        delProjButton.id = i;
        const deleteIcon = document.createElement("span");
        deleteIcon.classList.add("material-symbols-outlined");
        deleteIcon.textContent = "delete";
        delProjButton.appendChild(deleteIcon);
        projNavDiv.appendChild(delProjButton);

        navBar.appendChild(projNavDiv);
    }

    const addProjButton = document.createElement("button");
    addProjButton.textContent = "+ Add Project";
    addProjButton.classList.add("addProj");
    navBar.appendChild(addProjButton);
}


export function renderBoard(contentDiv, board) {
    contentDiv.innerHTML = "";

    const projList = board.projectList;
    for (let i = 0; i < projList.length; i++) {
        if (board.selected === "all" || board.selected == i) {
            const projectDiv = projElem(projList[i], i);
            contentDiv.appendChild(projectDiv);
        }
    }
}

