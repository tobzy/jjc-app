import React from 'react';
import walking from '../assets/images/walking.svg';
import circles from '../assets/images/circles.svg';
import caps from '../assets/images/caps.svg';
import shop from '../assets/images/shop.svg';
import arrows from '../assets/images/arrrows.svg';
import shopsquare from '../assets/images/shop-square.svg';
import capsquare from '../assets/images/caps-square.svg';
import arrowsquare from '../assets/images/arrows-square.svg';
import jjcCoin from '../assets/images/jjc-coin.png';
import jjcMap from '../assets/images/jjc-map.png';
import location from '../assets/images/location.svg';
import getStarted from '../assets/images/get-started.svg';
import googleLogo from '../assets/images/googleplay.svg';
import appleLogo from '../assets/images/appstore.svg';
import logo from '../assets/images/jjc-logo.png';
import { Card } from '../components/Card';
import { Paragraph, ScrollCard } from '../components/ScrollCard';
import './landingPage.css';
import styled from 'styled-components';
import { device } from '../lib/utils';
import { Heading } from '../components/styled';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export const LandingPage = () => (
  <Container>
    {/* <section className="lp-section1"> */}
    {/*  <p> */}
    {/*    I'm looking for <button>Vulcaniser</button> */}
    {/*  </p> */}
    {/*  <div> */}
    {/*    <p>Find microbusinesses around you</p> */}
    {/*    <p>Find the best spots in your area without leaving your comfort zone.</p> */}
    {/*    <button>Download</button> */}
    {/*    <img src="" alt="" /> */}
    {/*  </div> */}
    {/* </section> */}

    <Section2>
      <Card
        title="Find Services Easily"
        text="You don’t have to walk long distances to find what you need."
        image={walking}
      />
      <InnerCard
        title="Earn JJC Coins"
        text="Help the tiniest businesses gain visibility and earn JJC coins while you are at it."
        image={circles}
      />
    </Section2>

    <Carousel autoPlay infiniteLoop interval={3500} showStatus={false}>
      <ScrollCard
        title="JJC Dey for You"
        text="They said, you will see a man wearing a red cap at the end of the street. Now you have reached, there are 3 men wearing red caps."
        image={caps}
        image2={capsquare}
      />
      <ScrollCard
        title="JJC Dey for You"
        text="They said,go to the shop by the corner and ask for Mr. Wasiu. But you walked all the way there to find that Mr. Wasiu is not around."
        image={shop}
        image2={shopsquare}
      />
      <ScrollCard
        title="JJC Dey for You"
        text="They said,stop at the 2nd junction after the transformer.But there’s a smaller street closeby and now you are left wondering, which one?"
        image={arrows}
        image2={arrowsquare}
      />
    </Carousel>


    <Section2>
      <Card title="Exchange JJC Coins" text="Get discounts and valuable offers with your JJC Coins." image={jjcCoin} />
      <InnerCard
        title="Map Locations"
        text="Add your best spots to the map and help others like you find micro-businesses in your neighbourhood."
        image={jjcMap}
      />
    </Section2>

    <section className="lp-section4">
      <div className="lp-section3-div">
        <div className="lp-section3-div1">
          <Heading style={{ textAlign: 'left' }}>Was it this junction or the other one?</Heading>
          <Paragraph className="lp-section3-p">Never be a JJC in a new area again</Paragraph>
        </div>

        <div className="lp-section3-div2">
          <img className="lp-section4-img" src={location} alt="three-caps" />
        </div>
      </div>
    </section>

    <ScrollCard
      title="Get Started"
      text="Join a community of people who are passionate about helping businesses in their community gain visibility."
      image={getStarted}
      link="Download the app"
    />

    <section className="lp-download-app-wrapper" id="#download-app">
      <Heading>Download The JJC App</Heading>
      <div className="lp-input-container">
        <input className="lp-input" placeholder="" type="text" />
        <button className="lp-btn">Text me the app</button>
      </div>
      <AppLinks>
        <a href="https://play.google.com/store/apps/details?id=com.jjc.app" target="_blank" rel="noreferrer">
          {' '}
          <img src={googleLogo} alt="google-playstore" />
        </a>
        <a href="https://apps.apple.com/us/app/the-jjc-app/id1609088218" target="_blank" rel="noreferrer">
          {' '}
          <img src={appleLogo} alt="app-store" />
        </a>
      </AppLinks>
    </section>

    <section className="lp-section5">
      <img className="jjc-logo-footer" src={logo} alt="jjc-logo" />

      <ul className="section5-lp-list">
        <a
          href="https://www.privacypolicygenerator.info/live.php?token=FxZDeYS0mtNtufoZ7y2eKshAnsEaOyKr"
          target="_blank"
          rel="noreferrer"
        >
          <li className="lp-list">About Us </li>
        </a>

        <a
          href="https://www.privacypolicygenerator.info/live.php?token=FxZDeYS0mtNtufoZ7y2eKshAnsEaOyKr"
          target="_blank"
          rel="noreferrer"
        >
          <li className="lp-list"> Privacy Policy </li>
        </a>

        <a href="/login">
          {' '}
          <li className="lp-list">Admin Login </li>
        </a>

        {/* <li className="lp-list">Mapped Locations</li> */}
      </ul>
      {/* <ul className="section5-lp-list"> */}
      {/*  <li className="lp-list">FAQs</li> */}
      {/*  <li className="lp-list">Privacy</li> */}
      {/*  <li className="lp-list">Terms</li> */}
      {/*  <li className="lp-list">Contract</li> */}
      {/* </ul> */}

      <p className="lp-font-wrapper">
        <a href="https://twitter.com/thejjcapp?s=21" target="_blank" rel="noreferrer">
          {' '}
          <i className="fab fa-facebook fa-icon" />
        </a>
        <a href="https://www.facebook.com/TheJJCapp/" target="_blank" rel="noreferrer">
          {' '}
          <i className="fab fa-twitter fa-icon" />
        </a>
        <a href="https://www.instagram.com/thejjcapp/?utm_medium=copy_link" target="_blank" rel="noreferrer">
          {' '}
          <i className="fab fa-instagram fa-icon" />
        </a>
        <a href="https://www.linkedin.com/company/thejjcapp/" target="_blank" rel="noreferrer">
          <i className="fab fa-linkedin fa-icon" />
        </a>
      </p>

      <p className="lp-section5-p">The JJC App is a trading name of The Ovlohen company Ltd. Delaware, U.S.A.</p>

      <p className="lp-section5-p2">c. 2021 - 2022 The JJC App. All Rights Reserved.</p>
    </section>
  </Container>
);

const Container = styled.section`
  max-width: 1280px;
  margin: auto;
  padding: 80px;
  @media ${device.laptop} {
    padding: 40px;
  }

  @media ${device.mobileL} {
    padding: 23px;
  }
`;

const AppLinks = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerCard = styled(Card)`
  margin-left: 96px;
  @media ${device.tablet} {
    margin-left: 50px;
  }

  @media ${device.mobileL} {
    margin-left: 0px;
    margin-top: 100px;
  }
`;

const Section2 = styled.section`
  display: flex;
  justify-content: space-between;
  margin: auto;
  max-width: 84%;
  margin-bottom: 100px;

  @media ${device.laptop} {
    max-width: 100%;
  }

  @media ${device.tablet} {
    justify-content: space-between;
    margin: auto;
    margin-bottom: 100px;
    width: 100%;
  }

  @media ${device.mobileL} {
    flex-direction: column;
  }
`;
