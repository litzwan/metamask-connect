<template>
    <div class="flex flex-col items-center">
        <p class="text-[18px] text-primary-500 font-semibold mb-[30px]">
            {{ slicedWalletAddress }}
        </p>
        <div class="mb-[30px]">
            <div class="flex flex-col items-center mb-[10px]">
                <span class="text-[14px] text-primary-500 font-semibold">
                    {{ currentChainName ? chains[currentChainName].text : 'Ethereum mainnet' }}
                </span>
                <span class="text-[24px] text-primary-400 font-semibold">
                    {{ balance }} {{ currentChainName ? chains[currentChainName].currency : 'ETH' }}
                </span>
            </div>
            <div class="flex items-center bg-primary-700 rounded-full">
                <button
                    v-for="chain in chains"
                    :key="chain.id"
                    :class="{
                        'text-[18px] text-primary-400 font-semibold px-[25px] py-[5px] rounded-full': true,
                        'bg-primary-300': isActiveChain(chain),
                    }"
                    @click="switchChain(chain)"
                >
                    {{ chain.text }}
                </button>
            </div>
        </div>
        <button
            class="px-[25px] py-[10px] bg-primary-600 rounded-[8px] text-[18px] text-primary-400"
            @click="$emit('disconnect')"
        >
            Disconnect
        </button>
    </div>
</template>

<script setup lang="ts">
import { Chain, type ChainType } from '../lib/hooks/useChain';
import { defineProps, computed } from 'vue';
import { chains } from '../lib/hooks/useChain';

const props = withDefaults(defineProps<{
  wallet: string | null,
  currentChainName: Chain | null,
  balance: string | number,
}>(), {
  wallet: null,
  currentChainName: null,
  balance: 0,
})

const emit = defineEmits<{
  (e: 'disconnect'): void
  (e: 'switch-chain', to: ChainType): void
}>()

const slicedWalletAddress = computed(() => {
    if (props.wallet) {
        return `${props.wallet.slice(0, 6)}...${props.wallet.slice(-4)}`
    }
    return '';
});

function isActiveChain(chain: ChainType) {
    return chain.name === props.currentChainName;
}

function switchChain(to: ChainType) {
    emit('switch-chain', to);
}
</script>