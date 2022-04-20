import React, {useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import signpic from "../images/regi.png";

const Signup = () => {
    //Connection to DB(CONNECT APP TO BACKEND)
   const history = useHistory();
   //store user data using react state
   const [user, setUser] = useState({
       name: "", email: "", phone: "", work: "", password: "", cpassword: ""
   });

   let name, value;//name means name="" property in input box value={user.name=""}

   const handleInputs = (e) => {
       console.log(e);
       name = e.target.name;
       value = e.target.value;
       
       setUser({...user, [name]:value});
   }
    
   //send data to backend
   const PostData = async (e) => {
    e.preventDefault();

        const { name, email, phone, work, password, cpassword } = user;//object de-structring

        const res = await fetch("/register", {
            method: "POST",
            //same as postman header type
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({//convert json data into string
                name, email, phone, work, password, cpassword//same as name:userEntername etc
            })
        });

        const data = await res.json();//actal data got here

        // I need to change the data to res 
        if (data.status === 422 || !data) {
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        } else {
            window.alert(" Registration Successfull");
            console.log("Successfull Registration");

            history.push("/login");
        }
    }

    //Design
    return (
        <div>
            <section className="signup">
                <div className="container mt-5">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form" id="register-form">
                                
                                <div className="form-group">
                                    <label htmlFor="name">
                                        <i className="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                        <input type="text" name="name" id="name" autocomplete="off" 
                                        value={user.name} onChange={handleInputs} placeholder="Enter your Name"/> 
                                </div>

                                 <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type="email" name="email" id="email" autoComplete="off" 
                                    value={user.email} onChange={handleInputs} placeholder="Enter your Email"/>
                                </div>

                                 <div className="form-group">
                                    <label htmlFor="phone">
                                        <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                                    </label>
                                    <input type="number" name="phone" id="phone" autoComplete="off" 
                                    value={user.phone} onChange={handleInputs} placeholder="Enter your Phone"/>
                                </div>

                                 <div className="form-group">
                                    <label htmlFor="work">
                                        <i className="zmdi zmdi-slideshow material-icons-name"></i>
                                    </label>
                                    <input type="text" name="work" id="work" autoComplete="off" 
                                    value={user.work} onChange={handleInputs} placeholder="Enter your Profession"/>
                                </div>

                                 <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off" 
                                    value={user.password} onChange={handleInputs} placeholder="Enter your Password"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cpassword">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" name="cpassword" id="cpassword" autoComplete="off" 
                                    value={user.cpassword} onChange={handleInputs} placeholder="Enter your Confirm Your Password"/>
                                </div>

                                <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" 
                                value="register" onClick={PostData}/>
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure>
                                <img src={signpic} alt="signup image" />
                            </figure>
                            <NavLink to="/login" className="signup-image-link">I am already register</NavLink>
                        </div>
                    </div>    
                </div>
           </section>
        </div>
    )
}
export default Signup;

// "proxy": "http://localhost:8888/", path of backend(add in frontend wala package.json file below private:true) =connect frontend to backend 
