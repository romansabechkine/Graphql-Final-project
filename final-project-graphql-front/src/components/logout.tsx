import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const LOGOUT = gql(`
mutation signOut {
    signOutUser {
      code
      success
      message
    }
  }
`)

const Logout = () => {
    // LOGOUT MUTATION
    const navigate = useNavigate();
    const [logout, {data, loading, error}] = useMutation(LOGOUT)

    if (loading) return 'Submitting...';
    if (error) return `Submission error: ${error.message}`;

    if (data?.signOutUser?.success) {

        return <div>
            <div>
                <ul>
                    <li>Code: {data?.signOutUser?.code}</li>
                    <li>Success: {data?.signOutUser?.success.toString()}</li>
                    <li>Message: {data?.signOutUser?.message}</li>
                </ul>
            </div>
        </div>
    }

    return (
        <div>
            <h2>LogOut Page</h2>
            <button name="LOGOUT" onClick = {() => {
            logout() }}>LOGOUT</button>
        </div>
    )
}

export default Logout



