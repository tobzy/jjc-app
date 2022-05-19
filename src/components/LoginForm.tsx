import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useLocalStorage } from 'react-use';
import { AnimatedLabelInput } from './AnimatedLabelInput';
import { AppUser, useAuth } from '../context/auth-context';
import { isValidEmailRegex, LOCAL_STORAGE_KEYS, MEMBER_ROUTE } from '../lib/constants';
import { PrimaryButton } from './Buttons';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
`;

export const ErrorText = styled.p`
  font-size: 14px;
  font-family: 'Glacial Indifference-Bold', sans-serif;
  color: ${({ theme }) => theme.colors.secondary.red};
`;

const TextInput = styled.div`
  border: none;
  border-bottom: solid 1px ${({ theme }) => theme.colors.secondary.grey};
  margin-top: 20px;
  display: flex;
  flex-direction: row;
`;

const ButtonContainer = styled.div`
  margin: 40px auto 0 0;
`;

interface IFormData {
  phone: string;
  password: string;
}

export const LoginForm = ({ className }: { className?: string }) => {
  const { useSignin, setUserRole, useGetUserRole, setAppUser } = useAuth();
  const { mutate: getUserRole } = useGetUserRole();
  const [value, saveToLocalStorage] = useLocalStorage<AppUser>(LOCAL_STORAGE_KEYS.USER_DATA, undefined);
  const [userToken, saveTokenToLocalStorage] = useLocalStorage<string>(LOCAL_STORAGE_KEYS.TOKEN, undefined);
  const history = useHistory();
  const { register, errors, handleSubmit, formState } = useForm({ mode: 'all' });
  const {
    mutate: signin,
    isLoading: signinRequestInProgress,
    isError: hasSigninError,
    error: signinError,
  } = useSignin();

  const handleFormSubmit = (data: IFormData) => {
    const formattedPhoneNumber = `+234${data.phone.slice(1)}`;
    signin(
      {
        phone: formattedPhoneNumber,
        password: data.password,
      },
      {
        onSuccess: async (userData) => {

          setAppUser(userData);
          saveToLocalStorage(userData);
          saveTokenToLocalStorage(userData.accessToken);
          const userRole = userData?.user?.accountTypes
          setUserRole(userRole);
          history.push('/locations')
        },
      },
    );
  };
  const disabled = !formState.isValid || formState.isSubmitting || signinRequestInProgress;

  return (
    <Form className={className} onSubmit={handleSubmit(handleFormSubmit)}>
      <TextInput>
        <AnimatedLabelInput
          label="Number or Email"
          name="phone"
          type="number"
          isLabelAnimated={false}
          ref={register({
            required: "Phone is required",
            // pattern: {
            //   value: isValidEmailRegex,
            //   message: "Phone is invalid",
            // },
          })}
        />
      </TextInput>
      {errors?.phone?.message && <ErrorText>{errors.phone.message}</ErrorText>}
      <TextInput>
        <AnimatedLabelInput
          label="Password"
          isLabelAnimated={false}
          isPassword
          name="password"
          type="password"
          ref={register({
            required: "Password is required",
          })}
        />
      </TextInput>

      {errors?.password?.message && <ErrorText>{errors.password.message}</ErrorText>}
      {/*{hasSigninError && <ErrorText>{(signinError as any)?.message} </ErrorText>}*/}

      <ButtonContainer>
        <PrimaryButton title="Login" disabled={disabled} loading={signinRequestInProgress} />
      </ButtonContainer>
    </Form>
  );
};
