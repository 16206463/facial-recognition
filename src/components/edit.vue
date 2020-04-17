<template>
  <div class="edit-box">
    <div class="btn-box">
      <button @click="handleClick">运行代码</button>
      <button class="edit" @click="edit">重新编辑</button>
    </div>
    <div class="style-box">
      <textarea :disabled="disabled" name="code" placeholder="请在此编写.vue文件" @input="handleChange"></textarea>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'edit',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        currentValue: this.value,
        disabled: false
      }
    },
    methods: {
      handleChange (e) {
        const val = e.target.value
        this.$emit('input', val)
      },
      handleClick () {
        this.$emit('running')
        if (this.currentValue) {
          this.disabled = true
        }
      },
      edit () {
        this.disabled = false
      }
    }
  }
</script>
