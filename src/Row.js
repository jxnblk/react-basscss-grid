
import React from 'react'
import classnames from 'classnames'

/**
 * Grid row component
 */

const Row = ({
  gutter,
  ...props
}) => {

  const cx = classnames(
    'Row',
    gutter ? `mxn${gutter}` : null
  )
  const sx = {
    overflow: 'hidden'
  }

  const children = React.Children.map(props.children, (child) => (
    React.cloneElement(child, { px: gutter })
  ))

  return (
    <div
      {...props}
      className={cx}
      style={sx}
      children={children} />
  )
}

Row.propTypes = {
  /** Number 0–4 for padding between columns */
  gutter: React.PropTypes.oneOf([0, 1, 2, 3, 4])
}

Row.defaultProps = {
  gutter: 2
}

export default Row

