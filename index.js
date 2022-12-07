// Timer
class Timer {
  constructor(root) {
    /* console.log(root); // print div => .timer */
    root.innerHTML = Timer.getHTML();

    this.el = {
      minutes: root.querySelector(".Timer--Part__minutes"),
      seconds: root.querySelector(".Timer--Part__seconds"),
      control: root.querySelector(".timer--btn__control"),
      input: root.querySelector(".timer--btn__reset"),
      resetAll: root.querySelector(".timer--btn__resetAll"),
    };

    this.interval = null;
    this.remainingSeconds = 0;

    this.el.control.addEventListener("click", () => {
      if (this.interval === null) {
        this.start();
      } else {
        this.stop();
      }
    });

    this.el.input.addEventListener("click", () => {
      const inputMinutes = prompt("Enter Number of minutes");
      if (inputMinutes < 1) return;
      if (inputMinutes <= 60) {
        this.stop();
        this.remainingSeconds = inputMinutes * 60;
        this.updateInterfaceTime();
      }
    });

    this.el.resetAll.addEventListener("click", () => {
      this.el.minutes.textContent = "00";
      this.el.seconds.textContent = "00";
      this.stop();
    });
  }

  updateInterfaceTime() {
    // للتحكم بكيفية ظهور الوقت وحسابها
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    // padStart => اذا لم يكن الرقم مكون من خانتين ضيف صفر ببداية الرقم من الشمال
    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  updateInterfaceControl() {
    // للتحكم بظهور زر التحكم الصحيح حسب قيمة ال interval
    if (this.interval === null) {
      this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
      this.el.control.classList.add("timer--btn__start");
      this.el.control.classList.remove("timer--btn__stop");
    } else {
      this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
      this.el.control.classList.add("timer--btn__stop");
      this.el.control.classList.remove("timer--btn__start");
    }
  }

  start() {
    if (this.remainingSeconds === 0) return;
    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();

      if (this.remainingSeconds === 0) {
        this.stop();
      }
    }, 1000);
    this.updateInterfaceControl();
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
    this.updateInterfaceControl();
  }

  static getHTML() {
    return `
    <div class="div-1">
        <span class="Timer--Part Timer--Part__minutes">00</span>
        <span class="Timer--Part">:</span>
        <span class="Timer--Part Timer--Part__seconds">00</span>
    </div>
    <div class="div-2">
        <button type="button" class="timer--btn timer--btn__control timer--btn__start">
            <span class="material-icons">play_arrow</span>
        </button>
        <button type="button" class="timer--btn timer--btn__reset">
            <span class="material-icons">timer</span>
        </button>
        <button type="button" class="timer--btn timer--btn__resetAll">Reset</button>
    </div>`;
  }
}
let time = new Timer(document.querySelector(".timer"));
/* console.log(time); */
