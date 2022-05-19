import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

export interface Icon {
  default: string;
  active: string;
}

const StyledNavLink = styled(NavLink)<{ $icon?: Icon }>`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary.grey};
  font-size: 14px;
  font-weight: normal;
  background-size: 1.5em;
  padding-left: 2em;

  transition: color, background-image 0.2s ease-out;

  ${(props: { $icon?: Icon }) => {
    if (props?.$icon) {
      return css`
        background: transparent url(${props.$icon.default}) no-repeat center left;
        &.active,
        &:hover {
          background-image: url(${props.$icon.active});
        }
      `;
    }
  }}

  &.active,
  &:hover {
    color: ${({ theme }) => theme.colors.primary.green};
    font-weight: 600;
  }
`;

function LinkWithIcon({
  className,
  to,
  text,
  icon,
  onClick,
}: {
  className?: string;
  to: string;
  text: string;
  icon?: Icon;
  onClick?: (e: any) => void;
}) {
  return (
    <StyledNavLink to={to} className={className} $icon={icon} onClick={onClick && onClick}>
      {text}
    </StyledNavLink>
  );
}

export { LinkWithIcon };
