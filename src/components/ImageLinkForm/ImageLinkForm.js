import './imagelinkform.style.css';

const ImageLinkForm = ({ message, onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3 mt2">{message}</p>
      <div className="link-form-container center">
        <div className="center form pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="fw6 w-30 grow f4 link ph2 pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
