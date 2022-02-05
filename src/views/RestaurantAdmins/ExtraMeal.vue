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
          Add extra meal
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
        <!-- add extra meal -->
        <b-modal id="add" hide-footer>
            <div class="mb-3">
            <label><span style="color: red">* </span>Image</label>
            <b-form-file
            v-model="formAdd.image"
            :state="Boolean(formAdd.image)"
            placeholder="Choose a image or drop it here..."
            drop-placeholder="Drop image here..."
            ></b-form-file>
            </div>
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
        <!-- end of add extra meal -->
        <!-- edit extra meal -->
        <b-modal id="update" hide-footer>
            <div class="mb-3">
            <label><span style="color: red">* </span>Image</label>
            <b-form-file
            v-model="formEdit.image"
            :state="Boolean(formEdit.image)"
            placeholder="Choose a image or drop it here..."
            drop-placeholder="Drop image here..."
            ></b-form-file>
            </div>
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
        <!-- end of edit extra meal -->
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
        <!-- end delete modal -->
      </b-col>
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Category meals</h4>
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
                <b-th>image</b-th>
                <b-th>created at</b-th>
                <b-th>action</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in items" :key="index">
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
      meals: [],
      imageShow: "",
      loader: false,
      formAdd:[],
      formEdit: [],
      formEditExtra: [],
      items: [],
      id: null,
    }
  },
  methods: {
    deletePopup (id) {
      this.id = id
    },
    closeDeleteModal () {
      document.getElementById('close-delete').click()
    },
    editPopup (item) {
      this.formEdit = item
      this.$bvModal.show('update')
    },
    imageUrl (image) {
      this.imageShow = 'http://localhost:8000/storage/' + image
    },
    async create () {
        console.log()
        let data = new FormData()
        if (this.addValidater().status === 400) {
            this.$swal('خطأ في الادخال', this.addValidater().message, 'error')
        } else {
            data.append('meal_id', this.$route.params.id)
            data.append('image', this.formAdd.image)
            this.loader = true
            await this.axios
            .post('extra/meal', data)
            .then(() => {
                this.getAllItems()
                this.loader = false
                this.$swal(' تم اضافة المستخدم بنجاح', 'تم نجاح العملية', 'success')
            })
            .catch((res) => {
                this.loader = false
                this.$swal('يوجد خلل فني', 'خطاء في الارسال', 'error')
            })
        }
    },
    async update () {
        let data = new FormData()
        data.append('image', this.formEdit.image)
        data.append('meal_id', this.$route.params.id)
        data.append('_method', 'PUT')
        this.loader = true
        await this.axios
        .post(`extra/meal/${this.formEdit.id}`, data)
        .then(() => {
            this.getAllItems()
            this.$bvModal.hide('update')
            this.loader = false
            this.$swal('تم تعديل معلومات المستخدم بنجاح', '', 'success')
        })
        .catch((res) => {
            this.loader = false
            if (res.response.status === 400) {
                this.$swal('خطاء في الارسال', 'هذه اللغة مستخدمة', 'error')
            }else{
                this.$swal('يوجد خلل فني', 'خطاء في الارسال', 'error')
            }
        })
    },
    getAllItems () {
        this.loader = true 
        this.axios
        .get(
          `meal/extra/${this.$route.params.id}`
        )
        .then((res) => {
          this.items = res.data
          this.loader = false 
        })
        .catch(() => {
          this.loader = false 
        })
    },
    deleteItem () {
      this.loader = true
      this.axios
        .delete(`extra/meal/${this.id}`)
        .then((res) => {
          this.closeDeleteModal()
          this.getAllItems()
          this.loader = false
        })
        .catch((res) => {
          this.loader = false
          if (res.response.status === 404) {
            this.$swal('العنصر غير موجود', '', 'error')
          }else{
            this.$swal('يوجد خلل فني', '', 'error')
          }
        })
    },
    addValidater () {
      let dataError = {
        status: null,
        message: ''
      }
      if (!this.formAdd.image) {
        dataError.status = 400
        dataError.message = 'يرجى اضافة صورة '
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
