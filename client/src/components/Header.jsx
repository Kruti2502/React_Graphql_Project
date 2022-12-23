import { ReactComponent as Logo } from '../assets/logo.svg';
import { Link } from "react-router-dom";

export default function Header({ userDetails, onLogout }) {
  const clickHandler = () => {
    onLogout(false);
  }

  return (
    <nav className='navbar bg-light p-0 header'>
      <div className='d-flex align-items-center justify-content-between container'>
        <Link className="task-logo" to='/'>
          <div className='d-flex align-items-center'>
            <Logo width={60} height={60} />
            <div>Task</div>
          </div>
        </Link>
        {!userDetails.isAuthenticated ?
          (<div className='d-flex align-items-center gap-4'>
            <Link to='/login'>
              <button type="submit">Login</button>
            </Link>
            <Link to='/signup'>
              <button type="submit">Sign Up</button>
            </Link>
          </div>) :
          <div className='d-flex align-items-center gap-4'>
            <div className='profilePhoto d-flex align-items-center justify-content-center'>
              {userDetails.firstName.slice(0, 1) + userDetails.lastName.slice(0, 1)}
            </div>
            <Link to='/'>
              <button type="submit" onClick={clickHandler}>Log Out</button>
            </Link>
          </div>
        }
      </div>
    </nav>
  );
}
