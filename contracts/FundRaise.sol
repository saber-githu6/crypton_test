//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0; //указывает версию компилятора

import "@openzeppelin/contracts/access/Ownable.sol";

contract FundRaise is
    Ownable
{
    address[] donators;
    mapping(address => uint256) public balances;
    mapping(address => bool) public existing;

    constructor() {}

    function donateEther() external payable {
        //функция внесения эфира на контракт
        require(msg.value > 0 ether, "Amount can't be equal 0");
        if (existing[msg.sender] != true) {
            donators.push(msg.sender);
            existing[msg.sender] = true;
        }
        balances[msg.sender] += msg.value;
    }

    function transferDonates(uint256 _amount, address payable receiver)
        external
        payable
        onlyOwner
    {
        //функция вывода эфира на определенный адрес
        require(address(this).balance >= _amount, "Not enough ether");
        receiver.transfer(_amount);
    }

    function checkDonations(address account) external view returns (uint256) {
        //функция, позволяющая проверить, сколько эфира внесено на контракт с определенного кошелька
        return balances[account];
    }

    function viewDonators() external view returns (address[] memory) {
        //функция вывода списка донатеров контракта
        return donators;
    }

    function viewContractBalance() external view returns (uint256) {
        //проверить баланс контракта
        return address(this).balance;
    }
}
