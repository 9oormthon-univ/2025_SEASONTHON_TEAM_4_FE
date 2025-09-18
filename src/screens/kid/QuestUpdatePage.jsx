import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const pad2 = (n) => String(n).padStart(2, "0");
const nowTime = () => {
    const d = new Date();
    return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
};

export default function QuestUpdatePage() {
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);
    const handleComplete = () => navigate("/quest-check");

    const [mealName, setMealName] = useState("");
    const [mealTime, setMealTime] = useState(nowTime());
    const [menuText, setMenuText] = useState("");
    const [showKcal, setShowKcal] = useState(false);

    const handleAddMenu = () => setShowKcal(true);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="px-6 py-4 bg-white flex items-center justify-between">
                <button
                    onClick={handleBack}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    type="button"
                    aria-label="뒤로가기"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M15 18L9 12L15 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <h1 className="text-lg font-bold text-black">퀘스트 인증하기</h1>
                <div className="w-6" />
            </div>

            {/* input boxes */}
            <main className="flex-1 px-6 py-10">
                <div className="space-y-6">
                    {/* 식사명 */}
                    <div className="mb-8">
                        <label className="block text-md font-semibold text-gray-900 mb-2">식사명</label>
                        <div className="rounded-xl bg-white px-4 py-3
                        ring-1 ring-inset ring-[#CACACA]
                        focus-within:ring-2 focus-within:ring-[#CACACA] transition">
                            <input
                                type="text"
                                value={mealName}
                                onChange={(e) => setMealName(e.target.value)}
                                placeholder="예) 저녁, 간식"
                                className="w-full bg-transparent outline-none placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    {/* 식사 시간 */}
                    <div className="mb-8">
                        <label className="block text-md font-semibold text-gray-900 mb-2">식사 시간</label>
                        <div className="rounded-xl bg-white px-4 py-3
                        ring-1 ring-inset ring-[#CACACA]
                        focus-within:ring-2 focus-within:ring-[#CACACA] transition">

                        <input
                                type="time"
                                value={mealTime}
                                onChange={(e) => setMealTime(e.target.value)}
                                step="60"
                                className="w-full bg-transparent outline-none placeholder:text-gray-400 appearance-none"
                            />
                        </div>
                    </div>

                    {/* 메뉴 */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-md font-semibold text-gray-900">메뉴</label>
                            <button
                                type="button"
                                onClick={handleAddMenu}
                                className="text-sm font-medium text-[#4B4B4B] px-3 py-1.5 rounded-full hover:bg-[#E5E5E5] transition
                                           bg-[#EEEEEE]"
                            >
                                메뉴추가 <span className="text-sm font-medium text-[#8E8E8E]">+</span>
                            </button>
                        </div>

                        <div
                            className="relative rounded-xl bg-white px-4 py-3
             ring-1 ring-inset ring-[#CACACA]
             focus-within:ring-2 focus-within:ring-[#CACACA] transition"
                        >
                            <input
                                type="text"
                                value={menuText}
                                onChange={(e) => setMenuText(e.target.value)}
                                placeholder="예) 치킨"
                                className={`w-full bg-transparent outline-none placeholder:text-gray-400 ${
                                    showKcal ? "pr-24" : ""
                                }`}
                            />

                            {showKcal && (
                                <button
                                    type="button"
                                    className="absolute right-2 top-1/2 -translate-y-1/2
                 rounded-full px-3 py-1 text-xs font-semibold
                 leading-none bg-teal-500 text-white"
                                >
                                    750Kcal
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* 하단 버튼 */}
            <div className="px-6 pb-8">
                <button
                    onClick={handleComplete}
                    className="w-full bg-teal-500 text-white text-lg font-medium py-2.5 rounded-2xl hover:bg-teal-600 transition-colors"
                    type="button"
                >
                    인증하기
                </button>
            </div>
        </div>
    );
}
