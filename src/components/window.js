import React from "react";
import * as basicScroll from 'basicscroll'
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
            to: '260px',
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

export default Window