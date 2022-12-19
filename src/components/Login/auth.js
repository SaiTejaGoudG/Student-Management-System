import firebase from 'firebase/compat/app'
import 'firebase/auth'
// eslint-disable-next-line
import { auth } from '../../firebase'
  
export const login = async({email, password})=>{
    const res = await firebase.auth()
      .signInWithEmailAndPassword(email, password);
    return res;
}
