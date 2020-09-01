import React, { Component } from "react";
import "./main-page.css";

import axios from "axios";
import { store } from "../../redux/store";
import { Unsubscribe } from "redux";
import { ActionType } from "../../redux/action-type";
import { Todo } from "../../models/Todo";

interface mainPageState {
  todos: Todo[];
}

export default class MainPage extends Component<any, mainPageState> {
  private unsubscribeStore: Unsubscribe;

  constructor(props: any) {
    super(props);
    this.state = { todos: [] };

    this.unsubscribeStore = store.subscribe(() =>
      this.setState({
        todos: store.getState().todos,
      })
    );
  }

  // componentDidMount = ngOnInit in angular (a reserved word)
  public async componentDidMount() {
    const response = await axios.get<Todo[]>("http://localhost:3001/todos/");
    console.log(response.data);
    // response.data = all the coupons that were returned from the server
    store.dispatch({ type: ActionType.GetAllTodos, payload: response.data });
  }

  public deleteTodo = async (id: number) => {
    try {
      await axios.delete<number>(`http://localhost:3001/todos/${id}`);
      let filteredTodos = [...this.state.todos];
      filteredTodos.forEach((element) => {
        if (element.task_id == id) {
          filteredTodos = filteredTodos.filter((item) => item.task_id !== id);
        }
      });

      store.dispatch({ type: ActionType.DeleteTodo, payload: filteredTodos });

      this.setState({ todos: filteredTodos });
    } catch (error) {
      console.error(error);
    }
  };

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  public render() {
    const smallTD = {
      width: "20px",
    };

    return (
      <div className="Customer">
        <table>
          <thead>
            <tr>
              <th>Member's Firstname</th>
              <th>Todo's Description</th>
              <th>Added on</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.todos.map((todo) => (
              <tr key={todo.task_id}>
                <td>{todo.firstname} </td>
                <td>{todo.todoDescription}</td>
                <td>{todo.start_date}</td>
                <td style={smallTD}>
                  <button
                    type="button"
                    value={todo.task_id}
                    onClick={(event) => {
                      this.deleteTodo(todo.task_id);
                    }}
                  >
                    &times;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
