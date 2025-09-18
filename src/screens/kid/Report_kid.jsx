import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import kidReportBackground from "../../assets/kid-report-background.png";
import reportCharacter from "../../assets/report_character.png";
import TabBar from "../../components/TabBar.jsx";

export default function Report_kid() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const active =
        pathname.startsWith("/quest") ? "quest" :
            pathname.startsWith("/report") ? "report" :
                pathname.startsWith("/my") ? "my" :
                    "home";

    return (
        <div 
            className="h-screen flex flex-col"
            style={{
                backgroundImage: `url(${kidReportBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center -55px',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* 상단 제목 */}
            <div className="px-6 pt-4 pb-3 flex-shrink-0">
                <h1 className="text-[17px] font-semibold text-black text-center">
                    한눈에 보는 주간 리포트
                </h1>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 flex flex-col">
                {/* 상단 컨텐츠 (제목 + 캐릭터) */}
                <div className="px-6 pt-4 pb-4">
                    {/* 제목 */}
                    <div className="mb-3 ml-2 mt-4">
                        <h2 className="text-[18px] font-bold text-black">
                            단짝이의
                        </h2>
                        <h2 className="text-[18px] font-bold text-black">
                            일주일 혈당은?
                        </h2>
                    </div>

                    {/* 캐릭터 이미지 */}
                    <div className="flex justify-center pt-14">
                        <img 
                            src={reportCharacter} 
                            alt="걱정하는 단짝이" 
                            className="max-w-[220px] max-h-[220px] object-contain"
                        />
                    </div>
                </div>

                {/* 빈 공간 */}
                <div className="flex-1"></div>

                {/* 하단 고정 섹션 */}
                <div className="bg-transparent pb-25">
                    {/* 상태 박스 */}
                    <div className="px-6">
                        <div className="bg-white rounded-[8px] p-4 mb-2 border border-gray-200 shadow-sm">
                            <div className="text-center">
                                <p className="text-[16px] text-[#8E8E8E]">이번주 단짝이는</p>
                                <p className="text-[20px] font-bold text-black mb-2">경미 과혈당</p>
                            </div>

                            {/* 설명 텍스트 */}
                            <div className="text-center text-[14px] text-black leading-[20px]">
                                <p>이번 주 네 혈당은 평균적으로 아주 잘 유지됐어!</p>
                                <p>밥 먹고 나서 몇 번(3번) 혈당이 조금 올라갔지만,</p>
                                <p>너무 걱정할 정도는 아니야. 가볍게 몸을 움직일 때마다 </p>
                                <p>혈당이 차분하게 돌아오는 모습이 보여서 참 잘했어! </p>
                            </div>
                        </div>
                    </div>

                    {/* 통계 카드들 */}
                    <div className="grid grid-cols-4 gap-4 mb-4 mx-6">
                        {/* 저혈당 */}
                        <div className="bg-white rounded-[16px] p-4 text-center shadow-sm">
                            <p className="text-[12px] text-black mb-1">저혈당</p>
                            <p className="text-[14px] font-bold text-[#8E8E8E]">
                                <span className="text-[20px] font-semibold text-black">2</span>
                                <span className="text-[14px] text-[#8E8E8E] font-normal">{" 회"}</span>
                            </p>
                        </div>

                        {/* 고혈당 */}
                        <div className="bg-white rounded-[16px] p-4 text-center shadow-sm">
                            <p className="text-[12px] text-[#E5412A] mb-1">고혈당</p>
                            <p className="text-[14px] font-bold text-[#E5412A]">
                                <span className="text-[20px] font-semibold text-black">3</span>
                                <span className="text-[14px] text-[#8E8E8E] font-normal">{" 회"}</span>
                            </p>
                        </div>

                        {/* 안정구간 */}
                        <div className="bg-white rounded-[16px] p-4 text-center shadow-sm">
                            <p className="text-[12px] text-black mb-1">안정구간</p>
                            <p className="text-[14px] font-bold text-[#8E8E8E]">
                                <span className="text-[20px] font-semibold text-black">70</span>
                                <span className="text-[14px] text-[#8E8E8E] font-normal">{" %"}</span>
                            </p>
                        </div>

                        {/* 평균혈당 */}
                        <div className="bg-white rounded-[16px] p-4 text-center shadow-sm">
                            <p className="text-[12px] text-[#00BBA9] mb-1">평균혈당</p>
                            <p className="text-[14px] font-bold text-[#00BBA9]">
                                <span className="text-[20px] font-semibold text-black">70</span>
                                <span className="text-[8px] text-[#8E8E8E] font-normal">{"mg/dL"}</span>
                            </p>
                        </div>
                    </div>

                    {/* 액션 버튼 */}
                    <div className="px-6">
                        <button 
                            onClick={() => navigate("/badge")}
                            className="w-full h-[48px] bg-[#00BBA9] rounded-[12px] text-[#FFFFFF] text-[18px] flex items-center justify-between px-6"
                        >
                            <span>금주의 배지 확인하기</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* TabBar */}
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
