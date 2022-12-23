import { ReactComponent as Logo } from '../assets/logo.svg';
import "./Header.css";
import {Link} from "react-router-dom";

export default function Header() {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
      <div className='container'>
        <Link className="task-logo" to='/'>
          <div className='d-flex align-items-center'>
            <Logo width={60} height={60} />
            <div>Task</div>
          </div>
        </Link>
      </div>
    </nav>
  );
}
