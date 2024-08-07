import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info, Paw, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const catFacts = [
    "Cats sleep for 70% of their lives",
    "A group of cats is called a clowder",
    "Cats have over 20 vocalizations",
    "The first cat in space was French",
    "Cats can jump up to 6 times their length",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-pink-200">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}>
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
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Tabs defaultValue="characteristics" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
              <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
              <TabsTrigger value="facts">Fun Facts</TabsTrigger>
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
                      { trait: "Independence", level: 90 },
                      { trait: "Hunting Skills", level: 85 },
                      { trait: "Flexibility", level: 95 },
                      { trait: "Night Vision", level: 80 },
                      { trait: "Communication", level: 75 },
                    ].map((item, index) => (
                      <li key={index} className="flex flex-col">
                        <span className="font-medium mb-1">{item.trait}</span>
                        <Progress value={item.level} className="w-full" />
                      </li>
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
                      { name: "Siamese", origin: "Thailand" },
                      { name: "Persian", origin: "Iran" },
                      { name: "Maine Coon", origin: "United States" },
                      { name: "Bengal", origin: "United States" },
                      { name: "British Shorthair", origin: "United Kingdom" },
                      { name: "Sphynx", origin: "Canada" },
                    ].map((breed, index) => (
                      <li key={index} className="flex flex-col items-center text-center">
                        <img src="/placeholder.svg" alt={breed.name} className="w-24 h-24 rounded-full mb-2 mx-auto object-cover" />
                        <span className="font-medium">{breed.name}</span>
                        <span className="text-sm text-gray-500">{breed.origin}</span>
                      </li>
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
                        className="flex items-start"
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
                onClick={() => setLikeCount(prev => prev + 1)}
                className="group text-lg px-6 py-3"
              >
                <Heart className="mr-2 h-6 w-6 group-hover:text-red-500 transition-colors" />
                Like Cats ({likeCount})
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Index;
