import React, { Component } from "react";
import "./menu.css";
import { NavLink } from "react-router-dom";
import { store } from "../../redux/store";

export default class Menu extends Component {
  constructor(prop: any) {
    super(prop);

    store.subscribe(() =>
      this.setState({
        todos: store.getState().todos,
      })
    );
  }

  public render() {
    return (
      <div className="menu">
        <NavLink to="/mainPage" exact>
          View Todos ({store.getState().todos.length})
        </NavLink>
        <NavLink to="/add-todo" exact>
          Add Todo
        </NavLink>
      </div>
    );
  }
}
