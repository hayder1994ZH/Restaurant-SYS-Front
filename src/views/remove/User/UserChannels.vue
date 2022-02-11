<template>
  <b-container fluid>
    <b-row>
      <!-- show image modal -->
      <div class="modal fade" id="showImage" tabindex="-1" role="dialog" aria-labelledby="showImageLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <img :src="imageShow" alt="">
              </div>
          </div>
      </div>
      <!-- end show image modal -->
        <!-- edit User modal -->
        <div class="modal fade" id="editUserModal" tabindex="-1" role="dialog" aria-labelledby="editUserModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content" style="padding: 1rem;">
                  <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body">
                     <form action="#">
                      <div class="form-row">
                        <div class="col-md-12 mb-12">
                          <label for="validationDefault01">Name</label>
                          <input type="text" v-model="formEdit.full_name" class="form-control" id="validationDefault01" required>
                        </div>
                        <div class="col-md-12 mb-12" style="margin-top: 1rem;">
                          <select class="custom-select" v-model="formEdit.gender_id">
                            <option
                              v-for="gender in genders"
                              v-bind:value="gender.id"
                              :key="gender.id"
                            >
                              {{ gender.type }}
                            </option>
                          </select>
                        </div>
                        <div class="col-md-12 mb-12" style="margin-top: 1rem;">
                          <select class="custom-select" v-model="formEdit.age_range_id">
                            <option
                              v-for="ageRange in ageRanges"
                              v-bind:value="ageRange.id"
                              :key="ageRange.id"
                            >
                              {{ ageRange.age_from + ' - ' + ageRange.age_to }}
                            </option>
                          </select>
                        </div>
                        <label >Image</label>
                        <div class="custom-file">
                          <b-form-file
                            v-model="formEdit.image"
                            :state="Boolean(formEdit.image)"
                            placeholder="Choose a file or drop it here..."
                            drop-placeholder="Drop file here..."
                          ></b-form-file>
                          <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                        </div>
                        <label >Cover Image</label>
                        <div class="custom-file">
                          <b-form-file
                            v-model="formEdit.cover_image"
                            :state="Boolean(formEdit.cover_image)"
                            placeholder="Choose a file or drop it here..."
                            drop-placeholder="Drop file here..."
                          ></b-form-file>
                          <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                        </div>
                      </div>
                      <div class="form-group submit-form">
                        <button type="button" class="btn btn-secondary" id="close" data-dismiss="modal">Close</button>
                        <button class="btn btn-primary submit-button" type="submit" v-on:click="editUser()">Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
            </div>
        </div>
        <!--end edit User modal -->
        <!-- delete modal -->
        <div class="modal fade" style="margin-top:15rem;" id="deleteChannelUserModal" tabindex="-1" role="dialog" aria-labelledby="deleteChannelUserModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div>
                    <h3 style="text-align: center; margin-bottom:2rem">هل حقا ترغب في حذف العنصر ؟</h3>
                    <div class="form-group form-delete ">
                      <button type="button" class="btn btn-secondary" id="close-delete" data-dismiss="modal">Close</button>
                      <b-button variant="outline-danger" class="delete-btn"  v-on:click="deleteChannelUser" >delete</b-button>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <!-- end delete modal -->
        <!-- Error modal -->
        <b-modal id="modal-1" title="Error">
          <p class="my-4" style="text-align: center;font-size: 2rem;">{{message}}</p>
        </b-modal>
        <!-- end Error modal -->
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">User Channels</h4>
          </template>
          <template v-slot:headerAction>
            <a class="text-primary float-right" v-b-toggle.collapse-10 role="button">
              <i class="ri-code-s-slash-line" />
            </a>
          </template>
          <template v-slot:body>
            <b-collapse id="collapse-10" class="mb-2">
              <div class="card">
                <kbd class="bg-dark">
                </kbd>
              </div>
            </b-collapse>
            <b-table-simple responsive>
              <b-thead>
                <b-th>#</b-th>
                <b-th>name</b-th>
                <b-th>age range</b-th>
                <b-th>gender type</b-th>
                <b-th>Image</b-th>
                <b-th>Cover Image</b-th>
                <b-th>created at</b-th>
                <b-th>Action</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in items" :key="index">
                  <b-th>{{item.id}}</b-th>
                  <b-th>{{item.full_name}}</b-th>
                  <b-th>{{item.age_range.age_from + ' - ' + item.age_range.age_to}}</b-th>
                  <b-th>{{item.gender.type}}</b-th>
                  <b-th>
                    <img :src="item.imageChannel" class="image-url"  data-toggle="modal" data-target="#showImage"  v-on:click="imageUrl(item.imageChannel)" alt="">
                  </b-th>
                  <b-th>
                    <img :src="item.coverImageChannel" class="image-url"  data-toggle="modal" data-target="#showImage" v-on:click="imageUrl(item.coverImageChannel)" alt="">
                  </b-th>
                  <b-th>{{ item.created_at }}</b-th>
                  <b-td>
                    <template>
                      <b-button variant=" iq-bg-success mr-1 mb-1" data-toggle="modal" data-target="#editUserModal" data-whatever="@getbootstrap" v-on:click="editPopup(item)" v- size="sm" ><i class="ri-ball-pen-fill m-0"></i></b-button>
                      <b-button variant=" iq-bg-danger" data-toggle="modal" data-target="#deleteChannelUserModal"  v-on:click="deletePopup(item.id)"  data-whatever="@getbootstrap" size="sm" ><i class="ri-delete-bin-line m-0"></i></b-button>
                    </template>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
