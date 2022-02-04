<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Upload Movies Form</h4>
          </template>
        </iq-card>
      </b-col>
      <b-col sm="12" v-show="isInfoUploaded">
        <iq-card>
          <div class="prefix-info border-bottom mb-3 p-3">
            <b-row class="p-3 border-bottom">
              <h4>General Settings</h4>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group
                  id="input-group-3"
                  label="Choose File Type:"
                  label-for="input-3"
                >
                  <b-form-select
                    id="input-3"
                    v-model="typeValue"
                    :options="type"
                    required
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  id="input-group-3"
                  label="Choose GPU:"
                  label-for="input-3"
                >
                  <b-form-select
                    id="input-3"
                    v-model="gpuValue"
                    :options="gpu"
                    required
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
        </iq-card>
      </b-col>
      <b-col sm="12" v-for="(_, index) in forms" :key="index">
        <b-card no-body>
          <b-card-header header-tag="nav" class="border-0">
            <b-nav card-header tabs>
              <b-nav-item
                :active="formStatus[index].info"
                @click="changeTabs('info', index)"
                >Movie Informations</b-nav-item
              >
              <b-nav-item
                :active="formStatus[index].file"
                @click="changeTabs('file', index)"
                >Movie File</b-nav-item
              >
              <div class="d-flex ml-auto mr-0" v-if="index > 0">
                <b-button
                  v-if="!isInfoUploaded"
                  variant="primary"
                  class="d-flex m-auto"
                  @click="deleteForm(index)"
                  ><i class="fas fa-trash m-auto"></i
                ></b-button>
              </div>
            </b-nav>
          </b-card-header>
          <b-col sm="12" md="8">
            <!-- info upload -->
            <b-card-body v-show="formStatus[index].info" class="p-0">
              <b-form :validated="true" class="border p-5 mb-3">
                <b-form-group id="title" label="Movie Title:" label-for="title">
                  <b-form-input
                    id="title"
                    v-model="forms[index].title"
                    type="text"
                    placeholder="Enter Video Title"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Mobile Image">
                  <b-form-file
                    v-model="forms[index].image_mobile"
                    :state="Boolean(forms[index].image_mobile)"
                    placeholder="Choose an image or drop it here..."
                    drop-placeholder="Drop image here..."
                  ></b-form-file>
                </b-form-group>

                <b-form-group label="Web Image">
                  <b-form-file
                    v-model="forms[index].image_poster"
                    :state="Boolean(forms[index].image_poster)"
                    placeholder="Choose an image or drop it here..."
                    drop-placeholder="Drop image here..."
                  ></b-form-file>
                </b-form-group>
              </b-form>
            </b-card-body>
            <!-- end of info upload -->
            <!-- file upload -->
            <b-card-body v-show="formStatus[index].file">
              <b-form v-show="isInfoUploaded">
                <b-row>
                  <b-col sm="12" md="8">
                    <div>
                      <p class="video-title">
                        <span>Movies title:</span>{{ forms[index].title }}
                      </p>
                    </div>
                    <b-form-group label="Movie File">
                      <b-form-file
                        v-model="videoFiles[index].videoFile"
                        :state="Boolean(videoFiles[index].videoFile)"
                        placeholder="Choose an Video or drop it here..."
                        drop-placeholder="Drop Video here..."
                      ></b-form-file>
                    </b-form-group>
                    <div>
                      <p class="video-title">
                        <span>File name:</span
                        >{{
                          videoFiles[index].videoFile
                            ? videoFiles[index].videoFile.name
                            : 'No file selected'
                        }}
                      </p>
                    </div>
                    <b-form-group class="w-100 m-0 mb-2">
                      <b-progress
                        :value="progressInfo[index].presentage"
                        :max="max"
                        show-value
                      ></b-progress>
                      <!-- progress info -->
                      <div class="loding">
                        <p>
                          uploaded: ({{
                            progressInfo[index].loaded
                              ? bytesToSize(progressInfo[index].loaded)
                              : '0'
                          }}) from ({{
                            progressInfo[index].total
                              ? bytesToSize(progressInfo[index].total)
                              : '0'
                          }})
                        </p>
                        <p>
                          <span
                            >{{
                              progressInfo[index].presentage
                                ? progressInfo[index].presentage
                                : '0'
                            }}%</span
                          >
                          <span class="mx-3"> | </span>
                          <span
                            >{{
                              progressInfo[index].netSpeed
                                ? bytesToSize(progressInfo[index].netSpeed)
                                : '0 kb'
                            }}/s</span
                          >
                        </p>
                      </div>
                      <!-- end of progress info -->
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-form>
              <b-alert :show="!isInfoUploaded" variant="danger" class="w-100">
                You have to upload movie informations first then upload it's
                files.
              </b-alert>
            </b-card-body>
            <!-- end of file upload -->
          </b-col>
        </b-card>
      </b-col>
      <b-col sm="12" md="8" class="ml-3">
        <b-card-footer>
          <!-- <div v-if="isInfoUploaded">
            <b-progress
              :value="totalPresentage"
              :max="max"
              show-value
            ></b-progress>
            <div class="loding">
              <p>
                uploaded: ({{ totalLoaded ? bytesToSize(totalLoaded) : '0' }})
                from ({{ totalSize ? bytesToSize(totalSize) : '0' }})
              </p>
              <p>
                <span>{{ totalPresentage ? totalPresentage : '0' }}%</span>
                <span class="mx-3"> | </span>
                <span
                  >{{ totalSpeed ? bytesToSize(totalSpeed) : '0 kb' }}/s</span
                >
              </p>
            </div>
          </div> -->
          <div>
            <b-button
              v-show="show"
              class="mr-3"
              type="submit"
              variant="primary"
              @click="uploadVideoInfos"
              >Submit</b-button
            >
            <b-button
              v-if="isFileUploading"
              class="mr-3"
              type="submit"
              variant="primary"
              @click="manageUpload"
              >Upload Files</b-button
            >
            <b-button v-show="show" variant="secondary" @click="addForm"
              >Add Another Form</b-button
            >
          </div>
        </b-card-footer>
      </b-col>
    </b-row>
    <loader v-if="loader" />
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
import Loader from '../../components/core/loader/NewLoader.vue'
export default {
  name: 'video-upload',
  components: { Loader },
  mounted () {
    core.index()
  },
  data () {
    return {
      loader: false,
      show: true,
      isFileUploading: false,
      totalLoaded: 0,
      totalPresentage: null,
      totalSize: null,
      totalSpeed: null,
      supportedFormats: [
        '3g2',
        '3gp',
        'asf',
        'avi',
        'flv',
        'm4v',
        'mov',
        'mp4',
        'mpg',
        'rm',
        'swf',
        'vob',
        'wmv',
        'mkv',
        'video/x-matroska',
        'video/mp4'
      ],
      type: [
        {
          text: 'FHD',
          value: 'FHD'
        }
      ],
      gpu: [
        {
          text: 'gpu1',
          value: 'gpu1'
        }
      ],
      videoFiles: [
        {
          videoFile: null
        }
      ],
      gpuValue: null,
      typeValue: null,
      formStatus: [
        {
          info: true,
          file: false
        }
      ],
      fileIds: [],
      forms: [
        {
          title: '',
          subcategory_id: 5,
          image_mobile: null,
          image_poster: null
        }
      ],
      formCount: 0,
      max: 100,
      isInfoUploaded: false,
      videoInfoIds: [],
      subcategories: [
        { text: 'choose Subcategory', value: null },
        { text: 'افلام', value: 5 }
      ],
      chunks: [],
      ages: [[]],
      genders: [],
      presentage: 0,
      isAgeReady: false,
      isSupported: true,
      uploadCount: 0,
      chunksCount: [],
      uploaded: 0,
      count: 0,
      progressInfo: [
        {
          presentage: null,
          loaded: null,
          netSpeed: null,
          total: null
        }
      ],
      speeds: []
    }
  },
  watch: {
    chunks (n) {
      if (n.length > 0) {
        this.uploadChunks()
      }
    }
  },
  methods: {
    checkVideoFormat (event) {
      this.supportedFormats.forEach((format) => {
        if (!event.target.files[0].type.includes(format)) {
          this.isSupported = true
        }
      })

      if (this.isSupported) {
        this.$swal('خطأ في نوع الملف', 'يرجى اختيار ملف مدعوم', 'error')
      }
    },
    async handelChangeOnGender (index) {
      this.isAgeReady = false
      await this.getAgeRange(this.forms[index].gender_id, index)
    },
    addForm () {
      this.formCount++
      this.forms.push({
        title: '',
        subcategory_id: 5,
        image_mobile: null,
        image_poster: null
      })
      this.videoFiles.push({
        videoFile: null
      })
      this.formStatus.push({
        info: true,
        file: false
      })
      this.ages.push([])
      this.progressInfo.push({
        presentage: null,
        loaded: null,
        netSpeed: null,
        total: null
      })
    },
    deleteForm (index) {
      this.forms.splice(index, 1)
      this.formStatus.splice(index, 1)
      this.videoFiles.splice(index, 1)
      this.ages.splice(index, 1)
      this.progressInfo.splice(index, 1)
    },
    manageUpload () {
      if (!this.typeValue) {
        this.$swal('خطأ في الادخال', 'يرجى اختيار نوع الفايل', 'error')
        return '400'
      }
      if (!this.gpuValue) {
        this.$swal('خطأ في الادخال', 'يرجى اختيار  الgpu', 'error')
        return '400'
      }
      for (let i = 0; i < this.videoFiles.length; i++) {
        if (!this.videoFiles[i].videoFile) {
          this.$swal('خطأ في الادخال', 'يرجى اختيار الفايل', 'error')
          return '400'
        }
      }
      for (let i = 0; i <= this.formCount; i++) {
        this.totalSize += this.videoFiles[i].videoFile.size
        this.createChunks(i)
      }
    },
    // chuncks
    createChunks (index) {
      this.isFileUploading = false
      let size = 10000 * 2048
      let chunks = Math.ceil(this.videoFiles[index].videoFile.size / size)
      this.chunksCount.push(chunks)
      for (let i = 0; i < chunks; i++) {
        this.chunks.push(
          this.videoFiles[index].videoFile.slice(
            i * size,
            Math.min(i * size + size, this.videoFiles[index].videoFile.size),
            this.videoFiles[index].videoFile.type
          )
        )
      }
    },
    formDataq (index) {
      this.count++
      let formData = new FormData()
      if (this.count === this.chunksCount[index]) {
        formData.set('is_last', true)
      } else {
        formData.set('is_last', false)
      }
      formData.set(
        'video',
        this.chunks[0],
        `${this.videoFiles[index].videoFile.name}.part`
      )
      formData.append('name', this.videoFiles[index].videoFile.name)
      formData.append('size', this.videoFiles[index].videoFile.size)
      formData.append('gpu', this.gpuValue)
      formData.append('type', this.typeValue)
      if (this.count === 1) {
        formData.append('first', true)
      }
      return formData
    },
    async uploadChunks () {
      let prevLoad = 0
      await this.axios
        .post(
          `movie/upload/chunk/${
            this.videoInfoIds[this.uploadCount].videoable_id
          }`,
          this.formDataq(this.uploadCount),
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

              let percentComplete =
                this.uploaded / this.videoFiles[this.uploadCount].videoFile.size
              percentComplete = parseInt(percentComplete * 100)
              this.progressInfo[this.uploadCount].presentage = percentComplete

              this.progressInfo[this.uploadCount].total =
                this.videoFiles[this.uploadCount].videoFile.size

              this.progressInfo[this.uploadCount].loaded = this.uploaded
              this.speeds.push(parseInt(progressEvent.loaded))
              this.progressInfo[this.uploadCount].netSpeed =
                this.speeds.slice(-1)[0] - this.speeds.slice(-2)[0]

              this.totalSpeed =
                this.speeds.slice(-1)[0] - this.speeds.slice(-2)[0]
            }
          }
        )
        .then((response) => {
          if (response.data.uploaded === 'uploaded successfully') {
            if (this.uploadCount + 1 === this.videoFiles.length) {
              this.$swal('تم رفع الملفات بنجاح', '', 'success')
            } else {
              if (this.count === this.chunksCount[this.uploadCount]) {
                this.count = 0
                this.uploaded = 0
              }
              this.uploadCount++
            }
          }
          this.chunks.shift()
        })
        .catch(() => {
          this.$swal('خطأ في الاتصال', '', 'error')
        })
    },
    changeTabs (status, index) {
      if (status === 'info') {
        this.formStatus[index].info = true
        this.formStatus[index].file = false
      } else if (status === 'file') {
        this.formStatus[index].info = false
        this.formStatus[index].file = true
      }
    },
    async uploadVideoInfos () {
      let data = new FormData()

      // check if all form are validated
      for (let i = 0; i <= this.formCount; i++) {
        if (this.addSourceValidation(i).status === 400) {
          this.$swal(
            'خطأ في الارسال',
            this.addSourceValidation(i).messagestatus,
            'error'
          )
          return '400'
        }
      }
      this.loader = true
      // upload infos here
      for (let i = 0; i <= this.formCount; i++) {
        Object.keys(this.forms[i]).forEach((key) => {
          data.append(key, this.forms[i][key])
        })
        data.append('details', 'fhgjf')
        await this.axios
          .post('movie', data)
          .then((res) => {
            this.show = false
            this.videoInfoIds.push(res.data)
            if (i === this.formCount) {
              this.loader = false
              this.$swal(
                'تم العلمية بنجاح',
                'تم رفع معلومات الفيديو بنجاح',
                'success'
              )
              this.isInfoUploaded = true
              this.isFileUploading = true
              this.formStatus.forEach((status) => {
                status.info = false
                status.file = true
              })
            }
          })
          .catch((res) => {
            this.$swal('خطأ في الارسال', 'يوجد خلل فني', 'error')
          })
      }
    },
    addSourceValidation (index) {
      let dataError = {}
      if (!this.forms[index].title && this.forms[index].title === '') {
        dataError.status = 400
        dataError.messagestatus = 'يرجى ادخال عنوان الفيديو'
        return dataError
      }
      if (!this.forms[index].image_mobile) {
        dataError.status = 400
        dataError.messagestatus = 'يرجى اختيار صورة الموبايل'
        return dataError
      }
      if (!this.forms[index].image_poster) {
        dataError.status = 400
        dataError.messagestatus = 'يرجى اختيار صورة الويب'
        return dataError
      }
      dataError.status = 200
      dataError.messagestatus = 'تمت العملية بنجاح'
      return dataError
    },
    // bytesToSize (bytes) {
    //   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    //   if (bytes === 0) return '0 Byte'
    //   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    //   return Math.round(bytes / Math.pow(1024, i), 2) + sizes[i]
    // }
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
.loding p:nth-child(2) {
  display: flex;
}
.video-title {
  font-size: 120%;
}
.video-title span {
  font-weight: 600;
  margin-right: 1rem;
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
