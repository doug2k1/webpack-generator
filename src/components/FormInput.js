// @flow
import React from 'react'
import { uniqueId } from 'lodash'

type Props = {
  label: string,
  name: string,
  type: 'text' | 'checkbox',
  value?: string | boolean,
  onChange: ({ name: string, value?: string | boolean }) => void
}

type State = {
  value: string | boolean
}

class FormInput extends React.Component<Props, State> {
  state = {
    value: this.props.value || { checkbox: false, text: '' }[this.props.type]
  }

  componentWillReceiveProps (newProps: Props) {
    if (newProps.value !== this.state.value) {
      this.setState({
        value: newProps.value
      })
    }
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
