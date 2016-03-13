
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'
import { Style, Row, Col } from '../src'
import { w } from '../src/Col'
import { col } from '../src/Col'

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

describe('w', () => {
  it('should return null for falsy values', () => {
    expect(w()).toNotExist()
  })

  it('should return a string', () => {
    expect(w(2)).toEqual('col-2')
  })
})

describe('col', () => {
  it('should return a function', () => {
    expect(col()).toBeA('function')
  })

  it('should return null when called', () => {
    expect(col()()).toNotExist()
  })

  it('should return a non-prefixed string', () => {
    expect(col('hi')()).toEqual('col-hi')
  })
  it('should return a prefixed string', () => {
    expect(col('hi')('sm')).toEqual('sm-col-hi')
  })
})

describe('Col', () => {
  let tree

  beforeEach(() => {
    renderer.render(<Col />)
    tree = renderer.getRenderOutput()
  })

  it('should render a div', () => {
    expect(tree.type).toEqual('div')
  })

  it('should have a className', () => {
    expect(tree.props.className).toEqual('Col px2')
  })

  it('should not have a float class', () => {
    expect(tree.props.className).toNotMatch(/col/)
  })

  it('should not have a width class', () => {
    expect(tree.props.className).toNotMatch(/col\-/)
  })

  it('should have a default gutter', () => {
    expect(tree.props.className).toMatch(/px2/)
  })

  context('when x is set', () => {
    beforeEach(() => {
      renderer.render(<Col x={6} />)
      tree = renderer.getRenderOutput()
    })

    it('should add the corresponding float class', () => {
      expect(tree.props.className).toMatch(/col/)
    })

    it('should add the corresponding width class', () => {
      expect(tree.props.className).toEqual('Col col col-6 px2')
    })
  })

  context('when sm is set', () => {
    beforeEach(() => {
      renderer.render(<Col sm={6} />)
      tree = renderer.getRenderOutput()
    })

    it('should add the corresponding float class', () => {
      expect(tree.props.className).toMatch(/sm\-col/)
    })

    it('should add the corresponding width class', () => {
      expect(tree.props.className).toEqual('Col sm-col sm-col-6 px2')
    })
  })
})

