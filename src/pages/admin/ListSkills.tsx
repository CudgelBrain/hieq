import React from 'react';
import ListSkill from 'features/admin/skill/ListSkill';
import Breadcrumb from 'components/Navigation/Breadcrumb';

const ListSkills = () => {
  return (
    <React.Fragment>
      <Breadcrumb parent='Upload Lists' page='Skill' />
      <ListSkill />
    </React.Fragment>
  );
};

export default ListSkills;
