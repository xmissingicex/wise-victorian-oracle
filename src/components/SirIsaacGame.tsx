
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Volume2, VolumeX, RotateCcw, Info } from 'lucide-react';
import { toast } from 'sonner';

// Mode personalities and copy
const pitmanModePersonalities = {
  isaac: {
    classic: {
      title: "Ready for Proper Career Guidance?",
      text1: "Sir Isaac Pitman, distinguished founder of our training legacy and inventor of the revolutionary shorthand system, extends his most cordial invitation to share proper Victorian wisdom for modern professional success.",
      text2: "Whether you seek traditional workplace guidance, time-tested career strategies, or simply fancy some distinguished counsel from Britain's most respected training pioneer, our esteemed founder shall provide the wisdom you require.",
      ctaText: "Receive Counsel"
    },
    genz: {
      title: "Ready for Some Dead Good Career Content?",
      text1: "Sir Isaac Pitman's gone proper viral, innit! Our founder's absolutely gassed about dropping the most peng career advice that's gonna have your professional life looking bare successful, fam! 💯",
      text2: "Whether you're looking to level up your career game, need some proper guidance to get your life sorted, or just want advice from someone who literally created an entire communication system, Isaac's about to bless you with the content that's actually peak! ✨",
      ctaText: "Let's Get This Bread"
    },
    nuclear: {
      title: "Ready for Unfiltered Career Reality?",
      text1: "Sir Isaac Pitman doesn't mess about with pleasant platitudes or corporate waffle. The inventor of shorthand has witnessed over 185 years of career successes and failures, and he's here to deliver the brutal truths most advisors won't tell you.",
      text2: "Whether you're tired of sugar-coated career advice, ready for someone to tell you exactly what's holding you back, or need a proper reality check about your professional prospects, Isaac's nuclear-strength wisdom will sort you out.",
      ctaText: "Give It To Me Straight"
    },
    zen: {
      title: "Ready for Enlightened Career Wisdom?",
      text1: "Sir Isaac Pitman, having achieved perfect harmony between Victorian innovation and cosmic consciousness, now shares the ancient secrets of professional enlightenment from his meditation garden of career wisdom.",
      text2: "Whether you seek to align your career path with universal purpose, discover your true professional calling through mindful reflection, or simply wish to receive guidance from one who has transcended conventional business thinking, let Isaac guide your spiritual career journey.",
      ctaText: "Begin the Journey"
    },
    oracle: {
      title: "Ready for Cosmic Career Destiny?",
      text1: "Sir Isaac Pitman, having transcended the earthly realm to become the all-knowing Oracle of Professional Destiny, peers through the cosmic mists of time to reveal the career secrets written in the stars themselves.",
      text2: "Whether you seek to understand your professional destiny written in the astral planes, wish to unlock the cosmic forces that guide career success, or desire wisdom from one who has witnessed all possible career timelines across infinite dimensions, the Oracle awaits your approach.",
      ctaText: "Consult the Oracle"
    },
    startup: {
      title: "Ready to Disrupt Your Career Trajectory?",
      text1: "Sir Isaac Pitman didn't just invent shorthand — he bloody well disrupted the entire communication industry and built a training empire that's still scaling after 185+ years. Now this leather-clad maverick is here to help you pivot your career strategy toward unicorn-level success.",
      text2: "Whether you're ready to bootstrap your professional journey, need a co-founder's perspective on building your personal brand empire, or want advice from someone who literally founded an industry that's still generating revenue streams today, Isaac's startup wisdom will help you scale to the next level.",
      ctaText: "Let's Disrupt This"
    }
  },
  paul: {
    classic: {
      title: "Ready for Marathon-Level Career Wisdom?",
      text1: "Paul Lewis, Managing Director and Marathon Man, combines business expertise with athletic discipline to deliver career advice that goes the distance.",
      text2: "Whether you need training guidance, professional development tips, or just want to hear from someone who never misses a personal best, Paul's your man.",
      ctaText: "Start the Journey"
    },
    genz: {
      title: "Ready for Some Dead Good Marathon Content?",
      text1: "Paul Lewis is absolutely gassed about this, bruv! 🏃‍♂️ The Managing Director who's literally smashed over 100 marathons is here to drop the most peng career advice that's gonna have your professional life looking bare successful, fam! 💯",
      text2: "Whether you're looking to proper sort your career goals, need some dead good guidance to get your life on track, or just want advice from someone who's never missed a graduation ceremony OR a personal best, Paul's about to bless you with the performance that's actually peak! ✨",
      ctaText: "Let's Smash This"
    },
    nuclear: {
      title: "Ready for Brutal Marathon Reality?",
      text1: "Paul Lewis doesn't mess about with participation medals or feel-good nonsense. After running over 100 marathons and leading Pitman Training for years, he's here to deliver the unfiltered truth about what it really takes to go the distance in your career.",
      text2: "Whether you're tired of motivational fluff, ready for someone to tell you exactly why you're not hitting your professional targets, or need a proper reality check about your commitment levels, Paul's marathon-tested wisdom will push you past your limits.",
      ctaText: "Push Me to My Limits"
    },
    zen: {
      title: "Ready for Mindful Marathon Wisdom?",
      text1: "Paul Lewis, having found perfect balance between the meditative rhythm of countless early morning runs and the zen of business leadership, now shares the ancient secrets of professional endurance from his place of inner marathon peace.",
      text2: "Whether you seek to align your career journey with the steady rhythm of sustainable success, discover your true professional pace through mindful progression, or simply wish to receive guidance from one who has found harmony between athletic and business achievement, let Paul guide your mindful career marathon.",
      ctaText: "Find Your Rhythm"
    },
    oracle: {
      title: "Ready for Marathon Destiny Wisdom?",
      text1: "Paul Lewis, having transcended the earthly realm of ordinary business leadership to become the Cosmic Marathon Oracle, channels the mystical energies of endurance and achievement to reveal the career secrets written in the footsteps of destiny.",
      text2: "Whether you seek to understand your professional marathon written in the astral training plans, wish to unlock the cosmic forces that guide long-distance career success, or desire wisdom from one who has witnessed all possible finish lines across infinite professional dimensions, the Marathon Oracle awaits.",
      ctaText: "Consult the Marathon Oracle"
    },
    startup: {
      title: "Ready to Scale Your Career Like a Unicorn Marathon?",
      text1: "Paul Lewis didn't just run 100+ marathons — he bloody well disrupted the entire concept of endurance whilst scaling Pitman Training's empire for decades. Now this entrepreneurial athlete is here to help you pivot your career strategy with the persistence of a marathon runner and the vision of a startup founder.",
      text2: "Whether you're ready to bootstrap your professional journey with athletic discipline, need a co-founder's perspective on building sustainable success, or want advice from someone who treats both marathons and business growth like scalable systems, Paul's startup-athlete wisdom will help you IPO your career.",
      ctaText: "Let's Scale This Marathon"
    }
  }
};

