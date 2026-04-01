import React from 'react';

export default function SkillBadge({ skill, type }) {
  const isMatch = type === 'match';
  const colorClasses = isMatch 
    ? "bg-green-950/50 text-green-300 border-green-900/50" 
    : "bg-red-950/50 text-red-300 border-red-900/50";

  return (
    <span className={`px-3 py-1 border rounded-full text-sm font-medium capitalize ${colorClasses}`}>
      {skill}
    </span>
  );
}