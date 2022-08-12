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

    /// @dev Declaring owner state variable
    address public owner;

    /// @dev Default APY (default 0.1% daily || 36.5% APY yearly)
    uint256 public defaultAPY = 100;

    /// @dev APY for custom staking (default 50% yearly)
    uint256 public customAPY = 137;

    /// @dev Total Staked
    uint256 public totalStaked;
    uint256 public customTotalStaked;

    /// @dev Users staking balance
    mapping(address => uint256) public stakingBalance;
    mapping(address => uint256) public customTotalStaked;

    /// @dev List of users who are staking
    mapping(address => bool) public isStaking;
    mapping(address => bool) public customIsStaking;

    /// @dev List of users who staked
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public customHasStaked;

    address[] public stakers;
    address[] public customStakers;

    /// @param _litio Is the token Litio
    constructor(Litio _litio) public payable {
        litio = _litio;
        owner = msg.sender;
    }

    /// @dev Function to stake tokens
    /// @param _amount is the amount choosed by the user to stake
    function stakeTokens(uint256 _amount) public {
        require(_amount > 0, "You cannot stake 0 tokens");

        /// @dev User adds token to the contract
        litio.transferFrom(msg.sender, address(this), _amount);
        totalStaked += _amount;
        stakingBalance[msg.sender] += _amount;

        /// @dev If user did not stake, add to array of stakers
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        hasStaked[msg.sender] = true;
        isStaking[msg.sender] = true;
    }

    /// @dev Function to unstake tokens
    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];

        require(balance > 0, "You need to have more than 0");

        litio.transfer(msg.sender, balance);
        totalStaked = totalStaked - balance;

        stakingBalance[msg.sender] = 0;

        isStaking[msg.sender] = false;
    }

    /// @dev Function to custom the staked tokens
    /// @param _amount is the amount that the user want to custom the staking
    function customStaking(uint256 _amount) public {
        require(_amount > 0, "You cannot have 0 token to custom Stake");
        litio.transferFrom(msg.sender, address(this), _amount);
        customTotalStaked += _amount;
        customStakingBalance[msg.sender] += _amount;

        if (!customHasStaked[msg.sender]) {
            customStakers.push(msg.sender);
        }

        customHasStaked[msg.sender] = true;
        customIsStaking[msg.sender] = true;
    }

    /// @dev Function to custom the unstaked amount
    function customUnstake() public {
        uint256 balance = customStakingBalance[msg.sender];
        require(balance > 0, "amount has to be more than 0");
        testToken.transfer(msg.sender, balance);
        customTotalStaked = customTotalStaked - balance;
        customStakingBalance[msg.sender] = 0;
        customIsStakingAtm[msg.sender] = false;
    }

    /// @dev Set an airdrop tokens for the owner
    function redistributeRewards() public {
        require(
            msg.sender == owner,
            "only the owner can redistribute the tokens"
        );
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];

            uint256 balance = stakingBalance[recipient] * defaultAPY;
            balance = balance / 100000;

            if (balance > 0) {
                litio.transfer(recipient, balance);
            }
        }
    }

    /// @dev Function to custom the Rewards from the owner
    function customRewards() public {
        require(msg.sender == owner, "Only contract creator can redistribute");
        for (uint256 i = 0; i < customStakers.length; i++) {
            address recipient = customStakers[i];
            uint256 balance = customStakingBalance[recipient] * customAPY;
            balance = balance / 100000;

            if (balance > 0) {
                testToken.transfer(recipient, balance);
            }
        }
    }

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
