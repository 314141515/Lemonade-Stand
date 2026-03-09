import { useState } from "react";

const faqs = [
  { question: "Hvad er Lemonade?", answer: "Bruh. Spørg Chatgpt" },
  { question: "Hvordan tilføjer jeg en drink til kurven?", answer: ":)." },
  { question: "Gemmer appen mine data?", answer: "Måske. Ik tænk på det." },
  { question: "Hvad sker der når jeg resetter profitten?", answer: "Du dør ikke i hvert fald." },
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`border-2 border-[#1a1a1a] rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "shadow-[4px_4px_0px_#1a1a1a]" : "shadow-[2px_2px_0px_#1a1a1a]"}`}>
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center px-6 py-4 font-mono font-bold text-sm text-left bg-white hover:bg-[#fffbea] transition-all"
      >
        <span>{question}</span>
        <span className={`text-xl transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}>+</span>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-[#ffc800] border-t-2 border-[#1a1a1a] font-mono text-sm">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full max-w-4xl mt-8 fade-up">
      <h2 className="font-serif text-3xl font-black text-[#1a1a1a] mb-6">FAQ</h2>
      <div className="flex flex-col gap-3">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;