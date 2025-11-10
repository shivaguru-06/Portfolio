import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Star, FileText, Rocket, Download, User, Award, Send, Home as HomeIcon, Layers, Plus, Tag, Trophy, Github, Linkedin } from "lucide-react";

type DivProps = React.ComponentProps<'div'>;
export const Card: React.FC<DivProps> = ({ className = "", ...p }) => (
  <div className={`rounded-xl border border-white/10 bg-white/5 ${className}`} {...p} />
);
export const CardHeader: React.FC<DivProps> = ({ className = "", ...p }) => (
  <div className={`p-4 ${className}`} {...p} />
);
export const CardContent: React.FC<DivProps> = ({ className = "", ...p }) => (
  <div className={`p-4 ${className}`} {...p} />
);
export const CardFooter: React.FC<DivProps> = ({ className = "", ...p }) => (
  <div className={`p-4 pt-0 ${className}`} {...p} />
);
export const CardTitle: React.FC<DivProps> = ({ className = "", ...p }) => (
  <div className={`text-lg font-semibold ${className}`} {...p} />
);
export const CardDescription: React.FC<DivProps> = ({ className = "", ...p }) => (
  <div className={`text-sm opacity-80 ${className}`} {...p} />
);

export const Button: React.FC<React.ComponentProps<'button'> & { asChild?: boolean }> = ({ className = "", children, asChild, ...rest }) => {
  if (asChild) {
    // Expecting an <a> as child; just wrap styling
    return (
      <span className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium ${className}`}>{children}</span>
    );
  }
  return (
    <button className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium ${className}`} {...rest}>{children}</button>
  );
};

export const Input: React.FC<React.ComponentProps<'input'>> = ({ className = "", ...p }) => (
  <input className={`w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${className}`} {...p} />
);
export const Textarea: React.FC<React.ComponentProps<'textarea'>> = ({ className = "", ...p }) => (
  <textarea className={`w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${className}`} {...p} />
);
export const Badge: React.FC<React.ComponentProps<'span'>> = ({ className = "", ...p }) => (
  <span className={`inline-block text-xs px-2 py-0.5 rounded border ${className}`} {...p} />
);

// ----------------------------------
// Profile / Resume data
// ----------------------------------
const PROFILE = {
  name: "Shivaguru S",
  title: "Full‑Stack Developer (Java | React | Node.js)",
  tagline: "Building interactive, scalable and visually stunning web applications.",
  // Put these files in /public
  resumeUrl: "/resume.pdf",
  photoUrl: "/profile.jpg",
  location: "Karur, Tamilnadu, India",
  email: "shivagurus2452@gmail.com",
  social: { github: "https://github.com/shivaguru-06", linkedin: "https://www.linkedin.com/in/shivaguru2004" },
};

const EDUCATION = [
  { school: "K. Ramakrishnan College of Engineering", degree: "B.Tech in Information Technology", period: "2022 — Present", place: "Tiruchirappalli, Tamil Nadu", notes: "CGPA: 8.08/10" },
  { school: "Bharani Vidhyalaya Senior Secondary School", degree: "Higher Secondary", period: "2021 — 2022", place: "Karur, Tamil Nadu", notes: "Percentage: 80.4%" },
  { school: "Bharani Vidhyalaya Senior Secondary School", degree: "Secondary", period: "2019 — 2020", place: "Karur, Tamil Nadu", notes: "Percentage: 80.2%" },
];

const SEED_CERTS = [
  { title: "Microsoft Azure Fundamentals", issuer: "Microsoft", year: "2024" },
  { title: "NPTEL — Programming in Java", issuer: "NPTEL", year: "2024" },
  { title: "UI/UX Workshop (Certificate)", issuer: "NIT Trichy", year: "May 2025" },
  { title: "First Prize — Data Science Using Python (Dept Presentation Day)", issuer: "KRCE", year: "2024" },
];

