<template>
    <div class="flex items-center p-4">
        <!-- Mobile Sidebar -->
         <MobileSidebar/>
        <div class="flex w-full justify-end">
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline">
                        <Icon name="lucide:circle-user-round" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" class="w-72 left-[100px]">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div class="w-full flex items-center p-2 pl-3">
                        <Avatar class="mr-2">
                            <AvatarImage v-if="user?.user_metadata.avatar_url" :src="user.user_metadata.avatar_url">
                            </AvatarImage>
                            <AvatarFallback>
                                {{ user.email?.charAt(0).toUpperCase() }}
                                {{ user.email?.charAt(1).toUpperCase() }}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div class="font-bold">{{ user?.user_metadata.full_name }}</div>
                            <div class="text-sm">{{ user?.email }}</div>
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem @click="logout" class="cursor-pointer hover:bg-muted">
                        <Icon class="mr-2 h-5 w-5" name="heroicons:arrow-left-end-on-rectangle" />
                        <span class="ml-2">Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
</template>

<script setup>
const user = useSupabaseUser()

const supabaseClient = useSupabaseClient();

const logout = async () => {
    await supabaseClient.auth.signOut();
    navigateTo('/auth')
}

</script>

<style lang="scss" scoped></style>