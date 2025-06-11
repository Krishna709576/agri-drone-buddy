import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Plane, 
  Play, 
  Pause, 
  RotateCcw, 
  Zap,
  Activity,
  Thermometer,
  Droplets
} from "lucide-react";
import { useRealTimeTracking } from "@/hooks/useRealTimeTracking";

interface DronePosition {
  x: number;
  y: number;
  rotation: number;
  isActive: boolean;
}

interface FarmGrid {
  id: string;
  x: number;
  y: number;
  status: 'untreated' | 'spraying' | 'completed';
  cropHealth: number;
  moistureLevel: number;
}

const FarmMapView = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isAnimating, setIsAnimating] = useState(false);
  const [dronePosition, setDronePosition] = useState<DronePosition>({
    x: 50,
    y: 50,
    rotation: 0,
    isActive: false
  });

  // Create farm grid (8x6 grid)
  const [farmGrid, setFarmGrid] = useState<FarmGrid[]>(() => {
    const grid: FarmGrid[] = [];
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 8; col++) {
        grid.push({
          id: `${row}-${col}`,
          x: col * 60 + 30,
          y: row * 60 + 30,
          status: 'untreated',
          cropHealth: 70 + Math.random() * 30,
          moistureLevel: 40 + Math.random() * 40
        });
      }
    }
    return grid;
  });

  const { droneLocation, bookingStatus } = useRealTimeTracking("booking-live", "drone-001");

  // Animation path for drone
  const droneWaypoints = [
    { x: 50, y: 50 },
    { x: 150, y: 50 },
    { x: 150, y: 110 },
    { x: 90, y: 110 },
    { x: 90, y: 170 },
    { x: 210, y: 170 },
    { x: 210, y: 230 },
    { x: 150, y: 230 },
    { x: 150, y: 290 },
    { x: 270, y: 290 },
    { x: 270, y: 350 },
    { x: 330, y: 350 },
    { x: 330, y: 290 },
    { x: 390, y: 290 },
    { x: 390, y: 230 },
    { x: 450, y: 230 }
  ];

  const [currentWaypoint, setCurrentWaypoint] = useState(0);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw farm grid
    farmGrid.forEach((cell) => {
      // Cell background based on status
      let fillColor = '#e8f5e8'; // untreated
      if (cell.status === 'spraying') fillColor = '#fff3cd';
      if (cell.status === 'completed') fillColor = '#d4edda';

      ctx.fillStyle = fillColor;
      ctx.fillRect(cell.x - 25, cell.y - 25, 50, 50);

      // Cell border
      ctx.strokeStyle = '#28a745';
      ctx.lineWidth = 2;
      ctx.strokeRect(cell.x - 25, cell.y - 25, 50, 50);

      // Crop health indicator
      const healthColor = cell.cropHealth > 80 ? '#28a745' : 
                         cell.cropHealth > 60 ? '#ffc107' : '#dc3545';
      ctx.fillStyle = healthColor;
      ctx.fillRect(cell.x - 23, cell.y - 23, 8, 8);

      // Moisture indicator
      const moistureHeight = (cell.moistureLevel / 100) * 20;
      ctx.fillStyle = '#007bff';
      ctx.fillRect(cell.x + 15, cell.y + 25 - moistureHeight, 6, moistureHeight);
    });

    // Draw drone
    ctx.save();
    ctx.translate(dronePosition.x, dronePosition.y);
    ctx.rotate((dronePosition.rotation * Math.PI) / 180);

    // Drone body
    ctx.fillStyle = dronePosition.isActive ? '#007bff' : '#6c757d';
    ctx.fillRect(-15, -8, 30, 16);

    // Drone propellers
    ctx.fillStyle = '#343a40';
    ctx.fillRect(-20, -12, 8, 4);
    ctx.fillRect(12, -12, 8, 4);
    ctx.fillRect(-20, 8, 8, 4);
    ctx.fillRect(12, 8, 8, 4);

    // Spray effect when active
    if (dronePosition.isActive && isAnimating) {
      ctx.fillStyle = 'rgba(40, 167, 69, 0.3)';
      ctx.beginPath();
      ctx.arc(0, 20, 30, 0, 2 * Math.PI);
      ctx.fill();
    }

    ctx.restore();

    // Draw flight path
    ctx.strokeStyle = 'rgba(0, 123, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    droneWaypoints.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const animate = () => {
    if (!isAnimating) return;

    const targetWaypoint = droneWaypoints[currentWaypoint];
    const dx = targetWaypoint.x - dronePosition.x;
    const dy = targetWaypoint.y - dronePosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 5) {
      // Reached waypoint, move to next
      setCurrentWaypoint((prev) => (prev + 1) % droneWaypoints.length);
      
      // Update farm grid status
      setFarmGrid(prev => prev.map(cell => {
        const cellDistance = Math.sqrt(
          (cell.x - dronePosition.x) ** 2 + (cell.y - dronePosition.y) ** 2
        );
        if (cellDistance < 40 && cell.status === 'untreated') {
          return { ...cell, status: 'spraying' };
        }
        if (cellDistance > 60 && cell.status === 'spraying') {
          return { ...cell, status: 'completed' };
        }
        return cell;
      }));
    } else {
      // Move towards waypoint
      const speed = 2;
      const moveX = (dx / distance) * speed;
      const moveY = (dy / distance) * speed;
      const rotation = (Math.atan2(dy, dx) * 180) / Math.PI;

      setDronePosition(prev => ({
        ...prev,
        x: prev.x + moveX,
        y: prev.y + moveY,
        rotation: rotation,
        isActive: true
      }));
    }

    drawCanvas();
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    drawCanvas();
  }, [farmGrid, dronePosition]);

  useEffect(() => {
    if (isAnimating) {
      animate();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, currentWaypoint]);

  const handleStartStop = () => {
    setIsAnimating(!isAnimating);
    setDronePosition(prev => ({ ...prev, isActive: !isAnimating }));
  };

  const handleReset = () => {
    setIsAnimating(false);
    setCurrentWaypoint(0);
    setDronePosition({ x: 50, y: 50, rotation: 0, isActive: false });
    setFarmGrid(prev => prev.map(cell => ({ ...cell, status: 'untreated' })));
  };

  const completedCells = farmGrid.filter(cell => cell.status === 'completed').length;
  const totalCells = farmGrid.length;
  const progress = (completedCells / totalCells) * 100;

  return (
    <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-600" />
          Farm Progress Map
        </h3>
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-100 text-emerald-700">
            {progress.toFixed(1)}% Complete
          </Badge>
          <Badge className="bg-blue-100 text-blue-700">
            {droneLocation?.status || 'Ready'}
          </Badge>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-4">
        <Button
          onClick={handleStartStop}
          className={`${
            isAnimating 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-emerald-600 hover:bg-emerald-700'
          }`}
        >
          {isAnimating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isAnimating ? 'Pause' : 'Start'} Spraying
        </Button>
        <Button onClick={handleReset} variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <span className="text-sm">Live Tracking</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-600" />
            <span className="text-sm">{completedCells}/{totalCells} Sections</span>
          </div>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 mb-4">
        <canvas
          ref={canvasRef}
          width={500}
          height={400}
          className="border-2 border-green-200 rounded-lg w-full"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border-2 border-green-500 rounded"></div>
          <span>Untreated</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-500 rounded"></div>
          <span>Spraying</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-200 border-2 border-green-600 rounded"></div>
          <span>Completed</span>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <Thermometer className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <div className="text-sm text-gray-600">Temperature</div>
          <div className="font-semibold">24°C</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <Droplets className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <div className="text-sm text-gray-600">Humidity</div>
          <div className="font-semibold">65%</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg text-center">
          <Plane className="w-5 h-5 text-purple-600 mx-auto mb-1" />
          <div className="text-sm text-gray-600">Speed</div>
          <div className="font-semibold">{droneLocation?.speed?.toFixed(1) || '0'} km/h</div>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg text-center">
          <Activity className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
          <div className="text-sm text-gray-600">Battery</div>
          <div className="font-semibold">{droneLocation?.battery?.toFixed(0) || '100'}%</div>
        </div>
      </div>
    </Card>
  );
};

export default FarmMapView;
