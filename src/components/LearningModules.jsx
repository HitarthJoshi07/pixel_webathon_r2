import React, { useState } from "react";

/**
 * LearningModules.jsx
 * - All UI uses only: #FFFFFF (white), #C0C0C0 (light gray), #000000 (black), #343434 (dark gray)
 * - Module images remain full color
 * - Large modal (95vw x 95vh), animated
 * - Hover lift + light gray card hover background
 * - Study content detailed for all 6 modules (HTML in contentHtml)
 * - 5 quiz questions per module, matched to content
 * - Reveal Quiz button → shows all questions → Submit → % score + per-question feedback
 */

const modules = [
  {
    title: "Budgeting Basics",
    level: "Beginner",
    time: "15 min",
    xp: "100 XP",
    img: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=1200",
    contentHtml: `
      <h3>Introduction to <strong>Budgeting</strong></h3>
      <p>Budgeting is the process of creating a plan for your money — deciding in advance how you’ll allocate your income to cover expenses, savings, and personal goals.</p>

      <h4>Why Budgeting Matters</h4>
      <ul>
        <li><strong>Control:</strong> know where your money goes.</li>
        <li><strong>Goal setting:</strong> save for short- and long-term goals.</li>
        <li><strong>Emergency readiness:</strong> avoid unexpected shortfalls.</li>
      </ul>

      <h4>Common Methods</h4>
      <ul>
        <li><strong>50/30/20:</strong> 50% needs, 30% wants, 20% savings.</li>
        <li><strong>Zero-based:</strong> every dollar assigned a job.</li>
        <li><strong>Envelope:</strong> physical cash envelopes per category.</li>
      </ul>

      <h4>Practical Example</h4>
      <p>Income: <strong>$2,000/month</strong></p>
      <ul>
        <li>Needs: $1,000</li>
        <li>Wants: $600</li>
        <li>Savings: $400</li>
      </ul>

      <h4>Tips</h4>
      <ul>
        <li>Track spending daily.</li>
        <li>Automate savings.</li>
        <li>Review monthly and adjust.</li>
      </ul>
    `,
    quiz: [
      {
        q: "What is the 50/30/20 rule used for?",
        options: ["Tax planning", "Budget allocation", "Investment strategy"],
        answer: 1,
        explanation: "50/30/20 is a budgeting split: needs, wants, savings."
      },
      {
        q: "Which method assigns every dollar a job?",
        options: ["Zero-based budgeting", "Envelope method", "50/30/20"],
        answer: 0,
        explanation: "Zero-based budgeting allocates every dollar to a purpose."
      },
      {
        q: "Why automate savings?",
        options: ["To forget money exists", "To ensure consistency", "To increase spending"],
        answer: 1,
        explanation: "Automating savings makes it consistent and reduces temptation to spend."
      },
      {
        q: "Which is a 'need' in a budget?",
        options: ["Rent", "Netflix subscription", "New sneakers"],
        answer: 0,
        explanation: "Needs are essentials like rent or utilities."
      },
      {
        q: "How often should you review your budget?",
        options: ["Never", "Monthly", "Every 10 years"],
        answer: 1,
        explanation: "Monthly reviews help you adjust to real-life changes."
      }
    ]
  },

  {
    title: "Understanding Credit",
    level: "Beginner",
    time: "20 min",
    xp: "150 XP",
    img: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=1200",
    contentHtml: `
      <h3>What is <strong>Credit</strong>?</h3>
      <p>Credit means borrowing money now and repaying later. Your track record of borrowing and repayment forms your <strong>credit history</strong> and <strong>credit score</strong>.</p>

      <h4>Key Components of Credit</h4>
      <ul>
        <li><strong>Payment history</strong> (on-time payments) — most important.</li>
        <li><strong>Credit utilization</strong> (how much of your available credit you use).</li>
        <li><strong>Length of history</strong>, new accounts, and types of credit.</li>
      </ul>

      <h4>How to Build Good Credit</h4>
      <ul>
        <li>Pay on time.</li>
        <li>Keep balances low relative to limits (<strong>~30%</strong>).</li>
        <li>Keep older accounts open when practical.</li>
      </ul>

      <h4>Tip</h4>
      <p>Check your credit report annually and dispute errors promptly.</p>
    `,
    quiz: [
      {
        q: "Which factor most affects credit score?",
        options: ["Payment history", "Favorite color", "Height"],
        answer: 0,
        explanation: "Payment history is the largest component of your credit score."
      },
      {
        q: "Good credit utilization is normally below:",
        options: ["30%", "80%", "100%"],
        answer: 0,
        explanation: "Keeping utilization below ~30% is commonly recommended."
      },
      {
        q: "Checking your own credit report is:",
        options: ["Harmful", "A soft inquiry", "Illegal"],
        answer: 1,
        explanation: "Checking your own score is a soft inquiry and does not lower it."
      },
      {
        q: "Paying bills late affects:",
        options: ["Credit score negatively", "Nothing", "Income"],
        answer: 0,
        explanation: "Late payments can significantly harm your credit score."
      },
      {
        q: "To build credit you should:",
        options: ["Ignore bills", "Pay on time and keep low balances", "Max out cards"],
        answer: 1,
        explanation: "Responsible use and timely payments build credit."
      }
    ]
  },

  {
    title: "Investment Fundamentals",
    level: "Intermediate",
    time: "25 min",
    xp: "200 XP",
    img: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1200",
    contentHtml: `
      <h3>Why Invest?</h3>
      <p>Investing aims to grow your money over time and can help beat inflation. <strong>Compound interest</strong> is central — earnings generate earnings.</p>

      <h4>Asset Types</h4>
      <ul>
        <li><strong>Stocks</strong> — ownership in companies; higher returns, higher volatility.</li>
        <li><strong>Bonds</strong> — loans to issuers; generally less volatility and steady interest.</li>
        <li><strong>Mutual funds & ETFs</strong> — pooled investments for diversification.</li>
      </ul>

      <h4>Principles</h4>
      <ul>
        <li><strong>Diversify</strong> to reduce specific risk.</li>
        <li>Match investments to your <strong>time horizon</strong> and <strong>risk tolerance</strong>.</li>
        <li>Prefer low-cost index funds for long-term investing.</li>
      </ul>

      <h4>Starter Plan</h4>
      <p>Start with an index ETF, contribute regularly, and let compounding work over decades.</p>
    `,
    quiz: [
      {
        q: "Stocks represent:",
        options: ["Debt", "Ownership in a company", "Cash in bank"],
        answer: 1,
        explanation: "Stocks are shares representing ownership in a company."
      },
      {
        q: "Diversification helps to:",
        options: ["Increase risk", "Reduce risk", "Eliminate taxes"],
        answer: 1,
        explanation: "Diversification spreads exposure across assets and reduces risk."
      },
      {
        q: "Bonds typically offer:",
        options: ["Higher volatility than stocks", "Steady income and lower volatility", "Free money"],
        answer: 1,
        explanation: "Bonds usually provide steadier returns and lower volatility vs stocks."
      },
      {
        q: "Compound interest is:",
        options: ["Earnings on earnings", "A fee", "A tax"],
        answer: 0,
        explanation: "Compound interest grows returns by reinvesting earnings."
      },
      {
        q: "A low-cost index fund is good for:",
        options: ["Short-term gambling", "Long-term investing", "Day trading"],
        answer: 1,
        explanation: "Index funds are efficient for long-term passive investing."
      }
    ]
  },

  {
    title: "Retirement Planning",
    level: "Advanced",
    time: "30 min",
    xp: "250 XP",
    img: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=1200",
    contentHtml: `
      <h3>Retirement: Start Early</h3>
      <p>Retirement planning is about saving and investing today so you can maintain your desired lifestyle later. Early contributions benefit from compounding.</p>

      <h4>Accounts</h4>
      <ul>
        <li><strong>401(k)</strong> — often employer-sponsored, may include employer match.</li>
        <li><strong>Traditional IRA</strong> — pre-tax contributions; taxed on withdrawal.</li>
        <li><strong>Roth IRA</strong> — post-tax contributions; tax-free qualified withdrawals.</li>
      </ul>

      <h4>Planning Steps</h4>
      <ul>
        <li>Estimate expenses in retirement.</li>
        <li>Factor in inflation and healthcare costs.</li>
        <li>Contribute regularly and take employer match if available.</li>
      </ul>

      <h4>Tip</h4>
      <p>Increase contributions when income grows to stay on track.</p>
    `,
    quiz: [
      {
        q: "Which account often has employer matching?",
        options: ["Roth IRA", "401(k)", "Savings account"],
        answer: 1,
        explanation: "401(k) plans commonly offer employer matching contributions."
      },
      {
        q: "Roth IRA withdrawals in retirement are usually:",
        options: ["Tax-free (qualified)", "Always taxed", "Illegal"],
        answer: 0,
        explanation: "Qualified Roth IRA withdrawals are generally tax-free."
      },
      {
        q: "Why plan for inflation?",
        options: ["Prices may rise over time", "Money gets heavier", "Banks require it"],
        answer: 0,
        explanation: "Inflation reduces purchasing power, so planning helps maintain lifestyle."
      },
      {
        q: "Starting retirement saving early helps because:",
        options: ["Compound interest accumulates", "You can spend more now", "It avoids taxes forever"],
        answer: 0,
        explanation: "Early saving allows compounding to grow your nest egg."
      },
      {
        q: "A conservative mix near retirement favors:",
        options: ["More stocks", "More bonds/cash", "Only crypto"],
        answer: 1,
        explanation: "Reducing volatility with bonds/cash helps preserve capital as retirement nears."
      }
    ]
  },

  {
    title: "Emergency Funds",
    level: "Beginner",
    time: "18 min",
    xp: "120 XP",
    img: "https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg?auto=compress&cs=tinysrgb&w=1200",
    contentHtml: `
      <h3>Why an Emergency Fund?</h3>
      <p>An emergency fund covers unexpected expenses such as job loss, medical bills, or urgent repairs — preventing harmful borrowing.</p>

      <h4>How Much?</h4>
      <ul>
        <li>General recommendation: <strong>3–6 months</strong> of essential living expenses.</li>
        <li>Variable-income or single-earner households may target 6+ months.</li>
      </ul>

      <h4>Where to Keep It</h4>
      <ul>
        <li>High-yield savings accounts — accessible and earn interest.</li>
        <li>Short-term liquid accounts — avoid volatile investments for this money.</li>
      </ul>

      <h4>Building Tips</h4>
      <ul>
        <li>Automate transfers to a dedicated account.</li>
        <li>Use windfalls (bonuses) to top it up.</li>
      </ul>
    `,
    quiz: [
      {
        q: "Emergency funds are for:",
        options: ["Planned vacations", "Unexpected expenses", "Daily coffee"],
        answer: 1,
        explanation: "Emergency funds are held for unplanned, urgent costs."
      },
      {
        q: "Recommended emergency fund size is:",
        options: ["3–6 months expenses", "1 day", "20 years"],
        answer: 0,
        explanation: "Experts commonly recommend 3–6 months of living expenses."
      },
      {
        q: "Best place to keep an emergency fund:",
        options: ["High-yield savings", "Long-term stock investments", "Cash under mattress"],
        answer: 0,
        explanation: "High-yield savings offers liquidity plus some interest."
      },
      {
        q: "Should emergency funds be invested in volatile assets?",
        options: ["Yes", "No"],
        answer: 1,
        explanation: "Volatile investments risk losing value when you need funds."
      },
      {
        q: "When to replenish an emergency fund?",
        options: ["Immediately after use", "Never", "After 5 years"],
        answer: 0,
        explanation: "Replenish promptly so you're protected for future shocks."
      }
    ]
  },

  {
    title: "Debt Management",
    level: "Intermediate",
    time: "22 min",
    xp: "180 XP",
    img: "https://images.pexels.com/photos/4386339/pexels-photo-4386339.jpeg?auto=compress&cs=tinysrgb&w=1200",
    contentHtml: `
      <h3>Managing & Eliminating Debt</h3>
      <p>Debt can be a tool or a burden. Smart strategies focus on reducing interest costs and eliminating balances over time.</p>

      <h4>Strategies</h4>
      <ul>
        <li><strong>Debt Snowball:</strong> pay smallest balances first for momentum.</li>
        <li><strong>Debt Avalanche:</strong> pay highest-interest debts first to save interest.</li>
        <li><strong>Consolidation:</strong> combine debts into one loan (may reduce payments or interest).</li>
      </ul>

      <h4>Negotiation</h4>
      <ul>
        <li>Contact lenders for hardship plans or to negotiate rates.</li>
        <li>Get professional credit counseling if overwhelmed.</li>
      </ul>

      <h4>Prevention</h4>
      <ul>
        <li>Keep an emergency fund to avoid new debt.</li>
        <li>Stick to a realistic budget to avoid recurring shortfalls.</li>
      </ul>
    `,
    quiz: [
      {
        q: "Debt snowball focuses on:",
        options: ["Largest balance first", "Smallest balance first", "Random payments"],
        answer: 1,
        explanation: "Snowball targets the smallest debts first to build momentum."
      },
      {
        q: "Debt avalanche prioritizes:",
        options: ["Highest interest first", "Lowest interest first", "Alphabetically"],
        answer: 0,
        explanation: "Avalanche pays highest interest debts first to reduce total interest paid."
      },
      {
        q: "Consolidation means:",
        options: ["Combining debts into one loan", "Opening more cards", "Ignoring debts"],
        answer: 0,
        explanation: "Consolidation merges payments into one loan, often with lower interest."
      },
      {
        q: "To avoid future debt, you should:",
        options: ["Have an emergency fund", "Max out cards", "Ignore budgeting"],
        answer: 0,
        explanation: "Emergency funds and budgeting reduce reliance on borrowing."
      },
      {
        q: "Who can professionally help negotiate debt?",
        options: ["Credit counselor", "Random stranger", "Celebrity"],
        answer: 0,
        explanation: "Credit counselors help create repayment plans and negotiate with creditors."
      }
    ]
  }
];

