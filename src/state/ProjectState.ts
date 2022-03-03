/* eslint-disable no-restricted-syntax */
import State from '@templateClass/State';
import Project, { ProjectStatus } from '@state/Project';

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

export default projectState;
