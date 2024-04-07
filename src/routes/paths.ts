// utils
import { paramCase } from 'src/utils/change-case';
import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

// drcode-paths
export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  components: '/components',
  docs: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
  zoneUI: 'https://mui.com/store/items/zone-landing-page/',
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
  figma:
    'https://www.figma.com/file/kAYnYYdib0aQPNKZpgJT6J/%5BPreview%5D-Minimal-Web.v5.0.0?type=design&node-id=0%3A1&t=Al4jScQq97Aly0Mn-1',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id: string) => `/product/${id}`,
    demo: {
      details: `/product/${MOCK_ID}`,
    },
  },
  post: {
    root: `/post`,
    details: (title: string) => `/post/${paramCase(title)}`,
    demo: {
      details: `/post/${paramCase(MOCK_TITLE)}`,
    },
  },
  // AUTH
  auth: {
    amplify: {
      login: `${ROOTS.AUTH}/amplify/login`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      register: `${ROOTS.AUTH}/amplify/register`,
      newPassword: `${ROOTS.AUTH}/amplify/new-password`,
      forgotPassword: `${ROOTS.AUTH}/amplify/forgot-password`,
    },
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
      verify: `${ROOTS.AUTH}/jwt/verify`,
      forgotPassword: `${ROOTS.AUTH}/jwt/forgot-password`,
      newPassword: `${ROOTS.AUTH}/jwt/new-password`,
      checkUser: `${ROOTS.AUTH}/jwt/check-user`,
    },
    firebase: {
      login: `${ROOTS.AUTH}/firebase/login`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      register: `${ROOTS.AUTH}/firebase/register`,
      forgotPassword: `${ROOTS.AUTH}/firebase/forgot-password`,
    },
    auth0: {
      login: `${ROOTS.AUTH}/auth0/login`,
    },
  },
  authDemo: {
    classic: {
      login: `${ROOTS.AUTH_DEMO}/classic/login`,
      register: `${ROOTS.AUTH_DEMO}/classic/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/classic/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/classic/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/classic/verify`,
    },
    modern: {
      login: `${ROOTS.AUTH_DEMO}/modern/login`,
      register: `${ROOTS.AUTH_DEMO}/modern/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/modern/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/modern/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/modern/verify`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    mail: `${ROOTS.DASHBOARD}/mail`,
    chat: `${ROOTS.DASHBOARD}/chat`,
    blank: `${ROOTS.DASHBOARD}/blank`,
    kanban: `${ROOTS.DASHBOARD}/kanban`,
    calendar: `${ROOTS.DASHBOARD}/calendar`,
    fileManager: `${ROOTS.DASHBOARD}/file-manager`,
    permission: `${ROOTS.DASHBOARD}/permission`,
    theme: `${ROOTS.DASHBOARD}/theme`,
    brand: `${ROOTS.DASHBOARD}/brand`,
    icon: `${ROOTS.DASHBOARD}/icon`,
    style: `${ROOTS.DASHBOARD}/style`,
    plans: `${ROOTS.DASHBOARD}/plans`,
    upgradePlans: `${ROOTS.DASHBOARD}/upgrade-Plans`,
    general: {
      app: `${ROOTS.DASHBOARD}/app`,
      apptools: `${ROOTS.DASHBOARD}/tools`,
      trending: `${ROOTS.DASHBOARD}/trending`,
      mostselling: `${ROOTS.DASHBOARD}/most-Selling`,
      subscriptionplan: `${ROOTS.DASHBOARD}/subscription-plan`,
      subscriptionplancheckout: `${ROOTS.DASHBOARD}/subscription-plan-checkout`,
      ecommerce: `${ROOTS.DASHBOARD}/ecommerce`,
      analytics: `${ROOTS.DASHBOARD}/analytics`,
      bestSelling: `${ROOTS.DASHBOARD}/best-selling`,
      delivery: `${ROOTS.DASHBOARD}/analytics/delivery`,
      banking: `${ROOTS.DASHBOARD}/banking`,
      booking: `${ROOTS.DASHBOARD}/booking`,
      file: `${ROOTS.DASHBOARD}/file`,
      products: `${ROOTS.DASHBOARD}/products/varients`,
      order: `${ROOTS.DASHBOARD}/order`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/user/${MOCK_ID}/edit`,
      },
    },
    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      new: `${ROOTS.DASHBOARD}/product/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/product/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/product/edit/${id}`,
      demo: {
        details: `${ROOTS.DASHBOARD}/product/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/product/${MOCK_ID}/edit`,
      },
    },
    products: {
      root: `${ROOTS.DASHBOARD}/products`,
      new: `${ROOTS.DASHBOARD}/products/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/products/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/products/edit/${id}`,
      variants: `${ROOTS.DASHBOARD}/products/variants`,
      modifiers: `${ROOTS.DASHBOARD}/products/modifiers`,
    },
    // TODO: edit paths when working on analytics pages
    analytics: {
      root: `${ROOTS.DASHBOARD}/analytics`,
      sales_analytics: `${ROOTS.DASHBOARD}/analytics`,
      best_selling: `${ROOTS.DASHBOARD}/analytics`,
      branch: `${ROOTS.DASHBOARD}/analytics`,
    },
    invoice: {
      root: `${ROOTS.DASHBOARD}/invoice`,
      new: `${ROOTS.DASHBOARD}/invoice/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/invoice/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/invoice/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}/edit`,
      },
    },
    post: {
      root: `${ROOTS.DASHBOARD}/post`,
      new: `${ROOTS.DASHBOARD}/post/new`,
      details: (title: string) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}`,
      edit: (title: string) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}`,
        edit: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}/edit`,
      },
    },
    order: {
      root: `${ROOTS.DASHBOARD}/order`,
      details: (id: string) => `${ROOTS.DASHBOARD}/order/${id}`,
      demo: {
        details: `${ROOTS.DASHBOARD}/order/${MOCK_ID}`,
      },
    },
    orders: {
      root: `${ROOTS.DASHBOARD}/orders`,
    },
    customers: {
      root: `${ROOTS.DASHBOARD}/customers`,
    },
    payments: {
      root: `${ROOTS.DASHBOARD}/payments`,
    },
    vouchers: {
      root: `${ROOTS.DASHBOARD}/vouchers`,
    },
    roles: {
      root: `${ROOTS.DASHBOARD}/roles`,
    },
    accountsettings: {
      root: `${ROOTS.DASHBOARD}/account-settings`,
      AccountDetails: `${ROOTS.DASHBOARD}/account-settings/account-details`,
      LanguagesCountries: `${ROOTS.DASHBOARD}/account-settings/languages-countries`,
      StaffManagement: `${ROOTS.DASHBOARD}/account-settings/staff-management`,
      WebsiteInformation: `${ROOTS.DASHBOARD}/account-settings/website-information`,
      InvoiceSettings: `${ROOTS.DASHBOARD}/account-settings/invoice-settings`,
      TaxSettings: `${ROOTS.DASHBOARD}/account-settings/tax-settings`,
      NotificationsSettings: `${ROOTS.DASHBOARD}/account-settings/notifications-settings`,
      BillingPlans: `${ROOTS.DASHBOARD}/account-settings/billing-plans`,
    },
    integrations: {
      root: `${ROOTS.DASHBOARD}/integrations`,
    },
    domain: {
      root: `${ROOTS.DASHBOARD}/domain-settings`,
      new: `${ROOTS.DASHBOARD}/domain-settings/new`,
      avaliable: `${ROOTS.DASHBOARD}/domain-settings/avaliable`,
      new_controls: `${ROOTS.DASHBOARD}/domain-settings/new/controls`,
      custom: `${ROOTS.DASHBOARD}/domain-settings/custom`,
      custom_controls: `${ROOTS.DASHBOARD}/domain-settings/custom/controls`,
    },
    tasks: {
      root: `${ROOTS.DASHBOARD}/tasks`,
      book: `${ROOTS.DASHBOARD}/tasks/book`,
      pay: `${ROOTS.DASHBOARD}/tasks/book/pay`,
    },
    deliveryPickup: {
      root: `${ROOTS.DASHBOARD}/delivery-pickup`,
      new: `${ROOTS.DASHBOARD}/delivery-pickup/new-location`,
    },
    categories: {
      root: `${ROOTS.DASHBOARD}/categories`,
    },
    brands: {
      root: `${ROOTS.DASHBOARD}/brand`,
    },
    job: {
      root: `${ROOTS.DASHBOARD}/job`,
      new: `${ROOTS.DASHBOARD}/job/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/job/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/job/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/job/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/job/${MOCK_ID}/edit`,
      },
    },
    tour: {
      root: `${ROOTS.DASHBOARD}/tour`,
      new: `${ROOTS.DASHBOARD}/tour/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/tour/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/tour/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}/edit`,
      },
    },
    design: {
      root: `${ROOTS.DASHBOARD}/design`,
      themes: (theme_type: string) => `${ROOTS.DASHBOARD}/design/${theme_type}`,
      theme: (theme_type: string, theme_name: string, theme_url: string, id: string) =>
        `${ROOTS.DASHBOARD}/design/${theme_type}/${theme_name}?id=${id}&url=${theme_url}`,
      market: {
        root: `${ROOTS.DASHBOARD}/design/market`,
        preview: `${ROOTS.DASHBOARD}/design/market/preview`,
        edit: `${ROOTS.DASHBOARD}/design/market/edit`,
        theme: (theme_name: string) => `${ROOTS.DASHBOARD}/design/market/${theme_name}`,
      },
    },
    newDesign: {
      root: `${ROOTS.DASHBOARD}/new-design`,
    },
  },
};

