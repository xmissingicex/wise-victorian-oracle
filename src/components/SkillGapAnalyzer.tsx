import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, BookOpen, ArrowRight, User, Briefcase, Target, X } from 'lucide-react';
import { toast } from 'sonner';

interface SkillGapResult {
  overallScore: number;
  strengths: string[];
  gaps: string[];
  recommendations: {
    course: string;
    reason: string;
    priority: 'high' | 'medium' | 'low';
  }[];
}

const SkillGapAnalyzer = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    industry: '',
    experience: '',
    currentSkills: '',
    desiredRole: '',
    jobRequirements: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [result, setResult] = useState<SkillGapResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showCEOPortal, setShowCEOPortal] = useState(false);
  const [showCEOShrine, setShowCEOShrine] = useState(false);
  const [showPaulLewisPortal, setShowPaulLewisPortal] = useState(false);

  // Pitman Training courses database
  const trainingCourses = {
    'Digital Marketing': 'Master social media, SEO, and online advertising strategies',
    'Project Management': 'Learn Agile, Scrum, and traditional project management methodologies',
    'Data Analysis': 'Excel, Power BI, and basic data interpretation skills',
    'Customer Service Excellence': 'Communication, conflict resolution, and customer retention',
    'Microsoft Office Suite': 'Advanced Word, Excel, PowerPoint, and Outlook proficiency',
    'Business Administration': 'Operations, finance basics, and organisational skills',
    'Sales Techniques': 'Lead generation, negotiation, and closing strategies',
    'Leadership & Management': 'Team building, delegation, and strategic thinking',
    'Bookkeeping & Accounting': 'Financial records, basic accounting principles',
    'Web Design Fundamentals': 'HTML, CSS, and modern design principles',
    'Communication Skills': 'Presentation, writing, and interpersonal communication',
    'Time Management': 'Productivity techniques and organisational systems'
  };

  const analyzeSkillGap = async () => {
    if (!formData.jobTitle || !formData.currentSkills || !formData.desiredRole || !formData.firstName || !formData.email) {
      toast.error("Please fill in all required fields including contact information.");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis time
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Check for CEO Easter egg
    const question = `${formData.jobTitle} ${formData.desiredRole} ${formData.currentSkills} ${formData.firstName} ${formData.lastName}`.toLowerCase();
    
    const ceoTriggers = ['darryl', 'darryl simsovic', 'ceo', 'launchlife ceo', 'launchlife'];
    const paulLewisTriggers = ['paul', 'paul lewis', 'managing director'];
    
    const triggeredCEOMode = ceoTriggers.some(trigger => question.includes(trigger));
    const triggeredPaulLewisMode = paulLewisTriggers.some(trigger => question.includes(trigger));
    
    if (triggeredCEOMode) {
      setShowCEOPortal(true);
      setIsAnalyzing(false);
      return;
    }

    if (triggeredPaulLewisMode) {
      setShowPaulLewisPortal(true);
      setIsAnalyzing(false);
      return;
    }

    // Mock analysis logic
    const currentSkillsArray = formData.currentSkills.toLowerCase().split(',').map(s => s.trim());
    const jobReqsArray = formData.jobRequirements.toLowerCase().split(',').map(s => s.trim());
    
    const matchingSkills = currentSkillsArray.filter(skill => 
      jobReqsArray.some(req => req.includes(skill) || skill.includes(req))
    );
    
    const overallScore = Math.min(90, Math.max(20, (matchingSkills.length / Math.max(jobReqsArray.length, 1)) * 100 + Math.random() * 20));
    
    const allCourses = Object.keys(trainingCourses);
    const recommendations = allCourses
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((course, index) => ({
        course,
        reason: trainingCourses[course as keyof typeof trainingCourses],
        priority: index === 0 ? 'high' as const : index === 1 ? 'medium' as const : 'low' as const
      }));

    const mockResult: SkillGapResult = {
      overallScore: Math.round(overallScore),
      strengths: matchingSkills.length > 0 ? matchingSkills.slice(0, 3) : ['Experience in the field', 'Strong work ethic'],
      gaps: jobReqsArray.length > matchingSkills.length ? 
        jobReqsArray.filter(req => !currentSkillsArray.some(skill => skill.includes(req))).slice(0, 3) :
        ['Advanced technical skills', 'Leadership experience'],
      recommendations
    };

    setResult(mockResult);
    setIsAnalyzing(false);
    setShowForm(false);
  };

  const resetAnalysis = () => {
    setResult(null);
    setShowForm(true);
    setShowCEOPortal(false);
    setShowCEOShrine(false);
    setShowPaulLewisPortal(false);
    setFormData({
      jobTitle: '',
      industry: '',
      experience: '',
      currentSkills: '',
      desiredRole: '',
      jobRequirements: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
  };

  const getScoreColour = (score: number) => {
    if (score >= 80) return 'text-green-700';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getPriorityColour = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-800 border border-red-200';
      case 'medium': return 'bg-orange-50 text-orange-800 border border-orange-200';
      case 'low': return 'bg-green-50 text-green-800 border border-green-200';
      default: return 'bg-gray-50 text-gray-800 border border-gray-200';
    }
  };

  // CEO Portal Component
  if (showCEOPortal) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black p-4" style={{ fontFamily: 'Gotham, sans-serif' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-white mb-4">👑 CEO PORTAL ACTIVATED 👑</h1>
            <p className="text-xl text-gray-300">Welcome to the Executive Stratosphere</p>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 mb-8">
            <h2 className="text-3xl font-bold text-black mb-4">Executive Access Granted</h2>
            <p className="text-black text-lg mb-6">
              You've discovered the secret portal to executive wisdom. 
              Proceed to the sacred shrine of business excellence.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => setShowCEOShrine(true)}
                className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold"
                style={{ fontFamily: 'Gotham, sans-serif' }}
              >
                Enter CEO Shrine
              </Button>
              <Button 
                onClick={resetAnalysis}
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg font-semibold"
                style={{ fontFamily: 'Gotham, sans-serif' }}
              >
                Return to Analysis
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CEO Shrine Component
  if (showCEOShrine) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-4" style={{ fontFamily: 'Gotham, sans-serif' }}>
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => setShowCEOShrine(false)}
            className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white"
            size="icon"
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-yellow-400 mb-4">🌟 DARRYL SIMSOVIC SHRINE 🌟</h1>
            <p className="text-xl text-gray-300">The LaunchLife Legend • Franchise Whisperer • CEO Extraordinaire</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 text-center">
              <img 
                src="/lovable-uploads/b2bf1468-2552-425b-906a-73fc42217a62.png"
                alt="Darryl Simsovic - CEO Legend"
                className="w-48 h-48 mx-auto mb-6 object-cover cursor-pointer transition-transform hover:scale-110"
                onClick={() => toast.success("The franchise whisperer acknowledges your presence with executive precision.")}
              />
              <h3 className="text-2xl font-bold text-black mb-4">The Franchise Architect</h3>
              <p className="text-black">Builder of business empires across 31 countries</p>
            </div>

            <div className="bg-black border border-yellow-400 p-8 text-yellow-400">
              <h3 className="text-2xl font-bold mb-6">Executive Achievements</h3>
              <ul className="space-y-3 text-lg">
                <li>✨ LaunchLife CEO & Visionary</li>
                <li>🌍 Global Franchise Expert</li>
                <li>📈 Business Empire Builder</li>
                <li>💎 Strategic Growth Mastermind</li>
                <li>🚀 Innovation Pioneer</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-black to-gray-900 border border-yellow-400 p-8 text-center mb-8">
            <h3 className="text-3xl font-bold text-yellow-400 mb-4">CEO Wisdom Portal</h3>
            <p className="text-xl text-gray-300 mb-6">
              "Success isn't just about reaching the top—it's about building the ladder for others to climb."
            </p>
            <p className="text-lg text-gray-400">— Darryl Simsovic, CEO LaunchLife</p>
          </div>

          <div className="text-center">
            <Button 
              onClick={resetAnalysis}
              className="bg-yellow-400 text-black hover:bg-yellow-500 px-12 py-4 text-xl font-bold"
              style={{ fontFamily: 'Gotham, sans-serif' }}
            >
              Return to Skill Analysis
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Paul Lewis Portal Component
  if (showPaulLewisPortal) {
    return (
      <div className="min-h-screen" style={{ 
        background: 'linear-gradient(135deg, #005399 0%, #9BC53D 100%)', 
        fontFamily: 'Gotham, sans-serif' 
      }}>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-white p-12 shadow-2xl max-w-4xl w-full text-center" style={{ border: '4px solid #005399' }}>
            <div className="mb-8">
              <h1 className="text-5xl font-bold mb-4" style={{ color: '#005399' }}>
                🎩 PAUL LEWIS PORTAL ACTIVATED 🎩
              </h1>
              <p className="text-2xl" style={{ color: '#9BC53D' }}>Managing Director Excellence Mode Engaged</p>
            </div>
            
            <div className="bg-gray-50 p-8 mb-8" style={{ border: '2px solid #005399' }}>
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#005399' }}>
                Welcome to the Executive Suite
              </h2>
              <p className="text-xl mb-6" style={{ color: '#333' }}>
                You've accessed the exclusive Managing Director portal. Paul Lewis's strategic insights await.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6" style={{ backgroundColor: '#005399', color: 'white' }}>
                  <h3 className="text-xl font-bold mb-4">Leadership Excellence</h3>
                  <ul className="text-left space-y-2">
                    <li>• Strategic Vision Implementation</li>
                    <li>• Operational Excellence</li>
                    <li>• Team Development</li>
                    <li>• Market Innovation</li>
                  </ul>
                </div>
                <div className="p-6" style={{ backgroundColor: '#9BC53D', color: 'white' }}>
                  <h3 className="text-xl font-bold mb-4">Executive Insights</h3>
                  <ul className="text-left space-y-2">
                    <li>• Franchise Management</li>
                    <li>• Business Growth Strategies</li>
                    <li>• Educational Excellence</li>
                    <li>• Industry Leadership</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-8 mb-8" style={{ backgroundColor: '#f8fafc', border: '2px solid #9BC53D' }}>
              <blockquote className="text-2xl italic mb-6" style={{ color: '#005399' }}>
                "Excellence in education transforms lives. Our commitment to learner success drives everything we do at Pitman Training."
              </blockquote>
              <p className="text-lg font-semibold" style={{ color: '#9BC53D' }}>
                — Paul Lewis, Managing Director
              </p>
            </div>
            
            <div className="flex justify-center gap-6">
              <Button 
                onClick={resetAnalysis}
                className="px-12 py-4 text-xl font-bold text-white"
                style={{ backgroundColor: '#005399', fontFamily: 'Gotham, sans-serif' }}
              >
                Return to Skill Analysis
              </Button>
              <Button 
                onClick={() => toast.success("Paul Lewis acknowledges your executive acumen!")}
                className="px-12 py-4 text-xl font-bold"
                style={{ 
                  backgroundColor: '#9BC53D', 
                  color: 'white',
                  fontFamily: 'Gotham, sans-serif' 
                }}
              >
                Executive Acknowledgement
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results View
  if (!showForm && result) {
    return (
      <div className="min-h-screen bg-white p-4" style={{ fontFamily: 'Gotham, sans-serif' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4" style={{ color: '#005399' }}>Your Skill Gap Analysis</h1>
            <p className="text-xl text-gray-600">Professional Development Insights by Pitman Training</p>
          </div>

          {/* Overall Score */}
          <Card className="mb-8 bg-white" style={{ border: '2px solid #005399' }}>
            <CardHeader className="text-center bg-gray-50">
              <CardTitle className="text-3xl" style={{ color: '#005399' }}>Overall Match Score</CardTitle>
              <div className={`text-7xl font-bold ${getScoreColour(result.overallScore)}`}>
                {result.overallScore}%
              </div>
              <Progress value={result.overallScore} className="w-full max-w-md mx-auto mt-6" />
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Strengths */}
            <Card className="bg-white" style={{ border: '2px solid #9BC53D' }}>
              <CardHeader style={{ backgroundColor: '#f0f9ff' }}>
                <CardTitle className="flex items-center gap-3" style={{ color: '#9BC53D' }}>
                  <CheckCircle className="w-6 h-6" />
                  Your Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5" style={{ color: '#9BC53D' }} />
                      <span className="capitalize text-lg">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Skill Gaps */}
            <Card className="bg-white" style={{ border: '2px solid #D2691E' }}>
              <CardHeader style={{ backgroundColor: '#fff7ed' }}>
                <CardTitle className="flex items-center gap-3" style={{ color: '#D2691E' }}>
                  <XCircle className="w-6 h-6" />
                  Areas to Develop
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {result.gaps.map((gap, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <XCircle className="w-5 h-5" style={{ color: '#D2691E' }} />
                      <span className="capitalize text-lg">{gap}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card className="mb-12 bg-white" style={{ border: '2px solid #005399' }}>
            <CardHeader style={{ backgroundColor: '#f8fafc' }}>
              <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: '#005399' }}>
                <BookOpen className="w-6 h-6" />
                Recommended Pitman Training Courses
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="space-y-6">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="p-6 bg-gray-50" style={{ border: '2px solid #E5E7EB' }}>
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-bold text-xl" style={{ color: '#005399' }}>{rec.course}</h3>
                      <Badge className={getPriorityColour(rec.priority)}>
                        {rec.priority} priority
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4 text-lg">{rec.reason}</p>
                    <Button 
                      className="text-white font-semibold px-6 py-3" 
                      style={{ backgroundColor: '#005399' }}
                    >
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sir Isaac's Advice */}
          <Card className="mb-12 bg-white" style={{ border: '2px solid #005399' }}>
            <CardContent className="p-8 text-center">
              <img 
                src="/lovable-uploads/b2bf1468-2552-425b-906a-73fc42217a62.png" 
                alt="Sir Isaac Pitman"
                className="w-40 h-auto mx-auto mb-6"
              />
              <blockquote className="text-xl italic text-gray-700 mb-6">
                "Excellence in one's profession comes not from natural talent alone, but from dedicated study and continuous improvement. 
                Your journey towards mastery begins with a single step — and the proper training, of course!"
              </blockquote>
              <p className="text-gray-600 font-semibold text-lg">— Sir Isaac Pitman</p>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button 
              onClick={resetAnalysis}
              variant="outline"
              className="mr-6 px-8 py-3 text-lg font-semibold"
              style={{ border: '2px solid #005399', color: '#005399' }}
            >
              Analyse Another Role
            </Button>
            <Button 
              className="text-white px-8 py-3 text-lg font-semibold" 
              style={{ backgroundColor: '#005399' }}
            >
              Contact Pitman Training
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Main Form
  return (
    <div className="min-h-screen bg-white p-4" style={{ fontFamily: 'Gotham, sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#005399' }}>Skill Gap Analyser</h1>
          <p className="text-xl text-gray-600">Discover your career development opportunities with professional insights</p>
        </div>

        <Card className="bg-white" style={{ border: '2px solid #005399' }}>
          <CardHeader style={{ backgroundColor: '#f8fafc' }}>
            <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: '#005399' }}>
              <Target className="w-6 h-6" />
              Professional Development Analysis
            </CardTitle>
            <p className="text-gray-600 text-lg">Complete this form for your personalised skill gap analysis and course recommendations.</p>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            {/* Personal Information */}
            <div className="pl-6" style={{ borderLeft: '4px solid #005399' }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#005399' }}>Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">First Name *</label>
                  <Input
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="focus:border-blue-500"
                    style={{ border: '2px solid #E5E7EB' }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Surname *</label>
                  <Input
                    placeholder="Enter your surname"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="focus:border-blue-500"
                    style={{ border: '2px solid #E5E7EB' }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address *</label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="focus:border-blue-500"
                    style={{ border: '2px solid #E5E7EB' }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                  <Input
                    placeholder="Your contact number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="focus:border-blue-500"
                    style={{ border: '2px solid #E5E7EB' }}
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="pl-6" style={{ borderLeft: '4px solid #9BC53D' }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#9BC53D' }}>Professional Background</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Briefcase className="w-4 h-4" />
                    Current Job Title *
                  </label>
                  <Input
                    placeholder="e.g., Marketing Assistant"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                    className="focus:border-green-500"
                    style={{ border: '2px solid #E5E7EB' }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <User className="w-4 h-4" />
                    Industry
                  </label>
                  <Input
                    placeholder="e.g., Digital Marketing, Healthcare"
                    value={formData.industry}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    className="focus:border-green-500"
                    style={{ border: '2px solid #E5E7EB' }}
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-sm font-semibold text-gray-700">Years of Experience</label>
                <Input
                  placeholder="e.g., 2 years, Entry level, 5+ years"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="focus:border-green-500"
                  style={{ border: '2px solid #E5E7EB' }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Current Skills *</label>
                <Textarea
                  placeholder="List your current skills, separated by commas (e.g., Microsoft Office, customer service, social media management, teamwork)"
                  value={formData.currentSkills}
                  onChange={(e) => setFormData({...formData, currentSkills: e.target.value})}
                  rows={4}
                  className="focus:border-green-500"
                  style={{ border: '2px solid #E5E7EB' }}
                />
              </div>
            </div>

            {/* Career Goals */}
            <div className="pl-6" style={{ borderLeft: '4px solid #D2691E' }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#D2691E' }}>Career Development Goals</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Desired Role *</label>
                  <Input
                    placeholder="e.g., Digital Marketing Manager, Project Coordinator"
                    value={formData.desiredRole}
                    onChange={(e) => setFormData({...formData, desiredRole: e.target.value})}
                    className="focus:border-orange-500"
                    style={{ border: '2px solid #E5E7EB' }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Job Requirements</label>
                  <Textarea
                    placeholder="List the requirements for your desired role, separated by commas (e.g., Google Ads, project management, leadership, advanced Excel)"
                    value={formData.jobRequirements}
                    onChange={(e) => setFormData({...formData, jobRequirements: e.target.value})}
                    rows={4}
                    className="focus:border-orange-500"
                    style={{ border: '2px solid #E5E7EB' }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center pt-8">
              <Button 
                onClick={analyzeSkillGap}
                disabled={isAnalyzing}
                className="text-white px-12 py-4 text-xl font-bold" 
                style={{ backgroundColor: '#005399', fontFamily: 'Gotham, sans-serif' }}
              >
                {isAnalyzing ? 'Analysing Your Professional Profile...' : 'Analyse My Skills & Get Course Recommendations'}
              </Button>
            </div>

            {isAnalyzing && (
              <div className="text-center">
                <div className="flex justify-center items-center gap-3">
                  <div className="animate-spin h-6 w-6" style={{ border: '2px solid #005399', borderTop: '2px solid transparent', borderRadius: '50%' }}></div>
                  <span className="text-lg" style={{ color: '#005399' }}>Analysing your professional profile and matching with our training programmes...</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-gray-500">
            * Required fields. Your information will be used to provide personalised course recommendations and may be used to contact you about relevant training opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillGapAnalyzer;
