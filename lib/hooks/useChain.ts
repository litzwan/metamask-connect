import { ref } from "vue";
import ethersProvider from "../ethersProvider";

export enum Chain {
    EthereumMainnet = 'mainnet',
    SepoliaTestnet = "sepolia",
}

export type ChainType = {
    text: string;
    name: Chain;
    currency: CurrencyType;
    id: number;
}

export type CurrencyType = 'ETH' | 'SepoliaETH'

export const chains: Record<Chain, ChainType> = {
    [Chain.EthereumMainnet]: {
        text: 'Ethereum Mainnet',
        name: Chain.EthereumMainnet,
        currency: 'ETH',
        id: 1,
    },
    [Chain.SepoliaTestnet]: {
        text: 'Sepolia Testnet',
        name: Chain.SepoliaTestnet,
        currency: 'SepoliaETH',
        id: 11155111,
    },
};

function useChain() {
    const currentChain = ref<ChainType | null>(null);

    async function setChain() {
        const chain = await ethersProvider()!.getNetwork();
        currentChain.value = chain ? chains[chain.name as Chain] : null;
    }

    async function switchChain(to: Chain) {
        try {
            const switchTo = chains[to];
            const chainIdHex = `0x${switchTo.id.toString(16)}`;

            await ethersProvider()!.send('wallet_switchEthereumChain', [{ chainId: chainIdHex }]);
            setChain();
        } catch (err) {
            console.error(err);
        }
    }

    function onDisconnect() {
        currentChain.value = null;
    }

    onMounted(() => {
        setChain();
    })

    return {
        currentChain,
        switchChain,
        setChain,
        onDisconnect,
    };
}

export default useChain;