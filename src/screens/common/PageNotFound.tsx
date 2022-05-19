import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { GUEST_ROUTE, MEMBER_ROUTE } from '../../lib/constants';
import { useAuth } from '../../context/auth-context';

export const PageNotFound = (): JSX.Element => {
  const { appUser } = useAuth();

  return (
    <Container>
      <h4>404</h4>
      <p>The page was not found.</p>
      <p>Oops! We can't find the page you are looking for.</p>

      {appUser ? (
        <Link to={MEMBER_ROUTE.HOME} style={{ marginTop: 16, textDecoration: 'none' }}>
          <button type="button">Back to home</button>
        </Link>
      ) : (
        <Link to={GUEST_ROUTE.LOGIN}>
          <button type="button">Back to home</button>
        </Link>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 30px;
  height: 100vh;
`;
