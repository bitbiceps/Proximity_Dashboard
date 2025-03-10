import { useState } from "react";
import { motion } from "framer-motion";

const EditArticleModal = ({ 
  title: initialTitle, 
  content: initialContent, 
  handleArticleEdit, 
  setisEditing, 
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const onClose = () => {
    setisEditing(false);
  };

  const handleSubmit = () => {
    handleArticleEdit({ title, content }); // Send updated values
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full mx-2 bg-black bg-opacity-50 z-50">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white p-6 rounded-lg shadow-lg w-[80%]"
      >
        <h2 className="text-xl font-semibold mb-4">Edit Article</h2>
        
        {/* Title Input */}
        <label className="text-gray-600 text-lg">Title</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-4" 
          placeholder="Enter title..."
        />
        
        {/* Content Input */}
        <label className="text-gray-600 text-lg">Content</label>
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)}
          rows="15" 
          className="w-full p-2 border rounded mb-4 resize-none" 
          placeholder="Enter content..."
        ></textarea>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 hover:scale-105"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="px-4 py-2 bg-app-blue-1 text-white rounded hover:scale-105"
          >
            Update
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EditArticleModal;
