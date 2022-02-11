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
        <!-- add Gender modal -->
        <!-- <div
          class="modal fade"
          id="addAgeRangeModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="addAgeRangeModalLabel"
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
                        ><span style="color: red">* </span> Gender</label
                      >
                      <b-form-select
                        v-model="formAdd.type"
                        :options="gendersOptions"
                      ></b-form-select>
                    </div>
                    <label><span style="color: red">* </span> image</label>
                    <div class="custom-file">
                      <b-form-file
                        v-model="formAdd.image"
                        :state="Boolean(formAdd.image)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        id="validationDefault02"
                        value=""
                        required
                      ></b-form-file>
                      <label class="custom-file-label" for="validatedCustomFile"
                        >Choose file...</label
                      >
                    </div>
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
                      v-on:click="addGender"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div> -->
        <!--end add Gender modal -->
        <!-- add gender v2 -->
        <b-modal id="addGenderModal" hide-footer>
          <div class="mb-3">
            <label><span style="color: red">* </span> Choose Gender</label>
            <b-form-select
              v-model="formAdd.type"
              :options="gendersOptions"
            ></b-form-select>
          </div>
          <div class="mb-5">
            <label><span style="color: red">* </span> image</label>
            <b-form-file
              v-model="formAdd.image"
              :state="Boolean(formAdd.image)"
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
              @click="addGender"
            >
              Submit
            </button>
          </div>
        </b-modal>
        <!-- end of add gender v2 -->
        <!-- edit AgeRange modal -->
        <!-- <div
          class="modal fade"
          id="editGenderModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="editGenderModalLabel"
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
                <div class="mb-3">
                  <label
                    ><span style="color: red">* </span> Choose Gender</label
                  >
                  <b-form-select
                    v-model="formEdit.type"
                    :options="gendersOptions"
                  ></b-form-select>
                </div>
                <div class="mb-5">
                  <label><span style="color: red">* </span> image</label>
                  <b-form-file
                    v-model="formEdit.image"
                    :state="Boolean(formEdit.image)"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                    required
                  ></b-form-file>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <b-modal id="editGenderModal" hide-footer>
          <div class="mb-3">
            <label><span style="color: red">* </span> Choose Gender</label>
            <b-form-select
              v-model="formEdit.type"
              :options="gendersOptions"
            ></b-form-select>
          </div>
          <div class="mb-5">
            <label><span style="color: red">* </span> image</label>
            <b-form-file
              v-model="formEdit.image"
              :state="Boolean(formEdit.image)"
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
              @click="editGender"
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
            <h4 class="card-title">Gender List</h4>
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
                <b-th>gender</b-th>
                <b-th>created at</b-th>
                <b-th>updated at</b-th>
                <b-th>image</b-th>
                <b-th>Action</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in genders" :key="index">
                  <b-td>{{ item.type }}</b-td>
                  <b-td>{{ item.created_at }}</b-td>
                  <b-td>{{ item.updated_at }}</b-td>
                  <b-td>
                    <img
                      :src="item.imageGenders"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.imageGenders)"
                      alt
                    />
                  </b-td>
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
    this.getAllGenders()
  },
  data () {
    return {
      loader: false,
      imageShow: '',
      message: '',
      file1: '',
      genders: [],
      hidsModal: null,
      chackFile: false,
      genderId: null,
      formAdd: {
        type: null,
        image: null
      },
      formEdit: [],
      gendersOptions: [
        {
          text: 'ذكر',
          value: 'ذكر'
        },
        {
          text: 'انثى',
          value: 'انثى'
        },
        {
          text: 'كلا الجنسين',
          value: 'كلا الجنسين'
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
    getAllGenders () {
      this.loader = true
      this.axios
        .get('gender?take=1000')
        .then((res) => {
          this.genders = res.data.items
          this.loader = false
        })
        .catch(() => {})
    },
    closeDeleteModal () {
      document.getElementById('close-delete').click()
    },
    addGender () {
      if (this.addValidater().status === 400) {
        this.$swal('خطأ في الادخال', this.addValidater().message, 'error')
      } else {
        this.loader = true
        let formData = new FormData()
        formData.append('image', this.formAdd.image)
        formData.append('type', this.formAdd.type)
        this.axios
          .post('gender', formData)
          .then(() => {
            this.formAdd.type = null
            this.formAdd.image = null
            this.getAllGenders()
            this.loader = false
            this.$swal('تمت الاضافة بنجاح', '', 'success')
            this.$bvModal.hide('addGenderModal')
          })
          .catch((res) => {
            this.loader = false
            this.$swal('يوجد خلل فني', '', 'error')
          })
      }
    },
    editGender () {
      this.loader = true
      var formData = new FormData()
      formData.append('type', this.formEdit.type)
      if (this.formEdit.image) {
        formData.append('image', this.formEdit.image)
      }
      formData.append('_method', 'PUT')
      this.axios
        .post(`gender/${this.formEdit.id}`, formData)
        .then(() => {
          this.getAllGender()
          this.$bvModal.hide('editGenderModal')
          this.loader = false
          this.$swal('تم التعديل بنجاح', '', 'success')
        })
        .catch((res) => {
          this.loader = false
          this.$swal('يوجد خلل فني', '', 'error')
        })
    },
    deleteGender () {
      this.loader = true
      this.axios
        .delete(`gender/${this.genderId}`)
        .then((res) => {
          this.closeDeleteModal()
          this.getAllGenders()
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
        dataError.message = 'يرجى اختيار الجنس'
        return dataError
      }
      if (!this.formAdd.image) {
        dataError.status = 400
        dataError.message = 'يرجى اختيار صورة للجنس'
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
