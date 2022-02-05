import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
/* Layouts */
const VerticleLayout = () => import('../layouts/VerticleLayout')
const AuthLayout = () => import('../layouts/AuthLayouts/AuthLayout')
/* Dashboards View */
const Dashboard1 = () => import('../views/Dashboards/Dashboard1')
const Reels = () => import('../views/Reels/Reels')
const Users = () => import('../views/Users/Users')//owner
const Categories = () => import('../views/Users/Categories')//owner
const Category = () => import('../views/Users/Category')//owner
const Restaurants = () => import('../views/Users/Restaurants')//owner
const Meals = () => import('../views/Users/Meals')//owner 
const MealLanguages = () => import('../views/Users/MealLanguages')//owner
const ExtraMeal = () => import('../views/Users/ExtraMeal')//owner
const QR = () => import('../views/Users/QRcodeGenerated')//owner
const Channels = () => import('../views/Channels/Channels')
const Category1 = () => import('../views/Category/Categories')
const SubCategory = () => import('../views/Category/Sub-Categories')
const Latest = () => import('../views/Dashboards/Latest')
const Albums = () => import('../views/Dashboards/Albums')
const MusicPlayer = () => import('../views/MusicPlayer/MusicPlayer')
/* Authentic View */
const SignIn = () => import('../views/AuthPages/Default/SignIn')
const SignUp = () => import('../views/AuthPages/Default/SignUp')
const RecoverPassword1 = () => import('../views/AuthPages/Default/RecoverPassword1')
const LockScreen1 = () => import('../views/AuthPages/Default/LockScreen1')
const ConfirmMail1 = () => import('../views/AuthPages/Default/ConfirmMail1')
const TablesBasic = () => import('../views/Dashboards/TablesBasic')
const EditableTable = () => import('../views/Dashboards/EditableTable')
/* Settings */
const AccountSettings = () => import('../views/Settings/AccountSettings')
const PrivacySettings = () => import('../views/Settings/PrivacySettings')
/* Videos */
const Video = () => import('../views/Videos/Videos')
const Movies = () => import('../views/Videos/Movies')
const Series = () => import('../views/Videos/Series')
const PendingVideo = () => import('../views/Videos/PendingVideos')
const PendingMovies = () => import('../views/Videos/PendingMovies')
const Serie = () => import('../views/Videos/Serie')
const Seasons = () => import('../views/Videos/Seasons')
const Eposieds = () => import('../views/Videos/Eposieds')
// upload
const VideoUpload = () => import('../views/upload/uploadVideo.vue')
const MovieUpload = () => import('../views/upload/uploadMovie.vue')
const SeriesUpload = () => import('../views/upload/uploadSeries.vue')
const UploadSeason = () => import('../views/upload/uploadSeason.vue')
/* Admins */
const AgeRange = () => import('../views/Admins/Age-Range')
const Gender = () => import('../views/Admins/Gender')
const Learning = () => import('../views/Admins/Learning')
const Rules = () => import('../views/Admins/Rules')
const Splash = () => import('../views/Admins/Splash')
/* User View */
const Profile = () => import('../views/User/Profile')
const ProfileEdit = () => import('../views/User/ProfileEdit')
const AddUser = () => import('../views/User/AddUser')
const UserList = () => import('../views/User/UserList')
const UserChannels = () => import('../views/User/UserChannels')

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
  {
    path: 'latest',
    name: prop + '.latest',
    meta: { auth: true, name: 'Latest' },
    component: Latest
  },
  {
    path: 'albums',
    name: prop + '.albums',
    meta: { auth: true, name: 'Albums' },
    component: Albums
  },
  {
    path: 'editableTable',
    name: prop + '.editableTable',
    meta: { auth: true, name: 'EditableTable' },
    component: EditableTable
  },
  {
    path: 'tablesBasic',
    name: prop + '.tablesBasic',
    meta: { auth: true, name: 'TablesBasic' },
    component: TablesBasic
  },
  {
    path: 'music-player',
    name: 'music.player',
    meta: { auth: true, name: 'Music Player' },
    component: MusicPlayer
  },
  {
    path: '/account-setting',
    name: 'account-setting',
    component: AccountSettings,
    meta: { auth: true, name: 'Account Settings' }
  },
  {
    path: '/privacy-setting',
    name: 'privacy-setting',
    component: PrivacySettings,
    meta: { auth: true, name: 'Privacy Settings' }
  },
  {
    path: 'all-categories',
    name: prop + '.all-categories',
    // meta: { auth: true, name: 'Categories' },
    component: Category1,
    beforeEnter: (to, from, next) => {
      if (parseJwt(localStorage.getItem('access_token')).user_id === 1) {
        next()
      } else {
        next({ path: '/home-1' })
      }
    }
  },
  {
    path: 'all-sub-categories',
    name: prop + '.all-sub-categories',
    // meta: { auth: true, name: 'Sub-Categories' },
    component: SubCategory,
    beforeEnter: (to, from, next) => {
      if (parseJwt(localStorage.getItem('access_token')).user_id === 1) {
        next()
      } else {
        next({ path: '/home-1' })
      }
    }
  },
  {
    path: 'reels',
    name: prop + '.reels',
    meta: { auth: true, name: 'Reels' },
    component: Reels
  },
  {
    path: 'channels',
    name: prop + '.channels',
    meta: { auth: true, name: 'Channels' },
    component: Channels
  },
  {
    path: 'users',
    name: prop + '.users',
    meta: { auth: true, name: 'Users' },
    component: Users//
  },
  {
    path: 'category/:id',
    name: prop + '.category',
    meta: { auth: true, name: 'Category' },
    component: Category
  },
  {
    path: 'restaurant',
    name: prop + '.restaurant',
    meta: { auth: true, name: 'Restaurants' },
    component: Restaurants
  },
  {
    path: 'meals',
    name: prop + '.meals',
    meta: { auth: true, name: 'Meals' },
    component: Meals
  },
  {
    path: 'meal/:id',
    name: prop + '.meal',
    meta: { auth: true, name: 'MealLanguages' },
    component: MealLanguages
  },
  {
    path: 'extra/meal/:id',
    name: prop + '.extraMeal',
    meta: { auth: true, name: 'ExtraMeal' },
    component: ExtraMeal
  },
  {
    path: 'generate/QR',
    name: prop + '.QR',
    meta: { auth: true, name: 'QR' },
    component: QR
  },
  {
    path: 'categories',
    name: prop + '.categories',
    meta: { auth: true, name: 'Categories' },
    component: Categories
  }
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
const userChildRoute = (prop) => [
  {
    path: 'profile',
    name: prop + '.profile',
    meta: { auth: true, name: 'Profile' },
    component: Profile
  },
  {
    path: 'profile-edit',
    name: prop + '.edit',
    meta: { auth: true, name: 'Edit Profile' },
    component: ProfileEdit
  },
  {
    path: 'add-user',
    name: prop + '.add',
    meta: { auth: true, name: 'Add Profile' },
    component: AddUser
  },
  {
    path: 'user-list',
    name: prop + '.list',
    meta: { auth: true, name: 'User List' },
    component: UserList
  },
  {
    path: 'user-channels/:id',
    name: prop + '.channels',
    meta: { auth: true, name: 'User channels' },
    component: UserChannels
  }
]
const videoChildRoute = (prop) => [
  {
    path: 'list-videos',
    name: prop + '.list-videos',
    meta: { auth: true, name: 'Videos' },
    component: Video
  },
  {
    path: 'list-videos-pending',
    name: prop + '.list-videos-pending',
    meta: { auth: true, name: 'PendingVideos' },
    component: PendingVideo
  },
  {
    path: 'list-movies',
    name: prop + '.list-movies',
    meta: { auth: true, name: 'Movies' },
    component: Movies
  },
  {
    path: 'list-movies-pending',
    name: prop + '.list-movies-pending',
    meta: { auth: true, name: 'PendingMovies' },
    component: PendingMovies
  },
  {
    path: 'list-series',
    name: prop + '.list-series',
    meta: { auth: true, name: 'Series' },
    component: Series
  },
  {
    path: 'list-series/:id',
    name: prop + '.series',
    meta: { auth: true, name: 'Series' },
    component: Serie
  },
  {
    path: 'seasons',
    name: prop + '.seasons',
    meta: { auth: true, name: 'Seasons' },
    component: Seasons
  },
  {
    path: 'eposieds',
    name: prop + '.eposieds',
    meta: { auth: true, name: 'Eposieds' },
    component: Eposieds
  }
]

