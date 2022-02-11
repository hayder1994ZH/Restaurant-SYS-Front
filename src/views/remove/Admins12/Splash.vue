<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <button
          type="button"
          class="btn btn-primary add"
          @click="$bvModal.show('addSplash')"
        >
          Add Splash
        </button>
        <br />
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
        <!-- add rule -->
        <b-modal id="addSplash" hide-footer>
          <div class="mb-3">
            <label><span style="color: red">* </span>Splash Image</label>
            <b-form-file
              v-model="formAdd.splash_image"
              :state="Boolean(formAdd.splash_image)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              required
            ></b-form-file>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>Gender Image</label>
            <b-form-file
              v-model="formAdd.gender_image"
              :state="Boolean(formAdd.gender_image)"
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
              @click="addSplash"
            >
              Submit
            </button>
          </div>
        </b-modal>
        <!-- end of add rule -->
        <!-- edit rule -->
        <b-modal id="editSplashModal" hide-footer>
          <div class="mb-3">
            <label><span style="color: red">* </span>Splash Image</label>
            <b-form-file
              v-model="formEdit.splash_image"
              :state="Boolean(formEdit.splash_image)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              required
            ></b-form-file>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>Gender Image</label>
            <b-form-file
              v-model="formEdit.gender_image"
              :state="Boolean(formEdit.gender_image)"
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
              @click="editSplash"
            >
              Submit
            </button>
          </div>
        </b-modal>
        <!-- end of edit rule -->
      </b-col>
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Splash List</h4>
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
                <b-th>splash</b-th>
                <b-th>gender</b-th>
                <b-th>voice</b-th>
                <b-th>created at</b-th>
                <b-th>action</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in items" :key="index">
                  <b-td>
                    <img
                      :src="item.splashImages"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.splashImages)"
                      alt
                    />
                  </b-td>
                  <b-td v-if="item.genderImages">
                    <img
                      :src="item.genderImages"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.genderImages)"
                      alt
                    />
                  </b-td>
                  <b-td v-else>---</b-td>
                  <b-td>
                    <audio controls>
                      <source :src="item.splashVoice" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </b-td>
                  <b-td>{{ item.created_at }}</b-td>
                  <b-td>
                    <template>
                      <div class="controls">
                        <div class="mr-2 d-flex">
                          <b-button
                            variant=" iq-bg-success"
                            size="sm"
                            v-show="item.active === 0"
                            @click="active(item.id)"
                          >
                            Activate
                          </b-button>
                          <b-button
                            variant=" iq-bg-danger"
                            size="sm"
                            v-show="item.active === 1"
                            @click="active(item.id)"
                          >
                            Deactivate
                          </b-button>
                        </div>
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
                      </div>
                    </template>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </template>
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
  components: {
    Loader
  },
  mounted () {
    core.index()
    this.getAllItems()
  },
  data () {
    return {
      loader: false,
      splashId: null,
      formAdd: {
        splash_image: null,
        gender_image: null,
        voice: null
      },
      formEdit: {},
      imageShow: '',
      videoShow: '',
      items: [],
      id: null
    }
  },
  methods: {
    active (id) {
      this.axios.get(`active/splash/${id}`).then(() => {
        this.getAllItems()
      })
    },
    editPopup (item) {
      this.formEdit = item
      this.$bvModal.show('editSplashModal')
    },
    editSplash () {
      this.loader = true
      var formData = new FormData()
      if (this.formEdit.splash_image) {
        formData.append('splash_image', this.formEdit.splash_image)
      }
      if (this.formEdit.gender_image) {
        formData.append('gender_image', this.formEdit.gender_image)
      }
      if (this.formEdit.voice) {
        formData.append('voice', this.formEdit.voice)
      }
      formData.append('_method', 'PUT')
      this.axios.post(`splashs/${this.formEdit.id}`, formData).then(() => {
        this.getAllItems()
        this.$bvModal.hide('editSplashModal')
        this.loader = false
        this.$swal('تم التعديل بنجاح', '', 'success')
      })
    },
    imageUrl (image) {
      this.imageShow = image
    },
    deletePopup (id) {
      this.splashId = id
    },
    closeDeleteModal () {
      document.getElementById('close-delete').click()
    },
    deleteGender () {
      this.loader = true
      this.axios
        .delete(`splashs/${this.splashId}`)
        .then((res) => {
          this.closeDeleteModal()
          this.getAllItems()
          this.loader = false
        })
        .catch((res) => {
          this.$swal('يوجد خلل فني', '', 'error')
        })
    },
    addSplash () {
      let data = new FormData()
      if (!this.formAdd.splash_image) {
        this.$swal('يرجى اختيار صورة ال splash', '', 'error')
        return '400'
      }
      if (this.formAdd.gender_image) {
        data.append('gender_image', this.formAdd.gender_image)
      }
      if (!this.formAdd.voice) {
        this.$swal('يرجى اختيار الصوت', '', 'error')
        return '400'
      } else if (this.formAdd.voice.type !== 'audio/mpeg') {
        this.$swal('خطأ في نوع الفايل يرجى اختيار فايل من نوع mp3', '', 'error')
        return '400'
      }
      this.loader = true
      data.append('splash_image', this.formAdd.splash_image)
      data.append('voice', this.formAdd.voice)
      this.axios
        .post('splashs', data)
        .then((res) => {
          this.$bvModal.hide('addSplash')
          this.getAllItems()
          this.loader = false
          this.$swal('تم رفع المعلومات بنجاح', '', 'success')
        })
        .catch(() => {
          this.$bvModal.hide('addSplash')
          this.loader = false
          this.$swal(
            'حدث خطأ في الاتصال يرجى اعادة المحاولة لاحقا',
            '',
            'error'
          )
        })
    },
    getAllItems () {
      this.loader = true
      this.axios
        .get('splashs?take=10000')
        .then((res) => {
          this.items = res.data.items
          this.loader = false
        })
        .catch(() => {})
    }
  }
}
</script>
<style scoped>
.controls {
  display: flex;
  align-items: center;
}
.custom-btn {
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
