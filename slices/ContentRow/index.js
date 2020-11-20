import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { RichText } from 'prismic-reactjs'

const sectionStyles = {
  maxWidth: '90vw',
  margin: '0 auto',
};

const containerStyles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
}

const columnStyles = {
  padding: '20px',
}

const linkResolver = () => {
  return '/'
}

const ContentRow = ({ slice }) => {
  const gridSize = useMemo(() => slice?.primary?.gridSize, [slice])
  const columns = useMemo(() => slice?.items, [slice])

  const columnSize = useMemo(() => 100 / gridSize, [gridSize])

  const renderColumn = (col, index) => {
    const content = col?.columnContent
    const size = col?.columnSize
    const isSpacer = col?.spacerColumn

    const columnWidth = `${size * columnSize}%`

    const styles = { ...columnStyles, width: columnWidth }

    if (isSpacer) {
      return (
        <div style={styles} key={index} />
      )
    } else {
      return (
        <div style={styles} key={index}>
          { RichText.render(content, linkResolver) }
        </div>
      )
    }
  }

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        { columns.map((col, index) => renderColumn(col, index)) }
      </div>
    </section>
  );
}

ContentRow.propTypes = {
  slice: PropTypes.shape({
    primary: PropTypes.shape({
      gridSize: PropTypes.number.isRequired,
    }).isRequired,
    items: PropTypes.array.isRequired,
  }).isRequired,
};

export default ContentRow;
