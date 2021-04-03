import Createuser from './pages/Createuser';
import Loginpage from './pages/Loginpage';
import Myhomepage from './pages/Myhomepage';

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
