<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <button
          type="button"
          class="btn btn-primary add"
          @click="$bvModal.show('addGenderModal')"
        >
          Add +
        </button>
        <br />
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
        <!-- add gender v2 -->
        <b-modal id="addGenderModal" hide-footer>
          <div class="mb-3">
            <label><span style="color: red">* </span> Choose Learn Type</label>
            <b-form-select
              v-model="formAdd.type"
              :options="learnOptions"
            ></b-form-select>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span> Title (Apple, One)</label>
            <b-form-input
              v-model="formAdd.title"
              placeholder="Enter title"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>Sub Title (A, 1)</label>
            <b-form-input
              v-model="formAdd.sub_title"
              placeholder="Enter sub title"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>Card Color</label>
            <b-form-input
              v-model="formAdd.color"
              placeholder="Enter color"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>Image</label>
            <b-form-file
              v-model="formAdd.image"
              :state="Boolean(formAdd.image)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              required
            ></b-form-file>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>GIF</label>
            <b-form-file
              v-model="formAdd.gif"
              :state="Boolean(formAdd.gif)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              required
            ></b-form-file>
          </div>
          <div class="mb-5">
            <label><span style="color: red">* </span>Voice</label>
            <b-form-file
              v-model="formAdd.voice"
              :state="Boolean(formAdd.voice)"
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
              @click="addLearn"
            >
              Submit
            </button>
          </div>
        </b-modal>
        <!-- end of add gender v2 -->
        <!-- edit AgeRange modal -->
        <b-modal id="editGenderModal" hide-footer>
          <div class="mb-3">
            <label><span style="color: red">* </span> Choose Learn Type</label>
            <b-form-select
              v-model="formEdit.type"
              :options="learnOptions"
            ></b-form-select>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span> Title (Apple, One)</label>
            <b-form-input
              v-model="formEdit.title"
              placeholder="Enter title"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>Sub Title (A, 1)</label>
            <b-form-input
              v-model="formEdit.sub_title"
              placeholder="Enter sub title"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>Card Color</label>
            <b-form-input
              v-model="formEdit.color"
              placeholder="Enter color"
            ></b-form-input>
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
            <label><span style="color: red">* </span>GIF</label>
            <b-form-file
              v-model="formEdit.gif"
              :state="Boolean(formEdit.gif)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              required
            ></b-form-file>
          </div>
          <div class="mb-5">
            <label><span style="color: red">* </span>Voice</label>
            <b-form-file
              v-model="formEdit.voice"
              :state="Boolean(formEdit.voice)"
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
              @click="editLearn"
            >
              Submit
            </button>
          </div>
        </b-modal>
        <!--end edit AgeRange modal -->
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
                    v-on:click="deleteGender"
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
            <h4 class="card-title">Learning List</h4>
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
                <b-th>sub title</b-th>
                <b-th>type</b-th>
                <b-th>color</b-th>
                <b-th>image</b-th>
                <b-th>gif</b-th>
                <b-th>voice</b-th>
                <b-th>created at</b-th>
                <b-th>actions</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in items" :key="index">
                  <b-td>{{ item.title }}</b-td>
                  <b-td>{{ item.sub_title }}</b-td>
                  <b-td v-if="item.type == 'En_N'">English Numbers</b-td>
                  <b-td v-if="item.type == 'Ar_N'">Arabic Numbers</b-td>
                  <b-td v-if="item.type == 'En_Az'">English Letters</b-td>
                  <b-td v-if="item.type == 'Ar_Az'">Arabic Letters</b-td>
                  <b-td>{{ item.color }}</b-td>
                  <b-td>
                    <img
                      :src="item.imageLearning"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.imageLearning)"
                      alt
                    />
                  </b-td>
                  <b-td>
                    <img
                      :src="item.gifLearning"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.gifLearning)"
                      alt
                    />
                  </b-td>
                  <b-td>
                    <audio controls>
                      <source :src="item.voiceLearning" type="audio/ogg" />
                      Your browser does not support the audio element.
                    </audio>
                  </b-td>
                  <b-td>{{ item.created_at }}</b-td>
                  <b-td>
                    <template>
                      <b-button
                        class="custom-btn mr-2"
                        variant=" iq-bg-success mr-1 mb-1"
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
  watch: {
    currentPage: {
      handler: function () {
        this.getAllLearnings()
      }
    }
  },
  mounted () {
    core.index()
    this.getAllLearnings()
  },
  data () {
    return {
      loader: false,
      perPage: 10,
      currentPage: 1,
      rows: 0,
      imageShow: '',
      message: '',
      file1: '',
      items: [],
      hidsModal: null,
      chackFile: false,
      genderId: null,
      formAdd: {
        type: null,
        title: null,
        sub_title: null,
        color: null,
        image: null,
        gif: null,
        voice: null
      },
      formEdit: [],
      learnOptions: [
        {
          text: 'Arabic Letters',
          value: 'Ar_Az'
        },
        {
          text: 'English Letters',
          value: 'En_Az'
        },
        {
          text: 'Arabic Numbers',
          value: 'Ar_N'
        },
        {
          text: 'English Numbers',
          value: 'En_N'
        }
      ]
    }
  },
  methods: {
    editPopup (item) {
      this.formEdit = item
      this.$bvModal.show('editGenderModal')
    },
    deletePopup (id) {
      this.genderId = id
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
    getAllLearnings () {
      this.loader = true
      let pageNumber = this.currentPage - 1
      let pageSkip = pageNumber * this.perPage
      this.axios
        .get(`learning?take=${this.perPage}&skip=${pageSkip}`)
        .then((res) => {
          this.items = res.data.items
          this.rows = res.data.totalCount
          this.loader = false
        })
        .catch(() => {})
    },
    closeDeleteModal () {
      document.getElementById('close-delete').click()
    },
    addLearn () {
      if (this.addValidater().status === 400) {
        this.$swal('خطأ في الادخال', this.addValidater().message, 'error')
      } else {
        this.loader = true
        let formData = new FormData()
        formData.append('title', this.formAdd.title)
        formData.append('sub_title', this.formAdd.sub_title)
        formData.append('type', this.formAdd.type)
        formData.append('color', this.formAdd.color)
        formData.append('image', this.formAdd.image)
        formData.append('gif', this.formAdd.gif)
        formData.append('voice', this.formAdd.voice)
        this.axios
          .post('learning', formData)
          .then(() => {
            Object.keys(this.formAdd).forEach((item) => {
              this.formAdd[item] = null
            })
            this.getAllLearnings()
            this.loader = false
            this.$swal('تمت الاضافة بنجاح', '', 'success')
            this.$bvModal.hide('addGenderModal')
          })
          .catch((res) => {
            this.$swal('يوجد خلل فني', '', 'error')
          })
      }
    },
    editLearn () {
      this.loader = true
      var formData = new FormData()
      formData.append('type', this.formEdit.type)
      formData.append('title', this.formEdit.title)
      formData.append('sub_title', this.formEdit.sub_title)
      formData.append('color', this.formEdit.color)
      if (this.formEdit.image) {
        formData.append('image', this.formEdit.image)
      }
      if (this.formEdit.image) {
        formData.append('gif', this.formEdit.gif)
      }
      if (this.formEdit.image) {
        formData.append('voice', this.formEdit.voice)
      }
      formData.append('_method', 'PUT')
      this.axios.post(`learning/${this.formEdit.id}`, formData).then(() => {
        this.$bvModal.hide('editGenderModal')
        this.getAllLearnings()
        this.loader = false
        this.$swal('تم التعديل بنجاح', '', 'success')
      })
    },
    deleteGender () {
      this.loader = true
      this.axios
        .delete(`learning/${this.genderId}`)
        .then((res) => {
          this.closeDeleteModal()
          this.getAllLearnings()
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
      if (!this.formAdd.type) {
        dataError.status = 400
        dataError.message = 'يرجى اختيار النوع'
        return dataError
      }
      if (!this.formAdd.title) {
        dataError.status = 400
        dataError.message = 'يرجى ادخال العنوان'
        return dataError
      }
      if (!this.formAdd.sub_title) {
        dataError.status = 400
        dataError.message = 'يرجى ادخال العنوان الثانوي'
        return dataError
      }
      if (!this.formAdd.color) {
        dataError.status = 400
        dataError.message = 'يرجى ادخال اللون '
        return dataError
      }
      if (!this.formAdd.image) {
        dataError.status = 400
        dataError.message = 'يرجى اختيار الصورة'
        return dataError
      }
      if (!this.formAdd.gif) {
        dataError.status = 400
        dataError.message = 'يرجى اختيار الصورة المتحركة '
        return dataError
      }
      if (!this.formAdd.voice) {
        dataError.status = 400
        dataError.message = 'يرجى اختيار الصوت '
        return dataError
      }
      dataError.status = 200
      dataError.message = 'success'
      return dataError
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
