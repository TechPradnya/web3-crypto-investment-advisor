// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CryptoAdvisor {

    struct Recommendation {
        address user;
        uint budget;
        string risk;
        string suggestion;
        uint timestamp;
    }

    Recommendation[] public recommendations;

    event RecommendationSaved(
        address user,
        uint budget,
        string risk,
        string suggestion,
        uint timestamp
    );

    function saveRecommendation(
        uint _budget,
        string memory _risk,
        string memory _suggestion
    ) public {
        Recommendation memory newRecommendation = Recommendation(
            msg.sender,
            _budget,
            _risk,
            _suggestion,
            block.timestamp
        );

        recommendations.push(newRecommendation);

        emit RecommendationSaved(
            msg.sender,
            _budget,
            _risk,
            _suggestion,
            block.timestamp
        );
    }

    function getRecommendationCount() public view returns (uint) {
        return recommendations.length;
    }

    function getRecommendation(uint index)
        public
        view
        returns (
            address,
            uint,
            string memory,
            string memory,
            uint
        )
    {
        Recommendation memory r = recommendations[index];

        return (
            r.user,
            r.budget,
            r.risk,
            r.suggestion,
            r.timestamp
        );
    }
}