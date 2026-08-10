"use client";

import { useState } from "react";

export default function MessagingPage() {
    const [activeChat, setActiveChat] = useState("1");
    const [inputMsg, setInputMsg] = useState("");

    const chats = [
        { id: "1", name: "Md. Rafiqul Islam", prop: "Modern 3 BHK Flat in Bashundhara", lastMsg: "Is Saturday 4 PM okay for the visit?", time: "10:42 AM", unread: 2, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&auto=format" },
        { id: "2", name: "Kabir Hossain", prop: "Cozy Family House in Dhanmondi", lastMsg: "Thank you! The agreement is ready.", time: "Yesterday", unread: 0, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&auto=format" },
    ];

    const messages = [
        { id: "1", text: "Assalamu Alaikum! I saw your listing for the 3 BHK flat in Bashundhara.", time: "10:30 AM", isMe: false },
        { id: "2", text: "Walaikum Assalam! Yes, it is still available.", time: "10:32 AM", isMe: true },
        { id: "3", text: "Can I visit the property this weekend?", time: "10:35 AM", isMe: false },
        { id: "4", text: "Sure! Is Saturday 4 PM okay for the visit?", time: "10:42 AM", isMe: true },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-6 h-[calc(100vh-80px)] min-h-125">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs h-full flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50/50 shrink-0">
                    <div className="p-4 border-b border-slate-200">
                        <h2 className="font-['Outfit'] text-lg font-bold text-[#0D1F3C] mb-2">Messages</h2>
                        <input placeholder="Search conversations..." className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none bg-white" />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {chats.map((c) => (
                            <div key={c.id} onClick={() => setActiveChat(c.id)} className={`p-3.5 border-b border-slate-100 flex gap-3 cursor-pointer transition-colors ${activeChat === c.id ? "bg-white border-l-4 border-l-[#1A4F9E]" : "hover:bg-slate-100/60"}`}>
                                <img src={c.avatar} alt="" className="w-10 h-10 rounded-full object-cover bg-slate-200 shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-0.5">
                                        <span className="font-semibold text-slate-800 text-xs truncate">{c.name}</span>
                                        <span className="text-slate-400 text-[10px]">{c.time}</span>
                                    </div>
                                    <div className="text-[#1A4F9E] text-[11px] font-medium truncate mb-1">{c.prop}</div>
                                    <div className="text-slate-500 text-xs truncate">{c.lastMsg}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat area */}
                <div className="flex-1 flex flex-col bg-white">
                    {/* Header */}
                    <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src={chats[0].avatar} alt="" className="w-9 h-9 rounded-full object-cover bg-slate-200" />
                            <div>
                                <div className="font-semibold text-slate-800 text-sm">{chats[0].name}</div>
                                <div className="text-slate-400 text-xs">{chats[0].prop}</div>
                            </div>
                        </div>
                        <a href="/properties/1" className="text-[#1A4F9E] text-xs font-semibold no-underline hover:underline">
                            View Property
                        </a>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-3">
                        {messages.map((m) => (
                            <div key={m.id} className={`max-w-[70%] ${m.isMe ? "self-end" : "self-start"}`}>
                                <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${m.isMe ? "bg-[#1A4F9E] text-white rounded-br-none" : "bg-slate-100 text-slate-800 rounded-bl-none"}`}>{m.text}</div>
                                <div className={`text-[10px] text-slate-400 mt-1 ${m.isMe ? "text-right" : "text-left"}`}>{m.time}</div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-3.5 border-t border-slate-200 flex gap-2">
                        <input placeholder="Type a message..." value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-blue-500" />
                        <button className="px-5 py-2.5 rounded-xl border-none bg-[#1A4F9E] text-white text-xs font-bold cursor-pointer font-['Outfit'] hover:bg-[#153f7e] transition-colors">Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
