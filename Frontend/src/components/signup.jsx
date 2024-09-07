import React, { useState } from "react";
import "../styles/signup.css"; // Ensure this contains the necessary CSS
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BASE_URL from "../Server/base_url";

const Signup = () => {
  const [role, setRole] = useState("farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phno, setPhno] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");

  const onRoleChange = (event) => {
    setRole(event.target.value);
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onPhnoChange = (event) => {
    setPhno(event.target.value);
  };
  const onStateChange = (event) => {
    setState(event.target.value);
  };
  const onCityChange = (event) => {
    setCity(event.target.value);
  };
  const onPinChange = (event) => {
    setPin(event.target.value);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  const onSubmitSignUp = async () => {
    const response = await fetch(`${BASE_URL}/api/auth/createuser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: role,
        email: email,
        password: password,
        name: name,
        phno: phno,
        state: state,
        city: city,
        pin: pin,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("role", json.role);
      handleClick();
    } else if (json === "Exist") {
      Swal.fire({
        icon: "warning",
        title: "User Already Exist",
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Invalid Credentials",
      });
    }
  };

  return (
    <div className="container whole-body">
      <div className="form-container-signup">
        <p className="title">SignUp</p>

        <div className="input-group mb-3 option_signup">
          <select
            className="form-select"
            id="inputGroupSelect03"
            aria-label="Example select with button addon"
            onChange={onRoleChange}
          >
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="username">Name</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder=""
            onChange={onNameChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="phno">Phone Number</label>
          <input
            type="text"
            name="phno"
            id="phno"
            placeholder=""
            onChange={onPhnoChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder=""
            onChange={onEmailChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder=""
            onChange={onPasswordChange}
          />
        </div>

        <div className="input-group">
          {/* <label htmlFor="state">State</label> */}
          
          <select
            className="form-select"
            id="state"
            onChange={onStateChange}
            value={state}
          >
            <option value="" disabled>
              Select your state
            </option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder=""
            onChange={onCityChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="pin">PIN code</label>
          <input
            type="text"
            name="pin"
            id="pin"
            placeholder=""
            onChange={onPinChange}
          />
        </div>

        <button className="sign" onClick={onSubmitSignUp}>
          SignUp
        </button>
        <p className="signup">
          Already have an account?
          <Link to="/login" className="">
            {" "}
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
