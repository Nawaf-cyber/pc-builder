(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/PCBuilderClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PCBuilderClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function PCBuilderClient({ categories }) {
    _s();
    const [selectedComponents, setSelectedComponents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        status: 'idle',
        message: '',
        totalTdp: 0,
        totalPrice: 0
    });
    const handleSelect = (categoryName, componentId)=>{
        const category = categories.find((c)=>c.name === categoryName);
        const component = category?.components.find((c)=>c.id === componentId) || null;
        setSelectedComponents((prev)=>({
                ...prev,
                [categoryName]: component
            }));
    };
    const checkCompatibility = ()=>{
        const cpu = selectedComponents['CPU'];
        const mobo = selectedComponents['Motherboard'];
        const ram = selectedComponents['RAM'];
        const gpu = selectedComponents['GPU'];
        const pcCase = selectedComponents['Case'];
        const psu = selectedComponents['PSU'];
        let totalTdp = 0;
        let totalPrice = 0;
        Object.values(selectedComponents).forEach((comp)=>{
            if (comp) {
                totalTdp += comp.tdpWattage;
                totalPrice += comp.price;
            }
        });
        if (!cpu || !mobo || !ram || !gpu || !pcCase || !psu) {
            setResult({
                status: 'error',
                message: 'الرجاء اختيار القطع الأساسية (CPU, Motherboard, RAM, GPU, Case, PSU) للتحقق.',
                totalTdp,
                totalPrice
            });
            return;
        }
        if (cpu.specs?.socket !== mobo.specs?.socket) {
            setResult({
                status: 'error',
                message: `عدم توافق: المعالج بمقبس ${cpu.specs?.socket} واللوحة الأم بمقبس ${mobo.specs?.socket}.`,
                totalTdp,
                totalPrice
            });
            return;
        }
        if (ram.specs?.type !== mobo.specs?.ramType) {
            setResult({
                status: 'error',
                message: `عدم توافق: اللوحة الأم تدعم ${mobo.specs?.ramType} والرام المختار من نوع ${ram.specs?.type}.`,
                totalTdp,
                totalPrice
            });
            return;
        }
        if (gpu.specs?.lengthMm > pcCase.specs?.maxGpuLength) {
            setResult({
                status: 'error',
                message: `عدم توافق: طول كرت الشاشة (${gpu.specs?.lengthMm}mm) أكبر من المساحة المتاحة في الكيس (${pcCase.specs?.maxGpuLength}mm).`,
                totalTdp,
                totalPrice
            });
            return;
        }
        const requiredWattage = totalTdp + 100;
        if (psu.specs?.wattage < requiredWattage) {
            setResult({
                status: 'error',
                message: `تحذير طاقة: الاستهلاك التقريبي مع هامش الأمان (${requiredWattage} واط) يتجاوز قدرة مزود الطاقة (${psu.specs?.wattage} واط).`,
                totalTdp,
                totalPrice
            });
            return;
        }
        setResult({
            status: 'success',
            message: 'تم التوافق! جميع القطع متوافقة تماماً.',
            totalTdp,
            totalPrice
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-5xl mx-auto mt-10 bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-800 transition-colors duration-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gradient-to-r from-blue-900 to-blue-700 dark:from-slate-800 dark:to-slate-900 p-8 text-center text-white border-b border-transparent dark:border-slate-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold mb-2 flex items-center justify-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "💻"
                            }, void 0, false, {
                                fileName: "[project]/components/PCBuilderClient.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            " منصة بناء أجهزة الـ PC"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PCBuilderClient.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-blue-100 dark:text-gray-300 text-sm",
                        children: "اختر القطع من القوائم بالأسفل وتأكد من توافقها قبل الشراء"
                    }, void 0, false, {
                        fileName: "[project]/components/PCBuilderClient.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PCBuilderClient.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8",
                        children: categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"
                                            }, void 0, false, {
                                                fileName: "[project]/components/PCBuilderClient.tsx",
                                                lineNumber: 99,
                                                columnNumber: 17
                                            }, this),
                                            category.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/PCBuilderClient.tsx",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3 items-center",
                                        children: [
                                            selectedComponents[category.name]?.imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: selectedComponents[category.name]?.imageUrl,
                                                alt: selectedComponents[category.name]?.name,
                                                className: "w-14 h-14 rounded-lg object-contain bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-1 shadow-sm"
                                            }, void 0, false, {
                                                fileName: "[project]/components/PCBuilderClient.tsx",
                                                lineNumber: 105,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "flex-1 p-3 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-sm text-gray-800 dark:text-gray-100",
                                                onChange: (e)=>handleSelect(category.name, e.target.value),
                                                value: selectedComponents[category.name]?.id || '',
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        disabled: true,
                                                        children: [
                                                            "-- اختر ",
                                                            category.name,
                                                            " --"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/PCBuilderClient.tsx",
                                                        lineNumber: 116,
                                                        columnNumber: 19
                                                    }, this),
                                                    category.components.map((comp)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: comp.id,
                                                            children: [
                                                                comp.brand,
                                                                " ",
                                                                comp.name,
                                                                " - $",
                                                                comp.price
                                                            ]
                                                        }, comp.id, true, {
                                                            fileName: "[project]/components/PCBuilderClient.tsx",
                                                            lineNumber: 118,
                                                            columnNumber: 21
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/PCBuilderClient.tsx",
                                                lineNumber: 111,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/PCBuilderClient.tsx",
                                        lineNumber: 103,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, category.id, true, {
                                fileName: "[project]/components/PCBuilderClient.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/PCBuilderClient.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: checkCompatibility,
                        className: "w-full py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
                        children: "تحقق من التوافقية"
                    }, void 0, false, {
                        fileName: "[project]/components/PCBuilderClient.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    result.status !== 'idle' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-8 p-6 rounded-xl border ${result.status === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-2xl",
                                    children: result.status === 'success' ? '✅' : '❌'
                                }, void 0, false, {
                                    fileName: "[project]/components/PCBuilderClient.tsx",
                                    lineNumber: 139,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: `text-lg font-bold mb-2 ${result.status === 'success' ? 'text-green-800 dark:text-green-400' : 'text-red-800 dark:text-red-400'}`,
                                            children: result.message
                                        }, void 0, false, {
                                            fileName: "[project]/components/PCBuilderClient.tsx",
                                            lineNumber: 141,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `mt-4 pt-4 border-t flex flex-col sm:flex-row justify-between gap-4 ${result.status === 'success' ? 'border-green-200 dark:border-green-800 text-green-700 dark:text-green-300' : 'border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 bg-white/50 dark:bg-black/20 px-4 py-2 rounded-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold",
                                                            children: "⚡ استهلاك الطاقة:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/PCBuilderClient.tsx",
                                                            lineNumber: 146,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-black text-lg",
                                                            children: [
                                                                result.totalTdp,
                                                                "W"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/PCBuilderClient.tsx",
                                                            lineNumber: 147,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/PCBuilderClient.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 bg-white/50 dark:bg-black/20 px-4 py-2 rounded-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold",
                                                            children: "💰 التكلفة الإجمالية:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/PCBuilderClient.tsx",
                                                            lineNumber: 150,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-black text-lg",
                                                            children: [
                                                                "$",
                                                                result.totalPrice
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/PCBuilderClient.tsx",
                                                            lineNumber: 151,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/PCBuilderClient.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/PCBuilderClient.tsx",
                                            lineNumber: 144,
                                            columnNumber: 17
                                        }, this),
                                        result.status === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-6 pt-6 border-t border-green-200 dark:border-green-800",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-bold text-gray-800 dark:text-gray-200 mb-4",
                                                    children: "🛒 روابط الشراء للقطع المختارة:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/PCBuilderClient.tsx",
                                                    lineNumber: 158,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-3",
                                                    children: Object.entries(selectedComponents).map(([catName, comp])=>{
                                                        if (!comp || !comp.amazonUrl && !comp.cazasouqUrl) return null;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col sm:flex-row sm:items-center justify-between bg-white/60 dark:bg-slate-800/60 p-3 rounded-lg border border-green-100 dark:border-green-900/30",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-0",
                                                                    children: [
                                                                        catName,
                                                                        ": ",
                                                                        comp.brand,
                                                                        " ",
                                                                        comp.name
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/PCBuilderClient.tsx",
                                                                    lineNumber: 164,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex gap-2",
                                                                    children: [
                                                                        comp.amazonUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                            href: comp.amazonUrl,
                                                                            target: "_blank",
                                                                            rel: "noopener noreferrer",
                                                                            className: "px-4 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold rounded-md transition-colors shadow-sm text-center",
                                                                            children: "Amazon"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/PCBuilderClient.tsx",
                                                                            lineNumber: 169,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        comp.cazasouqUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                            href: comp.cazasouqUrl,
                                                                            target: "_blank",
                                                                            rel: "noopener noreferrer",
                                                                            className: "px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-md transition-colors shadow-sm text-center",
                                                                            children: "Cazasouq"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/PCBuilderClient.tsx",
                                                                            lineNumber: 174,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/PCBuilderClient.tsx",
                                                                    lineNumber: 167,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, catName, true, {
                                                            fileName: "[project]/components/PCBuilderClient.tsx",
                                                            lineNumber: 163,
                                                            columnNumber: 27
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/components/PCBuilderClient.tsx",
                                                    lineNumber: 159,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/PCBuilderClient.tsx",
                                            lineNumber: 157,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/PCBuilderClient.tsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/PCBuilderClient.tsx",
                            lineNumber: 138,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/PCBuilderClient.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PCBuilderClient.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/PCBuilderClient.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_s(PCBuilderClient, "7NFrKcZ2kz47o5ViUe8RYIAhjlE=");
_c = PCBuilderClient;
var _c;
__turbopack_context__.k.register(_c, "PCBuilderClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_PCBuilderClient_tsx_0v1kc42._.js.map