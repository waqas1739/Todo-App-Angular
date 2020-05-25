export class Task {
    constructor(
      public id: number,
      public content: string,
      public isCompleted: boolean = false
    ) { }
  }