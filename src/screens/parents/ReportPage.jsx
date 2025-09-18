import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "../../components/charts/Chart";
import button_on from "../../assets/button_on.png";
import button_off from "../../assets/button_off.png";

export default function ReportPage() {
    const navigate = useNavigate();
    const [analyzeData, setAnalyzeData] = useState(null);
    const [loading, setLoading] = useState(true);

    // 하단 리포트 카드 (for CheckPint)
    const [expanded, setExpanded] = useState({
        spike: false,
        avg: false,
        max: false,
        min: false,
    });

    const toggleCard = (key) =>
        setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

    const spikeDetails = useMemo(
        () => [
            {
                title: "1회차",
                time: "오후 1시 20분",
                reason: "점심 식사 후 탄수화물 섭취량이 많아요",
            },
            {
                title: "2회차",
                time: "오후 8시 40분",
                reason: "저녁 운동 전 간식을 많이 먹었어요",
            },
        ],
        []
    );

    const handleBack = () => navigate(-1);

    useEffect(() => {
        const fetchAnalyzeData = async () => {
            try {
                const response = await fetch(
                    "https://carie-uninflated-conjointly.ngrok-free.app/analyze",
                    { headers: { "ngrok-skip-browser-warning": "1234" } }
                );
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
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
        <div className="min-h-screen bg-white flex flex-col">
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
                        <div className="CheckPint grid">
                            {/* 1. 혈당 스파이크 */}
                            <div className={`CheckPint box ${expanded.spike ? "on" : ""}`}>
                                <button
                                    className="toggle"
                                    onClick={() => toggleCard("spike")}
                                    type="button"
                                    aria-expanded={expanded.spike}
                                    aria-controls="spike-detail"
                                >
                                    <img src={expanded.spike ? button_on : button_off} alt="" />
                                </button>
                                <p className="CheckPint title">혈당 스파이크 : 2회</p>
                                <p className="CheckPint description">오늘 2번의 급상승이 있었어요</p>

                                <div id="spike-detail" className={`detail ${expanded.spike ? "open" : ""}`}>
                                    {spikeDetails.map((d, i) => (
                                        <div key={i} className="detail-card">
                                            <div className="dot" />
                                            <div className="lines">
                                                <p className="row-strong">{d.title}</p>
                                                <p className="row">시간 : {d.time}</p>
                                                <p className="row">원인 : {d.reason}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 2. 평균 혈당 */}
                            <div className={`CheckPint box ${expanded.avg ? "on" : ""}`}>
                                <button
                                    className="toggle"
                                    onClick={() => toggleCard("avg")}
                                    type="button"
                                    aria-expanded={expanded.avg}
                                    aria-controls="avg-detail"
                                >
                                    <img src={expanded.avg ? button_on : button_off} alt="" />
                                </button>
                                <p className="CheckPint title">평균 혈당이 높음</p>
                                <p className="CheckPint description">평소보다 조금 높아요</p>

                                <div id="avg-detail" className={`detail ${expanded.avg ? "open" : ""}`}>
                                    <div className="detail-card">
                                        <div className="dot" />
                                        <div className="lines">
                                            <p className="row-strong">분석</p>
                                            <p className="row">오늘 2번의 급상승이 있었어요</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 3. 최고 혈당 */}
                            <div className={`CheckPint box ${expanded.max ? "on" : ""}`}>
                                <button
                                    className="toggle"
                                    onClick={() => toggleCard("max")}
                                    type="button"
                                    aria-expanded={expanded.max}
                                    aria-controls="max-detail"
                                >
                                    <img src={expanded.max ? button_on : button_off} alt="" />
                                </button>
                                <p className="CheckPint title">최고 혈당은 105</p>
                                <p className="CheckPint description">
                                    가장 높았을 때는 105였지만 곧 안정을 찾았어요
                                </p>

                                <div id="max-detail" className={`detail ${expanded.max ? "open" : ""}`}>
                                    <div className="detail-card">
                                        <div className="dot" />
                                        <div className="lines">
                                            <p className="row-strong">설명</p>
                                            <p className="row">식후 1~2시간 구간에서 최고점.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 4. 최저 혈당 */}
                            <div className={`CheckPint box ${expanded.min ? "on" : ""}`}>
                                <button
                                    className="toggle"
                                    onClick={() => toggleCard("min")}
                                    type="button"
                                    aria-expanded={expanded.min}
                                    aria-controls="min-detail"
                                >
                                    <img src={expanded.min ? button_on : button_off} alt="" />
                                </button>
                                <p className="CheckPint title">최저 혈당은 50</p>
                                <p className="CheckPint description">
                                    가장 낮았을 때는 50였지만 곧 안정을 찾았어요
                                </p>

                                <div id="min-detail" className={`detail ${expanded.min ? "open" : ""}`}>
                                    <div className="detail-card">
                                        <div className="dot" />
                                        <div className="lines">
                                            <p className="row-strong">설명</p>
                                            <p className="row">운동 직후/공복 구간에서 저점.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 컴포넌트 전용 스타일 */}
            <style>{`

        .CheckPint.grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        .CheckPint.box {
          position: relative;
          background: #fff;
          border: 1px solid #EFF1F3;
          border-radius: 16px;
          padding: 14px 16px 10px 52px;
          box-shadow: 0 1px 0 rgba(16,24,40,0.02);
          transition: border-color .2s ease, box-shadow .2s ease;
        }
        .CheckPint.box.on {
          border-color: #D7F0EC;
          box-shadow: 0 4px 16px rgba(26,127,111,0.08);
        }
        .CheckPint.box .toggle {
          position: absolute;
          left: 12px;
          top: 14px;
          width: 28px;
          height: 28px;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
        }
        .CheckPint.box .toggle img { width: 28px; height: 28px; display: block; }
        .CheckPint.title {
          margin: 0 0 4px 0;
          font-size: 15px;
          font-weight: 600;
          color: #0B0B0B;
        }
        .CheckPint.description {
          margin: 0;
          font-size: 13px;
          color: #6B7280;
        }

        /* 펼침 디테일 애니메이션 */
        .detail {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transform: translateY(-6px);
          transition: max-height .36s cubic-bezier(.2,.7,.2,1),
                      opacity .28s ease,
                      transform .36s cubic-bezier(.2,.7,.2,1);
        }
        .detail.open {
          max-height: 320px;
          opacity: 1;
          transform: translateY(0);
          margin-top: 10px;
        }

        .detail-card {
          display: flex;
          gap: 10px;
          background: #F8FAFA;
          border: 1px solid #ECF6F4;
          border-radius: 12px;
          padding: 12px;
        }
        .detail-card + .detail-card { margin-top: 8px; }
        .detail-card .dot {
          width: 5px; height: 5px;
          border-radius: 9999px;
          background: #4B4B4B;
          margin-top: 7px;
          margin-left: 3px;
          flex: 0 0 5px;
        }
        .detail-card .lines { flex: 1; min-width: 0; }
        .detail-card .row-strong {
          margin: 0 0 4px 0;
          font-size: 14px;
          font-weight: 700;
          color: 4B4B4B;
        }
        .detail-card .row {
          margin: 0;
          font-size: 13px;
          color: #334155;
          line-height: 1.45;
        }

        @media (min-width: 420px) {
          .min-h-screen > .flex-1 { max-width: 420px; margin: 0 auto; }
        }
      `}</style>
        </div>
    );
}
