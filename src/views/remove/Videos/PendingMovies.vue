<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-row class="justify-content-between">
          <b-col class="d-flex align-items-center pl-3">
            <button
              type="button"
              class="btn btn-primary add"
              data-toggle="modal"
              data-target="#addMovieModal"
              data-whatever="@getbootstrap"
              @click="goTo('upload.movie-upload')"
            >
              Add +
            </button>
          </b-col>
          <b-col md="6" class="d-flex">
            <b-input
              class="mr-3"
              type="search"
              placeholder="Search Items"
              v-model="search"
              @keyup.enter="getAllMovie"
            ></b-input>
          </b-col>
        </b-row>
        <br />
        <!-- show image modal -->
        <div
          class="modal fade"
          style="margin-top: 4rem"
          id="showImage"
          tabindex="-1"
          role="dialog"
          aria-labelledby="showImageLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content" style="height: 645px">
              <img :src="imageShow" alt />
            </div>
          </div>
        </div>
        <!-- end show image modal -->
        <!-- edit Movie modal -->
        <div
          class="modal fade"
          id="editMovieModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="editMovieModalLabel"
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
                        ><span style="color: red">* </span> Title</label
                      >
                      <input
                        type="text"
                        v-model="formEdit.title"
                        class="form-control"
                        id="validationDefault01"
                        required
                      />
                    </div>
                    <div class="col-md-12 mb-12">
                      <label for="validationDefault02"
                        ><span style="color: red">* </span> Details</label
                      >
                      <input
                        type="text"
                        v-model="formEdit.details"
                        class="form-control"
                        id="validationDefault02"
                        required
                      />
                    </div>
                    <label> Image poster</label>
                    <div class="custom-file">
                      <b-form-file
                        v-model="formEdit.image_poster"
                        :state="Boolean(formEdit.image_poster)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                      ></b-form-file>
                      <label class="custom-file-label" for="validatedCustomFile"
                        >Choose image poster...</label
                      >
                    </div>
                    <label> Image mobile</label>
                    <div class="custom-file">
                      <b-form-file
                        v-model="formEdit.image_mobile"
                        :state="Boolean(formEdit.image_mobile)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                      ></b-form-file>
                      <label class="custom-file-label" for="validatedCustomFile"
                        >Choose image mobile...</label
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
                      v-on:click="editMovies"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!--end edit Movie modal -->
        <!-- upload video popup -->
        <div
          class="modal fade"
          id="uploadVideoPopup"
          tabindex="-1"
          role="dialog"
          aria-labelledby="uploadVideoPopupLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content" style="padding: 1rem">
              <div class="modal-header">
                <h5>Upload Video to File</h5>
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
                <b-form action="#">
                  <b-form-group
                    id="input-group-3"
                    label="Choose File Type:"
                    label-for="input-3"
                  >
                    <b-form-select
                      id="input-3"
                      v-model="videoFile.type"
                      :options="type"
                      required
                    ></b-form-select>
                  </b-form-group>
                  <b-form-group
                    id="input-group-3"
                    label="Choose GPU:"
                    label-for="input-3"
                  >
                    <b-form-select
                      id="input-3"
                      v-model="videoFile.gpu"
                      :options="gpu"
                      required
                    ></b-form-select>
                  </b-form-group>
                  <b-form-group label="Episode File">
                    <b-form-file
                      v-model="videoFile.file"
                      :state="Boolean(videoFile.file)"
                      placeholder="Choose an Video or drop it here..."
                      drop-placeholder="Drop Video here..."
                    ></b-form-file>
                  </b-form-group>
                  <b-form-group class="w-100 m-0 mb-2">
                    <b-progress
                      :value="progressInfo.presentage"
                      max="100"
                      show-value
                    ></b-progress>
                    <!-- progress info -->
                    <div class="loding">
                      <p>
                        uploaded: ({{
                          progressInfo.loaded
                            ? bytesToSize(progressInfo.loaded)
                            : '0'
                        }}) from ({{
                          progressInfo.total
                            ? bytesToSize(progressInfo.total)
                            : '0'
                        }})
                      </p>
                      <p>
                        <span
                          >{{
                            progressInfo.presentage
                              ? progressInfo.presentage
                              : '0'
                          }}%</span
                        >
                        <span class="mx-3"> | </span>
                        <span
                          >{{
                            progressInfo.netSpeed
                              ? bytesToSize(progressInfo.netSpeed)
                              : '0 kb'
                          }}/s</span
                        >
                      </p>
                    </div>
                    <!-- end of progress info -->
                  </b-form-group>
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
                      @click.prevent="manageUpload"
                      class="btn btn-primary submit-button"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </b-form>
              </div>
            </div>
          </div>
        </div>
        <!-- end of upload video popup -->
        <!-- delete modal -->
        <div
          class="modal fade"
          style="margin-top: 15rem"
          id="deleteMovieModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="deleteMovieModalLabel"
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
                    v-on:click="deleteMovie"
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
            <h4 class="card-title">Movie</h4>
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
                <b-th>uploader</b-th>
                <b-th>image mobile</b-th>
                <b-th>image poster</b-th>
                <b-th>created_date</b-th>
                <b-th>updated date</b-th>
                <b-th>Action feiled</b-th>
                <b-th>total downloads</b-th>
                <b-th>total size</b-th>
                <b-th>total views</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in items" :key="index">
                  <b-td>{{ item.title }}</b-td>
                  <b-td>{{ item.user.full_name }}</b-td>
                  <b-td>
                    <img
                      :src="item.imageMobiles"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.imageMobiles)"
                      alt
                    />
                  </b-td>
                  <b-td>
                    <img
                      :src="item.imagePosters"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.imagePosters)"
                      alt
                    />
                  </b-td>
                  <b-td>{{ item.created_at }}</b-td>
                  <b-td>{{ item.updated_at }}</b-td>
                  <b-td v-if="!item.video_object"
                    ><span class="no-btn no-btn__has-no-video"
                      >has no video</span
                    ></b-td
                  >
                  <b-td v-else-if="item.video_object.s3 === '0'"
                    ><span class="no-btn no-btn__pended">pending</span></b-td
                  >
                  <b-td v-else-if="item.video_object.s3 === '1'"
                    ><span class="no-btn no-btn__not-transcoded"
                      >Not Trsnscoded</span
                    ></b-td
                  >
                  <b-td
                    v-else-if="
                      item.video_object.s3 === '2' &&
                      !item.video_object.resulotion_url
                    "
                    ><span class="no-btn no-btn__in-transcode"
                      >In Trsnscode</span
                    ></b-td
                  >
                  <b-td>
                    <template>
                      <div class="controls">
                        <b-button
                          v-if="
                            item.video_object && item.video_object.s3 === '1'
                          "
                          class="custom-btn mr-2 mr-2"
                          variant=" iq-bg-success"
                          v-on:click="sendVideoToTranscode(item)"
                          size="sm"
                          title="send video to transcode"
                        >
                          <i class="fas fa-upload m-0"></i>
                        </b-button>
                        <b-button
                          v-if="!item.video_object"
                          class="custom-btn mr-2"
                          variant="warning"
                          data-toggle="modal"
                          data-target="#uploadVideoPopup"
                          data-whatever="@getbootstrap"
                          v-on:click="uploadPopup(item)"
                          size="sm"
                        >
                          <i class="fas fa-upload m-0"></i>
                        </b-button>
                        <b-button
                          class="custom-btn mr-2"
                          variant=" iq-bg-success"
                          data-toggle="modal"
                          data-target="#editMovieModal"
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
                          data-target="#deleteMovieModal"
                          v-on:click="deletePopup(item.id)"
                          data-whatever="@getbootstrap"
                          size="sm"
                        >
                          <i class="ri-delete-bin-line m-0"></i>
                        </b-button>
                      </div>
                    </template>
                  </b-td>
                  <b-td>{{ item.total_downloads }}</b-td>
                  <b-td>{{ bytesToSize(item.video_object.size) }}</b-td>
                  <b-td>{{ item.total_views }}</b-td>
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
  name: 'Movies',
  components: { Loader },
  mounted () {
    core.index()
    this.getAllMovie()
    this.getAllSubCategory()
    this.getAllGenders()
    this.getAllAgeRanges()
  },
  watch: {
    chunks (n) {
      if (n.length > 0) {
        this.uploadChunks()
      }
    },
    currentPage: {
      handler: function () {
        this.getAllMovie()
      }
    }
  },
  data () {
    return {
      search: '',
      loader: false,
      imageShow: '',
      videoShow: '',
      rows: 0,
      perPage: 10,
      currentPage: 1,
      message: '',
      hidsModal: null,
      chackFile: false,
      MovieId: null,
      items: [],
      subcategories: [],
      genders: [],
      ageRanges: [],
      formAdd: [],
      formEdit: [],
      type: [
        {
          text: 'Choose File Type',
          value: null
        },
        {
          text: 'FHD',
          value: 'FHD'
        }
      ],
      gpu: [
        {
          text: 'Choose File GPU',
          value: null
        },
        {
          text: 'gpu1',
          value: 'gpu1'
        }
      ],
      videoFile: {
        type: null,
        gpu: null,
        file: null
      },
      chunks: [],
      uploadCount: 0,
      chunksCount: 0,
      count: 0,
      uploaded: 0,
      speeds: [],
      progressInfo: {
        loaded: 0,
        total: 0,
        presentage: 0,
        netSpeed: 0
      }
    }
  },
  methods: {
    sendVideoToTranscode (item) {
      let key = []
      key.push(item.video_object.id)
      let data = { ids: key }
      this.axios
        .post(`transcoder/send/objects`, data)
        .then((res) => {
          this.getAllMovie()
          return res
        })
        .catch((err) => {
          this.$swal('حدث خطأ في الاتصال', '', 'error')
          return err
        })
    },
    uploadPopup (item) {
      this.videoId = item.id
    },
    closeDeleteModal () {
      document.getElementById('close-delete').click()
    },
    manageUpload () {
      if (!this.videoFile.type) {
        this.$swal('خطأ في الادخال', 'يرجى اختيار نوع الفايل', 'error')
        return '400'
      }
      if (!this.videoFile.gpu) {
        this.$swal('خطأ في الادخال', 'يرجى اختيار  الgpu', 'error')
        return '400'
      }
      if (!this.videoFile.file) {
        this.$swal('خطأ في الادخال', 'يرجى اختيار الفايل', 'error')
        return '400'
      }

      this.createChunks()
    },
    // chuncks
    createChunks (index) {
      let size = 10000 * 2048
      let chunks = Math.ceil(this.videoFile.file.size / size)
      this.chunksCount = chunks
      for (let i = 0; i < chunks; i++) {
        this.chunks.push(
          this.videoFile.file.slice(
            i * size,
            Math.min(i * size + size, this.videoFile.file.size),
            this.videoFile.file.type
          )
        )
      }
    },
    formDataq (index) {
      this.count++
      let formData = new FormData()
      if (this.count === this.chunksCount) {
        formData.set('is_last', true)
      } else {
        formData.set('is_last', false)
      }
      formData.set('video', this.chunks[0], `${this.videoFile.file.name}.part`)
      formData.append('name', this.videoFile.file.name)
      formData.append('size', this.videoFile.file.size)
      formData.append('gpu', this.videoFile.gpu)
      formData.append('type', this.videoFile.type)
      if (this.count === 1) {
        formData.append('first', true)
      }
      return formData
    },
    async uploadChunks () {
      let prevLoad = 0
      await this.axios
        .post(`movie/upload/chunk/${this.videoId}`, this.formDataq(), {
          headers: {
            'Content-Type': 'application/octet-stream'
          },
          onUploadProgress: (progressEvent) => {
            if (parseInt(progressEvent.loaded) > this.uploaded) {
              this.uploaded = parseInt(progressEvent.loaded)
            } else {
              this.uploaded += parseInt(progressEvent.loaded) - prevLoad
              prevLoad = parseInt(progressEvent.loaded)
            }

            let percentComplete = this.uploaded / this.videoFile.file.size
            percentComplete = parseInt(percentComplete * 100)
            this.progressInfo.presentage = percentComplete

            this.progressInfo.total = this.videoFile.file.size

            this.progressInfo.loaded = this.uploaded
            this.speeds.push(parseInt(progressEvent.loaded))
            this.progressInfo.netSpeed =
              this.speeds.slice(-1)[0] - this.speeds.slice(-2)[0]
          }
        })
        .then((response) => {
          if (response.data.uploaded === 'uploaded successfully') {
            this.$swal('تم رفع الملفات بنجاح', '', 'success')
            this.videoFile = []
            this.percentComplete = 0
            this.progressInfo.total = 0
            this.progressInfo.presentage = 0
            this.progressInfo.loaded = 0
            this.progressInfo.netSpeed = 0
            this.getAllMovie()
          }
          this.chunks.shift()
          if (this.count === this.chunksCount) {
            this.count = 0
            this.uploaded = 0
          }
        })
        .catch((res) => {
          this.$swal('تم الغاء الرفع', 'حدث خطأ في الاتصال', 'error')
        })
    },
    // end of chunk
    goTo (path) {
      this.$router.push({ name: path })
    },
    editPopup (item) {
      this.formEdit = item
    },
    deletePopup (id) {
      this.MovieId = id
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
    getAllSubCategory () {
      this.axios
        .get('subcategory?take=1000')
        .then((res) => {
          this.subcategories = res.data.items
        })
        .catch(() => {})
    },
    getAllGenders () {
      this.axios
        .get('gender?take=1000')
        .then((res) => {
          this.genders = res.data.items
        })
        .catch(() => {})
    },
    getAllAgeRanges () {
      this.axios
        .get('age/range?take=1000')
        .then((res) => {
          this.ageRanges = res.data.items
        })
        .catch(() => {})
    },
    editMovies () {
      this.loader = true
      var formData = new FormData()
      formData.append('title', this.formEdit.title)
      formData.append('details', this.formEdit.details)
      formData.append('subcategory_id', this.formEdit.subcategory_id)
      if (this.formEdit.image_poster) {
        formData.append('image_poster', this.formEdit.image_poster)
      }
      if (this.formEdit.image_mobile) {
        formData.append('image_mobile', this.formEdit.image_mobile)
      }
      formData.append('_method', 'PUT')
      this.axios
        .post(`movie/${this.formEdit.id}`, formData)
        .then(() => {
          this.closeEditModal()
          this.getAllMovie()
          this.loader = false
          this.$swal('تم التعديل بنجاح', '', 'Success')
        })
        .catch((res) => {
          this.$swal('يرجى ملئ المعلومات', '', 'error')
        })
    },
    getAllMovie () {
      this.loader = true
      let pageNumber = this.currentPage - 1
      let pageSkip = pageNumber * this.perPage
      this.axios
        .get(
          `movie/not/production?take=${this.perPage}&skip=${pageSkip}&filter[subcategory_id]=5&filter[title]=${this.search}`
        )
        .then((res) => {
          this.items = res.data.items
          this.rows = res.data.totalCount
          this.loader = false
        })
    },
    deleteMovie () {
      this.loader = true
      this.axios
        .delete(`movie/${this.MovieId}`)
        .then((res) => {
          this.closeDeleteModal()
          this.getAllMovie()
          this.loader = false
        })
        .catch((res) => {
          if (res.response.status === 404) {
            this.$swal('العنصر غير موجود', '', 'error')
          }
          this.$swal('يوجد خلل فني', '', 'error')
        })
    },
    bytesToSize (bytes, decimals = 2) {
      if (bytes === 0) return '0 bytes'

      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      const sum = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))

      return sum + ' ' + sizes[i]
    }
  }
}
</script>
<style scoped>
.loding {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.3rem;
}
.controls {
  display: flex;
  align-items: center;
}
.custom-btn mr-2 {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50% !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.no-btn {
  display: block;
  width: 150px;
  padding: 0.3rem 0.5rem;
  border-radius: 1rem;
  border: 1px solid;
}
.no-btn__has-no-video {
  color: #e74c3c;
  border-color: #e74c3c;
}
.no-btn__pended {
  color: #e67e22;
  border-color: #e67e22;
}
.no-btn__not-transcoded {
  color: #f1c40f;
  border-color: #f1c40f;
}
.no-btn__in-transcode {
  color: #2980b9;
  border-color: #2980b9;
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
