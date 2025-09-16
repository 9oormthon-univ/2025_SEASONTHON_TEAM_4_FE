import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Chart from "../../components/charts/Chart";

export default function KidHomePage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();

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
        <div className="min-h-screen bg-white flex flex-col">
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
            <div className="flex-1 flex flex-col px-6 pt-4 rounded-t-3xl">
                {/* 혈당건강지수 카드 */}
                <div
                    className="bg-slate-700 rounded-2xl p-6 text-white cursor-pointer hover:bg-slate-600 transition-colors"
                    onClick={() => navigate('/parent/report')}
                >
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium">자녀의 혈당건강지수</h3>
                        <button className="bg-white bg-opacity-20 text-[#8E8E8E] px-3 py-1 rounded-full text-sm flex items-center gap-1">
                            업데이트
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    </div>
                    <div className="text-4xl font-bold">97<span className="text-xl font-normal">점</span></div>
                </div>

                {/* 그래프 영역 */}
                <div className="">
                    <Chart />
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
            </div>



            {/* 플로팅 추가 버튼 */}
            <button className="fixed bottom-24 right-6 w-14 h-14 bg-slate-700 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </button>

            {/* 바텀 네비게이션 */}
            <div className="bg-white border-t border-gray-200 px-6 py-2 pb-safe-bottom">
                <div className="flex justify-around items-center">
                    <button className="flex flex-col items-center py-2 px-4">
                        <div className="w-6 h-6 mb-1">
                            <svg className="w-full h-full text-teal-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                            </svg>
                        </div>
                        <span className="text-xs text-teal-500 font-medium">홈</span>
                    </button>

                    <button
                        onClick={() => navigate('/quest')}
                        className="flex flex-col items-center py-2 px-4"
                    >
                        <div className="w-6 h-6 mb-1">
                            <svg className="w-full h-full text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="text-xs text-gray-400">퀘스트</span>
                    </button>

                    <button className="flex flex-col items-center py-2 px-4">
                        <div className="w-6 h-6 mb-1">
                            <svg className="w-full h-full text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <span className="text-xs text-gray-400">리포트</span>
                    </button>

                    <button className="flex flex-col items-center py-2 px-4">
                        <div className="w-6 h-6 mb-1">
                            <svg className="w-full h-full text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <span className="text-xs text-gray-400">마이</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
