import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TabBar from "../../components/TabBar.jsx";

export default function Quest_parents() {
    const [selectedMonth] = useState("9월");
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const active =
        pathname.startsWith("/parent/quest") ? "quest" :
            pathname.startsWith("/parent/report") ? "report" :
                pathname.startsWith("/kid/my") ? "my" :
                    "home";

    // 요일별 완료 상태
    const weekDays = [
        { name: "월", completed: true },
        { name: "화", completed: true },
        { name: "수", completed: false },
        { name: "목", completed: false, current: true },
        { name: "금", completed: false },
        { name: "토", completed: false }
    ];

    // 퀘스트 데이터
    const quests = [
        {
            id: 1,
            type: "미완료",
            title: "식사 후 15분 이상 운동 기록을 인증해줘!",
            completed: false
        },
        {
            id: 2,
            type: "미완료", 
            title: "오늘은 혈당을 70~140 사이에서 70% 이상 유지해보자",
            completed: false
        },
        {
            id: 3,
            type: "완료",
            title: "미션",
            completed: true
        },
        {
            id: 4,
            type: "완료",
            title: "미션",
            completed: true
        }
    ];

    return (
        <div className="h-screen flex flex-col bg-white">
            {/* 상단 월별 드롭다운 */}
            <div className="px-6 py-4">
                <div className="flex items-center justify-center">
                    <button className="flex items-center gap-2">
                        <span className="text-[24px] font-semibold text-black">{selectedMonth}</span>
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 flex flex-col">
                {/* 이번주 참여 현황 */}
                <div className="px-6 py-4 mb-4">
                    <div className="flex items-center gap-2 mb-4">
                        <svg className="w-5 h-5 text-[#00BBA9]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span className="text-[16px] font-medium text-black">이번주 참여 현황</span>
                    </div>

                    {/* 요일별 체크 */}
                    <div className="grid grid-cols-6 gap-3">
                        {weekDays.map((day, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <span className="text-[14px] text-gray-600 mb-2">{day.name}</span>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                    day.current 
                                        ? 'bg-[#00BBA9]' 
                                        : day.completed 
                                        ? 'bg-[#2C3E50]' 
                                        : 'bg-gray-300'
                                }`}>
                                    {day.completed ? (
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : day.current ? (
                                        <div className="w-4 h-4 bg-white rounded-full"></div>
                                    ) : (
                                        <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 오늘의 퀘스트 */}
                <div className="flex-1 px-6 rounded-t-2xl bg-[#F5F5F5] pb-20">
                    <h2 className="text-[20px] font-semibold text-black pt-6 mb-4">오늘의 퀘스트</h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {quests.map((quest) => (
                            <div 
                                key={quest.id} 
                                className={`rounded-2xl p-4 flex flex-col cursor-pointer ${
                                    quest.completed ? 'bg-white border border-gray-200' : 'bg-white border border-gray-200'
                                }`}
                                onClick={() => navigate('/parent/quest/detail')}
                            >
                                <div className="mb-3">
                                    <span className={`inline-block px-2 py-1 rounded-md text-[12px] font-medium ${
                                        quest.completed 
                                            ? 'bg-gray-100 text-gray-600' 
                                            : 'bg-[#E8F8F6] text-[#00BBA9]'
                                    }`}>
                                        {quest.type}
                                    </span>
                                </div>
                                
                                <p className={`text-[14px] mb-4 leading-[20px] flex-1 ${
                                    quest.completed ? 'text-gray-600' : 'text-black'
                                }`}>
                                    {quest.title}
                                </p>
                                
                                <button 
                                    className={`w-full py-3 rounded-xl text-[14px] font-medium mt-auto ${
                                        quest.completed 
                                            ? 'bg-gray-200 text-gray-600' 
                                            : 'bg-[#00BBA9] text-white'
                                    }`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {quest.completed ? '열람하기' : '알림 보내기'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* TabBar */}
            <TabBar
                active={active}
                onHome={() => navigate("/parent/home")}
                onQuest={() => navigate("/parent/quest")}
                onReport={() => navigate("/parent/report")}
                onMy={() => navigate("/kid/my")}
            />
        </div>
    );
}
