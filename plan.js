// Gym Tracker — Workout Plan Data
// 5-day rotation, required + optional exercises, sets/reps, alternatives, Persian labels, per-day notes.

const PLAN = [
  {
    id: "D1",
    label: "Chest + Triceps",
    labelFa: "سینه + پشت بازو",
    note: "اگر خسته بودی: بعد از حرکت 5 روز را تمام کن.",
    main: [
      { nameEn: "Barbell Bench Press", nameFa: "پرس سینه هالتر", sets: 3, reps: "6-10", alt: "Machine Chest Press" },
      { nameEn: "Incline Dumbbell Press", nameFa: "پرس بالا سینه دمبل", sets: 3, reps: "8-12", alt: "Incline Machine Press" },
      { nameEn: "Cable Fly", nameFa: "فلای سیم‌کش", sets: 2, reps: "10-15", alt: "Pec Deck" },
      { nameEn: "Rope Triceps Pushdown", nameFa: "پشت بازو سیم‌کش طنابی", sets: 3, reps: "10-15", alt: "Straight-Bar Pushdown" },
      { nameEn: "Overhead Cable Triceps Extension", nameFa: "پشت بازو بالای سر سیم‌کش", sets: 2, reps: "10-15", alt: "Dumbbell Overhead Extension" }
    ],
    extra: [
      { nameEn: "Dips", nameFa: "دیپ", sets: 2, reps: "8-12", alt: "Assisted Dips" },
      { nameEn: "Cable Crossover", nameFa: "کراس‌اور سیم‌کش", sets: 2, reps: "12-15", alt: "Pec Deck" }
    ]
  },
  {
    id: "D2",
    label: "Back + Biceps",
    labelFa: "پشت + جلو بازو",
    note: "برای فرد سنگین‌وزن، Chest-Supported Row عمداً جلوتر از Bent-Over Row گذاشته شده تا فشار روی کمر کمتر شود.",
    main: [
      { nameEn: "Lat Pulldown", nameFa: "لت سیم‌کش از بالا", sets: 3, reps: "8-12", alt: "Assisted Pull-Up" },
      { nameEn: "Chest-Supported Row", nameFa: "روئینگ با تکیه‌گاه سینه", sets: 3, reps: "8-12", alt: "Seated Cable Row" },
      { nameEn: "One-Arm Dumbbell Row", nameFa: "زیربغل دمبل تک‌دست", sets: 2, reps: "8-12", alt: "One-Arm Cable Row" },
      { nameEn: "Face Pull", nameFa: "فیس پول", sets: 2, reps: "12-15", alt: "Reverse Pec Deck" },
      { nameEn: "Dumbbell Curl", nameFa: "جلو بازو دمبل", sets: 3, reps: "8-12", alt: "EZ-Bar Curl" },
      { nameEn: "Hammer Curl", nameFa: "جلو بازو چکشی", sets: 2, reps: "10-15", alt: "Rope Cable Curl" }
    ],
    extra: [
      { nameEn: "Straight-Arm Pulldown", nameFa: "پول‌داون دست صاف", sets: 2, reps: "12-15", alt: "Dumbbell Pullover" },
      { nameEn: "Preacher Curl", nameFa: "جلو بازو لاری", sets: 2, reps: "10-15", alt: "Machine Curl" }
    ]
  },
  {
    id: "D3",
    label: "Legs + Abs",
    labelFa: "پا + شکم",
    note: "این روز را حذف نکن. اگر هدفت بدن خوش‌فرم است، پاهای ضعیف تناسب بدن را خراب می‌کند. اگر زانو یا کمر اذیت شد، تکنیک از سنگین‌تر زدن مهم‌تر است.",
    main: [
      { nameEn: "Leg Press", nameFa: "پرس پا", sets: 3, reps: "8-12", alt: "Hack Squat" },
      { nameEn: "Romanian Deadlift", nameFa: "ددلیفت رومانیایی", sets: 3, reps: "8-12", alt: "Seated Leg Curl" },
      { nameEn: "Leg Extension", nameFa: "جلو پا دستگاه", sets: 2, reps: "10-15", alt: "Spanish Squat" },
      { nameEn: "Seated Leg Curl", nameFa: "پشت پا دستگاه نشسته", sets: 2, reps: "10-15", alt: "Lying Leg Curl" },
      { nameEn: "Standing Calf Raise", nameFa: "ساق پا ایستاده", sets: 3, reps: "10-15", alt: "Leg Press Calf Raise" },
      { nameEn: "Cable Crunch", nameFa: "کرانچ سیم‌کش", sets: 3, reps: "10-15", alt: "Machine Ab Crunch" },
      { nameEn: "Dead Bug", nameFa: "ددباگ", sets: 2, reps: "8-12 / side", alt: "Bird Dog" }
    ],
    extra: [
      { nameEn: "Bulgarian Split Squat", nameFa: "اسکوات بلغاری", sets: 2, reps: "8-12 / leg", alt: "Reverse Lunge" },
      { nameEn: "Hip Abduction Machine", nameFa: "دستگاه بازکننده ران", sets: 2, reps: "12-15", alt: "Cable Hip Abduction" }
    ]
  },
  {
    id: "D4",
    label: "Shoulders + Chest",
    labelFa: "سرشانه + سینه",
    note: "چرا نشر جانب مهم است؟ برای بدن V شکل، عضلات سرشانه جانبی به پهن‌تر دیده شدن بالاتنه کمک می‌کنند.",
    main: [
      { nameEn: "Seated Dumbbell Shoulder Press", nameFa: "پرس سرشانه دمبل نشسته", sets: 3, reps: "8-12", alt: "Machine Shoulder Press" },
      { nameEn: "Dumbbell Lateral Raise", nameFa: "نشر جانب دمبل", sets: 3, reps: "12-15", alt: "Cable Lateral Raise" },
      { nameEn: "Reverse Pec Deck", nameFa: "فلای معکوس دستگاه", sets: 2, reps: "12-15", alt: "Cable Rear-Delt Fly" },
      { nameEn: "Incline Machine Chest Press", nameFa: "پرس سینه بالا سینه دستگاه", sets: 3, reps: "8-12", alt: "Incline Dumbbell Press" },
      { nameEn: "Push-Up", nameFa: "شنا", sets: 2, reps: "8-15", alt: "Machine Chest Press" }
    ],
    extra: [
      { nameEn: "Cable Lateral Raise", nameFa: "نشر جانب سیم‌کش", sets: 2, reps: "12-15", alt: "Lean-Away Dumbbell Lateral Raise" },
      { nameEn: "Cable Front Raise", nameFa: "نشر جلو سیم‌کش", sets: 2, reps: "10-15", alt: "Dumbbell Front Raise" }
    ]
  },
  {
    id: "D5",
    label: "Full Body + Arms + Cardio",
    labelFa: "کل بدن + بازو + هوازی",
    note: "این روز عمداً ترکیبی است تا عضلاتی که در طول هفته کار کرده‌ای دوباره تحریک شوند، بدون اختصاص یک روز کامل به یک عضله.",
    main: [
      { nameEn: "Hack Squat", nameFa: "هاک اسکوات", sets: 3, reps: "8-12", alt: "Leg Press" },
      { nameEn: "Seated Cable Row", nameFa: "قایقی سیم‌کش", sets: 3, reps: "8-12", alt: "Chest-Supported Row" },
      { nameEn: "Machine Chest Press", nameFa: "پرس سینه دستگاه", sets: 3, reps: "8-12", alt: "Dumbbell Bench Press" },
      { nameEn: "Dumbbell Lateral Raise", nameFa: "نشر جانب دمبل", sets: 2, reps: "12-15", alt: "Cable Lateral Raise" },
      { nameEn: "EZ-Bar Curl", nameFa: "جلو بازو هالتر EZ", sets: 2, reps: "8-12", alt: "Dumbbell Curl" },
      { nameEn: "Rope Triceps Pushdown", nameFa: "پشت بازو طنابی", sets: 2, reps: "10-15", alt: "Straight-Bar Pushdown" },
      { nameEn: "Plank", nameFa: "پلانک", sets: 3, reps: "30-60 sec", alt: "Dead Bug" }
    ],
    extra: [
      { nameEn: "Walking Lunges", nameFa: "لانج راه‌رفتنی", sets: 2, reps: "10 / leg", alt: "Reverse Lunges" },
      { nameEn: "Cable Crunch", nameFa: "کرانچ سیم‌کش", sets: 2, reps: "12-15", alt: "Machine Ab Crunch" },
      { nameEn: "Incline Treadmill Walk", nameFa: "راه رفتن روی تردمیل با شیب", sets: 1, reps: "15-25 min", alt: "Stationary Bike" }
    ]
  }
];
