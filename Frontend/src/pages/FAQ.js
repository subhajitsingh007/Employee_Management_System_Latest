import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FAQSection = styled.div`
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

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FAQItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  padding: 25px 20px;
  border-radius: 15px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
  }
`;

const Question = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: #ffffff;
`;

const Answer = styled.p`
  font-size: 1rem;
  color: #cccccc;
`;

const FAQ = () => {
  return (
    <FAQSection>
      
      <Container>
        <Title initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          Frequently Asked Questions
        </Title>
        <Subtitle initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
          Find answers to common queries about the Employee Management System.
        </Subtitle>

        <FAQList>
          <FAQItem
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Question>What is an Employee Management System?</Question>
            <Answer>
              An Employee Management System is a platform designed to streamline HR processes, including employee data management, attendance tracking, payroll management, and more.
            </Answer>
          </FAQItem>

          <FAQItem
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Question>How secure is the Employee Management System?</Question>
            <Answer>
              The system implements secure authentication methods and data encryption to ensure that employee data is protected and private.
            </Answer>
          </FAQItem>

          <FAQItem
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Question>Can I customize the features for my company?</Question>
            <Answer>
              Yes, the system is designed to be flexible and customizable to suit your company's unique HR needs and workflows.
            </Answer>
          </FAQItem>

          <FAQItem
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Question>Is there a mobile version of the system?</Question>
            <Answer>
              Yes, the Employee Management System is fully responsive and can be accessed on mobile devices for on-the-go convenience.
            </Answer>
          </FAQItem>
        </FAQList>
      </Container>
    </FAQSection>
  );
};

export default FAQ;
