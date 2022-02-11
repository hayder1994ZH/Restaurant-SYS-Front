<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <button
          type="button"
          class="btn btn-primary add"
          data-toggle="modal"
          data-target="#addSubCategoryModal"
          data-whatever="@getbootstrap"
        >
          Add +
        </button>
        <br />
        <!-- show image modal -->
        <div
          class="modal fade"
          id="showImage"
          tabindex="-1"
          role="dialog"
          aria-labelledby="showImageLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <img :src="imageShow" alt="" />
            </div>
          </div>
        </div>
        <!-- end show image modal -->
        <!-- add SubCategory modal -->
        <div
          class="modal fade"
          id="addSubCategoryModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="addSubCategoryModalLabel"
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
                      <label for="validationDefault01">Name</label>
                      <input
                        type="text"
                        v-model="formAdd.name"
                        class="form-control"
                        id="validationDefault01"
                        required
                      />
                    </div>
                    <label>Icon</label>
                    <div class="custom-file col-md-12 mb-12">
                      <b-form-file
                        v-model="formAdd.icon"
                        :state="Boolean(formAdd.icon)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                      ></b-form-file>
                      <label class="custom-file-label" for="validatedCustomFile"
                        >Choose file...</label
                      >
                    </div>
                    <label>Icon</label>
                    <select
                      class="custom-select col-md-12 mb-12"
                      v-model="formAdd.category_id"
                    >
                      <option
                        v-for="category in categories"
                        v-bind:value="category.id"
                        :key="category.id"
                      >
                        {{ category.name }}
                      </option>
                    </select>
                    <label>Image</label>
                    <div class="custom-file">
                      <b-form-file
                        v-model="formAdd.image"
                        :state="Boolean(formAdd.image)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
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
                      v-on:click="addSubCategory"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!--end add SubCategory modal -->
        <!-- edit SubCategory modal -->
        <div
          class="modal fade"
          id="editSubCategoryModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="editSubCategoryModalLabel"
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
                      <label for="validationDefault01">Name</label>
                      <input
                        type="text"
                        v-model="formEdit.name"
                        class="form-control"
                        id="validationDefault01"
                        required
                      />
                    </div>
                    <label>Icon</label>
                    <div class="custom-file col-md-12 mb-12">
                      <b-form-file
                        v-model="formEdit.icon"
                        :state="Boolean(formEdit.icon)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
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
                      v-on:click="editSubCategory"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!--end edit SubCategory modal -->
        <!-- delete modal -->
        <div
          class="modal fade"
          style="margin-top: 15rem"
          id="deleteSubCategoryModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="deleteSubCategoryModalLabel"
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
                    v-on:click="deleteSubCategory"
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
            <h4 class="card-title">SubCategory</h4>
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
                <kbd class="bg-dark"> </kbd>
              </div>
            </b-collapse>
            <b-table-simple responsive>
              <b-thead>
                <b-th>#</b-th>
                <b-th>name</b-th>
                <b-th>category name</b-th>
                <b-th>created at</b-th>
                <b-th>updated at</b-th>
                <b-th>icon</b-th>
                <!-- <b-th>image</b-th> -->
                <b-th>Action</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in items" :key="index">
                  <b-td>{{ item.id }}</b-td>
                  <b-td>{{ item.name }}</b-td>
                  <b-td>{{ item.category.name }}</b-td>
                  <b-td>{{ item.created_at }}</b-td>
                  <b-td>{{ item.updated_at }}</b-td>
                  <b-td>
                    <img
                      :src="item.iconSubcategory"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.iconSubcategory)"
                      alt=""
                    />
                  </b-td>
                  <!-- <b-td>
                    <img
                      :src="item.imageSubcategory"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.imageSubcategory)"
                      alt=""
                    />
                  </b-td> -->
                  <b-td>
                    <template>
                      <b-button
                        class="custom-btn mr-2"
                        variant=" iq-bg-success"
                        data-toggle="modal"
                        data-target="#editSubCategoryModal"
                        data-whatever="@getbootstrap"
                        v-on:click="editPopup(item)"
                        size="sm"
                        ><i class="ri-ball-pen-fill m-0"></i
                      ></b-button>
                      <b-button
                        class="custom-btn mr-2"
                        variant=" iq-bg-danger"
                        data-toggle="modal"
                        data-target="#deleteSubCategoryModal"
                        v-on:click="deletePopup(item.id)"
                        data-whatever="@getbootstrap"
                        size="sm"
                        ><i class="ri-delete-bin-line m-0"></i
                      ></b-button>
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
  name: 'SubCategory',
  components: {
    Loader
  },
  mounted () {
    core.index()
    this.getAllData()
    this.getAllCategory()
  },
  data () {
    return {
      loader: false,
      imageShow: '',
      hidsModal: null,
      categories: [],
      SubCategoryId: null,
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
      this.SubCategoryId = id
    },
    imageUrl (image) {
      this.imageShow = image
      console.log(this.imageShow)
    },
    closeModal () {
      document.getElementById('close').click()
    },
    closeDeleteModal () {
      document.getElementById('close-delete').click()
    },
    addSubCategory () {
      this.loader = true
      if (this.addValidate() !== 400) {
        var formData = new FormData()
        formData.append('name', this.formAdd.name)
        formData.append('icon', this.formAdd.icon)
        formData.append('category_id', this.formAdd.category_id)
        formData.append('image', this.formAdd.image)
        console.log(this.formAdd)
        this.axios
          .post('subcategory', formData)
          .then(() => {
            this.formAdd = []
            this.closeModal()
            this.getAllData()
            this.loader = false
          })
          .catch(() => {})
      }
    },
    editSubCategory () {
      if (this.editValidate() !== 400) {
        var formData = new FormData()
        formData.append('name', this.formEdit.name)
        formData.append('icon', this.formEdit.icon)
        formData.append('_method', 'PUT')
        this.loader = true
        this.axios
          .post(`subcategory/${this.formEdit.id}`, formData)
          .then(() => {
            this.closeModal()
            this.getAllData()
            this.loader = false
          })
          .catch(() => {})
      }
    },
    getAllData () {
      this.loader = true
      this.axios
        .get('subcategory?take=100')
        .then((res) => {
          this.items = res.data.items
          this.loader = false
        })
        .catch(() => {})
    },
    getAllCategory () {
      this.axios
        .get('category?take=1000')
        .then((res) => {
          this.categories = res.data.items
        })
        .catch(() => {})
    },
    deleteSubCategory () {
      this.loader = true
      console.log(this.SubCategoryId)
      this.axios
        .delete(`subcategory/${this.SubCategoryId}`)
        .then((res) => {
          this.closeDeleteModal()
          this.getAllData()
          this.loader = false
        })
        .catch(() => {})
    },
    addValidate () {
      if (this.formAdd.name === null || this.formAdd.name === undefined) {
        return 400
      }
      if (this.formAdd.image === null || this.formAdd.image === undefined) {
        return 400
      }
      if (this.formAdd.icon === null || this.formAdd.icon === undefined) {
        return 400
      }
    },
    editValidate () {
      if (this.formEdit.name === null || this.formEdit.name === undefined) {
        return 400
      }
      if (this.formEdit.icon === null || this.formEdit.icon === undefined) {
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
