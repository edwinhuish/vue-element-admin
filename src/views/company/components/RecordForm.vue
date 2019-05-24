
<template>
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
</template>

<script>

export default {
  name: 'RecordForm',
  props: {
    timestamp: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    user: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: {
        timestamp: this.timestamp,
        user: this.user,
        description: this.description
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
      console.log(this.formData)
    }
  }
}
</script>
<style scoped>
.record-form .el-form-item{margin:0;}
</style>
