import React from 'react';
import { useState } from "react";
import president from "../../assets/image/Executive2025/precident.jpeg";
import A from "../../assets/image/Executive2025/A.jpeg";
import B from "../../assets/image/Executive2025/B.jpeg";
import C from "../../assets/image/Executive2025/C.jpeg";
import D from "../../assets/image/Executive2025/D.jpeg";
import E from "../../assets/image/Executive2025/E.jpeg";
import F from "../../assets/image/Executive2025/F.jpeg";
import G from "../../assets/image/Executive2025/G.jpeg";
import H from "../../assets/image/Executive2025/H.jpeg";
import I from "../../assets/image/Executive2025/I.jpeg";
import J from "../../assets/image/Executive2025/J.jpeg";
import K from "../../assets/image/Executive2025/K.jpeg";
import L from "../../assets/image/Executive2025/L.jpeg";
// 
import president2 from "../../assets/image/Executive2026/President.jpeg";
import a from "../../assets/image/Executive2026/A.jpeg";
import b from "../../assets/image/Executive2026/B.jpeg";
import c from "../../assets/image/Executive2026/C.jpeg";
import d from "../../assets/image/Executive2026/D.jpeg";
import e from "../../assets/image/Executive2026/E.jpeg";
import f from "../../assets/image/Executive2026/F.jpeg";
import g from "../../assets/image/Executive2026/G.jpeg"; 
import i from "../../assets/image/Executive2026/I.jpeg";
import j from "../../assets/image/Executive2026/J.jpeg";
import k from "../../assets/image/Executive2026/K.jpeg";
import l from "../../assets/image/Executive2026/L.jpeg";
import m from "../../assets/image/Executive2026/M.jpeg";
import n from "../../assets/image/Executive2026/N.jpeg";
import o from "../../assets/image/Executive2026/O.jpeg";
import p from "../../assets/image/Executive2026/P.jpeg";
// 
import Alumnai1 from "../../assets/image/Alumnai/A.jpeg";
import Alumnai2 from "../../assets/image/Alumnai/B.jpeg";
import Alumnai3 from "../../assets/image/Alumnai/C.jpeg";
import Alumnai4 from "../../assets/image/Alumnai/D.jpeg";
import Alumnai5 from "../../assets/image/Alumnai/E.jpeg";
import Alumnai6 from "../../assets/image/Alumnai/F.jpeg";