interface Experience { company: string; role: string; period: string; points: string[] }
const SEED_EXPERIENCE: Experience[] = [
  { company: "TechnoHacks", role: "Python Development Intern", period: "May 2025 — Jun 2025", points: ["Designed and developed Python scripts for data processing, automation and optimization."] },
  { company: "Oasis Infobyte", role: "Java Development Intern", period: "Aug 2025 — Sep 2025", points: ["Developed and tested Java applications", "focusing on improving user experirnce and functionality", "Contributed to projects by debugging code, optimizing performance,and ensuring efficient data management"] },
];


interface SectionTitleProps { icon?: React.ReactNode; kicker?: string; title: string; sub?: string; rightSlot?: React.ReactNode }
const SectionTitle: React.FC<SectionTitleProps> = ({ icon, kicker, title, sub, rightSlot }) => (
  <div className="mb-6 flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-indigo-300">{icon} {kicker}</div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">{title}</h2>
      </div>
      {rightSlot}
    </div>
    {sub && <p className="text-indigo-200/80 max-w-2xl">{sub}</p>}
  </div>
);

const Navbar: React.FC = () => (
  <div className="sticky top-0 z-40 border-b border-white/10 backdrop-blur bg-black/30">
    <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between text-sm">
      <NavLink to="/" className="font-semibold text-white/90 hover:text-white flex items-center gap-2">
        <HomeIcon className="h-4 w-4" /> {PROFILE.name}
      </NavLink>
      <nav className="hidden md:flex gap-1">
        {NAV_LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} className={({ isActive }) => `px-3 py-2 rounded-md transition ${isActive ? "bg-white/15 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"}`}>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </div>
  </div>
);

const PageShell: React.FC<{ bgClass: string; children: React.ReactNode }> = ({ bgClass, children }) => (
  <motion.div className={`${bgClass} min-h-screen text-white`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    <Navbar />
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {children}
    </div>
  </motion.div>
);

// ----------------------------------
// Animation helpers
// ----------------------------------
const FadeInSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  React.useEffect(() => { if (inView) controls.start({ opacity: 1, y: 0 }); }, [inView]);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 60 }} animate={controls} transition={{ duration: 0.8, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
};

const staggerParent = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } };
const fadeUpChild = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

// ----------------------------------
// GitHub helpers
// ----------------------------------
interface Repo { name: string; html_url: string; stargazers_count: number; description?: string; language?: string; topics?: string[] }
const ghUsername = () => PROFILE.social.github.split("/").pop() || "";

function useAllGithubRepos(username: string) {
  const [repos, setRepos] = useState<Repo[]>([]);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        if (!res.ok) throw new Error("GitHub fetch failed");
        const data: Repo[] = await res.json();
        if (mounted) setRepos(data);
      } catch (err) { console.warn("GitHub error:", err); if (mounted) setRepos([]); }
    })();
    return () => { mounted = false; };
  }, [username]);
  return repos;
}

function useTopGithubRepos(username: string) {
  const [repos, setRepos] = useState<Repo[]>([]);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        if (!res.ok) throw new Error("GitHub fetch failed");
        const data: Repo[] = await res.json();
        const sorted = data.sort((a,b) => b.stargazers_count - a.stargazers_count).slice(0, 3);
        if (mounted) setRepos(sorted);
      } catch (err) { console.warn("GitHub error:", err); if (mounted) setRepos([]); }
    })();
    return () => { mounted = false; };
  }, [username]);
  return repos;
}

// Skill logos
const SKILL_LOGOS: Record<string, string> = {
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  C: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  'C++': "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  'Jupyter Notebook': "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
  'Jypyter Notebook': "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
  Other: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg",
};

// ----------------------------------
// Top repos (home + projects reuse)
// ----------------------------------
const TopReposSection: React.FC<{ username: string }> = ({ username }) => {
  const repos = useTopGithubRepos(username);
  return (
    <FadeInSection>
      <section className="mt-10">
        <SectionTitle icon={<Star className="h-5 w-5 text-yellow-400" />} title="Top Rated Projects" sub="Most starred repositories from my GitHub profile" />
        <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <motion.div key={repo.name} variants={fadeUpChild} whileHover={{ scale: 1.04 }}>
              <Card className="h-full min-h-[260px] flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white border border-gray-700 hover:shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-bold text-indigo-300">{repo.name}</CardTitle>
                  <CardDescription className="text-indigo-200/70">{repo.description || "No description provided."}</CardDescription>
                </CardHeader>
                <CardContent className="grow">
                  <p className="text-sm flex items-center gap-2 text-yellow-400"><Star className="h-4 w-4" /> {repo.stargazers_count} Stars</p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white"><a href={repo.html_url} target="_blank" rel="noreferrer">View Repository</a></Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </FadeInSection>
  );
};

