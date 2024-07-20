<template>
    <div>
        <!-- Heading -->
        <heading title="Code Generation" description="Generate code using descriptive text" icon="lucide:code"
            iconColor="text-green-700" bg-color="bg-green-700/10" />
        <div class="px-4 lg:px-8">
            <div>
                <form @submit.prevent="submitForm"
                    class="border rounded-lg w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                    <div class="col-span-12 lg:col-span-10 flex flex-col justify-center">
                        <div class="m-0 p-0">
                            <input type="text" v-model="prompt" placeholder="How do i calculate the radius of a circle"
                                class="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent w-full">
                        </div>
                    </div>

                    <Button class="col-span-12 lg:col-span-2" type="submit" :disabled="!prompt || isLoading">
                        Generate
                    </Button>
                </form>
            </div>

            <!-- Loader -->
            <div class="space-y-4 mt-4">
                <div v-if="isLoading" class="p-8 rounded-lg w-full flex gap-x-3 items-center justify-center bg-muted">
                    <Loader />
                </div>
                <!-- Empty -->
                <Empty v-if="!messages.length && !isLoading" label="No conversation yet!" />

                <div class="flex flex-col-reverse gap-y-4">
                    <div v-for="(message, i) in messages" :key="i" :class="`p-8 w-full rounded-lg flex items-center ${message.role === 'user' ? 'bg-white border border-black/10' : 'bg-slate-200'
                        }`">
                        <!-- UserAvatar -->
                        <UserAvatar v-if="message.role === `user`" />
                        <BotAvatar v-else />
                        <p v-if="message.content"
                            class="prose-pre:overflow-auto prose-pre:w-full prose-pre:my-2 prose-pre:bg-black/10 prose-pre:p-2 prose-pre:rounded-lg prose-code:bg-black/10 prose-code:rounded-lg prose-code:p-1 text-sm overflow-hidden leading-7"
                            v-html="$mdRenderer.render(message.content)">
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Behaviour -->

    </div>
</template>

<script setup lang="ts">
/* __placeholder__ */
import type { ChatCompletionRequestMessage } from '~/types';
import { useProModal } from '@/store/useProModal';
const proModal = useProModal();
const prompt = ref("")
const isLoading = ref(false)

const { $mdRenderer } = useNuxtApp();

const messages = ref<ChatCompletionRequestMessage[]>([])

const submitForm = async () => {
    isLoading.value = true;
    const userMessage: ChatCompletionRequestMessage = {
        role: 'user',
        content: prompt.value,
    };

    const newMessages = [...messages.value, userMessage]

    const { data, error } = await useFetch('/api/code', {
        method: 'POST',
        body: {
            messages: newMessages
        }
    });

    if (error.value) {
        console.log('[Code_Error]', error.value.statusMessage);
        if (error.value.statusCode === 403) {
            proModal.onOpen();
        }
    }

    if (data.value) {
        messages.value = [
            ...messages.value,
            userMessage,
            {
                role: 'assistant',
                content: data.value.content as string,
            },
        ];
        await refreshNuxtData('userData');
    }
    prompt.value = '';
    isLoading.value = false;
}
</script>

<style lang="scss" scoped></style>