import Spinner from './Spinner';
import { useEffect, useState } from "react"
import { useLazyQuery } from '@apollo/client';
import { GET_AUTHENTICATED } from '../queries/userQueries';
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [authenticated, { data, error, loading }] = useLazyQuery(GET_AUTHENTICATED);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    await authenticated({ variables: { email,password } });
    if (!loading && !error) {
      navigate("/addmodal");
    }
    setEmail('');
    setPassword('');
  }

  useEffect(() => {
    if (data ) {
      onLogin(data)
    }
    // eslint-disable-next-line
  },[data]);
  
  if (loading) return <Spinner />;

  return (
    <div className='container'>
      <form className="form-input" onSubmit={onSubmit}>
        <div className="col-4 mt-3">
          <label htmlFor="validationCustomUsername" className="form-label">Email</label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">@</span>
            <input type="email" className="form-control" id="validationCustomUsername" onChange={e => setEmail(e.target.value)} aria-describedby="inputGroupPrepend" required />
          </div>
        </div>
        <div className="col-4 mt-3">
          <label htmlFor="validationCustom03" className="form-label">Password</label>
          <input type="text" className="form-control" id="validationCustom03" onChange={e => setPassword(e.target.value)} required />
        </div>
        <div className="col-4 mt-5 text-center" >
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
