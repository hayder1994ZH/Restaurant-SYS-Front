<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-row class="justify-content-between">
          <b-col md="6" class="d-flex">
            <b-input
              class="mr-3"
              type="search"
              placeholder="Search Items"
              v-model="search"
              @keyup.enter="getAllItems"
            ></b-input>
          </b-col>
        </b-row>
        <!-- <button
          type="button"
          class="btn btn-primary add"
          @click="$bvModal.show('addGenderModal')"
        >
          Add +
        </button> -->
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
        <!-- show video modal -->
        <b-modal id="videoShow" hide-footer size="xl">
          <video :src="videoShow" width="520" height="440" controls autoplay>
            Your browser does not support the video tag.
          </video>
        </b-modal>
        <!-- end show video modal -->
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
            <h4 class="card-title">Reels List</h4>
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
                <b-th>user</b-th>
                <b-th>channel</b-th>
                <b-th>title</b-th>
                <b-th>image</b-th>
                <b-th>video</b-th>
                <b-th>created at</b-th>
                <b-th>action</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in items" :key="index">
                  <b-td>{{ item.user.full_name }}</b-td>
                  <b-td>{{ item.user.channel.full_name }}</b-td>
                  <b-td>{{ item.title }}</b-td>
                  <b-td>
                    <img
                      :src="item.imageReels"
                      class="image-url"
                      data-toggle="modal"
                      data-target="#showImage"
                      v-on:click="imageUrl(item.imageReels)"
                      alt
                    />
                  </b-td>
                  <b-td>
                    <template>
                      <b-button
                        class="custom-btn mr-2"
                        variant=" iq-bg-success"
                        v-on:click="videoPopup(item.videoeReels)"
                        size="sm"
                      >
                        <i class="ri-play-fill m-0"></i>
                      </b-button>
                    </template>
                  </b-td>
                  <b-td>{{ item.created_at }}</b-td>
                  <b-td>
                    <template>
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
    this.getAllItems()
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
      search: '',
      loader: false,
      perPage: 10,
      currentPage: 1,
      rows: 0,
      imageShow: '',
      videoShow: '',
      items: [],
      id: null
    }
  },
  methods: {
    deletePopup (id) {
      this.id = id
    },
    imageUrl (image) {
      this.imageShow = image
    },
    videoPopup (video) {
      this.videoShow = video
      this.$bvModal.show('videoShow')
    },
    getAllItems () {
      this.loader = true
      let pageNumber = this.currentPage - 1
      let pageSkip = pageNumber * this.perPage
      this.axios
        .get(
          `reels?take=${this.perPage}&skip=${pageSkip}&filter[title]=${this.search}`
        )
        .then((res) => {
          this.items = res.data.items
          this.rows = res.data.totalCount
          this.loader = false
        })
        .catch(() => {})
    },
    closeDeleteModal () {
      document.getElementById('close-delete').click()
    },
    deleteItem () {
      this.loader = true
      this.axios
        .delete(`reels/${this.id}`)
        .then((res) => {
          this.closeDeleteModal()
          this.getAllItems()
          this.loader = false
        })
        .catch((res) => {
          if (res.response.status === 404) {
            this.$swal('العنصر غير موجود', '', 'error')
          }
          this.$swal('يوجد خلل فني', '', 'error')
        })
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
