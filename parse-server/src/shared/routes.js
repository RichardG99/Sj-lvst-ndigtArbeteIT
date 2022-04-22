import Createuser from './pages/Createuser';
import Loginpage from './pages/Loginpage';
import Myhomepage from './pages/Myhomepage';
import Subscription from './pages/Subscription';

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
