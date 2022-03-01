<template>
    <div>
      <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'nForm',
  provide(){
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate(callBack) {
      const validateArr = this.$children.filter(child => child.prop).map(child => child.validate())
      Promise.all(validateArr).then(() => callBack(true)).catch(() => callBack(false))
    }
  }
}
</script>