const data = {

    "2024-2025": [
            {
            name: "Rishad Mahmud",
            role: "President",
            img: {president},
            },
            {
            name: "Rezuan Sajid Nahin",
            role: "Central Secretar",
            img: {A},
            },
            {
            name: "Tahsin Kabir Ratul",
            role: "Joint Secretary ",
            img: {B},
            },
            {
            name: "Saiful Islam",
            role: "Vice President",
            img: {C},
            },
            {
            name: "Md. Tarek",
            role: "Joint Secretary",
            img: {D}, 
            },
            {
            name: "Md. Maruful Islam",
            role: "PR of Socail Department",
            img: {E},
            },
            {
            name: "Md. Rayan",
            role: "Finance Secretary",
            img: {F},
            },
            {
            name: "Md. Shahidullah Kaisar",
            role: "Event Planing & Management",
            img: {G},
            },
            {
            name: "Md. Sayed Sabbir",
            role: "Event Planing & Management",
            img: {H},
            },
            {
            name: "Md. Sohel",
            role: "Joint Secretary",
            img: {I},
            },
            {
            name: "Rodra Biswas",
            role: "Secretary Technical Dept. ",
            img: {J},
            },
            {
            name: "Arafat Uddin Rafit",
            role: "PR of Socail Department",
            img: {K},
            },
            {
            name: "Emon Datta",
            role: "Secretary Technical Dept. ",
            img: {L},
            },
    ],

    "2025-2026": [
            {
            name: "Tarek Hossain",
            role: "President",
            img: {president2},
            },
            {
            name: "Md. Ansar ",
            role: "Vice President",
            img: {a},
            },
            {
            name: "Tsmail Hossain Maruf",
            role: "General Secretary",
            img: {b},
            },
            {
            name: "Md. Samiullah Haque Saim",
            role: "Vice President",
            img: {c}, 
            },
            {
            name: "Fazle Rob",
            role: "Finance Secretary",
            img: {d},
            },
            {
            name: "Sanbin Shakawat Sahel",
            role: "IT Secretary",
            img: {e},
            },
            {
            name: "Md. Misbahul Islam",
            role: "Joint Secretary",
            img: {f},
            },
            {
            name: "Sanjida Jannat Saom",
            role: "Assistant Joint IT Secretary",
            img: {g},
            },
            {
            name: "Md. Nadim Miah",
            role: "Event Secretary",
            img: {i},
            },
            {
            name: "Arafat Uddin Rafit",
            role: "PR of Socail Department",
            img: {j},
            },
            {
            name: "Raful Hosun Ratul",
            role: "Joint IT Secretary ",
            img: {j},
            },
            {
            name: "Nur Jahan Akter Shimu",
            role: "Joint IT Secretary",
            img: {k},
            },
            {
            name: "Atiqul Islam",
            role: "PR of Socail Media",
            img: {l},
            },
            {
            name: "Mirhad Hossain Riad",
            role:"PR of Socail Media",
            img: {m},
            },
            {
            name: "Joynal Abedin",
            role: "Assistant Joint IT Secretary",
            img: {n},
            },
            {
            name: "Emhan Datta",
            role: "Joint Technical Secretary ",
            img: {o},
            },
            {
            name: "Abdullah all Zawat",
            role: "Technical Secretary",
            img: {p},
            },

    ],

    "2026-2027": [
        {
            name: "Future President will be select in 2027",
            role: "President",
            img: "",
        },    
    ],
};

