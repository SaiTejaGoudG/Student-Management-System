import React , {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import firebasedb from '../../firebase';

const UpdateDetails = () => {
  // URLSearchParams help in parsing and accessing Query Parameters.
    let query = new URLSearchParams(useLocation().search);
    let navigate = useNavigate()

    const [key,setKey]= useState(null)
    const [data,setData] = useState({
        firstName: '',
        lastName: '',
        phoneNo: '',
        emailId: '',
        address: '',
    })
    
    const changeHandler = event => {
        setData({...data, [event.target.id]: event.target.value})
    }

    // Set Key from URL params. 
    useEffect(()=>{setKey(query.get('key'))},[])

    // Getting Student Records from Database , using Key.  
    useEffect(()=> {
      if(key){
        firebasedb.child(`register/${key}`).on('value',data=>{
          const dbData= data.val()
          setData(dbData)
        })
      }   
    },[key])

    // Updating values & Navigating to Home page 
    const submitHandler = event => {
      firebasedb.child(`register/${key}`).update(data,navigate('/Home'))
    }

    const {firstName,lastName,phoneNo,emailId,address} = {...data}

    return (
        <div className="bg-container">
      <div className='topnav' style={{width:'100vw'}}>
      Update Page
    </div>
      <h1>Update Details</h1>
      <form >
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
            type="number"
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
          <input className="button" value="save" type="button" onClick={submitHandler}/>
        </div>
        <br />
      </form>
    </div>
    )
}

export default UpdateDetails
