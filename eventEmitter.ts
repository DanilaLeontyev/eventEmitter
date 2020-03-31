type Listener = (...args: any[]) => void
type Events = { [event: string]: Listener[] };

export class MyEventEmitter {
  private readonly events: Events = {};

  constructor() {
  }

  public on(event: string, listener: Listener): () => void {
    if (typeof this.events[event] !== 'object') this.events[event] = [];

    this.events[event].push(listener);
    return () => this.removeListener(event, listener);
  }

  public removeListener(event: string, listener: Listener): void {
    if (typeof this.events[event] !== 'object') return;

    const idx: number = this.events[event].indexOf(listener);
    if (idx > -1) this.events[event].splice(idx, 1);
  }

  public removeAllListeners(): void {
    Object.keys(this.events).forEach((event: string) =>
      this.events[event].splice(0, this.events[event].length)
    );
  }

  public emit(event: string, ...args: any[]): void {
    if (typeof this.events[event] !== 'object') return;

    this.events[event].forEach(listener => listener.apply(this, args));
  }

  public once(event: string, listener: Listener): void {
    const remove: (() => void) = this.on(event, (...args: any[]) => {
      remove();
      listener.apply(this, args);
    });
  }
}

const example = new MyEventEmitter();

function logData(data) {
  console.log('1hello + ', data)
}
function logData1(data) {
  console.log('2hello + ', data)
}
function logData2(data) {
  console.log('3hello + ', data)
}
function logData3(data) {
  console.log('4hello + ', data)
}
function logData4(data) {
  console.log('5hello + ', data)
}

example.on('data', logData);
example.on('data1', logData2);
example.on('data2', logData3);
example.on('data3', logData4);
example.on('data6', logData3);
example.on('data4', logData2);
example.on('data5', logData1);

example.emit('data4', 'somenew data');