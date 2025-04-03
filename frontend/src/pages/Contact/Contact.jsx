// frontend/src/pages/Contact/Contact.jsx
import React from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import ContactModule from '../../modules/ContactModule/ContactModule';

const Contact = () => (
  <PageLayout
    title="Contact"
    subtitle="Nous contacter"
    image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742937434/banniere-contact_xncsii.jpg"
  >
    <ContactModule />
  </PageLayout>
);

export default Contact;