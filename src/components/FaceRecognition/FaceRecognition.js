import { render } from 'react-dom';
import './facerecognition.css';

const FaceRecognition = ({ imageURL, boxes }) => {
  return (
    <div className="ma center">
      <div className="mt2 relative">
        <img id="inputimage" height="auto" width="500px" src={imageURL} />
        {boxes.map((box, i) => {
          return (
            <div
              key={`face-${i}`}
              className="bounding-box"
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
