import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkedAlt, FaPaperPlane } from 'react-icons/fa';

const ContactSection = styled.div`
  background: linear-gradient(135deg, #2f0743, #41295a);
  color: #ffffff;
  min-height: 100vh;
  padding: 80px 20px;
  font-family: 'Segoe UI', sans-serif;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled(motion.h1)`
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Subtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 60px;
  color: #dcdcdc;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(14px);
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.05rem;
  margin-bottom: 25px;
  color: #e0e0e0;

  svg {
    color: #ffb347;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 15px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 1rem;

  &::placeholder {
    color: #ccc;
  }
`;

const TextArea = styled.textarea`
  padding: 15px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  resize: none;
  font-size: 1rem;

  &::placeholder {
    color: #ccc;
  }
`;

const Button = styled.button`
  padding: 15px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const SuccessMsg = styled.p`
  color: #66ff99;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
`;

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setMessage('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } else {
      setMessage('Please fill all the fields.');
    }
  };

  return (
    <ContactSection>
      <Title initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        Contact Us
      </Title>
      <Subtitle initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
        We'd love to hear from you. Get in touch!
      </Subtitle>

      <Container>
        <Card initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 style={{ marginBottom: '30px', color: '#fff' }}>Get in Touch</h2>
          <InfoItem><FaEnvelope /> support@ems.com</InfoItem>
          <InfoItem><FaPhoneAlt /> +123 456 7890</InfoItem>
          <InfoItem><FaMapMarkedAlt /> 123 Business Lane, Suite 100</InfoItem>
        </Card>

        <Card initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextArea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            />
            <Button type="submit">
              <FaPaperPlane /> Send Message
            </Button>
            {message && <SuccessMsg>{message}</SuccessMsg>}
          </Form>
        </Card>
      </Container>
    </ContactSection>
  );
};

export default Contact;
