import { ref, type Ref } from "vue";
import { ethers } from "ethers";
import ethersProvider from "@/lib/ethersProvider";

function useBalance(wallet: Ref<string | null>) {
    const balance = ref<string | number>(0);

    async function setBalance() {
        if (!wallet.value) {
            return;
        }

        const b = await ethersProvider()!.getBalance(wallet.value);
        balance.value = Number(ethers.formatEther(b)).toFixed(3);
    }

    function onDisconnect() {
        balance.value = 0;
    }

    onMounted(async () => {
        setBalance();
    });

    return {
        balance,
        setBalance,
        onDisconnect,
    }
}

export default useBalance;