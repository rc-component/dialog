import React, { Component, PropTypes, Children} from 'react'
import ReactDom from 'react-dom'
import TransitionGroup from 'react-addons-css-transition-group'
import Overlay from 'rc-overlay'
import style from './style.css'
import cx from 'classnames'
import assign from 'object-assign'
import computedStyle from 'computed-style'

const doc = document.documentElement
const vh = Math.max(doc.clientHeight, window.innerHeight || 0)

const FirstChild = React.createClass({
  render: function() {
    let children = Children.toArray(this.props.children)
    return children[0] || null
  }
})

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
    effect: 'slide',
    top: 150,
    width: 300
  }
  static propTypes = {
    show: PropTypes.bool.isRequired,
    overlay: PropTypes.bool,
    overlayStyle: PropTypes.object,
    effect: PropTypes.oneOf(['slide', 'scale']),
    transitionName: PropTypes.string,
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
      el.style.width  = body.clientWidth + 'px'
      el.style.height = Math.max(body.clientHeight, vh) + 'px'
    }
    this.positionDialog()
    if (!this.props.show) el.style.display = 'none'
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
    if (this.props.show) {
      let dialog = this.refs.dialog
      let dw = parseInt(dialog.style.width, 10)
      dialog.style.left = (this.el.clientWidth - dw)/2 + 'px'
    }
  }
  componentDidUpdate() {
    this.positionDialog()
  }
  render() {
    let props = this.props
    let styles = assign({
        top: props.top,
        width: props.width,
        position: 'absolute'
      }, props.style)
    let clz = cx(props.className, style[props.effect])
      return (
        <div className={style.wrapper}>
          {do {
            if (props.overlay) { <Overlay show={props.show} style={props.overlayStyle}/> }
          }}
          <TransitionGroup
            component={FirstChild}
            transitionAppearTimeout={200}
            transitionLeaveTimeout={200}
            transitionName={props.transitionName ? props.transitionName : style}
            transitionEnterTimeout={200}
            transitionAppear={true}>
            {do{
              if (props.show){
                <div
                  ref="dialog"
                  className={clz}
                  style={styles}>
                  {props.children}
                </div>
              } else { null }
            }}
          </TransitionGroup>
        </div>
    )
  }
}
