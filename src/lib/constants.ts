import { BaseSelectStylesNames } from '@mantine/core/lib/components/Select/types';
import { CSSObject } from '@mantine/core';
import { navIconsActive as activeIcons, navIconsDefault as defaultIcons } from '../assets/images/icons/navigation';

/**
 * Object containing the routes that only a logged out user can visit.
 */
export const GUEST_ROUTE = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  RESET_PASSWORD: '/reset-password',
  PAGE_NOT_FOUND: '/404',
  SEARCH: '/search',
};

/**
 * Object containing the routes that only a logged in user can visit.
 */
export const MEMBER_ROUTE = {
  HOME: '/',
  get DASHBOARD(): string {
    return '/dashboard';
  },
  get GET_STARTED(): string {
    return '/get-started';
  },
  get LOCATIONS_ALL(): string {
    return '/locations/all';
  },
  get REVIEWED_LOCATIONS(): string {
    return '/locations/reviewed';
  },
  get LOCATIONS(): string {
    return '/locations';
  },
  get USERS(): string {
    return '/users';
  },
  get NOTIFICATIONS(): string {
    return '/notificaions';
  },
  get PAGE_NOT_FOUND(): string {
    return '/404';
  },
};

/**
 * Prefix used to more easily find & identify values we set in our browser's LocalStorage for our app.
 * @example
 * `${LOCAL_STORAGE_KEY_PREFIX}something_about_the_page_or_feature``
 */
const LOCAL_STORAGE_KEY_PREFIX = 'JJC_APP__';
export const LOCAL_STORAGE_KEYS = {
  WALLET_LIST: `${LOCAL_STORAGE_KEY_PREFIX}WALLET_LIST`,
  USER_DATA: `${LOCAL_STORAGE_KEY_PREFIX}USER_DATA`,
  TOKEN: `${LOCAL_STORAGE_KEY_PREFIX}TOKEN`,
};

export enum USER_ROLES {
  ADMIN = 'admin',
}

export const dasbhboardTabItems: { title: string; route: string }[] = [
  {
    title: 'INTERNATIONAL',
    route: 'international',
  },
  {
    title: 'LOCAL',
    route: 'local',
  },
];

//
type StatusRenderMappings = { [key in Status]: { color: string; text: string } };
type TransactionTypeRenderMappings = { [key in TransactionType]: { color: string; text: string } };

export enum Status {
  PENDING,
  INPROGRESS,
  APPROVED,
  DENIED,
}

export enum TransactionType {
  DEBIT,
  CREDIT,
}

export const transactionTypeRenderMappings: TransactionTypeRenderMappings = {
  [TransactionType.DEBIT]: { color: '#EC3D08', text: 'Debit' },
  [TransactionType.CREDIT]: { color: '#4AB0A6', text: 'Credit' },
};
export const statusRenderMappings: StatusRenderMappings = {
  [Status.PENDING]: { color: '#F5C14F', text: 'Pending' },
  [Status.INPROGRESS]: { color: '#233984', text: 'In Progress' },
  [Status.APPROVED]: { color: '#279F70', text: 'Approved' },
  [Status.DENIED]: { color: '#EC3D08', text: 'Denied' },
};

export const isValidEmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const selectStyles: Partial<Record<BaseSelectStylesNames, CSSObject>> = {
  input: {
    border: 'none',
    borderBottom: `1px solid #E3E2E2`,
    borderRadius: 0,
    paddingLeft: 0,
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "'Glacial Indifference-Regular', sans-serif;",
    color: '#1A242D',
  },
  label: {
    fontSize: 14,
    fontFamily: "'Glacial Indifference-Regular', sans-serif;",
    color: '#828282',
  },
  rightSection: { pointerEvents: 'none' },
  root: {
    marginBottom: 10,
  },
};

export const navigationItems = [
  {
    to: MEMBER_ROUTE.LOCATIONS,
    text: 'Manage Locations',
    icon: { default: defaultIcons.locations, active: activeIcons.locations },
  },
  // {
  //   to: MEMBER_ROUTE.USERS,
  //   text: 'Manage Users',
  //   icon: { default: defaultIcons.locations, active: activeIcons.locations },
  // },
  // {
  //   to: MEMBER_ROUTE.NOTIFICATIONS,
  //   text: 'Notifications',
  //   icon: { default: defaultIcons.locations, active: activeIcons.locations },
  // },
  // {
  //   to: MEMBER_ROUTE.LOCATIONS,
  //   text: 'Locations',
  //   icon: { default: defaultIcons.locations, active: activeIcons.locations },
  //   subNavigationItems: [
  //     {
  //       to: MEMBER_ROUTE.LOCATIONS_ALL,
  //       text: 'All Locations',
  //     },
  //     {
  //       to: MEMBER_ROUTE.REVIEWED_LOCATIONS,
  //       text: 'Reviewed',
  //     },
  //   ],
  // },
];

export const locationTabs = [
  {
    title: "All Locations",
    route: 'all',
  },
  {
    title: "Pending Reviews",
    route: 'review',
  },
  {
    title: "Denied Reviews",
    route: 'denied',
  },
];

export const chartSelectStyles: Partial<Record<BaseSelectStylesNames, CSSObject>> = {
  input: {
    border: 'none',
    borderRadius: 0,
    paddingLeft: 0,
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "'Glacial Indifference-Regular', sans-serif;",
    color: '#1A242D',
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 14,
    fontFamily: "'Glacial Indifference-Regular', sans-serif;",
    color: '#828282',
  },
  rightSection: { pointerEvents: 'none' },
  root: {
    marginBottom: 10,
    width: 140,
  },
  item: {
    fontSize: 12,
  },
};


export const colors = {
  primaryDark:'#2c2c2c'
}