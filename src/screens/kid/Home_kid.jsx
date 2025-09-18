import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import backgroundImg from "../../assets/background.png";
import refreshIcon from "../../assets/coin.png";
import TabBar from "../../components/TabBar.jsx";

export default function KidHomePage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const active =
        pathname.startsWith("/quest") ? "quest" :
            pathname.startsWith("/report") ? "report" :
                pathname.startsWith("/my") ? "my" :
                    "home";

    const getCurrentMonth = () => {
        return selectedDate.toLocaleDateString('ko-KR', { month: 'long' });
    };

    const getWeekDates = () => {
        const today = new Date();
        const dates = [];

        for (let i = 5; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            dates.push(date);
        }

        return dates;
    };

    const formatDate = (date) => {
        return {
            day: date.getDate(),
            dayName: date.toLocaleDateString('ko-KR', { weekday: 'short' })
        };
    };

    const isSameDate = (date1, date2) => {
        return date1.toDateString() === date2.toDateString();
    };

    const weekDates = getWeekDates();

    return (
        <div 
            className="h-screen flex flex-col relative"
            style={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* 상단 월 표시 */}
            <div className="pt-safe-top mt-4 px-6 py-4 bg-transparent backdrop-blur-sm">
                <button
                    className="mx-auto flex items-center justify-center gap-1"
                    aria-label="달력 보기"
                >
                    <h1 className="text-xl font-bold text-black">{getCurrentMonth()}</h1>
                    <div className="w-5 h-5 ml-2 bg-[#EEEEEE] rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </button>
            </div>

            {/* 일주일 날짜 선택 */}
            <div className="px-6 py-3 bg-transparent backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    {weekDates.map((date, index) => {
                        const { day, dayName } = formatDate(date);
                        const isSelected = isSameDate(date, selectedDate);

                        return (
                            <button
                                key={index}
                                onClick={() => setSelectedDate(date)}
                                className={`flex flex-col gap-4 items-center justify-center rounded-full px-4 py-5 transition-colors ${
                                    isSelected
                                        ? 'bg-[#E5412A] hover:bg-[#E5412A]'
                                        : 'bg-white hover:bg-gray-300'
                                }`}
                            >
                                <span className={`text-md font-medium ${
                                    isSelected ? 'text-white' : 'text-gray-600'
                                }`}>
                                    {dayName}
                                </span>
                                <span className={`text-md font-bold ${
                                    isSelected ? 'text-white' : 'text-black'
                                }`}>
                                    {day}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 메인 컨텐츠 영역 */}
            <div className="flex-1 overflow-y-auto pb-20">
                <div className="px-6 pt-4 rounded-[20px]">
                    {/* 타이틀 박스: 혈당수치 + 업데이트 */}
                    <div className="p-1 text-white mb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-medium text-black">
                                    지금 나의 수치
                                </h3>
                                <div className="flex items-center gap-1 border text-black border-gray-200 rounded-full p-2 bg-white">
                                    <span className="text-sm">업데이트</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 bg-white rounded-full px-3 py-2 shadow-md border border-gray-200">
                                <img src={refreshIcon} alt="refresh" className="w-4 h-4" />
                                <span className="text-xs font-medium text-black">3개</span>
                            </div>
                        </div>
                        <div className="mt-2 text-4xl font-bold text-black">
                            257
                            <span className="text-xl font-normal text-[#8E8E8E]"> mg/dL</span>
                        </div>
                    </div>

                    {/* 캐릭터 영역 */}
                    <div className="flex justify-center mb-4">
                        <div className="w-60 h-60">
                            <DotLottieReact
                                src="https://lottie.host/3ffa87b5-a9ac-4f52-b8f4-392cd2712988/KE4JAd1KWs.lottie"
                                loop
                                autoplay
                            />
                        </div>
                    </div>

                    
                </div>

                <div className="fixed bottom-20 left-0 right-0 backdrop-blur-sm">
                    {/* 게이지 영역 */}
                    <div className="px-6 mb-2">
                        <div className="relative">
                            {/* 말풍선 */}
                            <div className="absolute -top-16 right-4 bg-white rounded-md px-4 py-2 shadow-sm">
                                <p className="text-black text-sm font-medium">너무 위험해!</p>
                                {/* 말풍선 꼬리 */}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white"></div>
                            </div>
                            
                            {/* 게이지 바 */}
                            <div className="relative bg-gray-300 rounded-full h-6 overflow-hidden border-white border-2">
                                {/* 위험 구간 (빨간색) */}
                                <div className="absolute left-0 top-0 h-full w-[86%] bg-[#E5412A] rounded-full"></div>
                                
                                {/* 안전 구간 (회색) */}
                                <div className="absolute right-0 top-0 h-full w-[14%] bg-gray-300 rounded-r-full"></div>
                                
                                {/* 현재 위치 표시 (흰색 동그라미) */}
                                <div className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-md border-2 border-gray-300" 
                                     style={{ left: 'calc(83% - 10px)' }}>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 간단 보고서 */}
                    <div className="rounded-2xl p-4">
                        <div className="grid grid-cols-3 gap-1 mb-2">
                            <div className="bg-white rounded-2xl mx-1 px-1 py-6 shadow-sm text-center border border-gray-200">
                                <h3 className="text-black text-lg font-medium mb-4">{"최저혈당"}</h3>
                                <p className="text-2xl font-bold text-black">
                                    82 <span className="text-xs font-normal text-gray-500">mg/dL</span>
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl mx-1 px-1 py-6 shadow-sm text-center border border-gray-200">
                                <h3 className="text-[#00BBA9] text-lg font-medium mb-4">{"스파이크"}</h3>
                                <p className="text-2xl font-bold text-black">
                                    2회 <span className="text-xs font-normal text-gray-500">/3회</span>
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl mx-1 px-1 py-6 shadow-sm text-center border border-gray-200">
                                <h3 className="text-[#F66D56] text-lg font-medium mb-4">{"최고혈당"}</h3>
                                <p className="text-2xl font-bold text-black">
                                    127 <span className="text-xs font-normal text-gray-500">mg/dL</span>
                                </p>
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
