<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <button
          type="button"
          style="margin-top:2rem"
          class="btn btn-primary add"
          @click="$bvModal.show('add')"
        >
          Add Slider
        </button>
        <button
          type="button"
          style="margin-top:2rem;margin-left:1rem"
          class="btn btn-primary add"
          @click="addToAll"
        >
          Add All Restaurant 
        </button>
        <br />
        <!-- add Slider -->
        <b-modal id="add" hide-footer>
            <b-col>
              <b-form-group
                id="input-group-3"
                label="Choose Restaurant:"
                label-for="input-3"
              >
                <b-form-select
                  id="input-3"
                  v-model="formAdd.restaurant_id"
                  :options="resturantModels"
                  required
                ></b-form-select>
              </b-form-group>
            </b-col>
            <div class="form-group submit-form">
                <button
                class="btn btn-primary submit-button"
                type="submit"
                @click="create"
                >
                Submit
                </button>
            </div>
        </b-modal>
        <!-- end of add Slider -->
        <!-- edit Slider -->
        <b-modal id="update" hide-footer>
            <b-col>
              <b-form-group
                id="input-group-3"
                label="Choose Restaurant:"
                label-for="input-3"
              >
                <b-form-select
                  id="input-3"
                  v-model="formEdit.restaurant_id"
                  :options="resturantModels"
                  required
                ></b-form-select>
              </b-form-group>
            </b-col>
          <div class="form-group submit-form">
            <button
              class="btn btn-primary submit-button"
              type="submit"
              @click="update"
            >
              Submit
            </button>
          </div>
        </b-modal>
        <!-- end of edit Slider -->
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
          id="deleteModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="deleteModalLabel"
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
        <!-- show video modal -->
        <b-modal id="videoShow">
          <vue-core-video-player :src="videoSource"></vue-core-video-player>
        </b-modal>
        <!-- show video modal -->
        <!-- end delete modal -->
      </b-col>
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Slider List</h4>
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
                <b-th>restaurant</b-th>
                <b-th>created at</b-th>
                <b-th>action</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in items" :key="index">
                  <b-td>{{ item.restaurant.name }}</b-td>
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
                    <template>
                      <b-button
                        class="custom-btn mr-2"
                        variant=" iq-bg-danger"
                        data-toggle="modal"
                        data-target="#deleteModal"
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
          <!-- <b-pagination
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
          </b-pagination> -->
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
    this.checkRule()
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
      logo: '',
      meals: [],
      typeValue:'',
      videoSource:[],
      
      type: [
        {
          text: 'image',
          value: 'image'
        },
        {
          text: 'video',
          value: 'video'
        }
      ],
      resturantModels: [],
      videoShow: '',
      fileUrl: '',
      checkUserUid: '',
      checkUserRule: '',
      loader: false,
      rows: 0,
      formAdd:[],
      formEdit: [],
      formEditRestaurant: [],
      imageShow: '',
      restaurantUid: null,
      restaurant_ID: null,
      items: [],
      rules: [{ text: 'Choose user rule', value: null }],
      id: null,
    }
  },
  methods: {
    checkRule(){
      this.checkUserRule = this.$jwt.decode(
        localStorage.getItem('access_token')
      ).user_name
      this.checkUserUid = this.$jwt.decode(
        localStorage.getItem('access_token')
      ).uid
      this.restaurant_ID = this.$jwt.decode(
        localStorage.getItem('access_token')
      ).restaurant_id
      if(this.checkUserRule === 'admin' && this.checkUserUid === null){
        this.$router.push({ name: 'dashboard.home-1' })
      }
    },
    deletePopup (id) {
      this.id = id
    },
    videoPopup (video) {
      console.log(video)
      this.videoSource = []
      this.videoSource.push({
              src: video,
            })
          this.$bvModal.show('videoShow')
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
        data.append('restaurant_id', this.formAdd.restaurant_id)
        data.append('slider_id', this.$route.params.id)
        this.loader = true
        await this.axios
          .post('resturantSlider', data)
          .then(() => {
            this.getAllItems()
            this.loader = false
            this.$swal('تم اضافة المستخدم بنجاح', '', 'success')
          })
          .catch(() => {
            this.loader = false
            this.$swal('حدث خطأ فني يرجى المحاولة لاحقا', '', 'erroe')
          })
      }
    },
    addToAll () {
      let data = new FormData()
        data.append('slider_id', this.$route.params.id)
        this.loader = true
        this.axios
          .post('add/all/restaurant/slider', data)
          .then(() => {
            this.getAllItems()
            this.loader = false
          })
          .catch(() => {
            this.loader = false
          })
    },
    async update () {
      let data = new FormData()
      this.editValidater()
      Object.keys(this.formEditRestaurant).forEach((key) => {
        if (this.formEditRestaurant[key] || this.formEditRestaurant[key] !== '') {
          data.append(key, this.formEditRestaurant[key])
        }
      })
        data.append('slider_id', this.$route.params.id)
        data.append('_method', 'PUT')
        this.loader = true
        await this.axios
            .post(`resturantSlider/${this.formEdit.id}`, data)
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
      this.loader = true 
      this.axios
        .get(
          `all/restaurant/slider/${this.$route.params.id}?take=10`
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
    getRestaurants () {
      this.axios
        .get(
          `restaurant?take=1000&skip=0`
        )
        .then((res) => {
          res.data.items.forEach((item) => {
            this.resturantModels.push({ text: item.name, value: item.id })
          })
        })
        .catch(() => {})
    },
    getMeals () {
      this.axios
        .get(
          `meal?take=1000&skip=0`
        )
        .then((res) => {
          res.data.items.forEach((item) => {
            this.meals.push({ text: item.lang_body.title, value: item.id })
          })
        })
        .catch(() => {})
    },
    deleteItem () {
      this.loader = true
      this.axios
        .delete(`resturantSlider/${this.id}`)
        .then((res) => {
          this.getAllItems()
          this.closeDeleteModal()
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
      if (!this.formAdd.restaurant_id) {
        dataError.status = 400
        dataError.message = 'يرجى اختيار المطعم '
        return dataError
      }
      dataError.status = 200
      dataError.message = 'success'
      return dataError
    },
    editValidater () {
      if (this.formEdit.restaurant_id) {
        this.formEditRestaurant.restaurant_id = this.formEdit.restaurant_id
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
