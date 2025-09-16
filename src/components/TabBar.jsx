// tab bar = navigation bar 생성
// kid home에서는 onHome을 "Home_kid"로, parents home에서는 "Home_parents"로

export default function TabBar({ active = "home", onHome, onQuest, onReport, onMy }) {
    const item = (key, label, icon, onClick) => {
        const isActive = active === key;
        return (
            <button
                onClick={onClick}
                className="flex flex-col items-center py-2 px-4"
                aria-current={isActive ? "page" : undefined}
            >
                <div className="w-6 h-6 mb-1">
                    {icon(isActive)}
                </div>
                <span className={`text-xs ${isActive ? "text-teal-500 font-medium" : "text-gray-400"}`}>
          {label}
        </span>
            </button>
        );
    };

    return (
        <div className="bg-white border-t border-gray-200 px-6 py-2 pb-safe-bottom">
            <div className="flex justify-around items-center">
                {item("home", "홈", (on) => (
                    <svg className={`w-full h-full ${on ? "text-teal-500" : "text-gray-400"}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                ), onHome)}

                {item("quest", "퀘스트", (on) => (
                    <svg className={`w-full h-full ${on ? "text-teal-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ), onQuest)}

                {item("report", "리포트", (on) => (
                    <svg className={`w-full h-full ${on ? "text-teal-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                ), onReport)}

                {item("my", "마이", (on) => (
                    <svg className={`w-full h-full ${on ? "text-teal-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                ), onMy)}
            </div>
        </div>
    );
}
