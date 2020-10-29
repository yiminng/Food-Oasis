
import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'

const defaultDescription = 'Food Oasis provides verified information about free food resources, such as address, location, phone number, etc. to food seekers in the LA county area and to help them find resources near them by visualizing all of these organizations on one map.'
const defaultOGURL = ''
const defaultOGImage = ''
const defaultTitle = 'Food Oasis'

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || defaultTitle}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" sizes="192x192" href="/images/touch-icon.png" />
    <link rel="apple-touch-icon" href="/images/touch-icon.png" />
    {/* <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" /> */}
    <link rel="icon" href="/favicon.ico" />
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ''} />
    <meta
      property="og:description"
      content={props.description || defaultDescription}
    />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </NextHead>
)

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Head
