import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import GameStats from '../components/GameStats';
import { User, Mail, Award, Calendar } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { stats } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-dark-100 rounded-lg p-6 mb-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-primary-300">Your Profile</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <div className="bg-dark-200 p-6 rounded-lg">
                <div className="w-24 h-24 mx-auto bg-primary-700 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-white">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-center text-white mb-6">
                  {user.username}
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User size={18} className="text-primary-400" />
                    <span className="text-gray-300">{user.username}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-primary-400" />
                    <span className="text-gray-300">{user.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Award size={18} className="text-primary-400" />
                    <span className="text-gray-300">
                      {stats.gamesWon} wins out of {stats.gamesPlayed} games
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-primary-400" />
                    <span className="text-gray-300">Member since 2025</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <div className="bg-dark-200 p-6 rounded-lg h-full">
                <h2 className="text-xl font-bold mb-6 text-primary-300">Game Statistics</h2>
                
                <GameStats stats={stats} />
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 text-white">Recent Achievements</h3>
                  
                  {stats.gamesPlayed > 0 ? (
                    <div className="space-y-3">
                      {stats.bestStreak >= 3 && (
                        <div className="bg-dark-100 p-3 rounded flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center">
                            <Award size={20} className="text-primary-300" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">Streak Master</h4>
                            <p className="text-sm text-gray-400">Achieved a streak of {stats.bestStreak} wins</p>
                          </div>
                        </div>
                      )}
                      
                      {stats.gamesWon >= 5 && (
                        <div className="bg-dark-100 p-3 rounded flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center">
                            <Award size={20} className="text-primary-300" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">Word Wizard</h4>
                            <p className="text-sm text-gray-400">Won {stats.gamesWon} games</p>
                          </div>
                        </div>
                      )}
                      
                      {stats.gamesPlayed >= 10 && (
                        <div className="bg-dark-100 p-3 rounded flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center">
                            <Award size={20} className="text-primary-300" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">Dedicated Player</h4>
                            <p className="text-sm text-gray-400">Played {stats.gamesPlayed} games</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-400">Play some games to earn achievements!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;