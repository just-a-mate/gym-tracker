const PLAN = [
  {
    id: "A",
    label: "Chest / Shoulders / Triceps",
    muscles: ["chest", "shoulders", "triceps"],
    main: [
      { name: "Bench Press", sets: 4, muscle: "chest" },
      { name: "Overhead Press", sets: 3, muscle: "shoulders" },
      { name: "Incline Dumbbell Press", sets: 3, muscle: "chest" },
      { name: "Triceps Pushdown", sets: 3, muscle: "triceps" }
    ],
    extra: [
      { name: "Lateral Raise", sets: 3, muscle: "shoulders" },
      { name: "Cable Fly", sets: 3, muscle: "chest" },
      { name: "Dips", sets: 3, muscle: "triceps" },
      { name: "Overhead Triceps Extension", sets: 3, muscle: "triceps" }
    ]
  },
  {
    id: "B",
    label: "Back / Biceps",
    muscles: ["back", "biceps"],
    main: [
      { name: "Lat Pulldown", sets: 4, muscle: "back" },
      { name: "Barbell Row", sets: 3, muscle: "back" },
      { name: "Seated Cable Row", sets: 3, muscle: "back" },
      { name: "Barbell Curl", sets: 3, muscle: "biceps" }
    ],
    extra: [
      { name: "Face Pull", sets: 3, muscle: "back" },
      { name: "Hammer Curl", sets: 3, muscle: "biceps" },
      { name: "Straight-Arm Pulldown", sets: 3, muscle: "back" },
      { name: "Reverse Fly", sets: 3, muscle: "back" }
    ]
  },
  {
    id: "C",
    label: "Legs / Glutes",
    muscles: ["quadriceps", "hamstrings", "glutes", "calves"],
    main: [
      { name: "Squat", sets: 4, muscle: "quadriceps" },
      { name: "Leg Press", sets: 3, muscle: "quadriceps" },
      { name: "Romanian Deadlift", sets: 3, muscle: "hamstrings" },
      { name: "Leg Curl", sets: 3, muscle: "hamstrings" }
    ],
    extra: [
      { name: "Leg Extension", sets: 3, muscle: "quadriceps" },
      { name: "Calf Raise", sets: 3, muscle: "calves" },
      { name: "Hip Thrust", sets: 3, muscle: "glutes" },
      { name: "Walking Lunge", sets: 3, muscle: "quadriceps" }
    ]
  },
  {
    id: "D",
    label: "Core / Cardio",
    muscles: ["abdominals", "cardio"],
    main: [
      { name: "Plank", sets: 3, muscle: "abdominals" },
      { name: "Cable Crunch", sets: 3, muscle: "abdominals" },
      { name: "Hanging Leg Raise", sets: 3, muscle: "abdominals" },
      { name: "Russian Twist", sets: 3, muscle: "abdominals" }
    ],
    extra: [
      { name: "Bicycle Crunch", sets: 3, muscle: "abdominals" },
      { name: "Mountain Climber", sets: 3, muscle: "cardio" },
      { name: "Ab Wheel Rollout", sets: 3, muscle: "abdominals" },
      { name: "Sit Up", sets: 3, muscle: "abdominals" }
    ]
  }
];
