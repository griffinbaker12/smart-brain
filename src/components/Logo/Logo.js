import Tilt from 'react-tilt';
import brain from './brain.png';
import './logo.css';

const Logo = () => {
  return (
    <div className="">
      <Tilt
        className="Tilt ma3 br3 shadow-2"
        max={55}
        style={{ height: 150, width: 150 }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className="pa4"
        >
          <img src={brain} alt="logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
