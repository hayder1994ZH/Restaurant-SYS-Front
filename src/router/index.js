import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
/* Layouts */
const VerticleLayout = () => import('../layouts/VerticleLayout')
const AuthLayout = () => import('../layouts/AuthLayouts/AuthLayout')
/* Dashboards View */
const Dashboard1 = () => import('../views/Dashboards/Dashboard1')
//owner route
const Users = () => import('../views/Users/Users')//owner
const take = () => import('../views/Users/take')//owner
const Categories = () => import('../views/Users/Categories')//owner
const Category = () => import('../views/Users/Category')//owner
const Restaurants = () => import('../views/Users/Restaurants')//owner
const Meals = () => import('../views/Users/Meals')//owner  
const MealLanguages = () => import('../views/Users/MealLanguages')//owner
const Languages = () => import('../views/Users/Languages')//owner
const ExtraMeal = () => import('../views/Users/ExtraMeal')//owner
const QR = () => import('../views/Users/QRcodeGenerated')//owner
//end owner Route
//admin Route
const CategoriesAdmins = () => import('../views/RestaurantAdmins/Categories')
const CategoryAdmins = () => import('../views/RestaurantAdmins/Category')
const MealsAdmins = () => import('../views/RestaurantAdmins/Meals') 
const MealLanguagesAdmins = () => import('../views/RestaurantAdmins/MealLanguages')
const ExtraMealAdmins = () => import('../views/RestaurantAdmins/ExtraMeal')
const Slider = () => import('../views/RestaurantAdmins/Slider')
const QRAdmins = () => import('../views/RestaurantAdmins/QRcodeGenerated')
/* Authentic View */
const SignIn = () => import('../views/AuthPages/Default/SignIn')
const SignUp = () => import('../views/AuthPages/Default/SignUp')
const RecoverPassword1 = () => import('../views/AuthPages/Default/RecoverPassword1')
const LockScreen1 = () => import('../views/AuthPages/Default/LockScreen1')
const ConfirmMail1 = () => import('../views/AuthPages/Default/ConfirmMail1')

// {
//   path: 'all-categories',
//   name: prop + '.all-categories',
//   // meta: { auth: true, name: 'Categories' },
//   component: Category1,
//   beforeEnter: (to, from, next) => {
//     if (parseJwt(localStorage.getItem('access_token')).user_id === 1) {
//       next()
//     } else {
//       next({ path: '/home-1' })
//     }
//   }
// },
function parseJwt (token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(jsonPayload)
};

Vue.use(VueRouter)
var Url = 'http://localhost:8000/api/v1/'

axios.interceptors.request.use(
  config => {
    config.baseURL = Url
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    // do something with the response data
    // console.log('Response was received from interseptor')
    return response
  },
  error => {
    // handle the response error
    return Promise.reject(error)
  }
)
const childRoutes = (prop) => [
  {
    path: 'home-1',
    name: prop + '.home-1',
    meta: { auth: true, name: 'Home' },
    component: Dashboard1
  },
  //owner
  {
    path: 'users',
    name: prop + '.users',
    meta: { auth: true, name: 'Users' },
    component: Users
  },
  {
    path: 'admins/categories',
    name: prop + '.categories',
    meta: { auth: true, name: 'Categories' },
    component: Categories
  },
  {
    path: 'admins/category/:id',
    name: prop + '.category',
    meta: { auth: true, name: 'Category' },
    component: Category
  },
  {
    path: 'admins/restaurant',
    name: prop + '.restaurant',
    meta: { auth: true, name: 'Restaurants' },
    component: Restaurants
  },
  {
    path: 'admins/meals',
    name: prop + '.meals',
    meta: { auth: true, name: 'Meals' },
    component: Meals
  },
  {
    path: 'admins/meal/:id',
    name: prop + '.meal',
    meta: { auth: true, name: 'MealLanguages' },
    component: MealLanguages
  },
  {
    path: 'admins/extra/meal/:id',
    name: prop + '.extraMeal',
    meta: { auth: true, name: 'ExtraMeal' },
    component: ExtraMeal
  },
  {
    path: 'admins/generate/QR',
    name: prop + '.QR',
    meta: { auth: true, name: 'QR' },
    component: QR
  },
  //end owner
  //admins
  {
    path: 'categories',
    name: prop + '.admins.categories',
    meta: { auth: true, name: 'CategoriesAdmins' },
    component: CategoriesAdmins
  },
  {
    path: 'category/:id',
    name: prop + '.admins.category',
    meta: { auth: true, name: 'CategoryAdmins' },
    component: CategoryAdmins
  },
  {
    path: 'meals',
    name: prop + '.admins.meals',
    meta: { auth: true, name: 'MealsAdmins' },
    component: MealsAdmins
  },
  {
    path: 'take',
    name: prop + '.take',
    meta: { auth: true, name: 'take' },
    component: take
  },
  {
    path: 'meal/:id',
    name: prop + '.admins.meal',
    meta: { auth: true, name: 'MealLanguagesAdmins' },
    component: MealLanguagesAdmins
  },
  {
    path: 'extra/meal/:id',
    name: prop + '.admins.extraMeal',
    meta: { auth: true, name: 'ExtraMealAdmins' },
    component: ExtraMealAdmins
  },
  {
    path: 'languages/:id',
    name: prop + '.languages',
    meta: { auth: true, name: 'Languages' },
    component: Languages
  },
  {
    path: 'generate/QR',
    name: prop + '.admins.QR',
    meta: { auth: true, name: 'QRAdmins' },
    component: QRAdmins
  },
  {
    path: 'slider',
    name: prop + '.admins.slider',
    meta: { auth: true, name: 'Slider' },
    component: Slider
  }
  //end admins
]

const authChildRoutes = (prop) => [
  {
    path: 'sign-in1',
    name: prop + '.sign-in1',
    meta: { auth: true },
    component: SignIn
  },
  {
    path: 'sign-up1',
    name: prop + '.sign-up1',
    meta: { auth: true },
    component: SignUp
  },
  {
    path: 'password-reset1',
    name: prop + '.password-reset1',
    meta: { auth: true },
    component: RecoverPassword1
  },
  {
    path: 'lock-screen1',
    name: prop + '.lock-screen1',
    meta: { auth: true },
    component: LockScreen1
  },
  {
    path: 'confirm-mail1',
    name: prop + '.confirm-mail1',
    meta: { auth: true },
    component: ConfirmMail1
  }
]


const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: VerticleLayout,
    meta: { auth: true },
    children: childRoutes('dashboard')
  },
  {
    path: '/auth',
    name: 'auth1',
    component: AuthLayout,
    meta: { auth: true },
    children: authChildRoutes('auth1')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  axios.get('profile/user').then((res) => {
    localStorage.setItem('user', JSON.stringify(res.data))
  }).catch(() => {
    router.push({ name: 'auth1.sign-in1' })
  })
  const publicPages = ['/auth/sign-in1', '/auth/sign-up1']
  if (publicPages.includes(to.path)) {
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
  }
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')
  if (to.meta.auth) {
    if (authRequired && loggedIn === null) {
      return next('/auth/sign-in1')
    } else if (to.name === 'dashboard') {
      return next('/home-1')
    }
  }
  next()
})

export default router
