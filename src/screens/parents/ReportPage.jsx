// src/pages/ParentReportPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "../../components/charts/Chart";

export default function ReportPage() {
    const navigate = useNavigate();
    const [analyzeData, setAnalyzeData] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleBack = () => navigate(-1);

    useEffect(() => {
        const fetchAnalyzeData = async () => {
            try {
                const response = await fetch(
                    "https://carie-uninflated-conjointly.ngrok-free.app/analyze",
                    {
                        headers: {
                            "ngrok-skip-browser-warning": "1234",
                        },
                    }
                );
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                // 서버 응답 형식: { result: { "단짝이의 평가": "...", ... } } 라고 가정
                setAnalyzeData(data?.result ?? null);
            } catch (err) {
                console.error("Failed to fetch analyze data:", err);
                setAnalyzeData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalyzeData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* 헤더 */}
            <div className="flex items-center justify-between px-6 py-4 bg-white">
                <button onClick={handleBack} className="p-2" type="button">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-lg font-medium text-black">자세히</h1>
                <div className="w-10" />
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 px-6 py-4">
                {/* 혈당건강지수 카드 */}
                <div className="bg-teal-500 rounded-2xl p-6 text-white mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-medium">이단짝님의 혈당건강지수</h2>
                        <button
                            className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm flex items-center gap-1 text-[#8E8E8E]"
                            type="button"
                            onClick={() => window.location.reload()}
                        >
                            업데이트
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    </div>
                    <div className="text-5xl font-bold">
                        97<span className="text-2xl font-normal">점</span>
                    </div>
                </div>

                {/* 차트 */}
                <div className="mb-6">
                    <Chart />
                </div>

                {/* 알림 카드들 */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500" />
                            <p className="mt-2 text-gray-600">데이터를 불러오는 중...</p>
                        </div>
                    ) : analyzeData ? (
                        <>
                            {/* 혈당 스파이크 */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-medium text-black mb-1">혈당 스파이크</h3>
                                        <p className="text-sm text-gray-600">{analyzeData["혈당 스파이크"]}</p>
                                    </div>
                                </div>
                            </div>

                            {/* 평균 혈당 */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-medium text-black mb-1">평균 혈당</h3>
                                        <p className="text-sm text-gray-600">{analyzeData["평균 혈당"]}</p>
                                    </div>
                                </div>
                            </div>

                            {/* 최고 혈당 */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-medium text-black mb-1">최고 혈당</h3>
                                        <p className="text-sm text-gray-600">{analyzeData["최고 혈당"]}</p>
                                    </div>
                                </div>
                            </div>

                            {/* 단짝이의 평가 */}
                            <div className="bg-teal-50 rounded-2xl p-4 shadow-sm border border-teal-100">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-medium text-teal-800 mb-1">단짝이의 평가</h3>
                                        <p className="text-sm text-teal-700">{analyzeData["단짝이의 평가"]}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-600">데이터를 불러올 수 없습니다.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
