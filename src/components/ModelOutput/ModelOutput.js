import './modeloutput.css';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import Prediction from '../Prediction/Prediction';

const ModelOutput = ({
  imageURL,
  predictedValues,
  predictionURL,
  model,
  boxes,
  onInputChange,
  onButtonSubmit,
  imageHeight,
}) => {
  return (
    <div className="">
      {model === 'facedetection' ? (
        <FaceRecognition
          onInputChange={onInputChange}
          onButtonSubmit={onButtonSubmit}
          boxes={boxes}
          imageURL={imageURL}
          model={model}
        />
      ) : (
        <Prediction
          onInputChange={onInputChange}
          onButtonSubmit={onButtonSubmit}
          predictedValues={predictedValues}
          predictionURL={predictionURL}
          model={model}
          imageHeight={imageHeight}
        />
      )}
    </div>
  );
};

export default ModelOutput;
