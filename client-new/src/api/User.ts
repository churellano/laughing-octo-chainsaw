import { getData, postData } from '../helpers/http';
import { USER_API_URL } from '../constants';
import { User } from '../interfaces/User';
import { LoginDetails } from '../interfaces/LoginDetails';
import { SignupDetails } from '../interfaces/SignupDetails';

const UserAPI = {
    /**
     * Attempt to login with provided user credentials
     * @param loginDetails
     * @returns Promise<IUSer>
     */
    login: (loginDetails: LoginDetails): Promise<User> => {
        return postData<User>(USER_API_URL + 'login', loginDetails);
    },
    /**
     * Attempt to create a new account with provided user information
     * @param signupDetails
     * @returns Promise<IUSer>
     */
    signup: (signupDetails: SignupDetails): Promise<User> => {
        return postData<User>(USER_API_URL + 'signup', signupDetails);
    },
    /**
     * Checks if email is available
     * @param email
     * @returns boolean
     */
     isEmailAvailable: (email: string): Promise<boolean> => {
        return getData(USER_API_URL + 'isEmailAvailable/' + email);
    },
    /**
     * Checks if username is available
     * @param username
     * @returns boolean
     */
    isUsernameAvailable: (username: string): Promise<boolean> => {
        return getData(USER_API_URL + 'isUsernameAvailable/' + username);
    }
}

export default UserAPI;