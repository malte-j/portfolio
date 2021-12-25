import React from "react";
import * as basicScroll from "basicscroll";
import { StaticImage } from "gatsby-plugin-image";

export default class Window extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: true };
    this.ready = this.ready.bind(this);
  }

  componentDidMount() {
    basicScroll
      .create({
        elem: document.querySelector(".bot"),
        direct: true,
        from: 0,
        to: 1000,
        props: {
          "--tx": {
            from: "0",
            to: "300px",
            direct: true,
          },
        },
      })
      .start();

    basicScroll
      .create({
        elem: document.querySelector(".top"),
        direct: true,
        from: 0,
        to: 1000,
        props: {
          "--tx": {
            from: "0",
            to: "120px",
            direct: true,
          },
        },
      })
      .start();
  }

  ready() {
    this.setState({
      loaded: true,
    });
  }

  render() {
    return (
      <div className={`window ${this.state.loaded ? "" : "loading"}`}>
        <StaticImage
          src="../../static/bottom.png"
          className="bot"
          width={920}
          placeholder="blurred"
          quality={90}
          style={{
            "--tx": "0",
          }}
          alt="bottom header image"
        />
        <StaticImage
          src="../../static/top.png"
          className="top"
          width={920}
          placeholder="blurred"
          alt="top header image"
          style={{
            "--tx": "0",
          }}
          onLoad={this.ready}
        />
      </div>
    );
  }
}
