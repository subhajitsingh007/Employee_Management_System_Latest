// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import fullWidthImage from '../assets/background.jpg';

const HomePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #2f0743, #41295a);
  color: #ffffff;
  font-family: 'Segoe UI', sans-serif;
`;

const Navbar = styled.nav`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #1c003b; /* Updated */
  color: #ffffff;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  flex-grow: 1;
  justify-content: center;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5e4b8b;
  }
`;

const NavButton = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled(Link)`
  padding: 8px 18px;
  background: rgba(255, 255, 255, 0.9);
  color: #2f0743;
  font-weight: 600;
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background: #6a11cb;
    color: #fff;
  }
`;

const FullWidthImage = styled.div`
  width: 100%;
  height: 600px;
  background: url(${fullWidthImage}) center/cover no-repeat;
  margin-top: 60px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(28, 0, 59, 0.6); /* Enhanced overlay */
    z-index: 1;
  }
`;

const ImageTextContainer = styled(motion.div)`
  position: relative;
  z-index: 2;
  color: #fff;
  max-width: 800px;
  padding: 20px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  font-weight: 400;
`;

const FeaturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 40px;
  gap: 25px;
  padding: 20px;
  max-width: 1200px;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255,255,255,0.2);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 25px;
  width: 280px;
  text-align: center;
  color: #fff;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-8px);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 12px;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #e0e0e0;
`;

const Footer = styled.footer`
  width: 100%;
  background: #1c003b;
  color: #ccc;
  text-align: center;
  padding: 20px 10px;
  margin-top: 60px;
  font-size: 0.9rem;
  border-top: 1px solid rgba(255,255,255,0.1);
`;

const Home = () => {
  return (
    <HomePage>
      <Navbar>
        <Logo>EMS</Logo>
        <NavLinks>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
        </NavLinks>
        <NavButton>
          <Button to="/login">Login</Button>
          <Button to="/signup">Sign Up</Button>
        </NavButton>
      </Navbar>

      <FullWidthImage>
        <ImageTextContainer
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <HeroTitle>Manage Employees with Ease</HeroTitle>
          <HeroSubtitle>
            Your all-in-one solution for efficient employee management, performance, and payroll.
          </HeroSubtitle>
        </ImageTextContainer>
      </FullWidthImage>

      <FeaturesContainer>
        {[
          {
            title: 'Employee Records',
            desc: 'Maintain detailed employee data including job roles and departments.',
          },
          {
            title: 'Attendance Tracking',
            desc: 'Track leaves, clock-in/out times, and working hours.',
          },
          {
            title: 'Performance Reviews',
            desc: 'Assign KPIs, review tasks, and manage evaluations.',
          },
          {
            title: 'Payroll Management',
            desc: 'Automated salary processing and tax management.',
          },
        ].map((feature, index) => (
          <FeatureCard
            key={index}
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          >
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.desc}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesContainer>

      <Footer>© {new Date().getFullYear()} EMS. All rights reserved.</Footer>
    </HomePage>
  );
};

export default Home;
