<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">User List </h4>
          </template>
          <template v-slot:body>
            <div class="table-responsive">
              <div class="row justify-content-between">
                <div class="col-sm-12 col-md-6">
                  <div id="user_list_datatable_info" class="dataTables_filter">
                    <form class="mr-3 position-relative">
                      <div class="form-group mb-0">
                        <input
                          type="search"
                          class="form-control"
                          id="exampleInputSearch"
                          placeholder="Search"
                          aria-controls="user-list-table"
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <!-- <div class="col-sm-12 col-md-6">
                  <div class="user-list-files d-flex float-right">
                    <a class="iq-bg-primary" href="#">Print</a>
                    <a class="iq-bg-primary" href="#">Excel</a>
                    <a class="iq-bg-primary" href="#">Pdf</a>
                  </div>
                </div> -->
              </div>
              <b-table
                id="user-list-table"
                :items="userList"
                :fields="userFields"
                class="table-striped table-bordered mt-4"
                role="grid"
                aria-describedby="user-list-page-info"
              >
                <template v-slot:cell(imageUser)="data">
                  <b-img :src="data.value" rounded alt="img-flaf" class="img-fluid avatar-40" />
                </template>
                <template v-slot:cell(dataset)='ss' >
                  <span  v-if="ss.item.status == 0" @click="changeStatus(ss.item.id)" class="badge iq-bg-primary"> Active</span>
                  <span v-if="ss.item.status == 1"  @click="changeStatus(ss.item.id)" class="badge iq-bg-danger">Block</span>
                </template>
                <template v-slot:cell(channels)='channels'>
                    <router-link
                      exact
                      :to='"user-channels/" + channels.value'
                      style="padding: 0 !important;"
                      class="d-flex"
                    >
                      <a class="a-font" href="#">Channels</a>
                    </router-link>
                </template>
                <template  #cell(actions)="row">
                  <div class="flex align-items-center list-user-action" >
                    <a
                      class="iq-bg-primary"
                      data-toggle="tooltip"
                      data-placement="top"
                      title
                      data-original-title="Add"
                      href="#"
                      @click="deleteUser(row.item.id)"
                    >
                      <i class="ri-user-add-line"> </i>
                    </a>
                    <a
                      class="iq-bg-primary"
                      data-toggle="tooltip"
                      data-placement="top"
                      title
                      data-original-title="Edit"
                      href="#"
                      @click="editUser(row.item.id)"
                    >
                      <i class="ri-pencil-line"></i>
                    </a>
                    <a
                      class="iq-bg-primary"
                      data-toggle="tooltip"
                      data-placement="top"
                      title
                      data-original-title="Delete"
                      href="#"
                      @click="deleteUser(row.item.id)"
                    >
                      <i class="ri-delete-bin-line"></i>
                    </a>
                  </div>
                </template>
                 <b-pagination
                  v-model="currentPage"
                  :total-rows="rows"
                  :per-page="perPage"
                  align="center"
                  aria-controls="my-table"
                ></b-pagination>
              </b-table>

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
            </div>
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
      userFields: [
        {
          key: 'id',
          label: 'id'
        },
        {
          key: 'full_name',
          label: 'name',
          sortable: true
        },
        {
          key: 'email',
          label: 'email',
          sortable: true
        },
        {
          key: 'phone',
          label: 'phone',
          sortable: true
        },
        {
          key: 'dataset',
          label: 'status',
          sortable: true
        },
        {
          key: 'imageUser',
          label: 'imageUser',
          sortable: true
        },
        {
          key: 'actions',
          label: 'actions',
          sortable: true
        }
      ],
      userList: [],
      rows: 0,
      perPage: 10,
      currentPage: 1
    }
  },
  methods: {
    getAllData () {
      this.axios
        .get('user?take=100')
        .then((res) => {
          this.userList = res.data.items
          this.rows = res.data.totalCount
        })
        .catch(() => {
        })
    },
    changeStatus (id) {
      console.log(id)
    },
    deleteCategory () {
      this.axios
        .delete(`category/${this.categoryId}`)
        .then((res) => {
          this.closeDeleteModal()
          this.getAllData()
        })
        .catch(() => {
        })
    }
  }
}
</script>
