
import React, { useState } from 'react';
import { STICKY_SESSION_KEY } from '../constants';

interface PaywallProps {
  sessionId: string;
  onSuccess: () => void;
}

const Paywall: React.FC<PaywallProps> = ({ sessionId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const amount = 19000;
  const bankId = '970423'; // Techcombank
  const accountNo = '8396869395';
  const accountName = 'DOAN VAN HIEN';
  const description = `MOKHOA_TUVI_${sessionId}`;
  
  const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(accountName)}`;

  const handlePaymentConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem(STICKY_SESSION_KEY, 'paid');
      setLoading(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="glass-panel border-2 border-yellow-700/30 rounded-3xl p-10 max-w-lg mx-auto text-center shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      <div className="mb-8">
        <div className="inline-block p-4 rounded-full bg-yellow-500/5 mb-4 border border-yellow-500/10">
          <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-3xl font-heading font-bold text-white mb-3">Mở Khóa Cơ Mệnh</h2>
        <p className="text-indigo-300 text-sm leading-relaxed px-4 italic font-medium">
          Mở khóa toàn bộ luận giải 12 cung, đại vận và tiểu vận năm 2026 từ chuyên gia lý số.
        </p>
      </div>

      <div className="bg-white p-3 rounded-xl mb-8 inline-block shadow-inner ring-4 ring-yellow-900/10">
        <img src={qrUrl} alt="QR Thanh Toan" className="w-60 h-60 object-contain" />
      </div>

      <div className="text-left space-y-4 mb-10 bg-black/30 p-6 rounded-2xl border border-yellow-900/10">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Ngân hàng</span>
          <span className="text-white font-bold">Techcombank</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Tài khoản</span>
          <span className="text-white font-bold tracking-wider">{accountNo}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Chủ tài khoản</span>
          <span className="text-white font-bold uppercase">{accountName}</span>
        </div>
        <div className="pt-2 border-t border-yellow-900/10 flex justify-between items-center">
          <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Nội dung</span>
          <span className="text-yellow-500 font-black text-sm">{description}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Số tiền</span>
          <span className="text-yellow-500 font-black text-lg">19.000 VNĐ</span>
        </div>
      </div>

      <button
        onClick={handlePaymentConfirm}
        disabled={loading}
        className="w-full gold-gradient text-black font-black py-5 rounded-xl hover:brightness-110 shadow-[0_5px_20px_rgba(212,175,55,0.2)] transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-3 border-black border-t-transparent animate-spin rounded-full"></div>
            Đang xác thực...
          </>
        ) : 'Xác nhận đã thanh toán'}
      </button>
      
      <p className="mt-6 text-[11px] text-gray-500 italic px-6 leading-relaxed">
        * Hệ thống tự động kích hoạt sau khi giao dịch thành công. Quý khách vui lòng giữ lại ảnh chụp màn hình nếu cần hỗ trợ.
      </p>
    </div>
  );
};

export default Paywall;
