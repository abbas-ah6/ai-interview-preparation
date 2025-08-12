import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import moment from 'moment';
import RoleInfoHeader from '../../components/RoleInfoHeader/RoleInfoHeader';
import axiosInstace from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import QuestionCard from '../../components/Cards/QuestionCard';
import { motion, AnimatePresence } from "framer-motion"
import { LuCircleAlert, LuListCollapse, LuLoaderCircle } from 'react-icons/lu';
import AIResponsePreview from './components/AIResponsePreview';
import Drawer from '../../components/Drawer/Drawer';
import SkeletonLoader from '../../components/Loader/SkeletonLoader';

const InterviewPrep = () => {
    const { sessionId } = useParams();

    const [sessionData, setSessionData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
    const [explanation, setExplanation] = useState(null)

    const [isLoading, setIsLoading] = useState(false);
    const [isUpdateLoader, setIsUpdateLoader] = useState(false);

    // Fetch session data by session id
    const fetchSessionDetailsById = async () => {
        try {
            const response = await axiosInstace.get(
                API_PATHS.SESSION.GET_ONE(sessionId)
            );

            if (response.data && response.data.session) {
                setSessionData(response.data.session)
            }


        } catch (error) {
            console.log("Something went wrong. Please try again, Error: ", error);
        }
    };


    // Generate Concept Explanation 
    const generateConceptExplanation = async (question) => {
        try {
            setErrorMessage("")
            setExplanation(null)

            setIsLoading(true)
            setOpenLearnMoreDrawer(true)

            const response = await axiosInstace.post(
                API_PATHS.AI.GENERATE_EXPLANATION,
                {
                    question,
                }
            );

            if (response.data) {
                setExplanation(response.data)
            }

        } catch (error) {
            setExplanation("")
            setErrorMessage("Failed to generate explanation, try again later")
            console.error("Error: ", error)
        } finally {
            setIsLoading(false);
        }
    };

    // Pin Question
    const toggleQuestionPinStatus = async (questionId) => {
        try {
            const response = await axiosInstace.post(
                API_PATHS.QUESTION.PIN(questionId)
            );

            console.log(response);

            if (response.data && response.data.question) {
                // toast.success
                fetchSessionDetailsById();
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    };

    // Add more questions to a session
    const uploadMoreQuestions = async () => {
        try {
            setIsUpdateLoader(true);

            // Call AI API to generate more questions
            const aiResponse = await axiosInstace.post(
                API_PATHS.AI.GENERATE_QUESTIONS,
                {
                    role: sessionData?.role,
                    experience: sessionData?.experience,
                    topicsToFocus: sessionData?.topicsToFocus,
                    numberOfQuestions: 10,
                }
            );

            // Should be array like [{question, answer}, ...]
            const generatedQuestions = aiResponse.data;

            const response = await axiosInstace.post(
                API_PATHS.QUESTION.ADD_TO_SESSION,
                {
                    sessionId,
                    questions: generatedQuestions,
                }
            );

            if (response.data) {
                // toast.s
                fetchSessionDetailsById()
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Something went wrong. Please try again.")
            }
        } finally {
            setIsUpdateLoader(false);
        }
    };

    useEffect(() => {
        if (sessionId) {
            fetchSessionDetailsById()
        }

        return () => { };
    }, [])

    return (
        <DashboardLayout>
            <RoleInfoHeader
                role={sessionData?.role || ""}
                topicsToFocus={sessionData?.topicsToFocus || ""}
                experience={sessionData?.experience || "-"}
                questions={sessionData?.questions?.length || "-"}
                description={sessionData?.description || ""}
                lastUpdated={
                    sessionData?.updatedAt
                        ? moment(sessionData.updatedAt).format("Do MMM YYYY")
                        : ""
                }
            />

            <div className='container mx-auto pt-4 pb-4 px-4 md:px-0'>
                <h2 className='text-lg font-semibold text-black'>Interview Q & A</h2>

                <div className='grid grid-cols-12 gap-4 mt-5 mb-10'>
                    <div className={`
                            col-span-12 ${openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
                        }`}>
                        <AnimatePresence>
                            {sessionData?.questions?.map((question, index) => {
                                return (
                                    <motion.div
                                        key={question._id || index}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{
                                            duration: 0.4,
                                            type: "spring",
                                            stiffness: 100,
                                            delay: index * 0.1,
                                            damping: 15,
                                        }}
                                        layout // This is the key prop that animates position changes
                                        layoutId={`question-${question._id || index}`} // Helps frammer track specific items
                                    >
                                        <>
                                            <QuestionCard
                                                question={question?.question}
                                                answer={question?.answer}
                                                onLearnMore={() => {
                                                    generateConceptExplanation(question?.question)
                                                }}
                                                isPinned={question?.isPinned}
                                                onTogglePin={() => toggleQuestionPinStatus(question._id)}
                                            />

                                            {!isLoading &&
                                                sessionData?.questions?.length == index + 1 && (
                                                    <div className='flex items-center justify-center mt-5'>
                                                        <button
                                                            className='flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer'
                                                            disabled={isLoading || isUpdateLoader}
                                                            onClick={uploadMoreQuestions}
                                                        >
                                                            {isUpdateLoader ? (
                                                                <LuLoaderCircle className='text-lg animate-spin' />
                                                            ) : (
                                                                <LuListCollapse className='text-lg' />
                                                            )}{" "}
                                                            Load More
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        </>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                <div>
                    <Drawer
                        isOpen={openLearnMoreDrawer}
                        onClose={() => setOpenLearnMoreDrawer(false)}
                        title={!isLoading && explanation?.title}
                    >
                        {errorMessage && (
                            <p className='flex gap-2 text-sm text-amber-600 font-medium'>
                                <LuCircleAlert className='mt-1' /> {errorMessage}
                            </p>
                        )}
                        {isLoading && <SkeletonLoader />}
                        {!isLoading && explanation && (
                            <AIResponsePreview content={explanation?.explanation} />
                        )}
                    </Drawer>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default InterviewPrep;