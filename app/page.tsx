"use client"

import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Mail, MapPin, Phone, Calendar, ArrowRight, Menu, X, Instagram, Twitter, Briefcase } from "lucide-react"
import ProfileCard from "@/components/ui/profile-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { createPortal } from "react-dom"
import dynamic from "next/dynamic"

const projects = [
  {
    id: 1,
    title: "Noir — powering your projects, tasks, and a healthier you.",
    description: `Noir is a powerful React Native app built with Expo, designed to help you manage projects, tasks, and well-being in one place. Stay organized, track your progress, and prioritize your health with intuitive features, all while maintaining a seamless experience across devices.`,
    images: [
      "/noir/noir1.png",
      "/noir/noir2.png",
      "/noir/noir3.png",
      "/noir/noir4.png",
      "/noir/noir5.png",
      "/noir/noir6.png"
    ],
    technologies: ["React Native", "Expo", "Supabase (PostgreSQL)", "Typescript", "Vite"],
    liveUrl: "",
    githubUrl: "https://github.com/amxcodes/Noir",
    category: "Mobile App",
    date: "December 2024 - April 2025"
  },
  {
    id: 2,
    title: "Skyverse - Electron-based AI Interaction Environment",
    description: `Developed a cross-platform desktop chat application using Electron, React, and Flask, featuring secure JWT authentication with user registration, refresh token-based login, and role-based access control. Integrated both local (Phi-3 via Ollama) and cloud (Gemini) AI models to enable dynamic, context-aware conversations with personalized assistant personas and persistent memory. Designed a modern, responsive UI supporting dark mode, chat search, grouped history, and customizable model/persona settings. Implemented real-time web crawling with searchable, savable favorites. Built a robust backend with protected APIs and encrypted password storage. Planned enhancements include voice interaction, accessibility features, mobile/web expansion, and advanced user analytics.`,
    images: [
    
      "/sky/Screenshot%202025-06-18%20035727.png",
      "/sky/Screenshot%202025-06-18%20035855.png",
      "/sky/Screenshot%202025-06-18%20035935.png",
      "/sky/Screenshot%202025-06-18%20040019.png",
      "/sky/Screenshot%202025-06-18%20040045.png",
      "/sky/Screenshot%202025-06-18%20040123.png",
      "/sky/Screenshot%202025-06-18%20040157.png",
      "/sky/Screenshot%202025-06-18%20040218.png",
      "/sky/Screenshot%202025-06-18%20040248.png",
      "/sky/Screenshot%202025-06-18%20040314.png"
    ],
    technologies: ["Electron", "React", "Flask", "SQLite", "Ollama (Phi-3)", "Gemini API", "Web Crawling", "JWT Auth"],
    liveUrl: "",
    githubUrl: "",
    category: "Desktop App",
    date: "May 2025"
  },
  {
    id: 3,
    title: "Yaseens-ykfa martial arts gym - Website/WebApp",
    description: `Developed a fully responsive 10–12 page martial arts gym website using React, Vite, and GSAP. Key features include a PWA-based workout timer with custom voice prompts (no download required), interactive BMI calculator, and a hardcoded chatbot for easy navigation. Optimized for performance with efficient memory use, smooth JS rendering, image fallbacks, and a custom mobile nav menu for a seamless cross-device experience, all tailored to the client's brand.`,
    images: [
      "/yaseen/Screenshot%202025-06-18%20034545.png",
      "/yaseen/Screenshot%202025-06-18%20034620.png",
      "/yaseen/Screenshot%202025-06-18%20034652.png",
      "/yaseen/Screenshot%202025-06-18%20034717.png",
      "/yaseen/Screenshot%202025-06-18%20034755.png",
      "/yaseen/Screenshot%202025-06-18%20034828.png",
      "/yaseen/Screenshot%202025-06-18%20034857.png",
      "/yaseen/Screenshot%202025-06-18%20034930.png",
      "/yaseen/Screenshot%202025-06-18%20035006.png",
      "/yaseen/Screenshot%202025-06-18%20035100.png",
      "/yaseen/Screenshot%202025-06-18%20035144.png",
      "/yaseen/Screenshot%202025-06-18%20035207.png"
    ],
    technologies: ["React", "Vite", "GSAP"],
    liveUrl: "https://yaseens-ykfa.netlify.app/",
    githubUrl: "",
    category: "Web App",
    date: "April 2025 - May 2025"
  },
  {
    id: 4,
    title: "Promotional Website and Web Mini Game - Aroha 2025 UG Fest",
    description: `Led Aroha 2025, the UG Fest of SCMS School of Technology and Management, as the Main Student Coordinator, overseeing end-to-end execution across all departments. Managed strategy, decoration, finance, sponsorships, student coordination, issue resolution, and direct communication between faculty and students. Supervised all operations—including late-night work sessions and crisis handling—to ensure smooth execution. Developed a promotional website with event registration and participant support, and personally came up with the idea to embed a hidden subdomain-based mini memory game inside the digital brochure. The game attracted 100+ unique visitors with repeated plays. The event was a resounding success, with all sponsor-backed stalls turning profitable.`,
    images: [
      "/aroha/Screenshot%202025-06-18%20031830.png",
      "/aroha/Screenshot%202025-06-18%20031919.png",
      "/aroha/Screenshot%202025-06-18%20032000.png",
      "/aroha/Screenshot%202025-06-18%20032038.png",
      "/aroha/Screenshot%202025-06-18%20032212.png",
      "/aroha/Screenshot%202025-06-18%20032243.png",
      "/aroha/Screenshot%202025-06-18%20032348.png"
    ],
    technologies: ["Vite", "Next.js"],
    liveUrl: "https://sstmaroha.com/",
    githubUrl: "",
    category: "Web App",
    date: "2025"
  },
  {
    id: 5,
    title: "Social Media Inspired Daily Expense Tracker",
    description: "A modern expense tracking application with a social media-like interface. Features include daily expense logging, category-based tracking, visual analytics, and a user-friendly dashboard. Built with a focus on user engagement and intuitive expense management.",
    technologies: ["php", "mysql", "javascript", "ajax", "css", "html", "Chart.js"],
    images: [
      "/expense tracker/expense1.png",
      "/expense tracker/expense2.png",
      "/expense tracker/expense3.png",
      "/expense tracker/expense4.png",
      "/expense tracker/expense5.png",
      "/expense tracker/expense6.png"
    ],
    githubUrl: "https://github.com/yourusername/expense-tracker",
    liveUrl: "https://expense-tracker-demo.vercel.app",
    category: "Web App",
    date: "December 2023"
  },
  {
    id: 6,
    title: "Sinova 2024 - Canva based static website",
    description: `Developed a static informational website for a newly launched annual hackathon at SCMS School of Technology and Management, where I also served as a main student coordinator. The platform provided event details and a seamless registration process, contributing to 70+ participants in its inaugural edition. This project helped set the foundation for an engaging tech event to be held in the years to come.`,
    images: [
      "/sinova/Screenshot%202025-06-18%20033810.png",
      "/sinova/Screenshot%202025-06-18%20033853.png",
      "/sinova/Screenshot%202025-06-18%20033916.png",
      "/sinova/Screenshot%202025-06-18%20033952.png",
      "/sinova/Screenshot%202025-06-18%20034028.png",
      "/sinova/Screenshot%202025-06-18%20034054.png"
    ],
    technologies: ["Canva", "Static Website"],
    liveUrl: "",
    githubUrl: "",
    category: "Web App",
    date: "2024"
  },
  {
    id: 7,
    title: "Mirae Studio - SVG-based AI Post Maker Automation",
    description: "A Canva-like web editor that lets users design social-media posts with an SVG canvas, then auto-generate polished versions using Gemini LLM. Features user authentication, template library, one-click AI enhancement, and direct Instagram publishing via Instagrapi.",
    images: ["/placeholder.svg"],
    technologies: ["React.js", "Fabric.js", "Gemini API", "Instagrapi", "NextAuth", "Tailwind CSS"],
    liveUrl: "https://amxdevs.onrender.com/",
    githubUrl: "https://github.com/amxcodes/lika",
    category: "Web App",
    date: "Ongoing"
  },
]

