import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

const sectionStyle = {
  padding: '8px',
}

const anchorStyle = {
  fontSize: '30px',
  color: 'black',
}

const icons = [
  'facebook',
  'instagram',
  'twitter',
  'youtube',
  'twitch',
  'telegram',
  'soundcloud',
]

const SocialLink = ({ slice }) => {
  const type = useMemo(() => slice?.primary?.type, [slice])
  const url = useMemo(() => slice?.primary?.url?.url, [slice])

  const icon = useMemo(() => icons.indexOf(type) !== -1 ? type : null, [type])

  return (
    <section style={sectionStyle}>
      <a href={url} target="_blank" style={anchorStyle}>
        <FontAwesomeIcon icon={['fab', icon]} />
      </a>
    </section>
  )
}

SocialLink.propTypes = {
  slice: PropTypes.shape({
    primary: PropTypes.shape({
      type: PropTypes.string.isRequired,
      url: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
}

export default SocialLink
