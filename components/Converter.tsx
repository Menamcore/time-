
import React, { useState } from 'react';

const Converter: React.FC = () => {
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('days');
  const [toUnit, setToUnit] = useState<string>('hours');

  const conversions: Record<string, Record<string, number>> = {
    hours: { days: 1/24, weeks: 1/168 },
    days: { hours: 24, weeks: 1/7 },
    weeks: { days: 7, hours: 168 },
    months: { weeks: 4, days: 30, years: 1/12 },
    years: { months: 12, weeks: 52, days: 365 }
  };

  const calculateResult = () => {
    if (fromUnit === toUnit) return value;
    const rate = conversions[fromUnit]?.[toUnit];
    return rate ? (value * rate).toFixed(2) : '???';
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-purple-100 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">Time Magic Converter ✨</h2>
      <p className="text-center text-gray-600 mb-8">Let's see how different time units relate to each other!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-400 ml-2 uppercase">Amount</label>
          <input 
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="p-4 bg-purple-50 border-2 border-purple-200 rounded-2xl text-2xl font-bold text-purple-700 outline-none focus:border-purple-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-400 ml-2 uppercase">From Unit</label>
          <select 
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="p-4 bg-purple-50 border-2 border-purple-200 rounded-2xl text-xl font-bold text-purple-700 outline-none cursor-pointer"
          >
            <option value="hours">Hours / ساعات</option>
            <option value="days">Days / أيام</option>
            <option value="weeks">Weeks / أسابيع</option>
            <option value="months">Months / شهور</option>
            <option value="years">Years / سنوات</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-400 ml-2 uppercase">To Unit</label>
          <select 
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="p-4 bg-purple-50 border-2 border-purple-200 rounded-2xl text-xl font-bold text-purple-700 outline-none cursor-pointer"
          >
            <option value="hours">Hours / ساعات</option>
            <option value="days">Days / أيام</option>
            <option value="weeks">Weeks / أسابيع</option>
            <option value="months">Months / شهور</option>
            <option value="years">Years / سنوات</option>
          </select>
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="inline-block p-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl shadow-lg">
          <p className="text-purple-100 text-lg mb-2 uppercase tracking-widest font-bold">Result</p>
          <p className="text-5xl font-black text-white">
            {value} <span className="text-2xl font-medium">{fromUnit}</span> = {calculateResult()} <span className="text-2xl font-medium">{toUnit}</span>
          </p>
        </div>
      </div>
      
      <div className="mt-8 bg-orange-50 p-4 rounded-2xl border-l-8 border-orange-400 italic text-orange-800">
        "Did you know? In math, we use these conversions to solve big problems!"
      </div>
    </div>
  );
};

export default Converter;
