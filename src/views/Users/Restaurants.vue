<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-row class="justify-content-between">
          <b-col md="6" class="d-flex">
            <b-input
              class="mr-3"
              type="search"
              placeholder="Search Items By Name"
              v-model="searchByName"
              @keyup.enter="getAllItems"
            ></b-input>
            <b-input
              class="mr-3"
              type="search"
              placeholder="Search Items By Details"
              v-model="searchByDetails"
              @keyup.enter="getAllItems"
            ></b-input>
          </b-col>
        </b-row>
        <button
          type="button"
          style="margin-top:2rem"
          class="btn btn-primary add"
          @click="$bvModal.show('add')"
        >
          Add Restaurant
        </button>
        <br />
        <!-- add restaurant -->
        <b-modal id="add" hide-footer>
            <div class="mb-3">
            <label><span style="color: red">* </span>Name</label>
            <b-form-input
            v-model="formAdd.name"
            placeholder="Enter Name"
            ></b-form-input>
            </div>
            <div class="mb-3">
            <label><span style="color: red">* </span>details</label>
            <b-form-input
                v-model="formAdd.details"
                placeholder="Enter Details"
            ></b-form-input>
            </div>
            <div class="mb-3">
            <label><span style="color: red">* </span>Logo</label>
            <b-form-file
            v-model="formAdd.logo"
            :state="Boolean(formAdd.logo)"
            placeholder="Choose a logo or drop it here..."
            drop-placeholder="Drop logo here..."
            ></b-form-file>
            </div>
            <div class="form-group submit-form">
            <button
            type="button"
            class="btn btn-secondary"
            id="close"
            @click="$bvModal.hide('add')"
            data-dismiss="modal"
            >
            Close
            </button>
            <button
            class="btn btn-primary submit-button"
            type="submit"
            @click="create"
            >
              Submit
            </button>
          </div>
        </b-modal>
        <!-- end of add restaurant -->
        <!-- edit restaurant -->
        <b-modal id="update" hide-footer>
          <div class="mb-3">
            <label><span style="color: red">* </span>Name</label>
            <b-form-input
              v-model="formEdit.name"
              placeholder="Enter Name"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>details</label>
            <b-form-input
              v-model="formEdit.details"
              placeholder="Enter Details"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>Logo</label>
            <b-form-file
              v-model="logo"
              :state="Boolean(logo)"
              placeholder="Choose a logo or drop it here..."
              drop-placeholder="Drop logo here..."
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
              @click="update"
            >
              Submit
            </button>
          </div>
        </b-modal>
        <!-- end of edit restaurant -->
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
            <h4 class="card-title">Restaurants List</h4>
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
                <b-th>name</b-th>
                <b-th>details</b-th>
                <b-th>logo</b-th>
                <b-th>created at</b-th>
                <b-th>action</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in items" :key="index">
                  <b-td>{{ item.name }}</b-td>
                  <b-td>{{ item.details }}</b-td>
                  <b-td>
                    <img
                      :src="'http://localhost:8000/storage/' + item.logo"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.logo)"
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
      logo: '',
      searchByName: '',
      searchByDetails: '',
      loader: false,
      perPage: 10,
      currentPage: 1,
      rows: 0,
      formAdd:[],
      formEdit: [],
      formEditRestaurant: [],
      imageShow: '',
      videoShow: '',
      items: [],
      rules: [{ text: 'Choose user rule', value: null }],
      id: null,
      genders: [{ text: 'choose gender', value: null }],
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
    editPopup (item) {
      this.formEdit = item
      this.$bvModal.show('update')
    },
    async create () {
      let data = new FormData()
      if (this.addValidater().status === 400) {
        this.$swal('خطأ في الادخال', this.addValidater().message, 'error')
      } else {
        data.append('name', this.formAdd.name)
        data.append('details', this.formAdd.details)
        data.append('logo', this.formAdd.logo)
        this.loader = true
        await this.axios
          .post('restaurant', data)
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
    async update () {
    //   this.loader = true
      let data = new FormData()
      this.editValidater()
      Object.keys(this.formEditRestaurant).forEach((key) => {
        if (this.formEditRestaurant[key] || this.formEditRestaurant[key] !== '') {
          data.append(key, this.formEditRestaurant[key])
        }
      })
      if(this.logo){
        data.append('logo', this.logo)
      }
      data.append('_method', 'PUT')
      await this.axios
        .post(`restaurant/${this.formEdit.id}`, data)
        .then(() => {
          this.getAllItems()
          this.$bvModal.hide('update')
          this.loader = false
          this.$swal('تم تعديل معلومات المستخدم بنجاح', '', 'success')
        })
        .catch(() => {
          this.loader = false
          this.$swal('حدث خطأ فني يرجى المحاولة لاحقا', '', 'erorr')
        })
    },
    getAllItems () {
      let pageNumber = this.currentPage - 1
      let pageSkip = pageNumber * this.perPage
      this.axios
        .get(
          `restaurant?take=${this.perPage}&skip=${pageSkip}&filter[name]=${this.searchByName}&filter[details]=${this.searchByDetails}`
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
        .delete(`restaurant/${this.id}`)
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
    },
    addValidater () {
      let dataError = {
        status: null,
        message: ''
      }
      if (!this.formAdd.name) {
        dataError.status = 400
        dataError.message = this.formAdd.name
        return dataError
      }
      if (!this.formAdd.details) {
        dataError.status = 400
        dataError.message = 'يرجى اضافة تفاصيل '
        return dataError
      }
      if (!this.formAdd.logo) {
        dataError.status = 400
        dataError.message = 'يرجى اضافة صورة '
        return dataError
      }
      dataError.status = 200
      dataError.message = 'success'
      return dataError
    },
    editValidater () {
      if (this.formEdit.name) {
        this.formEditRestaurant.name = this.formEdit.name
      }
      if (this.formEdit.details) {
        this.formEditRestaurant.details = this.formEdit.details
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
