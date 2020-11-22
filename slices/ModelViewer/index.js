import React, { useRef, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';

import '@google/model-viewer'

const section = {
  width: '100%',
  height: 'calc(100vh - 80px)',
};

const modelStyles = {
  width: '100%',
  height: '100%',
}

const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

const ModelViewer = ({ slice }) => {
  const modelRef = useRef()

  const model = useMemo(() => slice?.primary?.model?.url, [slice])
  const cameraControls = useMemo(() => slice?.primary?.cameraControls, [slice])
  const autoRotate = useMemo(() => slice?.primary?.autoRotate, [slice])
  const autoplay = useMemo(() => slice?.primary?.autoplay, [slice])
  const color = useMemo(() => slice?.primary?.color, [slice])

  const parsedColor = useMemo(() => {
    if (color) {
      const rgbColor = hexToRgb(color)

      return [...Object.values(rgbColor).map((c) => c / 255), 1]
    } else {
      return null
    }
  }, [color])

  useEffect(() => {
    if (!parsedColor) {
      return
    }

    modelRef.current.addEventListener('scene-graph-ready', (ev) => {
      modelRef.current.model.materials[0].pbrMetallicRoughness.setBaseColorFactor(parsedColor)
    })
  }, [])

  return(
    <section style={section}>
      <model-viewer
        ref={modelRef}
        camera-controls={cameraControls}
        auto-rotate={autoRotate}
        autoplay={autoplay}
        src={model}
        style={modelStyles} />
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
