import Component from '@templateClass/Component';
import Autobind from '@decorators/Autobind';
import projectState from '@state/ProjectState';

type UserInput = {
    title: string,
    description: string,
    people: number;
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

export default ProjectInput;
