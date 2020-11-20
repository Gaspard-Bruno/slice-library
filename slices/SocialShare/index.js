import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import * as shareComponents from 'react-share'

const sectionStyle = {
  padding: '8px',
}

const SocialShare = ({ slice }) => {
  const type = useMemo(() => slice?.primary?.type, [slice])
  const url = useMemo(() => slice?.primary?.url?.url, [slice])
  const color = useMemo(() => slice?.primary?.color, [slice])
  const size = useMemo(() => slice?.primary?.size, [slice])
  const round = useMemo(() => slice?.primary?.round, [slice])

  const typeCapitalized = useMemo(() => `${type.charAt(0).toUpperCase()}${type.substring(1)}`, [type])
  const ShareButton = useMemo(() => shareComponents[`${typeCapitalized}ShareButton`], [typeCapitalized])
  const ShareIcon = useMemo(() => shareComponents[`${typeCapitalized}Icon`], [typeCapitalized])

  return (
    <section style={sectionStyle}>
      <ShareButton url={url}>
        <ShareIcon size={size} iconFillColor={color} round={round} />
      </ShareButton>
    </section>
  )
}

SocialShare.propTypes = {
  slice: PropTypes.shape({
    primary: PropTypes.shape({
      type: PropTypes.string.isRequired,
      url: PropTypes.object.isRequired,
      color: PropTypes.string,
      size: PropTypes.number,
      round: PropTypes.bool,
    }).isRequired,
  }).isRequired,
}

export default SocialShare
