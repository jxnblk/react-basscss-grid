
import React from 'react'
import {
  Style,
  Row,
  Col,
  Cell
} from '../src'

const css = `
.demo { box-shadow: inset 0 0 0 2px rgba(0, 128, 255, .25) }
`

const Box = (props) => <div {...props} className='demo p2' />

class Root extends React.Component {
  render () {

    const lengths = [
      2,
      3,
      4,
      6
    ]

    const breakpoints = [
      'x',
      'sm',
      'md',
      'lg'
    ]

    // Generate Col example sections
    const sections = breakpoints.map((bp) => ({
      heading: `Col ${bp}`,
      rows: lengths.map((length) => ({
        cols: Array.from({ length }, (l, i) => ({
          [bp]: 12 / length,
          children: i === 0 ? (<h3 className='mt0'>Col {bp} {12 / length}</h3>) : `<Col ${bp}={${12 / length}} />`
        }))
      }))
    }))

    // Generate Cell example sections
    const cellSections = breakpoints.map((bp) => ({
      heading: `Cell ${bp}`,
      rows: lengths.map((length) => ({
        cols: Array.from({ length }, (l) => ({ [bp]: 12 / length, children: `<Cell ${bp}={${12 / length}} />` }))
      }))
    }))

    return (
      <html>
        <head>
          <title>react-basscss-grid</title>
          <Style />
          <link rel='stylesheet' href='https://npmcdn.com/basscss-basic/index.css' />
          <link rel='stylesheet' href='https://npmcdn.com/basscss-typography/css/typography.css' />
          <link rel='stylesheet' href='https://npmcdn.com/basscss-type-scale/css/type-scale.css' />
          <style dangerouslySetInnerHTML={{ __html: css }} />
        </head>
        <body className='px3'>
          <Row>
            <Col x={6}>
              <h1 className='m0'>React Basscss Grid</h1>
            </Col>
            <Col x={6}>
              <h2 className='m0'>Col 6</h2>
            </Col>
          </Row>
          <hr />
          <h2>Col</h2>
          {sections.map(({ heading, rows }, i) => (
            <section key={i}
              className='h6 center'>
              <h2>{heading}</h2>
              {rows.map(({ cols }, i) => (
                <Row key={i}>
                  {cols.map(({ children, ...props }, i) => (
                    <Col key={i} {...props}>
                      <Box children={children} />
                    </Col>
                  ))}
                </Row>
              ))}
            </section>
          ))}
          <hr />
          <h2>Cell</h2>
          {cellSections.map(({ heading, rows }, i) => (
            <section key={i}
              className='h6 center demo'>
              <h2>{heading}</h2>
              {rows.map(({ cols }, i) => (
                <Row key={i}>
                  {cols.map(({ children, ...props }, i) => (
                    <Cell key={i} {...props}>
                      <Box children={children} />
                    </Cell>
                  ))}
                </Row>
              ))}
            </section>
          ))}
        </body>
      </html>
    )
  }
}

export default Root

