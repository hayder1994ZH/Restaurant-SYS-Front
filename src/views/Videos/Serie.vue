<template>
  <b-container fluid>
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
                v-on:click="deleteEpisode"
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
    <!-- show video modal -->
    <b-modal id="videoShow" hide-footer size="xl">
      <vue-core-video-player :src="videoSource"></vue-core-video-player>
    </b-modal>
    <!-- end show video modal -->
    <!-- edit Video modal -->
    <!-- add image to season modal -->
    <div
      class="modal fade"
      id="addImageToSeason"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addImageToSeasonLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content" style="padding: 1rem">
          <div class="modal-header">
            <h5>Add Image To Season</h5>
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
                label="Choose Season:"
                label-for="input-3"
              >
                <b-form-select
                  id="input-3"
                  v-model="season_id"
                  :options="seasonsList"
                  required
                ></b-form-select>
              </b-form-group>
              <b-form-group label="Choose Season Image">
                <b-form-file
                  v-model="seasonImage"
                  :state="Boolean(seasonImage)"
                  placeholder="Choose an image or drop it here..."
                  drop-placeholder="Drop image here..."
                ></b-form-file>
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
                  @click.prevent="changeSeasonImage"
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
    <!--end add image to season modal -->
    <!-- add episode to season modal -->
    <b-modal
      class="modal fade"
      id="addEpisodeToSeason"
      hide-footer
      size="lg"
      title="Add Episode To Season"
    >
      <div>
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
                  progressInfo.loaded ? bytesToSize(progressInfo.loaded) : '0'
                }}) from ({{
                  progressInfo.total ? bytesToSize(progressInfo.total) : '0'
                }})
              </p>
              <p>
                <span
                  >{{
                    progressInfo.presentage ? progressInfo.presentage : '0'
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
    </b-modal>
    <!--end add episode to season modal -->
    <b-row>
      <b-col sm="12" class="d-flex align-items-center justify-content-between">
        <dir>
          <b-button
            v-for="(season, index) in seasons"
            :key="index"
            type="button"
            class="add mr-3"
            :class="{ active: season.season_id === seasonId }"
            data-toggle="modal"
            data-target="#addMovieModal"
            data-whatever="@getbootstrap"
            @click="getEpisodes(season.season_id)"
          >
            Season {{ season.season }}
          </b-button>
        </dir>
        <div>
          <b-button
            type="button"
            class="mr-3"
            variant="primary"
            @click="goTo('upload.upload-season')"
            >Add Season</b-button
          >
          <b-button
            @click="$bvModal.show('addEpisodeToSeason')"
            type="button"
            class="mr-3"
            variant="primary"
            >Add Episode</b-button
          >
          <b-button
            data-toggle="modal"
            data-target="#addImageToSeason"
            data-whatever="@getbootstrap"
            type="button"
            class="mr-3"
            variant="primary"
            >Add Image To Season</b-button
          >
        </div>
      </b-col>
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Series</h4>
          </template>
          <template v-slot:headerAction>
            <b-button variant="primary" @click="transcodeAll"
              >Transcode All</b-button
            >
          </template>
          <template v-slot:body>
            <b-table-simple responsive v-if="episodes.length">
              <b-thead>
                <b-th>title</b-th>
                <b-th>video</b-th>
                <b-th>Season Image</b-th>
                <b-th>status</b-th>
                <b-th>transcode</b-th>
                <b-th>actions</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in episodes" :key="index">
                  <b-td>
                    Season {{ item.season }} Episode {{ item.eposide }}
                  </b-td>
                  <b-td>
                    <template>
                      <b-button
                        class="custom-btn mr-2"
                        variant=" iq-bg-success"
                        v-on:click="videoPopup(item.resolution_url)"
                        size="sm"
                      >
                        <i class="ri-play-fill m-0"></i>
                      </b-button>
                    </template>
                  </b-td>
                  <b-td>
                    <img
                      :src="item.imageSeason"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.imageSeason)"
                      alt
                    />
                  </b-td>
                  <b-td v-if="item.s3 === '0'"
                    ><span class="no-btn no-btn__pended">pending</span></b-td
                  >
                  <b-td v-else-if="item.s3 === '1'"
                    ><span class="no-btn no-btn__not-transcoded"
                      >Not Trsnscoded</span
                    ></b-td
                  >
                  <b-td v-else-if="item.s3 === '2' && item.resolution_url"
                    ><span class="no-btn no-btn__transcoded"
                      >transcoded</span
                    ></b-td
                  >
                  <b-td v-else
                    ><span class="no-btn no-btn__in-transcode"
                      >In Trsnscode</span
                    ></b-td
                  >
                  <b-td v-if="item.s3 === '1' && transcode[index]">
                    <b-form-checkbox
                      v-model="transcode[index].checked"
                      value="true"
                      unchecked-value="false"
                    >
                    </b-form-checkbox>
                  </b-td>
                  <b-td v-else-if="item.s3 !== '1' && transcode[index]">
                    <b-form-checkbox
                      disabled
                      v-model="transcode[index].checked"
                      value="true"
                      unchecked-value="false"
                    >
                    </b-form-checkbox>
                  </b-td>
                  <b-td>
                    <template>
                      <b-button
                        v-if="item.s3 === '1'"
                        class="custom-btn mr-2 mr-2"
                        variant=" iq-bg-success"
                        v-on:click="sendVideoToTranscode(item)"
                        size="sm"
                        title="send video to transcode"
                      >
                        <i class="fas fa-upload m-0"></i>
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
  name: 'Serie',
  components: { Loader },
  mounted () {
    core.index()
  },
  data () {
    return {
      transcode: [],
      loader: false,
      seasonImage: null,
      season_id: null,
      seasonsList: [{ text: 'Choose Season', value: null }],
      imageShow: '',
      seasonId: null,
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
      episodes: [],
      seasons: [],
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
        season: null,
        type: null,
        gpu: null,
        episode: null,
        file: null
      },
      episode: null,
      chunks: [],
      seasonsListAdd: [{ text: 'Choose Season', value: null }],
      episodesListAdd: [{ text: 'Choose Episode', value: null }],
      chunksCount: 0,
      count: 0,
      uploaded: 0,
      speeds: [],
      progressInfo: {
        loaded: 0,
        total: 0,
        presentage: 0,
        netSpeed: 0
      },
      videoSource: []
    }
  },
  watch: {
    chunks (n) {
      if (n.length > 0) {
        this.uploadChunks()
      }
    }
  },
  async created () {
    await this.getSeasonsById()
    await this.getAllSeasons()
    await this.getEpisodes(this.seasonId)
    this.getAllEpisodes()
  },
  methods: {
    transcodeAll () {
      let keys = []
      this.transcode.forEach((item) => {
        if (item.checked) {
          keys.push(item.id)
        }
      })
      let data = { ids: keys }
      this.axios
        .post('transcoder/send/objects', data)
        .then(() => {
          this.transcode.forEach((item, index) => {
            this.transcode[index].id = ''
            this.transcode[index].checked = false
          })
          this.getEpisodes(this.seasonId)
        })
        .catch(() => {
          this.$swal('حدث خطأ في الاتصال', '', 'error')
        })
    },
    sendVideoToTranscode (item) {
      let key = []
      key.push(item.id)
      let data = { ids: key }
      this.axios
        .post(`transcoder/send/objects`, data)
        .then(() => {
          this.getEpisodes(this.seasonId)
          this.$swal('تم تحويل الملف بنجاح', '', 'success')
        })
        .catch(() => {
          this.$swal('حدث خطأ في الاتصال', '', 'error')
        })
    },
    goTo (path) {
      this.$router.push({ name: path, params: { id: this.$route.params.id } })
    },
    deletePopup (id) {
      this.episode = id
    },
    closeDeleteModal () {
      document.getElementById('close-delete').click()
    },
    deleteEpisode () {
      this.axios.delete(`episode/series/${this.episode}`).then((res) => {
        this.closeDeleteModal()
        this.getEpisodes(this.seasonId)
        this.$swal('تم حذف العنصر بنجاح', '', 'success')
      })
    },
    videoPopup (resolutionUrl) {
      this.videoSource = []
      if (resolutionUrl == null) {
        this.$swal(
          'خطأ في التشغيل',
          'هذا العنصر ليس  لديه فيديو لتشغيله',
          'error'
        )
      }
      if (resolutionUrl[0]) {
        resolutionUrl.forEach((video) => {
          this.videoSource.push({
            src: video.videoUrl,
            resolution: video.resolution
          })
        })
        this.$bvModal.show('videoShow')
      } else {
        this.$swal('خطأ في التشغيل', 'هذا العنصر لم يتم تحويله بعد', 'error')
      }
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
        .post(
          `series/upload/chunk/${this.$route.params.id}`,
          this.formDataq(),
          {
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
          }
        )
        .then((response) => {
          if (response.data.uploaded === 'uploaded successfully') {
            this.count = 0
            this.uploaded = 0
            this.progressInfo.presentage = 0
            this.progressInfo.total = 0
            this.progressInfo.loaded = 0
            this.progressInfo.netSpeed = 0
            this.videoFile = {
              season: null,
              type: null,
              gpu: null,
              episode: null,
              file: null
            }
            this.$bvModal.hide('addEpisodeToSeason')
            this.getEpisodes(this.seasonId)
            this.$swal('تم رفع الملفات بنجاح', '', 'success')
          }
          this.chunks.shift()
          if (this.count === this.chunksCount) {
            this.count = 0
            this.uploaded = 0
            this.progressInfo.presentage = this.progressInfo.total
          }
        })
        .catch((err) => {
          this.count = 0
          this.uploaded = 0
          this.progressInfo.presentage = 0
          this.progressInfo.total = 0
          this.progressInfo.loaded = 0
          this.progressInfo.netSpeed = 0
          this.videoFile = {
            season: null,
            type: null,
            gpu: null,
            episode: null,
            file: null
          }
          if (err.response.data.error === 'duplicated episode') {
            this.$swal('تم الغاء الرفع', 'الحلقة مكررة', 'error')
          } else {
            this.$swal('تم الغاء الرفع', 'حدث مشكلة في الاتصال', 'error')
          }
        })
    },
    // end of chunk
    async getAllSeasons () {
      this.loader = true
      await this.axios.get('season?take=10000').then((res) => {
        res.data.items.forEach((season) => {
          this.seasonsListAdd.push({
            text: `Season ${season.number}`,
            value: season.id
          })
        })
        this.loader = false
      })
    },
    getAllEpisodes () {
      this.loader = true
      this.axios.get('episode?take=10000').then((res) => {
        res.data.items.forEach((episode) => {
          this.episodesListAdd.push({
            text: `Episode ${episode.number}`,
            value: episode.id
          })
        })
        this.loader = false
      })
    },
    async getSeasonsById () {
      this.loader = true
      await this.axios
        .get(`all/seasons/series/${this.$route.params.id}`)
        .then((res) => {
          this.seasons = res.data[0]
          this.seasons.forEach((season) => {
            this.seasonsList.push({
              text: `Season ${season.season}`,
              value: season.id
            })
          })
          this.seasonId = this.seasons[0].season_id
          this.loader = false
        })
    },
    async getEpisodes (seasonId) {
      this.transcode = []
      await this.axios
        .get(`admin/episode/series/${this.$route.params.id}/season/${seasonId}`)
        .then((res) => {
          this.episodes = res.data.reverse()
          this.episodes.forEach((item) => {
            this.transcode.push({
              checked: false,
              id: item.id
            })
          })
          this.seasonId = seasonId
        })
    },
    changeSeasonImage () {
      let data = new FormData()
      if (this.seasonImage) {
        data.append('image', this.seasonImage)
      } else {
        this.$swal('Input Missing', 'Please Choose an Image', 'error')
        return '400'
      }
      if (this.season_id) {
        this.loader = true
        this.axios
          .post(`update/series/season/${this.season_id}`, data)
          .then(() => {
            this.loader = false
            this.$swal('Upload Successed', '', 'success')
          })
          .catch(() => {
            this.$swal(
              'Connection Error',
              'Upload Terminated Please Try Again',
              'error'
            )
          })
      } else {
        this.$swal('Input Missing', 'Please Choose a Season', 'error')
      }
    },
    imageUrl (image) {
      this.imageShow = image
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
.custom-btn mr-2 {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50% !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loding {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.3rem;
}
.loding p:nth-child(2) {
  display: flex;
}
.image-url {
  width: 4rem !important;
  height: 4rem !important;
}
.add {
  margin-bottom: 1rem !important;
  border: none !important;
}
.no-btn {
  display: block;
  width: 150px;
  padding: 0.3rem 0.5rem;
  border-radius: 1rem;
  border: 1px solid;
}
.no-btn__transcoded {
  color: #2ecc71;
  border-color: #2ecc71;
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
.add:hover {
  background-color: #ff4545 !important;
}
.active {
  background-color: #ff4545 !important;
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
