import styled from 'styled-components';
import { LinkWithIcon } from './LinkWithIcon';
import { SubNavigationList } from './SubNavigationList';

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
  isHorizontal?: boolean;
  itemSpacing?: number;
  links: Array<LinkProps>;
};

const getMarginString = (isHorizontal?: boolean, spacing?: number): string => {
  const marginValue = spacing ? `${spacing}px` : 0;
  return isHorizontal ? `0 ${marginValue}` : `${marginValue} 0`;
};

const List = styled.ul<{ isHorizontal?: boolean; itemSpacing?: number }>`
  padding: 0;
  margin: 0;
  margin-top: 50px;
  list-style: none;

  ${(props) => `
        li {
            display: ${props.isHorizontal ? 'inline' : 'block'};
            margin: ${getMarginString(props.isHorizontal, props.itemSpacing)};
        }
    `}
`;

function NavigationList({ className, links, isHorizontal, itemSpacing }: NavigationListProps) {
  return (
    <List className={className} isHorizontal={isHorizontal || false} itemSpacing={itemSpacing}>
      {links.map((item, i) => {
        if (item.subNavigationItems) {
          return <SubNavigationList link={item} key={i} />;
        }
        return (
          <li key={`listitem-${i}`}>
            <LinkWithIcon to={item.to} text={item.text} icon={item.icon} />
          </li>
        );
      })}
    </List>
  );
}

export { NavigationList };
