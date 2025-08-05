
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, BookOpen, ArrowRight, User, Briefcase, Target } from 'lucide-react';
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
  });
  const [result, setResult] = useState<SkillGapResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showForm, setShowForm] = useState(true);

  // Mock training courses database
  const trainingCourses = {
    'Digital Marketing': 'Master social media, SEO, and online advertising strategies',
    'Project Management': 'Learn Agile, Scrum, and traditional project management methodologies',
    'Data Analysis': 'Excel, Power BI, and basic data interpretation skills',
    'Customer Service Excellence': 'Communication, conflict resolution, and customer retention',
    'Microsoft Office Suite': 'Advanced Word, Excel, PowerPoint, and Outlook proficiency',
    'Business Administration': 'Operations, finance basics, and organizational skills',
    'Sales Techniques': 'Lead generation, negotiation, and closing strategies',
    'Leadership & Management': 'Team building, delegation, and strategic thinking',
    'Bookkeeping & Accounting': 'Financial records, basic accounting principles',
    'Web Design Fundamentals': 'HTML, CSS, and modern design principles',
    'Communication Skills': 'Presentation, writing, and interpersonal communication',
    'Time Management': 'Productivity techniques and organizational systems'
  };

  const analyzeSkillGap = async () => {
    if (!formData.jobTitle || !formData.currentSkills || !formData.desiredRole) {
      toast.error("Please fill in at least the job title, current skills, and desired role fields.");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis time
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock analysis logic (in real implementation, this would use AI)
    const currentSkillsArray = formData.currentSkills.toLowerCase().split(',').map(s => s.trim());
    const jobReqsArray = formData.jobRequirements.toLowerCase().split(',').map(s => s.trim());
    
    // Simple matching algorithm
    const matchingSkills = currentSkillsArray.filter(skill => 
      jobReqsArray.some(req => req.includes(skill) || skill.includes(req))
    );
    
    const overallScore = Math.min(90, Math.max(20, (matchingSkills.length / Math.max(jobReqsArray.length, 1)) * 100 + Math.random() * 20));
    
    // Generate mock recommendations based on common skill gaps
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
    setFormData({
      jobTitle: '',
      industry: '',
      experience: '',
      currentSkills: '',
      desiredRole: '',
      jobRequirements: '',
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!showForm && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Your Skill Gap Analysis</h1>
            <p className="text-slate-300 text-lg">Powered by Sir Isaac's Victorian Wisdom</p>
          </div>

          {/* Overall Score */}
          <Card className="mb-8 bg-white/95 backdrop-blur-sm shadow-xl border-2 border-amber-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Overall Match Score</CardTitle>
              <div className={`text-6xl font-bold ${getScoreColor(result.overallScore)}`}>
                {result.overallScore}%
              </div>
              <Progress value={result.overallScore} className="w-full max-w-md mx-auto mt-4" />
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Strengths */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-2 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  Your Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="capitalize">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Skill Gaps */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-2 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <XCircle className="w-5 h-5" />
                  Areas to Develop
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.gaps.map((gap, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="capitalize">{gap}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card className="mb-8 bg-white/95 backdrop-blur-sm shadow-xl border-2 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Recommended Pitman Training Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="p-4 border-2 border-slate-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{rec.course}</h3>
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority} priority
                      </Badge>
                    </div>
                    <p className="text-slate-600 mb-3">{rec.reason}</p>
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sir Isaac's Advice */}
          <Card className="mb-8 bg-white/95 backdrop-blur-sm shadow-xl border-2 border-amber-200">
            <CardContent className="p-6 text-center">
              <img 
                src="/lovable-uploads/b2bf1468-2552-425b-906a-73fc42217a62.png" 
                alt="Sir Isaac Pitman"
                className="w-32 h-auto mx-auto mb-4 rounded-lg"
              />
              <blockquote className="text-lg italic text-slate-700 mb-4">
                "Excellence in one's profession comes not from natural talent alone, but from dedicated study and continuous improvement. 
                Your journey toward mastery begins with a single step — and the proper training, of course!"
              </blockquote>
              <p className="text-slate-600 font-semibold">— Sir Isaac Pitman</p>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button 
              onClick={resetAnalysis}
              variant="outline"
              className="border-amber-300 text-amber-300 hover:bg-amber-900/20 mr-4"
            >
              Analyze Another Role
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700">
              Contact Pitman Training
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Skill Gap Analyzer</h1>
          <p className="text-slate-300 text-lg">Discover your career development opportunities with Sir Isaac's guidance</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-2 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Career Analysis Form
            </CardTitle>
            <p className="text-slate-600">Fill out the form below for your personalized skill gap analysis. No account required - your information is not stored.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Briefcase className="w-4 h-4" />
                  Current Job Title *
                </label>
                <Input
                  placeholder="e.g., Marketing Assistant"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <User className="w-4 h-4" />
                  Industry
                </label>
                <Input
                  placeholder="e.g., Digital Marketing, Healthcare"
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Years of Experience</label>
              <Input
                placeholder="e.g., 2 years, Entry level, 5+ years"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Current Skills *</label>
              <Textarea
                placeholder="List your current skills, separated by commas (e.g., Microsoft Office, customer service, social media management, teamwork)"
                value={formData.currentSkills}
                onChange={(e) => setFormData({...formData, currentSkills: e.target.value})}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Desired Role *</label>
              <Input
                placeholder="e.g., Digital Marketing Manager, Project Coordinator"
                value={formData.desiredRole}
                onChange={(e) => setFormData({...formData, desiredRole: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Job Requirements</label>
              <Textarea
                placeholder="List the requirements for your desired role, separated by commas (e.g., Google Ads, project management, leadership, advanced Excel)"
                value={formData.jobRequirements}
                onChange={(e) => setFormData({...formData, jobRequirements: e.target.value})}
                rows={3}
              />
            </div>

            <div className="flex justify-center pt-4">
              <Button 
                onClick={analyzeSkillGap}
                disabled={isAnalyzing}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg font-semibold"
              >
                {isAnalyzing ? 'Analyzing Your Skills...' : 'Analyze My Skills'}
              </Button>
            </div>

            {isAnalyzing && (
              <div className="text-center">
                <div className="flex justify-center items-center gap-2 text-amber-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600"></div>
                  <span>Sir Isaac is analyzing your career profile...</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-slate-400 text-sm">
            * Required fields. Your information is processed locally and not stored.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillGapAnalyzer;
