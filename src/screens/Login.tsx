import styled from 'styled-components';
import { Container, Grid } from '@mantine/core';
import { LoginForm } from '../components/LoginForm';
// import { Logo } from '../components/Logo';

const Screen = styled(Container)`
  min-height: 100vh;
  padding: 0;
  a {
    font-size: 13px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary.black};
  }
`;

const LoginContainer = styled(Grid)`
  min-height: 100vh;
  margin-top: -80px;
  display: flex;
  justify-content: center;
`;

const LeftPane = styled(Grid.Col)`
  background-color: ${({ theme }) => theme.colors.secondary.lightgrey};
  justify-content: center;
  display: flex;
  align-items: center;
`;

const RightPane = styled(Grid.Col)`
  justify-content: center;
  display: flex;
  align-items: center;
`;

const LogoPanel = styled.div`
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  width: 100%;
  height: 80px;
  align-items: center;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > img {
    flex: 0;
  }
`;

const CallToAction = styled.h2`
  font-size: 28px;
  font-family: 'Glacial Indifference-Bold', sans-serif;
  text-align: center;

  .green {
    font-family: 'Glacial Indifference-Bold', sans-serif;
    color: #279f70; // TODO: Add this color to theme
  }
`;

const LoginWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
`;

const LoginText = styled.h1`
  font-size: 36px;
  margin: 0;
  margin-bottom: 36px;
  font-family: 'Glacial Indifference-Bold', sans-serif;
`;

export const Login = () => {

  return (
    <Screen fluid>
      {/*<LogoPanel>*/}
      {/*  <Logo imageWidth={100} />*/}
      {/*</LogoPanel>*/}
      <LoginContainer>
        <RightPane md={6} sm={12}>
          <LoginWrapper>
            <LoginText>{"Admin Login"}</LoginText>
            <LoginForm />
          </LoginWrapper>
        </RightPane>
      </LoginContainer>
    </Screen>
  );
};
