import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

describe('App', () => {
  const component = shallow(<App />)
  expect(component.find('div')).toHaveLength(1)
})
