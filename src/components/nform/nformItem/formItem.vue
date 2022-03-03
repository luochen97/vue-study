<template>
  <div class="formItem" :class="{ 'is-error': errorMessage }">
    <label v-if="label || $slots.label">
      <slot name="label">
        <span style="color: #f00; margin-right: 5px" v-if="prop">*</span>
        {{ label }}
      </slot>
    </label>
    <slot></slot>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>
<script>
import asyncValidator from 'async-validator'
export default {
  name: 'nFormItem',
  inject: ['form'],
  props: {
    label: {
      type: String
    },
    prop: {
      type: String
    }
  },
  data() {
    return {
      errorMessage: ''
    }
  },
  mounted() {
    this.$on('validate', this.validate)
  },
  methods: {
    validate() {
      var validator = new asyncValidator(this.form.rules)
      return validator.validate(
        { [this.prop]: this.form.model[this.prop] },
        (errors) => {
          console.log(errors)
          this.errorMessage = errors ? errors[0].message : ''
        }
      )
    }
  }
}
</script>
<style scoped>
.formItem {
  display: flex;
}
</style>
