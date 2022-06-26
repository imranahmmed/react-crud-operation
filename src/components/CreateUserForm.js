import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const CreateUserForm = props => {
    const { btnText, handleSubmitData, selectedUser } = props
    const [user, setUser] = useState({
        username: '',
        email: ''
    })
    const { username, email } = user;
    // ==================================
    // Update User
    // ==================================
    useEffect(() => {
        setUser({
            username: selectedUser.username,
            email: selectedUser.email,
        })
    }, [selectedUser])

    // ==================================
    // handle Field Change
    // ==================================
    const handleChange = (e) => {
        const selectedField = e.target.name;
        const selectedValue = e.target.value;
        setUser(prevState => {
            return { ...prevState, [selectedField]: selectedValue }
        })
    }
    // ==================================
    // handle Form Submit
    // ==================================
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSubmitData(user);
        setUser({
            username: '',
            email: ''
        })
    }
    return (
        <Form onSubmit={handleSubmit}>
            <div style={{ backgroundColor: "rgb(46 75 88)", padding: "25px", color: "#fff" }}>
                <Form.Group className='mb-3' style={{ textAlign: "left" }}>
                    <Form.Label htmlFor='username' style={{ fontWeight: "600" }}>User Name</Form.Label>
                    <Form.Control type="text" id='username' name='username' value={username} onChange={handleChange} placeholder="Enter Username" required />
                </Form.Group>

                <Form.Group className='mb-3' style={{ textAlign: "left" }}>
                    <Form.Label htmlFor='email' style={{ fontWeight: "600" }}>Email address</Form.Label>
                    <Form.Control type="email" id='email' name='email' value={email} onChange={handleChange} placeholder="Enter Email" required />
                </Form.Group>

                <Button type="submit" className='btn btn-success w-25'>{btnText}</Button>
            </div>
        </Form>
    )
}

CreateUserForm.defaultProps = {
    selectedUser: {
        username: '',
        email: '',
    }
}

export default CreateUserForm