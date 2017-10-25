// @flow
import React from 'react'
import { uniqueId } from 'lodash'

type Props = {
  label: string,
  name: string,
  type: 'text' | 'checkbox',
  disabled: boolean,
  value?: string | boolean,
  onChange: ({ name: string, value?: string | boolean }) => void
}

type State = {
  value: string | boolean,
  disabled: boolean
}

class FormInput extends React.Component<Props, State> {
  static defaultProps = {
    disabled: false
  }

  state = {
    value: this.props.value || { checkbox: false, text: '' }[this.props.type],
    disabled: this.props.disabled
  }

  componentWillReceiveProps (newProps: Props) {
    ['value', 'disabled'].forEach((key) => {
      if (newProps[key] !== this.state[key]) {
        this.setState({
          [key]: newProps[key]
        })
      }
    })
  }

  id = uniqueId('input')

  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const target = event.currentTarget

    this.setState({
      value: this.props.type === 'checkbox' ? target.checked : target.value
    }, () => {
      this.props.onChange({
        name: this.props.name,
        value: this.state.value
      })
    })
  }

  renderInputText () {
    return (
      <div className="field">
        <label className="label" htmlFor={this.id}>{this.props.label}</label>
        <div className="control">
          <input
            id={this.id}
            className="input"
            type={this.props.type}
            value={this.state.value}
            onChange={this.handleChange}
            disabled={this.state.disabled}
          />
        </div>
      </div>
    )
  }

  renderInputCheckbox () {
    return (
      <div className="field">
        <div className="control">
          <label className="label" htmlFor={this.id}>
            <input
              id={this.id}
              className="input"
              type={this.props.type}
              checked={this.state.value}
              onChange={this.handleChange}
              disabled={this.state.disabled}
            />
            {this.props.label}
          </label>
        </div>
      </div>
    )
  }

  render () {
    return this.props.type === 'checkbox' ? this.renderInputCheckbox() : this.renderInputText()
  }
}

export default FormInput
