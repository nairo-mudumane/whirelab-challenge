export interface DbData<T = number | string> {
  id: T;
  createdAt: Date;
  updatedAt: Date;
}

export type DbDataKeys = "id" | "createdAt" | "updatedAt";

export type UndoPartial<T> = {
  [P in keyof T]-?: T[P];
};
