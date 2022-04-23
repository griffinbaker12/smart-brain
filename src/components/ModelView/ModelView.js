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
      <div className="model-select">
        <p>SELECT A MODEL</p>
        <div onClick={updateModel} className="flex center model-buttons">
          <button
            name="facedetection"
            className={`model-one dib grow br-pill model-button ${
              model === 'facedetection' ? 'active' : 'inactive'
            }`}
          >
            Face Detection
          </button>
          <button
            name="prediction"
            className={`model-two dib grow br-pill model-button ${
              model !== 'facedetection' ? 'active' : 'inactive'
            }`}
          >
            Prediction
          </button>
        </div>
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