const uploadChildRoute = (prop) => [
  {
    path: 'video-upload',
    name: prop + '.video-upload',
    meta: { auth: true, name: 'Video-Upload' },
    component: VideoUpload
  },
  {
    path: 'movie-upload',
    name: prop + '.movie-upload',
    meta: { auth: true, name: 'Movie-Upload' },
    component: MovieUpload
  },
  {
    path: 'series-upload',
    name: prop + '.series-upload',
    meta: { auth: true, name: 'Series-Upload' },
    component: SeriesUpload
  },
  {
    path: 'upload-season/:id',
    name: prop + '.upload-season',
    component: UploadSeason
  }
]

const adminsChildRoute = (prop) => [
  {
    path: 'list-age-range',
    name: prop + '.list-age-range',
    // meta: { auth: true, name: 'Admins' },
    component: AgeRange,
    beforeEnter: (to, from, next) => {
      if (parseJwt(localStorage.getItem('access_token')).user_id === 1) {
        next()
      } else {
        next({ path: '/home-1' })
      }
    }
  },
  {
    path: 'list-gender',
    name: prop + '.list-gender',
    // meta: { auth: true, name: 'Admins' },
    component: Gender,
    beforeEnter: (to, from, next) => {
      if (parseJwt(localStorage.getItem('access_token')).user_id === 1) {
        next()
      } else {
        next({ path: '/home-1' })
      }
    }
  },
  {
    path: 'learning',
    name: prop + '.learning',
    // meta: { auth: true, name: 'Admins' },
    component: Learning,
    beforeEnter: (to, from, next) => {
      if (parseJwt(localStorage.getItem('access_token')).user_id === 1) {
        next()
      } else {
        next({ path: '/home-1' })
      }
    }
  },
  {
    path: 'rules',
    name: prop + '.rules',
    // meta: { auth: true, name: 'Admins' },
    component: Rules,
    beforeEnter: (to, from, next) => {
      if (parseJwt(localStorage.getItem('access_token')).user_id === 1) {
        next()
      } else {
        next({ path: '/home-1' })
      }
    }
  },
  {
    path: 'splash',
    name: prop + '.splash',
    // meta: { auth: true, name: 'Admins' },
    component: Splash,
    beforeEnter: (to, from, next) => {
      if (parseJwt(localStorage.getItem('access_token')).user_id === 1) {
        next()
      } else {
        next({ path: '/home-1' })
      }
    }
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
  {
    path: '/video',
    name: 'video',
    component: VerticleLayout,
    meta: { auth: true },
    children: videoChildRoute('video')
  },
  {
    path: '/user',
    name: 'user',
    component: VerticleLayout,
    meta: { auth: true },
    children: userChildRoute('user')
  },
  {
    path: '/admins',
    name: 'admins',
    component: VerticleLayout,
    meta: { auth: true },
    children: adminsChildRoute('admins')
  },
  {
    path: '/upload',
    name: 'upload',
    component: VerticleLayout,
    meta: { auth: true },
    children: uploadChildRoute('upload')
  }
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
