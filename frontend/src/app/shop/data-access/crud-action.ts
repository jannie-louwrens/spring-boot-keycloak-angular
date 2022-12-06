type ActionType = "add" | "update" | "delete" | "none";

export interface CrudAction<T> {
  item: T;
  action: ActionType;
}