// Character images
const pitmanCharacterImages = {
  isaac: {
    classic: 'https://www.pitman-training.com/wp-content/uploads/2025/06/Sir-Isaac-Pitman-Hipster-and-Trendy-in-a-sharp-business-suite-sitting-in-a-brown-leather-chair-holding-his-smart-phone-scaled.jpg',
    genz: 'https://www.pitman-training.com/wp-content/uploads/2025/06/universal_upscale_0_9fe32590-e93b-4df0-addf-d6e409251a36_0-scaled.jpg',
    nuclear: 'https://www.pitman-training.com/wp-content/uploads/2025/06/Sir-Isaac-Pitman-goes-nuclear-mode-on-free-career-advice-to-the-UK-and-Ireland.png',
    zen: 'https://www.pitman-training.com/wp-content/uploads/2025/06/Sir-Isaac-Pitman-Divine-and-Zen-Yogi-in-a-calm-meditation-garden.jpg',
    oracle: 'https://www.pitman-training.com/wp-content/uploads/2025/06/Sir-Isaac-Pitman-floating-through-all-of-space-and-time-as-the-all-knowing-master-of-the-universe-scaled.jpg',
    startup: 'https://www.pitman-training.com/wp-content/uploads/2025/06/Sir-Isaac-Pitman-creator-of-shorthand-on-a-motorcycle-driving-through-the-mountains.jpg'
  },
  paul: {
    classic: 'https://www.pitman-training.com/wp-content/uploads/2025/06/Paul-Lewis-The-Marathon-Man-and-Pitman-Training-Managing-Director.png',
    genz: 'https://www.pitman-training.com/wp-content/uploads/2025/06/Paul-prepared-for-the-elements-and-your-future.png',
    nuclear: 'https://www.pitman-training.com/wp-content/uploads/2025/06/paul-delivering-success-on-a-bike-ride-through-the-uk.png',
    zen: 'https://www.pitman-training.com/wp-content/uploads/2025/06/Paul-rock-climbing-picturing-success.png',
    oracle: 'https://www.pitman-training.com/wp-content/uploads/2025/06/paul-and-sir-isaac-pitman-marathon-man.png',
    startup: 'https://www.pitman-training.com/wp-content/uploads/2025/06/Paul-Lewis-with-Sir-Isaac-Pitman-in-Business-Mode.png'
  }
};

