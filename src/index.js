import React, { Component } from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import Overlay from 'rc-overlay'
import assign from 'object-assign'
import computedStyle from 'computed-style'
import Transition from 'react-transition-group/Transition'

const doc = document.documentElement
const vh = Math.max(doc.clientHeight, window.innerHeight || 0)
const wrapperStyle= {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
}


const body = document.body
function findPostionedElement(el) {
  while (el) {
    el = el.parentNode
    if (el === body) return body
    if (el) {
      if (computedStyle(el, 'position') === 'static') {
        el = el.parentNode
      } else {
        break
      }
    }
  }
  return el
}

export default class Dialog extends Component {
  static defaultProps = {
    show: false,
    overlay: true,
    top: 150,
    width: 300,
    exitStyle: {
      opacity: 0.3
    }
  }
  static propTypes = {
    show: PropTypes.bool.isRequired,
    overlay: PropTypes.bool,
    overlayStyle: PropTypes.object,
    exitStyle: PropTypes.object,
    top: PropTypes.number,
    width: PropTypes.number
  }
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    let el = this.el = ReactDom.findDOMNode(this)
    let pel = findPostionedElement(el)
    if (pel === document.body) {
      el.style.height = Math.max(body.clientHeight, vh) + 'px'
    }
    if (!this.props.show) el.style.display = 'none'
    this.positionDialog()
  }
  componentWillReceiveProps(props) {
    if (!props.show) {
      setTimeout(() => {
        if (!this.props.show) {
          this.el.style.display = 'none'
        }
      }, 300)
    } else {
      if (this.el) this.el.style.display = 'block'
    }
  }
  positionDialog() {
    if (this.props.show && this.dialog) {
      let dw = parseInt(this.dialog.style.width, 10)
      this.dialog.style.left = (this.el.clientWidth - dw)/2 + 'px'
    }
  }
  componentDidUpdate() {
    this.positionDialog()
  }
  render() {
    let props = this.props
    let {exitStyle} = props
    return (
      <div style={wrapperStyle}>
        {do {
          if (props.overlay) { <Overlay show={props.show} style={props.overlayStyle}/> }
        }}
        <Transition in={props.show} timeout={300}>
          {(state) => {
            let styles = assign({
              top: props.top,
              width: props.width,
              position: 'absolute',
              transition: 'all 0.3s ease',
            }, props.style)
            if (['entered', 'entering'].indexOf(state) === -1) {
              styles = assign(styles, exitStyle)
            }
            return (
              <div
                ref={(el) => this.dialog = el}
                className={props.className}
                style={{...styles}}>
                {props.children}
              </div>
            )
          }}
        </Transition>
      </div>
    )
  }
}
