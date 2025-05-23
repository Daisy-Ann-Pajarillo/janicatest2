import React, { useState } from "react";
import { Box, useTheme, Link } from "@mui/material";
import { tokens } from "../theme";
import { Routes, Route } from "react-router-dom";

//Layou.t Components
import Header from "../components/layout/Header";
import SideBar from "../components/layout/SideBar";
//import Topbar from "../components/layout/TopBar";

// Dashboar.d Components
import Home from "./sidebar-menu-items/Home/Home";
import Settings from "./sidebar-menu-items/Settings/Settings";
import JobSearch from "./sidebar-menu-items/JobSearch/JobSearch";
import TrainingSearch from "./sidebar-menu-items/TrainingSearch/TrainingSearch";
import SavedJobs from "./sidebar-menu-items/JobSaved/SavedJobs";
import SavedTrainings from "./sidebar-menu-items/TrainingSaved/SavedTrainings";
import JobApplications from './sidebar-menu-items/JobApplications/JobApplications';
import TrainingApplications from './sidebar-menu-items/TrainingApplications/TrainingApplications';
import ScholarshipSearch from "./sidebar-menu-items/ScholarshipSearch/ScholarshipSearch";
import ScholarshipApplications from './sidebar-menu-items/ScholarshipApplications/ScholarshipApplications';
import SavedScholarships from './sidebar-menu-items/ScholarshipSaved/SavedScholarships';
import Companies from './sidebar-menu-items/Companies/Companies';

const StudentDashboardScreen = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="w-full flex justify-center">
            <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <div className="w-full h-dvh overflow-y-auto">
                <Routes>
                    <Route path="/" element={<Home isCollapsed={isCollapsed} />} />
                    <Route path="/job-search" element={<JobSearch isCollapsed={isCollapsed} />} />
                    <Route path="/training-search" element={<TrainingSearch isCollapsed={isCollapsed} />} />
                    <Route path="/saved-jobs" element={<SavedJobs isCollapsed={isCollapsed} />} />
                    <Route path="/saved-trainings" element={<SavedTrainings isCollapsed={isCollapsed} />} />
                    <Route path="/job-applications" element={<JobApplications isCollapsed={isCollapsed} />} />
                    <Route path="/training-applications" element={<TrainingApplications isCollapsed={isCollapsed} />} />
                    <Route path="/scholarship-search" element={<ScholarshipSearch isCollapsed={isCollapsed} />} />
                    <Route path="/scholarship-applications" element={<ScholarshipApplications isCollapsed={isCollapsed} />} />
                    <Route path="/saved-scholarships" element={<SavedScholarships isCollapsed={isCollapsed} />} />
                    <Route path="/companies" element={<Companies isCollapsed={isCollapsed} />} />
                    <Route path="/settings" element={
                        <Box sx={{
                        }}>
                            <Settings />
                        </Box>
                    } />

                </Routes>
            </div>
        </div>
    );
};

export default StudentDashboardScreen;