// ----------------------------------
// Hero (Home)
// ----------------------------------
const Hero: React.FC = () => (
  <FadeInSection>
    <section className="relative flex flex-col md:flex-row items-center justify-between min-h-[85vh] rounded-3xl overflow-hidden bg-[radial-gradient(1200px_600px_at_110%_-20%,#1f2937_20%,transparent_60%),linear-gradient(135deg,#0b1020_0%,#0f172a_45%,#1e1b4b_100%)] text-white shadow-2xl">
      <div className="flex-1 p-10">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-cyan-300 to-sky-300">{PROFILE.name}</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="text-xl mt-2 text-indigo-200">{PROFILE.title}</motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.5 }} className="mt-4 max-w-xl text-indigo-200/80">{PROFILE.tagline}</motion.p>
        <motion.div className="mt-6 flex flex-wrap gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 0.8 }}>
          <Button className="bg-gradient-to-r from-cyan-500 to-indigo-500 text-white hover:opacity-90" asChild><a href="/projects"><Rocket className="mr-2 h-4 w-4" /> View Projects</a></Button>
          {PROFILE.resumeUrl && (
            <Button className="bg-gradient-to-r from-pink-600 to-rose-500 text-white hover:opacity-90" asChild><a href={PROFILE.resumeUrl} download><Download className="mr-2 h-4 w-4" /> Download Resume</a></Button>
          )}
          {PROFILE.resumeUrl && (
            <Button className="border border-indigo-400 text-indigo-300 hover:bg-indigo-400 hover:text-black" asChild><a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer"><FileText className="mr-2 h-4 w-4" /> View Resume</a></Button>
          )}
        </motion.div>
        <motion.div className="mt-6 flex gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.6, delay: 1 }}>
          <a href={PROFILE.social.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/80 hover:text-white transition"><Github className="h-5 w-5" /> GitHub</a>
          <a href={PROFILE.social.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/80 hover:text-white transition"><Linkedin className="h-5 w-5" /> LinkedIn</a>
        </motion.div>
      </div>
      <motion.div className="flex-1 flex justify-center p-6 relative" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}>
        <motion.div animate={{ y: [0, -15, 0], rotateY: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="relative">
          <motion.img
            src={PROFILE.photoUrl}
            alt="Portrait"
            data-fallback="0"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              if (img.dataset.fallback !== "1") { img.dataset.fallback = "1"; img.src = "https://avatars.githubusercontent.com/u/9919?s=200&v=4"; }
            }}
            className="rounded-3xl shadow-[0_0_50px_rgba(99,102,241,0.6)] border-4 border-indigo-400 object-cover w-[380px] h-[500px]"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>
      </motion.div>
    </section>
  </FadeInSection>
);

// ----------------------------------
// HOME: Top skills inferred (by language)
// ----------------------------------
const HomeTopSkills: React.FC = () => {
  const repos = useAllGithubRepos(ghUsername());
  const top = useMemo(() => {
    const counts = new Map<string, number>();
    repos.forEach(r => { const k = r.language || "Other"; counts.set(k, (counts.get(k) || 0) + 1); });
    return Array.from(counts.entries()).sort((a,b)=>b[1]-a[1]).slice(0,6);
  }, [repos]);
  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Top Skills Learned</CardTitle>
        <CardDescription className="text-indigo-200/80">Automatically inferred from GitHub repo languages</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {top.map(([lang, count]) => (
            <motion.div key={lang === 'Other' ? 'Others' : lang} variants={fadeUpChild} whileHover={{ y: -4 }} className="flex flex-col items-center gap-2">
              <img src={SKILL_LOGOS[lang] || SKILL_LOGOS.Other} alt={lang} className="w-10 h-10" />
              <div className="text-sm text-white/90">{lang === 'Other' ? 'Others' : lang}</div>
              <Badge className="bg-indigo-900/40 border border-indigo-400 text-indigo-200">{count} repos</Badge>
            </motion.div>
          ))}
          {!top.length && <div className="text-indigo-200">No repos yet. Add projects on GitHub to populate this section.</div>}
        </motion.div>
      </CardContent>
    </Card>
  );
};

