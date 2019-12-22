<template>
  <div>
    <em>作成者：パルト・溝上・新屋敷・中島｜富士通Hack the Futureハッカソン</em>
  </div>
</template>

<script>
  export default {
    props: ['value'],
    methods: {
      onInput (event) {
        this.$emit('input', event.target.value)
      }
    }
  }
</script>

<style scoped>
em {
　　font-weight: bold;
  font-size: 15px;
  background: -webkit-linear-gradient(#002, #557);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>