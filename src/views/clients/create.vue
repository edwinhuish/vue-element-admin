<template>
  <company-form :is-edit="false" />
</template>

<script>
import CompanyForm from '../company/components/CompanyForm'

export default {
  name: 'EditForm',
  components: { CompanyForm }
}
</script>