// nav links paths
export const navLinks = [
  {
    subheader: 'overview',
    items: [
      {
        title: 'home',
        path: paths.dashboard.root,
        icon: 'fluent:home-20-filled',
      },
      {
        title: 'orders',
        path: paths.dashboard.orders.root,
        icon: 'icon-park-solid:mall-bag',
        permissions: ['GET_ORDERS'],
      },
      {
        title: 'categories',
        path: paths.dashboard.categories.root,
        icon: 'fa6-solid:shapes',
        permissions: ['GET_CATEGORYS'],
      },
      {
        title: 'brand',
        path: paths.dashboard.brands.root,
        icon: 'basil:bag-solid',
        permissions: ['GET_BRANDS'],
      },
      {
        title: 'products',
        path: paths.dashboard.products.root,
        icon: 'fa6-solid:box',
        permissions: ['GET_PRODUCTS'],
        children: [
          { title: 'variants', path: paths.dashboard.products.variants },
          { title: 'modifiers', path: paths.dashboard.products.modifiers },
        ],
      },
      {
        title: 'customers',
        path: paths.dashboard.customers.root,
        icon: 'fa6-solid:user-group',
        permissions: ['GET_CUSTOMERS'],
      },
      {
        title: 'analytics',
        path: paths.dashboard.analytics.root,
        icon: 'fa6-solid:chart-pie',
        permissions: ['GET_ORDERS'],
        children: [
          { title: 'sales_analytics', path: paths.dashboard.general.analytics },
          { title: 'best_selling', path: paths.dashboard.general.bestSelling },
          { title: 'branch', path: `${ROOTS.DASHBOARD}/analytics/delivery` },
        ],
      },
      {
        title: 'payment',
        path: paths.dashboard.payments.root,
        icon: 'fa6-solid:sack-dollar',
        permissions: ['GET_PAYMENTS'],
      },
      {
        title: 'vouchers',
        path: paths.dashboard.vouchers.root,
        icon: 'flowbite:ticket-solid',
        permissions: ['GET_VOUCHERS'],
      },
      {
        title: 'settings',
        path: paths.dashboard.accountsettings.root,
        icon: 'fa6-solid:gear',
      },
      {
        title: 'delivery',
        path: paths.dashboard.deliveryPickup.root,
        icon: 'fa-solid:map-marked-alt',
      },
      {
        title: 'integrations',
        path: paths.dashboard.integrations.root,
        icon: 'raphael:jigsaw',
      },
      {
        title: 'design',
        path: paths.dashboard.design.root,
        icon: 'oi:brush',
      },
      {
        title: 'domain',
        path: paths.dashboard.domain.root,
        icon: 'prime:link',
      },
      {
        title: 'roles',
        path: paths.dashboard.roles.root,
        icon: 'basil:bag-solid',
      },
    ],
  },
];