export default function LearningModules() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function openModule(idx) {
    setSelectedIndex(idx);
    setShowQuiz(false);
    setAnswers({});
    setSubmitted(false);
    // allow scroll positions to reset naturally
  }

  function closeModal() {
    setSelectedIndex(null);
    setShowQuiz(false);
    setAnswers({});
    setSubmitted(false);
  }

  function handleAnswer(qIndex, optionIndex) {
    setAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  }

  function submitQuiz() {
    setSubmitted(true);
  }

  function retakeQuiz() {
    setAnswers({});
    setSubmitted(false);
    setShowQuiz(true);
  }

  function calcScorePercent() {
    if (selectedIndex === null) return 0;
    const quiz = modules[selectedIndex].quiz;
    const total = quiz.length;
    let correct = 0;
    quiz.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });
    return Math.round((correct / total) * 100);
  }

  return (
    <div style={{ backgroundColor: "#000000ff" }} className="min-h-screen px-4 py-12">
      <style>{`
        /* scrollbar */
        .custom-scrollbar::-webkit-scrollbar { width: 10px; height: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #C0C0C0; border-radius: 9999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #343434; }

        /* simple fade-in scale */
        @keyframes fadeInScale { 0% { opacity: 0; transform: scale(0.97); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 style={{ color: "#ffffffff" }} className="text-4xl font-extrabold">Learning Modules</h1>
          <p style={{ color: "#ffffffff" }} className="mt-2 max-w-2xl mx-auto">Comprehensive financial literacy — read the module, then test your knowledge.</p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, idx) => (
            <div
              key={m.title}
              onClick={() => openModule(idx)}
              className="rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300"
              style={{
                backgroundColor: "#b4b4b4ff",
                boxShadow: "0 2px 8px rgba(255, 255, 255, 0.08)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
                e.currentTarget.style.backgroundColor = "#bbbbbbff";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                e.currentTarget.style.backgroundColor = "#cacacaff";
              }}
            >
              <div className="relative h-44 w-full overflow-hidden">
                <img src={m.img} alt={m.title} className="w-full h-full object-cover" />
                <div
                  className="absolute left-4 top-4 px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: "#C0C0C0", color: "#000000" }}
                >
                  {m.level}
                </div>
              </div>

              <div className="p-4">
                <h3 style={{ color: "#000000" }} className="text-xl font-semibold">{m.title}</h3>
                <p style={{ color: "#343434" }} className="mt-1">{m.time} • {m.xp}</p>
                <div style={{ color: "#343434" }} className="mt-3 line-clamp-3" dangerouslySetInnerHTML={{ __html: modules[idx].contentHtml.split("</p>")[0] + "</p>" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedIndex !== null && (
        <div style={{ backgroundColor: "rgba(0,0,0,0.8)" }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="rounded-2xl w-[95vw] h-[95vh] overflow-hidden flex flex-col"
            style={{ backgroundColor: "#FFFFFF", animation: "fadeInScale 0.28s ease-out forwards", boxShadow: "0 6px 30px rgba(0,0,0,0.4)" }}
          >
            <div style={{ borderBottom: "1px solid #C0C0C0" }} className="flex items-start justify-between p-4">
              <div>
                <h2 style={{ color: "#000000" }} className="text-2xl font-bold">{modules[selectedIndex].title}</h2>
                <p style={{ color: "#343434" }} className="text-sm">{modules[selectedIndex].level} • {modules[selectedIndex].time} • {modules[selectedIndex].xp}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setShowQuiz(true); setSubmitted(false); }}
                  style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
                  className="px-3 py-2 rounded text-sm hover:opacity-90"
                >
                  Take Quiz
                </button>
                <button
                  onClick={closeModal}
                  style={{ color: "#343434" }}
                  className="text-xl hover:text-black"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
              {/* Study area */}
              <div className="lg:w-2/3 w-full p-6 overflow-y-auto custom-scrollbar">
                <div className="mb-4">
                  <img src={modules[selectedIndex].img} alt="" className="w-full h-32 object-cover rounded" />
                </div>
                <div className="prose max-w-none" style={{ color: "#343434" }} dangerouslySetInnerHTML={{ __html: modules[selectedIndex].contentHtml }} />
              </div>

              {/* Quiz area */}
              <aside className="lg:w-1/3 w-full p-6 overflow-y-auto custom-scrollbar" style={{ borderLeft: "1px solid #C0C0C0" }}>
                <h3 style={{ color: "#000000" }} className="text-lg font-semibold mb-3">Quiz</h3>

                {!showQuiz && (
                  <div className="mb-4">
                    <p style={{ color: "#343434" }} className="mb-3">When you're ready, click below to reveal all 5 questions.</p>
                    <button
                      onClick={() => { setShowQuiz(true); setSubmitted(false); setAnswers({}); }}
                      style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
                      className="w-full px-4 py-2 rounded hover:opacity-90"
                    >
                      Reveal Quiz (5 Questions)
                    </button>
                  </div>
                )}

                {showQuiz && (
                  <div>
                    <div className="space-y-4">
                      {modules[selectedIndex].quiz.map((q, qi) => (
                        <div key={qi} className="p-3 rounded-lg" style={{ backgroundColor: "#F5F5F5", border: "1px solid #C0C0C0" }}>
                          <p style={{ color: "#000000" }} className="font-medium">{qi + 1}. {q.q}</p>
                          <div className="mt-2 space-y-2">
                            {q.options.map((opt, oi) => {
                              const checked = answers[qi] === oi;
                              return (
                                <label key={oi} className="flex items-center gap-2" style={{ color: "#000000" }}>
                                  <input type="radio" name={`q-${qi}`} checked={checked} onChange={() => handleAnswer(qi, oi)} />
                                  <span>{opt}</span>
                                </label>
                              );
                            })}
                          </div>

                          {submitted && (
                            <div className="mt-2" style={{ color: "#000000" }}>
                              {answers[qi] === q.answer ? (
                                <p><strong>Correct</strong> — {q.explanation}</p>
                              ) : (
                                <p><strong>Incorrect</strong> — Correct: <strong>{q.options[q.answer]}</strong>. {q.explanation}</p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {!submitted ? (
                      <button onClick={submitQuiz} style={{ backgroundColor: "#000000", color: "#FFFFFF" }} className="mt-4 w-full px-4 py-2 rounded hover:opacity-90">
                        Submit Answers
                      </button>
                    ) : (
                      <div className="mt-4 p-3 rounded border" style={{ backgroundColor: "#FFFFFF", borderColor: "#C0C0C0" }}>
                        <p style={{ color: "#000000" }} className="font-bold">Result: {calcScorePercent()}%</p>
                        <p style={{ color: "#343434" }} className="text-sm mt-2">
                          You answered {modules[selectedIndex].quiz.filter((q, i) => answers[i] === q.answer).length} out of {modules[selectedIndex].quiz.length} correctly.
                        </p>

                        <div className="mt-3 flex gap-2">
                          <button onClick={retakeQuiz} style={{ backgroundColor: "#000000", color: "#FFFFFF" }} className="px-3 py-2 rounded text-sm hover:opacity-90">
                            Retake Quiz
                          </button>
                          <button onClick={() => { setShowQuiz(false); setSubmitted(false); setAnswers({}); }} style={{ backgroundColor: "#C0C0C0", color: "#000000" }} className="px-3 py-2 rounded text-sm hover:opacity-90">
                            Back to Study
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </aside>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
