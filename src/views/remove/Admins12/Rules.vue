<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <button
          type="button"
          class="btn btn-primary add"
          @click="$bvModal.show('addRule')"
        >
          Add Rule
        </button>
        <br />
        <!-- add rule -->
        <b-modal id="addRule" hide-footer>
          <div class="mb-5">
            <label><span style="color: red">* </span>Rule</label>
            <b-form-input
              v-model="formAdd.name"
              placeholder="Enter Rule"
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
              @click="addRule"
            >
              Submit
            </button>
          </div>
        </b-modal>
        <!-- end of add rule -->
      </b-col>
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Rules List</h4>
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
                <b-th>rule</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in items" :key="index">
                  <b-td>{{ item.name }}</b-td>
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
  components: {
    Loader
  },
  mounted () {
    core.index()
    this.getAllItems()
  },
  data () {
    return {
      loader: false,
      formAdd: {
        name: null
      },
      imageShow: '',
      videoShow: '',
      items: [],
      id: null
    }
  },
  methods: {
    addRule () {
      this.loader = true
      let data = new FormData()
      if (this.formAdd.name) {
        data.append('name', this.formAdd.name)

        this.axios
          .post('rule', data)
          .then((res) => {
            this.$bvModal.hide('addRule')
            this.getAllItems()
            this.loader = false
            this.$swal('تم رفع المعلومات بنجاح', '', 'success')
          })
          .catch(() => {
            this.$bvModal.hide('addRule')
            this.$swal(
              'حدث خطأ في الاتصال يرجى اعادة المحاولة لاحقا',
              '',
              'error'
            )
          })
      } else {
        this.$swal('يرجى ادخال نوع المستخدم', '', 'error')
      }
    },
    getAllItems () {
      this.loader = true
      this.axios
        .get('rule?take=10000')
        .then((res) => {
          this.items = res.data.items
          this.loader = false
        })
        .catch(() => {})
    }
  }
}
</script>
<style scoped>
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
