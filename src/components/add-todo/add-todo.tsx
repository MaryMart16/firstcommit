import React, { Component, ChangeEvent, FormEvent } from "react";
import "./add-todo.css";
import axios from "axios";
import { store } from "../../redux/store";
import { Unsubscribe } from "redux";
import { ActionType } from "../../redux/action-type";
import { AddTodoDetails } from "../../models/AddTodoDetails";
import { FamilyMember } from "../../models/FamilyMember";

interface AddTodoState {
  familyMembers: FamilyMember[];
  familyMemberID: string;
  todoDescription: string;
}

export default class AddTodo extends Component<any, AddTodoState> {
  private unsubscribeStore: Unsubscribe;

  constructor(props: any) {
    super(props);
    this.state = {
      familyMembers: [],
      familyMemberID: "",
      todoDescription: "",
    };

    this.unsubscribeStore = store.subscribe(() =>
      this.setState({
        familyMembers: store.getState().familyMemebers,
      })
    );
  }

  // componentDidMount = ngOnInit in angular (a reserved word)
  public async componentDidMount() {
    const response = await axios.get<FamilyMember[]>(
      "http://localhost:3001/familymembers/"
    );

    // response.data = all the coupons that were returned from the server
    store.dispatch({
      type: ActionType.GetAllFamilyMembers,
      payload: response.data,
    });
  }

  public onChangeHandler = (args: ChangeEvent<HTMLInputElement>) => {
    const todoDescription = args.target.value;
    this.setState({ todoDescription });
  };

  public onSelectedHandler = (args: ChangeEvent<HTMLSelectElement>) => {
    const familyMemberID = args.target.value;
    this.setState({ familyMemberID });
  };

  public addTodo = async (args: FormEvent<HTMLFormElement>) => {
    try {
      args.preventDefault();

      let addTodoDetails = new AddTodoDetails(
        this.state.familyMemberID,
        this.state.todoDescription
      );

      await axios.post<AddTodoDetails>(
        "http://localhost:3001/todos/",
        addTodoDetails
      );

      this.props.history.push("/mainPage");
    } catch (error) {
      console.error(error);
    }
  };

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  public render() {
    return (
      <div className="Customer">
        <form
          onSubmit={(event) => {
            this.addTodo(event);
          }}
        >
          <div>
            <label>* Select a family member:</label>

            <select
              name="familyMembersSelect"
              onChange={this.onSelectedHandler}
              defaultValue={this.state.familyMemberID}
            >
              <option disabled selected key="default">
                -- select an option --
              </option>

              {this.state.familyMembers.map((familymember, index) => (
                <option value={familymember.id} key={index}>
                  {familymember.firstname}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={this.state.todoDescription}
              onChange={(event) => {
                this.onChangeHandler(event);
              }}
            ></input>

            {this.state.familyMemberID != "" &&
              this.state.todoDescription != "" && <input type="submit"></input>}
          </div>
        </form>
      </div>
    );
  }
}
