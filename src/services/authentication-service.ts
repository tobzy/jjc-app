import { USER_ROLES } from '../lib/constants';
import { mainApi } from '../lib/apis';

/**
 * @description
 * Our authentication service.
 */
interface SignInResponse {
  responseCode: string;
  responseStatus: string;
  responseMessage: string;
  responsePayload: {
    token: string;
    expiresAt: string;
  };
}
export class AuthenticationService {
  /**
   * @description
   * Signs the user in by setting their their user information in the browsers LocalStorage.
   */

  static async signin(loginData: IUserSigninData): Promise<SignInResponse> {
    const response = await mainApi.post(`/auth/signin/`, loginData);
    return response?.data?.data;
  }

  /**
   * @desciption
   * Logs out the currently authenticated user.
   * remove the logged in user's data from the browser's LocalStorage.
   * This method also clears the full local storage for our app.
   */
  static async signout(): Promise<any> {
    try {
      return true;
      // call signout endpoint if any and clear local storage
    } catch (error) {}
  }

  /**
   * @desciption
   * Extracts the role from the user (AWS CognitoUser) that resides in the browsers LocalStorage.
   */
  static async getUserRole(): Promise<USER_ROLES> {
    try {
      // logic to determine what role you have based on current sesssion
      return USER_ROLES.ADMIN;
    } catch (error) {
      return USER_ROLES.ADMIN;
    }
  }
}

export interface IUserSigninData {
  phone: string;
  password: string;
}
