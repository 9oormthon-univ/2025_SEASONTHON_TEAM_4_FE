import React from "react";
import { useNavigate } from "react-router-dom";
import quest1Image from "../../assets/quest1.png";
import TabBar from "../../components/TabBar.jsx";

export default function Quest_detail() {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col bg-white">
            {/* 상단 헤더 */}
            <div className="px-6 py-4 flex items-center">
                <button 
                    onClick={() => navigate("/quest_parents")}
                    className="mr-4"
                >
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-[20px] font-semibold text-black flex-1 text-center pr-10">퀘스트 확인</h1>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 px-6 py-8 pb-20">
                {/* 중앙 이미지 */}
                <div className="flex justify-center mb-6">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden">
                        <img 
                            src={quest1Image} 
                            alt="스트레칭" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* 제목 및 날짜 */}
                <div className="text-center mb-8">
                    <h2 className="text-[24px] font-bold text-black mb-2">스트레칭</h2>
                    <p className="text-[16px] text-gray-600">2025년 9월 20일 오전 11시 30분</p>
                </div>

                {/* 운동시간/운동강도 카드 */}
                <div className="grid grid-cols-2 gap-4 mb-8 bg-white rounded-2xl px-2 py-6">
                    <div className="rounded-2xl p-6 text-center border border-gray-100 shadow-lg">
                        <p className="text-[14px] text-gray-600 mb-2">운동시간</p>
                        <div className="flex items-baseline justify-center">
                            <span className="text-[28px] font-bold text-black">50</span>
                            <span className="text-[16px] text-gray-600 ml-1">분</span>
                        </div>
                    </div>
                    <div className="rounded-2xl p-6 text-center border border-gray-100 shadow-lg">
                        <p className="text-[14px] text-gray-600 mb-2">운동강도</p>
                        <span className="text-[28px] font-bold text-[#00BBA9]">적당히</span>
                    </div>
                </div>

                {/* 혈당예측 섹션 */}
                <div className="mb-6">
                    <h3 className="text-[18px] font-semibold text-black mb-4">혈당예측</h3>
                    
                    {/* 반원 차트 */}
                    <div className="flex justify-center mb-6">
                        <div className="relative w-64 h-32">
                            <svg className="w-full h-full" viewBox="0 0 100 50">
                                {/* 배경 반원 */}
                                <path
                                    d="M 15 40 A 35 35 0 0 1 85 40"
                                    fill="none"
                                    stroke="#D9F6F2"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                />
                                {/* 진행 반원 (약 70% 진행) */}
                                <path
                                    d="M 15 40 A 35 35 0 0 1 85 40"
                                    fill="none"
                                    stroke="#00BBA9"
                                    strokeWidth="8"
                                    strokeDasharray="77 110"
                                    strokeDashoffset="0"
                                    strokeLinecap="round"
                                />
                            </svg>
                            {/* 중앙 텍스트 */}
                            <div className="absolute inset-0 flex items-center justify-center mt-2">
                                <div className="flex items-baseline gap-1 pt-10">
                                    <span className="text-[28px] font-bold text-black">+12</span>
                                    <span className="text-[14px] text-[#8E8E8E]">mg/dL</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 메시지 */}
                    <div className="bg-gray-100 rounded-2xl p-4 text-center">
                        <p className="text-[14px] text-gray-700">스파이크가 발생하지 않을 것으로 예측했어요</p>
                    </div>
                </div>
            </div>

            {/* TabBar */}
            <TabBar
                active="quest"
                onHome={() => navigate("/Home_parents")}
                onQuest={() => navigate("/quest_parents")}
                onReport={() => navigate("/parents_report")}
                onMy={() => navigate("/my")}
            />
        </div>
    );
}
