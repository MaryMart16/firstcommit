import React, { Component } from "react";
import "./header.css";

interface HeaderProps {
  displayedText: string;
}

export default class Header extends Component<HeaderProps> {
  public constructor(props: HeaderProps) {
    super(props);
  }

  public render() {
    return <div className="header">{this.props.displayedText}</div>;
  }
}