// Enhanced responses
const pitmanResponses = {
  isaac: {
    classic: [
      'That\'s a splendid question, my dear fellow — the key to success lies in proper preparation and continuous learning.',
      'In my experience, one must approach career advancement with the same precision as shorthand — methodical, consistent, and purposeful.',
      'Ah, reminds me of my early days developing shorthand notation. Success requires dedication to mastering the fundamentals.',
      'Most excellent query! Remember, a well-crafted CV is like elegant shorthand — efficient, clear, and impossible to ignore.',
      'As I always say, the finest careers are built upon solid foundations of skill and character.'
    ],
    genz: [
      'Bruv, that question is absolutely peng! 💯 Your career\'s about to be dead successful with that mindset, fam!',
      'Safe! Sir Isaac here and I\'m proper gassed to drop some career wisdom that\'s gonna be bare helpful, innit! ☕',
      'That\'s peak, that is! Your professional journey\'s about to be absolutely blessed — let\'s get this sorted! 👑',
      'Fam said what now? I\'m here for it! Your career\'s gonna be looking peng when we\'re done! ✨',
      'That\'s dead good thinking! I\'m proper excited to help you level up your work game, bruv! 📈'
    ],
    nuclear: [
      'Right, listen up — your CV is probably rubbish, your interview skills need work, and you\'re asking the wrong questions. But here\'s the truth...',
      'Brutal honesty time: Stop making excuses and start making progress. Here\'s what you actually need to do...',
      'I\'m going to give it to you straight — most people fail because they\'re not willing to do the hard work. Are you different?',
      'Harsh reality check: The job market doesn\'t owe you anything. But if you\'re willing to put in the graft, here\'s your roadmap...',
      'No sugar-coating here — you\'re probably your own worst enemy. But that also means you\'re your own best solution...'
    ],
    zen: [
      'Ah, young grasshopper, the path to career enlightenment begins with understanding that the journey is the destination... 🧘‍♂️',
      'In the garden of professional growth, patience cultivates the most beautiful opportunities. Your career will bloom when the season is right... 🌸',
      'The wise professional knows that every setback is simply the universe redirecting you toward your true calling... ✨',
      'Like the bamboo that bends in the wind but never breaks, a resilient career adapts whilst maintaining its core strength... 🎋',
      'The stillness of meditation teaches us that sometimes the most productive action is thoughtful inaction. Consider your next step carefully... 🤔'
    ],
    oracle: [
      'The cosmic winds whisper of great professional transformation ahead... The stars align in your favour, seeker... ⭐',
      'I gaze into the crystal ball of your career future and see... multiple pathways converging toward success. Choose wisely... 🔮',
      'The ancient runes of professional destiny spell out a message: Your greatest strength lies hidden in what you perceive as weakness... 🌟',
      'The universe conspires in mysterious ways, dear one. That which appears as a setback is actually cosmic redirection... 🌌',
      'I sense a disturbance in the professional force field around you... Great change approaches from an unexpected direction... 💫'
    ],
    startup: [
      'Mate, that\'s the kind of question that separates the entrepreneurs from the employees! Time to disrupt your own career trajectory! 🚀',
      'Bloody brilliant! You\'re thinking like a startup founder — question everything, iterate quickly, and pivot when necessary! 💡',
      'That\'s what I call hustle mentality! In the startup world, that question would be worth millions. Here\'s your competitive advantage... 📈',
      'Pure entrepreneurial energy! You\'re not just looking for a job, you\'re building a personal brand empire! 👑',
      'Savage question! You\'re thinking like a unicorn founder — that\'s the mindset that builds billion-pound companies! 🦄'
    ]
  },
  paul: {
    classic: [
      'Your career is like a marathon — pace yourself, stay consistent, and focus on the finish line! Our Pitman Training diplomas provide the endurance you need.',
      'At Pitman Training, we\'ve helped thousands cross their career finish line. What\'s your next milestone? Our diplomas could be your perfect training plan.',
      'Success isn\'t about speed, it\'s about endurance. Keep building those skills with proper qualifications — that\'s the Pitman way!',
      'Every career setback is just training for your comeback. Trust the process, and consider a Pitman diploma to strengthen your foundation!',
      'Like marathon training, career development requires dedication, consistency, and the right coaching. That\'s exactly what our courses provide.'
    ],
    genz: [
      'Bruv, your career journey is giving proper marathon energy! 🏃‍♂️ Let\'s get you that qualification that\'s actually peng!',
      'Safe! Paul here and your professional era\'s about to be dead good! Our diplomas are literally the career cheat code, fam! 💯',
      'That\'s peak thinking! I\'m proper gassed because our students are absolutely smashing it! 🎓',
      'Your career\'s about to be blessed — and our Pitman courses are the main character moment you need, innit! ✨',
      'Fam said career advice? I\'m here for it! Running marathons AND building careers — that\'s the ultimate flex, bruv! 💪'
    ],
    nuclear: [
      'Right, brutal truth time: Most people treat their careers like a casual jog when they should be marathon training. Are you ready to commit?',
      'Listen up — I\'ve run over 100 marathons because I don\'t mess about with half-measures. Your career deserves the same dedication.',
      'Harsh reality: While you\'re making excuses, others are getting qualified. Our diplomas exist because results matter, not intentions.',
      'No sugar-coating: The job market is competitive as hell. You need proper qualifications, not just wishful thinking.',
      'Blunt assessment: I didn\'t become Managing Director by accident. It took training, qualifications, and relentless improvement.'
    ],
    zen: [
      'Like the steady rhythm of footsteps over 42.2 kilometres, your career path requires patient, mindful progression... 🏃‍♂️',
      'In the marathon of professional life, each qualification is a milestone that brings inner peace and outer success... 🧘‍♂️',
      'The wise runner knows that the longest journey begins with proper preparation — just as careers begin with proper training... 🌸',
      'As the early morning mist clears during my 5am runs, so too will your career path become clear with the right guidance... 🌅',
      'In the balance between effort and flow lies the secret to both marathon success and professional fulfilment... ⚖️'
    ],
    oracle: [
      'The cosmic energies reveal a convergence of athletic discipline and professional destiny in your future... 🌌',
      'I peer through the mists of time and see your career path illuminated by the achievements of proper training... 🔮',
      'The mystical forces whisper that your professional transformation requires the same dedication as marathon training... ⭐',
      'The ancient wisdom of persistence speaks through every kilometre run and every student graduated... 💫',
      'The ethereal realms show me visions of your success — it begins with the sacred act of proper qualification... 🌟'
    ],
    startup: [
      'Mate, that\'s proper disruptor thinking! Running marathons is like building startups — both require insane dedication and iteration! 🚀',
      'Bloody brilliant question! You\'re thinking like a unicorn founder — scaling personal performance is just like scaling businesses! 💡',
      'That\'s giving me serious entrepreneur energy! I\'ve been disrupting the training industry while disrupting my personal bests! 🏃‍♂️',
      'Savage insight! You\'re not just asking about careers — you\'re architecting your professional disruption strategy! 📈',
      'Absolutely mental approach! While others jog, I sprint marathons — while others get jobs, you should build empires! 💪'
    ]
  }
};