const navItems = [
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Future", href: "#blog" },
  { name: "Contact", href: "#contact" },
]

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com/amanxnu", icon: Instagram },
  { name: "Pinterest", href: "https://pinterest.com/amanxnu", icon: "PI" },
  { name: "Behance", href: "https://behance.net/amanxnu", icon: "BE" },
  { name: "Twitter", href: "https://twitter.com/amanxnu", icon: Twitter },
]

const CanvaSection = dynamic(() => import("@/components/CanvaSection"), { ssr: false })
const FullscreenViewer = dynamic(() => import("@/components/FullscreenViewer"), { ssr: false })

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("all")
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [showProjection, setShowProjection] = useState(false)

  useEffect(() => {
    if (showProjection) {
      document.body.classList.add("projection-open")
    } else {
      document.body.classList.remove("projection-open")
    }
  }, [showProjection])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, []);

  // Handle liquid glass effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const buttons = document.querySelectorAll('.liquid-glass-btn');
      buttons.forEach((button) => {
        const rect = (button as HTMLElement).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        (button as HTMLElement).style.setProperty('--x', `${x}%`);
        (button as HTMLElement).style.setProperty('--y', `${y}%`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [modalOpen]);

  const filteredProjects = useMemo(() => {
    if (activeTab === "all") return projects;
    return projects.filter(
      (p) => p.category.toLowerCase().replace(/[^a-z0-9]/g, "") === activeTab
    );
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Left Column - Fixed and Vertically Centered */}
      <div className="lg:w-2/5 lg:h-screen lg:fixed lg:left-0 lg:top-0 bg-black flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="max-w-sm w-full pt-8 lg:pt-0">
          {/* Navbar (now inside left column) */}
          <header className="flex justify-center mb-8 w-full">
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={cn(
                'flex items-center gap-4 transition-all duration-500',
                scrolled
                  ? 'bg-stone-100/90 backdrop-blur-xl shadow-2xl shadow-black/10'
                  : 'bg-stone-100/80 backdrop-blur-lg shadow-xl shadow-black/5',
                'rounded-full border border-stone-200/80 px-4 py-2'
              )}
            >
              {/* Logo Section */}
              <Link href="/">
                <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">AA</span>
                </div>
              </Link>
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center">
                <div className="flex items-center space-x-1 bg-white/60 rounded-full p-1 shadow-inner shadow-stone-200/50">
                  {navItems.map((item) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-full transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>
              {/* Mobile Navigation */}
              <div className="md:hidden flex items-center space-x-3">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-black hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>
          </header>

          {/* Name and Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left mb-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 leading-tight">Aman Anu</h1>
            <p className="text-xl sm:text-2xl text-gray-400 mb-4">Developer & Designer</p>
            <div className="flex flex-col items-center lg:items-start text-gray-500 mb-6 gap-1">
              <div className="flex items-center"><MapPin className="w-4 h-4 mr-2 flex-shrink-0" /><span className="text-sm">Edappally toll, Ernakulam</span></div>
              <div className="flex items-center"><Phone className="w-4 h-4 mr-2 flex-shrink-0" /><span className="text-sm">9037078553</span></div>
            </div>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8 text-center lg:text-left"
          >
            <p className="text-gray-300 leading-relaxed mb-6 text-base">
              A recent graduate with a strong passion for technology, creativity, and innovation. I enjoy working on projects that blend technical skills with creative thinking, staying updated with the latest AI tools and trends.
            </p>
            <p className="text-gray-500 text-sm">
              My experiences across different forms of expression from building tech projects to participating in creative productions, have taught me the value of fresh ideas, teamwork, and adaptability. I am eager to learn, contribute, and grow while making a meaningful impact.
            </p>
          </motion.div>

          {/* Social Links - Small Bubbles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
          >
            {socialLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group backdrop-blur-sm border border-white/10 hover:border-white/30"
                  title={link.name}
                >
                  {typeof link.icon === "string" ? (
                    <span className="text-white text-xs font-medium">{link.icon}</span>
                  ) : (
                    <link.icon className="w-4 h-4 text-white" />
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              size="lg"
              className="w-full bg-white text-black hover:bg-gray-200 rounded-xl transition-all duration-300 font-medium py-3"
              asChild
            >
              <Link href="mailto:amananuworks@gmail.com">
                <Mail className="w-5 h-5 mr-2" />
                Contact Me
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Right Column - Scrollable */}
      <div className="lg:w-3/5 lg:ml-[40%] bg-black p-6 sm:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
          <main>
            {/* Featured Projects Section */}
            <motion.div
              id="work"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mb-12"
            >
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/20 shadow-2xl shadow-black/20 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-50" />
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
                
                {/* Content */}
                <div className="relative">
                  <span className="inline-block text-sm font-medium text-white/60 mb-3 tracking-wider">SHOWCASE</span>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                    Featured Projects
                  </h2>
                  <p className="text-white/60 text-lg max-w-2xl">
                    A collection of my best work, showcasing my skills in development and design.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Project Categories */}
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-12">
              <TabsList className="bg-zinc-900 p-1.5 rounded-full backdrop-blur-sm border border-white/10 shadow-lg inline-flex">
                <TabsTrigger
                  value="all"
                  className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg text-sm font-medium text-gray-400 hover:text-white px-6 py-2.5 transition-all duration-300"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="webapp"
                  className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg text-sm font-medium text-gray-400 hover:text-white px-6 py-2.5 transition-all duration-300"
                >
                  Web Apps
                </TabsTrigger>
                <TabsTrigger
                  value="desktopapp"
                  className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg text-sm font-medium text-gray-400 hover:text-white px-6 py-2.5 transition-all duration-300"
                >
                  Desktop Apps
                </TabsTrigger>
                <TabsTrigger
                  value="mobileapp"
                  className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg text-sm font-medium text-gray-400 hover:text-white px-6 py-2.5 transition-all duration-300"
                >
                  Mobile Apps
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Projects Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <AnimatePresence mode="wait">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => {
                      setSelectedProject(project)
                      setModalOpen(true)
                      setCarouselIndex(0)
                    }}
                  >
                    <Card className="overflow-hidden bg-zinc-900/70 border-zinc-800/80 rounded-3xl backdrop-blur-sm hover:bg-zinc-900/90 transition-all duration-500 border hover:border-white/20 h-full flex flex-col">
                      {/* Project Image */}
                      <div className="relative overflow-hidden aspect-[16/10]">
                        <Image
                          src={project.images[0] || "/placeholder.svg"}
                          alt={project.title}
                          width={600}
                          height={375}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <Badge
                            variant="outline"
                            className="bg-black/60 text-white border-white/20 rounded-lg backdrop-blur-md px-3 py-1 text-xs font-medium"
                          >
                            {project.category}
                          </Badge>
                        </div>
                        
                        {/* Project Number */}
                        <div className="absolute top-4 right-4">
                          <span className="text-white/70 font-mono text-xs bg-black/50 backdrop-blur-md px-2 py-1 rounded-md">
                            0{index + 1}
                          </span>
                        </div>

                        {/* Action Buttons - Show on Hover */}
                        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              size="icon"
                              className="bg-white/90 text-black hover:bg-white rounded-lg font-medium backdrop-blur-sm h-8 w-8"
                              asChild
                            >
                              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                              </Link>
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              size="icon"
                              className="bg-white/90 text-black hover:bg-white rounded-lg backdrop-blur-sm h-8 w-8"
                              asChild
                            >
                              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4" />
                              </Link>
                            </Button>
                          </motion.div>
                        </div>
                      </div>

                      {/* Project Content */}
                      <CardContent className="p-6 flex-grow flex flex-col justify-between -mt-px">
                        <div>
                          <CardTitle className="text-xl font-bold text-zinc-100 mb-2 group-hover:text-white transition-colors leading-tight">
                            {project.title}
                          </CardTitle>
                          <CardDescription className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-4">
                            {project.description}
                          </CardDescription>
                        </div>

                        <div>
                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.slice(0, 4).map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="bg-zinc-800 text-gray-300 hover:bg-zinc-700 border-0 rounded-md text-xs px-2.5 py-1 font-normal"
                              >
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 4 && (
                              <Badge
                                variant="secondary"
                                className="bg-zinc-800 text-gray-400 border-0 rounded-md text-xs px-2.5 py-1 font-normal"
                              >
                                +{project.technologies.length - 4}
                              </Badge>
                            )}
                          </div>

                          {/* Quick Actions */}
                          <div className="mt-auto pt-4 flex items-center justify-between">
                            <div className="flex gap-4">
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  Live Demo
                                </a>
                              )}
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300"
                                >
                                  <Github className="w-3.5 h-3.5" />
                                  Code
                                </a>
                              )}
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors duration-300" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Canva Designs Section */}
            <CanvaSection />

            {/* Profile Card Section */}
            <h2 className="text-3xl font-bold mt-20 mb-6 text-white text-center lg:text-left">Profile Card</h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="my-16"
            >
              <ProfileCard
                name="Aman Anu"
                title="Developer & Designer"
                handle="amanxnu"
                status="Available for Projects"
                contactText="Let's Connect"
                avatarUrl="/profile-avatar.jpg"
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() => window.location.href = 'mailto:amananuworks@gmail.com'}
              />
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-20 pt-12 border-t border-white/10 text-center"
            >
              <p className="text-gray-400 mb-8 text-xl">Interested in working together?</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-200 rounded-xl font-medium px-8 py-4 text-lg"
                  asChild
                >
                  <Link href="mailto:amananuworks@gmail.com">
                    <Mail className="w-5 h-5 mr-2" />
                    Let's Talk
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Project Modal */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
              <DialogContent className="glass-modal w-[90vw] max-w-2xl p-3 rounded-2xl">
                {selectedProject && (
                  <div className="relative">
                    <DialogHeader className="space-y-1 mb-2">
                      <DialogTitle className="text-lg font-bold text-white/90 leading-tight">{selectedProject.title}</DialogTitle>
                      {selectedProject.date && (
                        <div className="text-[11px] text-white/60 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {selectedProject.date}
                        </div>
                      )}
                    </DialogHeader>
                    
                    {/* Enhanced Image Carousel */}
                    {selectedProject.images && selectedProject.images.length > 0 && (
                      <div className="relative flex flex-col items-center mb-2">
                        {/* Main Image Display */}
                        <div className={`glass-card w-full ${
                          selectedProject.title.toLowerCase().includes('noir') 
                            ? 'aspect-[3/4] max-h-[65vh]' 
                            : 'aspect-[16/9] max-h-[60vh]'
                        } rounded-xl overflow-hidden relative group cursor-pointer`}
                        onClick={(e) => { e.stopPropagation(); setModalOpen(false); setShowProjection(true); }}>
                          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <button
                              onClick={(e) => { e.stopPropagation(); setCarouselIndex(i => Math.max(i - 1, 0)); }}
                              className="liquid-glass-btn p-1 rounded-full disabled:opacity-40 disabled:cursor-not-allowed"
                              disabled={carouselIndex === 0}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); setCarouselIndex(i => Math.min(i + 1, selectedProject.images.length - 1)); }}
                              className="liquid-glass-btn p-1 rounded-full disabled:opacity-40 disabled:cursor-not-allowed"
                              disabled={carouselIndex === selectedProject.images.length - 1}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                            </button>
                          </div>
                          <img
                            src={selectedProject.images[carouselIndex]}
                            alt={`${selectedProject.title} - Image ${carouselIndex + 1}`}
                            className={`w-full h-full ${
                              selectedProject.title.toLowerCase().includes('noir')
                                ? 'object-contain'
                                : 'object-cover'
                            } transition-all duration-300`}
                            loading="lazy"
                          />
                          {/* Image Counter */}
                          <div className="liquid-glass-btn absolute bottom-2 right-2 px-1.5 py-0.5 rounded-full text-white/90 text-[10px] z-20">
                            {carouselIndex + 1} / {selectedProject.images.length}
                          </div>
                        </div>
                        
                        {/* Thumbnails */}
                        {selectedProject.images.length > 1 && (
                          <div className="flex gap-1 mt-2 px-0.5 max-w-full overflow-x-auto pb-1 custom-scrollbar">
                            {selectedProject.images.map((img, idx) => (
                              <button
                                key={img}
                                onClick={(e) => { e.stopPropagation(); setCarouselIndex(idx); }}
                                className={`glass-thumbnail relative flex-shrink-0 ${
                                  selectedProject.title.toLowerCase().includes('noir')
                                    ? 'w-8 h-11'
                                    : 'w-11 h-11'
                                } rounded-lg overflow-hidden transition-all ${
                                  carouselIndex === idx ? 'ring-1 ring-white/50 ring-offset-1 ring-offset-black/90' : 'opacity-50 hover:opacity-75'
                                }`}
                              >
                                <img
                                  src={img}
                                  alt={`Thumbnail ${idx + 1}`}
                                  className={`w-full h-full ${
                                    selectedProject.title.toLowerCase().includes('noir')
                                      ? 'object-contain'
                                      : 'object-cover'
                                  }`}
                                  loading="lazy"
                                />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="space-y-2">
                      {/* Description */}
                      <DialogDescription className="text-xs text-white/70">
                        {selectedProject.description}
                      </DialogDescription>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1">
                        {selectedProject.technologies.map(tech => (
                          <span key={tech} className="liquid-glass-btn px-2 py-0.5 rounded-full text-white/90 text-[10px] font-medium whitespace-nowrap">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* Links */}
                      <div className="flex gap-2">
                        {selectedProject.liveUrl && (
                          <a
                            href={selectedProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="liquid-glass-btn inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-white/90 text-xs"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Live Demo
                          </a>
                        )}
                        {selectedProject.githubUrl && (
                          <a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="liquid-glass-btn inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-white/90 text-xs"
                          >
                            <Github className="w-3 h-3" />
                            Code
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Close button in the corner */}
                    <DialogClose className="absolute right-1 top-1 p-1.5 text-white/70 hover:text-white">
                      <X className="h-4 w-4" />
                    </DialogClose>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            {/* 3D Image Projection */}
            {showProjection && selectedProject && (
              <FullscreenViewer
                images={selectedProject.images}
                index={carouselIndex}
                title={selectedProject.title}
                onClose={() => { setShowProjection(false); setModalOpen(true); }}
                setIndex={setCarouselIndex}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
