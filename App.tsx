
import React, { useState, useEffect } from 'react';
import { UserInfo, Gender, CalendarType, Palace } from './types';
import { PALACE_NAMES, ZODIAC_SIGNS, MAIN_STARS, MINOR_STARS, STICKY_SESSION_KEY, ELEMENTS } from './constants';
import HoroscopeChart from './components/HoroscopeChart';
import Paywall from './components/Paywall';
import { generateHoroscopeInterpretation } from './services/geminiService';

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [formData, setFormData] = useState<UserInfo>({
    fullName: '',
    birthDate: '',
    birthTime: '12:00',
    gender: Gender.MALE,
    calendarType: CalendarType.SOLAR
  });
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [palaces, setPalaces] = useState<Palace[]>([]);
  const [interpretations, setInterpretations] = useState<{ [key: string]: string }>({});
  const [sessionId] = useState(() => Math.random().toString(36).substring(7).toUpperCase());

  // Check payment status on mount
  useEffect(() => {
    const status = localStorage.getItem(STICKY_SESSION_KEY);
    if (status === 'paid') {
      setIsPaid(true);
    }
  }, []);

  const generateMockPalaces = (): Palace[] => {
    return ZODIAC_SIGNS.map((sign, idx) => ({
      id: sign,
      name: PALACE_NAMES[idx % PALACE_NAMES.length],
      position: idx,
      location: sign,
      mainStars: [
        { 
          name: MAIN_STARS[Math.floor(Math.random() * MAIN_STARS.length)], 
          element: ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)] as any,
          type: 'Main',
          significance: 'Main star significance'
        }
      ],
      minorStars: [
        { 
          name: MINOR_STARS[Math.floor(Math.random() * MINOR_STARS.length)], 
          element: ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)] as any,
          type: 'Minor',
          significance: 'Minor star significance'
        }
      ],
      majorFortune: `${10 * (idx + 1)} - ${10 * (idx + 2)} tuổi`,
      minorFortune: 'Lưu niên',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUserInfo(formData);
    const mockPalaces = generateMockPalaces();
    setPalaces(mockPalaces);

    const intro = await generateHoroscopeInterpretation(formData, 'Tổng quan vận mệnh, tính cách và xu hướng cuộc đời năm 2026', false);
    setInterpretations({ intro });
    setLoading(false);
  };

  const handleFullUnlock = async () => {
    if (!userInfo) return;
    setLoading(true);
    const full = await generateHoroscopeInterpretation(userInfo, 'Luận giải chi tiết 12 cung, Đại vận 10 năm và Tiểu vận năm 2026', true);
    setInterpretations(prev => ({ ...prev, full }));
    setLoading(false);
  };

  return (
    <div className="min-h-screen pb-20 scroll-reveal">
      <header className="py-16 px-4 text-center mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none"></div>
        <h1 className="text-5xl md:text-7xl font-heading font-black gold-text mb-4 uppercase tracking-[0.2em]">
          Tử Vi Đại Việt
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto mb-6"></div>
        <p className="text-indigo-300 text-lg max-w-2xl mx-auto italic font-medium">
          "Soi sáng cung mệnh, thấu hiểu nhân sinh thông qua tinh hoa lý số Việt cổ truyền."
        </p>
      </header>

      <main className="container mx-auto px-4 max-w-6xl">
        {!userInfo ? (
          <div className="max-w-xl mx-auto glass-panel border border-yellow-900/40 p-10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <h2 className="text-3xl font-heading font-bold text-center mb-10 text-yellow-500">Khai Lập Lá Số</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative">
                <label className="block text-xs font-bold uppercase tracking-widest text-yellow-700/80 mb-2">Họ và Tên</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  required
                  className="w-full bg-black/40 border border-indigo-900/50 rounded-lg p-4 focus:border-yellow-500 outline-none transition-all text-white placeholder-gray-600"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-yellow-700/80 mb-2">Ngày sinh</label>
                  <input
                    type="date"
                    required
                    className="w-full bg-black/40 border border-indigo-900/50 rounded-lg p-4 focus:border-yellow-500 outline-none transition-all text-white color-scheme-dark"
                    value={formData.birthDate}
                    onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-yellow-700/80 mb-2">Giờ sinh</label>
                  <input
                    type="time"
                    required
                    className="w-full bg-black/40 border border-indigo-900/50 rounded-lg p-4 focus:border-yellow-500 outline-none transition-all text-white"
                    value={formData.birthTime}
                    onChange={e => setFormData({ ...formData, birthTime: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-yellow-700/80 mb-2">Giới tính</label>
                  <select
                    className="w-full bg-black/40 border border-indigo-900/50 rounded-lg p-4 focus:border-yellow-500 outline-none transition-all text-white"
                    value={formData.gender}
                    onChange={e => setFormData({ ...formData, gender: e.target.value as Gender })}
                  >
                    <option value={Gender.MALE}>Nam</option>
                    <option value={Gender.FEMALE}>Nữ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-yellow-700/80 mb-2">Loại lịch</label>
                  <select
                    className="w-full bg-black/40 border border-indigo-900/50 rounded-lg p-4 focus:border-yellow-500 outline-none transition-all text-white"
                    value={formData.calendarType}
                    onChange={e => setFormData({ ...formData, calendarType: e.target.value as CalendarType })}
                  >
                    <option value={CalendarType.SOLAR}>Dương Lịch</option>
                    <option value={CalendarType.LUNAR}>Âm Lịch</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full gold-gradient text-black font-black py-5 rounded-xl hover:scale-[1.02] active:scale-95 shadow-[0_10px_30px_rgba(139,109,27,0.3)] transition-all uppercase tracking-widest"
              >
                XEM LÁ SỐ NGAY
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-16 animate-in fade-in duration-1000">
            <div className="flex justify-center">
              <button 
                onClick={() => setUserInfo(null)}
                className="text-yellow-600 hover:text-yellow-400 font-bold flex items-center gap-2 mb-4 bg-yellow-900/10 px-6 py-2 rounded-full border border-yellow-900/20 transition-all"
              >
                ← Quay lại trang chủ
              </button>
            </div>
            
            <div className="relative group">
               <div className="absolute -inset-4 bg-yellow-500/5 blur-3xl rounded-full opacity-50 pointer-events-none"></div>
               <HoroscopeChart palaces={palaces} userInfo={userInfo} />
            </div>

            <div className="max-w-5xl mx-auto space-y-12">
              <section className="glass-panel p-10 border border-yellow-900/20 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-heading text-yellow-500 mb-8 flex items-center gap-4">
                  <span className="w-12 h-px bg-yellow-800"></span>
                  Luận Giải Vận Mệnh 2026
                  <span className="w-12 h-px bg-yellow-800"></span>
                </h2>
                <div className="prose prose-invert prose-yellow max-w-none leading-relaxed text-gray-300">
                  {loading && !interpretations.intro ? (
                     <div className="flex flex-col items-center py-16">
                       <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent animate-spin rounded-full mb-6"></div>
                       <p className="text-yellow-600 font-bold tracking-widest uppercase animate-pulse">Đang thỉnh cầu tinh tú...</p>
                     </div>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: interpretations.intro?.replace(/\n/g, '<br/>') || '' }} />
                  )}
                </div>
              </section>

              {!isPaid ? (
                <Paywall 
                  sessionId={sessionId} 
                  onSuccess={() => {
                    setIsPaid(true);
                    handleFullUnlock();
                  }} 
                />
              ) : (
                <section className="glass-panel p-10 border border-yellow-600/30 rounded-3xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4">
                    <span className="px-3 py-1 bg-yellow-600/20 text-yellow-500 text-[10px] font-bold uppercase rounded-full border border-yellow-500/30">Hạng Premium</span>
                  </div>
                  <h2 className="text-3xl font-heading text-yellow-500 mb-8 flex items-center gap-4">
                    <span className="p-2 bg-yellow-500/10 rounded-lg">📜</span>
                    Khai Giải Chi Tiết Cung Hạn
                  </h2>
                  <div className="prose prose-invert prose-yellow max-w-none leading-relaxed text-gray-200">
                    {loading && !interpretations.full ? (
                      <div className="flex flex-col items-center py-16">
                        <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent animate-spin rounded-full mb-6"></div>
                        <p className="text-yellow-600 font-bold text-center tracking-widest uppercase animate-pulse">
                          Đại sư đang giải mã <br/> Thiên cơ năm 2026...
                        </p>
                      </div>
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: interpretations.full?.replace(/\n/g, '<br/>') || '' }} />
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="mt-32 border-t border-yellow-900/20 py-16 text-center text-gray-600 relative">
        <div className="max-w-4xl mx-auto px-4">
          <p className="font-heading text-yellow-700/50 text-2xl mb-6">Tử Vi Đại Việt</p>
          <p className="mb-4">© 2026 Hệ thống Luận giải Tử vi Chuyên nghiệp. Bảo lưu mọi quyền.</p>
          <p className="text-xs text-gray-700 max-w-lg mx-auto leading-relaxed">
            Thông tin luận giải mang tính chất tham khảo, giúp định hướng và thấu hiểu bản thân. 
            Mọi sự thành bại vẫn nằm ở đức năng và sự nỗ lực của mỗi cá nhân.
          </p>
          <div className="flex justify-center gap-8 mt-10">
            <a href="#" className="hover:text-yellow-600 transition-colors">Điều khoản dịch vụ</a>
            <a href="#" className="hover:text-yellow-600 transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-yellow-600 transition-colors">Hỗ trợ thanh toán</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
