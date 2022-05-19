import styled from 'styled-components';
import { useState } from 'react';
import { useDocumentTitle } from '@mantine/hooks';
import { Tabs } from '../components/Tabs';
import { Heading } from '../components/styled';
import { LocationDetailCard} from '../components/LocationDetailCard';
import { AllLocationsTable } from './location/AllLocationsTable';
import { UnreviewedTable } from './location/UnreviewedTable';
import {locationTabs} from "../lib/constants";
import {useGetLocations} from "../hooks/useMapping";
import {DeniedLocationsTable} from "./location/DeniedLocationsTable";

export const Locations = (): JSX.Element => {
  useDocumentTitle(`JJC Admin: Locations`);

  const [queryPageIndex, setQueryPageIndex] = useState(1);
  const [queryPageSize, setQueryPageSize] = useState(10);

  const {data:locationData} = useGetLocations(queryPageIndex, queryPageSize);
  const {data:underReviewLocations} = useGetLocations(queryPageIndex, queryPageSize, 'pending');
  const {data:deniedLocations} = useGetLocations(queryPageIndex, queryPageSize, 'denied');


  const totalItems = locationData?.data?.totalCount || 0;
  const totalReviewed = underReviewLocations?.data?.totalCount || 0;
  const totalDenied = deniedLocations?.data?.totalCount || 0;


  const tabViews = [<AllLocationsTable />, <UnreviewedTable />, <DeniedLocationsTable />];
  const [selectedTabView, setSelectedTabView] = useState(tabViews[0]);

  const handleTabSelected = (tabIndex: number) => {
    setSelectedTabView(tabViews[tabIndex]);
  };

  return (
    <Wrapper>
      <Header>
        <Heading>Locations</Heading>
      </Header>
      <TransactionCards>
        <div
          style={{
            marginRight: 20,
            flex: 1,
          }}
        >
          <LocationDetailCard title={'Number of Locations'} amount={String(totalItems)} />
        </div>
        <div
          style={{
            marginRight: 20,
            flex: 1,
          }}
        >
          <LocationDetailCard
            title={'Pending Reviews'}
            amount={String(totalReviewed)}
          />
        </div>
        <div
          style={{
            flex: 1,
          }}
        >
          <LocationDetailCard
            title={`Denied`}
            amount={String(totalDenied)}
          />
        </div>
      </TransactionCards>
      <ContentView>
        <StyledTabs onTabSelected={handleTabSelected} tabItems={locationTabs} currentRoute="locations" />
        <TabView>{selectedTabView}</TabView>
      </ContentView>
    </Wrapper>
  );
};

const TransactionCards = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  max-width: 1000px;
`;

const Wrapper = styled.div`
  margin: 0 64px;
`;

const ContentView = styled.div`
  margin-top: 24px;
`;

const Header = styled.div`
  color: #2e2e2e;
  font-weight: bold;
  font-size: 28px;
  margin-top: 40px;
  margin-bottom: 24px;
`;

const StyledTabs = styled(Tabs)`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  border-bottom: solid 1px #e2e2e2;
  margin-bottom: 40px;
`;

const TabView = styled.div``;
