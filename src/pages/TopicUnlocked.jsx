import React, { useEffect, useCallback, useState } from "react";
import RootLayout from "../layouts/RootLayout";
import { useDispatch, useSelector } from "react-redux";
import { setTopics, setCurrentSelectedTopic } from "../redux/slices/topicSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../utils";
import { ArticlesCard } from "../components/common/ArticlesCard";
import article from "../assets/article-image.png";
import { TopicCard } from "../components/common/TopicCard";
const TopicUnlocked = () => {
    const dispatch = useDispatch();
    const [isTopic, setIsTopic] = useState([])
    const navigate = useNavigate()
    // Fetch topics from Redux store
    const topics = useSelector((state) => state.topics?.topics || []);
    const { user } = useSelector((state) => state.auth); // Fetch user details


    // Fetch topics from the backend
    const fetchGeneratedTopic = useCallback(async () => {
        try {
            const url = `http://localhost:5000/topic?userId=${user.userId}`;
            console.log("Request URL:", url);
    
            const { data } = await axios.get(url);
            console.log("Fetched data:", data);
    
            // Extract full topic data (ID, status, createdAt, etc.)
            const structuredTopics = data.data.map((item) => ({
                id: item._id,            // ID of the topic
                status: item.status,     // Status of the topic
                createdAt: item.createdAt, // Creation timestamp
                updatedAt: item.updatedAt, // Update timestamp
                topics: item.topics.map((topic) => ({
                    id: topic._id,      // Topic ID
                    value: topic.value, // Topic name or value
                    updateRequested: topic.updateRequested, // Update status
                    verifyRequested: topic.verifyRequested // Verify status
                }))
            }));
    
            console.log("Structured Topic Data:", structuredTopics);
    
            dispatch(setTopics(structuredTopics)); // Store full topic data in Redux
            setIsTopic(structuredTopics); // Set local state for full data
        } catch (err) {
            console.error("Error fetching topics:", err);
        }
    }, [user, dispatch]);
    

    useEffect(() => {
        if (user?.userId) {
            fetchGeneratedTopic();
        }
    }, [fetchGeneratedTopic, user]);
    console.log("topics", topics)
    console.log("Topic from state ", isTopic)

    return (
        <RootLayout>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
                <div className="w-full h-full justify-center items-center max-w-[1200px] flex flex-wrap gap-4">
                    {isTopic.map((item) => (

                        <TopicCard
                            key={item.id}
                            image={article}
                            status={item.status}
                            head={
                                <>
                                    <div>
                                        Tech Pr Agency <br /> for startups
                                    </div>
                                </>
                            }
                            content={<div>hello</div>}
                            onClick={() => {
                                dispatch(setCurrentSelectedTopic(item.id));
                                navigate(routes.topic_generator);
                            }} />

                    ))}
                </div>
            </div>
        </RootLayout>
    );
};

export default TopicUnlocked;