// ----------------------------------
// Pages + Navbar Links
// ----------------------------------
const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/certifications", label: "Certifications" },
  { to: "/contact", label: "Contact" },
];

const HomePage: React.FC = () => (
  <PageShell bgClass="bg-[radial-gradient(1400px_700px_at_110%_-20%,#1f2937_20%,transparent_60%),linear-gradient(135deg,#0b1020_0%,#0f172a_45%,#1e1b4b_100%)]">
    <Hero />
    <HomeTopSkills />
    <TopReposSection username={ghUsername()} />
  </PageShell>
);

// ----------------------------------
// About with Animated Education Timeline
// ----------------------------------
const AboutPage: React.FC = () => (
  <PageShell bgClass="bg-[radial-gradient(1200px_600px_at_-10%_-20%,#0b1020_20%,transparent_60%),linear-gradient(135deg,#0f172a_0%,#1e293b_45%,#0b3b3b_100%)]">
    <SectionTitle icon={<User className="h-4 w-4 text-teal-300" />} title="About Me" sub="Curious, collaborative, and product‑focused developer with a passion for technology and innovation." />
    <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      <motion.div variants={fadeUpChild} className="md:col-span-1 flex justify-center">
        <motion.img
          src={PROFILE.photoUrl}
          alt="Portrait"
          data-fallback="0"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            if (img.dataset.fallback !== "1") { img.dataset.fallback = "1"; img.src = "https://avatars.githubusercontent.com/u/9919?s=200&v=4"; }
          }}
          className="rounded-2xl w-[280px] h-[360px] object-cover border-4 border-teal-400 shadow-[0_0_40px_rgba(45,212,191,0.5)]"
        />
      </motion.div>
      <motion.div variants={fadeUpChild} className="md:col-span-2 text-indigo-100/90 leading-relaxed space-y-5">
        <div>
          <h3 className="text-xl font-semibold text-teal-300 mb-2">Career Objective</h3>
          <p>To secure a responsible position where I can contribute my technical skills and grow with the company, building efficient, scalable, and user‑friendly solutions.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-300 mb-2">Strengths</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Strong problem‑solving and analytical skills</li>
            <li>Quick learner; continuous improvement mindset</li>
            <li>Effective communication and leadership</li>
            <li>Collaborative team player</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-300 mb-2">Technical Interests</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Web Development (React, Node.js, Spring Boot)</li>
            <li>Machine Learning & Data Science</li>
            <li>Cloud Computing (Azure, AWS)</li>
            <li>Software Architecture & Patterns</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-300 mb-2">Education</h3>
          <motion.ul initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={staggerParent} className="relative ml-2 pl-6 space-y-4">
            <span className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-teal-400/70 via-teal-300/50 to-transparent" />
            {EDUCATION.map((e) => (
              <motion.li key={e.school + e.period} variants={fadeUpChild} className="relative">
                <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.8)]" />
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="font-medium text-white">{e.degree} · {e.school}</div>
                  <div className="text-xs text-teal-200/90">{e.period} · {e.place}</div>
                  <div className="text-xs text-white/80">{e.notes}</div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </motion.div>
  </PageShell>
);

