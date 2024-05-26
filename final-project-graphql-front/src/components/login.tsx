import { useState } from 'react';
import { gql } from '../__generated__';
import { useMutation } from '@apollo/client';
import { AUTH_TOKEN } from '../constants';
//import { AUTH_TOKEN } from '../constants';


const REGISTER = gql(`
mutation Mutation($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
        code
        success
        message
        user {
            id
            username
        }
    }
}`);

const SIGNIN = gql(`
mutation SignIn($username: String!, $password: String!) {
    signInUser(username: $username, password: $password) {
        code
        success
        message
        token
        user {
            id
            username
        }
        sessionId
  }
    }
`)

const Login = () => {

    const [formState, setFormState] = useState({
      login: true,
      username: '',
      password: '',
    });

// REGISTER MUTATION
const [register, {data, loading, error}] = useMutation(REGISTER, {
    variables: {
    username: formState.username,
    password: formState.password
    }
});

if (loading) return 'Submitting...';
if (error) return `Submission error! ${error.message}`;

if (data) {
    //return `Data: ${data}`;
    return <div>
        <div>
            <ul>
                <li>Code: {data?.createUser?.code}</li>
                <li>Message: {data?.createUser?.message}</li>
                <li>Success: {data?.createUser?.success.toString()}</li>
                <li>User:
                    <ul>
                        <li>id: {data?.createUser?.user?.id}</li>
                        <li>username: {data?.createUser?.user?.username}</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
}

// SIGNIN MUTATION
const [signin, {data:data2, loading:loading2, error:error2}] = useMutation(SIGNIN, {
    variables: {
        username: formState.username,
        password: formState.password
    }
});

if (loading2) return 'Submitting...';
if (error2) return `Submission error! ${error2.message}`;

if (data2) {
    typeof data2.signInUser?.token === "string" ? localStorage.setItem(AUTH_TOKEN, data2.signInUser?.token): null;
    return <div>
        <div>
            <ul>
                <li>Code: {data2?.signInUser?.code}</li>
                <li>Message: {data2?.signInUser?.message}</li>
                <li>Success: {data2?.signInUser?.success.toString()}</li>
                <li>User:
                    <ul>
                        <li>id: {data2?.signInUser?.user?.id}</li>
                        <li>username: {data2?.signInUser?.user?.username}</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
}

  return (
    <div>
      <h2>LogIn Page</h2>
      <h4>
        {formState.login ? 'SignIn' : 'Register'}
      </h4>
      <div>
        <div>
            <label htmlFor="username">UserName</label>
            <input
                id = "username"
                value={formState.username}
                onChange={(e) =>
                setFormState({
                    ...formState,
                    username: e.target.value
                })
            }
            type="text"
            placeholder="Your name"
            />
        </div>   
        <div>
            <label htmlFor="password">Password</label>
            <input
            id="password"
            value={formState.password}
            onChange={(e) =>
                setFormState({
                ...formState,
                password: e.target.value
                })
            }
            type="password"
            placeholder="Choose a safe password"
            />
        </div>
      </div>
      <div>
        <button
          onClick={() => {formState.login ? signin() : register()}}
          //onClick={()=>register()}
        >
          {formState.login ? 'SignIn' : 'Register'}
        </button>
        <button
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login
            })
          }
        >
          {formState.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
      </div>
    </div>
    
  );
};

export default Login;