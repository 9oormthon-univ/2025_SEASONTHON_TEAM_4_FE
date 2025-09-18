import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TabBar from "../../components/TabBar.jsx";

export default function QuestCheckPage() {
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);
    const { pathname } = useLocation();

    const active =
        pathname.startsWith("/kid/home") ? "home" :
            pathname.startsWith("/kid/report") ? "report" :
                pathname.startsWith("/kid/my") ? "my" :
                    "quest";

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <header className="px-6 py-4 bg-white flex items-center justify-between">
                <button
                    onClick={handleBack}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    type="button"
                    aria-label="뒤로가기"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M15 18L9 12L15 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <h1 className="text-lg font-bold text-black">퀘스트 확인</h1>
                <div className="w-6" />
            </header>

            <main className="flex-1 px-6 py-8 space-y-8">

                {/* 사진 업데이트 박스 */}
                <section className="flex flex-col items-center gap-3">
                    <div
                        className="w-40 h-40 rounded-2xl border border-dashed border-[#CACACA] bg-white overflow-hidden relative"
                        aria-label="사진 업데이트"
                    >
                        {/* 체크보드 배경 */}
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    "linear-gradient(45deg, #F2F2F2 25%, transparent 25%), linear-gradient(-45deg, #F2F2F2 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #F2F2F2 75%), linear-gradient(-45deg, transparent 75%, #F2F2F2 75%)",
                                backgroundSize: "16px 16px",
                                backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                            }}
                        />

                        <button
                            type="button"
                            className="absolute bottom-2 right-2 rounded-full bg-black/60 text-white text-xs px-2 py-1"
                        >
                            사진 업데이트
                        </button>
                    </div>

                    {/* 제목/시간 */}
                    <div className="text-center">
                        <div className="text-base font-semibold text-gray-900">저녁 전 간식</div>
                        <div className="text-xs text-gray-500">2025년 5월 3일 오후 7시 30분</div>
                    </div>
                </section>

                {/* 메뉴 확인 박스 */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-900 mb-2">메뉴</h2>
                    <div className="flex items-center justify-between rounded-2xl bg-gray-100 px-4 py-3">
                        <span className="text-sm font-semibold text-black">치킨</span>
                        <span className="rounded-full bg-teal-500 text-white text-xs font-semibold px-3 py-1">
        총 750Kcal
      </span>
                    </div>
                </section>

                {/* 혈당예측 박스 */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-900 mb-3">혈당예측</h2>

                    <div className="rounded-2xl bg-white px-4 py-6 ring-1 ring-inset ring-[#EEEEEE]">
                        <div className="relative w-full max-w-xs mx-auto">
                            {/* 반원 게이지 (SVG) */}
                            <svg viewBox="0 0 200 110" width="100%" height="110" aria-hidden="true">
                                {/* 트랙 */}
                                <path
                                    d="M20 100 A 80 80 0 0 1 180 100"
                                    fill="none"
                                    stroke="#E6F4F1"
                                    strokeWidth="16"
                                    strokeLinecap="round"
                                    pathLength="100"
                                />
                                <path
                                    d="M20 100 A 80 80 0 0 1 180 100"
                                    fill="none"
                                    stroke="#00BBA9"
                                    strokeWidth="16"
                                    strokeLinecap="round"
                                    pathLength="100"
                                    strokeDasharray={`${(12 / 40) * 100} 100`}
                                />
                            </svg>

                            {/* 중앙 수치 */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-2">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-black">
                                        +12 <span className="text-sm font-normal text-[#8E8E8E]">mg/dL</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 설명 문구 */}
                        <p className="mt-4 font-semibold text-center text-sm text-black bg-gray-100 rounded-xl px-4 py-3">
                            스파이크가 발생하지 않을 것으로 예측됐어요
                        </p>
                    </div>
                </section>
            </main>


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
