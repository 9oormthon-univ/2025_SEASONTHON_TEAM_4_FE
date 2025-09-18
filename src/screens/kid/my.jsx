import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TabBar from "../../components/TabBar.jsx";

export default function My() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const active =
        pathname.startsWith("/kid/quest") ? "quest" :
            pathname.startsWith("/kid/report") ? "report" :
                pathname.startsWith("/kid/my") ? "my" :
                    "home";

    return (
        <div className="h-screen flex flex-col bg-[#FAFAFA]">
            {/* 헤더 */}
            <div className="flex items-center justify-between px-6 py-4">
                <div className="w-10" />
                <h1 className="text-[20px] font-semibold text-black">마이</h1>
                <button className="p-2" type="button">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 py-6 pb-20 overflow-y-auto">
                {/* 프로필 섹션 */}
                <div className="flex flex-col items-center mb-4">
                    {/* 프로필 이미지 */}
                    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                    </div>

                    {/* 이름 */}
                    <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-[24px] font-semibold text-black">이단짝</h2>
                        <button className="p-1">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                    </div>

                    {/* 설명 */}
                    <p className="text-[16px] text-gray-500">단짝이가 늘 응원하고 있어요</p>
                </div>

                {/* 키/몸무게 카드 */}
                <div className="grid grid-cols-2 gap-4 mb-6 px-6">
                    {/* 키 카드 */}
                    <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                        <p className="text-[16px] text-gray-500 mb-2">키</p>
                        <p className="text-[32px] font-bold text-black">
                            160.0<span className="text-[16px] font-normal text-gray-500 ml-1">cm</span>
                        </p>
                    </div>

                    {/* 몸무게 카드 */}
                    <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                        <p className="text-[16px] text-gray-500 mb-2">몸무게</p>
                        <p className="text-[32px] font-bold text-black">
                            50<span className="text-[16px] font-normal text-gray-500 ml-1">kg</span>
                        </p>
                    </div>
                </div>

                {/* 센서 관리 */}
                <div className="mb-2 bg-white pt-2 px-6 pb-6">
                    <div className="flex items-center justify-between py-4">
                        <h3 className="text-[20px] font-semibold text-black">센서 관리</h3>
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-[#00BBA9] rounded-full"></div>
                        <p className="text-[16px] text-black">케어센스에어</p>
                    </div>
                </div>

                {/* 보호자 관리 */}
                <div className="mb-2 bg-white pt-2 px-6 pb-6">
                    <div className="flex items-center justify-between py-4">
                        <h3 className="text-[20px] font-semibold text-black">보호자 관리</h3>
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <p className="text-[16px] text-black">현재 연결된 보호자</p>
                        <button className="bg-[#F66D56] text-white px-4 py-2 rounded-full text-[14px] font-medium">
                            엄마
                        </button>
                    </div>
                </div>
            </div>

            {/* TabBar */}
            <TabBar
                active={active}
                onHome={() => navigate("/kid/home")}
                onQuest={() => navigate("/kid/quest")}
                onReport={() => navigate("/kid/report")}
                onMy={() => navigate("/kid/my")}
            />
        </div>
    );
}
