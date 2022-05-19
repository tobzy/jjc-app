import styled from 'styled-components';
import profileIcon from '../assets/images/user.png';

const AvatarImage = styled.img`
  max-width: 30px;
  height: 30px;
`;

export const UserAvatar = (): JSX.Element => <AvatarImage src={profileIcon} alt="Profile" />;
