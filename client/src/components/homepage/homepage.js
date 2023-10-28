import React, { useState, useEffect } from "react"
import "./homepage.css"
import axios from 'axios';
import '../register/register';

const Homepage = ({setLoginUser}) => {
    const [users, setUsers] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:9002/getusers').then(users => setUsers(users.data)).catch(err=>console.log(err))
    },[])


    return (
        <div className="homepage">
            <h1>Homepage</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Email</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user=>{
                                return <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.dateofbirth}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="button" onClick={() => setLoginUser({})} >Logout</div>
        </div>
    )
}

export default Homepage