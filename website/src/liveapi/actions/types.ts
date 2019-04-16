export interface Action<T> {
  type: string;
  payload: T;
}

// export abstract class BaseAction<T> {
//   type: string;
//   constructor(readonly payload: T) {}

//   toString(): string {
//     return this.type;
//   }
// }

// export class Foo extends BaseAction<string> {
//   type: 'foo';
//   constructor(payload: string) { super(payload); }
// }

// interface Act<T> {
//   type: string;
//   payload: T;
// }

// type Maker<T> = (payload: T) => Act<T>;

// const actionMaker = <T>(type: string): Maker<T> => {
//   const f = (payload: T) => ({ type, payload, toString: () => type } as Act<T>);
//   f.toString = () => type;
//   return f;
// };
