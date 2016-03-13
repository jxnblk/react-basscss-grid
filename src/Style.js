
import React from 'react'
import basscssGrid from '../node_modules/basscss-grid/css/grid.css'
import basscssMargin from '../node_modules/basscss-margin/css/margin.css'
import basscssPadding from '../node_modules/basscss-padding/css/padding.css'
import basscssAlign from '../node_modules/basscss-align/css/align.css'

const css = [
  '.inline-block{display:inline-block} ',
  basscssGrid,
  basscssMargin,
  basscssPadding
].join(' ')
  .replace(/\n/, '')
  .replace(/\s\s+/, ' ')

const Style = () => (
  <style dangerouslySetInnerHTML={{ __html: css }} />
)

export default Style

