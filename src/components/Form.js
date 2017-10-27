// @flow
import React from 'react'
import objPath from 'object-path'
import type { ConfigData } from '../types/ConfigData.type'
import FormInput from './FormInput'

type State = ConfigData;

type Props = {
  data: ConfigData,
  onChange: (State) => void
}

type FormInputEvent = {
  name: string,
  value?: string | boolean
}

class Form extends React.Component<Props, State> {
  state = this.props.data

  handleFormChange = ({ name, value }: FormInputEvent) => {
    const partialState = {}

    objPath.set(partialState, name, value)

    if (name === 'loaders.react' && value) {
      objPath.set(partialState, 'loaders.es6', value)
    }

    if (name === 'loaders.style' && !value) {
      objPath.set(partialState, 'plugins.extract', false)
    }

    this.setState(partialState, () => {
      this.props.onChange({ ...this.state })
    })
  }

  render () {
    return (
      <section>
        <h3 className="section-title">Options</h3>

        <fieldset>
          <legend>Entry</legend>
          <FormInput
            label="Entry file"
            type="text"
            name="entry"
            value={this.props.data.entry}
            onChange={this.handleFormChange}
          />
        </fieldset>

        <fieldset>
          <legend>Output</legend>
          <FormInput
            label="Path"
            type="text"
            name="output.path"
            value={this.props.data.output.path}
            onChange={this.handleFormChange}
          />
          <FormInput
            label="Filename"
            type="text"
            name="output.filename"
            value={this.props.data.output.filename}
            onChange={this.handleFormChange}
          />
        </fieldset>

        <fieldset>
          <legend>Loaders</legend>
          <FormInput
            label="ES6+"
            type="checkbox"
            name="loaders.es6"
            value={this.props.data.loaders.es6}
            onChange={this.handleFormChange}
          />
          <FormInput
            label="React with JSX"
            type="checkbox"
            name="loaders.react"
            value={this.props.data.loaders.react}
            onChange={this.handleFormChange}
          />

          <div className="field">
            <label className="label" htmlFor="s1">Styles:</label>
            <div className="control select">
              <select
                className="input-select"
                id="s1"
                name="loaders.style"
                onChange={(event) => {
                  this.handleFormChange({
                    name: 'loaders.style',
                    value: event.currentTarget.value
                  })
                }}
              >
                <option value="">No styles</option>
                <option value="css">CSS</option>
                <option value="sass">Sass</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Plugins</legend>
          <FormInput
            label="Extract styles"
            type="checkbox"
            name="plugins.extract"
            value={this.props.data.plugins.extract}
            onChange={this.handleFormChange}
            disabled={!this.state.loaders.style}
          />
          <FormInput
            label="Styles file"
            type="text"
            name="plugins.extractFile"
            value={this.props.data.plugins.extractFile}
            onChange={this.handleFormChange}
            disabled={!this.state.loaders.style}
          />
        </fieldset>
      </section>
    )
  }
}

export default Form
