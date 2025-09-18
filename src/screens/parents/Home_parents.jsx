import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowDown from "../../assets/arrow-down.png";
import refreshIcon from "../../assets/refresh.png";
import Chart from "../../components/charts/Chart";

// 탭바를 분리했지만, 한 파일에 같이 두고 싶으면 아래 컴포넌트를 같은 파일 최하단에 둬도 OK
import TabBar from "../../components/TabBar";
import { fetchBloodSugarData, fetchUserData } from "../../utils/api";

export default function ParentHomePage({ score = 97 }) {
    const navigate = useNavigate();
    const [selectedDate] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState(false);
    const [userData, setUserData] = useState({
        name: '이단짝',
        score: 97,
        bloodSugar: {
            current: 57,
            average: 57,
            min: 82,
            max: 105,
            spikes: 2
        }
    });

    // 플로팅 메뉴 액션 버튼들
    const floatingActions = [
        { id: 1, label: "운동 기록", icon: "🔥", color: "bg-[#FF6B6B]" },
        { id: 2, label: "혈당 기록", icon: "💧", color: "bg-[#00BBA9]" },
        { id: 3, label: "체중 기록", icon: "💬", color: "bg-[#FF6B6B]" },
        { id: 4, label: "메모 하기", icon: "📝", color: "bg-[#00BBA9]" },
        { id: 5, label: "음식기록", icon: "🍽️", color: "bg-[#FF6B6B]" }
    ];

    const currentMonthLabel = useMemo(() => {
        // 예: '9월'
        return selectedDate.toLocaleDateString("ko-KR", { month: "long" });
    }, [selectedDate]);

    const weekDays = useMemo(
        () => ["월", "화", "수", "목", "금", "토"],
        []
    );

    // 현재 주의 날짜들 계산
    const weekDates = useMemo(() => {
        const today = new Date();
        const currentDay = today.getDay(); // 0: 일요일, 1: 월요일, ...
        const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay; // 월요일까지의 오프셋
        
        return weekDays.map((_, index) => {
            const date = new Date(today);
            date.setDate(today.getDate() + mondayOffset + index);
            return date.getDate();
        });
    }, [weekDays]);

    // 오늘 날짜 확인
    const todayDate = new Date().getDate();

    const goMonthCalendar = () => {
        // 필요에 맞게 라우팅 경로 조정
        navigate(`/calendar?month=${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}`);
    };

    // 실시간 시간 업데이트
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // 초기 데이터 로드
    useEffect(() => {
        handleUpdate();
    }, [selectedDate]);

    const handleUpdate = async () => {
        try {
            const userId = localStorage.getItem('userId') || 'user123';
            const dateStr = selectedDate.toISOString().split('T')[0];
            
            // 사용자 데이터와 혈당 데이터를 동시에 로드
            const [userResult, bloodSugarResult] = await Promise.all([
                fetchUserData(userId),
                fetchBloodSugarData(userId, dateStr)
            ]);
            
            if (userResult && bloodSugarResult) {
                setUserData({
                    name: userResult.name || '이단짝',
                    score: userResult.score || 97,
                    bloodSugar: {
                        current: bloodSugarResult.current || 57,
                        average: bloodSugarResult.average || 57,
                        min: bloodSugarResult.min || 82,
                        max: bloodSugarResult.max || 105,
                        spikes: bloodSugarResult.spikes || 2
                    }
                });
            }
        } catch (error) {
            console.log('데이터 업데이트 중 오류:', error);
            // 오류 발생 시 기본값 유지
        }
    };

    return (
        <div className="h-screen bg-white flex flex-col">
            <div className="pt-safe-top mt-4 px-6 py-4 bg-white">
                <button
                    onClick={goMonthCalendar}
                    className="mx-auto flex items-center justify-center gap-1"
                    aria-label="열린 달력으로 이동"
                >
                    <h1 className="text-xl font-bold text-black">{currentMonthLabel}</h1>
                    <div className="w-5 h-5 ml-2 bg-[#EEEEEE] rounded-full flex items-center justify-center">
                        <img
                            src={arrowDown}
                            alt="arrow-down"
                            className="w-3 h-3"
                        />
                    </div>
                </button>
            </div>

            {/* 요일 버튼 (월~일) */}
            <div className="px-6 py-3 bg-white">
                <div className="flex items-center justify-between">
                    {weekDays.map((d, i) => {
                        const isToday = weekDates[i] === todayDate;
                        return (
                            <button
                                key={i}
                                className={`flex flex-col gap-4 items-center justify-center rounded-full w-12 p-4 transition-colors ${
                                    isToday 
                                        ? 'bg-[#00BBA9] hover:bg-[#009688]' 
                                        : 'bg-[#F5F5F5] hover:bg-gray-300'
                                }`}
                                onClick={() => {
                                    // 필요시 해당 요일로 selectedDate 이동 로직 연결
                                }}
                            >
                                <span className={`text-md font-medium mb-1 ${
                                    isToday ? 'text-white' : 'text-gray-600'
                                }`}>
                                    {d}
                                </span>
                                <span className={`text-md font-bold ${
                                    isToday ? 'text-white' : 'text-black'
                                }`}>
                                    {weekDates[i]}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 overflow-y-auto pb-20">
                <div className="px-6 pt-4 rounded-[20px]">
                    {/* 타이틀 박스: 혈당지수 + 업데이트 */}
                    <div 
                        onClick={() => navigate('/report')}
                        className="bg-[#1B3759] rounded-2xl p-6 text-white mb-4 cursor-pointer hover:bg-[#1e3d64] transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">
                                {userData.name}님의 혈당건강지수는?
                            </h3>
                            
                            <div className="flex items-center gap-2">
                                <span className="text-[#CACACA] text-lg">
                                    {currentTime.toLocaleTimeString('ko-KR', { 
                                        hour: '2-digit', 
                                        minute: '2-digit',
                                        hour12: false 
                                    })}
                                </span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdate();
                                    }}
                                    className="flex items-center gap-1 text-[#CACACA] py-1 rounded-full text-lg hover:bg-white/30 transition-colors"
                                >
                                    <img src={refreshIcon} alt="refresh" className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="mt-2 text-4xl font-bold">
                            {userData.score}
                            <span className="text-xl font-normal">점</span>
                        </div>
                    </div>

                    {/* 차트 */}
                    <div className="mb-4">
                        <Chart />
                    </div>
                </div>

                <div className="bg-[#F7F8FA] rounded-t-2xl p-4 border-t border-gray-200">
                     {/* 간단 보고서 */}
                     <div className="bg-white rounded-2xl p-4">
                         <h3 className="text-black text-lg font-medium my-4 text-center">오늘은 혈당이 전반적으로 안정적이에요!</h3>
                         <div className="flex gap-4 mb-4 mx-2">
                            <div className="flex-1 px-3 py-4 border border-gray-200 rounded-lg text-center">
                                현재수치 <span className="font-bold">{userData.bloodSugar.current}</span><span className="text-gray-500">mg/dL</span>
                            </div>
                            <div className="flex-1 px-3 py-4 border border-gray-200 rounded-lg text-center">
                                평균혈당 <span className="font-bold">{userData.bloodSugar.average}</span><span className="text-gray-500">mg/dL</span>
                            </div>
                         </div>
                         <div className="grid grid-cols-3 gap-2 mb-2">
                             <div className="bg-[#386dae19] rounded-2xl mx-2 px-1 py-4 shadow-sm text-center border border-gray-200">
                                 <h3 className="text-black text-md font-medium mb-4">{"최저혈당 >"}</h3>
                                 <p className="text-2xl font-bold text-black">
                                     {userData.bloodSugar.min} <span className="text-xs font-normal text-gray-500">mg/dL</span>
                                 </p>
                             </div>
                             <div className="bg-[#00BBA919] rounded-2xl mx-2 px-1 py-4 shadow-sm text-center border border-gray-200">
                                 <h3 className="text-[#00BBA9] text-md font-medium mb-4">{"스파이크 >"}</h3>
                                 <p className="text-2xl font-bold text-black">
                                     {userData.bloodSugar.spikes}회 <span className="text-xs font-normal text-gray-500">/3회</span>
                                 </p>
                             </div>
                             <div className="bg-[#F66D5619] rounded-2xl mx-2 px-1 py-4 shadow-sm text-center border border-gray-200">
                                 <h3 className="text-[#F66D56] text-md font-medium mb-4">{"최고혈당 >"}</h3>
                                 <p className="text-2xl font-bold text-black">
                                     {userData.bloodSugar.max} <span className="text-xs font-normal text-gray-500">mg/dL</span>
                                 </p>
                             </div>
                         </div>
                     </div>

                    {/* 오늘의 돌봄 힌트 */}
                    <div className="bg-white rounded-2xl mt-4 py-8 px-6">
                        <h3 className="text-black text-lg font-medium mb-4">오늘의 돌봄 힌트</h3>
                        
                        <div className="space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h4 className="text-black text-md font-medium mb-1">오늘 하루 퀘스트 완료</h4>
                                    <p className="text-gray-600 text-sm">아이에게 칭찬 한마디 해주세요.</p>
                                </div>
                                <div className="ml-4">
                                    <div className="w-6 h-6 bg-[#00BBA9] rounded-[5px] flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-gray-200 my-4"></div>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h4 className="text-black text-md font-medium mb-1">점심 뒤에 혈당이 조금 상승</h4>
                                    <p className="text-gray-600 text-sm">내일은 반찬에 단백질을 조금 더 넣어주시면 좋아요.</p>
                                </div>
                                <div className="ml-4">
                                    <div className="w-6 h-6 bg-gray-200 rounded-[5px] flex items-center justify-center">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 이단짝의 기록 */}
                    <div className="bg-white rounded-2xl mt-4 py-8 px-6">
                        <h3 className="text-black text-lg font-medium mb-6">{userData.name}의 기록</h3>
                        
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center mb-1">
                                        <span className="bg-[#00BBA9] text-white text-xs px-2 py-1 rounded-md mr-2">운동</span>
                                        <span className="text-black font-medium">새벽볔 러닝</span>
                                    </div>
                                    <p className="text-gray-600 text-sm">2시간 15분 · 격하게</p>
                                </div>
                                <div className="ml-4">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            <div className="h-px bg-gray-200"></div>

                            <div className="flex items-center">
                                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center mb-1">
                                        <span className="bg-[#F66D56] text-white text-xs px-2 py-1 rounded-md mr-2">식단</span>
                                        <span className="text-black font-medium">김치찌개, 밥, 계란말이</span>
                                    </div>
                                    <p className="text-gray-600 text-sm">300kcal</p>
                                </div>
                                <div className="ml-4">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
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
                        {floatingActions.map((action) => (
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
                                        navigate('/note');
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

            {/* 탭바 */}
            <div className="relative">
                <TabBar
                    active="home"
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
