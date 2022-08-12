// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Tokens Litio
 * @author Rafael Fuentes - RafaBlockDev
 */

contract Litio {
    /// @dev Set the name, symbol, and TotalSupply
    constructor() ERC20("Litio", "LT") {
        _mint(msg.sender, 10000000 ether);
    }
}
