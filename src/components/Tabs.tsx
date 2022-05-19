import styled from 'styled-components';
import React, { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useGetQueryParams } from '../hooks/useQueryParams';

const Container = styled.div`
  display: flex;
`;

// This component allows for text within to change from normal to bold without changing overall layout
const BoldItemContent = forwardRef(
  (
    {
      className,
      text,
      onClick,
    }: {
      className?: string;
      text: string;
      onClick?: React.MouseEventHandler<HTMLDivElement>;
    },
    ref: ForwardedRef<HTMLDivElement>,
  ) => (
    <div className={className} onClick={onClick} ref={ref}>
      <span>{text}</span>
      <span aria-hidden="true">{text}</span>
    </div>
  ),
);

const BoldItem = styled(BoldItemContent)`
  display: inline-flex;
  flex-direction: column;
  font-size: 13px;

  span ~ span {
    height: 0;
    visibility: hidden;
    overflow: hidden;
    user-select: none;
    pointer-events: none;
    font-weight: 700;
  }
`;

const Tab = styled(BoldItem)<{ selected: boolean }>`
  font-weight: ${(props) => (props.selected ? '700' : '400')};
  color: ${({ theme }) => theme.colors.secondary.blue};
  color: ${({ selected }) => (selected ? '#4AB0A6' : '#828282')};
  text-transform: uppercase;

  & span {
    font-family: ${({ selected }) => (selected ? 'Glacial Indifference-Bold' : 'Glacial Indifference-Regular')};
  }
`;

const SelectedIndicator = styled.hr`
  height: 2px;
  border: none;
  background-color: black;
  width: 32px;
  margin: 0;
  transition: 0.3s ease-in-out;
`;

const TabsList = styled.div<{ indicatorOffset: number }>`
  position: relative;

  ${Tab} {
    display: inline-flex;
    padding: 10px 0;
    padding-inline-end: 24px;
    white-space: nowrap;
    cursor: pointer;
  }

  ${SelectedIndicator} {
    position: relative;
    left: ${(props) => props.indicatorOffset}px;
  }
`;

interface IQueryParams {
  tab?: string;
}
export const Tabs = ({
  className,
  onTabSelected,
  tabItems,

  currentRoute = 'dashboard',
}: {
  className?: string;
  currentRoute?: string;
  onTabSelected: (tabIndex: number) => void;
  tabItems: { title: string; route: string }[];
}) => {
  const [selectedTab, setSelectedTab] = useState({ index: 0, offset: 0 });
  const tabElementRefs = useRef<Array<HTMLDivElement>>([]);
  const queryParams: IQueryParams = useGetQueryParams();
  const history = useHistory();

  const handleClick = (index: number) => {
    history.push(`/${currentRoute}?tab=${tabItems[index].route}`);
  };

  useEffect(() => {
    setTimeout(() => {
      if (queryParams?.tab) {
        const tabIndex = tabItems.findIndex((param) => param.route === queryParams?.tab);
        if (selectedTab.index !== tabIndex) {
          const offset = tabElementRefs?.current?.[tabIndex]?.offsetLeft;
          setSelectedTab({ index: tabIndex, offset });
          onTabSelected(tabIndex);
        }
      }
    }, 50); // adding a timeout here because the refs are only available to be read sometime after the page loads
  }, [queryParams?.tab]);

  return (
    <Container className={className}>
      <TabsList indicatorOffset={selectedTab.offset}>
        {tabItems.map((item, i) => (
          <Tab
            ref={(el) => {
              if(el){
                tabElementRefs.current[i] = el;
              }
            }}
            key={`tab-${i}`}
            text={item.title}
            selected={i === selectedTab.index}
            onClick={(e) => handleClick(i)}
          />
        ))}
        <SelectedIndicator aria-hidden="true" />
      </TabsList>
    </Container>
  );
};