const Executive = () => {

    const [activeTab, setActiveTab] = useState("2025-2026");

    const members = data[activeTab];
    const president = members.find((m) => m.role === "President");
    const others = members.filter((m) => m.role !== "President");



    return (
        <div max-w-7xl mx-auto px-4 py-10>
            {/* Header & Title  */}
            <div className="max-w-4xl mx-auto pt-20 text-center space-y-4 mb-8">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    <span className="text-slate-900 dark:text-white">Executive </span>
                    <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400 bg-clip-text text-transparent">
                        Members
                    </span>
                </h2>

                {/* Gradient Underline */}
                <div className="flex justify-center ">
                    <span className="h-1 w-32 md:w-40 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400 animate-pulse"></span>
                </div>

                {/* Optional Subtext */}
                {/* <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm md:text-base">
                    Here’s a summary of my academic journey and milestones.
                </p> */}
            </div>

            {/* Tabs */}
            <div role="tablist" className="tabs tabs-lift mb-8 ml-116">
                {Object.keys(data).map((year) => (
                <a
                    key={year}
                    role="tab"
                    className={`font-bold tab ${activeTab === year ? "tab-active" : ""}`}
                    onClick={() => setActiveTab(year)}
                >
                    {year}
                </a>
                ))}
            </div>

            {/* President Card (Full Row) */}
            {president && (
                <div className="mb-10">
                <div className="card lg:card-side bg-base-100 shadow-xl border border-primary">
                    <figure className="p-6">
                    <img
                        src={president.img}
                        alt={president.name}
                        className="w-40 h-40 rounded-xl object-cover"
                    />
                    </figure>
                    <div className="card-body">
                    <h2 className="card-title text-2xl text-primary">
                        {president.name}
                    </h2>
                    <p className="text-lg font-medium">{president.role}</p>
                    <p className="opacity-70">Leading BSPIRC with vision 🚀</p>
                    </div>
                </div>
                </div>
            )}

            {/* Other Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-2">
                {others.map((member, index) => (
                <div key={index} className="card bg-base-100 shadow-md">
                    <figure className="px-6 pt-6">
                    <img
                        src={member.img}
                        alt={member.name}
                        className="rounded-xl w-24 h-24 object-cover"
                    />
                    </figure>
                    <div className="card-body items-center text-center">
                    <h2 className="card-title">{member.name}</h2>
                    <p className="text-sm opacity-70">{member.role}</p>
                    </div>
                </div>
                ))}
            </div>


            {/* Alumnai */}
            <div>
                {/* Header & Title  */}
                <div className="max-w-4xl mx-auto pt-20 text-center space-y-4 mb-8">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        <span className="text-slate-900 dark:text-white">Our </span>
                        <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400 bg-clip-text text-transparent">
                            Hero
                        </span>
                    </h2>

                    {/* Gradient Underline */}
                    <div className="flex justify-center ">
                        <span className="h-1 w-32 md:w-40 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400 animate-pulse"></span>
                    </div>

                    {/* Optional Subtext */}
                    <p className="text-gray-500 dark:text-gray-300 font-bold mt-2 text-sm md:text-base">
                        Our Alumnai who support and advice our BSPI Robotics Club
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                    {/* Card 1 */}
                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
                        <figure className="px-6 pt-6">
                            <img
                                src={Alumnai1}
                                alt="Sukanta Sharma"
                                className="rounded-full w-32 h-32 object-cover border-4 border-purple-500"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-xl font-bold">Sukanta Sharma</h2>
                            <p className="text-sm text-purple-600 font-semibold">Advisor</p>
                            <p className="text-xs text-gray-500">Robotics & Automation Expert</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
                        <figure className="px-6 pt-6">
                            <img
                                src={Alumnai2}
                                alt="Pial Barua"
                                className="rounded-full w-32 h-32 object-cover border-4 border-purple-500"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-xl font-bold">Pial Barua</h2>
                            <p className="text-sm text-purple-600 font-semibold">Advisor</p>
                            <p className="text-xs text-gray-500">AI & Machine Learning Specialist</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
                        <figure className="px-6 pt-6">
                            <img
                                src={Alumnai3}
                                alt="Abdullah all Kibria"
                                className="rounded-full w-32 h-32 object-cover border-4 border-purple-500"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-xl font-bold">Abdullah all Kibria</h2>
                            <p className="text-sm text-purple-600 font-semibold">Advisor</p>
                            <p className="text-xs text-gray-500">Embedded Systems Engineer</p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
                        <figure className="px-6 pt-6">
                            <img
                                src={Alumnai4}
                                alt="Eng. Md. Abu Huraira"
                                className="rounded-full w-32 h-32 object-cover border-4 border-purple-500"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-xl font-bold">Eng. Md. Abu Huraira</h2>
                            <p className="text-sm text-purple-600 font-semibold">Advisor</p>
                            <p className="text-xs text-gray-500">IoT & Smart Systems Expert</p>
                        </div>
                    </div>

                    {/* Card 5 */}
                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
                        <figure className="px-6 pt-6">
                            <img
                                src={Alumnai5}
                                alt="Noyon Chowdhory"
                                className="rounded-full w-32 h-32 object-cover border-4 border-purple-500"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-xl font-bold">Noyon Chowdhory</h2>
                            <p className="text-sm text-purple-600 font-semibold">Advisor</p>
                            <p className="text-xs text-gray-500">Computer Vision Researcher</p>
                        </div>
                    </div>

                    {/* Card 6 */}
                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
                        <figure className="px-6 pt-6">
                            <img
                                src={Alumnai6}
                                alt="Md. Faisal Ahmed"
                                className="rounded-full w-32 h-32 object-cover border-4 border-purple-500"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-xl font-bold">Md. Faisal Ahmed</h2>
                            <p className="text-sm text-purple-600 font-semibold">Advisor</p>
                            <p className="text-xs text-gray-500">Robotics Engineering Lead</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Executive;