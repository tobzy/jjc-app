import { secureMainApi } from '../lib/apis';

/**
 * @description
 * Service for fetching & interacting with a user record.
 * Every signed in user will have a user record.
 */
export class UserService {
  /**
   * @description
   * Get the user record of the currently signed in user.
   * The currently signed in user is inferred from the JWT auth token.
   */
  static async getUser(): Promise<any | null> {
    try {
      const data = await secureMainApi
        .get(`/user/get-my-profile`)
        .then((res) => res?.data?.data)
        .catch((err) => {
          if (err?.response) {
            console.error('Error in getUser: ', err.response.data);
            throw Error(err.response);
          }
        });

      return data;
    } catch (error) {
      if (error !== `No current user`) {
        throw Error(`${error}`);
      }
      return null;
    }
  }
}
