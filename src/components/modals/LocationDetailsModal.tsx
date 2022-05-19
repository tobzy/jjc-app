import styled, { useTheme } from 'styled-components';
import { Container, Modal } from '@mantine/core';
import moment from 'moment';
import { Paragraph, ParagraphBold } from '../styled';
import { Location } from '../../services/location-service';
import {getIcon, getStatusColor} from "../../lib/utils";
import React, {useEffect} from "react";
import { Grid } from '@mantine/core';
import ReactMapboxGl,{Feature, Layer,Popup,Marker } from "react-mapbox-gl";
import {PrimaryButton, SecondaryButton} from "../Buttons";
import {useAcceptMapping, useDenyMapping} from "../../hooks/useMapping";


interface Iprops {
  hide: () => void;
  isVisible: boolean;
  callback?: () => void;
  data: Location;
}
const accessToken = 'pk.eyJ1IjoiampjLWRldiIsImEiOiJja3d1ZDQ5OTQxbTVrMm9ydHZ5OWExaW1qIn0.I6DlyCqTnk-Plz6r--IsyA';
const flyToOptions = {
  speed: 0.8
};

export const LocationDetailsModal = ({ isVisible, hide, callback, data }: Iprops) => {
  const Map = ReactMapboxGl({
    accessToken
  });


  const {mutate:accept, isLoading:isLoadingAcceptReview} = useAcceptMapping();
  const {mutate:decline, isLoading:isLoadingDeclineReview} = useDenyMapping();

  const theme = useTheme();
  const { green } = theme.colors.primary;

  const acceptMapping = () => {
    accept(data.id)
  }
  const denyMapping = () => {
    decline(data.id)
  }

  return (
    <Modal
      size="calc(100vw - 10px)"
      opened={isVisible}
      centered
      onClose={hide}
      transition="fade"
      transitionDuration={600}
      transitionTimingFunction="ease"
    >
      <Screen fluid>
        <PageContainer>
          <Grid>
            <Grid.Col span={6}>
              <FormHeader>Location Details</FormHeader>
              <DetailSection>
               <div>
                 <DetailsValue style={{ marginRight: 20 }}>
                   {data?.name}
                 </DetailsValue>
                 <DetailsValue style={{ color: getStatusColor(data?.status) }}> • {data?.status}</DetailsValue>
               </div>
                <img src={getIcon(data?.color)} style={{width:35, cursor:'pointer'}}/>

              </DetailSection>
              <DetailsWrapper>
                <DetailSection>
                  <DetailsLabel>Location Description</DetailsLabel>
                  <DetailsValue>{data?.description}</DetailsValue>
                </DetailSection>

                {Boolean(data?.categories?.length) && (
                  <DetailSection>
                    <DetailsLabel>Categories</DetailsLabel>
                    <DetailsValue>{data?.categories?.join(", ")}</DetailsValue>
                  </DetailSection>
                )}


                {Boolean(data?.keywords?.length) && (
                  <DetailSection>
                    <DetailsLabel>Keywords</DetailsLabel>
                    <DetailsValue>{data?.keywords?.join(", ")}</DetailsValue>
                  </DetailSection>
                )}

                <DetailSection>
                  <DetailsLabel>Location Coordinates</DetailsLabel>
                  <DetailsValue>{data?.location?.coordinates[0]} {data?.location?.coordinates[1]}</DetailsValue>
                </DetailSection>

                <DetailSection>
                  <DetailsLabel>Opening Time</DetailsLabel>
                  <DetailsValue>{data?.openingTimes}</DetailsValue>
                </DetailSection>

                <DetailSection>
                  <DetailsLabel>Phone Number</DetailsLabel>
                  <DetailsValue>{data?.phone}</DetailsValue>
                </DetailSection>

                <DetailSection>
                  <DetailsLabel>State</DetailsLabel>
                  <DetailsValue>{data?.state}</DetailsValue>
                </DetailSection>

                {/*<DetailSection>*/}
                {/*  <DetailsLabel>{t('transaction.time')}</DetailsLabel>*/}
                {/*  <DetailsValue>{moment(data?.createdAt).format('DD-MM-YYYY, h:mm:ss a')}</DetailsValue>*/}
                {/*</DetailSection>*/}
              </DetailsWrapper>
              {data?.status === "pending" && (
                <ButtonContainer>
                  <PrimaryButton title="Accept" disabled={isLoadingAcceptReview} loading={isLoadingAcceptReview} onClick={acceptMapping}/>
                  <SecondaryButton title="Decline" disabled={isLoadingAcceptReview} loading={isLoadingAcceptReview} onClick={acceptMapping} style={{marginLeft:20}}/>
                </ButtonContainer>
              )}
            </Grid.Col>
            <Grid.Col span={6}>
             <div style={{
               height:'100%'
             }}>
               <Map
                 style="mapbox://styles/jjc-dev/ckx3mad6j2qg614mkgff8wi60"
                 center={data?.location?.coordinates as [number,number]}
                 containerStyle={{
                   height: '100%',
                   width: '100%'
                 }}
                 zoom={[11]}
                 flyToOptions={flyToOptions}
               >
                 <Marker
                   key={data?.id}
                   coordinates={data?.location?.coordinates as [number,number]}
                   anchor="center">
                   <img src={getIcon(data?.color)} style={{width:35, cursor:'pointer'}}/>
                 </Marker>
               </Map>
             </div>
            </Grid.Col>
          </Grid>

        </PageContainer>
      </Screen>
    </Modal>
  );
};

const Screen = styled(Container)`
  padding: 0;
  height: calc(100vh - 130px);
  a {
    font-size: 13px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary.black};
  }
`;

const DetailsLabel = styled(Paragraph)`
  font-size: 14px;
  line-height: 24px;
  min-width: 220px;
`;

const DetailsValue = styled(ParagraphBold)`
  color: ${({ theme }) => theme.colors.primary.black};
  font-size: 16px;
  line-height: 24px;
`;

const PageContainer = styled.div`
  margin-top: -80px;
  padding: 130px 40px;
`;

const DetailsWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.secondary.lightgrey};
  padding-top: 24px;
`;

const DetailSection = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

const ButtonContainer = styled.div`
  margin: 40px auto 0 0;
  display: flex;
`;
const FormHeader = styled.h1`
  font-size: 24px;
  margin: 0;
  margin-bottom: 56px;
  font-family: 'Glacial Indifference-Bold', sans-serif;
`;
