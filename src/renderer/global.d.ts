declare let window: Window;
export interface IElectron {
  myPing(): void;
}
declare global {
  interface Window {
    electron: IElectron;
    process: any;
    require: any;
  }
}
