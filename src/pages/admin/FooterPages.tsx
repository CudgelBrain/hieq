import React from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from 'components/Navigation/Breadcrumb';
import FooterContent from 'features/admin/footerContent/Content';

const FooterPages = () => {
  let page = '';
  const { type } = useParams<{ type: string }>();
  switch (type) {
    case 'copyrightNotice':
      page = 'Copyright Notice';
      break;
    case 'privacyStatement':
      page = 'Privacy Statement';
      break;
    case 'disclaimer':
      page = 'Disclaimer';
      break;
    case 'termsConditions':
      page = 'Terms & Conditions';
      break;
  }

  return (
    <React.Fragment>
      <Breadcrumb parent='Footer Pages' page={page} />
      <FooterContent />;
    </React.Fragment>
  );
};

export default FooterPages;
