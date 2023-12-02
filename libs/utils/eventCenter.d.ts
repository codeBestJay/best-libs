declare class EventCenter {
    eventStack: LooseObject;
    constructor();
    on(eventName: string | number, callback: any): void;
    once(eventName: string | number, callback: () => void): void;
    off(eventName: string | number, callback: any): void;
    emit(eventName: string | number, data: any): void;
}
export default EventCenter;
