import * as basicScroll from "./basicScroll"

const instance = basicScroll.create({
  elem: document.querySelector('.box'),
  from: 'bottom-bottom',
  to: 'top-top',
  direct: true,
  props: {
     '--r': {
        from: '0',
        to: '1turn'
     },
     '--tx': {
        from: '-100px',
        to: '100px'
     }
  }
})

instance.start()