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

    this.setState(partialState, () => {
      this.props.onChange({ ...this.state })
    })
  }

  render () {
    const { data } = this.props

    return (
      <section>
        <h3 className="section-title">Form</h3>

        <p>Entry</p>
        <FormInput label="Entry" type="text" name="entry" value={data.entry} onChange={this.handleFormChange} />

        <p>Output</p>
        <FormInput label="Output path" type="text" name="output.path" value={data.output.path} onChange={this.handleFormChange} />
        <FormInput label="Output filename" type="text" name="output.filename" value={data.output.filename} onChange={this.handleFormChange} />

        <p>Loaders</p>
        <FormInput label="ES6+" type="checkbox" name="loaders.es6" value={data.loaders.es6} onChange={this.handleFormChange} />
        <FormInput label="React with JSX" type="checkbox" name="loaders.react" value={data.loaders.react} onChange={this.handleFormChange} />
        <FormInput label="CSS" type="checkbox" name="loaders.css" value={data.loaders.css} onChange={this.handleFormChange} />
        <FormInput label="Sass" type="checkbox" name="loaders.sass" value={data.loaders.sass} onChange={this.handleFormChange} />

        <p>Plugins</p>
      </section>
    )
  }
}

export default Form
