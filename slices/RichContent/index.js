import React, { useMemo } from 'react'
import { array, shape } from 'prop-types'
import { RichText } from 'prismic-reactjs'

const sectionStyle = {
  padding: '8px',
}

const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
}

const htmlRenderer = (content, index) => {
  const { type, text } = content

  switch(type) {
    case 'o-list-item':
      return <li key={index}>{text}</li>
    case 'paragraph':
      return <p key={index}>{text}</p>
    case 'heading6':
      return <h6 key={index}>{text}</h6>
    case 'heading5':
      return <h5 key={index}>{text}</h5>
    case 'heading4':
      return <h4 key={index}>{text}</h4>
    case 'heading3':
      return <h3 key={index}>{text}</h3>
    case 'heading2':
      return <h2 key={index}>{text}</h2>
    case 'heading1':
      return <h1 key={index}>{text}</h1>
    default:
      return null
  }
}

const RichContent = ({ slice }) => {
  const title = useMemo(() => slice?.primary?.title, [slice])
  const content = useMemo(() => slice?.primary?.content, [slice])

  return (
    <section style={sectionStyle}>
      { title &&
        <RichText render={title} />
      }

      { content?.length > 0 &&
        <div style={contentStyle}>
          { content.map((c, index) => htmlRenderer(c, index)) }
        </div>
      }
    </section>
  )
}

RichContent.propTypes = {
  slice: shape({
    primary: shape({
      title: array.isRequired,
      content: array,
    }).isRequired,
  }).isRequired,
}

export default RichContent
