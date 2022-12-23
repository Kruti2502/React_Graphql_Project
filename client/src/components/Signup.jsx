import { useState } from "react"
import { useMutation } from '@apollo/client';
import { ADD_USER } from "../mutations/userMutations";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [addUser, { error, loading }] = useMutation(ADD_USER, {
        variables: { firstName, lastName, email, password },
    });

    const onSubmit = (e) => {
        e.preventDefault();

        addUser(firstName, lastName, email, password);
        if (!loading && !error) {
            navigate("/login");
        }

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');

    }

    if (loading) return <Spinner />;
    if (!loading && error) return <p>Something Went Wrong</p>;

    return (
        <div className="container">
            <form className="form-input" onSubmit={onSubmit}>
                <div className="col-4 mt-3">
                    <label htmlFor="validationCustom01">First name</label>
                    <input type="text" className="form-control" onChange={e => setFirstName(e.target.value)} required />
                </div>
                <div className="col-4 mt-3 ">
                    <label htmlFor="validationCustom02" className="form-label">Last name</label>
                    <input type="text" className="form-control" id="validationCustom02" onChange={e => setLastName(e.target.value)} required />
                </div>
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
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
}
