import React, { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';

const section = {
  maxWidth: '600px',
  margin: '4em auto',
  textAlign: 'center',
};

import '@google/model-viewer'

const ModelViewer = ({ slice }) => {
  const modelRef = useRef()

  const model = useMemo(() => slice?.primary?.model?.url, [slice])
  const cameraControls = useMemo(() => slice?.primary?.cameraControls, [slice])
  const autoRotate = useMemo(() => slice?.primary?.autoRotate, [slice])

  return(
    <section style={section}>
      <model-viewer
        ref={modelRef}
        camera-controls={cameraControls}
        auto-rotate={autoRotate}
        src={model} />
    </section>
  );
}

ModelViewer.propTypes = {
  slice: PropTypes.shape({
    primary: PropTypes.shape({
      model: PropTypes.object.isRequired,
      cameraControls: PropTypes.bool,
      autoRotate: PropTypes.bool,
    }).isRequired,
  }).isRequired,
};

export default ModelViewer;
