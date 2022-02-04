<template>
  <div class="wrapper">
    <!-- Sidebar -->
    <nav id="sidebar">
      <ul
        class="list-unstyled components"
        style="height: 41rem; background: white"
      >
        <li aria-expanded="false">
          <router-link exact :to="{ name: 'dashboard.home-1' }" class="d-flex">
            <i class="fas fa-suitcase iq-arrow-left icon-block"></i>
            <a class="a-font" href="#">Dashboard</a>
          </router-link>
        </li>
        <!-- videos -->
        <!-- <li class="active">
          <a
            href="#homeSubmenu"
            data-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >
            <div>
              <i class="fas fa-play-circle"></i>
              <span style="padding: 5px 10px">Videos</span>
            </div>
          </a>
          <ul class="collapse list-unstyled" id="homeSubmenu">
            <li aria-expanded="false">
              <router-link
                exact
                :to="{ name: 'video.list-videos' }"
                class="d-flex"
              >
                <i
                  class="fas fa-link icon-block"
                  style="margin-left: 1rem; padding-right: 0.4rem"
                ></i>
                <a class="a-font" href="#">Videos</a>
              </router-link>
            </li>
            <li aria-expanded="false">
              <router-link
                exact
                :to="{ name: 'video.list-videos-pending' }"
                class="d-flex"
              >
                <i
                  class="fas fa-link icon-block"
                  style="margin-left: 1rem; padding-right: 0.4rem"
                ></i>
                <a class="a-font" href="#">Pending Videos</a>
              </router-link>
            </li>
          </ul>
        </li> -->
        <!-- end of movies -->
        <!-- movies -->
        <!-- <li class="active">
          <a
            href="#moviesSubmenu"
            data-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >
            <div>
              <i class="fas fa-video"></i>
              <span style="padding: 5px 10px">Movies</span>
            </div>
          </a>
          <ul class="collapse list-unstyled" id="moviesSubmenu">
            <li aria-expanded="false">
              <router-link
                exact
                :to="{ name: 'video.list-movies' }"
                class="d-flex"
              >
                <i
                  class="fas fa-link icon-block"
                  style="margin-left: 1rem; padding-right: 0.4rem"
                ></i>
                <a class="a-font" href="#">Movies</a>
              </router-link>
            </li>
            <li aria-expanded="false">
              <router-link
                exact
                :to="{ name: 'video.list-movies-pending' }"
                class="d-flex"
              >
                <i
                  class="fas fa-link icon-block"
                  style="margin-left: 1rem; padding-right: 0.4rem"
                ></i>
                <a class="a-font" href="#">Pending Movies</a>
              </router-link>
            </li>
          </ul>
        </li> -->
        <!-- end of movies -->
        <!-- series -->
        <!-- <li class="active">
          <a
            href="#seriesSubmenu"
            data-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >
            <div>
              <i class="fas fa-film"></i>
              <span style="padding: 5px 10px">Series</span>
            </div>
          </a>
          <ul class="collapse list-unstyled" id="seriesSubmenu">
            <li aria-expanded="false">
              <router-link
                exact
                :to="{ name: 'video.list-series' }"
                class="d-flex"
              >
                <i
                  class="fas fa-link icon-block"
                  style="margin-left: 1rem; padding-right: 0.4rem"
                ></i>
                <a class="a-font" href="#">Series</a>
              </router-link>
            </li>
            <li aria-expanded="false">
              <router-link exact :to="{ name: 'video.seasons' }" class="d-flex">
                <i
                  class="fas fa-link icon-block"
                  style="margin-left: 1rem; padding-right: 0.4rem"
                ></i>
                <a class="a-font" href="#">Seasons</a>
              </router-link>
            </li>
            <li aria-expanded="false">
              <router-link
                exact
                :to="{ name: 'video.eposieds' }"
                class="d-flex"
              >
                <i
                  class="fas fa-link icon-block"
                  style="margin-left: 1rem; padding-right: 0.4rem"
                ></i>
                <a class="a-font" href="#">Eposieds</a>
              </router-link>
            </li>
          </ul>
        </li> -->
        <!-- end of series -->
        <!-- <li v-if="rule_id && rule_id === 1">
          <a
            href="#pageSubmenu"
            data-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >
            <div>
              <i class="fas fa-user-shield"></i>
              <span style="padding: 5px 10px">Admins</span>
            </div>
          </a>
          <ul class="collapse list-unstyled" id="pageSubmenu">
            <li aria-expanded="false">
              <router-link
                exact
                :to="{ name: 'dashboard.all-categories' }"
                class="d-flex"
              >
                <i
                  class="fas fa-layer-group iq-arrow-left icon-block"
                  style="margin-left: 1rem; padding-right: 0.4rem"
                ></i>
                <a class="a-font" href="#">Category</a>
              </router-link>
            </li>
            <li aria-expanded="false">
              <router-link
                exact
                :to="{ name: 'dashboard.all-sub-categories' }"
                class="d-flex"
              >
                <i
                  class="fas fa-layer-group iq-arrow-left icon-block"
                  style="margin-left: 1rem; padding-right: 0.4rem"
                ></i>
                <a class="a-font" href="#">Sub-Category</a>
              </router-link>
            </li>
            <li aria-expanded="false">
              <router-link
                exact
                :to="{ name: 'admins.list-age-range' }"
                class="d-flex"
              >
                <i
                  class="fas fa-link icon-block"
                  style="margin-left: 1rem; padding-right: 0.4rem"
                ></i>
                <a class="a-font" href="#">Age-Range</a>
              </router-link>
            </li>
            <li aria-expanded="false">
              <router-link
                exact
                :to="{ name: 'admins.list-gender' }"
                class="d-flex"
              >
                <i
                  class="fas fa-link icon-block"
                  style="margin-left: 1rem; padding-right: 0.4rem"
                ></i>
                <a class="a-font" href="#">Gender</a>
              </router-link>
            </li>
            <li aria-expanded="false">
              <router-link
                exact
                :to="{ name: 'admins.learning' }"
                class="d-flex"
              >
                <i
                  class="fas fa-link icon-block"
                  style="margin-left: 1rem; padding-right: 0.4rem"
                ></i>
                <a class="a-font" href="#">Learn Category</a>
              </router-link>
            </li>
            <li aria-expanded="false">
              <router-link exact :to="{ name: 'admins.rules' }" class="d-flex">
                <i
                  class="fas fa-link icon-block"
                  style="margin-left: 1rem; padding-right: 0.4rem"
                ></i>
                <a class="a-font" href="#">Rules</a>
              </router-link>
            </li>
            <li aria-expanded="false">
              <router-link exact :to="{ name: 'admins.splash' }" class="d-flex">
                <i
                  class="fas fa-link icon-block"
                  style="margin-left: 1rem; padding-right: 0.4rem"
                ></i>
                <a class="a-font" href="#">Splash</a>
              </router-link>
            </li>
          </ul>
        </li> -->
        <!-- <li aria-expanded="false">
          <router-link
            exact
            :to="{ name: 'dashboard.channels' }"
            class="d-flex"
          >
            <i class="fab fa-youtube iq-arrow-left icon-block"></i>
            <a class="a-font" href="#">Channels</a>
          </router-link>
        </li> -->
        <li aria-expanded="false">
          <router-link exact :to="{ name: 'dashboard.users' }" class="d-flex">
            <i class="fas fa-user iq-arrow-left icon-block"></i>
            <a class="a-font" href="#">Users</a>
          </router-link>
        </li>
        <li aria-expanded="false">
          <router-link exact :to="{ name: 'dashboard.meals' }" class="d-flex">
            <i class="fas fa-user iq-arrow-left icon-block"></i>
            <a class="a-font" href="#">Meals</a>
          </router-link>
        </li>
        <li aria-expanded="false">
          <router-link exact :to="{ name: 'dashboard.restaurant' }" class="d-flex">
            <i class="fas fa-user iq-arrow-left icon-block"></i>
            <a class="a-font" href="#">Restaurant</a>
          </router-link>
        </li>
        <li aria-expanded="false">
          <router-link exact :to="{ name: 'dashboard.categories' }" class="d-flex">
            <i class="fas fa-user iq-arrow-left icon-block"></i>
            <a class="a-font" href="#">Categories</a>
          </router-link>
        </li>
        <!-- <li aria-expanded="false">
          <router-link exact :to="{ name: 'dashboard.reels' }" class="d-flex">
            <i class="fas fa-camera-retro iq-arrow-left icon-block"></i>
            <a class="a-font" href="#">Reels</a>
          </router-link>
        </li> -->
        <!-- <li aria-expanded="false">
          <router-link exact :to="{ name: 'user.list' }" class="d-flex">
            <i class="fas fa-user icon-block"></i>
            <a class="a-font" href="#">User List</a>
          </router-link>
        </li> -->
        <li aria-expanded="false">
          <router-link exact :to="{ name: 'auth1.sign-in1' }" class="d-flex">
            <i class="fas fa-sign-out-alt icon-block"></i>
            <a class="a-font" href="#">Logout</a>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
