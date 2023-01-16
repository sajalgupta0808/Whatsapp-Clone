import React from 'react'
import './Login.css'
import {Button} from '@material-ui/core'
import { auth,provider } from './firebase';
import {actionTypes} from "./reducer"
import {useStateValue} from './StateProvider'

function Login() {
    const[{},dispatch] = useStateValue();

    const signIn = () => {

        auth.signInWithPopup(provider).then((result) =>{ 

            // console.log(result)
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,

            })

        }).catch(error =>
                alert(error.message)
                )

    };
    return (
        <div className="login">
            <div className="login_container">
                <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVyM8UqYD7e1vRD1jy21OySMs-GCkUQi5O-A&usqp=CAU"
                alt=""
                />
                <div className="login_text">
                    <h1>Sign in to whatsapp</h1>
                </div>
                <Button type="submit" onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
