<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-row class="justify-content-between">
          <b-col class="d-flex align-items-center pl-3">
            <button
              type="button"
              class="btn btn-primary add"
              @click="$bvModal.show('generateChannel')"
            >
              Generate Channel
            </button>
          </b-col>
          <b-col md="6" class="d-flex">
            <b-input
              class="mr-3"
              type="search"
              placeholder="Search Items"
              v-model="search"
              @keyup.enter="getAllItems"
            ></b-input>
            <b-form-select
              class="h-100 mr-3"
              id="input-3"
              v-model="searchGender"
              :options="genders"
              required
            ></b-form-select>
            <b-form-select
              class="h-100 mr-3"
              id="input-3"
              v-model="hasUploader"
              :options="filterByUser"
              @change="getAllItems"
              required
            ></b-form-select>
          </b-col>
        </b-row>
        <br />
        <!-- generate channel -->
        <b-modal id="generateChannel" hide-footer>
          <div class="mb-3">
            <label><span style="color: red">* </span> Choose Gender</label>
            <b-form-select
              @change="handelAgeOnChange"
              v-model="formAdd.gender_id"
              :options="genders"
            ></b-form-select>
          </div>
          <div class="mb-3" v-if="isAgeReady">
            <label><span style="color: red">* </span> Choose age</label>
            <b-form-select
              v-model="formAdd.age_range_id"
              :options="ages"
            ></b-form-select>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>User Name</label>
            <b-form-input
              v-model="formAdd.full_name"
              placeholder="Enter User Full Name"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>User Email</label>
            <b-form-input
              v-model="formAdd.email"
              placeholder="Enter User Email"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>User Phone</label>
            <b-form-input
              v-model="formAdd.phone"
              placeholder="Enter Phone"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>User Password</label>
            <b-form-input
              v-model="formAdd.password"
              placeholder="Enter Password"
            ></b-form-input>
          </div>
          <div class="form-group submit-form">
            <button
              type="button"
              class="btn btn-secondary"
              id="close"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              class="btn btn-primary submit-button"
              type="submit"
              @click="generateChannel"
            >
              Submit
            </button>
          </div>
        </b-modal>
        <!-- end of generate channel -->
        <!-- edit channel -->
        <b-modal id="editChannel" hide-footer>
          <div class="mb-3">
            <label><span style="color: red">* </span>Channel Name</label>
            <b-form-input
              v-model="formEdit.full_name"
              placeholder="Enter Phone"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span> Choose Gender</label>
            <b-form-select
              @change="handelAgeOnChangeEdit"
              v-model="formEdit.gender_id"
              :options="genders"
            ></b-form-select>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span> Choose Age</label>
            <b-form-select
              v-model="formEdit.age_range_id"
              :options="ages"
            ></b-form-select>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span> Choose User</label>
            <b-form-select
              v-model="formEdit.user_id"
              :options="users"
            ></b-form-select>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>Image</label>
            <b-form-file
              v-model="formEdit.image"
              :state="Boolean(formEdit.image)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              required
            ></b-form-file>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>Image Cover</label>
            <b-form-file
              v-model="formEdit.cover_image"
              :state="Boolean(formEdit.cover_image)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              required
            ></b-form-file>
          </div>
          <div class="form-group submit-form">
            <button
              type="button"
              class="btn btn-secondary"
              id="close"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              class="btn btn-primary submit-button"
              type="submit"
              @click="updateChannel"
            >
              Submit
            </button>
          </div>
        </b-modal>
        <!-- end of edit channel -->
        <!-- show image modal -->
        <div
          class="modal fade"
          style="margin-top: 10rem"
          id="showImage"
          tabindex="-1"
          role="dialog"
          aria-labelledby="showImageLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <img :src="imageShow" alt />
            </div>
          </div>
        </div>
        <!-- end show image modal -->
        <!-- delete modal -->
        <div
          class="modal fade"
          style="margin-top: 15rem"
          id="deleteAgeRangeModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="deleteAgeRangeModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div>
                <h3 style="text-align: center; margin-bottom: 2rem">
                  هل حقا ترغب في حذف العنصر ؟
                </h3>
                <div class="form-group form-delete">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    id="close-delete"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <b-button
                    variant="outline-danger"
                    class="delete-btn"
                    v-on:click="deleteItem"
                    >delete</b-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end delete modal -->
      </b-col>
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Channels List</h4>
          </template>
          <template v-slot:headerAction>
            <a
              class="text-primary float-right"
              v-b-toggle.collapse-10
              role="button"
            >
              <i class="ri-code-s-slash-line" />
            </a>
          </template>
          <template v-slot:body>
            <b-collapse id="collapse-10" class="mb-2">
              <div class="card">
                <kbd class="bg-dark"></kbd>
              </div>
            </b-collapse>
            <b-table-simple responsive>
              <b-thead>
                <b-th>channel name</b-th>
                <b-th>gender</b-th>
                <b-th>age range</b-th>
                <b-th>user name</b-th>
                <b-th>image profile</b-th>
                <b-th>image cover</b-th>
                <b-th>created at</b-th>
                <b-th>action</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in items" :key="index">
                  <b-td>{{ item.full_name }}</b-td>
                  <b-td>{{ item.gender ? item.gender.type : '-' }}</b-td>
                  <b-td>
                    {{ item.age_range ? item.age_range.age_from : '' }} -
                    {{ item.age_range ? item.age_range.age_to : '' }}
                  </b-td>
                  <b-td>{{ item.user ? item.user.full_name : '-' }}</b-td>
                  <b-td>
                    <img
                      :src="item.imageChannel"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.imageChannel)"
                      alt
                    />
                  </b-td>
                  <b-td>
                    <img
                      :src="item.coverImageChannel"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.coverImageChannel)"
                      alt
                    />
                  </b-td>
                  <b-td>{{ item.created_at }}</b-td>
                  <b-td>
                    <template>
                      <b-button
                        class="custom-btn mr-2"
                        variant=" iq-bg-success"
                        v-on:click="editPopup(item)"
                        size="sm"
                      >
                        <i class="ri-ball-pen-fill m-0"></i>
                      </b-button>
                      <b-button
                        class="custom-btn mr-2"
                        variant=" iq-bg-danger"
                        data-toggle="modal"
                        data-target="#deleteAgeRangeModal"
                        v-on:click="deletePopup(item.id)"
                        data-whatever="@getbootstrap"
                        size="sm"
                      >
                        <i class="ri-delete-bin-line m-0"></i>
                      </b-button>
                    </template>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </template>
          <b-pagination
            style="float: right"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            class="mt-4"
          >
            <template #first-text
              ><span class="text-success">First</span></template
            >
            <template #prev-text
              ><span class="text-danger">Prev</span></template
            >
            <template #next-text
              ><span class="text-warning">Next</span></template
            >
            <template #last-text><span class="text-info">Last</span></template>
            <template #ellipsis-text>
              <b-spinner small type="grow"></b-spinner>
              <b-spinner small type="grow"></b-spinner>
              <b-spinner small type="grow"></b-spinner>
            </template>
            <template #page="{ page, active }">
              <b v-if="active">{{ page }}</b>
              <i v-else>{{ page }}</i>
            </template>
          </b-pagination>
        </iq-card>
      </b-col>
    </b-row>
    <loader v-if="loader" />
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
import Loader from '../../components/core/loader/NewLoader.vue'
export default {
  name: 'AgeRange',
  components: { Loader },
  created () {
    this.getAllItems()
    this.getGenders()
    this.getAges()
    this.getUsers()
  },
  mounted () {
    core.index()
  },
  watch: {
    searchGender () {
      this.getAllItems()
    },
    currentPage: {
      handler: function () {
        this.getAllItems()
      }
    }
  },
  data () {
    return {
      search: '',
      searchGender: '',
      hasUploader: '',
      gendersSearchList: [
        {
          text: 'Search By Gender',
          value: ''
        }
      ],
      filterByUser: [
        {
          text: 'Search by user',
          value: ''
        },
        {
          text: 'Uploader',
          value: 1
        },
        {
          text: 'User',
          value: 0
        }
      ],
      loader: false,
      perPage: 10,
      currentPage: 1,
      rows: 0,
      formAdd: {
        gender_id: null,
        age_range_id: null,
        full_name: null,
        email: null,
        phone: null,
        password: null
      },
      formEdit: {
        id: null,
        full_name: null,
        image: null,
        cover_image: null,
        gender_id: null,
        user_id: null,
        age_range_id: null
      },
      imageShow: '',
      videoShow: '',
      items: [],
      id: null,
      genders: [{ text: 'choose gender', value: '' }],
      ages: [{ text: 'choose age', value: null }],
      users: [{ text: 'choose user', value: null }],
      token: null,
      gender_id: null,
      age_range_id: null,
      isAgeReady: false,
      count: 0
    }
  },
  methods: {
    editPopup (item) {
      this.formEdit = item
      this.loader = true
      this.axios
        .get(`age/range?take=100&filter[gender_id]=${item.gender_id}`)
        .then((res) => {
          res.data.items.forEach((item) => {
            this.ages.push({
              text: `${item.age_from} - ${item.age_to}`,
              value: item.id
            })
            this.loader = false
          })
        })
      this.$bvModal.show('editChannel')
    },
    updateChannel () {
      let data = new FormData()
      if (this.formEdit.full_name) {
        data.append('full_name', this.formEdit.full_name)
      }
      if (this.formEdit.image) {
        data.append('image', this.formEdit.image)
      }
      if (this.formEdit.cover_image) {
        data.append('cover_image', this.formEdit.cover_image)
      }
      if (this.formEdit.gender_id) {
        data.append('gender_id', this.formEdit.gender_id)
      }
      if (this.formEdit.user_id) {
        data.append('user_id', this.formEdit.user_id)
      }
      if (this.formEdit.age_range_id) {
        data.append('age_range_id', this.formEdit.age_range_id)
      }
      data.append('_method', 'PUT')
      this.loader = true
      this.axios.post(`channel/${this.formEdit.id}`, data).then((res) => {
        this.getAllItems()
        this.loader = false
        this.$swal('تم تعديل معلومات القناة بنجاح', '', 'success')
        this.$bvModal.hide('editChannel')
      })
    },
    async generateChannel () {
      if (!this.formAdd.gender_id) {
        this.$swal(' يرجى اختيار الجنس', '', 'error')
        return 400
      }
      if (!this.formAdd.age_range_id) {
        this.$swal('يرجى اختيار العمر', '', 'error')
        return 400
      }
      if (!this.formAdd.full_name) {
        this.$swal('يرجى ادخال اسم المستخدم', '', 'error')
        return 400
      }
      if (!this.formAdd.email) {
        this.$swal('يرجى ادخال البريد الاكتروني', '', 'error')
        return 400
      }
      if (!this.formAdd.phone) {
        this.$swal('يرجى ادخال رقم الهاتف', '', 'error')
        return 400
      }
      if (!this.formAdd.password) {
        this.$swal('يرجى ادخال الرقم السري', '', 'error')
        return 400
      }
      this.loader = true
      await this.getToken()
      if (this.token) {
        await this.specifiedGender()
        await this.specifiedAge()
        await this.createUser()
      }
      if (this.count === 4) {
        this.count = 0
        this.$bvModal.hide('generateChannel')
        this.getAllItems()
        this.getUsers()
        this.getAges()
        this.getGenders()
        this.loader = false
        this.$swal('تم انشاء القناة بنجاح', '', 'success')
      }
    },
    async specifiedGender () {
      let data = new FormData()
      data.append('gender_id', this.formAdd.gender_id)
      await this.axios
        .post(`specified/channel/gender/${this.token}`, data)
        .then(() => {
          this.count++
        })
        .catch(() => {
          this.$swal('حدث خطأ فني يرجى المحاولة لاحقا', '', 'erroe')
        })
    },
    async specifiedAge () {
      let data = new FormData()
      data.append('age_range_id', this.formAdd.age_range_id)
      await this.axios
        .post(`specified/channel/ageRange/${this.token}`, data)
        .then(() => {
          this.count++
        })
        .catch(() => {
          this.$swal('حدث خطأ فني يرجى المحاولة لاحقا', '', 'erroe')
        })
    },
    async createUser () {
      let data = new FormData()
      data.append('full_name', this.formAdd.full_name)
      data.append('email', this.formAdd.email)
      data.append('phone', this.formAdd.phone)
      data.append('password', this.formAdd.password)
      data.append('token', this.token)
      await this.axios
        .post('auth/mobile/account', data)
        .then(() => {
          this.count++
        })
        .catch(() => {
          this.$swal('حدث خطأ فني يرجى المحاولة لاحقا', '', 'erroe')
        })
    },
    async getToken () {
      await this.axios
        .get('mobile/auth/token', {
          headers: {
            authorization: ''
          }
        })
        .then((res) => {
          this.token = res.data.access_token.cookies_token
          this.count++
        })
        .catch(() => {
          this.$swal('حدث خطأ فني يرجى المحاولة لاحقا', '', 'erroe')
        })
    },
    handelAgeOnChange () {
      this.getAges(this.formAdd.gender_id)
      this.isAgeReady = false
    },
    handelAgeOnChangeEdit () {
      this.getAges(this.formEdit.gender_id)
    },
    getGenders () {
      this.axios.get('gender?take=100').then((res) => {
        res.data.items.forEach((item) => {
          this.genders.push({ text: `${item.type}`, value: item.id })
        })
      })
    },
    getUsers () {
      this.axios.get('user?take=10000').then((res) => {
        res.data.items.forEach((item) => {
          this.users.push({
            text: item.full_name,
            value: item.id
          })
        })
      })
    },
    async getAges (id) {
      await this.axios
        .get(`age/range?take=100&filter[gender_id]=${id}`)
        .then((res) => {
          res.data.items.forEach((item) => {
            this.ages.push({
              text: `${item.age_from} - ${item.age_to}`,
              value: item.id
            })
          })
          this.isAgeReady = true
        })
    },
    deletePopup (id) {
      this.id = id
    },
    imageUrl (image) {
      this.imageShow = image
    },
    videoPopup (video) {
      this.videoShow = video
      this.$bvModal.show('videoShow')
    },
    closeDeleteModal () {
      document.getElementById('close-delete').click()
    },
    getAllItems () {
      this.loader = true
      let pageNumber = this.currentPage - 1
      let pageSkip = pageNumber * this.perPage
      this.axios
        .get(
          `channel?take=${this.perPage}&skip=${pageSkip}&filter[has_uploader]=${this.hasUploader}&filter[full_name]=${this.search}&filter[gender_id]=${this.searchGender}`
        )
        .then((res) => {
          this.items = res.data.items
          this.rows = res.data.totalCount
          this.loader = false
        })
        .catch(() => {})
    },
    deleteItem () {
      this.loader = true
      this.axios
        .delete(`channel/${this.id}`)
        .then((res) => {
          this.closeDeleteModal()
          this.getAllItems()
          this.loader = false
        })
        .catch((res) => {
          if (res.response.status === 404) {
            this.$swal('العنصر غير موجود', '', 'error')
          }
          this.$swal('يوجد خلل فني', '', 'error')
        })
    }
  }
}
</script>
<style scoped>
.custom-btn mr-2 {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50% !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-url {
  width: 4rem !important;
  height: 4rem !important;
}
.add {
  margin-bottom: 1rem !important;
}
.submit-button {
  margin: 0.5rem !important;
}
.submit-form {
  float: right;
}
.delete-btn {
  margin-left: 1rem !important;
}
.form-delete {
  margin-left: 11rem;
}
</style>
