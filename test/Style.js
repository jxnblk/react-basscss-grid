
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'
import { Style } from '../src'

const renderer = TestUtils.createRenderer()

describe('Style', () => {
  let tree

  beforeEach(() => {
    renderer.render(<Style />)
    tree = renderer.getRenderOutput()
  })

  it('should render', () => {
    expect(tree).toExist()
  })
  it('should be a style tag', () => {
    expect(tree.type).toEqual('style')
  })
  it('should have basscss-grid CSS', () => {
    expect(tree.props.dangerouslySetInnerHTML).toBeAn('object')
  })
})

