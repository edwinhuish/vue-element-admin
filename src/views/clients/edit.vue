<template>
  <company-form :is-edit="true" />
</template>

<script>
import CompanyForm from '../company/components/CompanyForm'

export default {
  name: 'EditForm',
  components: { CompanyForm }
}
</script>

