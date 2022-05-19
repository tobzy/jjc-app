import {AuthenticationService, IUserSigninData} from "../services/authentication-service";
import { useMutation, useQuery } from 'react-query';

// export function useLogin() {
//   const result = useMutation(
//     async (data:IUserSigninData) => {
//       const response = AuthenticationService.signin(data);
//       return response;
//     },
//     {
//       onSuccess: () => {
//         // userSignedUp = true;
//       },
//       onError: (error) => {
//         // if (error?.response?.data?.message && error.response.status === 403) {
//         //   Toast.show({
//         //     type: 'error',
//         //     text2: 'Invalid details. Please enter the correct number or password',
//         //   });
//         // }
//       },
//     },
//   );
//   return result;
// }