export interface ITask {
  id: number;
  description: string;
  order: number;
  completed: boolean;
}

export interface ITaskList {
  list: ITask[];
  done: () => number;
}
