import React,{useEffect, useState} from 'react';
const Contact=()=>{
    //show data dynamically on about page
    const [userData, setUserData] = useState({}); //if object null then also show

    const callContactPage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await res.json();//return promise
            console.log(data);
            setUserData(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
            // history.push('/login');
        }
    }
    //react hook function it used here to show about page only for validate user

    useEffect(() => {
        callContactPage();
    }, []);//it is array dependency i.e only once time run

    return(
        <div>
            <div className="contact_info">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">

                            {/* phone number */}
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                            <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Phone
                                    </div>
                                    <div className="contact_info_text">
                                        +91 9876543210
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                            <img src="https://img.icons8.com/ultraviolet/24/000000/filled-message.png" alt="" />
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Email
                                    </div>
                                    <div className="contact_info_text">
                                        amey@gmail.com
                                    </div>
                                </div>
                            </div> 

                            {/* Address */}
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                            <img src="https://img.icons8.com/ultraviolet/24/000000/map-marker.png" alt="" />
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Address
                                    </div>
                                    <div className="contact_info_text">
                                        Ratnagiri
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            
            {/* contact us form */}
            <div className="contact_form">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="contact_form_container py-5">
                                <div className="contact_form_title">
                                    Get in Touch
                                </div>
                                <form id="contact_form">
                                    <div className="contact_form_name d-flex justify-content-between align-items-between">
                                        <input type="text" id="contact_form_name" className="contact_form_name input_field" 
                                            value={userData.name} //data dynamically show on form
                                            placeholder="Enter your name" required="true"/>
                                        <input type="email" id="contact_form_email" className="contact_form_email input_field" 
                                            value={userData.email}
                                            placeholder="Enter your email" required="true"/>
                                        <input type="number" id="contact_form_phone" className="contact_form_phone input_field" 
                                            value={userData.phone}
                                            placeholder="Enter your Mobile Number" required="true"/>
                                    </div>
                                    <div className="contact_form_text mt-4">
                                        <textarea className="text_field contact_form_message" placeholder="Enter Message here" cols="30" rows="10"></textarea>
                                    </div>
                                    <div className="contact_form_button">
                                        <button type="submit" className="button contact_submit_button">Send Message</button>
                                    </div>
                                </form>
                            </div>     
                        </div>
                    </div>   
                </div>
            </div>
        </div>
    )
}
export default Contact;