// import List from './CollapseMenu'
import { core } from '../../../config/pluginInit'
export default {
  name: 'Videos',
  props: {
    items: Array,
    className: { type: String, default: 'iq-menu' },
    open: { type: Boolean, default: false },
    idName: { type: String, default: 'sidebar' },
    accordianName: { type: String, default: 'sidebar' },
    sidebarGroupTitle: { type: Boolean, default: true }
  },
  data () {
    return {
      rule_id: null,
      itemsd: [
        {
          class_name: '',
          icon: 'las la-house-damage',
          is_active: false,
          is_heading: false,
          is_icon_class: true,
          link: {
            name: 'auth.sign-in1'
          },
          name: 'sidebar.dashboard1',
          title: 'sidebar'
        }
      ]
    }
  },
  components: {
    // List
  },
  computed: {
    hideListMenuTitle () {
      return this.sidebarGroupTitle
    }
  },
  mounted () {
    this.rule_id = this.$jwt.decode(
      localStorage.getItem('access_token')
    ).user_id
  },
  methods: {
    activeLink (item) {
      return core.getActiveLink(item, this.$route.name)
    }
  }
}
</script>
<style scoped>
p {
  font-family: 'Poppins', sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: rgb(109, 235, 240);
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

#sidebar {
  /* don't forget to add all the previously mentioned styles here too */
  background: #f4f4f4;
  color: #525666;
  transition: all 1.3s;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: #515566;
}

#sidebar ul.components {
  padding: 20px 0;
}

#sidebar ul p {
  /* color: rgb(95, 81, 81); */
  padding: 10px;
}
.a-font {
  font-size: 1rem !important;
  padding: 0;
}
#sidebar ul li a {
  padding: 5px 10px;
  font-size: 1.1em;
  display: flex;
  align-items: center;
  color: #333;
}
#sidebar ul li a i {
  color: var(--iq-primary);
}
#sidebar ul li a:hover {
  color: rgb(85, 70, 70);
  background: #e0c9c1;
}

/* #sidebar ul li.active > a, a[aria-expanded="true"] {
    color: rgb(18, 16, 22);
    background: #e0c9c1;
} */
ul ul a {
  font-size: 0.9em !important;
  background: #b8afac;
}
.dropdown-toggle i {
  /* margin-right: 1rem; */
  color: var(--iq-primary-hover);
}
.dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
}
.icon-block {
  font-size: 1rem;
}
</style>
