import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom"
import firebasedb from '../../firebase';
import './index.css'

const Home = () => {
  let navigate = useNavigate();
  // data to Utilize props, setData for reseting props
  const [data,setData] = useState({
    firstName: '',
    lastName: '',
    phoneNo: '',
    emailID: '',
    address: '',
  })

  // receiving all data from db storing in 1 variable
  const [getData, setGetData] = useState({});


  // pushing details & storing to db
  useEffect (() => {
    firebasedb.child('register').on('value', details => {
      console.log(details.val()) // getting details from db
      setGetData(details.val()); 
    })
  },[])


  // props Assigning data in destructuring format
  const {firstName,lastName,phoneNo,emailId,address} = {...data}
  
  const changeHandler = event => {
    setData({...data, [event.target.id]: event.target.value})
  }

  
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(data)
    
    firebasedb.child('register').push(
      data,
      err => {
        if (err){
          console.log(err);
        }else{
          setData({
            firstName: '',
            lastName: '',
            phoneNo: '',
            emailId: '',
            address: '',
          })
        }
      }
    )
    
  }
  const onChangeDelete = key => {
    firebasedb.child(`register/${key}`).remove(
      err => {
        if (err) {
          console.log(err)
        }
      }
    )
  }

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
            value={data.emailId} />
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
              >Update</td> 
              <td onClick={() => onChangeDelete(key)}
              >Delete</td>
            </tr>
           )}
      </table>
        
      </div></>
  )
}

export default Home