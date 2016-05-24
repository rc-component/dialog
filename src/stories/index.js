import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Dialog from '../index';

const boxStyles = {
  width: 200,
  height: 200,
  position: 'relative'
}

const dialogStyles = {
  backgroundColor: '#fff',
  padding: 10,
  boxSizing: 'border-box'
}

const closeStyles = {
  color: '#666',
  display: 'block',
  position: 'absolute',
  right: '5px',
  top: '5px',
  textDecoration: 'none'
}

const Close = function (props) {
  return <a href="#"  style={closeStyles} onClick={props.onClick}>&times;</a>
}

storiesOf('Dialog', module)
  .add('default dialog', () => {
    return (
      <Dialog style={dialogStyles} show={true}>
        hello world
      </Dialog>
    )
  })
  .add('close dialog', () => {
    let Foo = React.createClass({
      getInitialState: function () {
        return {show: true}
      },
      render: function() {
        return (
          <div style={boxStyles}>
            <Dialog style={dialogStyles} top={60} width={100} show={this.state.show}>
              <Close onClick={e => {
                e.preventDefault()
                this.setState({
                  show: false
                })
              }} />
              my simple dialog
            </Dialog>
          </div>
        )
      }
    })
    return <Foo />
  })
  .add('scale dialog', () => {
    let Foo = React.createClass({
      getInitialState: function () {
        return {show: true}
      },
      toggle: function () {
        this.setState({
          show: !this.state.show
        })
      },
      render: function() {
        return (
          <div>
            <button onClick={this.toggle}>toggle</button>
            <div style={boxStyles}>
              <Dialog style={dialogStyles} transitionName='' top={60} width={100} show={this.state.show}>
                <Close onClick={e => {
                  e.preventDefault()
                  this.setState({
                    show: false
                  })
                }} />
                my simple dialog
              </Dialog>
            </div>
          </div>
        )
      }
    })
    return <Foo />
  })
