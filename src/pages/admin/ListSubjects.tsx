import React from 'react';
import Breadcrumb from 'components/Navigation/Breadcrumb';
import ListFaqSubject from 'features/admin/faqSubject/ListFaqSubject';

const ListFaqSubjects = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='FAQs / Blogs' page='Subject & Tpoic' />
      <ListFaqSubject />
    </React.Fragment>
  );
};

export default ListFaqSubjects;
