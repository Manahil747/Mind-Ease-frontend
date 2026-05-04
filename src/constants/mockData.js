export const THERAPISTS = [
  {
    id: "t1",
    name: "Dr. Sarah Jenkins",
    specialty: "Clinical Psychologist",
    availability: "Mon, Wed, Fri",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    rating: 4.8,
  },
  {
    id: "t2",
    name: "Mr. David Ross",
    specialty: "Cognitive Behavioral Therapist",
    availability: "Tue, Thu",
    avatar: "https://i.pravatar.cc/150?u=david",
    rating: 4.9,
  },
  {
    id: "t3",
    name: "Dr. Emily Chen",
    specialty: "Psychiatrist & Counselor",
    availability: "Mon to Fri",
    avatar: "https://i.pravatar.cc/150?u=emily",
    rating: 4.7,
  },
];

export const RESOURCES = [
  {
    id: "r1",
    title: "10 Simple Ways to Reduce Stress",
    category: "Anxiety",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
    content: `
      Stress is a natural physical and mental reaction to life experiences. Everyone expresses stress from time to time.<br><br>
      <strong>1. Exercise regularly:</strong> Physical activity is one of the most effective stress busters.<br>
      <strong>2. Practice mindfulness:</strong> Take 5 minutes a day to sit quietly and focus on your breathing.<br>
      <strong>3. Stay connected:</strong> Talk to a friend, family member, or a professional when things feel overwhelming. Build a strong support network.<br>
      <strong>4. Learn to say No:</strong> Protect your peace by setting boundaries.<br>
      <strong>5. Get enough sleep:</strong> Rest is essential for mental clarity and emotional regulation.
    `
  },
  {
    id: "r2",
    title: "Understanding Your Sleep Cycles",
    category: "Sleep",
    readTime: "8 min read",
    image: "https://tse2.mm.bing.net/th/id/OIP.AmZanCZhh6OeNmQNIynmGQHaEx?pid=Api&P=0&h=220",
    content: "Sleep is complicated! Your brain cycles through different stages of sleep throughout the night, each playing a crucial role in your emotional and physical recovery. This guide focuses on exactly how to structure your sleep environment to maximize the deep REM cycles you need most."
  },
  {
    id: "r3",
    title: "The Power of Mindfulness Meditation",
    category: "Mindfulness",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=600",
    content: "Practicing mindfulness involves breathing methods, guided imagery, and other practices to relax the body and mind and help reduce stress. Start today by trying to clear your mind for just two minutes before getting out of bed in the morning."
  },
  {
    id: "r4",
    title: "Navigating Social Anxiety at Work",
    category: "Workplace",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1507537362848-9c7e70b7b5c1?auto=format&fit=crop&q=80&w=600",
    content: "Social anxiety can make meetings thoroughly unpleasant. Remember that you belong in the room. Prepare three talking points in advance, take deep breaths when spoken to, and don't be afraid to take a sip of water to buy yourself a few seconds to think."
  },
];

export const MOOD_HISTORY = [
  ...Array.from({ length: 30 }).map((_, i) => {
    // Generate realistic fluctuating recent mood logs
    const rawScore = Math.floor(Math.random() * 5) + 1;
    const score = rawScore * 2; // Make it 2, 4, 6, 8, 10
    let moodState = "Okay";
    if (score === 10) moodState = "Great";
    else if (score === 8) moodState = "Good";
    else if (score === 4) moodState = "Sad";
    else if (score === 2) moodState = "Awful";

    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return {
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      timestamp: d.toISOString(),
      mood: moodState,
      level: score,
      note: score > 3 ? "Had a pretty solid day overall." : "Felt a bit overwhelmed today.",
    };
  })
];

export const QUIZ_HISTORY = [
  {
    id: "q1",
    date: "Oct 12, 2023",
    score: 8,
    level: "Mild Anxiety",
    recommendation: "Tracking your mood can help identify triggers early on."
  },
  {
    id: "q2",
    date: "Nov 05, 2023",
    score: 11,
    level: "Moderate Anxiety",
    recommendation: "Consider talking to our AI for a guided breathing session."
  },
  {
    id: "q3",
    date: "Current Month",
    score: 2,
    level: "Minimal Anxiety",
    recommendation: "Keep up the great self-care routine!"
  }
];

export const APPOINTMENT_HISTORY = [
  {
    id: "a1",
    therapistName: "Dr. Sarah Jenkins",
    date: "Nov 30, 2023",
    time: "10:00 AM",
    method: "Video Call (Zoom)",
    status: "Upcoming",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: "a2",
    therapistName: "Mr. David Ross",
    date: "Oct 20, 2023",
    time: "02:00 PM",
    method: "Google Meet",
    status: "Completed",
    avatar: "https://i.pravatar.cc/150?u=david"
  },
  {
    id: "a3",
    therapistName: "Dr. Emily Chen",
    date: "Sep 15, 2023",
    time: "11:30 AM",
    method: "In-person",
    status: "Completed",
    avatar: "https://i.pravatar.cc/150?u=emily"
  }
];
