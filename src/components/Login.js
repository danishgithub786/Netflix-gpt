import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true)
  const [errMessage, setErrMessage] = useState(null)
  const navigate = useNavigate()

  const email = useRef(null)
  const password = useRef(null)
  const name = useRef(null)
  const dispatch = useDispatch()


  const handleButtonClick = () => {
    //Validate the Form Data
    const message = checkValidData(email.current.value, password.current.value)
    setErrMessage(message)

    if (message) return

    //sign in sign up logic
    if (!isSignInForm) {
      //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://plus.unsplash.com/premium_photo-1664478294015-19518f51684f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpZWZ8ZW58MHx8MHx8fDA%3D"
          }).then(() => {
            // Profile updated!

            //fetching the updated value from auth
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({
              uid: uid,
              email: email,
              displayName: displayName, 
              photoURL: photoURL
            }))

            navigate("/browse")
          }).catch((error) => {
            setErrMessage(error.message)
          });

          console.log(user)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage)
          // ..
        });
    }
    else {
      //sign in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
          navigate("/browse")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage)
        });

    }
  }
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg' />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className='absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && <input type='text' ref={name} placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700 ' />}
        <input type='text' placeholder='email address' className='p-4 my-4 w-full bg-gray-700 ' ref={email} />
        <input type='password' placeholder='password' className='p-4 my-4 w-full bg-gray-700' ref={password} />
        <p className='text-red-700 font-bold text-lg py-2'>{errMessage}</p>
        <button className='p-4 my-6 bg-red-700 w-full rounded-lg ' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to netflix SignUp now" : "Already Registered Sign In Now"}</p>
      </form>
    </div>

  )
}

export default Login;