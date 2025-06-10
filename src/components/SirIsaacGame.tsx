
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Volume2, VolumeX, RotateCcw, Info } from 'lucide-react';
import { toast } from 'sonner';

interface GameResponse {
  text: string;
  type: 'affirmative' | 'negative' | 'playful' | 'profound' | 'meta';
  funFact?: string;
}

const SirIsaacGame = () => {
  const [question, setQuestion] = useState('');
  const [currentResponse, setCurrentResponse] = useState<GameResponse | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [sirIsaacMood, setSirIsaacMood] = useState<'waiting' | 'thinking' | 'answering'>('waiting');

  const responses: GameResponse[] = [
    // Affirmative answers
    { text: "Indeed so, my good friend.", type: 'affirmative' },
    { text: "Without question.", type: 'affirmative' },
    { text: "The signs point most favourably.", type: 'affirmative' },
    { text: "You may proceed with confidence.", type: 'affirmative' },
    { text: "A resounding yes!", type: 'affirmative' },
    { text: "By all means, pursue it.", type: 'affirmative' },
    { text: "Absolutely, as certain as the Queen's Guard.", type: 'affirmative' },
    { text: "A wise course of action, indeed.", type: 'affirmative' },

    // Negative answers
    { text: "I would not recommend it.", type: 'negative' },
    { text: "Alas, the answer is no.", type: 'negative' },
    { text: "The fates do not favour this.", type: 'negative' },
    { text: "Best to think twice, dear enquirer.", type: 'negative' },
    { text: "Most unlikely, I'm afraid.", type: 'negative' },
    { text: "No, not even with the best quill and ink.", type: 'negative' },
    { text: "A most unwise pursuit.", type: 'negative' },
    { text: "Cease this notion at once.", type: 'negative' },

    // Playful / Cheeky answers
    { text: "You expect me to know that? I'm a gentleman, not a fortune teller!", type: 'playful' },
    { text: "My beard tingles — but I shall say no more.", type: 'playful' },
    { text: "I would wager a fine hat on yes, but do take caution.", type: 'playful' },
    { text: "You must ask me again, after tea.", type: 'playful' },
    { text: "Hmm... the answer is shrouded in fog as thick as the Thames.", type: 'playful' },
    { text: "One ought not ask such things without a cup of Earl Grey in hand.", type: 'playful' },
    { text: "Oh! That is a question for philosophers — or cats.", type: 'playful' },
    { text: "The shorthand of life says: go forth!", type: 'playful', funFact: "Did you know? Shorthand was once used to transcribe parliamentary debates." },
    { text: "My monocle suggests... perhaps.", type: 'playful' },

    // Profound / Timeless
    { text: "The future is a blank page. You are its author.", type: 'profound' },
    { text: "Patience is oft the finest answer.", type: 'profound' },
    { text: "In seeking, you will find.", type: 'profound' },
    { text: "Wisdom comes to those who wait.", type: 'profound' },
    { text: "Trust in yourself, as I trust in the quill.", type: 'profound' },
    { text: "The answer lies within you, not me.", type: 'profound' },
    { text: "One must weigh the heart's desire against reason's counsel.", type: 'profound' },
    { text: "Even shorthand cannot hasten destiny.", type: 'profound', funFact: "Remember: A stitch in time saves nine." },
    { text: "Life's greatest questions are rarely answered in haste.", type: 'profound' },
    { text: "Proceed with humility and courage.", type: 'profound' },

    // Meta / Self-aware
    { text: "Hmm... that question again? You do test my patience!", type: 'meta' },
    { text: "You must be most persistent. Very well — no.", type: 'meta' },
    { text: "Sir Isaac requires a brief respite. Try again shortly.", type: 'meta' },
    { text: "Alas, my spectacles are clouded — ask again.", type: 'meta' },
    { text: "The Oracle suggests... you have asked enough for today!", type: 'meta' }
  ];

  const funFacts = [
    "Did you know? In my time, it took 2 days by rail from London to Glasgow!",
    "An ounce of discretion is worth a pound of wit.",
    "Keep calm and mind your Ps and Qs.",
    "The pen is indeed mightier than the sword.",
    "Mind the gap — in your question, and in life.",
    "Even Queen Victoria enjoyed a good mystery now and then.",
    "Always carry a handkerchief and a wise heart.",
    "Life's shorthand: Kindness, curiosity, and courage."
  ];

  const askQuestion = async () => {
    if (!question.trim()) {
      toast.error("Please pose a proper question, my good fellow!");
      return;
    }

    setIsThinking(true);
    setSirIsaacMood('thinking');
    setCurrentResponse(null);

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

    // Get random response
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Sometimes add a random fun fact
    if (!randomResponse.funFact && Math.random() < 0.3) {
      randomResponse.funFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    }

    setCurrentResponse(randomResponse);
    setIsThinking(false);
    setSirIsaacMood('answering');
    setQuestionsAsked(prev => prev + 1);

    if (soundEnabled) {
      // Play a subtle notification sound
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

  const getMoodClass = () => {
    switch (sirIsaacMood) {
      case 'thinking': return 'animate-pulse';
      case 'answering': return 'animate-bounce';
      default: return 'hover:scale-105 transition-transform duration-200';
    }
  };

  const getResponseTypeColor = (type: string) => {
    switch (type) {
      case 'affirmative': return 'bg-green-100 text-green-800 border-green-200';
      case 'negative': return 'bg-red-100 text-red-800 border-red-200';
      case 'playful': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'profound': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'meta': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full bg-white/95 backdrop-blur-sm shadow-2xl border-2 border-amber-200">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <img 
                src="/lovable-uploads/fe1964ab-475a-4ccf-a765-c3559fdfcdf9.png" 
                alt="Sir Isaac Pitman"
                className="w-32 h-32 mx-auto rounded-full border-4 border-amber-300 shadow-lg object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Ask Sir Isaac</h1>
            <p className="text-lg text-slate-700 italic mb-6 leading-relaxed">
              "Ah! Good day to you, my inquisitive friend. I am Sir Isaac Pitman, master of shorthand and seeker of wisdom.
              Though the world has turned many pages since my time, I remain here — in miniature form — ready to offer guidance, wit, and perhaps the odd pearl of Victorian wisdom.
            </p>
            <p className="text-lg text-slate-700 italic mb-8 leading-relaxed">
              Pose your question, tap upon my frame, and I shall ponder it with due care and a gentle stroke of my beard.
              Let us begin, shall we?"
            </p>
            <Button 
              onClick={() => setShowIntro(false)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg font-semibold"
            >
              Ask Sir Isaac
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Ask Sir Isaac</h1>
          <p className="text-slate-300 text-lg">The Wise Victorian Oracle</p>
          <Badge variant="secondary" className="mt-2">
            Questions Asked: {questionsAsked}
          </Badge>
        </div>

        {/* Sir Isaac Character */}
        <div className="text-center mb-8">
          <div className={`inline-block ${getMoodClass()}`}>
            <img 
              src="/lovable-uploads/fe1964ab-475a-4ccf-a765-c3559fdfcdf9.png" 
              alt="Sir Isaac Pitman"
              className="w-48 h-48 mx-auto rounded-full border-6 border-amber-300 shadow-2xl object-cover cursor-pointer"
              onClick={() => {
                if (!isThinking) {
                  toast.info("Sir Isaac adjusts his spectacles and beckons you to proceed...");
                }
              }}
            />
          </div>
          
          {isThinking && (
            <div className="mt-4">
              <p className="text-amber-300 text-lg italic animate-pulse">
                Sir Isaac is pondering...
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
                  Pose your question to Sir Isaac:
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
                  {isThinking ? 'Pondering...' : 'Ask Sir Isaac'}
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
                <Badge className={`mb-4 ${getResponseTypeColor(currentResponse.type)}`}>
                  {currentResponse.type.charAt(0).toUpperCase() + currentResponse.type.slice(1)} Wisdom
                </Badge>
                
                <blockquote className="text-xl text-slate-800 italic font-medium mb-4 leading-relaxed">
                  "{currentResponse.text}"
                </blockquote>
                
                <p className="text-slate-600 font-semibold">— Sir Isaac Pitman</p>
                
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
            onClick={() => toast.info("Sir Isaac Pitman (1813-1897) was the inventor of the most widely used shorthand writing system.")}
            variant="outline"
            size="sm"
            className="border-slate-400 text-slate-300 hover:bg-slate-700"
          >
            <Info className="w-4 h-4 mr-2" />
            Who is Sir Isaac?
          </Button>
        </div>

        {/* Easter Egg */}
        {questionsAsked >= 5 && (
          <div className="text-center mt-8">
            <Button
              onClick={() => {
                setCurrentResponse({
                  text: "Ah, time for a proper British tea break! Earl Grey, two sugars, and perhaps a biscuit.",
                  type: 'playful',
                  funFact: "A true British gentleman never rushes his tea time. ☕️"
                });
                setSirIsaacMood('answering');
              }}
              variant="outline"
              className="border-amber-300 text-amber-300 hover:bg-amber-900/20"
            >
              ☕️ Tea Break
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SirIsaacGame;
