import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { selectLoggedInUser } from "../../features/user/UserSlice";

function Account() {
    const loggedInUser = useSelector(selectLoggedInUser);

    if (!loggedInUser) {
        return <Redirect to="/login" />;
    }
    
    return <div>Account</div>
}

export default Account;