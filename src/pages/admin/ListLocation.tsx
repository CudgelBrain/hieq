import React from 'react';
import ListItems from 'features/admin/workLocation/ListItems';
import Breadcrumb from 'components/Navigation/Breadcrumb';

const ListWorkLocations = () => {
    return (
        <React.Fragment>
            <Breadcrumb parent='Upload Sample' page='Job Location' />
            <ListItems />
        </React.Fragment>
    );
};

export default ListWorkLocations;