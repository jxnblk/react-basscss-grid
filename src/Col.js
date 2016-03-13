
import React from 'react'
import classnames from 'classnames'

export const w = (x) => x ? `col-${x}` : null
export const col = (x) => (bp) => bp && x ? `${bp}-${w(x)}` : w(x)

const Col = ({
  x,
  sm,
  md,
  lg,
  px,
  right,
  ...props
}) => {

  const cx = classnames(
    'Col', {
      'col': x,
      'sm-col': sm,
      'md-col': md,
      'lg-col': lg,
    },
    col(x)(),
    col(sm)('sm'),
    col(md)('md'),
    col(lg)('lg'),
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

export default Col

