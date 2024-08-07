import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info, Paw, Star, ArrowRight, Moon, Sun, Gift } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [catName, setCatName] = useState("");
  const [showNameDialog, setShowNameDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedName = localStorage.getItem("catName");
    if (savedName) {
      setCatName(savedName);
    } else {
      setShowNameDialog(true);
    }
  }, []);

  const catFacts = [
    "Cats sleep for 70% of their lives",
    "A group of cats is called a clowder",
    "Cats have over 20 vocalizations",
    "The first cat in space was French",
    "Cats can jump up to 6 times their length",
    "Cats can rotate their ears 180 degrees",
    "A cat's nose print is unique, like a human's fingerprint",
    "Cats can't taste sweetness",
  ];

  const catImages = [
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    toast({
      title: isDarkMode ? "Light Mode Activated" : "Dark Mode Activated",
      description: "Your eyes will thank you later!",
    });
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (catName.trim()) {
      localStorage.setItem("catName", catName);
      setShowNameDialog(false);
      toast({
        title: "Welcome!",
        description: `Nice to meet you, ${catName}!`,
      });
    }
  };

  const generateRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * catFacts.length);
    toast({
      title: "Random Cat Fact",
      description: catFacts[randomIndex],
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-purple-200 to-pink-200'}`}>
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={generateRandomFact}>
          <Gift className="h-4 w-4" />
        </Button>
        <Switch
          checked={isDarkMode}
          onCheckedChange={toggleDarkMode}
          className="data-[state=checked]:bg-purple-600"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Switch>
      </div>
      {/* Hero Section */}
      <div className="relative h-screen">
        <Carousel className="w-full h-full" autoplay interval={5000}>
          <CarouselContent>
            {catImages.map((image, index) => (
              <CarouselItem key={index} className="relative h-full">
                <motion.div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{backgroundImage: `url('${image}')`}}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                    <motion.h1 
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="text-7xl font-bold text-white text-center mb-4"
                    >
                      All About Cats
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="text-xl text-white text-center"
                    >
                      Discover the fascinating world of our feline friends
                    </motion.p>
                    {catName && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-2xl text-purple-300 mt-4"
                      >
                        Welcome, {catName}!
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight className="h-10 w-10 text-white" />
          </motion.div>
        </div>
      </div>

      <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to Cat World!</DialogTitle>
            <DialogDescription>
              Please enter your name to personalize your experience.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNameSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Tabs defaultValue="characteristics" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="characteristics" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">Characteristics</TabsTrigger>
              <TabsTrigger value="breeds" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">Popular Breeds</TabsTrigger>
              <TabsTrigger value="facts" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">Fun Facts</TabsTrigger>
            </TabsList>
            <TabsContent value="characteristics">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Info className="mr-2" /> Characteristics of Cats</CardTitle>
                  <CardDescription>What makes cats unique?</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      { trait: "Independence", level: 90, icon: "🏞️" },
                      { trait: "Hunting Skills", level: 85, icon: "🐭" },
                      { trait: "Flexibility", level: 95, icon: "🤸" },
                      { trait: "Night Vision", level: 80, icon: "🌙" },
                      { trait: "Communication", level: 75, icon: "😺" },
                    ].map((item, index) => (
                      <motion.li 
                        key={index} 
                        className="flex flex-col"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="font-medium mb-1 flex items-center">
                          <span className="mr-2">{item.icon}</span>
                          {item.trait}
                        </span>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        >
                          <Progress value={item.level} className="w-full" />
                        </motion.div>
                        <span className="text-sm text-right mt-1">{item.level}%</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="breeds">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Cat className="mr-2" /> Popular Cat Breeds</CardTitle>
                  <CardDescription>Some well-known cat breeds around the world</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                      { name: "Siamese", origin: "Thailand", personality: "Vocal, Social" },
                      { name: "Persian", origin: "Iran", personality: "Calm, Gentle" },
                      { name: "Maine Coon", origin: "United States", personality: "Friendly, Intelligent" },
                      { name: "Bengal", origin: "United States", personality: "Active, Playful" },
                      { name: "British Shorthair", origin: "United Kingdom", personality: "Easygoing, Loyal" },
                      { name: "Sphynx", origin: "Canada", personality: "Energetic, Mischievous" },
                    ].map((breed, index) => (
                      <motion.li 
                        key={index} 
                        className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <img src="/placeholder.svg" alt={breed.name} className="w-24 h-24 rounded-full mb-2 mx-auto object-cover" />
                        <span className="font-medium text-lg">{breed.name}</span>
                        <Badge variant="secondary" className="mt-1">{breed.origin}</Badge>
                        <span className="text-sm text-gray-500 mt-2">{breed.personality}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="mt-2 px-3 py-1 bg-purple-500 text-white rounded-full text-sm"
                          onClick={() => toast({
                            title: `${breed.name} Info`,
                            description: `The ${breed.name} is a ${breed.personality.toLowerCase()} breed from ${breed.origin}.`,
                          })}
                        >
                          Learn More
                        </motion.button>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="facts">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Star className="mr-2" /> Fun Cat Facts</CardTitle>
                  <CardDescription>Interesting tidbits about our feline friends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {catFacts.map((fact, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start bg-white p-4 rounded-lg shadow-sm"
                      >
                        <Paw className="mr-2 h-5 w-5 text-purple-500 flex-shrink-0 mt-1" />
                        <span>{fact}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <div className="mt-12 text-center">
          <AnimatePresence>
            <motion.div
              key={likeCount}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                onClick={() => {
                  setLikeCount(prev => prev + 1);
                  toast({
                    title: "Thanks for the love!",
                    description: `You've liked cats ${likeCount + 1} times!`,
                  });
                }}
                className="group text-lg px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full shadow-lg"
              >
                <Heart className="mr-2 h-6 w-6 group-hover:text-red-200 transition-colors" />
                Like Cats ({likeCount})
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Cat of the Day</h2>
          <img src="https://cataas.com/cat" alt="Random Cat" className="mx-auto rounded-lg shadow-lg" />
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold mb-4">Cat Trivia Game</h2>
          <p className="mb-4">Test your cat knowledge!</p>
          <Button
            onClick={() => {
              toast({
                title: "Coming Soon!",
                description: "The Cat Trivia Game will be available in the next update!",
              });
            }}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            Start Game
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
