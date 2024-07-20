<template>
    <div class="h-full p-20 flex flex-col items-center justify-center">
        <div class="relative h-72 w-72">
            <img src="/empty.png" alt="">
        </div>
        <p class="text-muted-foreground text-sm text-cente pt-4">{{ label }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    label:string
}>()
</script>

<style lang="scss" scoped></style>