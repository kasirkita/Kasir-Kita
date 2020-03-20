import React from 'react'
import Login from "./views/Login";
import FullScreen from "./components/FullScreen";
import { Redirect } from "react-router-dom";
import DefaultScreen from './components/DefaultScreen';
import Dashboard from './views/Dashboard';
import Cashier from './views/Cashier';
import Product from './views/Product/Product';
import AddProduct from './views/Product/AddProduct';
import Category from './views/Category/Category';
import Sales from './views/Sales';
import Purchase from './views/Purchase/Purchase';
import AddPurchase from './views/Purchase/AddPurchase';
import Expense from './views/Expense/Expense';
import AddExpense from './views/Expense/AddExpense';
import Stock from './views/Stock/Stock';
import User from './views/User/User';
import AddUser from './views/User/AddUser';
import Customer from './views/Customer/Customer';
import AddCustomer from './views/Customer/AddCustomer';
import Supplier from './views/Supplier/Supplier';
import AddSupplier from './views/Supplier/AddSupplier';
import Role from './views/Role/Role';
import AddRole from './views/Role/AddRole';
import SalesReport from './views/Report/SalesReport';
import PurchasReport from './views/Report/PurchaseReport';
import ExpenseReport from './views/Report/ExpenseReport';
import StockReport from './views/Report/StockReport';
import Settings from './views/Settings';
import Discount from './views/Discount/Discount';
import AddDiscount from './views/Discount/AddDiscount';
import Welcome from './views/Welcome';
import EditProduct from './views/Product/EditProduct';
import ViewProduct from './views/Product/ViewProduct';
import Unit from './views/Unit/Unit';
import EditRole from './views/Role/EditRole';
import ViewRole from './views/Role/ViewRole';
import EditUser from './views/User/EditUser';
import ViewUser from './views/User/ViewUser';
import EditCustomer from './views/Customer/EditCustomer';
import EditSupplier from './views/Supplier/EditSupplier';

export default [
    {
        path: '/',
        exact: true,
        layout: FullScreen,
        component: () => <Redirect to="/dashboard" />
    },
    {
        path: '/login',
        exact: true,
        layout: FullScreen,
        component: Login
    },
    {
        path: '/dashboard',
        exact: true,
        layout: DefaultScreen,
        component: Dashboard
    },
    {
        path: '/cashier',
        exact: true,
        layout: DefaultScreen,
        component: Cashier
    },
    {
        path: '/product',
        exact: true,
        layout: DefaultScreen,
        component: Product
    },
    {
        path: '/product/create',
        exact: true,
        layout: DefaultScreen,
        component: AddProduct
    },
    {
        path: '/product/edit/:id',
        exact: true,
        layout: DefaultScreen,
        component: EditProduct
    },
    {
        path: '/product/view/:id',
        exact: true,
        layout: DefaultScreen,
        component: ViewProduct
    },
    {
        path: '/category',
        exact: true,
        layout: DefaultScreen,
        component: Category
    },
    {
        path: '/unit',
        exact: true,
        layout: DefaultScreen,
        component: Unit
    },
    {
        path: '/sales',
        exact: true,
        layout: DefaultScreen,
        component: Sales
    },
    {
        path: '/purchase',
        exact: true,
        layout: DefaultScreen,
        component: Purchase
    },
    {
        path: '/purchase/create',
        exact: true,
        layout: DefaultScreen,
        component: AddPurchase
    },
    {
        path: '/expense',
        exact: true,
        layout: DefaultScreen,
        component: Expense
    },
    {
        path: '/expense/create',
        exact: true,
        layout: DefaultScreen,
        component: AddExpense
    },
    {
        path: '/stock',
        exact: true,
        layout: DefaultScreen,
        component: Stock
    },
    {
        path: '/user',
        exact: true,
        layout: DefaultScreen,
        component: User
    },
    {
        path: '/user/create',
        exact: true,
        layout: DefaultScreen,
        component: AddUser
    },
    {
        path: '/user/edit/:id',
        exact: true,
        layout: DefaultScreen,
        component: EditUser
    },
    {
        path: '/user/view/:id',
        exact: true,
        layout: DefaultScreen,
        component: ViewUser
    },
    {
        path: '/customer',
        exact: true,
        layout: DefaultScreen,
        component: Customer
    },
    {
        path: '/customer/create',
        exact: true,
        layout: DefaultScreen,
        component: AddCustomer
    },
    {
        path: '/customer/edit/:id',
        exact: true,
        layout: DefaultScreen,
        component: EditCustomer
    },
    {
        path: '/supplier',
        exact: true,
        layout: DefaultScreen,
        component: Supplier
    },
    {
        path: '/supplier/create',
        exact: true,
        layout: DefaultScreen,
        component: AddSupplier
    },
    {
        path: '/supplier/edit/:id',
        exact: true,
        layout: DefaultScreen,
        component: EditSupplier
    },
    {
        path: '/role',
        exact: true,
        layout: DefaultScreen,
        component: Role
    },
    {
        path: '/role/create',
        exact: true,
        layout: DefaultScreen,
        component: AddRole
    },
    {
        path: '/role/edit/:id',
        exact: true,
        layout: DefaultScreen,
        component: EditRole
    },
    {
        path: '/role/view/:id',
        exact: true,
        layout: DefaultScreen,
        component: ViewRole
    },
    {
        path: '/report-sales',
        exact: true,
        layout: DefaultScreen,
        component: SalesReport
    },
    {
        path: '/report-purchase',
        exact: true,
        layout: DefaultScreen,
        component: PurchasReport
    },
    {
        path: '/report-expense',
        exact: true,
        layout: DefaultScreen,
        component: ExpenseReport
    },
    {
        path: '/report-stock',
        exact: true,
        layout: DefaultScreen,
        component: StockReport
    },
    {
        path: '/settings',
        exact: true,
        layout: DefaultScreen,
        component: Settings
    },
    {
        path: '/discount',
        exact: true,
        layout: DefaultScreen,
        component: Discount
    },
    {
        path: '/discount/create',
        exact: true,
        layout: DefaultScreen,
        component: AddDiscount
    },
    {
        path: '/welcome',
        exact: true,
        layout: FullScreen,
        component: Welcome
    }
]