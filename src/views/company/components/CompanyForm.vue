<template>
  <div class="createCompany-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <el-button
          v-loading="loading"
          style="margin-left: 10px;"
          type="success"
          @click="submitForm"
        >Save</el-button>
      </sticky>

      <div class="createCompany-main-container">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label-width="80px" label="Code" prop="code" class="createCompany-main-container-item">
              <el-input
                v-model="postForm.code"
                maxlength="30"
                name="code"
                class
                required
                placeholder="Unique Code for Company"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label-width="80px"
              label="Partner"
              prop="partnerships"
              class="createCompany-main-container-item"
            >
              <el-select
                v-model="postForm.partnerships"
                multiple
                filterable
                class="custom-select"
                placeholder="Search Partnership"
              >
                <el-option
                  v-for="item in partnershipOptions"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label-width="80px" label="Name" prop="name" class="createCompany-main-container-item">
              <el-input
                v-model="postForm.name"
                maxlength="250"
                name="name"
                class
                required
                placeholder="Company Full Name"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label-width="80px"
              label="Website"
              prop="website"
              class="createCompany-main-container-item"
            >
              <el-input
                v-model="postForm.website"
                type="url"
                maxlength="250"
                name="website"
                class
                required
                placeholder="Office Website"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label-width="80px"
              label="Country"
              prop="country"
              class="createCompany-main-container-item"
            >
              <el-input
                v-model="postForm.country"
                type="text"
                maxlength="250"
                name="country"
                class
                required
                placeholder="Country"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item
              label-width="80px"
              label="Address"
              prop="address"
              class="createCompany-main-container-item"
            >
              <el-input
                v-model="postForm.add1"
                type="textarea"
                :rows="4"
                placeholder="Please enter complete address"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item
              label-width="80px"
              label="Contracts"
              class="createCompany-main-container-item"
            >
              <el-card class="child-form-card">
                <div slot="header" class="clearfix">
                  <el-button type="primary" @click="addContact">Add</el-button>
                  <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                    @click="showContacts = !showContacts"
                  >{{ showContacts ? 'Collapse': 'Expand' }}</el-button>
                </div>
                <div class="child-form-card-content" :class="{isActive: showContacts}">
                  <div v-for="(form,index) in postForm.contacts" :key="index" class="company-contacts-form">
                    <h1>{{ form.name || 'Contact ' + (index + 1) }}</h1>
                    <el-form ref="contactForm" :model="form" label-width="60px" lable-position="left">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label-width="80px" label="Name" prop="name">
                            <el-input v-model="form.name" placeholder="Person name." />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label-width="80px" label="Dep." prop="department">
                            <el-input v-model="form.department" placeholder="Please select department." />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label-width="80px" label="Email" prop="email">
                            <el-input v-model="form.email" type="email" placeholder="Contact email." />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label-width="80px" label="Tel." prop="tel1">
                            <el-input v-model="form.tel1" type="tel" placeholder="Contact phone." />
                          </el-form-item>
                        </el-col>
                      </el-row>

                    </el-form>
                    <div class="contactForm-actions"><span class="del-btn" @click="delContact(index)"><i class="el-icon-delete" /></span></div>
                  </div>
                </div>
              </el-card>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import { validURL } from '@/utils/validate'
import { fetchClient, updateClient } from '@/api/clients'
import { getPartnerships } from '@/api/remote-search'

const defaultForm = {
  id: undefined,
  partnerships: [], // 合作关系
  code: '', // 公司代号
  name: '', // 公司名称
  website: '', // 网址
  add1: '', // 公司地址
  country: '', // 国家

  contacts: [],
  records: []
}

// 联系人子表
const contact = {
  code: '', // 人员代号
  name: '', // 姓名
  department: '', // 部门
  email: '', // 邮箱
  tel1: '' // 电话
}

// 记录子表
const record = {
  user: '', // 用户名
  timestamp: '', // 时间戳
  description: '' // 描述
}

export default {
  name: 'CompanyForm',
  components: { Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '' || (typeof value !== 'number' && Object.keys(value).length === 0)) {
        this.$message({
          message: rule.field + ' is required field',
          type: 'error'
        })
        callback(new Error(rule.field + ' is required field'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: 'Invaild URL format',
            type: 'error'
          })
          callback(new Error('Invaild URL format'))
        }
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      partnershipOptions: [{
        id: 1,
        name: 'Client'
      }, {
        id: 2,
        name: 'Supplier'
      }, {
        id: 3,
        name: 'Partner'
      }],
      showContacts: true,
      rules: {
        partnerships: [{ validator: validateRequire }],
        code: [{ validator: validateRequire }],
        name: [{ validator: validateRequire }],
        website: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      contactRules: {

      },
      tempRoute: {}
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
    // this.getRemotePartnershipList()
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchClient(id).then(response => {
        console.log(response)
        this.postForm = response.data

        // just for test
        // this.postForm.title += `   Article Id:${this.postForm.id}`
        // this.postForm.content_short += `   Article Id:${this.postForm.id}`

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log('fetchData with ERROR!!!')
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = 'Edit'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Edit'
      document.title = `${title} - ${this.postForm.id}`
    },
    getRemotePartnershipList(query) {
      query = query || ''
      getPartnerships(query).then(response => {
        if (!response.data.items) return
        console.log('getRemotePartnershipList....')
        console.log(response)
        this.partnershipOptions = response.data.items.map(v => v.name)
      })
    },
    addContact() {
      this.postForm.contacts.push(Object.assign({}, contact))
      this.showContacts = true
    },
    delContact(index) {
      this.postForm.contacts.splice(index, 1)
    },
    addRecord() {
      this.postForm.records.push(record)
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          updateClient(this.postForm).then(function(response) {
            this.$notify({
              title: 'Success',
              message: 'Save success',
              type: 'success',
              duration: 2000
            })
            this.loading = false
          })
          console.log(this.postForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createCompany-container {
  position: relative;

  .createCompany-main-container {
    padding: 40px 45px 20px 50px;

    .custom-select {
      width: 480px;
      max-width: 100%;
    }

    .child-form-card-content {
      display: none;
      padding: 20px;

      &.isActive{
        display: block;
      }
      .contactForm-actions{
        text-align: right;

        .del-btn{
          color:#ff0000;
          cursor: pointer;
        }
      }
    }
    .companyContacts-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .companyContacts-container-item {
        float: left;
      }
    }
  }
}
.el-form-item .el-form-item {
    margin-bottom: 22px;
}
</style>
<style>
  .child-form-card .el-card__body {
    padding: 0;
  }
</style>

