
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, Gift, Users, Trophy } from "lucide-react";

const LoyaltyProgram = () => {
  const loyaltyData = {
    currentPoints: 2450,
    nextRewardAt: 3000,
    tier: "Silver",
    totalSavings: 1280,
    referrals: 3
  };

  const rewards = [
    { points: 1000, reward: "₹100 Discount", available: true },
    { points: 2500, reward: "Free Small Field Service", available: true },
    { points: 5000, reward: "₹500 Cashback", available: false },
    { points: 10000, reward: "Premium Service Package", available: false }
  ];

  const progressPercentage = (loyaltyData.currentPoints / loyaltyData.nextRewardAt) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
          Loyalty Program
        </h2>
        <p className="text-gray-600">Earn points with every booking and unlock amazing rewards</p>
      </div>

      {/* Points Summary */}
      <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-0 shadow-lg">
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-yellow-600">{loyaltyData.currentPoints}</div>
          <div className="text-sm text-gray-600">Loyalty Points</div>
          <Badge className="mt-2 bg-gradient-to-r from-yellow-500 to-orange-500">
            <Trophy className="w-4 h-4 mr-1" />
            {loyaltyData.tier} Member
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to next reward</span>
            <span>{loyaltyData.currentPoints}/{loyaltyData.nextRewardAt}</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="text-center text-sm text-gray-600">
            {loyaltyData.nextRewardAt - loyaltyData.currentPoints} points to go!
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center bg-white/95 backdrop-blur-sm border-0 shadow-md">
          <div className="text-2xl font-bold text-green-600">₹{loyaltyData.totalSavings}</div>
          <div className="text-sm text-gray-600">Total Savings</div>
        </Card>
        <Card className="p-4 text-center bg-white/95 backdrop-blur-sm border-0 shadow-md">
          <div className="text-2xl font-bold text-blue-600">{loyaltyData.referrals}</div>
          <div className="text-sm text-gray-600">Successful Referrals</div>
        </Card>
      </div>

      {/* Available Rewards */}
      <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Gift className="w-5 h-5 mr-2 text-purple-600" />
          Available Rewards
        </h3>
        <div className="space-y-3">
          {rewards.map((reward, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between p-3 rounded-lg border ${
                reward.available 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div>
                <div className="font-medium text-gray-800">{reward.reward}</div>
                <div className="text-sm text-gray-600">{reward.points} points</div>
              </div>
              <Button 
                size="sm" 
                disabled={!reward.available}
                className={reward.available 
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700" 
                  : ""
                }
              >
                {reward.available ? "Redeem" : "Locked"}
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Referral Program */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-0 shadow-lg">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-600" />
          Refer & Earn
        </h3>
        <p className="text-gray-600 mb-4">
          Invite friends and earn 500 points for each successful referral!
        </p>
        <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
          Share Referral Code: FARM2450
        </Button>
      </Card>
    </div>
  );
};

export default LoyaltyProgram;
