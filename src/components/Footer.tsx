import React from 'react';
import styled from 'styled-components';
import footerLogo from '../assets/images/icon.png';
import google from '../assets/images/google.png';
import apple from '../assets/images/apple.png';
// import ScrollToTop from 'react-scroll-up'

export const Footer = () => {
    return (
        <Div>
            <ContentDiv>
                {/*<Imagediv>*/}
                {/*    <img src={footerLogo} alt="logo"/>*/}
                {/*</Imagediv>*/}

                <Section>
                    {/*<div>*/}
                    {/*    <P>Services</P>*/}
                    {/*    <DiV>*/}
                    {/*        <a href="">Email Marketing</a>*/}
                    {/*        <a href="">Campaigns</a>*/}
                    {/*        <a href="">Branding</a>*/}
                    {/*        <a href="">Offline</a>*/}
                    {/*    </DiV>*/}
                    {/*</div>*/}

                    {/*<div>*/}
                    {/*    <P>About</P>*/}
                    {/*    <DiV>*/}
                    {/*        <a href=""> Our Story</a>*/}
                    {/*        <a href="">Benefits</a>*/}
                    {/*        <a href="">Teams</a>*/}
                    {/*        <a href="">Careers</a>*/}
                    {/*    </DiV>*/}
                    {/*</div>*/}

                    {/*<div>*/}
                    {/*    <P>Help</P>*/}
                    {/*    <DiV>*/}
                    {/*        <a href="">FAQs</a>*/}
                    {/*        <a href="">Contact Us</a>*/}
                    {/*    </DiV>*/}
                    {/*</div>*/}

                    <div>
                        <P>Download the JJC App</P>
                        <P1>Get access to in-app navigation, push notifications and the directions on the go.
                        </P1>
                        <StoreImgWrapper>
                            <a href="https://play.google.com/store/apps/details?id=com.jjc.app" target='_blank' style={{
                                marginRight:20
                            }}>
                                <StoreImg src={google} alt="google"/>
                            </a>
                            <a href="https://apps.apple.com/us/app/the-jjc-app/id1609088218" target='_blank'>
                                <StoreImg src={apple} alt="apple"/>
                            </a>
                        </StoreImgWrapper>

                    </div>
                </Section>

                <Section2>

                    <DIV>
                        <p>2022 The Ovholen Company Limited</p>
                        {/*<p> Privacy Policy </p>*/}
                    </DIV>

                    <DIV>
                        <a href="https://twitter.com/thejjcapp?s=21" target='_blank'> <i className="fab fa-facebook-f"></i> </a>
                        <a href="https://www.facebook.com/TheJJCapp/" target='_blank'> <i className="fab fa-twitter"></i></a>
                        <a href="https://www.instagram.com/thejjcapp/?utm_medium=copy_link" target='_blank'> <i className="fab fa-instagram"></i></a>
                    </DIV>

                </Section2>

                <Section3>
                    <a href={'https://www.privacypolicygenerator.info/live.php?token=FxZDeYS0mtNtufoZ7y2eKshAnsEaOyKr'} target={'_blank'}>About Us</a>
                    <a href={'https://www.privacypolicygenerator.info/live.php?token=FxZDeYS0mtNtufoZ7y2eKshAnsEaOyKr'} target={'_blank'}>Privacy Policy</a>
                    <a href={'/login'}>Admin Login</a>
                    {/*<p>Services</p>*/}
                    {/*<p>Countries</p>*/}
                    {/*<p>Carrers</p>*/}
                    {/*<p>FAQs</p>*/}
                    {/*<p>Support</p>*/}
                    {/*<ScrollToTop showUnder={160}>*/}
                    {/*    <i className="fas fa-chevron-up scroll-size"></i>*/}
                    {/*</ScrollToTop>*/}
                </Section3>
            </ContentDiv>
        </Div>
    )
}


const Div = styled.div`
  width: 100%;
  position: absolute;
    bottom:0;
  background: #1E2833;
  padding: 30px 120px 30px 120px;
  box-sizing: border-box;
  //here
  margin-top: 70px;
  @media (max-width: 500px) { {
    padding: 20px 10px 10px 10px;
  }
  }
`;

const ContentDiv = styled.div`
  max-width: 1240px;
  margin: auto;
  @media (max-width: 500px) {
    //flex-direction: column;
  }
`;

const Imagediv = styled.div`
  display: flex;
  img {
    width: 221px;
    height: 81px;
  }

  @media (max-width: 500px) {
    img {
      width: 100px;
      height: 40px;
    }
  }
`;

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  color: white;
  flex-wrap: wrap;
  text-align: left;

  @media (max-width: 500px) {
    display: flex;
    flex-wrap: wrap;
    color: white;
    text-align: left;
  }
`;

const P = styled.p`
  font-family: "Glacial Indifference-Bold";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
    margin: 0;
  // border-top: 1px solid gray;
  @media (max-width: 500px) {

  }
`;

const DiV = styled.div`
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: white;
    font-family: "Glacial Indifference-Regular";
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: -0.204545px;
    margin-top: 17px;
  }

  @media (max-width: 500px) {
    margin-bottom: 13px;
  }

  a {
    font-size: 13px;
  }
`;

const StoreImg = styled.img`
    width: 200px;
    @media (max-width: 500px) {
        width: 150px;
    }
`;

const P1 = styled.p`
  font-family: "Glacial Indifference-Regular";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 151%;
`;

const StoreImgWrapper = styled.div`
    display: flex;
    align-items: center;
    
`;


const Section2 = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  @media (max-width: 500px) {
  }
`;

const DIV = styled.div`
  display: flex;
  color: white;

  p {
    margin-right: 30px;
    font-family: "Glacial Indifference-Regular";
  }

  a {
    text-decoration: none;
    color: white;
    font-size: 20px;
    margin-right: 20px;
  }

  @media (max-width: 500px) {
    p {
      margin-right: 20px;
        text-align: left;
        margin: 0;
    }
  }
`;

const Section3 = styled.section`
  display: flex;
  color: white;

  a {
    font-family: "Glacial Indifference-Bold";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
      color: white;
    margin-right: 20px;
      text-decoration: none;
  }

  @media (max-width: 500px) {
    margin-top: 14px;
    p {
      font-size: 12px;
    }
  }
`;
