
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'
import { Col } from '../src'
import {
  w,
  col,
  p,
  full,
  getFloatClassNames,
  getWidthClassNames
} from '../src/Col'

const renderer = TestUtils.createRenderer()

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

describe('p', () => {
  context('when no arguments are passed', () => {
    it('should return null', () => {
      expect(p()).toNotExist()
    })
  })

  context('when 1 is passed', () => {
    it('should return px1', () => {
      expect(p(1)).toEqual('px1')
    })
  })
  context('when 2 is passed', () => {
    it('should return px2', () => {
      expect(p(2)).toEqual('px2')
    })
  })
})

describe('full', () => {
  context('when no arguments are passed', () => {
    it('should return col-12', () => {
      expect(full()).toEqual('col-12')
    })
  })

  context('when a value is passed', () => {
    it('should return null', () => {
      expect(full(1)).toEqual(null)
    })
  })
})

describe('getFloatClassNames', () => {
  context('when no arguments are passed', () => {
    it('should return an object', () => {
      expect(getFloatClassNames()).toEqual({
        'col': null,
        'sm-col': null,
        'md-col': null,
        'lg-col': null
      })
    })
  })

  context('when x prop is passed', () => {
    it('should return a classnames object', () => {
      expect(getFloatClassNames({ x: 6 })).toEqual({
        'col': 6,
        'sm-col': null,
        'md-col': null,
        'lg-col': null
      })
    })
  })

  context('when sm prop is passed', () => {
    it('should return a classnames object', () => {
      expect(getFloatClassNames({ sm: 6 })).toEqual({
        'col': null,
        'sm-col': 6,
        'md-col': null,
        'lg-col': null
      })
    })
  })

  context('when md prop is passed', () => {
    it('should return a classnames object', () => {
      expect(getFloatClassNames({ md: 6 })).toEqual({
        'col': null,
        'sm-col': null,
        'md-col': 6,
        'lg-col': null
      })
    })
  })

  context('when lg prop is passed', () => {
    it('should return a classnames object', () => {
      expect(getFloatClassNames({ lg: 6 })).toEqual({
        'col': null,
        'sm-col': null,
        'md-col': null,
        'lg-col': 6
      })
    })
  })
})

