import React, { Component } from 'react'

interface AppState {
  name: string
}
export default class App extends Component<{}, AppState> {
  state: AppState = {
    name: 'jack'
  }
  render() {
    const { name } = this.state
    return <div>{name}</div>
  }
}
