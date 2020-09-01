import { Todo } from "../models/Todo";
import { FamilyMember } from "../models/FamilyMember";
import { AddTodoDetails } from "../models/AddTodoDetails";

export class AppState {
  public todos: Todo[] = [];
  public familyMemebers: FamilyMember[] = [];
  public addTodoDetails: AddTodoDetails;
  public isLoaded: boolean = false;
}
