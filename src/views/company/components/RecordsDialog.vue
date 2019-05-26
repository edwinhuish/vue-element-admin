<template>
  <div class="records-dialog">
    <el-dialog title="Records History" :visible.sync="visible" width="100%" top="0" custom-class="records-dialog">
      <div class="records-dialog-body">

        <el-timeline class="record-event-timeline">
          <el-timeline-item
            v-for="(record, index) in records"
            :key="index"
            :timestamp="record.timestamp"
            placement="top"
          >
            <el-card>
              <h4>{{ record.description }}</h4>
              <p class="user">{{ record.user }}</p>
            </el-card>

          </el-timeline-item>
        </el-timeline>
      </div>
      <div slot="footer" class="dialog-footer">

        <el-form :model="formData" class="record-form">
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-input v-model="formData.description" placeholder="Please sumbit new record." />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button type="primary" @click="onSubmit">Submit</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RecordsDialog',
  props: {
    source: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      records: this.source,
      visible: false,
      formData: {
        timestamp: '',
        user: '',
        description: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'name',
      'avatar',
      'roles'
    ])
  },
  methods: {
    getDateString() {
      const date = new Date()
      const y = date.getFullYear()
      const m = date.getMonth()
      const d = date.getDate()
      const h = date.getHours()
      const min = date.getMinutes()
      const s = date.getSeconds()
      return `${y}-${m}-${d} ${h}:${min}:${s}`
    },
    onSubmit() {
      this.formData.user = this.id
      this.formData.timestamp = this.getDateString()
      console.log('submit!')
      console.log(this.formData)
    },
    toggleVisible() {
      this.visible = !this.visible
    }
  }
}
</script>

<style scoped>
.record-event-timeline{text-align: left;padding-left: 0;}
.record-event-timeline .user{text-align:right;}
.record-form .el-form-item{margin:0;}
.records-dialog-body{padding:10px;overflow: auto;height:100%;}
</style>
<style>
.records-dialog{max-width: 800px;height:100%;}
.records-dialog .el-dialog__body{height: calc(100% - 55px - 66px)}
</style>
