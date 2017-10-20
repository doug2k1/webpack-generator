// @flow
import * as React from 'react'
import objPath from 'object-path'
import type { ConfigData } from '../types/ConfigData.type'

type State = ConfigData;

type Props = {
  data: ConfigData,
  onChange: (State) => void
};

class Form extends React.Component<Props, State> {
  state = this.props.data

  handleFormChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const target = event.currentTarget
    const value = target.type === 'checkbox' ? target.checked : target.value
    const { name } = target
    const partialState = {}

    objPath.set(partialState, name, value)

    this.setState((prevState) => {
      const newState = { ...prevState }
      objPath.set(newState, name, value)
      return newState
    }, () => {
      this.props.onChange({ ...this.state })
    })
  }

  render () {
    return (
      <div>
        <fieldset>
          <legend>Entry</legend>
          <p>
            <input className="input" type="text" name="entry" value={this.state.entry} onChange={this.handleFormChange} />
          </p>
        </fieldset>

        <fieldset>
          <legend>Output</legend>
          <p>
            <input type="text" name="output.path" value={this.state.output.path} onChange={this.handleFormChange} />
          </p>
          <p>
            <input type="text" name="output.filename" value={this.state.output.filename} onChange={this.handleFormChange} />
          </p>
        </fieldset>

        <fieldset>
          <legend>Loaders</legend>
          <p>
            <label>
              Use ES6?
              <input type="checkbox" name="loaders.es6" checked={this.state.loaders.es6} onChange={this.handleFormChange} />
            </label>

            <label>
              React?
              <input type="checkbox" name="loaders.react" checked={this.state.loaders.react} onChange={this.handleFormChange} />
            </label>
          </p>
        </fieldset>
      </div>
    )
  }
}

export default Form
