import React from "react";
import { motion } from "framer-motion";
import RootLayout from "../layouts/RootLayout";

export const TextGenerating = () => {
  return (
    
      <motion.div 
        className="w-[90%] lg:w-[75%] mx-auto"
        animate={{ opacity: [1, 0.5, 1] }} 
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <motion.h2 
          className="text-xl font-semibold text-gray-400 mb-4"
          animate={{ opacity: [1, 0.5, 1] }} 
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Generating Article .....
        </motion.h2>

        <motion.p 
          className="text-gray-700 text-justify space-y-2 leading-relaxed mb-6"
          animate={{ opacity: [1, 0.5, 1] }} 
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {[...Array(12)].map((_, index) => (
            <motion.div 
              key={index}
              className={`h-6 bg-gray-400 rounded-full ${index % 3 === 0 ? "ml-10  " : "w-full"} ${index === 6 ? "w-[40%] " : index === 9 ? "w-[80%]" : index === 12 ? "w-[10%]" : ""}`}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1 }} // Stagger effect
            />
          ))}
        </motion.p>

        <motion.div className="flex justify-center space-x-4">
          <motion.button
            disabled
            className="px-8 py-2 text-gray-400 border border-gray-400 rounded-lg"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Update
          </motion.button>

          <motion.button
            disabled
            className="px-8 py-2 text-white bg-gray-400 rounded-lg"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Verify
          </motion.button>
        </motion.div>
      </motion.div>
    
  );
};
