import React from 'react';
import Breadcrumb from 'components/Navigation/Breadcrumb';
import ListQuestionBank from 'features/admin/questionBank/ListQuestionBank';

const ListQuestionCategories = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Asssessments' page='Question Bank' />
      <ListQuestionBank />
    </React.Fragment>
  );
};

export default ListQuestionCategories;
