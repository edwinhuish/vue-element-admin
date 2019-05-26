<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >

      <el-table-column type="expand">
        <template slot-scope="scope">
          <contacts-table :source="scope.row.contacts" />
        </template>
      </el-table-column>

      <el-table-column label="P.">
        <template slot-scope="scope">
          <el-tag v-for="id in scope.row.partnerships" :key="id" :type="id | pShipFilter">
            {{ id | pShipName }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Code">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Name">
        <template slot-scope="{row}">
          <router-link :to="'/clients/edit/'+row.id" class="link-type">
            <span>{{ row.name }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Website">
        <template slot-scope="scope">
          <span>{{ scope.row.website }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Address">
        <template slot-scope="scope">
          <span>{{ scope.row.add1 }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Country">
        <template slot-scope="scope">
          <span>{{ scope.row.country }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-tickets" @click="toggleVisible">Records</el-button>

          <records-dialog ref="records" :source="scope.row.records" :visible="dialogVisible" />

          <router-link :to="'/clients/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { fetchList } from '@/api/clients'
import ContactsTable from '../company/components/ContactsTable'
import RecordsDialog from '../company/components/RecordsDialog'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ClientsList',
  components: { Pagination, ContactsTable, RecordsDialog },
  filters: {
    pShipFilter(ship) {
      const shipMap = {
        1: 'success',
        2: 'info',
        3: 'danger'
      }
      return shipMap[ship]
    },
    pShipName(ship) {
      const shipNameMap = {
        1: 'Client',
        2: 'Supplier',
        3: 'Partner'
      }
      return shipNameMap[ship]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      dialogVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    toggleVisible() {
      this.$refs.records.toggleVisible()
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
