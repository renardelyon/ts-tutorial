/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
import Autobind from './decorators/Autobind';

type UserInput = {
    title: string,
    description: string,
    people: number;
}

enum ProjectStatus {
    Active,
    Finished
}

type Listener<T> = (items: T[]) => void;

interface Draggable {
  dragStartHandler: (event: DragEvent) => void;
  dragEndHandler: (event: DragEvent) => void;
}

interface DragTarget {
  dragOverHandler: (event: DragEvent) => void;
  dropHandler: (event: DragEvent) => void;
  dragLeaveHandler: (event: DragEvent) => void;
}

abstract class State<T> {
  protected listeners: Listener<T>[];

  constructor() {
    this.listeners = [];
  }

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class Project {
  public id: string;

  public title: string;

  public description: string;

  public people: number;

  public status: ProjectStatus;

  constructor(
    id: string,
    title: string,
    description: string,
    people: number,
    status: ProjectStatus
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.people = people;
    this.status = status;
  }
}

class ProjectState extends State<Project> {
  private projects: Project[];

  private static instance: ProjectState;

  private constructor() {
    super();
    this.projects = [];
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListener();
  }

  moveProject(prjId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((val) => val.id === prjId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListener();
    }
  }

  private updateListener() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  private templateElement: HTMLTemplateElement;

  protected element: T;

  private hostElement: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string,
  ) {
    this.templateElement = document.getElementById(templateId) as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId) as U;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as T;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtStart: boolean) {
    this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
  }

  abstract configure(): void;

  abstract renderContent?(): void;
}

class ProjectItem extends Component<HTMLLIElement, HTMLUListElement> implements Draggable {
  get person() {
    if (this.project.people === 1) {
      return '1 person';
    }
    return `${this.project.people} persons`;
  }

  constructor(hostId: string, private project: Project) {
    super('single-project', hostId, false, project.id);

    this.configure();
    this.renderContent();
  }

  @Autobind
  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = `${this.person} assigned`;
    this.element.querySelector('p')!.textContent = this.project.description;
  }

  @Autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  dragEndHandler(event: DragEvent) {
    console.log(event);
  }
}

class ProjectList extends Component<HTMLElement, HTMLDivElement> implements DragTarget {
  private assignedProjects: Project[];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  configure(): void {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(((val) => {
        if (this.type === 'active') {
          return val.status === ProjectStatus.Active;
        }
        return val.status === ProjectStatus.Finished;
      }));
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = `${this.type.toUpperCase()} PROJECT`;
  }

  @Autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @Autobind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer?.getData('text/plain')!;
    projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
  }

  @Autobind
  dragLeaveHandler(event: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`) as HTMLUListElement;
    listEl.innerHTML = '';
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
    }
  }
}

class ProjectInput extends Component<HTMLElement, HTMLDivElement> {
  private titleInputElement: HTMLInputElement;

  private descriptionInputElement: HTMLInputElement;

  private peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent() {
    console.log('render', this.element);
  }

  private gatherUserInput(): UserInput {
    const title = this.titleInputElement.value;
    const description = this.descriptionInputElement.value;
    const people = parseInt(this.peopleInputElement.value);

    return {
      title,
      description,
      people
    };
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @Autobind
  private submitHandler(e: Event) {
    e.preventDefault();
    if (Object.entries(this.gatherUserInput()).every((val) => val[1])) {
      const { title, description, people } = this.gatherUserInput();
      projectState.addProject(title, description, people);
      this.clearInputs();
    } else {
      alert('Filled all field');
    }
  }
}

const project = new ProjectInput();
const projectList = new ProjectList('active');
const finished = new ProjectList('finished');
