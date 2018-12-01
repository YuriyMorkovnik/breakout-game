export default class KeyboardManager {
  constructor() {
    if(KeyboardManager.instance) {
      return KeyboardManager.instance;
    }
    this.isLeftArrowPressed = false;
    this.isRightArrowPressed = false;

    KeyboardManager.instance = this;
  }

  setLeftArrowPressed() {
    this.isLeftArrowPressed = true;
  }

  setLeftArrowNotPressed() {
    this.isLeftArrowPressed = false;
  }

  setRightArrowPressed() {
    this.isRightArrowPressed = true;
  }

  setRightArrowNotPressed() {
    this.isRightArrowPressed = false;
  }
}
