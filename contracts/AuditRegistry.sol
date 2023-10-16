// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.9;

struct Artifact {
    address owner;
    bytes32 codeHash;
    string reportLink;
    address[] related;
}

contract AuditRegistry {
    mapping(address => Artifact[]) registry;

    event Added();
    event Removed();

    constructor() {

    }

    function add() public {}

    function remove() public {}
}
