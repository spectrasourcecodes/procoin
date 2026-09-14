import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaShieldAlt,
  FaChartLine,
  FaBolt,
  FaEye,
  FaHeadset,
  FaMicrochip,
  FaRocket,
  FaCar,
  FaRobot,
  FaBatteryFull,
  FaChargingStation,
  FaBars,
  FaTimes,
  FaGift,
  FaTrophy,
  FaCarSide,
} from 'react-icons/fa';
import GoogleTranslate from '../components/GoogleTranslate';
import {
  SITE_NAME,
  ADMIN_EMAIL,
  ADMIN_WHATSAPP,
  ADMIN_TELEGRAM,
  mockInvestmentPlans,
} from '../data/mockData';
import LoadingScreen from '../components/LoadingScreen';
import AnimatedCounter from '../components/AnimatedCounter';

const Preloader = () => <LoadingScreen />;

/* ------------------------------------------------------------------ */
/*  Tesla-related imagery                                              */
/*  NOTE: Replace these URLs with assets you own or that are properly  */
/*  licensed for your use. The links below are placeholders only.      */
/* ------------------------------------------------------------------ */
const IMAGES = {
  heroVehicle:
    'images/Teslacar.jfif',
  cybertruck:
    'images/Cybertruck.jfif',
  charging:
    'images/Electric Vehicles.jfif',
  robotics:
    'images/Supercharging.jfif',
  elonMusk:
    'images/ElonMusk2.jfif',
  giftcar:
    'images/Teslacar2.jfif'
};

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Tesla', href: '#about' },
  { label: 'Investment Plans', href: '#plans' },
  { label: 'Tesla Market', to: '/market' },
  { label: 'Technology', href: '#technology' },
  { label: 'FAQ', to: '/faq' },
];

/* ------------------------------------------------------------------ */
/*  Top utility bar                                                    */
/* ------------------------------------------------------------------ */
const Header = () => (
  <div className="bg-slate-800 py-2">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center">
            <i className="fas fa-envelope text-blue-400 mr-2"></i>
            <a
              href={`mailto:${ADMIN_EMAIL}`}
              className="text-slate-300 hover:text-white transition"
            >
              {ADMIN_EMAIL}
            </a>
          </div>
          <div className="flex items-center">
            <i className="fab fa-telegram text-blue-400 mr-2"></i>
            <span className="text-slate-300">24/7 Support</span>
          </div>
        </div>
        <GoogleTranslate />
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */
const NavbarHome = () => {
  const [open, setOpen] = useState(false);

  const linkClasses = 'text-slate-300 hover:text-white transition';

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm py-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
            <h1 className="text-2xl font-bold gradient-text">{SITE_NAME}</h1>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((item) =>
              item.to ? (
                <Link key={item.label} to={item.to} className={linkClasses}>
                  {item.label}
                </Link>
              ) : (
                <a key={item.label} href={item.href} className={linkClasses}>
                  {item.label}
                </a>
              )
            )}
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 rounded-lg gradient-bg text-white font-medium hover:opacity-90 transition"
            >
              Open Account
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-white lg:hidden"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((item) =>
                item.to ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition"
                  >
                    {item.label}
                  </a>
                )
              )}
              <div className="mt-3 flex flex-col gap-2">
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-slate-700 px-4 py-2 text-center text-sm font-medium text-white"
                >
                  Dashboard
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-lg gradient-bg px-4 py-2 text-center text-sm font-semibold text-white"
                >
                  Open Account
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
const teslaThemes = [
  { name: 'Tesla (TSLA)', meta: 'NASDAQ · Equity', status: 'Listed' },
  { name: 'Electric Vehicles', meta: 'EV & Mobility', status: 'Theme' },
  { name: 'Energy & Storage', meta: 'Solar · Batteries', status: 'Theme' },
  { name: 'AI & Robotics', meta: 'Autonomy · Optimus', status: 'Theme' },
];

