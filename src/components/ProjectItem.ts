/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import Component from '@templateClass/Component';
import Autobind from '@decorators/Autobind';
import Project from '@state/Project';
import { Draggable } from '@models/dragDrop';

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

export default ProjectItem;
