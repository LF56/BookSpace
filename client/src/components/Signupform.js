import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { useState } from "react";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        username: formState.username,
        // firstName: formState.firstName,
        // lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m">
      <Link to="/login" id="login">
        Already A User? Click here to login!
      </Link>

      <h2>SIGN UP</h2>
      <form onSubmit={handleFormSubmit}>
        {/* <div className="uk-form-width-default">
            <label htmlFor="firstName">First Name:</label>
            <input
               className='uk-input uk-form-width-default uk-border-rounded'
              placeholder="First"
              name="firstName"
              type="firstName"
              id="firstName"
              onChange={handleChange}
            />
          </div>
          <div className="uk-form-width-default">
            <label htmlFor="lastName">Last Name:</label>
            <input
               className='uk-input uk-form-width-default uk-border-rounded'
              placeholder="Last"
              name="lastName"
              type="lastName"
              id="lastName"
              onChange={handleChange}
            />
          </div> */}
        <div className="uk-form-width-default">
          <label htmlFor="username">Username:</label>
          <input
            className="uk-input uk-form-width-default uk-border-rounded"
            placeholder="Username"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="uk-form-width-default">
          <label htmlFor="email">Email:</label>
          <input
            className="uk-input uk-form-width-default uk-border-rounded"
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="uk-form-width-default">
          <label htmlFor="pwd">Password:</label>
          <input
            className="uk-input uk-form-width-default uk-border-rounded"
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="uk-form-width-default">
          <button type="submit" className="uk-button uk-button-default">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
