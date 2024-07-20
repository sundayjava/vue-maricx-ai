<template>
    <Sheet>
        <SheetTrigger as-child>
            <Button variant="outline" class="md:hidden pr-4 hover:opacity-75 transition">
                <Icon name="lucide:menu" class="w-5 h-5"/>
            </Button>
        </SheetTrigger>
        <SheetContent side="left" class="p-0 bg-white w-[70%]">
            <Sidebar />
        </SheetContent>
    </Sheet>
</template>

<script setup>
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
</script>

<style lang="scss" scoped></style>