
<template>
  <el-row>
    <el-col :span="24">
      <el-table
        class="contacts-table"
        :data="source"
        height="250"
        border
        style="width: 100%"
      >
        <el-table-column align="center" label="Code">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Name">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Dep.">
          <template slot-scope="scope">
            <span>{{ scope.row.department }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Email">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Tel.">
          <template slot-scope="scope">
            <span>{{ scope.row.tel1 }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24" class="contact-form-actions" />
  </el-row>
</template>

<script>

export default {
  name: 'ContactsTable',
  props: {
    source: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>
