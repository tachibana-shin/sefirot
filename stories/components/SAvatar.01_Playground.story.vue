<script setup lang="ts">
import SAvatar from 'sefirot/components/SAvatar.vue'

const title = 'Components / SAvatar / 01. Playground'
const docs = '/components/avatar'

const variants = [
  { title: 'Nano', size: 'nano' },
  { title: 'Mini', size: 'mini' },
  { title: 'Small', size: 'small' },
  { title: 'Medium', size: 'medium' },
  { title: 'Large', size: 'large' }
] as const
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <Board :title="title" :docs="docs">
      <div class="grid gap-y-32">
        <div v-for="v in variants" :key="v.size" class="grid gap-y-12">
          <div class="leading-24 text-14 font-500 text-c-2">
            {{ v.title }}
          </div>
          <div class="flex flex-wrap gap-16">
            <SAvatar :size="v.size" avatar="https://avatars.githubusercontent.com/u/3753672?v=4" />
            <SAvatar :size="v.size" avatar="https://avatars.githubusercontent.com/u/62658104?v=4" />
            <SAvatar :size="v.size" avatar="https://avatars.githubusercontent.com/u/16436160?v=4" />
            <SAvatar :size="v.size" name="John Doe" />
            <SAvatar :size="v.size" name="Anna Green" />
            <SAvatar :size="v.size" name="George Walsh" />
          </div>
        </div>
      </div>
    </Board>
  </Story>
</template>
