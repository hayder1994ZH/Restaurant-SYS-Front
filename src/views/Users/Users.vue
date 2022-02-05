<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-row class="justify-content-between">
          <b-col md="6" class="d-flex">
            <b-input
              class="mr-3"
              type="search"
              placeholder="Search Items By Full Name"
              v-model="search"
              @keyup.enter="getAllItems"
            ></b-input>
            <b-input
              class="mr-3"
              type="search"
              placeholder="Search Items By Username"
              v-model="searchByUsername"
              @keyup.enter="getAllItems"
            ></b-input>
            <b-input
              class="mr-3"
              type="search"
              placeholder="Search Items By Phone"
              v-model="searchByPhone"
              @keyup.enter="getAllItems"
            ></b-input>
          </b-col>
        </b-row>
        <button
          type="button"
          style="margin-top:2rem"
          class="btn btn-primary add"
          @click="$bvModal.show('addUser')"
        >
          Add User
        </button>
        <br />
        <!-- add user -->
        <b-modal id="addUser" hide-footer>
          <div class="mb-3">
            <label><span style="color: red">* </span> Choose Rule</label>
            <b-form-select
              v-model="formAdd.rule_id"
              :options="rules"
            ></b-form-select>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span> Choose Restaurant</label>
            <b-form-select
              v-model="formAdd.restaurant_id"
              :options="restaurants"
            ></b-form-select>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>Full Name</label>
            <b-form-input
              v-model="formAdd.full_name"
              placeholder="Enter User Full Name"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>Username</label>
            <b-form-input
              v-model="formAdd.username"
              placeholder="Enter Username"
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
              type="password"
              v-model="formAdd.password"
              placeholder="Enter Password"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>User Image</label>
            <b-form-file
              v-model="formAdd.image"
              :state="Boolean(formAdd.image)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
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
              @click="createUser"
            >
              Submit
            </button>
          </div>
        </b-modal>
        <!-- end of add user -->
        <!-- edit user -->
        <b-modal id="updateUser" hide-footer>
          <div class="mb-3">
            <label><span style="color: red">* </span> Choose Rule</label>
            <b-form-select
              v-model="formEdit.rule_id"
              :options="rules"
            ></b-form-select>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span> Choose Restaurant</label>
            <b-form-select
              v-model="formEdit.restaurant_id"
              :options="restaurants"
            ></b-form-select>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>Full Name</label>
            <b-form-input
              v-model="formEdit.full_name"
              placeholder="Enter User Full Name"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>Username</label>
            <b-form-input
              v-model="formEdit.username"
              placeholder="Enter Username"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>User Phone</label>
            <b-form-input
              v-model="formEdit.phone"
              placeholder="Enter Phone"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>User Password</label>
            <b-form-input
              type="password"
              v-model="formEdit.password"
              placeholder="Enter Password"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>User Image</label>
            <b-form-file
              v-model="imageUser"
              :state="Boolean(formEdit.image)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
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
              @click="updateUser"
            >
              Submit
            </button>
          </div>
        </b-modal>
        <!-- end of edit user -->
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
            <h4 class="card-title">Users List</h4>
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
                <b-th>full name</b-th>
                <b-th>username</b-th>
                <b-th>phone</b-th>
                <b-th>rule name</b-th>
                <b-th>restaurant name</b-th>
                <b-th>image</b-th>
                <b-th>created at</b-th>
                <b-th>action</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in items" :key="index">
                  <b-td>{{ item.full_name }}</b-td>
                  <b-td>{{ item.username }}</b-td>
                  <b-td>{{ item.phone }}</b-td>
                  <b-td>{{ (item.rules !== null)? item.rules.name: 'don`t have rules' }}</b-td>
                  <b-td>{{ (item.restaurant !== null)? item.restaurant.name: 'don`t have restaurant'}}</b-td>
                  <b-td>
                    <img
                      :src="'http://localhost:8000/storage/' + item.image"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.image)"
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
    this.getRules()
    this.getRestaurants()
  },
  mounted () {
    core.index()
  },
  watch: {
    currentPage: {
      handler: function () {
        this.getAllItems()
      }
    }
  },
  data () {
    return {
      search: '',
      searchByUsername: '',
      searchByPhone: '',
      loader: false,
      perPage: 10,
      currentPage: 1,
      rows: 0,
      formAdd: [],
      formEdit: [],
      formEditUser: [],
      imageUser: '',
      imageShow: '',
      items: [],
      rules: [],
      restaurants: [],
      id: null,
      users: [{ text: 'choose user', value: null }],
      count: 0
    }
  },
  methods: {
    deletePopup (id) {
      this.id = id
    },
    imageUrl (image) {
      this.imageShow = 'http://localhost:8000/storage/' + image
    },
    imageShowTb (image) {
     return this.imageShow = 'http://localhost:8000/storage/' + image
    },
    closeDeleteModal () {
      document.getElementById('close-delete').click()
    },
    getRules () {
      this.axios.get('rule?take=10').then((res) => {
        res.data.items.forEach((rule) => {
          this.rules.push({
            text: rule.name,
            value: rule.id
          })
        })
      })
    },
    getRestaurants () {
      this.axios.get('restaurant?take=10000').then((res) => {
        res.data.items.forEach((restaurant) => {
          this.restaurants.push({
            text: restaurant.name,
            value: restaurant.id
          })
        })
      })
    },
    editPopup (item) {
      this.formEdit = item
      this.$bvModal.show('updateUser')
    },
    async createUser () {
      let data = new FormData()
      if (this.addValidater().status === 400) {
        this.$swal('خطأ في الادخال', this.addValidater().message, 'error')
      } else {
        data.append('full_name', this.formAdd.full_name)
        data.append('username', this.formAdd.username)
        data.append('phone', this.formAdd.phone)
        data.append('password', this.formAdd.password)
        data.append('image', this.formAdd.image)
        data.append('rule_id', this.formAdd.rule_id)
        data.append('restaurant_id', this.formAdd.restaurant_id)
        this.loader = true
        await this.axios
          .post('user', data)
          .then(() => {
            this.getAllItems()
            this.loader = false
            this.$swal('تم اضافة المستخدم بنجاح', '', 'success')
          })
          .catch(() => {
            this.$swal('حدث خطأ فني يرجى المحاولة لاحقا', '', 'erroe')
          })
      }
    },
    async updateUser () {
      let data = new FormData()
      this.editValidater()
      Object.keys(this.formEditUser).forEach((key) => {
        if (this.formEditUser[key] || this.formEditUser[key] !== '') {
          data.append(key, this.formEditUser[key])
        }
      })
      if(this.imageUser){
        data.append('image', this.imageUser)
      }
      data.append('_method', 'PUT')
      this.loader = true
      await this.axios
        .post(`user/${this.formEdit.id}`, data)
        .then(() => {
          this.getAllItems()
          this.$bvModal.hide('updateUser')
          this.imageUser =null
          this.loader = false
          this.$swal('تم تعديل معلومات المستخدم بنجاح', '', 'success')
        })
        .catch(() => {
          this.loader = false
          this.$swal('حدث خطأ فني يرجى المحاولة لاحقا', '', 'erroe')
        })
    },
    getAllItems () {
      this.loader = true
      let pageNumber = this.currentPage - 1
      let pageSkip = pageNumber * this.perPage
      this.axios
        .get(
          `user?take=${this.perPage}&skip=${pageSkip}&filter[full_name]=${this.search}&filter[username]=${this.searchByUsername}&filter[phone]=${this.searchByPhone}`
        )
        .then((res) => {
          this.items = res.data.items
          this.rows = res.data.totalCount
          this.loader = false 
        })
        .catch(() => {
          this.loader = false 
        })
    },
    deleteItem () {
      this.loader = true
      this.axios
        .delete(`user/${this.id}`)
        .then((res) => {
          this.closeDeleteModal()
          this.getAllItems()
          this.loader = false
        })
        .catch((res) => {
          this.loader = false
          if (res.response.status === 404) {
            this.$swal('العنصر غير موجود', '', 'error')
          }
          this.$swal('يوجد خلل فني', '', 'error')
        })
    },
    addValidater () {
      let dataError = {
        status: null,
        message: ''
      }
      if (!this.formAdd.rule_id) {
        dataError.status = 400
        dataError.message = 'يرجى اختيار نوع المستخدم'
        return dataError
      }
      if (!this.formAdd.restaurant_id) {
        dataError.status = 400
        dataError.message = 'يرجى اختيار المطعم'
        return dataError
      }
      if (!this.formAdd.full_name) {
        dataError.status = 400
        dataError.message = 'يرجى اختيار اسم المستخدم'
        return dataError
      }
      if (!this.formAdd.username) {
        dataError.status = 400
        dataError.message = 'يرجى ادخال البريد الالكتروني'
        return dataError
      }
      if (!this.formAdd.phone) {
        dataError.status = 400
        dataError.message = 'يرجى ادخال رقم الهاتف'
        return dataError
      }
      if (!this.formAdd.password) {
        dataError.status = 400
        dataError.message = 'يرجى ادخال الرقم السري'
        return dataError
      }
      dataError.status = 200
      dataError.message = 'success'
      return dataError
    },
    editValidater () {
      if (this.formEdit.rule_id) {
        this.formEditUser.rule_id = this.formEdit.rule_id
      }
      if (this.formEdit.restaurant_id) {
        this.formEditUser.restaurant_id = this.formEdit.restaurant_id
      }
      if (this.formEdit.full_name) {
        this.formEditUser.full_name = this.formEdit.full_name
      }
      if (this.formEdit.username) {
        this.formEditUser.username = this.formEdit.username
      }
      if (this.formEdit.phone) {
         this.formEditUser.phone = this.formEdit.phone
      }
      if (this.formEdit.password) {
        this.formEditUser.password = this.formEdit.password
      }
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
