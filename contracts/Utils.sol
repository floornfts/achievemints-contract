// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

library Utils {
    function uintToString(uint v) internal pure returns (string memory) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;

        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = bytes1(uint8(48 + remainder));
        }
        bytes memory s = new bytes(i);

        for (uint j = 0; j < i; ) {
            s[j] = reversed[i - j - 1];
            unchecked {
                ++j;
            }
        }

        string memory str = string(s);
        return str;
    }
}
