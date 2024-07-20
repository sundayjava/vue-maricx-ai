<template>
    <div class="h-full flex flex-col gap-y-4 items-center justify-center">
        <div class="w-10 h-10 relative animate-spin">
            <img src="/logo.jpeg" alt="" class=" rounded-2xl">
        </div>
        <p v-if="processing" class="text-sm text-muted-foreground">
            Maricx is processing...
        </p>
    </div>
</template>

<script setup lang="ts">
interface Props {
    processing?: Boolean
}

withDefaults(
    defineProps<Props>(), {
    processing: true
}
)
</script>

<style lang="scss" scoped></style>