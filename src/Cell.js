
import React from 'react'
import classnames from 'classnames'

export const w = (n) => n ? `col-${n}` : null
export const col = (n) => (bp) => bp && n ? `${bp}-${w(n)}` : w(n)
export const p = (n) => n ? `px${n}` : null
export const full = (n) => n ? null : 'col-12'

/**
 * Inline-block based column cell
 */

const Cell = ({
  x,
  sm,
  md,
  lg,
  px,
  ...props
}) => {

  const cx = classnames(
    'Cell',
    'inline-block',
    'align-top',
    col(x)(),
    col(sm)('sm'),
    col(md)('md'),
    col(lg)('lg'),
    p(px),
    full(x)
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

Cell.propTypes = {
  x: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  sm: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  md: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  lg: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  px: React.PropTypes.oneOf([0, 1, 2, 3, 4])
}

Cell.defaultProps = {
  px: 2
}

export default Cell

