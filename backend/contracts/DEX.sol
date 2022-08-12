// SPDX-License-Identifier: MIT

/// @author Rafael Fuentes - RafaBlockDev
/// @title DEX
pragma solidity ^0.8.0;

import "./LitioToken.sol";

/**
 * @title Staking Contract
 * @author Rafael Fuentes - RafaBlockDev
 */

contract DEX {
    string name = "Yield Farming";
    LitioToken public litToken;

    /// @dev Declating owner state variable
    address public owner;

    /**
     * TODO
     * Default APY
     * APY for staking ( would be 0.1% per day || 49% APY per year)
     * Total Staked
     * Users balance
     * Users list to know who are staking
     * Users list to know who staked
     * Users list of all stakers
     * Stake token
     * Unstake token
     * Airdrop token
     * Change APY for custom staking
     */
}
