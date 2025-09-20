
import React from 'react';
import type { Idea } from '../types';

interface IdeaCardProps {
  idea: Idea;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 flex flex-col transition-transform duration-300 hover:transform hover:-translate-y-2 hover:shadow-cyan-500/20">
      <div className="aspect-video w-full bg-gray-700 overflow-hidden">
        <img src={idea.imageUrl} alt={idea.pitch} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-cyan-300 mb-2">{idea.pitch}</h3>
        <p className="text-gray-400 text-sm mb-4 font-semibold uppercase tracking-wider">How it Works</p>
        <p className="text-gray-300 leading-relaxed flex-grow">{idea.howItWorks}</p>
      </div>
    </div>
  );
};

export default IdeaCard;
