<template>
    <div>
        <heading title="Video Generation" description="Turn your prompt into video." icon="lucide:video"
            iconColor="text-orange-700" bg-color="bg-orange-700/10" />
        <div class="px-4 lg:px-8">
            <div>
                <form @submit.prevent="submitPrompt"
                    class="border rounded-lg w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                    <div class="col-span-12 lg:col-span-10 flex flex-col justify-center">
                        <div class="m-0 p-0">
                            <input v-model="prompt" placeholder="Clown fish swimming in a coral reef, beautiful"
                                class="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent w-full" />
                        </div>
                    </div>
                    <Button class="col-span-12 lg:col-span-2" type="submit" :disabled="!prompt || isLoading">
                        Generate
                    </Button>
                </form>
            </div>
            <div class="space-y-4 mt-4">
                <div v-if="isLoading" class="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                    <Loader />
                </div>

                <Empty v-if="!video && !isLoading" label="No video files generated." />

                <video v-if="video" controls class="w-full aspect-video mt-8 rounded-lg border bg-black">
                    <source :src="video" />
                </video>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useProModal } from '@/store/useProModal';
const proModal = useProModal();
const prompt = ref('');
const isLoading = ref(false);
const video = ref<string>();

const submitPrompt = async () => {
    isLoading.value = true;
    video.value = undefined;
    const { data, error } = await useFetch<string[]>('/api/video', {
        method: 'POST',
        body: {
            prompt: prompt.value,
        },
    });
    if (error.value) {
        console.log('[Video_Error]', error.value.statusMessage);
        if (error.value.statusCode === 403) {
            proModal.onOpen();
        }
    }

    if (data.value) {
    video.value = data.value[0];
    await refreshNuxtData('userData');
  }
  prompt.value = '';
  isLoading.value = false;
};
</script>