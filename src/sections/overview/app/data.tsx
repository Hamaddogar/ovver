// Data
import { paths } from 'src/routes/paths';

type Link = {
  id: number;
  icon: string;
  title: string;
  color: string;
  path: string;
};

export const dashboardTools: Link[] = [
  {
    id: 1,
    icon: '/raw/orders.svg',
    title: 'orders',
    color: 'rgb(255, 93, 143,.12)',
    path: paths.dashboard.orders.root,
  },
  {
    id: 2,
    icon: '/raw/Customers0.svg',
    title: 'customers',
    color: 'rgb(251, 133, 0,.12)',
    path: paths.dashboard.customers.root,
  },
  {
    id: 3,
    icon: '/raw/Categories.svg',
    title: 'categories',
    color: 'rgb(251, 133, 0,.12)',
    path: paths.dashboard.categories.root,
  },
  {
    id: 4,
    icon: '/raw/Products.svg',
    title: 'products',
    color: 'rgb(234, 132, 201,.12)',
    path: paths.dashboard.products.root,
  },
  {
    id: 5,
    icon: '/raw/Settings.svg',
    title: 'account_settings',
    color: 'rgb(134, 136, 163,.12)',
    path: paths.dashboard.accountsettings.root,
  },
  {
    id: 6,
    icon: '/raw/Analytics.svg',
    title: 'analytics',
    color: 'rgb(4, 102, 200,.12)',
    path: paths.dashboard.analytics.root,
  },
  {
    id: 7,
    icon: '/raw/domain.svg',
    title: 'domain_settings',
    color: 'rgb(87, 202, 239,.12)',
    path: paths.dashboard.domain.root,
  },
  {
    id: 8,
    icon: '/raw/Integrations.svg',
    title: 'integrations',
    color: 'rgb(141, 199, 63,.12)',
    path: paths.dashboard.integrations.root,
  },
  {
    id: 9,
    icon: '/raw/Payment.svg',
    title: 'payment_methods',
    color: 'rgb(2, 195, 154,.12)',
    path: paths.dashboard.payments.root,
  },
  {
    id: 10,
    icon: '/raw/Vouchers.svg',
    title: 'vouchers',
    color: 'rgb(213, 76, 255,.12)',
    path: paths.dashboard.vouchers.root,
  },
  {
    id: 11,
    icon: '/raw/design.svg',
    title: 'website_design',
    color: 'rgb(239, 202, 8,.12)',
    path: paths.dashboard.design.root,
  },
  {
    id: 12,
    icon: '/raw/Delivery-Pickup.svg',
    title: 'delivery_and_pickup',
    color: 'rgb(33, 150, 243,.12)',
    path: paths.dashboard.deliveryPickup.root,
  },
];

export const quickSummary = [
  {
    id: 1,
    title: 'Live Visitors',
    icon: '/raw/VisitorsN.svg',
    count: 'none',
  },
  {
    id: 2,
    title: 'Customers',
    icon: '/raw/CustomersN.svg',
    count: 'totalCustomers',
  },
  {
    id: 3,
    title: 'Total Orders',
    icon: '/raw/OrdersN.svg',
    count: 'totalOrders',
  },
  {
    id: 4,
    title: 'Categories',
    icon: '/raw/CategoriesN.svg',
    count: 'totalCategory',
  },
  {
    id: 5,
    title: 'Products',
    icon: '/raw/ProductsN.svg',
    count: 'totalProduct',
  },
  {
    id: 6,
    title: 'Total Earning',
    icon: '/raw/EarningN.svg',
    count: 'averageOrderValue',
  },
];
