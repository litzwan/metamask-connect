import { ref, type Ref } from "vue";
import { get, set, remove } from "@/lib/localStorage";
import ethersProvider from "../ethersProvider";

export const LOCAL_STORAGE_WALLET_KEY = 'wallet';

type OnDisconnectListeners = (() => void)[];

function useWallet(...onDisconnectListeners: OnDisconnectListeners) {
    const wallet = ref<string | null>(initWallet());

    function initWallet() {
        return get(LOCAL_STORAGE_WALLET_KEY) as string || null;
    }

    async function connect() {
        if (!window.ethereum) {
            throw new Error('Metamask extension is not installed');
        }

        try {
            const accounts: string[] = await ethersProvider()!.send('eth_requestAccounts', []);

            if (!accounts.length) {
                return
            }

            wallet.value = accounts[0];
            set(LOCAL_STORAGE_WALLET_KEY, accounts[0]);
        } catch (err) {
            console.error(err);
        }
    }

    function disconnect() {
        wallet.value = null;
        remove(LOCAL_STORAGE_WALLET_KEY);

        onDisconnectListeners.forEach(listener => listener());
    }

    return {
        wallet,
        connect,
        disconnect,
    }
}

export default useWallet;