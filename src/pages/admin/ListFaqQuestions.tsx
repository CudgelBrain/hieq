import React from 'react';
import Breadcrumb from 'components/Navigation/Breadcrumb';
import ListFaqQuestion from 'features/admin/faqQuestion/ListFaqQuestion';

const ListFaqQuestions = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='FAQs / Blogs' page='Question and Answer' />
      <ListFaqQuestion />
    </React.Fragment>
  );
};

export default ListFaqQuestions;
