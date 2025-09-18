import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import happy from "../../assets/happy.png";
import icon from "../../assets/icon.png";
import lock from "../../assets/lock.png";
import TabBar from "../../components/TabBar.jsx";

export default function QuestPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const active =
        pathname.startsWith("/home") ? "home" :
            pathname.startsWith("/report") ? "report" :
                pathname.startsWith("/my") ? "my" :
                    "quest";

    const handleNext = () => {
        navigate("/quest-1");
    };

    const getCurrentMonth = () => {
        return selectedDate.toLocaleDateString("ko-KR", { month: "long" });
    };

    const getWeekDates = () => {
        const today = new Date();
        const dates = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            dates.push(date);
        }
        return dates;
    };

    const formatDate = (date) => {
        return {
            day: date.getDate(),
            dayName: date.toLocaleDateString("ko-KR", { weekday: "short" }),
        };
    };

    const isSameDate = (d1, d2) => d1.toDateString() === d2.toDateString();

    const getQuestStatus = (date) => {
        const today = new Date();
        const daysDiff = Math.floor(
            (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (daysDiff < 0) return null;       // 미래
        if (daysDiff === 0) return "today";  // 오늘
        if (daysDiff <= 2) return "completed";
        if (daysDiff <= 4) return "failed";
        return "completed";
    };

    const weekDates = getWeekDates();

    return (
        <div className="min-h-screen flex flex-col">
            {/* 상단 월 표시 */}
            <div className="px-6 py-6 bg-white mb-2">
                <div className="flex items-center justify-center">
                    <h1 className="text-xl font-bold text-black">{getCurrentMonth()}</h1>
                    <svg
                        className="w-5 h-5 ml-2 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            <div className="flex items-center justify-start ml-8">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-500">이번주 참여 현황</span>
            </div>

            {/* 일주일 날짜 선택 */}
            <div className="px-6 pt-2 pb-4 bg-white">
                <div className="flex justify-between items-center">
                    {weekDates.map((date, idx) => {
                        const { dayName } = formatDate(date);
                        const isSelected = isSameDate(date, selectedDate);
                        const questStatus = getQuestStatus(date);

                        return (
                            <button
                                key={idx}
                                onClick={() => setSelectedDate(date)}
                                className={`flex flex-col items-center py-1 px-1 rounded-full w-11 transition-colors border ${
                                    isSelected
                                        ? "bg-teal-500 text-white border-teal-500"
                                        : "text-gray-600 hover:bg-gray-100 border-gray-200"
                                }`}
                            >
                                <span className="text-md font-medium my-2">{dayName}</span>

                                {/* 퀘스트 상태 아이콘 */}
                                <div className="mb-2">
                                    {questStatus === "completed" && (
                                        <div className="w-5 h-5 bg-slate-700 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                    {questStatus === "failed" && (
                                        <div className="w-5 h-5 bg-slate-700 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    )}
                                    {questStatus === null && (
                                        <div className="w-4 h-4 border border-gray-300 rounded-full" />
                                    )}
                                    {questStatus === "today" && (
                                        <div className="w-4 h-4 border border-gray-300 rounded-full" />
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 메인 컨텐츠 영역 */}
            <div className="flex-1 flex flex-col px-6 py-8 bg-[#F2FBFA] rounded-t-3xl shadow-lg">
                {/* 제목 */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-black text-left">
                        오늘의 퀘스트
                    </h2>
                </div>

                {/* 캐릭터와 말풍선 */}
                <div className="flex flex-col items-center">
                    {/* 말풍선 */}
                    <div className="relative bg-white rounded-2xl px-6 py-3 shadow-md">
                        <p className="text-teal-500 font-medium text-md">
                            나를 건강하게 지켜줘!
                        </p>
                        {/* 말풍선 꼬리 */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[11px]">
                            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-white"></div>
                        </div>
                    </div>
                    
                    {/* 캐릭터 */}
                    <div>
                        <img
                            src={happy}
                            alt="단짝 캐릭터"
                            width={160}
                            height={160}
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* 퀘스트 도장들 */}
                <div className="flex flex-col items-center gap-4 justify-center flex-1 pb-12">
                    {/* 첫 번째 줄 */}
                    <div className="flex justify-center gap-6">
                        {/* 완료 도장 1 */}
                        <div className="relative flex flex-col items-center">
                            <div className="w-20 h-20 bg-white rounded-full border-2 border-solid border-gray-300 flex items-center justify-center relative">
                                <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                                    <span className="text-gray-400 text-sm">완료</span>
                                </div>
                            </div>
                        </div>

                        {/* 완료 도장 2 */}
                        <button 
                            onClick={handleNext}
                            className="relative flex flex-col items-center hover:scale-105 transition-transform"
                        >
                            <div className="w-20 h-20 bg-white rounded-full border-2 border-solid border-teal-400 flex items-center justify-center relative">
                                <div className="w-16 h-16 rounded-full border-2 border-dashed border-teal-400 flex items-center justify-center">
                                    <img
                                        src={icon}
                                        alt="단짝 캐릭터"
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <div className="absolute -bottom-0 bg-teal-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                퀘스트 열기
                            </div>
                        </button>

                        {/* 완료 도장 3 */}
                        <button 
                            onClick={handleNext}
                            className="relative flex flex-col items-center hover:scale-105 transition-transform"
                        >
                            <div className="w-20 h-20 bg-white rounded-full border-2 border-solid border-teal-400 flex items-center justify-center relative">
                                <div className="w-16 h-16 rounded-full border-2 border-dashed border-teal-400 flex items-center justify-center">
                                    <img
                                        src={icon}
                                        alt="단짝 캐릭터"
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <div className="absolute -bottom-0 bg-teal-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                퀘스트 열기
                            </div>
                        </button>
                    </div>

                    {/* 두 번째 줄 */}
                    <div className="flex justify-center gap-6">
                        {/* 미완료 도장 1 */}
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-white rounded-full border-2 border-solid border-gray-300 flex items-center justify-center mb-2 relative">
                                <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                                    <span className="text-gray-400 text-sm">완료</span>
                                </div>
                            </div>
                        </div>

                        {/* 미완료 도장 2 */}
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-white rounded-full border-2 border-solid border-gray-300 flex items-center justify-center mb-2 relative">
                                <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                                    <img src={lock} alt="잠금" width={40} height={40} className="object-contain" />
                                </div>
                            </div>
                        </div>

                        {/* 미완료 도장 3 */}
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-white rounded-full border-2 border-solid border-gray-300 flex items-center justify-center mb-2 relative">
                                <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                                    <img src={lock} alt="잠금" width={40} height={40} className="object-contain" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 바텀 네비게이션 */}
            <TabBar
                active={active}
                onHome={() => navigate("/Home_kid")}
                onQuest={() => navigate("/quest")}
                onReport={() => navigate("/report_kid")}
                onMy={() => navigate("/my")}
            />
        </div>
    );
}
