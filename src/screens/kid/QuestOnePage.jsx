import React from "react";
import { useNavigate } from "react-router-dom";
import water from "../../assets/water.png";

export default function QuestOnePage() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // 뒤로가기
    };

    const handleComplete = () => {
        navigate("/kid/quest/update");
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* 상단 헤더 */}
            <div className="px-6 py-4 bg-white flex items-center justify-between">
                <button
                    onClick={handleBack}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    type="button"
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
                <h1 className="text-lg font-bold text-black">음식 기록</h1>
                <div className="w-10" />
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
                {/* 메시지 */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-black mb-2">혈당이 살짝 높아졌어</h2>
                    <h2 className="text-2xl font-bold text-black mb-4">지금 물 한 컵 마시고 기록해줘!</h2>
                </div>

                {/* 캐릭터 */}
                <div className="mb-8">
                    <img
                        src={water}
                        alt="단짝 캐릭터"
                        width={200}
                        height={200}
                        className="object-contain"
                    />
                </div>
            </div>

            {/* 하단 버튼 */}
            <div className="px-6 pb-8">
                <button
                    onClick={handleComplete}
                    className="w-full bg-teal-500 text-white text-lg font-medium py-2.5 rounded-2xl hover:bg-teal-600 transition-colors"
                    type="button"
                >
                    인증하러 가기
                </button>
            </div>
        </div>
    );
}
