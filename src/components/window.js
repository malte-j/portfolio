import React from "react";
import * as basicScroll from "basicscroll";
// import { StaticQuery, graphql } from "gatsby";
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
        {/* <Img className="bot" loading="eager" fluid={this.props.images.bottom.childImageSharp.fluid}/>
          <Img className="top" onLoad={this.ready} loading="eager" fluid={this.props.images.top.childImageSharp.fluid}/> */}

        <StaticImage
          src="../../static/bottom.png"
          className="bot"
          width={460}
          quality={90}
          
          blurredOptions={{
            toFormat: "jpg"
          }}
          alt="A kitten"
        />
        <StaticImage
          src="../../static/top.png"
          className="top"
          width={460}
          alt="A kitten"
          blurredOptions={{
            toFormat: "jpg"
          }}
          onLoad={this.ready}
        />
      </div>
    );
  }
}

// export default () => (
//   <StaticQuery
//     query={graphql`
//       query MyQuery {
//         bottom: file(relativePath: { eq: "bottom.png" }) {
//           childImageSharp {
//             fluid(maxWidth: 470) {
//               ...GatsbyImageSharpFluid_withWebp
//             }
//           }
//         }
//         top: file(relativePath: { eq: "top.png" }) {
//           childImageSharp {
//             fluid(maxWidth: 470, quality: 80) {
//               ...GatsbyImageSharpFluid_withWebp
//             }
//           }
//         }
//       }
//     `}
//     render={(images) => <Window images={images} />}
//   />
// );