// ----------------------------------
// Experience (Add)
// ----------------------------------
const ExperiencePage: React.FC = () => {
  const [list, setList] = useState<Experience[]>([...SEED_EXPERIENCE]);
  const [form, setForm] = useState({ company: "", role: "", period: "", points: "" });
  useEffect(() => {
  (async () => {
    try {
      const res = await fetch(`/api/experience`);
      if (res.ok) {
        const data = await res.json();
        setList(data);
      } else {
        console.error("Failed to load experience from DB");
      }
    } catch (err) {
      console.error("Error fetching experience:", err);
    }
  })();
}, []);

  const addItem = async () => {
  if (!form.company || !form.role) return;
  const item = {
    company: form.company,
    role: form.role,
    period: form.period || "—",
    points: form.points ? form.points.split(";").map(s => s.trim()).filter(Boolean) : [],
  };

  try {
    const res = await fetch(`/api/experience`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error("Failed to save experience");
    const saved = await res.json();
    setList([saved, ...list]);
    setForm({ company: "", role: "", period: "", points: "" });
  } catch (err) {
    console.error("Error adding experience:", err);
    alert("Failed to add experience. Check console for details.");
  }
};



  return (
    <PageShell bgClass="bg-[radial-gradient(1200px_600px_at_110%_10%,#0b1020_20%,transparent_60%),linear-gradient(135deg,#0a0a1a_0%,#1a1033_45%,#2a0a3a_100%)]">
      <SectionTitle icon={<Award className="h-4 w-4 text-fuchsia-300" />} title="Experience" sub="A concise timeline of roles and responsibilities." rightSlot={<Button onClick={addItem} className="bg-fuchsia-600/70 hover:bg-fuchsia-600"><Plus className="h-4 w-4 mr-1"/>Add</Button>} />
      <Card className="bg-white/5 border-white/10 mb-6">
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input value={form.company} onChange={e=>setForm({...form, company:e.target.value})} placeholder="Company" />
          <Input value={form.role} onChange={e=>setForm({...form, role:e.target.value})} placeholder="Role" />
          <Input value={form.period} onChange={e=>setForm({...form, period:e.target.value})} placeholder="Period (e.g., 2024 — 2025)" />
          <Input value={form.points} onChange={e=>setForm({...form, points:e.target.value})} placeholder="Bullets (separate with ;)" />
        </CardContent>
      </Card>
      <motion.ol variants={staggerParent} initial="hidden" animate="show" className="relative border-l border-white/20 ml-2 pl-6 space-y-8">
        {list.map((e, idx) => (
          <motion.li key={idx} variants={fadeUpChild} className="relative">
            <span className="absolute -left-1.5 mt-2 h-3 w-3 rounded-full bg-fuchsia-400" />
            <motion.div whileHover={{ scale: 1.01 }}>
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white">
                    <span>{e.role} · {e.company}</span>
                    <span className="text-xs text-fuchsia-200">{e.period}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!!e.points?.length && (
                    <ul className="list-disc pl-5 space-y-1 text-sm text-fuchsia-100/90">
                      {e.points.map(p => <li key={p}>{p}</li>)}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.li>
        ))}
      </motion.ol>
    </PageShell>
  );
};

// ----------------------------------
// Projects (All GitHub repos grouped by language + custom Add)
// ----------------------------------
const ProjectsPage: React.FC = () => {
  const username = ghUsername();
  const ghRepos = useAllGithubRepos(username);
  type CustomProject = { name: string; url: string; description?: string; skills?: string };
  const [custom, setCustom] = useState<CustomProject[]>([]);
  const [form, setForm] = useState<CustomProject>({ name: "", url: "", description: "", skills: "" });
  useEffect(() => {
  (async () => {
    try {
      const res = await fetch(`/api/projects`);
      if (res.ok) {
        const data = await res.json();
        setCustom(data);
      } else {
        console.error("Failed to load projects from DB");
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  })();
}, []);

  const groups = useMemo(() => {
    const byLang = new Map<string, Repo[]>();
    ghRepos.forEach(r => {
      const key = r.language || "Other";
      if (!byLang.has(key)) byLang.set(key, []);
      byLang.get(key)!.push(r);
    });
    return Array.from(byLang.entries()).sort((a,b)=>a[0].localeCompare(b[0]));
  }, [ghRepos]);
  const addCustom = async () => {
  if (!form.name || !form.url) return;
  try {
    const res = await fetch(`/api/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error("Failed to save project");
    const saved = await res.json();
    setCustom([saved, ...custom]);
    setForm({ name: "", url: "", description: "", skills: "" });
  } catch (err) {
    console.error("Error adding project:", err);
    alert("Failed to add project. Check console for details.");
  }
};


  return (
    <PageShell bgClass="bg-[radial-gradient(1200px_600px_at_50%_-20%,#1f2937_20%,transparent_60%),linear-gradient(135deg,#0b1020_0%,#102018_45%,#0a3a24_100%)]">
      <SectionTitle icon={<Layers className="h-4 w-4 text-emerald-300" />} title="Projects" sub="GitHub repositories grouped by primary language. Add custom projects too." rightSlot={<Button onClick={addCustom} className="bg-emerald-600/80 hover:bg-emerald-600"><Plus className="h-4 w-4 mr-1"/>Add</Button>} />
      <Card className="bg-white/5 border-white/10 mb-6">
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Project name" />
          <Input value={form.url} onChange={e=>setForm({...form, url:e.target.value})} placeholder="URL (GitHub/live)" />
          <Input value={form.skills} onChange={e=>setForm({...form, skills:e.target.value})} placeholder="Skills (comma separated)" />
          <Input value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Short description" />
        </CardContent>
      </Card>
      {!!custom.length && (
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-emerald-200">Custom Projects</h3>
          <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {custom.map((p, i) => (
              <motion.div key={p.name+String(i)} variants={fadeUpChild} whileHover={{ y: -3 }}>
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">{p.name}</CardTitle>
                    {p.description && <CardDescription className="text-emerald-100/80">{p.description}</CardDescription>}
                  </CardHeader>
                  <CardContent className="text-sm text-emerald-100/80">
                    {p.skills && p.skills.split(',').map(s => <Badge key={s.trim()} className="mr-1 mb-1 bg-emerald-900/40 border border-emerald-400 text-emerald-200">{s.trim()}</Badge>)}
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="bg-emerald-600/80 text-white hover:bg-emerald-600"><a href={p.url} target="_blank" rel="noreferrer">Open</a></Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
      <div className="space-y-10 mt-8">
        {groups.map(([lang, repos]) => (
          <section key={lang}>
            <motion.h3 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-2xl font-bold mb-4 text-emerald-200">{lang}</motion.h3>
            <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo) => (
                <motion.div key={repo.name} variants={fadeUpChild} whileHover={{ scale: 1.02 }}>
                  <Card className="h-full min-h-[260px] flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white border border-gray-700 hover:shadow-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg font-bold text-emerald-300">{repo.name}</CardTitle>
                      <CardDescription className="text-emerald-100/70">{repo.description || "No description provided."}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-center gap-3 mt-auto">
                      <Button asChild className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90 text-white"><a href={repo.html_url} target="_blank" rel="noreferrer">Repository</a></Button>
                      {repo.language && <Badge className="bg-emerald-900/40 border border-emerald-400 text-emerald-200">{repo.language}</Badge>}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </section>
        ))}
      </div>
    </PageShell>
  );
};

// ----------------------------------
// Skills (logos + radar + Add)
// ----------------------------------
interface SkillItem { subject: string; level: number; logo?: string }
const SEED_SKILLS: SkillItem[] = [
  { subject: "Java", level: 92, logo: SKILL_LOGOS.Java },
  { subject: "React", level: 88, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { subject: "Node.js", level: 84, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { subject: "SQL", level: 86, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { subject: "Python", level: 80, logo: SKILL_LOGOS.Python },
];

const SkillsPage: React.FC = () => {
  const [skills, setSkills] = useState<SkillItem[]>(SEED_SKILLS);
  const [form, setForm] = useState<SkillItem>({ subject: "", level: 50, logo: "" });
   useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/skills`);
        if (res.ok) {
          const data = await res.json();
          setSkills(data);
        }
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    })();
  }, []);

  const addSkill = async () => {
  const s = form.subject.trim();
  if (!s) return;
  const lvl = Math.max(0, Math.min(100, Number(form.level)));

  try {
    const res = await fetch(`/api/skills`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: s, level: lvl, logo: form.logo }),
    });
    if (!res.ok) throw new Error("Failed to save skill");
    const saved = await res.json();
    setSkills([saved, ...skills]);
    setForm({ subject: "", level: 50, logo: "" });
  } catch (err) {
    console.error("Error adding skill:", err);
    alert("Failed to add skill. Check console for details.");
  }
};


  return (
    <PageShell bgClass="bg-[radial-gradient(1400px_700px_at_-10%_-20%,#1f2937_20%,transparent_60%),linear-gradient(135deg,#0b1020_0%,#0f172a_45%,#1b2a4b_100%)]">
      <SectionTitle icon={<Tag className="h-4 w-4 text-sky-300" />} title="Skills" sub="Logos, levels, and a radar chart." rightSlot={<Button onClick={addSkill} className="bg-sky-600/80 hover:bg-sky-600"><Plus className="h-4 w-4 mr-1"/>Add</Button>} />
      <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <Card className="bg-white/5 border-white/10 mb-6">
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input value={form.subject} onChange={e=>setForm({...form, subject:e.target.value})} placeholder="Skill (e.g., Spring Boot)" />
            <Input type="number" min={0} max={100} value={form.level} onChange={e=>setForm({...form, level:Number(e.target.value)})} placeholder="Level (0-100)" />
            <Input value={form.logo} onChange={e=>setForm({...form, logo:e.target.value})} placeholder="Logo URL (optional)" />
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-10">
          {skills.map(s => (
            <motion.div key={s.subject} variants={fadeUpChild} whileHover={{ y: -4 }} className="flex flex-col items-center gap-2">
              <img src={s.logo || SKILL_LOGOS.Other} alt={s.subject} className="w-12 h-12" />
              <div className="text-white/90 text-sm">{s.subject}</div>
              <Badge className="bg-sky-900/40 border border-sky-400 text-sky-200">{s.level}</Badge>
            </motion.div>
          ))}
        </div>
        <Card className="bg-gradient-to-br from-gray-900 via-gray-950 to-blue-950 border border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Skill Radar</CardTitle>
            <CardDescription className="text-indigo-200/80">Visualizing proficiency (0–100)</CardDescription>
          </CardHeader>
          <CardContent className="h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skills.map(s=>({ subject: s.subject, A: s.level }))}>
                <PolarGrid stroke="#556" />
                <PolarAngleAxis dataKey="subject" stroke="#cbd5e1" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" />
                <Radar name="Level" dataKey="A" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </PageShell>
  );
};

