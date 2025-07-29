import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const getStudyQuestions = (verse, ageGroup) => {
  if (verse.includes("Christ")) {
    return {
      teen: [
        "How can trusting Christ help you today?",
        "What does this verse show about God's strength in your life?"
      ],
      youngAdult: [
        "What area in your life do you need Christ's strength right now?",
        "How does this verse shape your decision-making?"
      ],
      adult: [
        "How does Christ's strength speak to your current responsibilities?",
        "What part of your life needs deeper surrender today?"
      ]
    }[ageGroup];
  }
  return {
    teen: [
      "What does this verse teach you about God's love?",
      "How can you apply this verse at school or with friends?"
    ],
    youngAdult: [
      "What decision in your life does this verse speak into?",
      "How does this passage challenge your current habits?"
    ],
    adult: [
      "What deeper truth about God's character is revealed here?",
      "How can you lead or encourage others with this message?"
    ]
  }[ageGroup];
};

export default function BibleApp() {
  const [verse, setVerse] = useState('');
  const [read, setRead] = useState(false);
  const [reflection, setReflection] = useState('');
  const [ageGroup, setAgeGroup] = useState('teen');
  const [messages, setMessages] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    setVerse("Philippians 4:13 - I can do all things through Christ who strengthens me.");
  }, []);

  const handleSubmitReflection = () => {
    if (!reflection.trim()) return;
    const newEntry = { date: new Date().toISOString(), verse, reflection };
    const updatedMessages = [...messages, newEntry];
    setMessages(updatedMessages);
    setReflection('');
    setPoints(points + 10);
  };

  const questions = getStudyQuestions(verse, ageGroup);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-6 font-sans">
      <motion.div 
        className="max-w-xl mx-auto backdrop-blur-lg bg-white/5 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-3xl p-8 border border-white/20"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-4xl font-semibold mb-6 text-center text-indigo-200 tracking-wide"
          initial={{ scale: 0.9 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.6 }}
        >
          Time Alone with God
        </motion.h1>

        <div className="mb-4 text-right text-sm text-indigo-300 font-medium">Points: {points}</div>

        <motion.div className="mb-6" animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-lg font-medium text-indigo-300">Today's Verse</h2>
          <p className="mt-2 italic text-indigo-100 text-lg leading-relaxed">{verse}</p>
        </motion.div>

        <motion.button
          className={`w-full py-3 mb-6 rounded-xl font-semibold transition duration-300 shadow-inner ${
            read ? 'bg-green-500 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
          onClick={() => setRead(!read)}
          whileTap={{ scale: 0.95 }}
        >
          {read ? '✔️ Marked as Read' : 'Mark as Read'}
        </motion.button>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-indigo-300">Select Your Age Group</label>
          <select
            className="w-full p-3 rounded-xl bg-gray-800 text-white border border-indigo-500"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
          >
            <option value="teen">Teen</option>
            <option value="youngAdult">Young Adult</option>
            <option value="adult">Adult</option>
          </select>
        </div>

        <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <h3 className="text-md font-semibold text-indigo-300 mb-2">Reflection Questions</h3>
          <ul className="list-disc list-inside text-indigo-100 space-y-1">
            {questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </motion.div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-indigo-300">Your Reflection</label>
          <textarea
            className="w-full p-3 rounded-xl bg-gray-800 text-white border border-indigo-500"
            rows="4"
            placeholder="What did God speak to you today?"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
          ></textarea>
          <motion.button
            className="mt-3 bg-indigo-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-indigo-700"
            onClick={handleSubmitReflection}
            whileTap={{ scale: 0.95 }}
          >
            Submit Reflection
          </motion.button>
        </div>

        <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <h3 className="text-md font-semibold text-indigo-300 mb-2">Past Reflections</h3>
          <ul className="space-y-3 text-sm">
            {messages.map((msg, i) => (
              <motion.li 
                key={i} 
                className="bg-gray-900 border border-indigo-500 rounded-xl p-3 text-indigo-100"
                whileHover={{ scale: 1.01 }}
              >
                <strong>{new Date(msg.date).toLocaleDateString()}</strong>: {msg.verse}<br />
                <em>{msg.reflection}</em>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <div className="text-sm text-indigo-300 text-center mt-4">
          {read && messages.length > 0
            ? '👏 Great job staying consistent!'
            : '💡 Stay faithful — meet God here tomorrow.'}
        </div>
      </motion.div>
    </main>
  );
}
