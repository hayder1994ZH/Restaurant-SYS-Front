<template>
  <b-container fluid>
    <div>
        <PhotoCapture v-model="imageBase64" />
        <VideoCapture uploadUrl="<example-server-address.com>" v-model="videoUrl" />
    </div>

    <loader v-if="loader" />
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
import Loader from '../../components/core/loader/NewLoader.vue'
import 'vue-media-recorder/src/assets/scss/main.scss'
import {PhotoCapture, VideoCapture} from 'vue-media-recorder'
export default {
  name: 'AgeRange',
  components: { Loader ,
        PhotoCapture,
        VideoCapture },
  created () {
    this.checkRule()
    this.getAllItems()
    this.getLanguages()
    this.getRestaurants()
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
            imageBase64: null,
            videoUrl: null,
      imageCategory: '',
      resturantModels: [],
      languages: [],
      searchByName: '',
      searchByTitle: '',
      loader: false,
      perPage: 10,
      currentPage: 1,
      rows: 0,
      formAdd:[],
      formEdit: [],
      formEditRestaurant: [],
      imageShow: '',
    isCameraOpen: false,
    isPhotoTaken: false,
      items: [],
      rules: [{ text: 'Choose user rule', value: null }],
      id: null,
      checkUserRule: null,
      checkUserUid: null,
    }
  },
  methods: {
        toggleCamera() {
    if(this.isCameraOpen) {
      this.isCameraOpen = false;
      this.isPhotoTaken = false;
      this.stopCameraStream();
    } else {
      this.isCameraOpen = true;
      this.createCameraElement();
    }
  },
  takePhoto() {
  this.isPhotoTaken = !this.isPhotoTaken;

  const context = this.$refs.canvas.getContext('2d');
  context.drawImage(this.$refs.camera, 0, 0, 450, 337.5);
},
    checkRule(){
      this.checkUserRule = this.$jwt.decode(
        localStorage.getItem('access_token')
      ).user_name
      this.checkUserUid = this.$jwt.decode(
        localStorage.getItem('access_token')
      ).uid
      if(this.checkUserRule === 'admin' && this.checkUserUid !== null){
        this.$router.push({ name: 'dashboard.home-1' })
      }
    },
    deletePopup (id) {
      this.id = id
    },
    imageUrl (image) {
      this.imageShow = 'http://localhost:8000/storage/' + image
    },
    imageShowTb (image) {
     return this.imageShow = 'http://localhost:8000/storage/' + image
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
        data.append('restaurant_id', this.formAdd.restaurant_id)
        data.append('image', this.formAdd.image)
        this.loader = true
        await this.axios
          .post('category', data)
          .then(() => {
            this.getAllItems()
            this.loader = false
            this.$swal('تم اضافة المستخدم بنجاح', '', 'success')
          })
          .catch(() => {
            this.loader = false
            this.$swal('حدث خطأ فني يرجى المحاولة لاحقا', '', 'erroe')
          })
      }
    },
    async update () {
      let data = new FormData()
      if(this.imageCategory){
        data.append('image', this.imageCategory)
      }
      if(this.formEdit.restaurant_id){
        data.append('restaurant_id', this.formEdit.restaurant_id)
      }
      data.append('_method', 'PUT')
      this.loader = true
      await this.axios
        .post(`category/${this.formEdit.id}`, data)
        .then(() => {
          this.getAllItems()
          this.$bvModal.hide('update')
          this.loader = false
          this.$swal('تم تعديل معلومات المستخدم بنجاح', '', 'success')
        })
        .catch(() => {
          this.loader = false
          this.$swal('حدث خطأ فني يرجى المحاولة لاحقا', '', 'erorr')
        })
    },
    getAllItems () {
      this.loader = true 
      let pageNumber = this.currentPage - 1
      let pageSkip = pageNumber * this.perPage
      this.axios
        .get(
          `category?take=${this.perPage}&skip=${pageSkip}&filter[restaurant.name]=${this.searchByName}&filter[langBody.title]=${this.searchByTitle}`
        )
        .then((res) => {
          this.items = res.data.items
          this.rows = res.data.totalCount
          this.loader = false 
        })
        .catch(() => {
          this.loader = false 
        })
    },
    getRestaurants () {
      this.axios
        .get(
          `restaurant?take=1000&skip=0`
        )
        .then((res) => {
          res.data.items.forEach((item) => {
            this.resturantModels.push({ text: item.name, value: item.id })
          })
        })
        .catch(() => {})
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
        .delete(`category/${this.id}`)
        .then((res) => {
          this.closeDeleteModal()
          this.getAllItems()
          this.loader = false
        })
        .catch((res) => {
          this.loader = false
          if (res.response.status === 404) {
            this.$swal('العنصر غير موجود', '', 'error')
          }
          this.$swal('يوجد خلل فني', '', 'error')
        })
    },
    addValidater () {
      let dataError = {
        status: null,
        message: ''
      }
      if (!this.formAdd.title) {
        dataError.status = 400
        dataError.message = 'يرجى اضافة عنوان '
        return dataError
      }
      if (!this.formAdd.description) {
        dataError.status = 400
        dataError.message = 'يرجى اضافة تفاصيل '
        return dataError
      }
      if (!this.formAdd.restaurant_id) {
        dataError.status = 400
        dataError.message = 'يرجى اختيار المطعم '
        return dataError
      }
      if (!this.formAdd.lang_id) {
        dataError.status = 400
        dataError.message = 'يرجى اختيار لغة '
        return dataError
      }
      if (!this.formAdd.image) {
        dataError.status = 400
        dataError.message = 'يرجى اضافة صورة '
        return dataError
      }
      dataError.status = 200
      dataError.message = 'success'
      return dataError
    },
  }
}
</script>
<style scoped>
button {
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;

}

  img {
    height: 35px;
    object-fit: cover;
  }
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
