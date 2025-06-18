
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import { 
  Zap, 
  Users, 
  Shield, 
  Rocket, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Globe, 
  Coins, 
  TrendingUp,
  Menu,
  X
} from 'lucide-react';

const FloatingIcon = ({ icon: Icon, className = "", delay = 0 }) => (
  <motion.div
    className={`absolute text-yellow-400/20 ${className}`}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  >
    <Icon size={24} />
  </motion.div>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 glass-effect"
      style={{ opacity: headerOpacity }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold gradient-text">ZyloHub</span>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {['How it Works', 'Features', 'Trust', 'Waitlist'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button 
              className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold"
              onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}
            >
              Join Waitlist
            </Button>
          </motion.div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            className="md:hidden mt-4 pb-4 border-t border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav className="flex flex-col space-y-4 mt-4">
              {['How it Works', 'Features', 'Trust', 'Waitlist'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Button 
                className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold w-full"
                onClick={() => {
                  setIsMenuOpen(false);
                  document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Join Waitlist
              </Button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      <div className="absolute inset-0 hero-gradient"></div>
      
      <FloatingIcon icon={Zap} className="top-20 left-10" delay={0} />
      <FloatingIcon icon={Globe} className="top-32 right-20" delay={1} />
      <FloatingIcon icon={Coins} className="bottom-32 left-20" delay={2} />
      <FloatingIcon icon={TrendingUp} className="bottom-20 right-10" delay={3} />

      <motion.div 
        className="container mx-auto px-4 text-center relative z-10"
        style={{ y }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The Future of{' '}
            <span className="gradient-text">Gig Work</span>{' '}
            is Here
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            ZyloHub connects talented <span className="text-yellow-400 font-semibold">Seekers</span> with 
            innovative <span className="text-yellow-400 font-semibold">Hosters</span> in a revolutionary Web3 ecosystem
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold text-lg px-8 py-4 pulse-glow"
              onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}
            >
              Join the Waitlist <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold text-lg px-8 py-4"
              onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { icon: Users, title: "10K+", subtitle: "Early Adopters" },
              { icon: Zap, title: "Web3", subtitle: "Powered Platform" },
              { icon: Shield, title: "100%", subtitle: "Secure & Trusted" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="glass-card p-6 rounded-xl text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <stat.icon className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-2xl font-bold gradient-text">{stat.title}</div>
                <div className="text-gray-400">{stat.subtitle}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      icon: Users,
      title: "Join as Seeker or Hoster",
      description: "Sign up and choose your role - find gigs or post opportunities"
    },
    {
      icon: Zap,
      title: "Smart Matching",
      description: "Our AI-powered system connects the perfect matches instantly"
    },
    {
      icon: Coins,
      title: "Secure Payments",
      description: "Web3-enabled smart contracts ensure safe, instant transactions"
    },
    {
      icon: Star,
      title: "Build Reputation",
      description: "Earn ratings and build your decentralized professional profile"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 section-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="gradient-text">ZyloHub</span> Works
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the seamless future of gig work with our revolutionary platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="glass-card p-8 rounded-xl text-center relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <step.icon className="w-12 h-12 text-yellow-400 mx-auto mb-4 mt-4" />
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Your data and transactions are protected by cutting-edge blockchain technology"
    },
    {
      icon: Zap,
      title: "Instant Matching",
      description: "AI-powered algorithms connect you with perfect opportunities in seconds"
    },
    {
      icon: Coins,
      title: "Crypto Payments",
      description: "Get paid instantly in cryptocurrency with zero transaction fees"
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Access opportunities worldwide with our decentralized platform"
    },
    {
      icon: TrendingUp,
      title: "Growth Analytics",
      description: "Track your performance and optimize your earning potential"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join a thriving community of professionals and innovators"
    }
  ];

  return (
    <section id="features" className="py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to succeed in the future of work
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card p-8 rounded-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <feature.icon className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Trust = () => {
  const trustPoints = [
    "End-to-end encryption for all communications",
    "Smart contract-based payment protection",
    "Decentralized identity verification",
    "24/7 community-driven support",
    "Transparent fee structure",
    "GDPR compliant data handling"
  ];

  return (
    <section id="trust" className="py-20 section-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built on <span className="gradient-text">Trust</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Your security and privacy are our top priorities. ZyloHub leverages blockchain technology 
              to create a transparent, secure, and trustworthy platform for all users.
            </p>
            
            <div className="space-y-4">
              {trustPoints.map((point, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                  <span className="text-gray-300">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-8 rounded-xl">
              <img  
                className="w-full h-64 object-cover rounded-lg mb-6" 
                alt="Secure blockchain network visualization"
               src="https://images.unsplash.com/photo-1667371927761-8fa90f33a248" />
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
                <div className="text-gray-400">Platform Uptime</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !userType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to join the waitlist.",
        variant: "destructive"
      });
      return;
    }

    // Store in localStorage for now
    const waitlistData = JSON.parse(localStorage.getItem('zylohub-waitlist') || '[]');
    waitlistData.push({
      email,
      userType,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('zylohub-waitlist', JSON.stringify(waitlistData));

    toast({
      title: "Welcome to ZyloHub! 🎉",
      description: "You've successfully joined our waitlist. We'll notify you when we launch!"
    });

    setEmail('');
    setUserType('');
  };

  return (
    <section id="waitlist" className="py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the <span className="gradient-text">Revolution</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Be among the first to experience the future of gig work. Join our exclusive waitlist today!
          </p>

          <motion.form
            onSubmit={handleSubmit}
            className="glass-card p-8 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setUserType('seeker')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    userType === 'seeker'
                      ? 'border-yellow-400 bg-yellow-400/10'
                      : 'border-gray-600 hover:border-yellow-400/50'
                  }`}
                >
                  <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="font-semibold">I'm a Seeker</div>
                  <div className="text-sm text-gray-400">Looking for gigs</div>
                </button>

                <button
                  type="button"
                  onClick={() => setUserType('hoster')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    userType === 'hoster'
                      ? 'border-yellow-400 bg-yellow-400/10'
                      : 'border-gray-600 hover:border-yellow-400/50'
                  }`}
                >
                  <Rocket className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="font-semibold">I'm a Hoster</div>
                  <div className="text-sm text-gray-400">Posting opportunities</div>
                </button>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-bold text-lg py-4 pulse-glow"
              >
                Join the Waitlist <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </motion.form>

          <motion.p
            className="text-gray-400 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join <span className="text-yellow-400 font-semibold">10,000+</span> early adopters already on the waitlist
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold gradient-text">ZyloHub</span>
            </div>
            <p className="text-gray-400">
              Revolutionizing the future of gig work through Web3 technology.
            </p>
          </div>

          <div>
            <span className="font-semibold text-white mb-4 block">Platform</span>
            <div className="space-y-2">
              <p className="text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors">For Seekers</p>
              <p className="text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors">For Hosters</p>
              <p className="text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors">Pricing</p>
            </div>
          </div>

          <div>
            <span className="font-semibold text-white mb-4 block">Company</span>
            <div className="space-y-2">
              <p className="text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors">About</p>
              <p className="text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors">Blog</p>
              <p className="text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors">Careers</p>
            </div>
          </div>

          <div>
            <span className="font-semibold text-white mb-4 block">Support</span>
            <div className="space-y-2">
              <p className="text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors">Help Center</p>
              <p className="text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors">Privacy Policy</p>
              <p className="text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors">Terms of Service</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
           Copyright © 2025 ZyloHub. All rights reserved. 
          </p>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      <Trust />
      <Waitlist />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
