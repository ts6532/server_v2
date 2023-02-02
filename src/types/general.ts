export interface IMessage {
  message: string;
}

export interface IEntity<T> {
  [key: string]: T;
}
