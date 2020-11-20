import React, { useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { RichText } from 'prismic-reactjs'

const sectionStyles = {
  maxWidth: '600px',
  margin: '0 auto',
};

const listStyles = {
  position: 'relative',
};

const itemStyles = {
  display: 'block',
  width: '100%',
  textAlign: 'left',
  marginBottom: '20px',
}

const previewStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '200px',
}

const linkResolver = () => {
  return '/'
}

const PreviewList = ({ slice }) => {
  const [selectedPreview, setSelectedPreview] = useState(null)

  const items = useMemo(() => slice?.items, [slice])

  const handleMouseEnter = useCallback((image) => {
    setSelectedPreview(image)
  }, [])

  const handleMouseLeave = useCallback((image) => {
    setSelectedPreview(null)
  }, [])

  const renderItem = (item, index) => {
    const content = item?.content
    const url = item?.url?.url
    const image = item?.preview?.url

    return (
      <a
        style={itemStyles}
        href={url}
        onMouseEnter={() => handleMouseEnter(image)}
        onMouseLeave={() => handleMouseLeave()}
        key={index}>
        { RichText.render(content, linkResolver) }
      </a>
    )
  }

  return (
    <section style={sectionStyles}>
      <div style={listStyles}>
        { items.map((item, index) => renderItem(item, index)) }

        { selectedPreview &&
          <img src={selectedPreview} style={previewStyles} />
        }
      </div>
    </section>
  );
}

PreviewList.propTypes = {
  slice: PropTypes.shape({
    items: PropTypes.array.isRequired,
  }).isRequired,
};

export default PreviewList;
