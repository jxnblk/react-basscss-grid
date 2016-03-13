
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'
import config from '../src/config'
import { Style, Row, Col } from '../src'
import { w } from '../src/Col'
import { col } from '../src/Col'

const renderer = TestUtils.createRenderer()

describe('config', () => {
  it('should contain a scale', () => {
    expect(config.scale).toExist()
  })

  it('should be an array', () => {
    expect(config.scale).toBeAn('array')
  })

  it('should have 5 values', () => {
    expect(config.scale.length).toEqual(5)
  })

  it('should have numbers', () => {
    expect(config.scale[0]).toBeA('number')
    expect(config.scale[1]).toBeA('number')
    expect(config.scale[2]).toBeA('number')
    expect(config.scale[3]).toBeA('number')
    expect(config.scale[4]).toBeA('number')
  })
})

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
    expect(tree.props.className).toEqual('Row')
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
  const { scale } = config
  let tree

  beforeEach(() => {
    renderer.render(<Col />)
    tree = renderer.getRenderOutput()
  })

  it('should render a div', () => {
    expect(tree.type).toEqual('div')
  })

  it('should have a className', () => {
    expect(tree.props.className).toEqual('Col')
  })

  it('should not have a float class', () => {
    expect(tree.props.className).toNotMatch(/col/)
  })

  it('should not have a width class', () => {
    expect(tree.props.className).toNotMatch(/col\-/)
  })

  it('should have a default gutter', () => {
    expect(tree.props.style.paddingLeft).toEqual(scale[2])
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
      expect(tree.props.className).toEqual('Col col col-6')
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
      expect(tree.props.className).toEqual('Col sm-col sm-col-6')
    })
  })
})

