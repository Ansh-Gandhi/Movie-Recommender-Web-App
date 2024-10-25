import React from 'react';

function RecommendationsList({ recommendations }) {

  return (
    <ul className="recommendations-list">
      {recommendations.map((recommendation, index) => (
        <li key={index}>
          <strong>{recommendation.title}</strong> <br />
          Genre: {recommendation.genre} <br />
          Rating: {recommendation.rating}
        </li>
      ))}
    </ul>
  );
}

export default RecommendationsList;
