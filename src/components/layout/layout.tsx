import React, { Component } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import "./layout.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import Menu from "../menu/menu";
import AddTodo from "../add-todo/add-todo";
import MainPage from "../main-page/main-page";

export default class Layout extends Component {
  public render() {
    return (
      <BrowserRouter>
        <section className="layout">
          <header>
            <Header displayedText="Welcome" />
          </header>

          <aside>
            <Menu />
          </aside>

          <main>
            <Switch>
              <Route path="/add-todo" component={AddTodo} exact />
              <Route path="/mainPage" component={MainPage} exact />
              <Redirect from="/" to="/mainPage" exact />
              <Redirect from="**" to="/mainPage" exact />
            </Switch>
          </main>

          <footer>
            <Footer />
          </footer>
        </section>
      </BrowserRouter>
    );
  }
}
