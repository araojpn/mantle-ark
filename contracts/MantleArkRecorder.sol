// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MantleArkRecorder {
    event DiagnosisRecorded(
        address indexed wallet,
        uint8 animalType,
        uint8 level,
        uint8 botScore,
        uint8 threatScore,
        bytes32 featureHash,
        string metadataURI
    );

    function recordDiagnosis(
        address wallet,
        uint8 animalType,
        uint8 level,
        uint8 botScore,
        uint8 threatScore,
        bytes32 featureHash,
        string calldata metadataURI
    ) external {
        emit DiagnosisRecorded(wallet, animalType, level, botScore, threatScore, featureHash, metadataURI);
    }
}