export default {
  name: 'UserList',
  mounted () {
    this.getAllData()
    core.index()
  },
  data () {
    return {
      imageShow: '',
      message: '',
      ErrorUserModal: false,
      userId: '',
      genders: [],
      ageRanges: [],
      items: [],
      formEdit: [],
      formAdd: []
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  watch: {
    id () {
      this.getAllData()
    }
  },
  methods: {
    getAllData () {
      this.axios
        .get(`channel?take=10&filter[user_id]=${this.id}`)
        .then((res) => {
          this.items = res.data.items
        })
        .catch(() => {
        })
    },
    imageUrl (image) {
      this.imageShow = image
    },
    editPopup (item) {
      this.formEdit = item
      console.log(this.formEdit)
      this.ageRange()
      this.gender()
    },
    deletePopup (id) {
      this.userId = id
    },
    closeModal () {
      document.getElementById('close').click()
    },
    closeDeleteModal () {
      document.getElementById('close-delete').click()
    },
    errorModal () {
      this.closeModal()
      this.$bvModal.show('modal-1')
    },
    editUser () {
      if (this.editValidate() !== 400) {
        var formData = new FormData()
        formData.append('full_name', this.formEdit.full_name)
        formData.append('gender_id', this.formEdit.gender_id)
        formData.append('age_range_id', this.formEdit.age_range_id)
        if (this.formEdit.image !== undefined) {
          formData.append('image', this.formEdit.image)
        }
        if (this.formEdit.cover_image !== undefined) {
          formData.append('cover_image', this.formEdit.cover_image)
        }
        formData.append('_method', 'PUT')
        console.log(this.formEdit)
        this.axios
          .post(`channelss/${this.formEdit.id}`, formData)
          .then(() => {
            this.closeModal()
            this.getAllData()
            this.errorModal()
          })
          .catch((res) => {
            if (res.response.status === 400) {
              this.message = 'يرجى ملئ المعلومات'
            } else {
              this.message = 'يوجد خلل فني'
            }
            this.errorModal()
          })
      }
    },
    deleteChannelUser () {
      this.axios
        .delete(`channel/${this.userId}`)
        .then((res) => {
          this.closeDeleteModal()
          this.getAllData()
        })
        .catch(() => {
        })
    },
    gender () {
      this.axios
        .get('gender?take=20')
        .then((res) => {
          this.genders = res.data.items
        })
        .catch(() => {
        })
    },
    ageRange () {
      this.axios
        .get('age/range?take=20')
        .then((res) => {
          this.ageRanges = res.data.items
        })
        .catch(() => {
        })
    },
    editValidate () {
      if (this.formEdit.full_name === null || this.formEdit.full_name === undefined) {
        return 400
      }
      if (this.formEdit.age_range_id === null || this.formEdit.age_range_id === undefined) {
        return 400
      }
      if (this.formEdit.gender_id === null || this.formEdit.gender_id === undefined) {
        return 400
      }
    }
  }
}
</script>
<style scoped>
.image-url{
  width: 4rem !important;
  height: 4rem !important;
}
.add{
  margin-bottom: 1rem !important;
}
.submit-button{
  margin: .5rem !important;
}
.submit-form{
  float: right;
}
.delete-btn{
  margin-left: 1rem !important;
}
.form-delete{
  margin-left: 11rem;
}
</style>
