type Listener<T> = (items: T[]) => void;

abstract class State<T> {
  protected listeners: Listener<T>[];

  constructor() {
    this.listeners = [];
  }

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export default State;
