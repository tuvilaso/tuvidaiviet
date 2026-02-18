
import React from 'react';
import { Palace, UserInfo } from '../types';

interface HoroscopeChartProps {
  palaces: Palace[];
  userInfo: UserInfo;
}

const PalaceCell: React.FC<{ palace: Palace; isCenter?: boolean }> = ({ palace, isCenter }) => {
  if (isCenter) return null;

  return (
    <div className="border border-yellow-900/30 p-2 min-h-[160px] flex flex-col bg-[#050515]/90 hover:bg-[#0a0a25] transition-all relative overflow-hidden group">
      {/* Decorative corner */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-yellow-700/40"></div>
      
      <div className="absolute top-0 right-0 p-1 text-[9px] text-yellow-600/40 font-bold uppercase tracking-tighter">
        {palace.location}
      </div>
      
      <div className="text-center border-b border-yellow-900/20 pb-1 mb-2">
        <h3 className="text-[12px] font-bold text-yellow-500 uppercase tracking-[0.1em]">{palace.name}</h3>
      </div>

      <div className="flex-1 space-y-1">
        {palace.mainStars.map((star, idx) => (
          <div key={idx} className={`text-[13px] font-black leading-tight ${star.type === 'Main' ? 'text-red-600 shadow-sm' : 'text-orange-500'}`}>
            {star.name}
          </div>
        ))}
        <div className="mt-2 flex flex-wrap gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
          {palace.minorStars.map((star, idx) => (
            <span key={idx} className="text-[9px] text-indigo-300 font-medium italic leading-none">
              {star.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto flex justify-between items-end text-[9px] border-t border-yellow-900/10 pt-1">
        <span className="text-blue-500 font-bold">{palace.majorFortune}</span>
        <span className="text-gray-600 font-serif italic">{palace.minorFortune}</span>
      </div>
    </div>
  );
};

const HoroscopeChart: React.FC<HoroscopeChartProps> = ({ palaces, userInfo }) => {
  const gridOrder = [
    palaces.find(p => p.location === 'Tỵ'), palaces.find(p => p.location === 'Ngọ'), palaces.find(p => p.location === 'Mùi'), palaces.find(p => p.location === 'Thân'),
    palaces.find(p => p.location === 'Thìn'), null, null, palaces.find(p => p.location === 'Dậu'),
    palaces.find(p => p.location === 'Mão'), null, null, palaces.find(p => p.location === 'Tuất'),
    palaces.find(p => p.location === 'Dần'), palaces.find(p => p.location === 'Sửu'), palaces.find(p => p.location === 'Tý'), palaces.find(p => p.location === 'Hợi'),
  ];

  return (
    <div className="max-w-4xl mx-auto p-1 bg-[#8b6d1b]/20 rounded-lg shadow-[0_0_60px_rgba(139,109,27,0.15)]">
      <div className="border-[3px] border-yellow-700/60 p-1 bg-[#030308]">
        <div className="grid grid-cols-4 grid-rows-4 gap-[2px]">
          {gridOrder.map((palace, index) => {
            if (palace === null) {
              if (index === 5) {
                return (
                  <div key={index} className="col-span-2 row-span-2 bg-gradient-to-br from-[#0a0a20] to-[#030308] border border-yellow-800/30 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{backgroundImage: 'radial-gradient(#d4af37 0.5px, transparent 0.5px)', backgroundSize: '10px 10px'}}></div>
                    
                    <div className="text-yellow-500 text-2xl font-heading font-black mb-3 tracking-[0.15em] uppercase border-b border-yellow-800/40 pb-2">
                      Lá Số Tử Vi
                    </div>
                    <div className="text-white text-lg font-bold mb-1 font-serif">{userInfo.fullName}</div>
                    <div className="text-xs text-indigo-400 mb-6 tracking-wider">Lập năm: Bính Ngọ 2026</div>
                    
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-[10px] text-left w-full border-t border-yellow-900/20 pt-6">
                      <div className="flex flex-col"><span className="text-yellow-800 font-bold uppercase text-[8px]">Giới tính</span><span className="text-indigo-200">{userInfo.gender}</span></div>
                      <div className="flex flex-col"><span className="text-yellow-800 font-bold uppercase text-[8px]">Bản mệnh</span><span className="text-indigo-200">Giáng Hạ Thủy</span></div>
                      <div className="flex flex-col"><span className="text-yellow-800 font-bold uppercase text-[8px]">Ngày sinh</span><span className="text-indigo-200">{userInfo.birthDate}</span></div>
                      <div className="flex flex-col"><span className="text-yellow-800 font-bold uppercase text-[8px]">Giờ sinh</span><span className="text-indigo-200">{userInfo.birthTime}</span></div>
                    </div>
                    
                    <div className="mt-8">
                       <div className="text-[9px] text-yellow-700/50 italic">Đại Việt Lý Số Viện</div>
                    </div>
                  </div>
                );
              }
              return null;
            }
            return <PalaceCell key={index} palace={palace} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default HoroscopeChart;
