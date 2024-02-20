import { ethers } from 'ethers';

function ethersProvider() {
    if (!window) {
        return;
    }

    return new ethers.BrowserProvider(window.ethereum, 'any');
}

export default ethersProvider;