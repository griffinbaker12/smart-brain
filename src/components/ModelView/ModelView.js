import { Component } from 'react';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import ModelOutput from '../ModelOutput/ModelOutput';
// import FaceRecognition from '../FaceRecognition/FaceRecognition';
// import Prediction from '../Prediction/Prediction';
import './modelview.css';

function ModelView(props) {
  const {
    onInputChange,
    onButtonSubmit,
    boxes,
    imageURL,
    prediction,
    updateModel,
    model,
    predictionURL,
    predictedValues,
    imageHeight,
  } = props;
  return (
    <div>
      <div onClick={updateModel} className="pa3 flex center model-buttons">
        <button
          name="facedetection"
          className={`dib grow br-pill model-button ${
            model === 'facedetection' ? 'active' : 'inactive'
          }`}
        >
          Face Detection
        </button>
        <button
          name="prediction"
          className={`dib grow br-pill model-button ${
            model !== 'facedetection' ? 'active' : 'inactive'
          }`}
        >
          Prediction
        </button>
      </div>
      <div>
        <ModelOutput
          boxes={boxes}
          predictedValues={predictedValues}
          imageURL={imageURL}
          predictionURL={predictionURL}
          model={model}
          onInputChange={onInputChange}
          onButtonSubmit={onButtonSubmit}
          imageHeight={imageHeight}
        />
      </div>
    </div>
  );
}

export default ModelView;
