<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-row class="justify-content-between">
          <b-col class="d-flex align-items-center pl-3">
            <button
              type="button"
              class="btn btn-primary add"
              data-toggle="modal"
              data-target="#addMovieModal"
              data-whatever="@getbootstrap"
              @click="goTo('upload.series-upload')"
            >
              Add +
            </button>
          </b-col>
          <b-col md="6" class="d-flex">
            <b-input
              class="mr-3"
              type="search"
              placeholder="Search Items"
              v-model="search"
              @keyup.enter="getAllMovie"
            ></b-input>
          </b-col>
        </b-row>
        <br />
        <!-- show image modal -->
        <div
          class="modal fade"
          style="margin-top: 4rem"
          id="showImage"
          tabindex="-1"
          role="dialog"
          aria-labelledby="showImageLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content" style="height: 645px">
              <img :src="imageShow" alt />
            </div>
          </div>
        </div>
        <!-- end show image modal -->
        <!-- edit Movie modal -->
        <div
          class="modal fade"
          id="editMovieModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="editMovieModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content" style="padding: 1rem">
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
              <div class="modal-body">
                <form action="#">
                  <div class="form-row">
                    <div class="col-md-12 mb-12">
                      <label for="validationDefault01"
                        ><span style="color: red">* </span> Title</label
                      >
                      <input
                        type="text"
                        v-model="formEdit.title"
                        class="form-control"
                        id="validationDefault01"
                        required
                      />
                    </div>
                    <div class="col-md-12 mb-12">
                      <label for="validationDefault02"
                        ><span style="color: red">* </span> Details</label
                      >
                      <input
                        type="text"
                        v-model="formEdit.details"
                        class="form-control"
                        id="validationDefault02"
                        required
                      />
                    </div>
                    <label> Image poster</label>
                    <div class="custom-file">
                      <b-form-file
                        v-model="formEdit.image_poster"
                        :state="Boolean(formEdit.image_poster)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        value=""
                      ></b-form-file>
                      <label class="custom-file-label" for="validatedCustomFile"
                        >Choose image poster...</label
                      >
                    </div>
                    <label> Image mobile</label>
                    <div class="custom-file">
                      <b-form-file
                        v-model="formEdit.image_mobile"
                        :state="Boolean(formEdit.image_mobile)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        value=""
                      ></b-form-file>
                      <label class="custom-file-label" for="validatedCustomFile"
                        >Choose image mobile...</label
                      >
                    </div>
                  </div>
                  <div class="form-group submit-form">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      id="close-edit"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      class="btn btn-primary submit-button"
                      type="submit"
                      v-on:click="editMovies"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!--end edit Movie modal -->
        <!-- delete modal -->
        <div
          class="modal fade"
          style="margin-top: 15rem"
          id="deleteMovieModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="deleteMovieModalLabel"
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
                    v-on:click="deleteMovie"
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
            <h4 class="card-title">Series</h4>
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
                <b-th>title</b-th>
                <b-th>uploader</b-th>
                <b-th>image mobile</b-th>
                <b-th>image poster</b-th>
                <b-th>created date</b-th>
                <b-th>updated date</b-th>
                <b-th>Action feiled</b-th>
                <b-th>total downloads</b-th>
                <b-th>total views</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in items" :key="index">
                  <b-td>
                    <router-link
                      :to="{ name: 'video.series', params: { id: item.id } }"
                    >
                      {{ item.title }}
                    </router-link>
                  </b-td>
                  <b-td>{{ item.user.full_name }}</b-td>
                  <b-td>
                    <img
                      :src="item.imageMobiles"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.imageMobiles)"
                      alt
                    />
                  </b-td>
                  <b-td>
                    <img
                      :src="item.imagePosters"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.imagePosters)"
                      alt
                    />
                  </b-td>
                  <b-td>{{ item.created_at }}</b-td>
                  <b-td>{{ item.updated_at }}</b-td>
                  <b-td>
                    <template>
                      <b-button
                        class="mr-2"
                        variant=" iq-bg-success"
                        size="sm"
                        v-show="item.status === 0"
                        @click="approve(item.id)"
                      >
                        Approve
                      </b-button>
                      <b-button
                        class="mr-2"
                        variant=" iq-bg-danger"
                        size="sm"
                        v-show="item.status === 1"
                        @click="approve(item.id)"
                      >
                        Unapprove
                      </b-button>
                      <b-button
                        class="custom-btn mr-2"
                        variant=" iq-bg-success"
                        data-toggle="modal"
                        data-target="#editMovieModal"
                        data-whatever="@getbootstrap"
                        v-on:click="editPopup(item)"
                        size="sm"
                      >
                        <i class="ri-ball-pen-fill m-0"></i>
                      </b-button>
                      <b-button
                        class="custom-btn mr-2"
                        variant=" iq-bg-danger"
                        data-toggle="modal"
                        data-target="#deleteMovieModal"
                        v-on:click="deletePopup(item.id)"
                        data-whatever="@getbootstrap"
                        size="sm"
                      >
                        <i class="ri-delete-bin-line m-0"></i>
                      </b-button>
                    </template>
                  </b-td>
                  <b-td>{{ item.total_downloads }}</b-td>
                  <b-td>{{ item.total_views }}</b-td>
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
  name: 'Series',
  components: { Loader },
  mounted () {
    core.index()
    this.getAllMovie()
  },
  watch: {
    currentPage: {
      handler: function () {
        this.getAllMovie()
      }
    }
  },
  data () {
    return {
      search: '',
      loader: false,
      imageShow: '',
      rows: 0,
      perPage: 10,
      currentPage: 1,
      message: '',
      hidsModal: null,
      chackFile: false,
      MovieId: null,
      items: [],
      subcategories: [],
      genders: [],
      ageRanges: [],
      formAdd: [],
      formEdit: []
    }
  },
  methods: {
    approve (id) {
      this.loading = true
      this.axios
        .get(`approve/series/${id}`)
        .then((res) => {
          this.loading = false
          this.getAllMovie()
        })
        .catch((err) => {
          this.loading = false
          if (err.response.data.error === 'this series don`t have episode') {
            this.$swal(
              'لا يمكن القبول',
              'هذه المسلسلة لا تحتوي على حلقات',
              'error'
            )
          } else if (
            err.response.data.error ===
            'this series don`t have episode and season'
          ) {
            this.$swal(
              'لا يمكن القبول',
              'هذه المسلسلة لا تحتوي على مواسم',
              'error'
            )
          } else {
            this.$swal('حدث خطأ في الاتصال', '', 'error')
          }
        })
    },
    goTo (path) {
      this.$router.push({ name: path })
    },
    editPopup (item) {
      this.formEdit = item
    },
    deletePopup (id) {
      this.MovieId = id
      console.log(id)
    },
    imageUrl (image) {
      this.imageShow = image
    },
    closeModal () {
      document.getElementById('close').click()
    },
    closeEditModal () {
      document.getElementById('close-edit').click()
    },
    closeDeleteModal () {
      document.getElementById('close-delete').click()
    },
    getAllSubCategory () {
      this.axios
        .get('subcategory?take=1000')
        .then((res) => {
          this.subcategories = res.data.items
        })
        .catch(() => {})
    },
    editMovies () {
      this.loader = true
      var formData = new FormData()
      formData.append('title', this.formEdit.title)
      formData.append('details', this.formEdit.details)
      formData.append('subcategory_id', this.formEdit.subcategory_id)
      if (this.formEdit.image_poster) {
        formData.append('image_poster', this.formEdit.image_poster)
      }
      if (this.formEdit.image_mobile) {
        formData.append('image_mobile', this.formEdit.image_mobile)
      }
      formData.append('_method', 'PUT')
      console.log(this.formEdit.subcategory_id)
      this.axios
        .post(`movie/${this.formEdit.id}`, formData)
        .then(() => {
          this.closeEditModal()
          this.getAllMovie()
          this.loader = false
          this.$swal('تم التعديل بنجاح', '', 'Success')
        })
        .catch((res) => {
          this.$swal('يرجى ملئ المعلومات', '', 'error')
        })
    },
    getAllMovie () {
      this.loader = true
      let pageNumber = this.currentPage - 1
      let pageSkip = pageNumber * this.perPage
      this.axios
        .get(
          `movie?take=${this.perPage}&skip=${pageSkip}&filter[subcategory_id]=6&filter[title]=${this.search}`
        )
        .then((res) => {
          this.items = res.data.items
          this.rows = res.data.totalCount
          this.loader = false
        })
    },
    deleteMovie () {
      this.loader = true
      this.axios
        .delete(`movie/${this.MovieId}`)
        .then((res) => {
          this.closeDeleteModal()
          this.getAllMovie()
          this.loader = false
        })
        .catch((res) => {
          if (res.response.status === 404) {
            this.$swal('العنصر غير موجود', '', 'error')
            return ''
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