const Hero = () => (
  <section id="home" className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800 opacity-95"></div>

    {/* Background visual */}
    <div className="absolute inset-0">
      <img
        src={IMAGES.heroVehicle}
        alt="Modern electric vehicle"
        className="h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/85 to-slate-900/40" />
    </div>

    <div className="relative z-10 container mx-auto px-4 pt-20 pb-24 lg:pt-28 lg:pb-32">
      <div className="flex flex-col items-center gap-14 lg:flex-row">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2"
        >
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Invest in the Future of{' '}
            <span className="gradient-text">Mobility</span>
          </h1>

          <p className="mb-8 max-w-2xl text-lg text-slate-300">
            Explore investment opportunities centred around Tesla-inspired innovation —
            electric mobility, clean energy, battery technology, artificial intelligence
            and robotics.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/register"
              className="rounded-lg gradient-bg px-8 py-4 text-base font-bold text-white transition transform hover:scale-105 hover:opacity-90 md:text-lg"
            >
              Start Investing
            </Link>
            <Link
              to="/plans"
              className="rounded-lg bg-slate-700 px-8 py-4 text-base font-bold text-white transition transform hover:scale-105 hover:bg-slate-600 md:text-lg"
            >
              Explore Investment Plans
            </Link>
          </div>

          <p className="mt-6 max-w-lg text-xs leading-relaxed text-slate-500">
            All investing involves risk. Plan figures shown on this platform are
            illustrative parameters — not guarantees and not Tesla stock performance.
          </p>
        </motion.div>

        {/* Tesla market card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex w-full justify-center lg:w-1/2 lg:justify-end"
        >
          <div className="w-full max-w-md rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-1 backdrop-blur-sm glow-effect">
            <div className="rounded-xl bg-slate-800/90 p-6">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Tesla Investment Themes
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Demo data · not real-time market prices
                  </p>
                </div>
                <span className="rounded-md bg-blue-500/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400">
                  Demo
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {teslaThemes.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + index * 0.08 }}
                    className="rounded-xl border border-slate-700 bg-slate-700/60 p-3 transition hover:border-blue-500/50"
                  >
                    <div className="text-[11px] text-slate-400">{item.meta}</div>
                    <div className="mt-1 text-sm font-semibold text-white">
                      {item.name}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-wider text-blue-400">
                      {item.status}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 rounded-xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-5 text-center">
                <div className="text-3xl font-bold text-white">
                  <AnimatedCounter end={5} />
                </div>
                <div className="mt-1 text-sm text-slate-400">
                  Core Technology Themes
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  EV · Energy · AI · Robotics · Charging
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Tesla Rewards Programme (second section)                           */
/* ------------------------------------------------------------------ */
const rewardTiers = [
  {
    icon: FaCarSide,
    title: 'Discounted Tesla Vehicles',
    description:
      'Eligible investors can redeem programme credits toward preferred pricing on selected electric vehicles.',
    points: [
      'Pay with account balance or supported crypto',
      'Preferred programme pricing on selected models',
      'Unlock higher tiers as your portfolio grows',
    ],
  },
  {
    icon: FaGift,
    title: 'Win Tesla Products',
    description:
      'Active investors are automatically entered into periodic reward draws for Tesla-branded products.',
    points: [
      'Model 3, Model Y and Cybertruck reward draws',
      'Optimus and Powerwall themed prizes',
      'Entry tied to eligible plan participation',
    ],
  },
  {
    icon: FaRobot,
    title: 'Self-Driving & Autonomy Rewards',
    description:
      'Autonomy-themed reward tiers for investors focused on AI, robotics and self-driving technology.',
    points: [
      'FSD-style software reward credits',
      'Robotics and autonomy product rewards',
      'Priority access to new programme tiers',
    ],
  },
];

const prizeChips = [
  'Model 3',
  'Model Y',
  'Cybertruck',
  'FSD Software',
  'Optimus Robot',
  'Powerwall',
];

const TeslaRewards = () => (
  <section id="rewards" className="py-20">
    <div className="container mx-auto px-4">
      <div className="mb-16 text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-blue-400">
          Tesla Rewards Programme
        </span>
        <h2 className="mt-4 mb-6 text-3xl font-bold md:text-4xl">
          Invest Today. <span className="gradient-text">Drive Tomorrow.</span>
        </h2>
        <p className="mx-auto max-w-2xl text-slate-400">
          A platform rewards programme that lets eligible investors redeem
          programme credits toward discounted electric vehicles, enter reward
          draws for Tesla-branded products, and access autonomy-themed tiers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Vehicle visual */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl bg-slate-800 card-gradient card-hover lg:col-span-2"
        >
          <img
            src={IMAGES.giftcar}
            alt="Electric vehicle reward"
            className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105 lg:h-full"
          />
        </motion.div>

        {/* Reward tiers */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          {rewardTiers.map((tier, index) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-4 rounded-2xl bg-slate-800 p-6 card-gradient card-hover md:gap-6"
            >
              <div className="feature-icon mb-0 flex-none">
                <tier.icon className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-white">
                  {tier.title}
                </h3>
                <p className="mb-3 text-sm text-slate-400">
                  {tier.description}
                </p>
                <ul className="space-y-1.5 text-sm text-slate-400">
                  {tier.points.map((point) => (
                    <li key={point} className="flex items-start">
                      <i className="fas fa-check-circle mr-2 mt-0.5 text-blue-500"></i>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Prize chips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-12 flex flex-wrap justify-center gap-3"
      >
        {prizeChips.map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-slate-700 bg-slate-800/70 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-500/50 hover:text-white"
          >
            {chip}
          </span>
        ))}
      </motion.div>

      {/* CTA + disclaimer */}
      <div className="mt-12 text-center">
        <Link
          to="/plans"
          className="inline-flex items-center gap-2 rounded-lg gradient-bg px-8 py-4 font-bold text-white transition transform hover:scale-105 hover:opacity-90"
        >
          <FaTrophy className="text-sm" />
          View Eligible Plans
        </Link>

        <p className="mx-auto mt-8 max-w-3xl text-xs leading-relaxed text-slate-500">
          Rewards programme participation is subject to eligibility requirements and
          programme terms. Vehicle redemption, discount levels and prize
          availability vary by region and plan tier. This programme is not
          affiliated with, endorsed by, or sponsored by Tesla, Inc. Tesla product
          names are used for identification purposes only, and all draws are
          administered by the platform.
        </p>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Market ticker (TradingView) — Tesla & EV ecosystem                 */
/* ------------------------------------------------------------------ */
const TradingWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: 'NASDAQ:TSLA', title: 'Tesla' },
        { proName: 'NASDAQ:RIVN', title: 'Rivian' },
        { proName: 'NASDAQ:LCID', title: 'Lucid' },
        { proName: 'NASDAQ:NIO', title: 'NIO' },
        { proName: 'NASDAQ:ENPH', title: 'Enphase Energy' },
        { proName: 'NASDAQ:PLUG', title: 'Plug Power' },
      ],
      colorTheme: 'dark',
      isTransparent: false,
      displayMode: 'adaptive',
      locale: 'en',
    });
    document.getElementById('tradingview-widget')?.appendChild(script);
  }, []);

  return (
    <div className="container mx-auto px-4 -mt-20 relative z-10">
      <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div id="tradingview-widget"></div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Stats                                                              */
/* ------------------------------------------------------------------ */
const Stats = () => {
  const stats = [
    { value: 18400, label: 'Active Investors', suffix: '+' },
    { value: 12, label: 'Investment Plans', suffix: '' },
    { value: 42, label: 'Supported Technologies', suffix: '+' },
    { value: 96, label: 'Countries Served', suffix: '+' },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-2 text-4xl font-bold text-blue-500 md:text-5xl">
                <AnimatedCounter
                  end={stat.value}
                  prefix={stat.prefix || ''}
                  suffix={stat.suffix || ''}
                />
              </div>
              <div className="text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-slate-500">
          Platform metrics shown for demonstration purposes.
        </p>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Features / About                                                   */
/* ------------------------------------------------------------------ */
const Features = () => {
  const features = [
    {
      icon: FaRocket,
      title: 'Tesla-Focused Opportunities',
      description:
        'Investment themes centred around electric vehicles, clean energy, AI and robotics.',
      points: ['EV & mobility themes', 'Clean energy & storage', 'AI and automation'],
    },
    {
      icon: FaShieldAlt,
      title: 'Secure Investment Experience',
      description:
        'Account security and transparent portfolio information at every step.',
      points: ['Encrypted account access', 'Transparent portfolio view', 'Verified withdrawals'],
    },
    {
      icon: FaChartLine,
      title: 'Flexible Investment Plans',
      description:
        'Multiple platform plans designed around different horizons and budgets.',
      points: ['Multiple plan tiers', 'Clear plan parameters', 'Low entry minimums'],
    },
    {
      icon: FaMicrochip,
      title: 'Global Technology Focus',
      description:
        'Built around electric mobility, energy storage, charging infrastructure and automation.',
      points: ['Charging infrastructure', 'Battery technology', 'Autonomous systems'],
    },
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-blue-400">
            About Tesla Investing
          </span>
          <h2 className="mt-4 mb-6 text-3xl font-bold md:text-4xl">
            A Tesla-Inspired Investment Platform
          </h2>
          <p className="mx-auto max-w-2xl text-slate-400">
            We bring the themes shaping modern technology — electric mobility, clean
            energy and automation — into a clean, transparent investment experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-800 rounded-2xl p-8 card-gradient card-hover"
            >
              <div className="feature-icon">
                <feature.icon className="text-2xl text-white" />
              </div>
              <h3 className="mb-4 text-xl font-bold">{feature.title}</h3>
              <p className="mb-4 text-slate-400">{feature.description}</p>
              <ul className="space-y-2 text-slate-400">
                {feature.points.map((point) => (
                  <li key={point} className="flex items-center">
                    <i className="fas fa-check-circle text-blue-500 mr-2"></i>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Technology / Building the Future (Elon Musk + Tesla ecosystem)     */
/* ------------------------------------------------------------------ */
const pillars = [
  { icon: FaCar, title: 'Electric Vehicles' },
  { icon: FaBatteryFull, title: 'Battery Technology' },
  { icon: FaBolt, title: 'Energy Storage' },
  { icon: FaChargingStation, title: 'Charging Infrastructure' },
  { icon: FaMicrochip, title: 'Artificial Intelligence' },
  { icon: FaRobot, title: 'Robotics' },
];

const productCards = [
  { src: IMAGES.heroVehicle, label: 'Electric Vehicles', caption: 'Modern EV platforms' },
  { src: IMAGES.cybertruck, label: 'Cybertruck', caption: 'Next-generation design' },
  { src: IMAGES.charging, label: 'Supercharging', caption: 'Charging infrastructure' },
];

const TeslaInnovation = () => (
  <section id="technology" className="bg-slate-900 py-24">
    <div className="container mx-auto px-4">
      <div className="mb-16 text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-blue-400">
          Technology
        </span>
        <h2 className="mt-4 mb-6 text-3xl font-bold md:text-4xl">
          Building the Future
        </h2>
        <p className="mx-auto max-w-3xl text-slate-400">
          The Tesla ecosystem reaches far beyond cars — electric vehicles, battery
          technology, energy storage, charging infrastructure, artificial intelligence,
          robotics and autonomous systems. These are the themes our investment platform
          is built around.
        </p>
      </div>

      {/* Elon Musk + pillars */}
      <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl bg-slate-800 lg:col-span-2"
        >
          <img
            src={IMAGES.elonMusk}
            alt="Industry and technology figure"
            className="h-72 w-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="p-6">
            <h3 className="mb-2 text-xl font-bold text-white">Elon Musk</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Featured here as an industry and technology figure whose companies have
              shaped electric mobility, energy and automation.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="lg:col-span-3"
        >
          <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="flex items-center gap-4 rounded-2xl bg-slate-800/70 p-5 card-gradient card-hover"
              >
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                  <pillar.icon className="text-white" />
                </div>
                <span className="text-sm font-semibold text-white">
                  {pillar.title}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Small product / infrastructure cards */}
      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {productCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group overflow-hidden rounded-2xl bg-slate-800 card-gradient card-hover"
          >
            <div className="overflow-hidden">
              <img
                src={card.src}
                alt={card.label}
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h4 className="text-sm font-bold text-white">{card.label}</h4>
              <p className="mt-1 text-xs text-slate-400">{card.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-slate-500">
        Elon Musk is presented here purely as an industry and technology figure. He does
        not operate, endorse, manage or guarantee this investment platform.
      </p>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Investment Plans                                                   */
/* ------------------------------------------------------------------ */
const InvestmentPlans = () => (
  <section id="plans" className="py-20 bg-slate-900">
    <div className="container mx-auto px-4">
      <div className="mb-16 text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-blue-400">
          Investment Plans
        </span>
        <h2 className="mt-4 mb-6 text-3xl font-bold md:text-4xl">
          Tesla-Themed Investment Plans
        </h2>
        <p className="mx-auto max-w-2xl text-slate-400">
          Choose the plan that matches your investment horizon. All figures below are
          platform plan parameters — they are not Tesla stock returns and are not
          guaranteed.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockInvestmentPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`bg-gradient-to-br ${plan.bgClass} from-slate-800 to-slate-900 rounded-2xl overflow-hidden border ${plan.borderClass} hover:scale-105 transition-all duration-300`}
          >
            <div className="p-6">
              <div className="mb-6 text-center">
                <h3 className={`text-xl font-bold ${plan.colorClass} mb-2`}>
                  {plan.name}
                </h3>
                <div className="mb-1 text-3xl font-bold text-white">
                  ${plan.minAmount.toLocaleString()}
                </div>
                <div className="text-sm text-slate-400">Min. Investment</div>
              </div>

              <ul className="mb-8 space-y-3">
                <li className="flex justify-between">
                  <span className="text-slate-400">Duration</span>
                  <span className="font-semibold text-white">
                    {plan.duration} days
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-400">Plan ROI</span>
                  <span className="font-semibold text-white">{plan.roi}%</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-400">Bonus</span>
                  <span className="font-semibold text-white">{plan.bonus}%</span>
                </li>
              </ul>

              <Link
                to="/register"
                className="block w-full rounded-lg gradient-bg py-3 text-center font-bold text-white transition hover:opacity-90"
              >
                Invest Now
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-slate-500">
        ROI and bonus values are platform investment-plan parameters shown for
        illustration only. They are not guaranteed and do not represent Tesla stock
        performance.
      </p>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Hypothetical Return Structures (NEW)                               */
/* ------------------------------------------------------------------ */
const returnOptions = [
  {
    rate: '15%',
    title: 'Fund Performance Returns',
    description:
      "Investor contributes money and receives a return based on the fund's performance.",
    image: IMAGES.charging,
    alt: 'Charging infrastructure',
    tag: 'Fund Model',
  },
  {
    rate: '8%',
    title: 'Tesla Vehicle Redemption',
    description:
      'Money is invested for a set period, then the accumulated amount can be used toward purchasing a Tesla.',
    image: IMAGES.heroVehicle,
    alt: 'Tesla electric vehicle',
    tag: 'Vehicle Model',
  },
  {
    rate: '12%',
    title: 'Tesla Location Profit Share',
    description:
      'Investor contributes toward a hypothetical Tesla location and receives a share of its profits.',
    image: IMAGES.cybertruck,
    alt: 'Tesla Cybertruck',
    tag: 'Location Model',
  },
];

const HypotheticalReturns = () => (
  <section id="returns" className="py-20">
    <div className="container mx-auto px-4">
      <div className="mb-16 text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-blue-400">
          Hypothetical Return
        </span>
        <h2 className="mt-4 mb-6 text-3xl font-bold md:text-4xl">
          Illustrative Daily Return Structures
        </h2>
        <p className="mx-auto max-w-2xl text-slate-400">
          The structures below illustrate how different contribution models could
          work. Each rate is a hypothetical daily figure shown for illustration
          only — not a real financial product.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {returnOptions.map((option, index) => (
          <motion.div
            key={option.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group overflow-hidden rounded-2xl bg-slate-800 card-gradient card-hover"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={option.image}
                alt={option.alt}
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
              <span className="absolute left-4 top-4 rounded-md bg-slate-900/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400 backdrop-blur">
                {option.tag}
              </span>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-4xl font-bold gradient-text">
                  {option.rate}
                </span>
                <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  daily
                </span>
              </div>
              <h3 className="mb-3 text-lg font-bold text-white">
                {option.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {option.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-slate-500">
        All percentage figures are hypothetical daily return illustrations only. They
        are not guaranteed, not typical, and do not represent Tesla stock performance,
        real estate performance, or any real financial product. Actual investment
        outcomes will vary and may result in loss of principal.
      </p>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */
const Services = () => {
  const services = [
    {
      icon: FaCar,
      title: 'Tesla & EV Opportunities',
      description: 'Investment themes built around electric vehicles and modern mobility.',
    },
    {
      icon: FaBolt,
      title: 'Clean Energy',
      description: 'Solar, energy generation and sustainable power themes.',
    },
    {
      icon: FaBatteryFull,
      title: 'Battery Technology',
      description: 'Energy storage and next-generation battery innovation.',
    },
    {
      icon: FaMicrochip,
      title: 'AI & Automation',
      description: 'Artificial intelligence and automated systems.',
    },
    {
      icon: FaRobot,
      title: 'Robotics',
      description: 'Robotics and autonomous technology themes.',
    },
    {
      icon: FaChargingStation,
      title: 'Supercharging Infrastructure',
      description: 'EV charging networks and supporting infrastructure.',
    },
    {
      icon: FaEye,
      title: 'Portfolio Monitoring',
      description: 'Transparent, real-time visibility of your portfolio.',
    },
    {
      icon: FaHeadset,
      title: '24/7 Support',
      description: 'Multi-channel customer support whenever you need it.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-blue-400">
            Our Services
          </span>
          <h2 className="mt-4 mb-6 text-3xl font-bold md:text-4xl">
            Technology-Focused Investment Solutions
          </h2>
          <p className="mx-auto max-w-2xl text-slate-400">
            Explore the technology themes and platform services available to investors.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="bg-slate-800 rounded-2xl p-6 card-gradient card-hover"
            >
              <service.icon className="mb-4 text-3xl text-blue-500" />
              <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
              <p className="text-slate-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  CTA                                                                */
/* ------------------------------------------------------------------ */
const CTA = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-10 text-center backdrop-blur-sm md:p-16"
      >
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">
          Ready to Invest in the Future?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-slate-300">
          Explore the available investment plans and technology themes. No profit
          promises — just clear plan parameters and full transparency.
        </p>
        <Link
          to="/register"
          className="inline-block rounded-lg gradient-bg px-8 py-4 text-base font-bold text-white transition transform hover:scale-105 hover:opacity-90 md:text-lg"
        >
          Create Investment Account
        </Link>
      </motion.div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
const Footer = () => (
  <footer className="bg-slate-900 pt-20 pb-10 border-t border-slate-800">
    <div className="container mx-auto px-4">
      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <h2 className="mb-4 text-xl font-bold gradient-text">{SITE_NAME}</h2>
          <p className="mb-6 text-sm leading-relaxed text-slate-400">
            A technology-focused investment platform built around Tesla-inspired themes:
            electric mobility, clean energy, battery technology, AI and robotics.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-slate-400 hover:text-blue-500 transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-500 transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-500 transition">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-500 transition">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-6 text-lg font-bold text-white">Contact</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <i className="fas fa-phone mt-1 mr-3 text-blue-500"></i>
              <span className="text-slate-400">+{ADMIN_WHATSAPP}</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-envelope mt-1 mr-3 text-blue-500"></i>
              <span className="text-slate-400">{ADMIN_EMAIL}</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-map-marker-alt mt-1 mr-3 text-blue-500"></i>
              <span className="text-slate-400">United Kingdom</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-lg font-bold text-white">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <a href="#about" className="text-slate-400 hover:text-blue-500 transition">
                About
              </a>
            </li>
            <li>
              <a href="#plans" className="text-slate-400 hover:text-blue-500 transition">
                Investment Plans
              </a>
            </li>
            <li>
              <Link to="/market" className="text-slate-400 hover:text-blue-500 transition">
                Market
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="text-slate-400 hover:text-blue-500 transition"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/deposit"
                className="text-slate-400 hover:text-blue-500 transition"
              >
                Deposit
              </Link>
            </li>
            <li>
              <Link
                to="/withdraw"
                className="text-slate-400 hover:text-blue-500 transition"
              >
                Withdraw
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-lg font-bold text-white">Support</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/support" className="text-slate-400 hover:text-blue-500 transition">
                Contact Support
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-slate-400 hover:text-blue-500 transition">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-slate-400 hover:text-blue-500 transition">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-slate-400 hover:text-blue-500 transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-10 text-center">
        <p className="text-sm text-slate-500">
          © 2024 {SITE_NAME}. All Rights Reserved
        </p>
        <p className="mx-auto mt-3 max-w-3xl text-xs leading-relaxed text-slate-500">
          This platform is not affiliated with, endorsed by, or operated by Tesla, Inc.
          or Elon Musk. All investing involves risk, including possible loss of
          principal.
        </p>
      </div>
    </div>
  </footer>
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Preloader />;

  return (
    <div className="min-h-screen">
      <Header />
      <NavbarHome />
      <Hero />
      <TeslaRewards />
      <TradingWidget />
      <Stats />
      <Features />
      <TeslaInnovation />
      <InvestmentPlans />
      <HypotheticalReturns />
      <Services />
      <CTA />
      <Footer />
    </div>
  );
}

export default Home;s