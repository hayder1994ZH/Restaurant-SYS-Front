<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Upload Series Form</h4>
          </template>
        </iq-card>
      </b-col>
      <b-col sm="12">
        <iq-card>
          <div
            class="prefix-info border-bottom mb-3 p-3"
            v-show="isInfoUploaded"
          >
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
              <!-- <b-col>
                <b-form-group
                  id="input-group-3"
                  label="Choose Season:"
                  label-for="input-3"
                >
                  <b-form-select
                    id="input-3"
                    v-model="season"
                    :options="seasons"
                    required
                  ></b-form-select>
                </b-form-group>
              </b-col> -->
            </b-row>
          </div>
        </iq-card>
      </b-col>
      <b-col sm="12">
        <b-card no-body>
          <b-card-header header-tag="nav" class="border-0">
            <b-nav card-header tabs>
              <b-nav-item
                v-if="!isInfoUploaded"
                :active="formStatus.info"
                @click="changeTabs('info')"
                >Series Informations</b-nav-item
              >
              <b-nav-item :active="formStatus.file" @click="changeTabs('file')"
                >Series File</b-nav-item
              >
              <!-- <div class="d-flex ml-auto mr-0" v-if="index > 0">
                <b-button
                  v-if="isFileUploaded"
                  variant="primary"
                  class="d-flex m-auto"
                  @click="deleteForm(index)"
                  ><i class="fas fa-trash m-auto"></i
                ></b-button>
              </div> -->
            </b-nav>
          </b-card-header>
          <b-col sm="12" md="8">
            <!-- info upload -->
            <b-card-body v-show="formStatus.info" class="p-0">
              <b-form :validated="true" class="border p-5 mb-3">
                <b-form-group
                  id="title"
                  label="Series Title:"
                  label-for="title"
                >
                  <b-form-input
                    id="title"
                    v-model="forms[0].title"
                    type="text"
                    placeholder="Enter Video Title"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Mobile Image">
                  <b-form-file
                    v-model="forms[0].image_mobile"
                    :state="Boolean(forms[0].image_mobile)"
                    placeholder="Choose an image or drop it here..."
                    drop-placeholder="Drop image here..."
                  ></b-form-file>
                </b-form-group>

                <b-form-group label="Web Image">
                  <b-form-file
                    v-model="forms[0].image_poster"
                    :state="Boolean(forms[0].image_poster)"
                    placeholder="Choose an image or drop it here..."
                    drop-placeholder="Drop image here..."
                  ></b-form-file>
                </b-form-group>
              </b-form>
            </b-card-body>
            <!-- end of info upload -->
            <!-- file upload -->
            <b-card-body v-show="formStatus.file">
              <b-form v-show="isInfoUploaded">
                <b-row>
                  <b-col sm="12" md="10">
                    <div>
                      <p class="video-title">
                        <span>Series title:</span>{{ forms[0].title }}
                      </p>
                    </div>
                    <b-form-group label="Episodes File">
                      <b-form-file
                        multiple
                        placeholder="Choose an Video or drop it here..."
                        drop-placeholder="Drop Video here..."
                        @change="handelProgress"
                      ></b-form-file>
                    </b-form-group>
                    <div
                      class="file-container"
                      v-for="(file, index) in videoFiles"
                      :key="index"
                    >
                      <div
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                          mb-3
                        "
                      >
                        <p class="video-title m-0">
                          <span>File name:</span
                          >{{ file ? file.name : 'No file selected' }}
                        </p>
                        <div class="d-flex">
                          <b-button
                            v-if="isFileUploading"
                            class="mr-2"
                            variant="primary"
                            @click="deleteFile(index)"
                          >
                            <i class="fas fa-trash m-0"></i>
                          </b-button>
                          <b-button
                            v-if="corruptedFiles[index].corrupted"
                            variant="success"
                            @click="reUpload(index)"
                            ><i class="fas fa-redo-alt m-0"></i
                          ></b-button>
                        </div>
                      </div>
                      <b-form-group
                        class="w-100 m-0 mb-2"
                        v-if="videoFiles.length"
                      >
                        <b-progress
                          :value="progressInfo[index].presentage"
                          :max="max"
                          show-value
                        ></b-progress>
                        <!-- progress info -->
                        <div class="loding">
                          <p class="m-0">
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
                          <p class="m-0">
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
                    </div>
                  </b-col>
                </b-row>
              </b-form>
              <b-alert :show="!isInfoUploaded" variant="danger" class="w-100">
                You have to upload video informations first then upload it's
                files.
              </b-alert>
            </b-card-body>
            <!-- end of file upload -->
          </b-col>
        </b-card>
      </b-col>
      <b-col sm="12" md="8" class="ml-3">
        <b-card-footer>
          <div>
            <b-button
              v-if="!isInfoUploaded"
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
            <!-- <b-button
              v-if="isFileUploading"
              variant="secondary"
              @click="addForm"
              >Add Another Eposide</b-button
            > -->
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
      corruptedFiles: [],
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
      videoFiles: [],
      gpuValue: null,
      typeValue: null,
      season: null,
      formStatus: {
        info: true,
        file: false
      },
      fileIds: [],
      forms: [
        {
          title: '',
          subcategory_id: 6,
          image_mobile: null,
          image_poster: null
        }
      ],
      formCount: 0,
      max: 100,
      isInfoUploaded: false,
      isFileUploaded: false,
      videoInfoIds: [],
      subcategories: [
        { text: 'choose Subcategory', value: null },
        { text: 'مسلسلات', value: 6 }
      ],
      chunks: [],
      seasons: [],
      eposides: [],
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
  created () {
    this.getSeasons()
    this.getEposides()
  },
  methods: {
    deleteFile (index) {
      this.videoFiles.splice(index, 1)
      this.progressInfo.splice(index, 1)
    },
    handelProgress (e) {
      this.videoFiles = []
      let i = 0
      while (i < e.target.files.length) {
        this.videoFiles.push(e.target.files[i])
        this.progressInfo.push({
          presentage: null,
          loaded: null,
          netSpeed: null,
          total: null
        })
        this.corruptedFiles.push({
          index: null,
          corrupted: false
        })
        i++
      }
    },
    getSeasons () {
      this.axios.get('season?take=10000').then((res) => {
        res.data.items.forEach((season) => {
          this.seasons.unshift({
            text: `Season ${season.number}`,
            value: season.id
          })
        })
      })
    },
    getEposides () {
      this.axios.get('episode?take=10000').then((res) => {
        res.data.items.forEach((eposide) => {
          this.eposides.unshift({
            text: `Eposide ${eposide.number}`,
            value: eposide.id
          })
        })
      })
    },
    reUpload (index) {
      this.count = 0
      this.uploaded = 0
      this.chunksCount = []
      this.chunks = []
      this.uploadCount = index

      if (!this.typeValue) {
        this.$swal('خطأ في الادخال', 'يرجى اختيار نوع الفايل', 'error')
        return '400'
      }
      if (!this.gpuValue) {
        this.$swal('خطأ في الادخال', 'يرجى اختيار  الgpu', 'error')
        return '400'
      }
      if (!this.videoFiles[index]) {
        this.$swal('خطأ في الادخال', 'يرجى اختيار الفايل', 'error')
        return '400'
      }
      this.createChunks(index)
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
        if (!this.videoFiles[i]) {
          this.$swal('خطأ في الادخال', 'يرجى اختيار الفايل', 'error')
          return '400'
        }
      }
      for (let i = 0; i <= this.videoFiles.length; i++) {
        this.totalSize += this.videoFiles[i].size
        this.createChunks(i)
      }
      this.isFileUploaded = false
    },
    // chuncks
    createChunks (index) {
      this.isFileUploading = false
      let size = 10000 * 2048
      let chunks = Math.ceil(this.videoFiles[index].size / size)
      this.chunksCount.push(chunks)
      for (let i = 0; i < chunks; i++) {
        this.chunks.push(
          this.videoFiles[index].slice(
            i * size,
            Math.min(i * size + size, this.videoFiles[index].size),
            this.videoFiles[index].type
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
        `${this.videoFiles[index].name}.part`
      )
      formData.append('name', this.videoFiles[index].name)
      formData.append('size', this.videoFiles[index].size)
      formData.append('gpu', this.gpuValue)
      formData.append('type', this.typeValue)
      if (this.count === 1) {
        formData.append('first', true)
      }
      return formData
    },
    async uploadChunks () {
      let prevLoad = 0
      if (this.uploadCount + 1 <= this.videoFiles.length) {
        await this.axios
          .post(
            `series/upload/chunk/${this.videoInfoIds[0].videoable_id}`,
            this.formDataq(this.uploadCount),
            {
              headers: {
                'Content-Type': 'application/octet-stream'
              },
              onUploadProgress: (progressEvent) => {
                if (parseInt(progressEvent.loaded) > this.uploaded) {
                  this.uploaded = parseInt(progressEvent.loaded)
                  this.totalLoaded = parseInt(progressEvent.loaded)
                } else {
                  this.uploaded += parseInt(progressEvent.loaded) - prevLoad
                  this.totalLoaded += parseInt(progressEvent.loaded) - prevLoad
                  prevLoad = parseInt(progressEvent.loaded)
                }
                if (this.uploadCount === 0) {
                  this.totalLoaded = this.uploaded
                } else {
                  this.totalLoaded += this.uploaded
                }

                let percentComplete =
                  this.uploaded / this.videoFiles[this.uploadCount].size
                percentComplete = parseInt(percentComplete * 100)
                this.progressInfo[this.uploadCount].presentage = percentComplete

                let totalPercentComplete = this.totalLoaded / this.totalSize
                totalPercentComplete = parseInt(totalPercentComplete * 100)

                this.totalPresentage = totalPercentComplete

                this.progressInfo[this.uploadCount].total =
                  this.videoFiles[this.uploadCount].size

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
            if (this.corruptedFiles[this.uploadCount].corrupted) {
              this.uploadCount = this.videoFiles.length
              this.$swal('تم رفع الملفات بنجاح', '', 'success')
            } else {
              if (response.data.uploaded === 'uploaded successfully') {
                if (this.uploadCount + 1 === this.videoFiles.length) {
                  this.$swal('تم رفع الملفات بنجاح', '', 'success')
                  this.uploadCount++
                } else {
                  if (this.count === this.chunksCount[this.uploadCount]) {
                    this.count = 0
                    this.uploaded = 0
                  }
                  this.uploadCount++
                }
              }
            }
            this.chunks.shift()
          })
          .catch(() => {
            if (this.corruptedFiles[this.uploadCount].corrupted) {
              this.progressInfo[this.uploadCount].presentage = 0
              this.progressInfo[this.uploadCount].loaded = 0
              this.progressInfo[this.uploadCount].netSpeed = 0
              this.progressInfo[this.uploadCount].total = 0
              this.count = 0
              this.uploaded = 0
              this.uploadCount = this.videoFiles.length
              this.$swal(
                'حصل خطأ في الرفع',
                'يمكنك اكمال عملية الرفع واعادة رفع الملف المظروب لاحقا',
                'error'
              )
            } else {
              this.corruptedFiles[this.uploadCount].index =
                this.videoFiles.indexOf(this.videoFiles[this.uploadCount])
              this.corruptedFiles[this.uploadCount].corrupted = true
              this.progressInfo[this.uploadCount].presentage = 0
              this.progressInfo[this.uploadCount].loaded = 0
              this.progressInfo[this.uploadCount].netSpeed = 0
              this.progressInfo[this.uploadCount].total = 0
              this.count = 0
              this.uploaded = 0
              this.uploadCount++
              this.$swal(
                'حصل خطأ في الرفع',
                'يمكنك اكمال عملية الرفع واعادة رفع الملف المظروب لاحقا',
                'error'
              )
              if (this.uploadCount < this.videoFiles.length) {
                this.uploadChunks()
              }
            }
          })
      }
    },
    // end of chuncks
    changeTabs (status, index) {
      if (status === 'info') {
        this.formStatus.info = true
        this.formStatus.file = false
      } else if (status === 'file') {
        this.formStatus.info = false
        this.formStatus.file = true
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
            this.isFileUploading = true
            this.videoInfoIds.push(res.data)
            if (i === this.formCount) {
              this.loader = false
              this.$swal(
                'تم العلمية بنجاح',
                'تم رفع معلومات الفيديو بنجاح',
                'success'
              )
              this.isInfoUploaded = true
              this.isFileUploaded = true
              // this.formStatus.forEach((status) => {
              //   status.info = false
              //   status.file = true
              // })
              this.formStatus.info = false
              this.formStatus.file = true
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
.file-container {
  background-color: #ebebeb;
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
}
.file-container .progress {
  background-color: #f4f4f4;
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
