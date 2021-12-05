import React from 'react';
import {Link} from 'react-router-dom'


const Contact = () => {
    const onSubmit = (e) => {
        e.preventDefault();
        alert('Sent successfully')

    };

    return (
        <section className="container">
            <h1 className="large text-primary">Contact Us!</h1>

            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">

                    <label>Name</label>
                    <input type="text" name="name"/>
                    <label>Subject</label>
                    <input type="text" name="subject"/>
                    <label>Phone Number</label>
                    <input type="text" name="phone"/>
                    <label>Message</label>
                    <textarea name="message"></textarea>
                    <input type="submit" name="send" value="Send Message"/>
                </div>
            </form>
        </section>
    );
};

export default Contact;
