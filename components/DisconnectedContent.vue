<template>
    <div class="flex flex-col items-center gap-[30px] mt-[30px]">
        <p class="text-[18px] text-primary-500">
            Metamask is not connected
        </p>
        <button
            class="px-[25px] py-[10px] bg-primary-300 rounded-[8px] text-[18px] text-primary-400"
            @click="$emit('connect')"
        >
            Connect
        </button>
    </div>
</template>