// CEO responses for the CEO Easter Egg
const ceoResponses = [
  'The franchise whisperer acknowledges your presence with executive precision.',
  'Darryl Simsovic radiates CEO energy that could power a small country.',
  'You\'ve clicked on greatness itself. The LaunchLife legend smiles with approval.',
  'The man who built empires across 31 countries nods with strategic satisfaction.',
  'Pure executive charisma flows through your screen. That\'s the Darryl effect!'
];

interface GameResponse {
  text: string;
  type: 'affirmative' | 'negative' | 'playful' | 'profound' | 'meta';
  funFact?: string;
}

type Character = 'isaac' | 'paul';
type Mode = 'classic' | 'genz' | 'nuclear' | 'zen' | 'oracle' | 'startup';

const SirIsaacGame = () => {
  const [question, setQuestion] = useState('');
  const [currentResponse, setCurrentResponse] = useState<GameResponse | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>('isaac');
  const [selectedMode, setSelectedMode] = useState<Mode>('classic');
  const [showModeSelection, setShowModeSelection] = useState(false);
  const [sirIsaacMood, setSirIsaacMood] = useState<'waiting' | 'thinking' | 'answering'>('waiting');
  const [showCEOPortal, setShowCEOPortal] = useState(false);
  const [showCEOShrine, setShowCEOShrine] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) {
      const characterNames = { isaac: 'Sir Isaac', paul: 'Paul Lewis' };
      toast.error(`Please pose a proper question to ${characterNames[selectedCharacter]}, my good fellow!`);
      return;
    }

    // Check for Easter eggs
    const lowerQuestion = question.toLowerCase();
    
    // CEO Easter Egg Detection
    const ceoTriggers = ['darryl', 'darryl simsovic', 'ceo', 'launchlife ceo', 'launchlife'];
    const triggeredCEOMode = ceoTriggers.some(trigger => lowerQuestion.includes(trigger));
    
    if (triggeredCEOMode) {
      setShowCEOPortal(true);
      toast.success('👑 CEO PORTAL ACTIVATED! Welcome to the Executive Stratosphere! 👑');
      return;
    }

    // Paul Lewis Easter Egg Detection
    const paulTriggers = ['paul', 'paul lewis', 'managing director'];
    const triggeredPaulMode = paulTriggers.some(trigger => lowerQuestion.includes(trigger));

    if (triggeredPaulMode && selectedCharacter !== 'paul') {
      setSelectedCharacter('paul');
      toast.success('🏃‍♂️ EASTER EGG ACTIVATED! Paul Lewis - The Marathon Man has entered the chat! 🏃‍♂️');
    }

    setIsThinking(true);
    setSirIsaacMood('thinking');
    setCurrentResponse(null);

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

    // Get response from appropriate character and mode
    const availableResponses = pitmanResponses[selectedCharacter][selectedMode];
    const randomResponse = availableResponses[Math.floor(Math.random() * availableResponses.length)];

    setCurrentResponse({
      text: randomResponse,
      type: 'affirmative'
    });
    
    setIsThinking(false);
    setSirIsaacMood('answering');
    setQuestionsAsked(prev => prev + 1);

    if (soundEnabled) {
      const audio = new Audio('/lovable-uploads/notification.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  };

  const resetGame = () => {
    setQuestion('');
    setCurrentResponse(null);
    setSirIsaacMood('waiting');
  };

  const selectMode = (mode: Mode) => {
    setSelectedMode(mode);
    const modeNames = {
      classic: 'Classic Mode',
      genz: 'Gen Z Streamer Mode',
      nuclear: 'Nuclear Mode',
      zen: 'The Great Buddha Mode',
      oracle: 'Cosmic Oracle Mode',
      startup: 'Startup Maverick Mode'
    };
    toast.success(`${modeNames[mode]} selected — ${selectedCharacter === 'isaac' ? 'Sir Isaac' : 'Paul Lewis'} is ready to spill the tea!`);
  };

  const getCurrentPersonality = () => {
    return pitmanModePersonalities[selectedCharacter][selectedMode];
  };

  const getCurrentImage = () => {
    return pitmanCharacterImages[selectedCharacter][selectedMode];
  };

  const getMoodClass = () => {
    switch (sirIsaacMood) {
      case 'thinking': return 'animate-pulse';
      case 'answering': return 'animate-bounce';
      default: return 'hover:scale-105 transition-transform duration-200';
    }
  };

  const handleCEOClick = () => {
    const randomResponse = ceoResponses[Math.floor(Math.random() * ceoResponses.length)];
    toast.success(randomResponse);
  };

  // CEO Portal Component
  const CEOPortal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-gradient-to-br from-amber-50 to-orange-100 border-4 border-amber-300 shadow-2xl">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold text-amber-800 mb-4">👑 CEO PORTAL ACTIVATED! 👑</h2>
          <p className="text-lg text-amber-700 mb-6">
            Welcome to the Executive Stratosphere! You've discovered the legendary Darryl Simsovic Easter Egg!
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => setShowCEOShrine(true)}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
            >
              Enter CEO Shrine
            </Button>
            <Button 
              onClick={() => setShowCEOPortal(false)}
              variant="outline"
              className="border-amber-300 text-amber-700"
            >
              Return to Sir Isaac
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // CEO Shrine Component
  const CEOShrine = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 z-50 flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full bg-gradient-to-br from-amber-50 to-orange-100 border-4 border-amber-300 shadow-2xl">
        <CardContent className="p-8 text-center">
          <h2 className="text-4xl font-bold text-amber-800 mb-6">🌟 The Darryl Simsovic Executive Shrine 🌟</h2>
          <div className="mb-6">
            <div 
              onClick={handleCEOClick}
              className="w-64 h-64 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-2xl"
            >
              <span className="text-6xl">👑</span>
            </div>
          </div>
          <p className="text-xl text-amber-800 mb-4 font-semibold">
            Darryl Simsovic - LaunchLife CEO & Franchise Whisperer
          </p>
          <p className="text-lg text-amber-700 mb-6">
            The man who built empires across 31 countries. Click the crown for executive wisdom!
          </p>
          <Button 
            onClick={() => {
              setShowCEOShrine(false);
              setShowCEOPortal(false);
              toast.success('Returned from the Executive Dimension. That was legendary! 👑');
            }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            Exit CEO Shrine
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  if (showIntro) {
    const personality = getCurrentPersonality();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full bg-white/95 backdrop-blur-sm shadow-2xl border-2 border-amber-200">
          <CardContent className="p-8">
            {!showModeSelection ? (
              // Initial intro screen - only show Isaac initially
              <div className="text-center">
                <div className="mb-6">
                  <img 
                    src={getCurrentImage()}
                    alt="Sir Isaac Pitman ready to help"
                    className="w-64 h-auto mx-auto rounded-lg border-4 border-amber-300 shadow-lg object-cover"
                  />
                </div>
                <h1 className="text-3xl font-bold text-slate-800 mb-4">{personality.title}</h1>
                <p className="text-lg text-slate-700 italic mb-6 leading-relaxed">
                  {personality.text1}
                </p>
                <p className="text-lg text-slate-700 italic mb-8 leading-relaxed">
                  {personality.text2}
                </p>
                
                <Button 
                  onClick={() => setShowModeSelection(true)}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg font-semibold"
                >
                  Choose Your Mode
                </Button>
              </div>
            ) : (
              // Mode selection screen
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  Choose Sir Isaac's Personality Mode
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {(['classic', 'genz', 'nuclear', 'zen', 'oracle', 'startup'] as Mode[]).map((mode) => (
                    <Button
                      key={mode}
                      onClick={() => selectMode(mode)}
                      variant={selectedMode === mode ? 'default' : 'outline'}
                      className={`p-4 h-auto flex flex-col ${
                        selectedMode === mode 
                          ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                          : 'border-amber-300 text-amber-700 hover:bg-amber-50'
                      }`}
                    >
                      <span className="font-semibold capitalize">{mode}</span>
                      <span className="text-sm mt-1 opacity-80">
                        {mode === 'genz' && '💯 Viral Energy'}
                        {mode === 'nuclear' && '💥 Brutal Truth'}
                        {mode === 'zen' && '🧘‍♂️ Mindful Wisdom'}
                        {mode === 'oracle' && '🔮 Cosmic Guidance'}
                        {mode === 'startup' && '🚀 Disruptor Mode'}
                        {mode === 'classic' && '🎩 Traditional Wisdom'}
                      </span>
                    </Button>
                  ))}
                </div>
                
                <Button 
                  onClick={() => setShowIntro(false)}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg font-semibold"
                >
                  {getCurrentPersonality().ctaText}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* CEO Portal and Shrine */}
        {showCEOPortal && <CEOPortal />}
        {showCEOShrine && <CEOShrine />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Ask {selectedCharacter === 'isaac' ? 'Sir Isaac' : 'Paul Lewis'}
          </h1>
          <p className="text-slate-300 text-lg">
            {selectedCharacter === 'isaac' ? 'The Wise Victorian Oracle' : 'The Marathon Man & Managing Director'}
          </p>
          <Badge variant="secondary" className="mt-2 mr-2">
            Questions Asked: {questionsAsked}
          </Badge>
          <Badge variant="secondary" className="mt-2">
            Mode: {selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1)}
          </Badge>
        </div>

        {/* Character Display */}
        <div className="text-center mb-8">
          <div className={`inline-block ${getMoodClass()}`}>
            <img 
              src={getCurrentImage()}
              alt={`${selectedCharacter === 'isaac' ? 'Sir Isaac Pitman' : 'Paul Lewis'} in ${selectedMode} mode`}
              className="w-80 h-auto mx-auto rounded-lg border-6 border-amber-300 shadow-2xl object-cover cursor-pointer"
              onClick={() => {
                if (!isThinking) {
                  const characterNames = { isaac: 'Sir Isaac', paul: 'Paul Lewis' };
                  toast.info(`${characterNames[selectedCharacter]} adjusts their spectacles and beckons you to proceed...`);
                }
              }}
            />
          </div>
          
          {isThinking && (
            <div className="mt-4">
              <p className="text-amber-300 text-lg italic animate-pulse">
                {selectedCharacter === 'isaac' ? 'Sir Isaac' : 'Paul Lewis'} is pondering...
              </p>
              <div className="flex justify-center mt-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-amber-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-amber-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-amber-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Question Input */}
        <Card className="mb-8 bg-white/95 backdrop-blur-sm shadow-xl border-2 border-amber-200">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-2">
                  Pose your question to {selectedCharacter === 'isaac' ? 'Sir Isaac' : 'Paul Lewis'}:
                </label>
                <Input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="What wisdom do you seek, dear enquirer?"
                  className="text-lg p-4 border-2 border-amber-200 focus:border-amber-400"
                  onKeyPress={(e) => e.key === 'Enter' && !isThinking && askQuestion()}
                  disabled={isThinking}
                />
              </div>
              
              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={askQuestion}
                  disabled={isThinking || !question.trim()}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 font-semibold"
                >
                  {isThinking ? 'Pondering...' : (selectedCharacter === 'isaac' ? 'Spill the Tea ☕' : 'Get Marathon Wisdom 🏃‍♂️')}
                </Button>
                
                <Button 
                  onClick={resetGame}
                  variant="outline"
                  className="border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Ask Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Response Display */}
        {currentResponse && (
          <Card className="mb-8 bg-white/95 backdrop-blur-sm shadow-xl border-2 border-amber-200 animate-fade-in">
            <CardContent className="p-6">
              <div className="text-center">
                <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
                  {selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1)} Wisdom
                </Badge>
                
                <blockquote className="text-xl text-slate-800 italic font-medium mb-4 leading-relaxed">
                  "{currentResponse.text}"
                </blockquote>
                
                <p className="text-slate-600 font-semibold">
                  — {selectedCharacter === 'isaac' ? 'Sir Isaac Pitman' : 'Paul Lewis'}
                </p>
                
                {currentResponse.funFact && (
                  <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                    <p className="text-amber-800 italic">
                      💡 {currentResponse.funFact}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer Controls */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => setSoundEnabled(!soundEnabled)}
            variant="outline"
            size="sm"
            className="border-slate-400 text-slate-300 hover:bg-slate-700"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
          
          <Button
            onClick={() => toast.info(selectedCharacter === 'isaac' 
              ? "Sir Isaac Pitman (1813-1897) was the inventor of the most widely used shorthand writing system."
              : "Paul Lewis is the Managing Director of Pitman Training and has completed over 100 marathons!"
            )}
            variant="outline"
            size="sm"
            className="border-slate-400 text-slate-300 hover:bg-slate-700"
          >
            <Info className="w-4 h-4 mr-2" />
            Who is {selectedCharacter === 'isaac' ? 'Sir Isaac' : 'Paul Lewis'}?
          </Button>

          <Button
            onClick={() => setShowModeSelection(true)}
            variant="outline"
            size="sm"
            className="border-slate-400 text-slate-300 hover:bg-slate-700"
          >
            Change Mode
          </Button>
        </div>
      </div>

      {/* CEO Portal and Shrine */}
      {showCEOPortal && <CEOPortal />}
      {showCEOShrine && <CEOShrine />}
    </div>
  );
};

export default SirIsaacGame;
