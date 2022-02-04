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
          Add New Language
        </button>
        <br />
        <!-- add category -->
        <b-modal id="add" hide-footer>
            <div class="mb-3">
            <label><span style="color: red">* </span>title</label>
            <b-form-input
            v-model="formAdd.title"
            placeholder="Enter Title"
            ></b-form-input>
            </div>
            <div class="mb-3">
            <label><span style="color: red">* </span>Description</label>
            <b-form-input
            v-model="formAdd.description"
            placeholder="Enter Description"
            ></b-form-input>
            </div>
              <b-col>
                <b-form-group
                  id="input-group-3"
                  label="Choose Language Name :"
                  label-for="input-3"
                >
                  <b-form-select
                    id="input-3"
                    v-model="formAdd.lang_id"
                    :options="languages"
                    required
                  ></b-form-select>
                </b-form-group>
              </b-col>
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
        <!-- end of add category -->
        <!-- edit category -->
        <b-modal id="update" hide-footer>
            <div class="mb-3">
            <label><span style="color: red">* </span>title</label>
            <b-form-input
            v-model="formEdit.title"
            placeholder="Enter Title"
            ></b-form-input>
            </div>
            <div class="mb-3">
            <label><span style="color: red">* </span>Description</label>
            <b-form-input
            v-model="formEdit.description"
            placeholder="Enter Description"
            ></b-form-input>
            </div>
              <b-col>
                <b-form-group
                  id="input-group-3"
                  label="Choose Language Name :"
                  label-for="input-3"
                >
                  <b-form-select
                    id="input-3"
                    v-model="formEdit.lang_id"
                    :options="languages"
                    required
                  ></b-form-select>
                </b-form-group>
              </b-col>
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
        <!-- end of edit category -->
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
            <h4 class="card-title">Category languages</h4>
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
                <b-th>description</b-th>
                <b-th>lang name</b-th>
                <b-th>created at</b-th>
                <b-th>action</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in items" :key="index">
                  <b-td>
                      {{ item.title }}
                  </b-td>
                  <b-td>{{ item.description }}</b-td>
                  <b-td>{{ item.lang.name }}</b-td> 
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
    this.getLanguages()
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
      languages: [],
      searchByName: '',
      searchByTitle: '',
      loader: false,
      perPage: 10,
      currentPage: 1,
      rows: 0,
      formAdd:[],
      formEdit: [],
      formEditlang: [],
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
    async create () {
      let data = new FormData()
      if (this.addValidater().status === 400) {
        this.$swal('خطأ في الادخال', this.addValidater().message, 'error')
      } else {
        data.append('title', this.formAdd.title)
        data.append('description', this.formAdd.description)
        data.append('lang_id', this.formAdd.lang_id)
        data.append('tbable_id', this.$route.params.id)
        this.loader = true
        await this.axios
          .post('meal/lang', data)
          .then(() => {
            this.getAllItems()
            this.loader = false
            this.$swal(' تم اضافة المستخدم بنجاح', 'تم نجاح العملية', 'success')
          })
          .catch((res) => {
            this.loader = false
            if (res.response.status === 400) {
                this.$swal('خطاء في الارسال', 'هذه اللغة مستخدمة', 'error')
            }else{
                this.$swal('يوجد خلل فني', 'خطاء في الارسال', 'error')
            }
          })
      }
    },
    async update () {
        let data = new FormData()
        this.editValidater()
        Object.keys(this.formEditlang).forEach((key) => {
            if (this.formEditlang[key] || this.formEditlang[key] !== '') {
            data.append(key, this.formEditlang[key])
            }
        })
        data.append('tbable_id', this.$route.params.id)
        data.append('_method', 'PUT')
        this.loader = true
        await this.axios
        .post(`meal/lang/${this.formEdit.id}`, data)
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
          `meal/lang/${this.$route.params.id}`
        )
        .then((res) => {
          this.items = res.data
          this.loader = false 
        })
        .catch(() => {
          this.loader = false 
        })
    },
    getLanguages () {
      this.axios
        .get(
          `language?take=1000&skip=0`
        )
        .then((res) => {
          res.data.items.forEach((item) => {
            this.languages.push({ text: item.name, value: item.id })
          })
        })
        .catch(() => {})
    },
    deleteItem () {
      this.loader = true
      this.axios
        .delete(`lang/body/${this.id}`)
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
      if (!this.formAdd.title) {
        dataError.status = 400
        dataError.message = 'يرجى اضافة عنوان'
        return dataError
      }
      if (!this.formAdd.description) {
        dataError.status = 400
        dataError.message = 'يرجى اضافة تفاصيل '
        return dataError
      }
      if (!this.formAdd.lang_id) {
        dataError.status = 400
        dataError.message = 'يرجى اختيار اللغة'
        return dataError
      }
      dataError.status = 200
      dataError.message = 'success'
      return dataError
    },
    editValidater () {
      if (this.formEdit.title) {
        this.formEditlang.title = this.formEdit.title
      }
      if (this.formEdit.description) {
        this.formEditlang.description = this.formEdit.description
      }
      if (this.formEdit.lang_id) {
        this.formEditlang.lang_id = this.formEdit.lang_id
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
