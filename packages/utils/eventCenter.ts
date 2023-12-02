class EventCenter {
  eventStack:LooseObject = {};

  constructor() {
    this.eventStack = {};
  }

  on(eventName: string | number, callback: any) {
    const { eventStack } = this;
    const eventValue = eventStack[eventName];

    eventValue ? eventValue.push(callback) : (eventStack[eventName] = [callback]);
  }

  once(eventName: string | number, callback: () => void) {
    const { eventStack } = this;
    const eventValue = eventStack[eventName];
    // 利用闭包的形式 来模拟一次性监听的功能函数
    const temporaryCallback = () => {
      let isOutOfDate = false;

      return () => {
        if (isOutOfDate) return;
        callback();
        isOutOfDate = true;
      };
    };

    eventValue ? eventValue.push(temporaryCallback()) : (eventStack[eventName] = [temporaryCallback()]);
  }

  off(eventName: string | number, callback: any) {
    const { eventStack } = this;
    const eventValue = eventStack[eventName];

    if (!eventValue) return;
    (eventValue || []).forEach((eventCallback: any, index: any) => {
      if (eventCallback === callback) {
        eventValue.splice(index, 1);
      }
    });
  }

  emit(eventName: string | number, data: any) {
    const { eventStack } = this;
    const eventValue = eventStack[eventName];

    if (!eventValue) return;
    (eventValue || []).forEach((eventCallback: (arg0: any) => void) => {
      eventCallback(data);
    });
  }
}

export default EventCenter;
