import React from 'react';
import Breadcrumb from 'components/Navigation/Breadcrumb';
import ListQuestionCategory from 'features/admin/questionCategory/ListQuestionCategory';

const ListQuestionCategories = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Asssessments' page='Question Category' />
      <ListQuestionCategory />
    </React.Fragment>
  );
};

export default ListQuestionCategories;
