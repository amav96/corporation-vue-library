<script lang="ts" setup>
import { toRefs } from 'vue';
import { BFormInvalidFeedback } from 'bootstrap-vue-next';

// Props
interface Props {
  errorMessages : string[],
  state: boolean | null | undefined
}

const props = defineProps<Props>()
const { errorMessages } = toRefs(props)


// End Props
</script>

<template>
  <BFormInvalidFeedback :state="state">
    <div class="d-flex">
      <span style="margin-right:4px;" v-for="(err,index) in errorMessages">
        {{ errorMessages.length > 1 && index < errorMessages.length - 1 ? err + ',' : err }}
      </span>
    </div>
  </BFormInvalidFeedback>
</template>