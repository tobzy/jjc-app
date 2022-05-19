import styled, {useTheme} from 'styled-components';
import {useState} from 'react';
import {TriangleDownIcon} from '@modulz/radix-icons';
import {LinkWithIcon} from './LinkWithIcon';

type LinkProps = {
  text: string;
  icon: { default: string; active: string };
  to: string;
  subNavigationItems?: {
    text: string;
    to: string;
  }[];
};

type NavigationListProps = {
  className?: string;
  link: LinkProps;
};

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const List = styled.ul<{ isHorizontal?: boolean; itemSpacing?: number }>`
  padding: 0;
  margin: 0;
  margin-top: 12px;
  list-style: none;

  li {
    display: block;
    margin: 0;

    a {
      font-size: 12px;
      line-height: 24px;
      margin-bottom: 10px;
      display: block;
    }
  }
`;

export const SubNavigationList = ({ className, link }: NavigationListProps) => {
  const [isListVisible, setIsListVisible] = useState<boolean>(true);
  const toggleNavigation = (event:any) => {
    event.preventDefault();
    event.stopPropagation();
    setIsListVisible(!isListVisible);
  };

  const theme: any = useTheme();
  const { green } = theme.colors.primary;
  return (
    <>
      <LinkWrapper onClick={toggleNavigation}>
        <LinkWithIcon to={link.to} text={link.text} icon={link.icon} onClick={toggleNavigation} />
        <TriangleDownIcon color={green} />
      </LinkWrapper>
      {isListVisible && (
        <List className={className}>
          {link?.subNavigationItems?.map((item, i) => (
            <li key={`listitem-${i}`} style={{ margin: 0 }}>
              <LinkWithIcon to={item.to} text={item.text} />
            </li>
          ))}
        </List>
      )}
    </>
  );
};
