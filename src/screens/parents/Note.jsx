import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Note() {
    const navigate = useNavigate();
    const [noteText, setNoteText] = useState("");
    const [selectedFoodTags, setSelectedFoodTags] = useState([]);
    const [selectedSourceTags, setSelectedSourceTags] = useState([]);

    // 자주 먹는 음식 태그들
    const foodTags = [
        { id: 1, label: "치킨", color: "bg-white text-[#00BBA9] border-[#00BBA9]" },
        { id: 2, label: "피자", color: "bg-white text-[#00BBA9] border-[#00BBA9]" },
        { id: 3, label: "보쌈", color: "bg-white text-[#00BBA9] border-[#00BBA9]" },
        { id: 4, label: "스파게티", color: "bg-white text-[#00BBA9] border-[#00BBA9]" }
    ];

    // 출거찾기 태그들
    const sourceTags = [
        { id: 1, label: "치킨", color: "bg-white text-[#00BBA9] border-[#00BBA9]" },
        { id: 2, label: "피자", color: "bg-white text-[#00BBA9] border-[#00BBA9]" },
        { id: 3, label: "보쌈", color: "bg-white text-[#00BBA9] border-[#00BBA9]" }
    ];

    const handleFoodTagClick = (tagId) => {
        setSelectedFoodTags(prev => 
            prev.includes(tagId) 
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        );
    };

    const handleSourceTagClick = (tagId) => {
        setSelectedSourceTags(prev => 
            prev.includes(tagId) 
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        );
    };

    const handleSave = () => {
        // 저장 로직
        console.log("Note saved:", {
            text: noteText,
            foodTags: selectedFoodTags,
            sourceTags: selectedSourceTags
        });
        navigate("/parent/home"); // 이전 페이지로 돌아가기
    };

    return (
        <div className="h-screen flex flex-col bg-white">
            {/* 상단 헤더 */}
            <div className="px-6 py-4 flex items-center border-b border-gray-100">
                <button 
                    onClick={() => navigate(-1)}
                    className="mr-4"
                >
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-[20px] font-semibold text-black flex-1 text-center pr-10">음식 기록</h1>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 px-6 py-6">
                {/* 안내 텍스트 */}
                <div className="mb-6">
                    <p className="text-[16px] text-gray-700 text-center leading-relaxed">
                        어떤 음식을 먹었는지<br />
                        자유롭게 기록해 주세요
                    </p>
                </div>

                {/* 텍스트 입력 영역 */}
                <div className="mb-8">
                    <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="아침 8시 우유 한 컵"
                        className="w-full h-32 p-4 border border-gray-200 rounded-2xl text-[16px] text-gray-700 placeholder-[#8E8E8E] resize-none focus:outline-none focus:border-[#00BBA9]"
                    />
                </div>

                {/* 자주 먹는 음식 섹션 */}
                <div className="mb-8">
                    <h3 className="text-[18px] font-medium text-black mb-4">자주 먹는 음식</h3>
                    <div className="flex flex-wrap gap-3">
                        {foodTags.map((tag) => (
                            <button
                                key={tag.id}
                                onClick={() => handleFoodTagClick(tag.id)}
                                className={`px-4 py-2 rounded-full border text-[14px] font-medium transition-colors ${
                                    selectedFoodTags.includes(tag.id)
                                        ? 'bg-[#00BBA9] text-white border-[#00BBA9]'
                                        : tag.color
                                }`}
                            >
                                {tag.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 출거찾기 섹션 */}
                <div className="mb-8">
                    <h3 className="text-[18px] font-medium text-black mb-4">출거찾기</h3>
                    <div className="flex flex-wrap gap-3">
                        {sourceTags.map((tag) => (
                            <button
                                key={tag.id}
                                onClick={() => handleSourceTagClick(tag.id)}
                                className={`px-4 py-2 rounded-full border text-[14px] font-medium transition-colors ${
                                    selectedSourceTags.includes(tag.id)
                                        ? 'bg-[#00BBA9] text-white border-[#00BBA9]'
                                        : tag.color
                                }`}
                            >
                                {tag.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 하단 저장 버튼 */}
            <div className="px-6 py-6 bg-white border-t border-gray-100">
                <button
                    onClick={handleSave}
                    className="w-full py-4 bg-[#00BBA9] text-white text-[16px] font-medium rounded-2xl hover:bg-[#009688] transition-colors"
                >
                    저장
                </button>
            </div>
        </div>
    );
}
