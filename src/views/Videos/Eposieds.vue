<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-row class="justify-content-between">
          <b-col class="d-flex align-items-center pl-3">
            <button
              type="button"
              class="btn btn-primary add"
              @click="$bvModal.show('addSeasonModal')"
            >
              Add +
            </button>
          </b-col>
          <b-col md="6" class="d-flex">
            <b-input
              class="mr-3"
              type="search"
              placeholder="Search By Episode Number"
              v-model="search"
              @keyup.enter="getAllSeasons"
            ></b-input>
          </b-col>
        </b-row>
        <br />
        <!-- add seasons v2 -->
        <b-modal id="addSeasonModal" hide-footer>
          <div class="mb-3">
            <label
              ><span style="color: red">* </span> Enter Episode Number</label
            >
            <b-form-input
              type="number"
              v-model="formAdd.number"
              placeholder="Enter Season Number"
            ></b-form-input>
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
              @click="addSeason"
            >
              Submit
            </button>
          </div>
        </b-modal>
        <!-- end of add season v2 -->
        <!-- edit season modal -->
        <b-modal id="editSeasonModal" hide-footer>
          <div class="mb-3">
            <label
              ><span style="color: red">* </span> Enter Episode Number</label
            >
            <b-form-input
              type="number"
              v-model="formEdit.number"
              placeholder="Enter Season Number"
            ></b-form-input>
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
              @click="editSeason"
            >
              Submit
            </button>
          </div>
        </b-modal>
        <!--end edit season modal -->
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
                    v-on:click="deleteSeason"
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
            <h4 class="card-title">Episodes List</h4>
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
                <b-th>episode</b-th>
                <b-th>created at</b-th>
                <b-th>updated at</b-th>
                <b-th>Action</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in seasons" :key="index">
                  <b-td>episode {{ item.number }}</b-td>
                  <b-td>{{ item.created_at }}</b-td>
                  <b-td>{{ item.updated_at }}</b-td>
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
  mounted () {
    core.index()
    this.getAllSeasons()
  },
  watch: {
    currentPage: {
      handler: function () {
        this.getAllSeasons()
      }
    }
  },
  data () {
    return {
      search: '',
      loader: true,
      perPage: 10,
      currentPage: 1,
      rows: 0,
      imageShow: '',
      message: '',
      file1: '',
      seasons: [],
      hidsModal: null,
      chackFile: false,
      SeasonId: null,
      formAdd: {
        number: null
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
        }
      ]
    }
  },
  methods: {
    editPopup (item) {
      this.formEdit = item
      this.$bvModal.show('editSeasonModal')
    },
    deletePopup (id) {
      this.SeasonId = id
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
    getAllSeasons () {
      this.loader = true
      let pageNumber = this.currentPage - 1
      let pageSkip = pageNumber * this.perPage
      this.axios
        .get(
          `episode?take=${this.perPage}&skip=${pageSkip}&filter[number]=${this.search}`
        )
        .then((res) => {
          this.seasons = res.data.items
          this.rows = res.data.totalCount
          this.loader = false
        })
        .catch(() => {})
    },
    closeDeleteModal () {
      document.getElementById('close-delete').click()
    },
    addSeason () {
      if (this.addValidater().status === 400) {
        this.$swal('خطأ في الادخال', this.addValidater().message, 'error')
      } else {
        this.loader = true
        let formData = new FormData()
        formData.append('number', this.formAdd.number)
        this.axios
          .post('episode', formData)
          .then(() => {
            this.formAdd.number = null
            this.getAllSeasons()
            this.loader = false
            this.$swal('تمت الاضافة بنجاح', '', 'success')
            this.$bvModal.hide('addSeasonModal')
          })
          .catch((res) => {
            if (
              res.response.data.number[0] ===
              'The number has already been taken.'
            ) {
              this.$swal('الحلقة مكررة', 'يرجى اختيار رقم غير مكرر', 'error')
              return ''
            } else {
              this.$swal('يوجد خلل فني', '', 'error')
            }
          })
      }
    },
    editSeason () {
      this.loader = true
      var formData = new FormData()
      if (this.formEdit.number) {
        formData.append('number', this.formEdit.number)
      }
      formData.append('_method', 'PUT')
      this.axios.post(`episode/${this.formEdit.id}`, formData).then(() => {
        this.$bvModal.hide('editSeasonModal')
        this.getAllSeasons()
        this.loader = false
        this.$swal('تم التعديل بنجاح', '', 'success')
      })
    },
    deleteSeason () {
      this.loader = true
      this.axios
        .delete(`episode/${this.SeasonId}`)
        .then((res) => {
          this.closeDeleteModal()
          this.getAllSeasons()
          this.loader = false
        })
        .catch((res) => {
          this.$swal('يوجد خلل فني', '', 'error')
        })
    },
    addValidater () {
      let dataError = {
        status: null,
        message: ''
      }
      if (!this.formAdd.number) {
        dataError.status = 400
        dataError.message = 'يرجى اختيار رقم الموسم'
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
