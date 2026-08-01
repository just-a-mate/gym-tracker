const PLAN = [
  {
    id: "A",
    label: "Chest / Shoulders / Triceps",
    main: [
      { name: "Bench Press", sets: 4, exId: "Barbell_Bench_Press_-_Medium_Grip" },
      { name: "Overhead Press", sets: 3, exId: "Standing_Military_Press" },
      { name: "Incline Dumbbell Press", sets: 3, exId: "Incline_Dumbbell_Press" },
      { name: "Triceps Pushdown", sets: 3, exId: "Triceps_Pushdown" }
    ],
    extra: [
      { name: "Lateral Raise", sets: 3, exId: "Side_Lateral_Raise" },
      { name: "Cable Fly", sets: 3, exId: "Cable_Crossover" },
      { name: "Dips", sets: 3, exId: "Dips_-_Triceps_Version" },
      { name: "Overhead Triceps Extension", sets: 3, exId: "Standing_Dumbbell_Triceps_Extension" }
    ]
  },
  {
    id: "B",
    label: "Back / Biceps",
    main: [
      { name: "Lat Pulldown", sets: 4, exId: "Wide-Grip_Lat_Pulldown" },
      { name: "Barbell Row", sets: 3, exId: "Bent_Over_Barbell_Row" },
      { name: "Seated Cable Row", sets: 3, exId: "Seated_Cable_Rows" },
      { name: "Barbell Curl", sets: 3, exId: "Barbell_Curl" }
    ],
    extra: [
      { name: "Face Pull", sets: 3, exId: "Face_Pull" },
      { name: "Hammer Curl", sets: 3, exId: "Hammer_Curls" },
      { name: "Straight-Arm Pulldown", sets: 3, exId: "Straight-Arm_Pulldown" },
      { name: "Reverse Fly", sets: 3, exId: "Reverse_Flyes" }
    ]
  },
  {
    id: "C",
    label: "Legs / Glutes",
    main: [
      { name: "Squat", sets: 4, exId: "Barbell_Squat" },
      { name: "Leg Press", sets: 3, exId: "Leg_Press" },
      { name: "Romanian Deadlift", sets: 3, exId: "Romanian_Deadlift" },
      { name: "Leg Curl", sets: 3, exId: "Lying_Leg_Curls" }
    ],
    extra: [
      { name: "Leg Extension", sets: 3, exId: "Leg_Extensions" },
      { name: "Calf Raise", sets: 3, exId: "Standing_Calf_Raises" },
      { name: "Hip Thrust", sets: 3, exId: "Barbell_Hip_Thrust" },
      { name: "Walking Lunge", sets: 3, exId: "Dumbbell_Lunges" }
    ]
  },
  {
    id: "D",
    label: "Core / Cardio",
    main: [
      { name: "Plank", sets: 3, exId: "Plank" },
      { name: "Cable Crunch", sets: 3, exId: "Cable_Crunch" },
      { name: "Hanging Leg Raise", sets: 3, exId: "Hanging_Leg_Raise" },
      { name: "Russian Twist", sets: 3, exId: "Russian_Twist" }
    ],
    extra: [
      { name: "Bicycle Crunch", sets: 3, exId: "Air_Bike" },
      { name: "Mountain Climber", sets: 3, exId: "Mountain_Climbers" },
      { name: "Ab Wheel Rollout", sets: 3, exId: "Ab_Roller" },
      { name: "Sit Up", sets: 3, exId: "Sit-Up" }
    ]
  }
];
