
import React from 'react'
import classnames from 'classnames'

export const w = (n) => n ? `col-${n}` : null
export const col = (n) => (bp) => bp && n ? `${bp}-${w(n)}` : w(n)
export const p = (n) => typeof n === 'number' ? `px${n}` : null
export const full = (n) => n ? null : 'col-12'

export const getFloatClassNames = ({
  x = null,
  sm = null,
  md = null,
  lg = null
} = {}) => ({
  'col': x,
  'sm-col': sm,
  'md-col': md,
  'lg-col': lg,
})

export const getWidthClassNames = ({
  x = null,
  sm = null,
  md = null,
  lg = null
} = {}) => (
  [
    col(x)(),
    col(sm)('sm'),
    col(md)('md'),
    col(lg)('lg')
  ].filter(n => n)
    .join(' ')
)

/**
 * Grid column component
 */

const Col = ({
  px,
  ...props
}, { basscssGrid }) => {
  const { inline  } = { ...props, ...basscssGrid }

  const cx = classnames(
    'Col',
    inline ? 'inline-block align-top' : getFloatClassNames(props),
    full(props.x),
    getWidthClassNames(props),
    p(px)
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
  /** Column width at all breakpoints */
  x: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /** Column width above the small breakpoint */
  sm: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /** Column width above the medium breakpoint */
  md: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /** Column width above the large breakpoint */
  lg: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /** X-axis padding (e.g. gutter) */
  px: React.PropTypes.oneOf([0, 1, 2, 3, 4]),
  /** Set grid mode to inline-block */
  inline: React.PropTypes.bool
}

Col.defaultProps = {
  px: 2,
  inline: true
}

Col.contextTypes = {
  basscssGrid: React.PropTypes.object
}

export default Col

