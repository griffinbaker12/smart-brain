import Logo from '../Logo/Logo';
import './navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Logo />
        <p
          onClick={() => onRouteChange('signout')}
          style={{ alignSelf: 'center' }}
          className="effect mr3 f4 link white pa2 pointer bg-dark-gray br4 w-9"
        >
          Sign Out
        </p>
      </nav>
    );
  } else
    return (
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Logo />
        <p
          onClick={() => onRouteChange('signin')}
          style={{ alignSelf: 'center', marginLeft: 'auto' }}
          className="effect mr3 f4 link white pa2 pointer bg-dark-gray br4 w-9"
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange('register')}
          style={{ alignSelf: 'center' }}
          className="effect mr3 f4 link white pa2 pointer bg-dark-gray br4 w-9"
        >
          Register
        </p>
      </nav>
    );
};

export default Navigation;
