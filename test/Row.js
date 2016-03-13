
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'
import { Row, Col } from '../src'

const renderer = TestUtils.createRenderer()

describe('Row', () => {
  let tree

  beforeEach(() => {
    renderer.render(<Row />)
    tree = renderer.getRenderOutput()
  })

  it('should render a div', () => {
    expect(tree.type).toEqual('div')
  })

  it('should have a className', () => {
    expect(tree.props.className).toEqual('Row mxn2')
  })

  context('when children are set', () => {
    beforeEach(() => {
      renderer.render(
        <Row>
          <Col />
          <Col />
        </Row>
      )
      tree = renderer.getRenderOutput()
    })

    it('should pass children through', () => {
      expect(tree.props.children.length).toEqual(2)
    })

    it('should override px child props', () => {
      expect(tree.props.children[0].props.px).toEqual(2)
    })
  })

  context('when gutter and children are set', () => {
    beforeEach(() => {
      renderer.render(
        <Row gutter={3}>
          <Col />
          <Col />
        </Row>
      )
      tree = renderer.getRenderOutput()
    })

    it('should pass children through', () => {
      expect(tree.props.children.length).toEqual(2)
    })

    it('should override px child props', () => {
      expect(tree.props.children[0].props.px).toEqual(3)
    })
  })
})

