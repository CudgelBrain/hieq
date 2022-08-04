import React from 'react';
import ListResume from 'features/admin/resume/ListResumes';
import Breadcrumb from 'components/Navigation/Breadcrumb';

const ListResumes = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Upload Sample' page='Resume' />
      <ListResume />
    </React.Fragment>
  );
};

export default ListResumes;
