<template>
  <div>
    <ShackListItemVertical v-if="vertical" :shack="shack" :massif="massif" />
    <ShackListItemHorizontal v-else :shack="shack" :massif="massif" />
  </div>
</template>

<script>
import ShackListItemHorizontal from '@/components/shackListItem/ShackListItemHorizontal.vue';
import ShackListItemVertical from '@/components/shackListItem/ShackListItemVertical.vue';

export default {
  name: 'ShackListItem',
  components: {
    ShackListItemHorizontal,
    ShackListItemVertical,
  },
  props: {
    vertical: { type: Boolean, default: false },
    massif: { type: Object, required: false },
    shack: { type: Object, required: true },
  },
}
</script>
