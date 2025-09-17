import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

        for (let i = 6; i >= 0; i--) {
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
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* 상단 월 표시 */}
            <div className="pt-safe-top px-6 py-4 bg-white">
                <div className="flex items-center justify-center">
                    <h1 className="text-xl font-bold text-black">{getCurrentMonth()}</h1>
                    <svg className="w-5 h-5 ml-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* 일주일 날짜 선택 */}
            <div className="px-6 py-4 bg-white">
                <div className="flex justify-between items-center">
                    {weekDates.map((date, index) => {
                        const { day, dayName } = formatDate(date);
                        const isSelected = isSameDate(date, selectedDate);

                        return (
                            <button
                                key={index}
                                onClick={() => setSelectedDate(date)}
                                className={`flex flex-col items-center py-3 px-2 rounded-full min-w-[48px] transition-colors ${
                                    isSelected
                                        ? 'bg-teal-500 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xs font-medium mb-1">{dayName}</span>
                                <span className="text-lg font-bold">{day}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 메인 컨텐츠 영역 */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
                {/* 말풍선 */}
                <div className="relative mb-2">
                    <div className="bg-white rounded-2xl px-6 py-4 shadow-sm">
                        <p className="text-gray-800 text-center">단짝아, 아주 편안해<br />그대로만 해</p>
                    </div>
                    {/* 삼각형 그림자 */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[1px] w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-gray-200"></div>
                    {/* 삼각형 */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-white"></div>
                </div>

                {/* 캐릭터 */}
                <div className="mb-8">
                    <DotLottieReact
                        src="https://lottie.host/5dc58b0f-f353-4952-9304-c506e85d5441/svt4OB3D4V.lottie"
                        loop
                        autoplay
                    />
                </div>

                {/* 혈당 수치 */}
                <div className="text-center mb-4">
                    <span className="text-6xl font-bold text-black">83</span>
                    <span className="text-2xl text-gray-500 ml-2">mg/dL</span>
                </div>

                {/* 업데이트 버튼 */}
                <button className="bg-white border border-gray-200 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
                    <span className="text-sm text-gray-600">업데이트</span>
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>

            {/* 최저/최고 혈당 카드 */}
            <div className="px-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                        <h3 className="text-gray-600 text-sm mb-1">최저 혈당</h3>
                        <p className="text-2xl font-bold text-black">82 <span className="text-base text-gray-500">mg/dL</span></p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                        <h3 className="text-gray-600 text-sm mb-1">최고 혈당</h3>
                        <p className="text-2xl font-bold text-black">127 <span className="text-base text-gray-500">mg/dL</span></p>
                    </div>
                </div>
            </div>

            {/* 플로팅 추가 버튼 */}
            <button className="fixed bottom-24 right-6 w-14 h-14 bg-slate-700 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </button>

            {/* 바텀 네비게이션 */}
            <TabBar
                active={active}
                onHome={() => navigate("/Home_kid")}
                onQuest={() => navigate("/quest")}
                onReport={() => navigate("/report")}
                onMy={() => navigate("/my")}
            />
        </div>
    );
}
