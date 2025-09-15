import { useEffect, useRef, useState } from "react";
import { Presentation, Sparkle } from "lucide-react";

const withBase = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\//,'')}`;

function Reveal({ children, className = "", once = true, delay = 0, as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (once) obs.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        className,
        "transform-gpu transition-all duration-700 ease-out",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        "motion-reduce:transition-none motion-reduce:transform-none"
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="top-0 z-50 backdrop-blur-sm supports-backdrop-filter:bg-neutral-900/60 bg-neutral-900/90">
      <div className="container-wide flex items-center justify-between h-14 pt-10">
        <a className="text-lg sm:text-xl 3xl:text-2xl font-medium text-neutral-100">Sarit</a>
        <nav className="flex items-center gap-6 sm:gap-8 text-sm">
          <a href="#work" className="text-custom-text text-neutral-400 hover:opacity-70">Work</a>
          <a href="#about" className="text-custom-text text-neutral-400 hover:opacity-70">About</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="container-wide pt-28 sm:pt-44 pb-12 sm:pb-20">
      <h1 className="text-custom-hero text-neutral-100">
        I'm Sarit, a product designer who values clarity in everything.
      </h1>
      <h2 className="text-custom-subheader text-neutral-500 mt-1">
        Everything (n.): Design, User needs, Requirements, Goals, Strategy, Workflow, Communication, Et cetera.
      </h2>
      <p className="text-custom-text mt-6 3xl:mt-8 text-neutral-500">
        <span className="text-neutral-100">Languages</span> I speak: Thai, English, Japanese, and JavaScript.<br></br>
        Design <span className="text-neutral-100">experience</span>: Healthcare, AI agents, BtoB sales, 3D printing service.<br></br>
        Check out some selected works below, or reach out anytime.
      </p>
      <div className="mt-8 3xl:mt-10 flex gap-3">
        <a href={`${import.meta.env.BASE_URL}sarit_resume.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Resume"
          className="text-custom-text text-amber-300 inline-flex items-center rounded-full px-4 py-2 border border-neutral-700 hover:bg-neutral-700 transition">
          Resume
        </a>
        <a href="#contact" className="text-custom-text text-neutral-100 inline-flex items-center rounded-full px-4 py-2 border border-neutral-700 hover:bg-neutral-700 transition">
          Get in touch
        </a>
      </div>
    </section>
  )
}

function ProjectCard({
  title, blurb, href, tag, imageSrc, height = '10rem', featured = false,
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // base: use the prop as usual
      style={{ '--card-h': height }}
      className="
        group rounded-3xl border border-neutral-800 overflow-hidden hover:shadow-md hover:border-neutral-500
        transition duration-200 flex flex-col xs:flex-row

        /* resolved height = prop by default, 12rem at ≥3xl */
        [--card-h-resolved:var(--card-h)] 3xl:[--card-h-resolved:12rem]

        xs:h-[var(--card-h-resolved)]
      "
      aria-label={`${title} — ${tag} (opens in new tab)`}
    >
      <div
        className="
          relative w-full aspect-[20/9] flex-none bg-neutral-700
          xs:w-[var(--card-h-resolved)] xs:h-[var(--card-h-resolved)]
        "
      >
        <img
          src={imageSrc}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover object-left"
          loading="lazy"
          decoding="async"
          sizes="(min-width: 640px) 100vw, 100vw"
        />
      </div>

      <div
        className="
          relative p-5 flex-1 overflow-hidden bg-neutral-900
          xs:h-[var(--card-h-resolved)] xs:flex xs:flex-col xs:justify-center
        "
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 hidden xs:block
                     w-0 group-hover:w-full group-focus-visible:w-full
                     transition-[width] duration-500 ease-out overflow-hidden [will-change:width]"
          aria-hidden="true"
        >
          <img
            src={imageSrc}
            alt=""
            className="
              absolute top-0 h-full w-auto object-cover object-left
              xs:left-[calc(var(--card-h-resolved)*-1)]
              [mask-image:linear-gradient(to_right,white_50%,transparent)]
              [-webkit-mask-image:linear-gradient(to_right,white_50%,transparent)]
              [mask-size:100%_100%] [-webkit-mask-size:100%_100%]
              [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]
            "
          />
        </div>

        <div className="relative z-10">
          <div className="text-custom-label uppercase tracking-widest text-neutral-500">{tag}</div>
          <h3 className="text-custom-subheader mt-1 text-neutral-100">{title}</h3>
          <p className="text-custom-text mt-1 text-neutral-500">{blurb}</p>
        </div>

        {featured && (
          <Sparkle
            className="pointer-events-none absolute top-5 right-5 w-6 h-6 text-neutral-500 opacity-100 transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0"
            aria-hidden="true"
          />
        )}

        <Presentation
          className="absolute top-5 right-5 w-6 h-6 text-neutral-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden="true"
        />
      </div>
    </a>
  );
}


function Work() {
  const projects = [
    { title: 'Caretomo', blurb: 'Design system & interface: from IA to wireframe to high-fidelity', href: withBase('sample.pdf'), imageSrc: withBase('Thumbnail_Caretomo.png'), tag: 'Healthcare',featured: true },
    { title: 'Orcha', blurb: 'End-to-end experience and interface design from scratch', href: withBase('sample.pdf'), imageSrc: withBase('Thumbnail_Orcha.png'), tag: 'AI Agent',featured: true },
    { title: 'Sales Marker', blurb: 'Responsive improvements, UI QA, and new feature delivery', href: withBase('sample.pdf'), imageSrc: withBase('Thumbnail_SM.png'), tag: 'BtoB Sales' },
    { title: 'DigiFab', blurb: 'Landing & ordering pages, designed from the ground up', href: withBase('sample.pdf'), imageSrc: withBase('Thumbnail_DigiFab.png'), tag: '3D Printing Service' },
  ]
  return (
    <section id="work" className="container-wide py-12 sm:py-20">
      <div className="flex items-end justify-between gap-6">
        <p className="text-custom-header text-neutral-500">Selected works</p>
      </div>
      <div className="mt-6 flex flex-col gap-4 3xl:gap-5">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="container-wide pt-12 sm:pt-20 pb-6 sm:pb-10">
      <h2 className="text-custom-header">
        <span className="text-neutral-100">
          My journey
        </span>
        {/* ensure a space between the parts */}
        <span className="text-custom-header text-neutral-500">{' '}
          took me from mechanical engineering to frontend development to product design, where I found my place.
        </span>
      </h2>
      <div className="text-custom-text mt-6 text-neutral-500">
        <p>
          I help startups turn ideas into products—and I learn constantly in the process. 
          Above all, I’ve learned that <span className="underline decoration-neutral-500 underline-offset-4 decoration-1">clarity</span> across design, workflows, requirements, and communication saves time and resources.
          Outside of work, I enjoy exploring nature and immersing myself in all kinds of tales.
        </p>
      </div>
    </section>
  )
}

function HistoryList() {
  const [openSet, setOpenSet] = useState(() => new Set())

  const items = [
    {
      id: 'exp-1',
      year: '2024',
      company: 'Sales Marker',
      role: 'Product Designer',
      text: 'Drove <initiative>; reduced <metric> by <x>%.',
    },
    {
      id: 'exp-2',
      year: '2024',
      company: 'SIND',
      role: 'Product Designer',
      text: 'Drove <initiative>; reduced <metric> by <x>%.',
    },
    {
      id: 'exp-3',
      year: '2023',
      company: 'QunaSys',
      role: 'UX Engineer',
      text: 'I joined QunaSys as a UX Engineer, a role that covers both design and frontend development. QunaSys operates in the unique field of quantum computing applications. I contributed to product design and developed frontend features for several client projects. Along the way, I learned about frontend technologies and, more importantly, significantly improved my Japanese communication skills.',
    },
    {
      id: 'exp-4',
      year: '2023',
      company: 'Digitech Fabrication',
      role: 'Product Designer',
      text: 'Drove <initiative>; reduced <metric> by <x>%.',
    },
    {
      id: 'exp-5',
      year: '2023',
      company: 'Liigo',
      role: 'Frontend Engineer',
      text: 'I began a front-end developer internship at Liigo Inc. after self-learning frontend development. I helped build and maintain the Area Compass application, a digital transformation app for the travel industry. Working with talented colleagues, I deepened my front-end skills and learned how to operate effectively within a development team.',
    },
    {
      id: 'exp-6',
      year: '2022',
      company: 'The University of Tokyo',
      role: 'Graduate Student',
      text: 'I entered my master’s degree in the field of Aerospace Engineering. With talented people around me, I learned a lot in materials science and did collaborative research with JAXA on 3D printing of aluminum alloy, which was truly exciting for me. Until I learned a hard truth: I really love studying engineering, but I cannot say the same for working in it. This realization led me to the path of being a designer, a career I truly enjoy.',
    },
    {
      id: 'exp-7',
      year: '2017',
      company: 'Chulalongkorn University',
      role: 'Student',
      text: 'I started my bachelor’s degree in Mechanical Engineering. I learned about mechanical systems and the physics behind them, and gained an introduction to programming. Through these studies, human intelligence fills me with awe. We take the knowledge we gain and, by combining it with our wildest imagination, design and create things that truly change the world and make our lives better.',
    },
  ]

  const toggle = (id) => {
    setOpenSet(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <section id="historylist" className="text-custom-text container-wide pb-12 sm:pb-20">
      <div className="mt-6 border-y border-neutral-800 divide-y divide-neutral-800">
        {items.map((item) => {
          const isOpen = openSet.has(item.id)
          return (
            <div key={item.id}>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="cursor-pointer group w-full py-4 grid grid-cols-[1fr_1.5rem] sm:grid-cols-[3rem_1fr_1.5rem] items-start gap-4 text-left"
                aria-expanded={isOpen}
                aria-controls={`${item.id}-panel`}
              >
                <span className="uppercase text-neutral-500 hidden sm:flex">
                  {item.year}
                </span>

                <span className="flex items-center justify-between">
                  <span className="text-neutral-100">{item.company}</span>
                  <span className="text-neutral-500 text-right"> {item.role}</span>
                </span>

                {/* Plus that rotates to a cross; now follows row hover */}
                <span className="justify-self-end mt-1">
                  <svg
                    className={`transition-transform duration-300 text-neutral-500 group-hover:text-neutral-100 ${isOpen ? 'rotate-45' : ''}`}
                    width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </button>

              {/* Collapsible */}
              <div
                id={`${item.id}-panel`}
                className={`grid transition-[grid-template-rows] duration-400 ${isOpen ? 'grid-rows-[1fr] mb-4' : 'grid-rows-[0fr]'} text-neutral-500`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p>{item.text}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function WhatPeopleSay() {
  return (
    <section id="whatpeoplesay" className="container-wide py-12 sm:py-20">
      <h2 className="text-custom-header text-neutral-500">What colleagues say</h2>
      <div className="text-custom-text text-neutral-500">

        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-6">
          <a href="https://www.linkedin.com/in/grumpyuser/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-100 hover:opacity-50 underline underline-offset-4 sm:underline-offset-5 decoration-0">
            Emi K Murano
          </a>
          <p>| Lecturer at Temple University Tokyo Campus</p>
        </div>
        <p className="text-custom-textjapanese pt-1 sm:pt-2">
          Saritさんはプロダクトのクオリティを重視しながら、スピードが求められる環境でも根気強くデザインに取り組むことができます。

          Saritさんは、エンジニアとしての知識を背景に持ちながら、人間中心設計を実践できる稀有なハイブリッド型のデザイナーです。
          特に、ユーザ視点から一歩引いて考え、ステークホルダーにUXの観点を的確に伝える姿勢によって、関係者に新しい視点や刺激をもたらしてくれます。

          UIからUX、さらにはデザインの改善作業まで関わることができ、即戦力として開発とデザインを推進できる貴重な人材です。
        </p>

        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-6">
          <a href="https://www.linkedin.com/in/tanachaiana/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-100 hover:opacity-50 underline underline-offset-4 sm:underline-offset-5 decoration-0">
            Tanachai Anakewat
          </a>
          <p>| CTO of SIND Inc.</p>
        </div>
        <p className="pt-1 sm:pt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu mauris ultricies, viverra nulla non, ornare elit. 
          Vivamus vel nunc id diam molestie consequat.
        </p>

        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-6">
          <a href="https://www.linkedin.com/in/kota-yamaguchi-a91224164/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-100 hover:opacity-50 underline underline-offset-4 sm:underline-offset-5 decoration-0">
            Kota Yamaguchi
          </a>
          <p>| Product Engineer at SmartHR Inc.<br></br>| Previously Frontend Engineer at QunaSys Inc.</p>
        </div>
        <p className="pt-1 sm:pt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu mauris ultricies, viverra nulla non, ornare elit. 
          Vivamus vel nunc id diam molestie consequat.
        </p>

        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-6">
          <a href="https://www.linkedin.com/in/setthibhak-suthithanakom/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-100 hover:opacity-50 underline underline-offset-4 sm:underline-offset-5 decoration-0">
            Setthibhak Suthithanakom
          </a>
          <p>| Co-founder of Digitech Fabrication Co., Ltd.</p>
        </div>
        <p className="pt-1 sm:pt-2">
          Our company produces custom engineering parts in Thailand, where an effective ordering interface is vital. 
          Mr. Sarit’s design is both functional and intuitive. 
          Customers positively noted our platform’s ease of use and aesthetics compared to competitors, significantly strengthen our market competitiveness.
        </p>
        
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="container-wide py-12 sm:py-20">
      <h2 className="text-custom-header">
        <span className="text-neutral-100">
          Contact me,
        </span>
        <span className="text-neutral-500">{' '}
          anytime
        </span>
      </h2>
      <p className="text-custom-text mt-4 text-neutral-500">
        I am open to interesting product problems and career opportunity.
      </p>
      <div className="text-custom-text mt-8 flex flex-wrap gap-3">
        <a className="inline-flex items-center rounded-full px-4 py-2 border border-neutral-700 hover:bg-neutral-700 transition"
          href="mailto:sarit.sopitvetmontree@gmail.com">
          sarit.sopitvetmontree@gmail.com
        </a>
        <a className="inline-flex items-center rounded-full px-4 py-2 border border-neutral-700 hover:bg-neutral-700 transition"
          href="https://www.linkedin.com/in/sarit-sopitvetmontree/"
          target="_blank"
          rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <section id="footer" className="text-custom-text container-wide flex items-center justify-between pt-24 sm:pt-40">
      <footer className="mt-10 py-6 text-neutral-600">
        © {new Date().getFullYear()}
      </footer>
      <footer className="mt-10 py-6 text-neutral-600">
        Sarit Sopitvetmontree
      </footer>
    </section>
  )
}

export default function App() {
  return (
    <div className="min-h-dvh">
      <Header />
      <main>
        <Reveal delay={100}><Hero /></Reveal>
        <Reveal delay={200}><Work /></Reveal>
        <Reveal delay={200}><About /></Reveal>
        <Reveal delay={200}><HistoryList /></Reveal>
        <Reveal delay={200}><WhatPeopleSay /></Reveal>
        <Reveal delay={200}><Contact /></Reveal>
        <Footer />
      </main>
    </div>
  )
}
