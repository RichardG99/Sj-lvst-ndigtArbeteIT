import Createuser from './pages/Createuser';
import Loginpage from './pages/Loginpage';
import Myhomepage from './pages/Myhomepage';
import Prices from './pages/Prices';
import Subscription from './pages/Subscription';
import Subscribe from './pages/Subscribe';
import Account from './pages/Account';
import Cancel from './pages/Cancel';
import Update from './pages/Update';

export default [
  {
    path: '/loginpage',
    component: Loginpage,
    exact: true,
  },
  {
    path: '/myhomepage',
    component: Myhomepage,
    exact: true,
  },
  {
    path:'/subscription',
    component: Subscription,
    exact: true,
  },
  {
    path:'/account',
    component: Account,
    exact: true,
  },
  {
    path: '/update',
    component: Update,
    exact: true,
  },
  {
    path:'/cancel',
    component: Cancel,
    exact: true,
  },
  {
    path:'/prices',
    component: Prices,
    exact: true,
  },
  {
    path:'/subscribe',
    component: Subscribe,
    exact: true,
  },
  {
    path: '/createuser',
    component: Createuser,
    exact: true,
  },
  {
    path: '/',
    component: Loginpage,
    exact: true,
  },
  
];
