import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import doctorImage from "../../assets/doctor.png";
import Chart from "../../components/charts/Chart.jsx";
import TabBar from "../../components/TabBar.jsx";

export default function Report_parents() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState(false);

    const active =
        pathname.startsWith("/parent/quest") ? "quest" :
            pathname.startsWith("/parent/report") ? "report" :
                pathname.startsWith("/kid/my") ? "my" :
                    "home";

    // 플로팅 메뉴 액션 버튼들
    const floatingActions = [
        { id: 1, label: "운동 기록", icon: "🔥", color: "bg-[#FF6B6B]" },
        { id: 2, label: "혈당 기록", icon: "💧", color: "bg-[#00BBA9]" },
        { id: 3, label: "체중 기록", icon: "💬", color: "bg-[#FF6B6B]" },
        { id: 4, label: "메모 하기", icon: "📝", color: "bg-[#00BBA9]" },
        { id: 5, label: "음식기록", icon: "🍽️", color: "bg-[#FF6B6B]" }
    ];

    // 통계 데이터
    const stats = [
        { label: "저혈당", value: "2", unit: "회" },
        { label: "고혈당", value: "3", unit: "회" },
        { label: "안정구간", value: "70", unit: "%" },
        { label: "평균 혈당", value: "70", unit: "mg/dL" }
    ];

    // 음식 분석 데이터
    const foodAnalysis = [
        { id: 1, name: "식빵", details: "ΔBG +45 (GL 20, 점수 60)", status: "고혈당" },
        { id: 2, name: "식빵", details: "ΔBG +45 (GL 20, 점수 60)", status: "고혈당" },
        { id: 3, name: "식빵", details: "ΔBG +45 (GL 20, 점수 60)", status: "고혈당" }
    ];

    // 운동 분석 데이터
    const exerciseAnalysis = [
        { id: 1, name: "걷기 15분", details: "혈당 190 → 165 (-25)", status: "안정" },
        { id: 2, name: "식빵", details: "ΔBG +45 (GL 20, 점수 60)", status: "고혈당" },
        { id: 3, name: "식빵", details: "ΔBG +45 (GL 20, 점수 60)", status: "고혈당" }
    ];

    return (
        <div className="h-screen flex flex-col bg-[#F7F8FA]">
            {/* 상단 헤더 */}
            <div className="px-6 py-4">
                <h1 className="text-[24px] font-semibold text-black text-center">한눈에 보는 주간 리포트</h1>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 overflow-y-auto pb-20">
                {/* 캐릭터 섹션 */}
                <div className="px-6 pt-8 pb-2 flex items-center justify-between">
                    <div className="flex-1 pl-4">
                        <h2 className="text-[20px] font-bold text-black leading-tight mb-2">이단짝님은</h2>
                        <h2 className="text-[20px] font-bold text-black leading-tight mb-2">이번주에 저혈당이</h2>
                        <h2 className="text-[20px] font-bold text-black leading-tight">발생하지 않았어요</h2>
                    </div>
                    <div className="w-40 h-40 flex items-center justify-center">
                        <img 
                            src={doctorImage} 
                            alt="의사 캐릭터" 
                            className="w-40 h-40 object-contain"
                        />
                    </div>
                </div>

                {/* AI 요약 */}
                <div className="px-6 mb-6">
                    <div className="bg-gray-100 rounded-2xl p-4">
                        <p className="text-[14px] text-gray-700 leading-relaxed">
                            <span className="bg-white rounded-lg px-3 py-1 mr-2 font-medium">AI 요약</span>이번 주 평균 혈당은 108 mg/dL, 안정 구간(TIR)은 74%였습니다. 점심 식사 후 고혈당이 3회 발생했으며 저혈당은 발생하지 않았습니다. 규칙적인 저강도 운동 후 혈당이 안정적으로 회복되는 경향이 확인되었습니다.
                        </p>
                    </div>
                </div>

                {/* 통계 카드 */}
                <div className="px-6 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white text-[18px] rounded-2xl py-4 text-center border border-gray-100 shadow-sm">
                                <span className="text-[#8E8E8E] mb-2 mr-2">{stat.label}</span>
                                <span className="text-black">{stat.value}</span>
                                <span className="text-[#8E8E8E]">{stat.unit}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 주간 그래프 */}
                <div className="px-6 mb-6">
                    <h3 className="text-[18px] font-semibold text-black mb-4">주간 그래프</h3>
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                        <Chart />
                    </div>
                </div>

                {/* 음식 분석 */}
                <div className="px-6 mb-6 mx-6 bg-white rounded-2xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[18px] font-semibold text-black">음식 분석</h3>
                        <button className="bg-gray-100 px-4 py-2 rounded-xl text-[14px] text-gray-600">
                            더보기 +
                        </button>
                    </div>
                    <div className="space-y-3">
                        {foodAnalysis.map((item, index) => (
                            <div key={item.id} className="flex items-center justify-between bg-white rounded-2xl p-4 border border-gray-100">
                                <div className="flex items-center">
                                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-[12px] text-white font-medium">{index + 1}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-[16px] font-medium text-black">{item.name}</h4>
                                        <p className="text-[12px] text-gray-600">{item.details}</p>
                                    </div>
                                </div>
                                <div className={`px-4 py-2 rounded-full text-[12px] font-medium ${
                                    item.status === "고혈당" 
                                        ? "bg-[#FFE5E5] text-[#FF6B6B]" 
                                        : "bg-[#E8F8F6] text-[#00BBA9]"
                                }`}>
                                    {item.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 운동 분석 */}
                <div className="px-6 mb-6 mx-6 bg-white rounded-2xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[18px] font-semibold text-black">운동 분석</h3>
                        <button className="bg-gray-100 px-4 py-2 rounded-xl text-[14px] text-gray-600">
                            더보기 +
                        </button>
                    </div>
                    <div className="space-y-3">
                        {exerciseAnalysis.map((item, index) => (
                            <div key={item.id} className="flex items-center justify-between bg-white rounded-2xl p-4 border border-gray-100">
                                <div className="flex items-center">
                                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-[12px] text-white font-medium">{index + 1}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-[16px] font-medium text-black">{item.name}</h4>
                                        <p className="text-[12px] text-gray-600">{item.details}</p>
                                    </div>
                                </div>
                                <div className={`px-4 py-2 rounded-full text-[12px] font-medium ${
                                    item.status === "안정" 
                                        ? "bg-[#E8F8F6] text-[#00BBA9]" 
                                        : "bg-[#FFE5E5] text-[#FF6B6B]"
                                }`}>
                                    {item.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 하단 버튼들 */}
                <div className="px-6 mb-6">
                    <div className="flex justify-center gap-4">
                        <button className="bg-white border border-gray-200 rounded-full p-4 shadow-sm">
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </button>
                        <button className="bg-white border border-gray-200 rounded-full p-4 shadow-sm">
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* 배경 블러 오버레이 */}
            {isFloatingMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsFloatingMenuOpen(false)}
                />
            )}

            {/* 플로팅 액션 버튼들 */}
            <div className="fixed bottom-24 right-6 z-50">
                {/* 서브 액션 버튼들 */}
                {isFloatingMenuOpen && (
                    <div className="absolute bottom-16 right-0 space-y-5 pb-2">
                        {floatingActions.map((action, ) => (
                            <div
                                key={action.id}
                                className={`flex items-center transition-all duration-300 ease-out ${
                                    isFloatingMenuOpen 
                                        ? `translate-y-0 opacity-100` 
                                        : `translate-y-4 opacity-0`
                                }`}
                            >
                                <span className="bg-white text-gray-800 px-3 py-2 rounded-lg text-sm font-medium mr-3 shadow-lg whitespace-nowrap">
                                    {action.label}
                                </span>
                                <button
                                    className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center shadow-lg`}
                                    onClick={() => {
                                        setIsFloatingMenuOpen(false);
                                        navigate('/kid/note');
                                    }}
                                >
                                    <span className="text-xl">{action.icon}</span>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* 메인 플로팅 버튼 */}
                <button
                    className={`w-14 h-14 bg-[#2C3E50] rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 ${
                        isFloatingMenuOpen ? 'rotate-45' : 'rotate-0'
                    }`}
                    onClick={() => setIsFloatingMenuOpen(!isFloatingMenuOpen)}
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>

            {/* TabBar */}
            <div className="relative">
                <TabBar
                    active={active}
                    onHome={() => navigate("/parent/home")}
                    onQuest={() => navigate("/parent/quest")}
                    onReport={() => navigate("/parent/report")}
                    onMy={() => navigate("/kid/my")}
                />
                {/* TabBar 어둡게 하는 오버레이 */}
                {isFloatingMenuOpen && (
                    <div className="absolute inset-0 bg-black/40 transition-opacity duration-300" />
                )}
            </div>
        </div>
    );
}
