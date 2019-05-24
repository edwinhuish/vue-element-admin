
<template>
  <el-timeline class="record-event-timeline">
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp"
      placement="top"
    >
      <el-card>
        <h4>{{ activity.description }}</h4>
        <p class="user">{{ activity.user }}</p>
      </el-card>

    </el-timeline-item>
  </el-timeline>
</template>

<script>

export default {
  name: 'RecordsTimeline',
  props: {
    source: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      activities: this.source
    }
  }
}
</script>
<style scoped>
.record-event-timeline{text-align: left;padding-left: 0;}
.record-event-timeline .user{text-align:right;}
</style>

