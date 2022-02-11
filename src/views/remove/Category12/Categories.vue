<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <button
          type="button"
          class="btn btn-primary add"
          data-toggle="modal"
          data-target="#addCategoryModal"
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
        <!-- add category modal -->
        <div
          class="modal fade"
          id="addCategoryModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="addCategoryModalLabel"
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
                      <label><span style="color: red">* </span> Name</label>
                      <input
                        type="text"
                        v-model="formAdd.name"
                        class="form-control"
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
                      />
                    </div>
                    <div class="col-md-12 mb-12">
                      <label
                        ><span style="color: red">* </span> Female color</label
                      >
                      <input
                        type="text"
                        v-model="formAdd.female_color"
                        class="form-control"
                      />
                    </div>
                    <div class="col-md-12 mb-12">
                      <label
                        ><span style="color: red">* </span> Both color</label
                      >
                      <input
                        type="text"
                        v-model="formAdd.both_color"
                        class="form-control"
                      />
                    </div>
                    <label for="male-icon"
                      ><span style="color: red">* </span> Male Icon (png, svg)
                    </label>
                    <div class="custom-file">
                      <b-form-file
                        v-model="formAdd.male_icon"
                        :state="Boolean(formAdd.male_icon)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        id="male-icon"
                      ></b-form-file>
                      <label class="custom-file-label" for="male-icon"
                        >Choose file...</label
                      >
                    </div>
                    <label for="female-icon"
                      ><span style="color: red">* </span> Female Icon (png, svg)
                    </label>
                    <div class="custom-file">
                      <b-form-file
                        v-model="formAdd.female_icon"
                        :state="Boolean(formAdd.female_icon)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        id="female-icon"
                      ></b-form-file>
                      <label class="custom-file-label" for="female-icon"
                        >Choose file...</label
                      >
                    </div>
                    <label for="both-icon"
                      ><span style="color: red">* </span> Both Icon (png, svg)
                    </label>
                    <div class="custom-file">
                      <b-form-file
                        v-model="formAdd.both_icon"
                        :state="Boolean(formAdd.both_icon)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        id="both-icon"
                      ></b-form-file>
                      <label class="custom-file-label" for="both-icon"
                        >Choose file...</label
                      >
                    </div>
                    <label for="male-image"
                      ><span style="color: red">* </span> Male Image</label
                    >
                    <div class="custom-file">
                      <b-form-file
                        v-model="formAdd.male_image"
                        :state="Boolean(formAdd.male_image)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        id="male-image"
                      ></b-form-file>
                      <label class="custom-file-label" for="male-image"
                        >Choose file...</label
                      >
                    </div>
                    <label for="female-image"
                      ><span style="color: red">* </span> Female Image</label
                    >
                    <div class="custom-file">
                      <b-form-file
                        v-model="formAdd.female_image"
                        :state="Boolean(formAdd.female_image)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        id="female-image"
                      ></b-form-file>
                      <label class="custom-file-label" for="female-image"
                        >Choose file...</label
                      >
                    </div>
                    <label for="both-image"
                      ><span style="color: red">* </span> Both Image</label
                    >
                    <div class="custom-file">
                      <b-form-file
                        v-model="formAdd.both_image"
                        :state="Boolean(formAdd.both_image)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        id="both-image"
                      ></b-form-file>
                      <label class="custom-file-label" for="both-image"
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
                      v-on:click="addCategory"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!--end add category modal -->
        <!-- edit category modal -->
        <div
          class="modal fade"
          id="editCategoryModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="editCategoryModalLabel"
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
                      <label><span style="color: red">* </span> Name</label>
                      <input
                        type="text"
                        v-model="formEdit.name"
                        class="form-control"
                      />
                    </div>
                    <div class="col-md-12 mb-12">
                      <label for="validationDefault02"
                        ><span style="color: red">* </span> Male color</label
                      >
                      <input
                        type="text"
                        v-model="formEdit.male_color"
                        class="form-control"
                      />
                    </div>
                    <div class="col-md-12 mb-12">
                      <label
                        ><span style="color: red">* </span> Female color</label
                      >
                      <input
                        type="text"
                        v-model="formEdit.female_color"
                        class="form-control"
                      />
                    </div>
                    <div class="col-md-12 mb-12">
                      <label
                        ><span style="color: red">* </span> Both color</label
                      >
                      <input
                        type="text"
                        v-model="formEdit.both_color"
                        class="form-control"
                      />
                    </div>
                    <label for="male-icon"
                      ><span style="color: red">* </span> Male Icon (png, svg)
                    </label>
                    <div class="custom-file">
                      <b-form-file
                        v-model="formEdit.male_icon"
                        :state="Boolean(formEdit.male_icon)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        id="male-icon"
                      ></b-form-file>
                      <label class="custom-file-label" for="male-icon"
                        >Choose file...</label
                      >
                    </div>
                    <label for="female-icon"
                      ><span style="color: red">* </span> Female Icon (png, svg)
                    </label>
                    <div class="custom-file">
                      <b-form-file
                        v-model="formEdit.female_icon"
                        :state="Boolean(formEdit.female_icon)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        id="female-icon"
                      ></b-form-file>
                      <label class="custom-file-label" for="female-icon"
                        >Choose file...</label
                      >
                    </div>
                    <label for="both-icon"
                      ><span style="color: red">* </span> Both Icon (png, svg)
                    </label>
                    <div class="custom-file">
                      <b-form-file
                        v-model="formEdit.both_icon"
                        :state="Boolean(formEdit.both_icon)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        id="both-icon"
                      ></b-form-file>
                      <label class="custom-file-label" for="both-icon"
                        >Choose file...</label
                      >
                    </div>
                    <label for="male-image"
                      ><span style="color: red">* </span> Male Image</label
                    >
                    <div class="custom-file">
                      <b-form-file
                        v-model="formEdit.male_image"
                        :state="Boolean(formEdit.male_image)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        id="male-image"
                      ></b-form-file>
                      <label class="custom-file-label" for="male-image"
                        >Choose file...</label
                      >
                    </div>
                    <label for="female-image"
                      ><span style="color: red">* </span> Female Image</label
                    >
                    <div class="custom-file">
                      <b-form-file
                        v-model="formEdit.female_image"
                        :state="Boolean(formEdit.female_image)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        id="female-image"
                      ></b-form-file>
                      <label class="custom-file-label" for="female-image"
                        >Choose file...</label
                      >
                    </div>
                    <label for="both-image"
                      ><span style="color: red">* </span> Both Image</label
                    >
                    <div class="custom-file">
                      <b-form-file
                        v-model="formEdit.both_image"
                        :state="Boolean(formEdit.both_image)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        id="both-image"
                      ></b-form-file>
                      <label class="custom-file-label" for="both-image"
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
                      v-on:click="editCategory"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!--end edit category modal -->
        <!-- delete modal -->
        <div
          class="modal fade"
          style="margin-top: 15rem"
          id="deleteCategoryModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="deleteCategoryModalLabel"
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
                    v-on:click="deleteCategory"
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
            <h4 class="card-title">Category</h4>
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
                <b-th>#</b-th>
                <b-th>name</b-th>
                <b-th>male color</b-th>
                <b-th>female color</b-th>
                <b-th>both color</b-th>
                <b-th>created at</b-th>
                <b-th>updated at</b-th>
                <b-th>male icon</b-th>
                <b-th>female icon</b-th>
                <b-th>male image</b-th>
                <b-th>female image</b-th>
                <b-th>both icon</b-th>
                <b-th>both image</b-th>
                <b-th>Action</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in items" :key="index">
                  <b-td>{{ item.id }}</b-td>
                  <b-td>{{ item.name }}</b-td>
                  <b-td>{{ item.male_color }}</b-td>
                  <b-td>{{ item.female_color }}</b-td>
                  <b-td>{{ item.both_color }}</b-td>
                  <b-td>{{ item.created_at }}</b-td>
                  <b-td>{{ item.updated_at }}</b-td>
                  <b-td>
                    <img
                      :src="item.maleIconCategory"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.maleIconCategory)"
                      alt
                    />
                  </b-td>
                  <b-td>
                    <img
                      :src="item.femaleIconCategory"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.femaleIconCategory)"
                      alt
                    />
                  </b-td>
                  <b-td>
                    <img
                      :src="item.maleImageCategory"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.maleImageCategory)"
                      alt
                    />
                  </b-td>
                  <b-td>
                    <img
                      :src="item.femaleImageCategory"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.femaleImageCategory)"
                      alt
                    />
                  </b-td>
                  <b-td>
                    <img
                      :src="item.bothIconCategory"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.bothIconCategory)"
                      alt
                    />
                  </b-td>
                  <b-td>
                    <img
                      :src="item.bothImageCategory"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.bothImageCategory)"
                      alt
                    />
                  </b-td>
                  <b-td>
                    <template>
                      <b-button
                        class="custom-btn mr-2"
                        variant=" iq-bg-success"
                        data-toggle="modal"
                        data-target="#editCategoryModal"
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
                        data-target="#deleteCategoryModal"
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
  name: 'category',
  components: {
    Loader
  },
  mounted () {
    core.index()
    this.getAllCategory()
  },
  data () {
    return {
      loader: false,
      imageShow: '',
      message: '',
      hidsModal: null,
      chackFile: false,
      categoryId: null,
      items: [],
      formAdd: [],
      formEdit: []
    }
  },
  methods: {
    editPopup (item) {
      this.formEdit = item
    },
    deletePopup (id) {
      this.categoryId = id
    },
    imageUrl (image) {
      this.imageShow = image
      console.log(image)
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
    addCategory () {
      if (this.addValidate() !== 400) {
        var formData = new FormData()
        formData.append('name', this.formAdd.name)
        formData.append('male_icon', this.formAdd.male_icon)
        formData.append('female_icon', this.formAdd.female_icon)
        formData.append('both_icon', this.formAdd.both_icon)
        formData.append('male_color', this.formAdd.male_color)
        formData.append('female_color', this.formAdd.female_color)
        formData.append('both_color', this.formAdd.both_color)
        formData.append('male_image', this.formAdd.male_image)
        formData.append('female_image', this.formAdd.female_image)
        formData.append('both_image', this.formAdd.both_image)
        this.loader = true
        this.axios
          .post('category', formData)
          .then(() => {
            this.formAdd = []
            this.closeModal()
            this.getAllCategory()
            this.loader = false
            this.$swal('تمت الاضافة بنجاح', '', 'Success')
          })
          .catch((res) => {
            // if (res.response.status === 400) {
            //   this.$swal('يرجى ملئ المعلومات', '', 'error')
            // }
            this.$swal('يوجد خلل فني', '', 'error')
          })
      }
    },
    editCategory () {
      this.loader = true
      var formData = new FormData()
      formData.append('name', this.formEdit.name)
      formData.append('male_color', this.formEdit.male_color)
      formData.append('female_color', this.formEdit.female_color)
      formData.append('both_color', this.formEdit.both_color)
      if (this.formEdit.male_icon) {
        formData.append('male_icon', this.formEdit.male_icon)
      }
      if (this.formEdit.male_image) {
        formData.append('male_image', this.formEdit.male_image)
      }
      if (this.formEdit.female_icon) {
        formData.append('female_icon', this.formEdit.female_icon)
      }
      if (this.formEdit.male_image) {
        formData.append('female_image', this.formEdit.female_image)
      }
      if (this.formEdit.both_icon) {
        formData.append('both_icon', this.formEdit.both_icon)
      }
      if (this.formEdit.both_image) {
        formData.append('both_image', this.formEdit.both_image)
      }
      formData.append('_method', 'PUT')
      this.axios
        .post(`category/${this.formEdit.id}`, formData)
        .then(() => {
          this.closeEditModal()
          this.getAllCategory()
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
    getAllCategory () {
      this.loader = true
      this.axios.get('category?take=100').then((res) => {
        this.items = res.data.items
        this.loader = false
      })
    },
    deleteCategory () {
      this.loader = true
      this.axios
        .delete(`category/${this.categoryId}`)
        .then((res) => {
          this.closeDeleteModal()
          this.getAllCategory()
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
