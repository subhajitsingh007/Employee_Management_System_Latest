import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutSection = styled.div`
  background: linear-gradient(to bottom right, #2f0743, #41295a); /* deep purple gradient */
  color: #ffffff;
  min-height: 100vh;
  padding-top: 80px;
  font-family: 'Segoe UI', sans-serif;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const Subtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 40px;
  color: #dcdcdc;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
`;

const InfoCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  padding: 30px 25px;
  border-radius: 15px;
  width: 280px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #ffffff;
`;

const CardText = styled.p`
  font-size: 1rem;
  color: #cccccc;
`;

const About = () => {
  return (
    <AboutSection>
      <Container>
        <Title initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          About Employee Management System
        </Title>
        <Subtitle initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
          Streamlining employee data and performance — all in one powerful platform.
        </Subtitle>

        <InfoGrid>
          <InfoCard initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <CardTitle>Mission</CardTitle>
            <CardText>
              To simplify HR processes by providing smart tools for managing employee records, attendance, and payroll.
            </CardText>
          </InfoCard>

          <InfoCard initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <CardTitle>Vision</CardTitle>
            <CardText>
              Empower companies with automation that improves efficiency and enhances employee satisfaction.
            </CardText>
          </InfoCard>

          <InfoCard initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
            <CardTitle>Why Choose Us?</CardTitle>
            <CardText>
              User-friendly UI, responsive design, secure authentication, and real-time updates to keep your team connected.
            </CardText>
          </InfoCard>
        </InfoGrid>
      </Container>
    </AboutSection>
  );
};

export default About;
