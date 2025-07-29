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
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 text-gray-800 p-6">
      <motion.div 
        className="max-w-xl mx-auto bg-white shadow-2xl rounded-xl p-6"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-3xl font-bold mb-4 text-center text-indigo-700"
          initial={{ scale: 0.9 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.6 }}
        >
          Daily Bible Journey
        </motion.h1>

        <div className="mb-2 text-right text-sm text-indigo-600 font-semibold">Points: {points}</div>

        <motion.div className="mb-4" animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-lg font-semibold text-gray-700">Today's Verse</h2>
          <p className="mt-2 italic text-gray-600">{verse}</p>
        </motion.div>

        <motion.div className="mb-4" whileTap={{ scale: 0.95 }}>
          <button
            className={`w-full py-2 rounded-lg font-semibold shadow-md transition duration-300 ${
              read ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            onClick={() => setRead(!read)}
          >
            {read ? 'Marked as Read ✔️' : 'Mark as Read'}
          </button>
        </motion.div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">Select Your Age Group</label>
          <select
            className="w-full p-2 border rounded shadow-sm"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
          >
            <option value="teen">Teen</option>
            <option value="youngAdult">Young Adult</option>
            <option value="adult">Adult</option>
          </select>
        </div>

        <motion.div className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <h3 className="text-md font-semibold text-gray-700">Bible Study Questions</h3>
          <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
            {questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </motion.div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">Your Reflection</label>
          <textarea
            className="w-full p-2 border rounded shadow-sm"
            rows="4"
            placeholder="What did God speak to you today?"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
          ></textarea>
          <motion.button
            className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded shadow-md hover:bg-indigo-700"
            onClick={handleSubmitReflection}
            whileTap={{ scale: 0.95 }}
          >
            Submit Reflection
          </motion.button>
        </div>

        <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <h3 className="text-md font-semibold text-gray-700">Past Reflections</h3>
          <ul className="mt-2 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <motion.li 
                key={i} 
                className="bg-gray-50 border rounded p-2 shadow-sm"
                whileHover={{ scale: 1.01 }}
              >
                <strong>{new Date(msg.date).toLocaleDateString()}</strong>: {msg.verse}<br />
                <em>{msg.reflection}</em>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <div className="text-sm text-gray-500 text-center">
          {read && messages.length > 0 ? '👏 Great job staying consistent!' : '💡 Keep going, God is with you.'}
        </div>
      </motion.div>
    </main>
  );
}
