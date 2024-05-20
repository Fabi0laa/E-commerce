const menu_data = [
  {
    id: 1,
    products: true,
    title: 'Products',
    link: '/shop',
    restrictedTo: ['user'],
    product_pages: [
      {
        title: 'Shop Page',
        link: '/shop',
        mega_menus: [
          { title: 'Only Categories', link: '/shop-category' },
          { title: 'Shop Grid with Sideber', link: '/shop' },
          { title: 'Product Details', link: '/product-details' },
        ],
      },
      {
        title: 'Products',
        link: '/product-details',
        mega_menus: [{ title: 'Product Simple', link: '/product-details' }],
      },
      {
        title: 'eCommerce',
        link: '/shop',
        mega_menus: [
          { title: 'Shopping Cart', link: '/cart' },
          { title: 'Checkout', link: '/checkout' },
          { title: 'My account', link: '/profile' },
        ],
      },
      {
        title: 'More Pages',
        link: '/shop',
        mega_menus: [
          { title: 'Login', link: '/login' },
          { title: 'Register', link: '/register' },
          { title: 'Forgot Password', link: '/forgot' },
          { title: '404 Error', link: '/404' },
        ],
      },
    ],
  },
  {
    id: 2,
    sub_menu: true,
    title: 'Shop',
    link: '/shop',
    restrictedTo: ['user'],

    sub_menus: [
      { title: 'Shop', link: '/shop' },
      { title: 'Right Sidebar', link: '/shop-right-sidebar' },
      { title: 'Hidden Sidebar', link: '/shop-hidden-sidebar' },
    ],
  },
  {
    id: 3,
    sub_menu: true,
    title: 'Products',
    link: '/manage-products',
    restrictedTo: ['admin'],
    sub_menus: [
      { title: 'Add Product', link: '/add-product' },
      { title: 'Manage Products', link: '/manage-products' },
    ],
  },
  {
    id: 4,
    sub_menu: true,
    title: 'Users',
    link: '/manage-users',
    restrictedTo: ['admin'],
    sub_menus: [{ title: 'Manage Users', link: '/manage-users' }],
  },
  {
    id: 5,
    sub_menu: true,
    title: 'Categories',
    link: '/manage-categories',
    restrictedTo: ['admin'],
    sub_menus: [
      { title: 'Add Category', link: '/add-category' },
      { title: 'Manage Categories', link: '/manage-categories' },
    ],
  },
  {
    id: 6,
    sub_menu: true,
    title: 'Brands',
    link: '/manage-brands',
    restrictedTo: ['admin'],
    sub_menus: [
      { title: 'Add Brand', link: '/add-brand' },
      { title: 'Manage Brands', link: '/manage-brands' },
    ],
  },
  {
    id: 9,
    sub_menu: true,
    title: 'Orders',
    link: '/manage-orders',
    restrictedTo: ['admin'],
    sub_menus: [{ title: 'Manage Orders', link: '/manage-orders' }],
  },
];

export default menu_data;

// mobile_menu
export const mobile_menu = [
  {
    id: 1,
    sub_menu: true,
    title: 'Products',
    link: '/shop',
    restrictedTo: ['user'],

    sub_menus: [
      { title: 'Shop', link: '/shop' },
      { title: 'Right Sidebar', link: '/shop-right-sidebar' },
      { title: 'Hidden Sidebar', link: '/shop-hidden-sidebar' },
      { title: 'Only Categories', link: '/shop-category' },
      { title: 'Product Simple', link: '/product-details' },
    ],
  },
  {
    id: 2,
    sub_menu: true,
    title: 'eCommerce',
    link: '/cart',
    restrictedTo: ['user'],

    sub_menus: [
      { title: 'Shopping Cart', link: '/cart' },
      { title: 'Checkout', link: '/checkout' },
      { title: 'My account', link: '/profile' },
    ],
  },
  {
    id: 4,
    sub_menu: true,
    title: 'More Pages',
    link: '/login',
    restrictedTo: ['user', 'admin'],
    sub_menus: [
      { title: 'Login', link: '/login' },
      { title: 'Register', link: '/register' },
      { title: 'Forgot Password', link: '/forgot' },
    ],
  },
  {
    id: 5,
    sub_menu: true,
    title: 'Products',
    link: '/manage-products',
    restrictedTo: ['admin'],
    sub_menus: [
      { title: 'Add Product', link: '/add-product' },
      { title: 'Manage Products', link: '/manage-products' },
    ],
  },
  {
    id: 6,
    sub_menu: true,
    title: 'Users',
    link: '/manage-users',
    restrictedTo: ['admin'],
    sub_menus: [{ title: 'Manage Users', link: '/manage-users' }],
  },
  {
    id: 7,
    sub_menu: true,
    title: 'Categories',
    link: '/manage-categories',
    restrictedTo: ['admin'],
    sub_menus: [
      { title: 'Add Category', link: '/add-category' },
      { title: 'Manage Categories', link: '/manage-categories' },
    ],
  },
  {
    id: 8,
    sub_menu: true,
    title: 'Brands',
    link: '/manage-brands',
    restrictedTo: ['admin'],
    sub_menus: [
      { title: 'Add Brand', link: '/add-brand' },
      { title: 'Manage Brands', link: '/manage-brands' },
    ],
  },
  {
    id: 9,
    sub_menu: true,
    title: 'Orders',
    link: '/manage-orders',
    restrictedTo: ['admin'],
    sub_menus: [{ title: 'Manage Orders', link: '/manage-orders' }],
  },
];
