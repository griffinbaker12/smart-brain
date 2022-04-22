import { Component } from 'react';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';

function Prediction(props) {
  const {
    predictedValues,
    predictionURL,
    model,
    onInputChange,
    onButtonSubmit,
    imageHeight,
  } = props;
  return (
    <div>
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
        message={
          model === 'facedetection'
            ? 'This Magic Brain will detect faces in your pictures. Give it a try.'
            : 'This Magin Brain identifies concepts within images. Give it a try.'
        }
        model={model}
      />
      {predictionURL ? (
        <div className="ma center-model">
          <div className="mt2 relative model-view">
            <img
              id="inputimage"
              height="auto"
              width="500px"
              src={predictionURL}
            />
          </div>
          {predictedValues ? (
            <div
              className="prediction-model-container"
              style={{ height: imageHeight > 0 ? imageHeight : 'auto' }}
            >
              <ul className="prediction-container">
                <li className="prediction-heading">
                  <h3 className="predicted-concept">
                    <span>Predicted </span>
                    <span>Concept</span>
                  </h3>
                  <h3>Probability</h3>
                </li>
                {predictedValues.map(guess => (
                  <li
                    key={guess.id}
                    className="b--dotted concept br-0 bt-0 bl-0 pv3 ba flex list-item justify-between"
                  >
                    <span>{guess.name}</span>
                    <span>{guess.value.toFixed(3)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Prediction;
