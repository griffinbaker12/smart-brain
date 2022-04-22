import { render } from 'react-dom';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import './facerecognition.css';

const FaceRecognition = ({
  imageURL,
  boxes,
  model,
  onInputChange,
  onButtonSubmit,
}) => {
  return (
    <div>
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
        message={
          model === 'facedetection'
            ? 'This Magic Brain will detect faces in your pictures. Give it a try.'
            : 'This Magin Brain recognizes objects within images. Give it a try.'
        }
        model={model}
      />
      {imageURL ? (
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
      ) : (
        ''
      )}
    </div>
  );
};

export default FaceRecognition;
