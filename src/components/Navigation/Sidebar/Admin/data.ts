import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faTachometerAlt,
  faUserCheck,
  faRupeeSign,
  faTicketAlt,
  faList,
  faUpload,
  faComment,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';

export interface SidebarType {
  title: string;
  path?: string;
  icon?: IconProp;
  subMenu?: SidebarType[];
}

export const SidebarData: SidebarType[] = [
  {
    title: 'Dashboard',
    path: '/controlGear',
    icon: faTachometerAlt,
  },
  {
    title: 'Users',
    icon: faUserCheck,
    subMenu: [
      {
        title: 'Verified',
        path: '/controlGear/users',
      },
      {
        title: 'Unverified',
        path: '/controlGear/users',
      },
    ],
  },
  /* {
    title: 'Orders',
    icon: faRupeeSign,
    subMenu: [
      {
        title: 'Successful Orders',
        path: '/controlGear/',
      },
      {
        title: 'Failed Orders',
        path: '/controlGear/',
      },
    ],
  },
  {
    title: 'Promo Code',
    path: '/controlGear',
    icon: faTicketAlt,
  },*/
  {
    title: 'Assessments',
    icon: faFileAlt,
    subMenu: [
      {
        title: 'Question Category',
        path: '/controlGear/questionCategory',
      },
      {
        title: 'Question Bank',
        path: '/controlGear/questionBank',
      },
      {
        title: 'Create Test',
        path: '/controlGear/createTest',
      },
    ],
  },
  {
    title: 'Upload Lists',
    icon: faList,
    subMenu: [
      {
        title: 'Company',
        path: '/controlGear/companies',
      },
      {
        title: 'College',
        path: '/controlGear/colleges',
      },
      {
        title: 'Certification',
        path: '/controlGear/certifications',
      },
      {
        title: 'Industry',
        path: '/controlGear/industry',
      },
      {
        title: 'Certification Institute',
        path: '/controlGear/certificationInstitutes',
      },
      {
        title: 'Skills',
        path: '/controlGear/skills',
      },
      {
        title: 'Specialization',
        path: '/controlGear/specializations',
      },
      {
        title: 'Designation',
        path: '/controlGear/designations',
      },
      {
        title: 'Role in the Hiring Process',
        path: '/controlGear/roleHiringProcess',
      },
      {
        title: 'Role with the Institute',
        path: '/controlGear/roleWithInstitute',
      },
      {
        title: 'Institute Cohort / Group',
        path: '/controlGear/instituteCohortGroup',
      },
      {
        title: 'Job Title',
        path: '/controlGear/jobTitle',
      },
      {
        title: 'Job Location',
        path: '/controlGear/location',
      },
    ],
  },
  {
    title: 'Upload Sample',
    icon: faUpload,
    subMenu: [
      {
        title: 'Banner Graphic',
        path: '/controlGear/bannerGraphic',
      },
      {
        title: 'Sample Resume',
        path: '/controlGear/sampleResume',
      },
      {
        title: 'Sample Description',
        path: '/controlGear/sampleDescription',
      },
    ],
  },
  {
    title: 'FAQs / Blogs',
    icon: faComment,
    subMenu: [
      {
        title: 'Subject & Topic',
        path: '/controlGear/faqSubject',
      },
      {
        title: 'Question & Answer',
        path: '/controlGear/faqQuestion',
      },
    ],
  },
  {
    title: 'Homepage',
    icon: faFileAlt,
    subMenu: [
      {
        title: 'Success Stories',
        path: '/controlGear/successStories',
      },
      {
        title: 'Multiple Domains',
        path: '/controlGear/multipleDomains',
      },
    ],
  },
  {
    title: 'Footer Pages',
    icon: faFileAlt,
    subMenu: [
      {
        title: 'Copyright Notice',
        path: '/controlGear/footerPages/copyrightNotice',
      },
      {
        title: 'Privacy Statement',
        path: '/controlGear/footerPages/privacyStatement',
      },
      {
        title: 'Disclaimer',
        path: '/controlGear/footerPages/disclaimer',
      },
      {
        title: 'Terms & Conditions',
        path: '/controlGear/footerPages/termsConditions',
      },
    ],
  },
  /* {
    title: 'Success Stories',
    path: '/controlGear',
    icon: faComment,
  },*/
];
