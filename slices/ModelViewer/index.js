import React, { useRef, useMemo } from 'react';
import { shape, string, boolean } from 'prop-types';
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
  slice: shape({
    primary: shape({
      model: string.isRequired,
      cameraControls: boolean,
      autoRotate: boolean,
    }).isRequired,
  }).isRequired,
};

export default ModelViewer;
