
import React from 'react'
import {
  Style,
  Row,
  Col
} from '../src'

const css = `
.demo * { outline: 1px solid rgba(0, 128, 255, .25) }
`

class Root extends React.Component {
  render () {

    const lengths = [
      2,
      3,
      4,
      6,
      12
    ]

    const breakpoints = [
      'x',
      'sm',
      'md',
      'lg'
    ]

    // Generate example sections
    const sections = breakpoints.map((bp) => ({
      heading: bp,
      rows: lengths.map((length) => ({
        cols: Array.from({ length }, (l) => ({ [bp]: 12 / length, children: `<Col ${bp}={${12 / length}} />` }))
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
        <body>
          <Row>
            <Col x={6}>
              <h1 className='m0'>React Basscss Grid</h1>
            </Col>
            <Col x={6}>
              <h2 className='m0'>Col 6</h2>
            </Col>
          </Row>
          {sections.map(({ heading, rows }, i) => (
            <section key={i}
              className='h6 center demo'>
              <h2>{heading}</h2>
              {rows.map(({ cols }, i) => (
                <Row key={i}>
                  {cols.map((props, i) => (
                    <Col key={i} {...props} />
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