describe('getWidthClassNames', () => {
  context('when no arguments are passed', () => {
    it('should return a string', () => {
      expect(getWidthClassNames()).toEqual('')
    })
  })

  context('when x is passed', () => {
    it('should return col-6', () => {
      expect(getWidthClassNames({ x: 6 })).toEqual('col-6')
    })
  })

  context('when sm is passed', () => {
    it('should return sm-col-6', () => {
      expect(getWidthClassNames({ sm: 6 })).toEqual('sm-col-6')
    })
  })

  context('when md is passed', () => {
    it('should return md-col-6', () => {
      expect(getWidthClassNames({ md: 6 })).toEqual('md-col-6')
    })
  })

  context('when lg is passed', () => {
    it('should return lg-col-6', () => {
      expect(getWidthClassNames({ lg: 6 })).toEqual('lg-col-6')
    })
  })

  context('when x, sm, md, and lg are passed', () => {
    it('should return mutliple class names', () => {
      expect(getWidthClassNames({ x: 6, sm: 4, md: 3, lg: 2 })).toEqual('col-6 sm-col-4 md-col-3 lg-col-2')
    })
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
    expect(tree.props.className).toEqual('Col inline-block align-top col-12 px2')
  })

  it('should not have a float class', () => {
    expect(tree.props.className).toNotMatch(/col\s/)
  })

  it('should have a full width class', () => {
    expect(tree.props.className).toMatch(/col\-12/)
  })

  it('should have a default gutter', () => {
    expect(tree.props.className).toMatch(/px2/)
  })

  context('when x is set', () => {
    beforeEach(() => {
      renderer.render(<Col x={6} />)
      tree = renderer.getRenderOutput()
    })

    it('should add the a width class', () => {
      expect(tree.props.className).toMatch(/col\-6/)
    })
  })

  context('when sm is set', () => {
    beforeEach(() => {
      renderer.render(<Col sm={6} />)
      tree = renderer.getRenderOutput()
    })

    it('should keep the full width class', () => {
      expect(tree.props.className).toMatch(/\scol\-12/)
    })

    it('should add an sm width class', () => {
      expect(tree.props.className).toMatch(/sm\-col\-6/)
    })

    it('should not add an md width class', () => {
      expect(tree.props.className).toNotMatch(/md\-col\-/)
    })

    it('should not add an lg width class', () => {
      expect(tree.props.className).toNotMatch(/lg\-col\-/)
    })
  })

  context('when x and sm are set', () => {
    beforeEach(() => {
      renderer.render(<Col x={6} sm={4} />)
      tree = renderer.getRenderOutput()
    })

    it('should not keep the full width class', () => {
      expect(tree.props.className).toNotMatch(/\scol\-12/)
    })

    it('should add a col-6 class', () => {
      expect(tree.props.className).toMatch(/\scol\-6/)
    })

    it('should add an sm width class', () => {
      expect(tree.props.className).toMatch(/sm\-col\-4/)
    })

    it('should not add an md width class', () => {
      expect(tree.props.className).toNotMatch(/md\-col\-/)
    })

    it('should not add an lg width class', () => {
      expect(tree.props.className).toNotMatch(/lg\-col\-/)
    })
  })

  context('when md is set', () => {
    beforeEach(() => {
      renderer.render(<Col md={6} />)
      tree = renderer.getRenderOutput()
    })

    it('should keep the full width class', () => {
      expect(tree.props.className).toMatch(/\scol\-12/)
    })

    it('should not add an sm width class', () => {
      expect(tree.props.className).toNotMatch(/sm\-col\-/)
    })

    it('should add an md width class', () => {
      expect(tree.props.className).toMatch(/md\-col\-6/)
    })

    it('should not add an lg width class', () => {
      expect(tree.props.className).toNotMatch(/lg\-col\-/)
    })
  })

  context('when sm and md are set', () => {
    beforeEach(() => {
      renderer.render(<Col sm={6} md={4} />)
      tree = renderer.getRenderOutput()
    })

    it('should keep the full width class', () => {
      expect(tree.props.className).toMatch(/\scol\-12/)
    })

    it('should add an sm width class', () => {
      expect(tree.props.className).toMatch(/sm\-col\-6/)
    })

    it('should add an md width class', () => {
      expect(tree.props.className).toMatch(/md\-col\-4/)
    })

    it('should not add an lg width class', () => {
      expect(tree.props.className).toNotMatch(/lg\-col\-/)
    })
  })

  context('when lg is set', () => {
    beforeEach(() => {
      renderer.render(<Col lg={6} />)
      tree = renderer.getRenderOutput()
    })

    it('should keep the full width class', () => {
      expect(tree.props.className).toMatch(/\scol\-12/)
    })

    it('should not add an sm width class', () => {
      expect(tree.props.className).toNotMatch(/sm\-col\-/)
    })

    it('should not add an md width class', () => {
      expect(tree.props.className).toNotMatch(/md\-col\-/)
    })

    it('should add an lg width class', () => {
      expect(tree.props.className).toMatch(/lg\-col\-6/)
    })
  })

  context('when sm and lg are set', () => {
    beforeEach(() => {
      renderer.render(<Col sm={6} lg={3} />)
      tree = renderer.getRenderOutput()
    })

    it('should keep the full width class', () => {
      expect(tree.props.className).toMatch(/\scol\-12/)
    })

    it('should add an sm width class', () => {
      expect(tree.props.className).toMatch(/sm\-col\-6/)
    })

    it('should not add an md width class', () => {
      expect(tree.props.className).toNotMatch(/md\-col\-/)
    })

    it('should add an lg width class', () => {
      expect(tree.props.className).toMatch(/lg\-col\-3/)
    })
  })

  context('when md and lg are set', () => {
    beforeEach(() => {
      renderer.render(<Col md={6} lg={3} />)
      tree = renderer.getRenderOutput()
    })

    it('should keep the full width class', () => {
      expect(tree.props.className).toMatch(/\scol\-12/)
    })

    it('should not add an sm width class', () => {
      expect(tree.props.className).toNotMatch(/sm\-col\-/)
    })

    it('should add an md width class', () => {
      expect(tree.props.className).toMatch(/md\-col\-6/)
    })

    it('should add an lg width class', () => {
      expect(tree.props.className).toMatch(/lg\-col\-3/)
    })
  })

  context('when sm, md, and lg are set', () => {
    beforeEach(() => {
      renderer.render(<Col sm={6} md={4} lg={3} />)
      tree = renderer.getRenderOutput()
    })

    it('should keep the full width class', () => {
      expect(tree.props.className).toMatch(/\scol\-12/)
    })

    it('should add an sm width class', () => {
      expect(tree.props.className).toMatch(/sm\-col\-6/)
    })

    it('should add an md width class', () => {
      expect(tree.props.className).toMatch(/md\-col\-4/)
    })

    it('should add an lg width class', () => {
      expect(tree.props.className).toMatch(/lg\-col\-3/)
    })
  })

  context('when x, sm, md, and lg are set', () => {
    beforeEach(() => {
      renderer.render(<Col x={8} sm={6} md={4} lg={3} />)
      tree = renderer.getRenderOutput()
    })

    it('should not keep the full width class', () => {
      expect(tree.props.className).toNotMatch(/\scol\-12/)
    })

    it('should add a col-8 class', () => {
      expect(tree.props.className).toMatch(/\scol\-8/)
    })

    it('should add an sm width class', () => {
      expect(tree.props.className).toMatch(/sm\-col\-6/)
    })

    it('should add an md width class', () => {
      expect(tree.props.className).toMatch(/md\-col\-4/)
    })

    it('should add the an lg width class', () => {
      expect(tree.props.className).toMatch(/lg\-col\-3/)
    })
  })

  context('when px is set to 0', () => {
    beforeEach(() => {
      renderer.render(<Col px={0} />)
      tree = renderer.getRenderOutput()
    })

    it('should add px0', () => {
      expect(tree.props.className).toMatch(/px0/)
    })
  })

  context('when px is set to 1', () => {
    beforeEach(() => {
      renderer.render(<Col px={1} />)
      tree = renderer.getRenderOutput()
    })

    it('should add px1', () => {
      expect(tree.props.className).toMatch(/px1/)
    })
  })

  context('when px is set to 2', () => {
    beforeEach(() => {
      renderer.render(<Col px={2} />)
      tree = renderer.getRenderOutput()
    })

    it('should add px2', () => {
      expect(tree.props.className).toMatch(/px2/)
    })
  })

  context('when px is set to 3', () => {
    beforeEach(() => {
      renderer.render(<Col px={3} />)
      tree = renderer.getRenderOutput()
    })

    it('should add px3', () => {
      expect(tree.props.className).toMatch(/px3/)
    })
  })

  context('when px is set to 4', () => {
    beforeEach(() => {
      renderer.render(<Col px={4} />)
      tree = renderer.getRenderOutput()
    })

    it('should add px4', () => {
      expect(tree.props.className).toMatch(/px4/)
    })
  })

  context('when inline is false', () => {
    beforeEach(() => {
      renderer.render(<Col inline={false} x={6} />)
      tree = renderer.getRenderOutput()
    })

    it('should not add inline-block class names', () => {
      expect(tree.props.className).toNotMatch(/inline\-block/)
      expect(tree.props.className).toNotMatch(/align\-top/)
    })

    it('should add float class names', () => {
      expect(tree.props.className).toMatch(/\scol\s/)
    })
  })
})

