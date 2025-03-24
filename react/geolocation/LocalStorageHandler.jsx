import React, { Component } from 'react'

class LocalStorageHandler extends Component {
  constructor(props) {
    super(props)
    const { storageKey, defaultValue } = this.props

    let storedValue = defaultValue

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const item = localStorage.getItem(storageKey)
        storedValue = item !== null ? JSON.parse(item) : defaultValue
      } catch (error) {
        console.error('Error parsing localStorage:', error)
        storedValue = defaultValue
      }
    }

    this.state = { value: storedValue }
  }

  componentDidMount() {
    window.addEventListener("storage", this.syncStorage)
  }

  componentWillUnmount() {
    window.removeEventListener("storage", this.syncStorage)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      try {
        localStorage.setItem(this.props.storageKey, JSON.stringify(this.state.value))
      } catch (error) {
        console.error('Error setting localStorage:', error)
      }
    }
  }

  syncStorage = (event) => {
    if (event.key === this.props.storageKey) {
      try {
        const newValue = JSON.parse(event.newValue)
        this.setState({ value: newValue })
      } catch (error) {
        console.error("Error parsing localStorage event:", error)
      }
    }
  }

  setValue = (newValue) => {
    if (newValue !== this.state.value) {
      this.setState({ value: newValue })
    }
  }

  render() {
    return typeof this.props.children === 'function'
      ? this.props.children(this.state.value, this.setValue)
      : null
  }
}

export default LocalStorageHandler