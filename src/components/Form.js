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
      <section>
        <h3 className="section-title">Form</h3>
        <div className="field">
          <label className="label">Entry</label>
          <div className="control">
            <input className="input" type="text" name="entry" value={this.state.entry} onChange={this.handleFormChange} />
          </div>
        </div>

        <div className="field">
          <label className="label">Output path</label>
          <div className="control">
            <input className="input" type="text" name="output.path" value={this.state.output.path} onChange={this.handleFormChange} />
          </div>
        </div>

        <div className="field">
          <label className="label">Output filename</label>
          <div className="control">
            <input className="input" type="text" name="output.filename" value={this.state.output.filename} onChange={this.handleFormChange} />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" name="loaders.es6" checked={this.state.loaders.es6} onChange={this.handleFormChange} />
              Use ES6?
            </label>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" name="loaders.react" checked={this.state.loaders.react} onChange={this.handleFormChange} />
              React?
            </label>
          </div>
        </div>
      </section>
    )
  }
}

export default Form
