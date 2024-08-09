export class Popup {
  visible: boolean = false;
  numberOfButtons: number = 1;
  button2Action!: () => void;
  button2Text!: string;
  text!: string;
  iconType!: string;
  title!: string;

  constructor(data?: Partial<Popup>) {
    Object.assign(this, data);
  }
}
