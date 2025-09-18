import React from "react";
import { useNavigate } from "react-router-dom";
import badgeImage from "../../assets/badge.png";
import IC_Categories from "../../assets/IC_Categories.png";
import IC_Chat from "../../assets/IC_Chat.png";
import IC_Send from "../../assets/IC_Send.png";

export default function Badge() {
    const navigate = useNavigate();

    const handleBack = () => navigate(-1);

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            {/* 헤더 */}
            <div className="flex items-center justify-between px-6 py-4 bg-white">
                <button onClick={handleBack} className="p-2" type="button">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-[20px] font-semibold text-black">금주의 배지</h1>
                <div className="w-10" />
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 bg-gradient-to-b from-[#FFFFFF] to-[#F66D56]">
                {/* 배지 텍스트 */}
                <div className="text-center mb-8">
                    <p className="text-[24px] font-medium text-black mb-2 pt-4">이단짝님은</p>
                    <p className="text-[28px] font-bold text-black">"식습관 지킴이"</p>
                </div>

                {/* 배지 이미지 */}
                <div className="mb-12">
                    <img 
                        src={badgeImage} 
                        alt="식습관 지킴이 배지" 
                        className="w-64 h-64 object-contain"
                    />
                </div>

                {/* 공유 버튼들 */}
                <div className="flex gap-6 mb-4">
                    {/* 텔레그램 버튼 */}
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                        <img src={IC_Send} alt="텔레그램" className="w-6 h-6" />
                    </button>

                    {/* 도넛 버튼 */}
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                        <img src={IC_Chat} alt="도넛" className="w-6 h-6" />
                    </button>

                    {/* 격자 버튼 */}
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                        <img src={IC_Categories} alt="격자" className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* 하단 달성 정보 */}
            <div className="bg-[#F9EBE8] backdrop-blur-sm px-6 pt-8 pb-24 flex flex-col items-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                    <p className="text-[24px] font-semibold text-black">
                        💡 야식 없는 날 <span className="text-[#E5412A]">4</span>회 달성
                    </p>
                </div>
                
                <div className="bg-white rounded-2xl p-4 w-full max-w-sm">
                    <p className="text-[16px] text-[#666666] leading-[24px] text-center">
                        이번 주 꾸준히 저녁 늦은 식사를 줄여서<br />
                        혈당 안정에 큰 도움이 되었어요.
                    </p>
                </div>
            </div>
        </div>
    );
}
