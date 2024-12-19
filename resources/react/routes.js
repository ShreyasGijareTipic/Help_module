// routes.js
import React from 'react';

// Lazy-loaded components
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

// Invoice
const Invoice = React.lazy(() => import('./views/pages/invoice/Invoice'));
const Orders = React.lazy(() => import('./views/pages/invoice/Orders'));
const InvoiceDetails = React.lazy(() => import('./views/pages/invoice/InvoiceDetails'));

// Ticketing
const TicketForm = React.lazy(() => import('./views/pages/TicketForm'));
const TicketTable = React.lazy(() => import('./views/pages/TicketTable'));
const Assign = React.lazy(() => import('./views/pages/AssignPage'));
const TicketFormLogin = React.lazy(() => import('./views/pages/TicketFormLogin'));
const TicketTableNewTicket = React.lazy(() => import('./views/pages/TicketTableNewTicket'));
const TicketTableInProcessTicket = React.lazy(() => import('./views/pages/TicketTableInProcessTicket'));
const TicketTableClosedTicket = React.lazy(() => import('./views/pages/TicketTableClosedTicket'));
const TicketTableDrAssist = React.lazy(() => import('./views/pages/TicketTableDrAssist'));
const TicketTableAquaLogix = React.lazy(() => import('./views/pages/TicketTableAquaLogix'));


// Products
const NewProduct = React.lazy(() => import('./views/pages/products/NewProduct'));
const NewCategory = React.lazy(() => import('./views/pages/category/NewCategory'));
const AllProducts = React.lazy(() => import('./views/pages/products/AllProducts'));
const AllCategory = React.lazy(() => import('./views/pages/category/AllCategory'));
const EditProduct = React.lazy(() => import('./views/pages/products/EditProduct'));
const EditCategory = React.lazy(() => import('./views/pages/category/EditCategory'));

// Expense
const AllExpenseType = React.lazy(() => import('./views/pages/expense/AllExpenseType'));
const EditExpenseType = React.lazy(() => import('./views/pages/expense/EditExpenseType'));
const NewExpenseType = React.lazy(() => import('./views/pages/expense/NewExpenseType'));
const NewExpense = React.lazy(() => import('./views/pages/expense/NewExpense'));
const ExpenseReport = React.lazy(() => import('./views/pages/expense/ExpenseReport'));

// Charts
const Charts = React.lazy(() => import('./views/charts/Charts'));

// Widgets
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));

// Define routes configuration
const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/TicketForm', name: 'TicketForm', element: TicketForm },
  { path: '/TicketFormLogin', name: 'TicketFormLogin', element: TicketFormLogin },
  { path: '/TicketTableNewTicket', name: 'TicketTableNewTicket', element: TicketTableNewTicket },
  { path: '/TicketTableInProcessTicket', name: 'TicketTableInProcessTicket', element:TicketTableInProcessTicket },
  { path: '/TicketTableClosedTicket', name: 'TicketTableClosedTicket', element:TicketTableClosedTicket },
  { path: '/TicketTableDrAssist', name: 'TicketTableDrAssist', element:TicketTableDrAssist },
  { path: '/TicketTableAquaLogix', name: 'TicketTableAquaLogix', element:TicketTableAquaLogix },
  { path: '/TicketTable', name: 'TicketTable', element: TicketTable },
  { path: '/Assign/:id', name: 'Assign', element: Assign },
  { path: '/invoice', name: 'Invoice', element: Invoice },
  { path: '/invoice-details/:id', name: 'InvoiceDetails', element: InvoiceDetails },
  { path: '/bookings', name: 'Advance Bookings', element: Orders },
  { path: '/regular', name: 'Regular Orders', element: Orders },
  { path: '/order', name: 'All Orders', element: Orders },
  { path: '/products/new', name: 'New Product', element: NewProduct },
  { path: '/category/new', name: 'New Category', element: NewCategory },
  { path: '/products/all', name: 'All Products', element: AllProducts },
  { path: '/category/all', name: 'All Category', element: AllCategory },
  { path: '/products/edit/:id', name: 'Edit Product', element: EditProduct },
  { path: '/category/edit/:id', name: 'Edit Category', element: EditCategory },
  { path: '/expense/new-type', name: 'New Expense Type', element: NewExpenseType },
  { path: '/expense/edit-type/:id', name: 'Edit Expense Type', element: EditExpenseType },
  { path: '/expense/all-type', name: 'All Expense Types', element: AllExpenseType },
  { path: '/expense/new', name: 'New Expense', element: NewExpense },
  { path: '/expense/report', name: 'Expense Report', element: ExpenseReport },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
];

export default routes;
