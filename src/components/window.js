import React from "react";
import * as basicScroll from 'basicscroll'
// import { useStaticQuery,graphql } from "gatsby"
// import Img from "gatsby-image"

import topImg from "../../static/top.png"
import bottomImg from "../../static/bottom.png"

class Window extends React.Component {
  componentDidMount() {
    
    basicScroll.create({
      elem: document.querySelector('.bot'),
      direct: true,
      from: 0,
      to: 1000,
      props: {
        '--tx': {
            from: '0',
            to: '300px',
            direct: true,
        }
      }
    }).start()

    basicScroll.create({
      elem: document.querySelector('.top'),
      direct: true,
      from: 0,
      to: 1000,
      props: {
        '--tx': {
            from: '0',
            to: '120px',
            direct: true,
        }
      }
    }).start()
  }

  render() {
    return (
      <div className="window">
          <img src={ bottomImg } alt="" className="bot"/>
          <img src={ topImg } alt="" className="top"/>
      </div>

    );
  }
}

// const data = useStaticQuery(graphql`
//   query HeaderQuery {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//   }
// `)

export default Window