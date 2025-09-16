import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import Chart from "../../components/charts/Chart";
import arrowDown from "../../assets/arrow-down.png";
import refreshIcon from "../../assets/refresh.png";

// 탭바를 분리했지만, 한 파일에 같이 두고 싶으면 아래 컴포넌트를 같은 파일 최하단에 둬도 OK
import TabBar from "../../components/TabBar";

export default function ParentHomePage({ userName = "부모님", score = 97 }) {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const currentMonthLabel = useMemo(() => {
        // 예: '9월'
        return selectedDate.toLocaleDateString("ko-KR", { month: "long" });
    }, [selectedDate]);

    const weekDays = useMemo(
        () => ["월", "화", "수", "목", "금", "토", "일"],
        []
    );

    const goMonthCalendar = () => {
        // 필요에 맞게 라우팅 경로 조정
        navigate(`/calendar?month=${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}`);
    };

    const handleUpdate = () => {
        // 새로고침/리패치 자리. 일단 하드 리로드 예시:
        // window.location.reload();
        // 혹은 데이터만 재요청하도록 로직 연결
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* 타이틀바: '9월' + arrow-down.png */}
            <div className="pt-safe-top px-6 py-4 bg-white">
                <button
                    onClick={goMonthCalendar}
                    className="mx-auto flex items-center justify-center"
                    aria-label="열린 달력으로 이동"
                >
                    <h1 className="text-xl font-bold text-black">{currentMonthLabel}</h1>
                    <img
                        src={arrowDown}
                        alt="arrow-down"
                        className="w-5 h-5 ml-2 opacity-70"
                    />
                </button>
            </div>

            {/* 요일 버튼 (월~일) */}
            <div className="px-6 py-3 bg-white">
                <div className="flex items-center justify-between">
                    {weekDays.map((d, i) => (
                        <button
                            key={i}
                            className="text-sm font-medium text-gray-600 hover:text-black px-2 py-2 rounded-full hover:bg-gray-100 transition-colors"
                            onClick={() => {
                                // 필요시 해당 요일로 selectedDate 이동 로직 연결
                            }}
                        >
                            {d}
                        </button>
                    ))}
                </div>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 flex flex-col px-6 pt-4 rounded-t-3xl">
                {/* 타이틀 박스: 혈당지수 + 업데이트 */}
                <div className="bg-slate-700 rounded-2xl p-6 text-white mb-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">
                            {userName}님의 혈당지수는?
                        </h3>
                        <button
                            onClick={handleUpdate}
                            className="flex items-center gap-1 bg-white/20 text-[#e5e5e5] px-3 py-1 rounded-full text-sm hover:bg-white/30 transition-colors"
                        >
                            업데이트
                            <img src={refreshIcon} alt="refresh" className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="mt-2 text-4xl font-bold">
                        {score}
                        <span className="text-xl font-normal">점</span>
                    </div>
                </div>

                {/* 차트 */}
                <div className="mb-4">
                    <Chart />
                </div>

                {/* 최저/최고 카드 (원하면 유지/삭제) */}
                <div className="grid grid-cols-2 gap-4 mb-2">
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                        <h3 className="text-gray-600 text-sm mb-1">최저 혈당</h3>
                        <p className="text-2xl font-bold text-black">
                            82 <span className="text-base text-gray-500">mg/dL</span>
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                        <h3 className="text-gray-600 text-sm mb-1">최고 혈당</h3>
                        <p className="text-2xl font-bold text-black">
                            127 <span className="text-base text-gray-500">mg/dL</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* 플로팅 추가버튼 (원하면 유지) */}
            <button
                className="fixed bottom-24 right-6 w-14 h-14 bg-slate-700 rounded-full flex items-center justify-center shadow-lg"
                aria-label="추가"
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </button>

            {/* 탭바 */}
            <TabBar
                active="home"
                onHome={() => navigate("/")}
                onQuest={() => navigate("/quest")}
                onReport={() => navigate("/parent/report")}
                onMy={() => navigate("/my")}
            />
        </div>
    );
}
