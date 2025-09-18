import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import button_off from "../../assets/button_off.png";
import button_on from "../../assets/button_on.png";
import refreshIcon from "../../assets/refresh.png";
import Chart from "../../components/charts/Chart";

export default function ReportPage({ score = 97 }) {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());

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

    const handleUpdate = () => {
        // 새로고침/리패치 자리. 일단 하드 리로드 예시:
        // window.location.reload();
        // 혹은 데이터만 재요청하도록 로직 연결
    };

    // 실시간 시간 업데이트
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-screen bg-white flex flex-col">
            {/* 헤더 */}
            <div className="pt-safe-top mt-4 flex items-center justify-between px-6 py-4 bg-white">
                <button onClick={handleBack} className="p-2" type="button">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-lg font-medium text-black">자세히</h1>
                <div className="w-10" />
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 overflow-y-auto">
                <div className="pt-4 rounded-[20px]">
                    {/* 타이틀 박스: 혈당지수 + 업데이트 */}
                    <div className="bg-[#1B3759] rounded-2xl p-6 text-white mb-4 mx-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">
                                이단짝님의 혈당건강지수는?
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
                                    onClick={handleUpdate}
                                    className="flex items-center gap-1 text-[#CACACA] py-1 rounded-full text-lg hover:bg-white/30 transition-colors"
                                >
                                    <img src={refreshIcon} alt="refresh" className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="mt-2 text-4xl font-bold">
                            {score}
                            <span className="text-xl font-normal">점</span>
                        </div>
                    </div>

                    {/* 차트 */}
                    <div className="mb-4 mx-6">
                        <Chart />
                    </div>
                </div>

                <div className="bg-[#F7F8FA] rounded-t-2xl p-4">
                    {/* 분석 결과 */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl p-4">
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
                        </div>
                    </div>
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
          top: 20px;
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
          .h-screen > .flex-1 { max-width: 100%; margin: 0; }
        }
      `}</style>
        </div>
    );
}
