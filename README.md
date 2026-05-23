# 🏎️ BMW Highway Racer - Ultimate Racing Game

An ultra-realistic 3D racing game built with React, Three.js, and Tailwind CSS. Experience high-speed highway racing with stunning graphics, physics, and gameplay mechanics.

## 🎮 Features

- **3D Racing Environment**: Built with Three.js and React Three Fiber for stunning visuals
- **Realistic Car Physics**: Smooth steering and speed control mechanics
- **Dynamic Traffic**: AI-controlled vehicles to dodge and avoid
- **Beautiful Sunset Environment**: Atmospheric lighting and fog effects
- **Score System**: Track your distance and score in real-time
- **Speed Control**: Accelerate and decelerate to navigate the highway
- **Collision Detection**: Game over on collision with traffic cars
- **Responsive HUD**: Real-time display of speed, distance, and score

## 🎮 Game Controls

| Action | Keys |
|--------|------|
| **Steer Left** | ⬅️ Arrow Left / A |
| **Steer Right** | ➡️ Arrow Right / D |
| **Increase Speed** | ⬆️ Arrow Up / W |
| **Decrease Speed** | ⬇️ Arrow Down / S |
| **Start/Restart** | SPACE |

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/SiddharthMishra123/racing-game.git
cd racing-game
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

The game will open automatically at `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
racing-game/
├── src/
│   ├── components/
│   │   └── UltimateRacingGame.jsx    # Main game component
│   ├── App.jsx                        # Root component
│   ├── main.jsx                       # React entry point
│   └── index.css                      # Tailwind CSS styles
├── index.html                         # HTML entry point
├── package.json                       # Dependencies
├── vite.config.js                     # Vite configuration
├── tailwind.config.js                 # Tailwind CSS config
├── postcss.config.js                  # PostCSS config
└── README.md                          # This file
```

## 🎨 Game Components

### PlayerCar
- Main player-controlled vehicle
- Rendered with body, roof, windshield, wheels, and lights
- Responsive to steering input
- Bounded lane movement (-5 to +5 on X-axis)

### Road
- Infinite scrolling highway
- Center lane markings
- Red guardrails on both sides

### Traffic
- Randomly spawned obstacle vehicles
- Collision detection system
- Progressive difficulty (more cars visible)

### Camera System
- Smooth following camera
- Perfect viewing angle for gameplay
- Lerp-based smooth movement

## 🎯 Gameplay Tips

1. **Start with medium speed** to get comfortable with steering
2. **Avoid the blue traffic cars** - collision = Game Over
3. **Maintain steady speed** for better control
4. **Plan your lane changes** in advance
5. **Watch the guardrails** - hitting them ends the game

## 🔧 Technologies Used

- **React 18**: UI framework
- **Three.js**: 3D graphics engine
- **React Three Fiber**: React renderer for Three.js
- **drei**: Helper library for Three.js
- **Tailwind CSS**: Styling
- **Vite**: Build tool and dev server

## 📊 Game Mechanics

### Speed System
- **Minimum Speed**: 60 km/h
- **Maximum Speed**: 320 km/h
- **Increment**: 10 km/h per keystroke
- **Default**: 120 km/h

### Scoring
- **Points per Update**: 5 points every 100ms
- **Distance**: 1 meter per 100ms
- **Bonus**: Higher speed = Higher score accumulation

### Collision Detection
- Checks distance between player car and traffic vehicles
- Triggers Game Over if collision detected
- Distance threshold: 2 units, X-axis threshold: 1.5 units

## 🎬 Scene Setup

- **Ambient Light**: 0.6 intensity for base illumination
- **Directional Light**: 2.0 intensity with 2048x2048 shadow map
- **Fog**: Sunset colors (from near 20 to far 140)
- **Environment**: Sunset preset from three.js
- **Camera FOV**: 60 degrees for immersive view

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📄 License

This project is open source and available under the MIT License.

## 🎉 Enjoy the Game!

Get ready to race! Start your engine and see how far you can go without crashing. Can you beat the high score?

---

**Made with ❤️ by SiddharthMishra123**
