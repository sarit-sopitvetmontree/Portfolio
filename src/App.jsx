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
        Everything (n.): Design, User needs, Constraits, Goals, Strategy, Workflow, Communication, etc.
      </h2>
      <p className="text-custom-text mt-6 3xl:mt-8 text-neutral-500">
        <span className="text-neutral-100">Languages</span>: Thai, English, Japanese, and JavaScript.<br></br>
        <span className="text-neutral-100">Design experience</span>: Healthcare, AI agents, BtoB sales, 3D printing service.<br></br>
        Check out some selected works below, or reach out anytime.
      </p>
      <div className="mt-8 3xl:mt-10 flex gap-3">
        <a href={`${import.meta.env.BASE_URL}sarit_resume.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Resume"
          className="text-custom-text text-[#FFCB2D] inline-flex items-center rounded-full px-4 py-2 border border-neutral-700 hover:bg-neutral-700 transition">
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
  title, blurb, href, tag, imageSrc,
  height = '10rem',
  featured = false,
  disabled = false,
}) {
  const hoverable = !disabled;
  const Root = disabled ? 'div' : 'a';

  return (
    <Root
      {...(!disabled && {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `${title} — ${tag} (opens in new tab)`
      })}
      // base: use the prop as usual
      style={{ '--card-h': height }}
      className={[
        "rounded-3xl border border-neutral-800 overflow-hidden transition duration-200 flex flex-col xs:flex-row",
        // resolved height = prop by default, 12rem at ≥3xl
        "[--card-h-resolved:var(--card-h)] 3xl:[--card-h-resolved:12rem] xs:h-[var(--card-h-resolved)]",
        // hoverable vs disabled styling
        hoverable ? "group hover:shadow-md hover:border-neutral-500" : "cursor-default"
      ].join(' ')}
    >
      {/* LEFT: image — mobile 20:9, ≥xs square sized by --card-h */}
      <div className="relative w-full aspect-[20/9] flex-none bg-neutral-700 xs:w-[var(--card-h-resolved)] xs:h-[var(--card-h-resolved)]">
        <img
          src={imageSrc}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover object-left"
          loading="lazy"
          decoding="async"
          sizes="(min-width: 640px) 100vw, 100vw"
        />
      </div>

      {/* RIGHT: text column */}
      <div className="relative p-5 flex-1 overflow-hidden bg-neutral-900 xs:h-[var(--card-h-resolved)] xs:flex xs:flex-col xs:justify-center">
        {/* REVEAL OVERLAY (disabled => stays closed, no hover transition) */}
        <div
          className={[
            "pointer-events-none absolute inset-y-0 left-0 hidden xs:block overflow-hidden",
            hoverable
              ? "w-0 group-hover:w-full group-focus-visible:w-full transition-[width] duration-500 ease-out [will-change:width]"
              : "w-0" // no transition, no hover width
          ].join(' ')}
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

        {/* CONTENT */}
        <div className="relative z-10">
          <div className={`text-custom-label uppercase tracking-widest ${disabled ? 'text-neutral-600' : 'text-neutral-500'}`}>{tag}</div>
          <h3 className={`text-custom-subheader mt-1 ${disabled ? 'text-neutral-500' : 'text-neutral-100'}`}>
            {title}
          </h3>
          <p className={`text-custom-text mt-1 ${disabled ? 'text-neutral-600' : 'text-neutral-500'}`}>{blurb}</p>
        </div>

        {/* Featured sparkles: visible by default; fades out on hover only if hoverable */}
        {featured && (
          <Sparkle
            className={[
              "pointer-events-none absolute top-5 right-5 w-6 h-6 text-neutral-500 opacity-100 transition-opacity duration-200",
              hoverable ? "group-hover:opacity-0 group-focus-visible:opacity-0" : ""
            ].join(' ')}
            aria-hidden="true"
          />
        )}

        {/* Presentation icon: shows on hover only if hoverable */}
        <Presentation
          className={[
            "absolute top-5 right-5 w-6 h-6 text-neutral-500 opacity-0 transition-opacity duration-200",
            hoverable ? "group-hover:opacity-100 group-focus-visible:opacity-100" : ""
          ].join(' ')}
          aria-hidden="true"
        />
      </div>
    </Root>
  );
}

const PROJECTS = [
  {
    title: 'Caretomo',
    tag: 'Healthcare',
    blurb:
      'Led the entire design process from concept to execution, and set the long-term strategy',
    href: 'https://www.papermark.com/view/cmg4r498h0003jh042d7x96vu',
    img: 'Thumbnail_Caretomo.png',
    featured: true,
  },
  {
    title: 'Orcha',
    tag: 'AI Agent',
    blurb: 'Led UX and UI design in a multi-designer team from product inception',
    href: 'https://www.papermark.com/view/cmg792gd40006gy04fdyp385m',
    img: 'Thumbnail_Orcha.png',
    featured: true,
  },
  {
    title: 'Sales Marker',
    tag: 'BtoB Sales',
    blurb: 'Ran large-scale QA to fix the redesigned UI and uncover persistent root causes',
    href: 'https://example.com/',
    img: 'Thumbnail_SM.png',
  },
  {
    title: 'DigiFab',
    tag: '3D Printing Service',
    blurb: 'Built the landing page and ordering page from scratch to launch a new business',
    href: 'https://example.com/',
    img: 'Thumbnail_DigiFab.png',
  },
];

// Build full props for ProjectCard (keeps editing simple above)
const buildProjects = (list) =>
  list.map((p) => ({
    ...p,
    href: p.href ?? withBase('sample.pdf'),
    imageSrc: withBase(p.img),
  }));

function Work() {
  const projects = buildProjects(PROJECTS);
  const disableFrom = Math.max(0, projects.length - 2);

  return (
    <section id="work" className="container-wide py-12 sm:py-20">
      <div className="flex items-end justify-between gap-6">
        <p className="text-custom-header text-neutral-500">Selected works</p>
      </div>

      <div className="mt-6 flex flex-col gap-4 3xl:gap-5">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.title}
            {...p}
            disabled={i >= disableFrom}  // ← last two are disabled
          />
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="container-wide pt-12 sm:pt-20 pb-6 sm:pb-10">
      <h2 className="text-custom-header">
        <span className="text-neutral-100">
          My journey 
        </span>
        <span className="text-custom-header text-neutral-500">
          {' '}took me from mechanical engineering to frontend development{' '} 
        <span className="text-neutral-100">
          to product design
        </span>
          , where I discovered human-centered problem-solving.
        </span>
      </h2>
      <div className="text-custom-text mt-6 text-neutral-500">
        <p>
          I love design simple, beautiful products that solve real problems, drive business results, and improve people's life. 
          Outside of work, I enjoy exploring <span></span>
          <a href="https://www.instagram.com/oil.sarit/"
          target="_blank"
          rel="noopener noreferrer" 
          className="hover:opacity-60 underline underline-offset-4 decoration-1">nature</a>
          <span></span> and immersing myself in all kinds of stories.
        </p>
      </div>
    </section>
  )
}

function HistoryList() {
  const [openId, setOpenId] = useState(null)

  const items = [
    { id: 'exp-1', year: '2024', company: 'Sales Marker', role: 'Product Designer', text: 'I joined Sales Marker as a full-time product designer, first focusing on the Sales Marker app, an AI SaaS for BtoB sales. I delivered new features and refined existing functionality. Later I was entrusted to lead design for Orcha, a newly developed AI agent that supports business tasks. The expanded responsibilities were challenging and taught me a great deal, including task and people management.' },
    { id: 'exp-2', year: '2024', company: 'SIND', role: 'Lead Product Designer', text: 'I joined SIND as founding product designer to build Caretomo, an AI assistant for hospital nurses. I led the end-to-end design process, from concepts and competitive research to high-fidelity prototypes, and defined the long-term design strategy, owning every detail as the sole designer. The hardest part was understanding clinical workflows, yet the challenge was energizing.' },
    { id: 'exp-3', year: '2023', company: 'QunaSys', role: 'UX Engineer', text: 'I joined QunaSys as a UX Engineer, a role that covers both design and frontend development. QunaSys operates in the unique field of quantum computing applications. I contributed to product design and developed frontend features for several client projects. Along the way, I learned about frontend technologies and, significantly improved my Japanese communication skills.' },
    { id: 'exp-4', year: '2023', company: 'Digitech Fabrication', role: 'Product Designer', text: 'I supported Digitech Fabrication in its early stage as a product designer for its 3D printing service, helping shape product strategy from day one and building my first design system. I designed the marketing landing page and the ordering flow that lets customers request 3D-printed parts.' },
    { id: 'exp-5', year: '2023', company: 'Liigo', role: 'Frontend Engineer', text: 'I began a front-end developer internship at Liigo Inc. after self-learning frontend development. I helped build and maintain the Area Compass application, a digital transformation app for Japanese travel industry. Working with talented colleagues, I deepened my front-end skills and learned how to operate effectively within a development team.' },
    { id: 'exp-6', year: '2022', company: 'The University of Tokyo', role: 'Graduate Student', text: 'I entered my master’s degree in the field of Aerospace Engineering. With talented people around me, I learned a lot in materials science and did collaborative research with JAXA on 3D printing of aluminum alloy, which was truly exciting for me. Until I learned a hard truth: I really love studying engineering, but I cannot say the same for working in it. This realization led me to the path of being a designer.' },
    { id: 'exp-7', year: '2017', company: 'Chulalongkorn University', role: 'Student', text: 'I started my bachelor’s degree in Mechanical Engineering. I learned about mechanical systems and the physics behind them, and gained an introduction to programming. Through these studies, human intelligence fills me with awe. We take the knowledge we gain and, by combining it with our wildest imagination, design and create things that truly change the world and make our lives better.' },
  ]

  const toggle = (id) => {
    setOpenId(prev => (prev === id ? null : id))
  }

  return (
    <section id="historylist" className="text-custom-text container-wide pb-12 sm:pb-20">
      <div className="mt-6 border-y border-neutral-800 divide-y divide-neutral-800">
        {items.map((item) => {
          const isOpen = openId === item.id
          return (
            <div key={item.id}>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="cursor-pointer group w-full py-4 grid grid-cols-[1fr_1.5rem] sm:grid-cols-[3rem_1fr_1.5rem] items-start gap-2 sm:gap-4 text-left"
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

                {/* Plus that rotates to a cross; follows row hover */}
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
                className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr] mb-4' : 'grid-rows-[0fr]'} text-neutral-500`}
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
      <h2 className="text-custom-header text-neutral-500">Endorsements</h2>
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
          Saritさんはプロダクトのクオリティを重視しながら、スピードが求められる環境でも根気強くデザインに取り組むことができます。Saritさんは、エンジニアとしての知識を背景に持ちながら、人間中心設計を実践できる稀有なハイブリッド型のデザイナーです。特に、ユーザ視点から一歩引いて考え、ステークホルダーにUXの観点を的確に伝える姿勢によって、関係者に新しい視点や刺激をもたらしてくれます。UIからUX、さらにはデザインの改善作業まで関わることができ、即戦力として開発とデザインを推進できる貴重な人材です。
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
          Sarit is an engineer turned UX designer with a systematic, scientific approach and strong ownership of his work. He bridges developers and users with clear communication, leads production smoothly, and constantly adapts. Beyond design, he is exceptionally helpful, reliable, and a great person to work with.
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
        <p className="text-custom-textjapanese pt-1 sm:pt-2">
          私はフロントエンドエンジニアとしてSaritさんと一緒に業務を行いました。SaritさんはWebアプリケーションのデザインや、Reactをはじめとするフロントエンド技術に精通し、日本語でのコミュニケーションも非常に円滑な方でした。また、得意とされるデザイン面の調整に加えて、インフラ構築などフロントエンド以外の領域も自力でやり切る力があります。
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
          Our company produces custom engineering parts in Thailand, where an effective ordering interface is vital. Mr. Sarit’s design is both functional and intuitive. Customers positively noted our platform’s ease of use and aesthetics compared to competitors, significantly strengthen our market competitiveness.
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
          Contact me
        </span>
        <span className="text-neutral-500">
          , anytime
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
