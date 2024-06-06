pragma solidity ^0.8.0;

import "./FloorPack.sol";
import "./mason/utils/Administrable.sol";

contract FloorPackFactory is Administrable {
    function createFloorPack(
        string memory _name,
        string memory _symbol,
        string memory _uri,
        string memory _contractMetadataUri
    ) external onlyOperatorsAndOwner returns (address) {
        FloorPack newFloorPack = new FloorPack(
            _name,
            _symbol,
            _uri,
            _contractMetadataUri
        );
        return address(newFloorPack);
    }
}
