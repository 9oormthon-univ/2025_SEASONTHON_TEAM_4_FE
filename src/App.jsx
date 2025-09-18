import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SignupProvider } from "./data/SignupData.jsx";
import InitialOnboarding from "./screens/InitialOnboarding";
import Login from "./screens/Login.jsx";
import Signup_for_parents from "./screens/Signup_for_parents.jsx";
import Signup_success from "./screens/Signup_success.jsx";
import Badge from "./screens/kid/Badge.jsx";
import KidHomePage from "./screens/kid/Home_kid.jsx";
import My from "./screens/kid/My.jsx";
import QuestCheckPage from "./screens/kid/QuestCheckPage.jsx";
import QuestOnePage from "./screens/kid/QuestOnePage.jsx";
import QuestPage from "./screens/kid/QuestPage.jsx";
import QuestUpdatePage from "./screens/kid/QuestUpdatePage.jsx";
import Report_kid from "./screens/kid/Report_kid.jsx";
import ParentsHomePage from "./screens/parents/Home_parents.jsx";
import Note from "./screens/parents/Note.jsx";
import Quest_detail from "./screens/parents/Quest_detail.jsx";
import Quest_parents from "./screens/parents/Quest_parents.jsx";
import ReportPage from "./screens/parents/ReportPage.jsx";
import Report_parents from "./screens/parents/Report_parents.jsx";
import Signup_0 from "./screens/steps/Signup_0.jsx";
import Signup_1 from "./screens/steps/Signup_1.jsx";
import SignUp_2 from "./screens/steps/Signup_2.jsx";
import Signup_3 from "./screens/steps/Signup_3.jsx";
import Signup_4 from "./screens/steps/Signup_4.jsx";
import Signup_5 from "./screens/steps/Signup_5.jsx";
import Signup_6 from "./screens/steps/Signup_6.jsx";
import Signup_7 from "./screens/steps/Signup_7.jsx";

export default function App() {
    return (
        <Router>
            <SignupProvider>
                <Routes>
                    <Route path="/" element={<InitialOnboarding />} />
                    <Route path="/signup" element={<Signup_0 />} />
                    <Route path="/signup_1" element={<Signup_1 />} />
                    <Route path="/signup_2" element={<SignUp_2 />} />
                    <Route path="/signup_3" element={<Signup_3 />} />
                    <Route path="/signup_4" element={<Signup_4 />} />
                    <Route path="/signup_5" element={<Signup_5 />} />
                    <Route path="/signup_6" element={<Signup_6 />} />
                    <Route path="/signup_7" element={<Signup_7 />} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/parent/signup" element={<Signup_for_parents />} />
                    <Route path="/signup_success" element={<Signup_success />} />
                    <Route path="/kid/home" element={<KidHomePage />} />
                    <Route path="/parent/home" element={<ParentsHomePage />} />
                    <Route path="/kid/quest" element={<QuestPage />} />
                    <Route path="/kid/quest/1" element={<QuestOnePage />} />
                    <Route path="/parent/quest" element={<Quest_parents />} />
                    <Route path="/parent/quest/detail" element={<Quest_detail />} />
                    <Route path="/report" element={<ReportPage />} />
                    <Route path="/kid/report" element={<Report_kid />} />
                    <Route path="/kid/badge" element={<Badge />} />
                    <Route path="/parent/report" element={<Report_parents />} />
                    <Route path="/kid/note" element={<Note />} />
                    <Route path="/kid/quest/update" element={<QuestUpdatePage/>} />
                    <Route path="/kid/quest/check" element={<QuestCheckPage/>} />
                    <Route path="/kid/my" element={<My/>} />
                </Routes>
            </SignupProvider>
        </Router>
    );
}