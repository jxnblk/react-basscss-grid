
import React from 'react'
import classnames from 'classnames'

export const w = (n) => n ? `col-${n}` : null
export const col = (n) => (bp) => bp && n ? `${bp}-${w(n)}` : w(n)
export const p = (n) => n ? `px${n}` : null
export const full = (n) => n ? null : 'col-12'

export const getFloatClassNames = ({ x, sm, md, lg }) => ({
  'col': x,
  'sm-col': sm,
  'md-col': md,
  'lg-col': lg,
})

export const getWidthClassNames = ({ x, sm, md, lg }) => (
  [
    col(x)(),
    col(sm)('sm'),
    col(md)('md'),
    col(lg)('lg')
  ].join(' ')
)

const Col = ({
  px,
  right,
  ...props
}, { basscssGrid }) => {

  const inlineBlock = basscssGrid ? !basscssGrid.float : true

  const cx = classnames(
    'Col',
    inlineBlock ? 'inline-block align-top' : getFloatClassNames(props),
    full(props.x),
    getWidthClassNames(props),
    px ? `px${px}` : null
  )

  const sx = {
    boxSizing: 'border-box'
  }

  return (
    <div
      {...props}
      className={cx}
      style={sx} />
  )
}

Col.propTypes = {
  right: React.PropTypes.bool,
  x: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  sm: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  md: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  lg: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  px: React.PropTypes.oneOf([0, 1, 2, 3, 4])
}

Col.defaultProps = {
  px: 2
}

Col.contextTypes = {
  basscssGrid: React.PropTypes.object
}

export default Col

