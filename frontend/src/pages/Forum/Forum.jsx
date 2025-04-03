// frontend/src/pages/Forum/Forum.jsx
import React from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import ForumModule from '../../modules/ForumModule/ForumModule';

const Forum = () => (
  <PageLayout
    title="Forum"
    subtitle="Échangez avec la communauté"
    image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742937089/banniere-forum_ascr43.jpg"
  >
    <ForumModule />
  </PageLayout>
);

export default Forum;