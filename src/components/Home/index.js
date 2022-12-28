import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom"
import firebasedb from '../../firebase';
import './index.css'

const Home = () => {
  let navigate = useNavigate();
   
  const [data,setData] = useState({
    firstName: '',
    lastName: '',
    phoneNo: '',
    emailID: '',
    address: '',
  })

  const changeHandler = event => {
    setData({...data, [event.target.id]: event.target.value})
  }

  
  const onSubmitHandler = (event) => {
    event.preventDefault();
    
    firebasedb.child('register').push(
      data,
      setData({
        firstName: '',
        lastName: '',
        phoneNo: '',
        emailId: '',
        address: '',
      })
    )
  }

  const onChangeDelete = key => {
    firebasedb.child(`register/${key}`).remove()
  }

  const [getData, setGetData] = useState({});

  // Getting details from db 
  useEffect (() => {
    firebasedb.child('register').on('value', details => {
      setGetData(details.val()); 
    })
  },[])

  // Assigning props 
  const {firstName,lastName,phoneNo,emailId,address} = {...data}

  return(
    // Fragments, return a single JSX element
    <>
    <div className='topnav'>
      Home Page
    </div>
    <div className="bg-container">
      <h1>Enter Details</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="register-container">
          <label className="labels" htmlFor="firstName">
            First Name
          </label>{' '}
          <br />
          <input
            className="registers-label"
            onChange={changeHandler}
            id="firstName"
            type="text"
            value={firstName} />
        </div>
        <div className="register-container">
          <label className="labels" htmlFor="lastName">
            Last Name
          </label>{' '}
          <br />
          <input
            className="registers-label"
            onChange={changeHandler}
            id="lastName"
            type="text"
            value={lastName} />
        </div>
        <div className="register-container">
          <label className="labels" htmlFor="phoneNo">
            Phone No
          </label>{' '}
          <br />
          <input
            className="registers-label"
            onChange={changeHandler}
            id="phoneNo"
            type="text"
            value={phoneNo} />
        </div>
        <div className="register-container">
          <label className="labels" htmlFor="emailId">
            email
          </label>{' '}
          <br />
          <input
            className="registers-label"
            onChange={changeHandler}
            type="email"
            id="emailId"
            value={emailId} />
        </div>
        <div className="register-container">
          <label className="labels" htmlFor="address">
            Address
          </label>{' '}
          <br />
          <textarea
            className="registers-label"
            onChange={changeHandler}
            value={address}
            id="address" />
        </div>
        <div className="button-container">
          <button className="button" type="submit">
            Add Student
          </button>
        </div>
        <br />
      </form>
    </div>
    <div>
      <table>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Mobile</th>
          <th>Email</th>
          <th>Adress</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {getData &&
          Object.keys(getData).map(key => 
            <tr>
              <td>{getData[key].firstName}</td>
              <td>{getData[key].lastName}</td>
              <td>{getData[key].phoneNo}</td>
              <td>{getData[key].emailId}</td>
              <td>{getData[key].address}</td>
              <td onClick={() => navigate(`/Update?key=${key}`)}
              ><button className='update-button' >Update</button></td> 
              <td onClick={() => onChangeDelete(key)}
              ><button className='delete-button' >Delete</button></td>
            </tr>
           )}
      </table>

      </div></>
  )
}

export default Home
