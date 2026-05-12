'use client';

import { useState } from 'react';

type Component = {
  id: string;
  name: string;
  brand: string;
  price: number;
  tdpWattage: number;
  specs: any;
  imageUrl?: string | null;
  amazonUrl?: string | null;
  cazasouqUrl?: string | null;
};

type Category = {
  id: string;
  name: string;
  components: Component[];
};

export default function PCBuilderClient({ categories }: { categories: Category[] }) {
  const [selectedComponents, setSelectedComponents] = useState<Record<string, Component | null>>({});
  const [result, setResult] = useState<{ status: 'success' | 'error' | 'idle', message: string, totalTdp: number, totalPrice: number }>({ status: 'idle', message: '', totalTdp: 0, totalPrice: 0 });

  const handleSelect = (categoryName: string, componentId: string) => {
    const category = categories.find(c => c.name === categoryName);
    const component = category?.components.find(c => c.id === componentId) || null;
    
    setSelectedComponents(prev => ({
      ...prev,
      [categoryName]: component
    }));
  };

  const checkCompatibility = () => {
    const cpu = selectedComponents['CPU'];
    const mobo = selectedComponents['Motherboard'];
    const ram = selectedComponents['RAM'];
    const gpu = selectedComponents['GPU'];
    const pcCase = selectedComponents['Case'];
    const psu = selectedComponents['PSU'];

    let totalTdp = 0;
    let totalPrice = 0;

    Object.values(selectedComponents).forEach(comp => {
      if (comp) {
        totalTdp += comp.tdpWattage;
        totalPrice += comp.price;
      }
    });

    if (!cpu || !mobo || !ram || !gpu || !pcCase || !psu) {
      setResult({ status: 'error', message: 'الرجاء اختيار القطع الأساسية (CPU, Motherboard, RAM, GPU, Case, PSU) للتحقق.', totalTdp, totalPrice });
      return;
    }

    if (cpu.specs?.socket !== mobo.specs?.socket) {
      setResult({ status: 'error', message: `عدم توافق: المعالج بمقبس ${cpu.specs?.socket} واللوحة الأم بمقبس ${mobo.specs?.socket}.`, totalTdp, totalPrice });
      return;
    }

    if (ram.specs?.type !== mobo.specs?.ramType) {
      setResult({ status: 'error', message: `عدم توافق: اللوحة الأم تدعم ${mobo.specs?.ramType} والرام المختار من نوع ${ram.specs?.type}.`, totalTdp, totalPrice });
      return;
    }

    if (gpu.specs?.lengthMm > pcCase.specs?.maxGpuLength) {
      setResult({ status: 'error', message: `عدم توافق: طول كرت الشاشة (${gpu.specs?.lengthMm}mm) أكبر من المساحة المتاحة في الكيس (${pcCase.specs?.maxGpuLength}mm).`, totalTdp, totalPrice });
      return;
    }

    const requiredWattage = totalTdp + 100;
    if (psu.specs?.wattage < requiredWattage) {
      setResult({ status: 'error', message: `تحذير طاقة: الاستهلاك التقريبي مع هامش الأمان (${requiredWattage} واط) يتجاوز قدرة مزود الطاقة (${psu.specs?.wattage} واط).`, totalTdp, totalPrice });
      return;
    }

    setResult({ status: 'success', message: 'تم التوافق! جميع القطع متوافقة تماماً.', totalTdp, totalPrice });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-800 transition-colors duration-200">
      
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 dark:from-slate-800 dark:to-slate-900 p-8 text-center text-white border-b border-transparent dark:border-slate-700">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
          <span>💻</span> منصة بناء أجهزة الـ PC
        </h1>
        <p className="text-blue-100 dark:text-gray-300 text-sm">اختر القطع من القوائم بالأسفل وتأكد من توافقها قبل الشراء</p>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                {category.name}
              </label>
              
              <div className="flex gap-3 items-center">
                {selectedComponents[category.name]?.imageUrl && (
                  <img 
                    src={selectedComponents[category.name]?.imageUrl as string} 
                    alt={selectedComponents[category.name]?.name}
                    className="w-14 h-14 rounded-lg object-contain bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-1 shadow-sm" 
                  />
                )}
                <select
                  className="flex-1 p-3 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-sm text-gray-800 dark:text-gray-100"
                  onChange={(e) => handleSelect(category.name, e.target.value)}
                  value={selectedComponents[category.name]?.id || ''}
                >
                  <option value="" disabled>-- اختر {category.name} --</option>
                  {category.components.map((comp) => (
                    <option key={comp.id} value={comp.id}>
                      {comp.brand} {comp.name} - ${comp.price}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          ))}
        </div>

        <button
          onClick={checkCompatibility}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          تحقق من التوافقية
        </button>

        {result.status !== 'idle' && (
          <div className={`mt-8 p-6 rounded-xl border ${result.status === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
            <div className="flex items-start gap-4">
              <div className="text-2xl">{result.status === 'success' ? '✅' : '❌'}</div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold mb-2 ${result.status === 'success' ? 'text-green-800 dark:text-green-400' : 'text-red-800 dark:text-red-400'}`}>
                  {result.message}
                </h3>
                <div className={`mt-4 pt-4 border-t flex flex-col sm:flex-row justify-between gap-4 ${result.status === 'success' ? 'border-green-200 dark:border-green-800 text-green-700 dark:text-green-300' : 'border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'}`}>
                  <div className="flex items-center gap-2 bg-white/50 dark:bg-black/20 px-4 py-2 rounded-lg">
                    <span className="font-bold">⚡ استهلاك الطاقة:</span>
                    <span className="font-black text-lg">{result.totalTdp}W</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 dark:bg-black/20 px-4 py-2 rounded-lg">
                    <span className="font-bold">💰 التكلفة الإجمالية:</span>
                    <span className="font-black text-lg">${result.totalPrice}</span>
                  </div>
                </div>

                {/* روابط الشراء - تظهر فقط عند التوافق */}
                {result.status === 'success' && (
                  <div className="mt-6 pt-6 border-t border-green-200 dark:border-green-800">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4">🛒 روابط الشراء للقطع المختارة:</h4>
                    <div className="flex flex-col gap-3">
                      {Object.entries(selectedComponents).map(([catName, comp]) => {
                        if (!comp || (!comp.amazonUrl && !comp.cazasouqUrl)) return null;
                        return (
                          <div key={catName} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/60 dark:bg-slate-800/60 p-3 rounded-lg border border-green-100 dark:border-green-900/30">
                            <span className="font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-0">
                              {catName}: {comp.brand} {comp.name}
                            </span>
                            <div className="flex gap-2">
                              {comp.amazonUrl && (
                                <a href={comp.amazonUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold rounded-md transition-colors shadow-sm text-center">
                                  Amazon
                                </a>
                              )}
                              {comp.cazasouqUrl && (
                                <a href={comp.cazasouqUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-md transition-colors shadow-sm text-center">
                                  Cazasouq
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}