<template>
    <div class="min-h-[100vh] w-[100%] flex items-center justify-center">
        <div class="w-[100%] max-w-[700px] p-[30px] rounded-[20px] bg-primary-200 shadow-lg flex flex-col items-center">
            <h3 class="text-[24px] text-primary-400 font-semibold">
                Metamask Wallet
            </h3>

            <ClientOnly>
                <ConnectedContent
                    v-if="wallet"
                    :wallet="wallet"
                    :current-chain-name="currentChain?.name || null"
                    :balance="balance"
                    @disconnect="disconnect"
                    @switch-chain="(to) => switchChain(to.name)"
                />
                <DisconnectedContent @connect="connect" v-else />
            </ClientOnly>
        </div>
    </div>
</template>

<script setup lang="ts">
import ConnectedContent from '@/components/ConnectedContent.vue'
import DisconnectedContent from '@/components/DisconnectedContent.vue';
import useWallet from '@/lib/hooks/useWallet';
import useChain from '@/lib/hooks/useChain';
import useBalance from '@/lib/hooks/useBalance';
import ethersProvider from './lib/ethersProvider';
import { BrowserProvider } from 'ethers';
import { ref } from 'vue';

const { wallet, connect, disconnect } = useWallet(onWalletDisconnect);
const { currentChain, switchChain, setChain, onDisconnect: chainOnDisconnect } = useChain();
const { balance, setBalance, onDisconnect: balanceOnDisconnect } = useBalance(wallet);

function onWalletDisconnect() {
    chainOnDisconnect();
    balanceOnDisconnect();
}

watch(wallet, () => {
    if (wallet.value && !currentChain.value) {
        setChain();
    }

    if (wallet.value && balance.value === 0) {
        setBalance();
    }
})

watch(currentChain, () => {
    if (wallet.value && currentChain.value) {
        setBalance();
    }
})
</script>