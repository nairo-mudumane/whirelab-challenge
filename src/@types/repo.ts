import { DbData, DbDataKeys } from "./general";

export interface IRepo extends DbData {
  title: string;
  url: string;
  techs: Array<string>;
  likes: number;
}

export type INewRepo = Partial<Omit<IRepo, DbDataKeys>>;

export type IUpdateRepo = Partial<Omit<INewRepo, "likes">>;
