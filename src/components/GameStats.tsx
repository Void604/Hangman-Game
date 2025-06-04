import React from 'react';
import { GameStats } from '../types';
import { Award, BarChart2, Hash, Zap } from 'lucide-react';

interface GameStatsProps {
  stats: GameStats;
}

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
}> = ({ title, value, icon }) => (
  <div className="bg-dark-100 p-4 rounded-lg flex flex-col items-center">
    <div className="text-primary-400 mb-2">{icon}</div>
    <div className="text-sm text-gray-400">{title}</div>
    <div className="text-2xl font-bold text-white">{value}</div>
  </div>
);

const GameStatsComponent: React.FC<GameStatsProps> = ({ stats }) => {
  const winPercentage = stats.gamesPlayed > 0
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
    : 0;
  
  const averageGuesses = stats.gamesPlayed > 0
    ? stats.averageGuesses.toFixed(1)
    : '-';

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <h2 className="text-xl font-bold text-center mb-4 text-primary-300">Your Stats</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          title="Games Played" 
          value={stats.gamesPlayed} 
          icon={<Hash size={24} />} 
        />
        <StatCard 
          title="Win Rate" 
          value={`${winPercentage}%`} 
          icon={<BarChart2 size={24} />} 
        />
        <StatCard 
          title="Current Streak" 
          value={stats.currentStreak} 
          icon={<Zap size={24} />} 
        />
        <StatCard 
          title="Best Streak" 
          value={stats.bestStreak} 
          icon={<Award size={24} />} 
        />
      </div>
    </div>
  );
};

export default GameStatsComponent;