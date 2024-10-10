import React from 'react';

function RecommendationsList({ recommendations }) {
  if (recommendations.length === 0) {
    return <p>Enter a movie name for a recommendation!</p>;
  }

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
