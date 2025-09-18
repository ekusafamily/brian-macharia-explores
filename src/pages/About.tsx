import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, MapPin, Code, History, Calculator, Users, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import brianPortrait from "@/assets/brian-portrait.jpg";

const About = () => {
  const skills = [
    "Web Design", "React", "TypeScript", "HTML/CSS", "JavaScript", 
    "Tailwind CSS", "UI/UX Design", "Responsive Design"
  ];

  const achievements = [
    {
      icon: GraduationCap,
      title: "University Student",
      description: "Currently pursuing my degree with a focus on technology and mathematics",
      period: "2022 - Present"
    },
    {
      icon: Code,
      title: "Web Designer",
      description: "Creating beautiful, responsive websites and user interfaces",
      period: "2021 - Present"
    },
    {
      icon: History,
      title: "History Enthusiast",
      description: "Researching and writing about African history and world civilizations",
      period: "Ongoing"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            About <span className="text-gradient">Brian Macharia Ireri</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A passionate student, web designer, and lifelong learner from Kenya, bridging the worlds of technology, history, and human connection.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="blog-card">
              <CardContent className="p-8 text-center">
                <img 
                  src={brianPortrait}
                  alt="Brian Macharia Ireri"
                  className="w-48 h-48 object-cover rounded-3xl mx-auto mb-6 card-shadow"
                />
                <h3 className="text-2xl font-serif font-bold mb-2">Brian Macharia Ireri</h3>
                <p className="text-muted-foreground mb-4 flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Kenya
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span>University Student</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Code className="w-4 h-4 text-primary" />
                    <span>Web Designer</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span>People Person</span>
                  </div>
                </div>
                <Button asChild className="mt-6 w-full" size="lg">
                  <Link to="/contact">
                    <Mail className="w-4 h-4 mr-2" />
                    Get In Touch
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Biography and Details */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="blog-card">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">My Story</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <p className="text-base leading-relaxed mb-4">
                  Hello! I'm Brian Macharia Ireri, a university student from Kenya with a deep passion for learning and connecting with people. My journey spans across multiple disciplines, from the logical beauty of mathematics to the creative world of web design, and the rich narratives of history.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  As a web designer, I love creating digital experiences that are not only visually appealing but also functional and accessible. I believe that good design should tell a story and solve real problems for real people. My technical skills include modern web technologies like React, TypeScript, and responsive design principles.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  History has always fascinated me, particularly African history and the stories that often go untold. I enjoy researching historical events, understanding different perspectives, and sharing these insights through my writing. There's something powerful about understanding where we come from to better navigate where we're going.
                </p>
                <p className="text-base leading-relaxed">
                  When I'm not coding or reading about historical events, you'll find me engaging in conversations with people from all walks of life. I believe that every person has a unique story to tell, and I'm always eager to listen and learn from others' experiences.
                </p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="blog-card">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Skills & Technologies</CardTitle>
                <CardDescription>
                  The tools and technologies I use to bring ideas to life
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 transition-smooth">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Timeline */}
        <Card className="blog-card">
          <CardHeader>
            <CardTitle className="text-2xl font-serif">Journey & Achievements</CardTitle>
            <CardDescription>
              Key milestones in my academic and professional development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {achievements.map(({ icon: Icon, title, description, period }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-12 h-12 hero-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{title}</h3>
                      <span className="text-sm text-muted-foreground">{period}</span>
                    </div>
                    <p className="text-muted-foreground">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;