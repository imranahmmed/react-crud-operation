import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CreateUserForm from './components/CreateUserForm';

const URL = "https://rest-api-without-db.herokuapp.com/users/"

function App() {
	// ==================================
	// Setup Initial States
	// ==================================
	const [users, setUsers] = useState(null)
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	// ==================================
	// update User States
	// ==================================
	const [selectedUser, setSelectedUser] = useState({
		username: '',
		email: ''
	})
	const [updateFlag, setUpdateFlag] = useState(false)
	const [selectedUserIdForUpdate, setSelectedUserIdForUpdate] = useState('')

	// ==================================
	// get All Users ("GET" Method (Default))
	// ==================================
	const getAllUsers = () => {
		fetch(URL)
			.then((res) => {
				if (!res.ok) {
					throw Error("Could Not Fetch")
				}
				return res.json()
			})

			.then((data) => {
				setUsers(data.users);
			})
			.catch((err) => {
				setError(err.message);
			})

			.finally(() => {
				setIsLoading(false)
			})
	}

	useEffect(() => {
		getAllUsers()
	}, [])

	// ==================================
	// Delete User ("DELETE" Method)
	// ==================================
	const handleDelete = (id) => {
		fetch(URL + `/${id}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (!res.ok) {
					throw Error("Could Not Delete")
				}
				getAllUsers();
			})

			.catch((err) => {
				setError(err.message);
			})
	}

	// ==================================
	// Add New User ("POST" Method)
	// ==================================

	const addUser = (user) => {
		fetch(URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(user)
		})
			.then((res) => {
				if (res.status === 201) {
					getAllUsers();
				} else {
					throw new Error("Could Not Create New User")
				}
			})

			.catch((err) => {
				setError(err.message);
			})
	}
	// ==================================
	// Update User ("PUT" Method)
	// ==================================
	const updateUser = (user) => {
		fetch(URL + `/${selectedUserIdForUpdate}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(user)
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Failed to Update");
				}
				getAllUsers();
				setUpdateFlag(false);
			})

			.catch((err) => {
				setError(err.message);
			})
	}
	// =========================================================
	// handle Edit Child to parent component data pass
	// =======================================================
	const handleEdit = (id) => {
		setSelectedUserIdForUpdate(id);
		setUpdateFlag(true);
		const filterData = users.filter((user) => user.id === id);
		setSelectedUser({
			username: filterData[0].username,
			email: filterData[0].email,
		})
	}

	return (
		<div className="App">
			<div className='header'>
				<h1>CRUD - Operations</h1>
				<p>HTTP Request from React App</p>
			</div>

			<Container>

				{/* ======================================================= */}
				{/* Add New user Form */}
				{/* ======================================================= */}
				<Row className='justify-content-center'>
					<Col md={6}>
						{updateFlag ? <CreateUserForm btnText="Update User" selectedUser={selectedUser} handleSubmitData={updateUser} />
							: <CreateUserForm btnText="Add User" handleSubmitData={addUser} />
						}
					</Col>
				</Row>


				{/* ======================================================= */}
				{/* All Users */}
				{/* ======================================================= */}
				<Row>
					{isLoading && <h2>Loading...</h2>}
					{error && <h2>{error}</h2>}
					{users && users.map((user) => {
						const { id, username, email } = user;
						return (
							<Col md={4} key={id}>
								<article className="card" style={{ backgroundColor: "darkslategrey", padding: "15px", color: "#fff", margin: "12px 0" }}>
									<p>{username}</p>
									<p>{email}</p>
									<div className='d-flex align-items-center justify-content-center'>
										<button className='btn btn-success mx-1 w-25' onClick={() => { handleEdit(id) }}>Edit</button>
										<button className='btn btn-success mx-1 w-25' onClick={() => { handleDelete(id) }}>Delete</button>
									</div>
								</article>
							</Col>
						)
					})}
				</Row>
			</Container>










		</div>
	);
}

export default App;