// ----------------------------------
// Certifications & Prizes (Add) — with issuer logos
// ----------------------------------
const CERT_LOGOS: Record<string, string> = {
  Microsoft: "https://images.credly.com/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/twitter_thumb_201604_image.png",
  NPTEL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSul1xEPB5P9e5XLgypRESAjQtYchar_FhqmqVQ0GdcVjKSaFOlSthxHtBx5WjC7VrW2tQ&usqp=CAU",
  "NIT Trichy": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/NITT_logo.png/250px-NITT_logo.png",
  KRCE: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYrsCrNjSk4Lz3qms131XPlySlPMJrXy-Kew&s", 
  Default: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder.png",
};



const CertificationsPage: React.FC = () => {
  type Cert = { title: string; issuer?: string; year?: string; logo?: string };
  const [certs, setCerts] = useState<Cert[]>(SEED_CERTS);
  // include logo in initial form state
  const [form, setForm] = useState<Cert>({ title: "", issuer: "", year: "", logo: "" });

  const addCert = () => {
    if (!form.title.trim()) return;
    setCerts([
      {
        title: form.title.trim(),
        issuer: form.issuer?.trim(),
        year: form.year?.trim(),
        logo: form.logo?.trim(),
      },
      ...certs,
    ]);
    setForm({ title: "", issuer: "", year: "", logo: "" });
  };

  const getLogo = (issuer?: string) => {
    if (!issuer) return CERT_LOGOS.Default;
    const key = Object.keys(CERT_LOGOS).find((k) =>
      issuer.toLowerCase().includes(k.toLowerCase())
    );
    return key ? CERT_LOGOS[key] : CERT_LOGOS.Default;
  };

  return (
    <PageShell bgClass="bg-[radial-gradient(1200px_600px_at_30%_-10%,#1f2937_20%,transparent_60%),linear-gradient(135deg,#1a1020_0%,#2a1f3a_45%,#3a104a_100%)]">
      <SectionTitle
        icon={<Trophy className="h-4 w-4 text-yellow-300" />}
        title="Certifications & Prizes"
        sub="Selected credentials and recognitions."
        rightSlot={
          <Button onClick={addCert} className="bg-yellow-500/80 hover:bg-yellow-500">
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        }
      />
      <Card className="bg-white/5 border-white/10 mb-6">
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title (e.g., Azure Fundamentals)"
          />
          <Input
            value={form.issuer}
            onChange={(e) => setForm({ ...form, issuer: e.target.value })}
            placeholder="Issuer (e.g., Microsoft)"
          />
          <Input
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            placeholder="Year/Month"
          />
          <Input
            value={form.logo || ""}
            onChange={(e) => setForm({ ...form, logo: e.target.value })}
            placeholder="Logo URL (optional)"
          />
        </CardContent>
      </Card>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {certs.map((c, i) => (
          <motion.div key={c.title + String(i)} variants={fadeUpChild} whileHover={{ y: -3 }}>
            <Card className="bg-white/5 border-white/10 flex items-center gap-4 p-4">
              <img
                src={c.logo || getLogo(c.issuer)}
                alt={c.issuer || "Issuer"}
                className="w-12 h-12 rounded-md border border-white/20 object-contain bg-white p-1"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = CERT_LOGOS.Default;
                }}
              />
              <div>
                <CardTitle className="text-white text-lg">{c.title}</CardTitle>
                <CardDescription className="text-indigo-200/80">
                  {[c.issuer, c.year].filter(Boolean).join(" • ")}
                </CardDescription>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </PageShell>
  );
};


// ----------------------------------
// Contact (animated form)
// ----------------------------------
const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); alert("Thanks! I'll get back within 24 hours."); setForm({ name: "", email: "", message: "" }); };
  return (
    <PageShell bgClass="bg-[radial-gradient(1200px_600px_at_110%_-20%,#1f2937_20%,transparent_60%),linear-gradient(135deg,#0b1020_0%,#1e1b4b_45%,#0a3a24_100%)]">
      <SectionTitle icon={<Send className="h-4 w-4 text-rose-300" />} title="Contact" sub="Tell me about your role, project, or idea." />
      <Card className="bg-white/5 border-white/10">
        <CardContent className="pt-6">
          <motion.form onSubmit={onSubmit} variants={staggerParent} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={fadeUpChild}>
              <label className="text-sm text-white/90">Your name</label>
              <Input required value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Jane" />
            </motion.div>
            <motion.div variants={fadeUpChild}>
              <label className="text-sm text-white/90">Email</label>
              <Input type="email" required value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} placeholder="jane@company.com" />
            </motion.div>
            <motion.div variants={fadeUpChild} className="md:col-span-2">
              <label className="text-sm text-white/90">Message</label>
              <Textarea required value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))} placeholder="What would you like to build?" rows={6} />
            </motion.div>
            <motion.div variants={fadeUpChild} className="md:col-span-2 flex items-center gap-3">
              <Button className="bg-gradient-to-r from-rose-500 to-pink-600 text-white">Send</Button>
              <a className="text-sm underline text-rose-200" href={`mailto:${PROFILE.email}`}>Or email me directly</a>
            </motion.div>
          </motion.form>
        </CardContent>
      </Card>
    </PageShell>
  );
};

// ----------------------------------
// Root App + Routes and tests
// ----------------------------------
export default function App() {
  useEffect(() => {
    const declared = new Set(NAV_LINKS.map(n=>n.to));
    const routes = ["/", "/about", "/experience", "/projects", "/skills", "/certifications", "/contact"];
    const missing = routes.filter(r => !declared.has(r));
    console.log(missing.length ? "[TEST] Route nav mismatch:" : "[TEST] Routes OK", missing);
    const user = ghUsername();
    console.log(user ? "[TEST] GitHub username:" : "[TEST] GitHub username missing", user);
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/certifications" element={<CertificationsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}
