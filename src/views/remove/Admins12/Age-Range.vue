<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <button
          type="button"
          class="btn btn-primary add"
          data-toggle="modal"
          data-target="#addAgeRangeModal"
          data-whatever="@getbootstrap"
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
        <!-- add AgeRange modal -->
        <div
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
                        ><span style="color: red">* </span> Name</label
                      >
                      <input
                        type="text"
                        v-model="formAdd.name"
                        class="form-control"
                        id="validationDefault01"
                        required
                      />
                    </div>
                    <div class="col-md-12 mb-12">
                      <label for="validationDefault02"
                        ><span style="color: red">* </span> Male color</label
                      >
                      <input
                        type="text"
                        v-model="formAdd.male_color"
                        class="form-control"
                        id="validationDefault02"
                        required
                      />
                    </div>
                    <div class="col-md-12 mb-12">
                      <label for="validationDefault02"
                        ><span style="color: red">* </span> Female color</label
                      >
                      <input
                        type="text"
                        v-model="formAdd.female_color"
                        class="form-control"
                        id="validationDefault02"
                        required
                      />
                    </div>
                    <label
                      ><span style="color: red">* </span> Male Icon (png, svg)
                    </label>
                    <div class="custom-file">
                      <b-form-file
                        v-model="formAdd.male_icon"
                        :state="Boolean(formAdd.male_icon)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        id="validationDefault02"
                        required
                      ></b-form-file>
                      <label
                        class="custom-file-label"
                        id="validationDefault02"
                        for="validatedCustomFile"
                        required
                        >Choose file...</label
                      >
                    </div>
                    <label
                      ><span style="color: red">* </span> Female Icon (png, svg)
                    </label>
                    <div class="custom-file">
                      <b-form-file
                        v-model="formAdd.female_icon"
                        :state="Boolean(formAdd.female_icon)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        id="validationDefault02"
                        value=""
                        required
                      ></b-form-file>
                      <label
                        class="custom-file-label"
                        id="validationDefault02"
                        for="validatedCustomFile"
                        required
                        >Choose file...</label
                      >
                    </div>
                    <label><span style="color: red">* </span> Male Image</label>
                    <div class="custom-file">
                      <b-form-file
                        v-model="formAdd.male_image"
                        :state="Boolean(formAdd.male_image)"
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
                    <label
                      ><span style="color: red">* </span> Female Image</label
                    >
                    <div class="custom-file">
                      <b-form-file
                        v-model="formAdd.female_image"
                        :state="Boolean(formAdd.female_image)"
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
                      v-on:click="addAgeRange"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!--end add AgeRange modal -->
        <!-- edit AgeRange modal -->
        <div
          class="modal fade"
          id="editAgeRangeModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="editAgeRangeModalLabel"
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
                        ><span style="color: red">* </span> Age From</label
                      >
                      <input
                        type="text"
                        v-model="formEdit.age_from"
                        class="form-control"
                        id="validationDefault01"
                        required
                      />
                    </div>
                    <div class="col-md-12 mb-12">
                      <label for="validationDefault02"
                        ><span style="color: red">* </span> Age To</label
                      >
                      <input
                        type="text"
                        v-model="formEdit.age_to"
                        class="form-control"
                        id="validationDefault02"
                        required
                      />
                    </div>
                    <label><span style="color: red">* </span>Gender</label>
                    <select
                      class="custom-select col-md-12 mb-12"
                      v-model="formEdit.gender_id"
                    >
                      <option
                        v-for="gender in genders"
                        v-bind:value="gender.id"
                        :key="gender.id"
                      >
                        {{ gender.type }}
                      </option>
                    </select>
                    <label> Image</label>
                    <div class="custom-file">
                      <b-form-file
                        v-model="formEdit.image"
                        :state="Boolean(formEdit.image)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        value=""
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
                      id="close-edit"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      class="btn btn-primary submit-button"
                      type="submit"
                      v-on:click="editAgeRange"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
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
                    v-on:click="deleteAgeRange"
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
            <h4 class="card-title">AgeRange</h4>
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
                <b-th>age range</b-th>
                <b-th>gender</b-th>
                <b-th>created at</b-th>
                <b-th>updated at</b-th>
                <b-th>image</b-th>
                <b-th>Action</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in items" :key="index">
                  <b-td>{{ item.age_from + ' - ' + item.age_to }}</b-td>
                  <b-td>{{ item.gender.type }}</b-td>
                  <b-td>{{ item.created_at }}</b-td>
                  <b-td>{{ item.updated_at }}</b-td>
                  <b-td>
                    <img
                      :src="item.imageAge"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.imageAge)"
                      alt
                    />
                  </b-td>
                  <b-td>
                    <template>
                      <b-button
                        class="custom-btn mr-2"
                        variant=" iq-bg-success"
                        data-toggle="modal"
                        data-target="#editAgeRangeModal"
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
    this.getAllAgeRange()
    this.getAllGenders()
  },
  data () {
    return {
      imageShow: '',
      message: '',
      genders: [],
      hidsModal: null,
      chackFile: false,
      AgeRangeId: null,
      items: [],
      formAdd: [],
      formEdit: [],
      loader: false
    }
  },
  methods: {
    editPopup (item) {
      this.formEdit = item
    },
    deletePopup (id) {
      this.AgeRangeId = id
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
      this.axios
        .get('gender?take=1000')
        .then((res) => {
          this.genders = res.data.items
        })
        .catch(() => {})
    },
    closeDeleteModal () {
      document.getElementById('close-delete').click()
    },
    addAgeRange () {
      if (this.addValidate() !== 400) {
        this.loader = true
        var formData = new FormData()
        formData.append('age_from', this.formAdd.age_from)
        formData.append('age_to', this.formAdd.age_to)
        formData.append('image', this.formAdd.image)
        formData.append('gender_id', this.formAdd.gender_id)
        this.axios
          .post('age/range', formData)
          .then(() => {
            this.formAdd = []
            this.closeModal()
            this.getAllAgeRange()
            this.loader = false
            this.$swal('تمت الاضافة بنجاح', '', 'Success')
          })
          .catch((res) => {
            if (res.response.status === 400) {
              this.$swal('يرجى ملئ المعلومات', '', 'error')
            }
            this.$swal('يوجد خلل فني', '', 'error')
          })
      }
    },
    editAgeRange () {
      var formData = new FormData()
      formData.append('age_from', this.formEdit.age_from)
      formData.append('age_to', this.formEdit.age_to)
      formData.append('gender_id', this.formEdit.gender_id)
      if (this.formEdit.image) {
        formData.append('image', this.formEdit.image)
      }
      formData.append('_method', 'PUT')
      this.loader = true
      this.axios
        .post(`age/range/${this.formEdit.id}`, formData)
        .then(() => {
          this.closeEditModal()
          this.getAllAgeRange()
          this.loader = false
          this.$swal('تم التعديل بنجاح', '', 'Success')
        })
        .catch((res) => {
          if (res.response.status === 400) {
            this.$swal('يرجى ملئ المعلومات', '', 'error')
          }
          this.$swal('يوجد خلل فني', '', 'error')
        })
    },
    getAllAgeRange () {
      this.loader = true
      this.axios.get('age/range?take=100').then((res) => {
        this.items = res.data.items
        this.loader = false
      })
    },
    deleteAgeRange () {
      this.loader = true
      this.axios
        .delete(`AgeRange/${this.AgeRangeId}`)
        .then((res) => {
          this.closeDeleteModal()
          this.getAllAgeRange()
          this.loader = false
        })
        .catch((res) => {
          if (res.response.status === 404) {
            this.$swal('العنصر غير موجود', '', 'error')
          }
          this.$swal('يوجد خلل فني', '', 'error')
        })
    },
    addValidate () {
      if (!this.formAdd.name) {
        return 400
      }
      if (!this.formAdd.female_color) {
        return 400
      }
      if (!this.formAdd.male_image) {
        return 400
      }
      if (!this.formAdd.female_image) {
        return 400
      }
      if (!this.formAdd.male_icon) {
        return 400
      }
      if (!this.formAdd.female_icon) {
        return 400
      }
      if (!this.formAdd.male_color) {
        return 400
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
