import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Dog, Phone, Calendar } from './Icons';

export const Chatbox = ({ user, onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Xin chào! 🐾 Chào mừng bạn đến với BossHouse. Mình có thể giúp gì cho bạn và các bé Boss cưng hôm nay?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    '🏨 Bảng giá phòng',
    '✂️ Dịch vụ Spa & Cắt tỉa',
    '🚗 Đưa đón tận nơi',
    '📅 Hướng dẫn đặt chỗ'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSendMessage = (textToSend = inputText) => {
    const query = textToSend.trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (textToSend === inputText) setInputText('');
    setIsTyping(true);

    // Simulate intelligent Bot response
    setTimeout(() => {
      let replyText = 'Cảm ơn bạn đã liên hệ! Chuyên viên chăm sóc thú cưng của BossHouse sẽ phản hồi bạn trong giây lát. Hoặc bạn có thể gọi hotline: 0988 123 456 để được tư vấn trực tiếp!';
      
      const lower = query.toLowerCase();
      if (lower.includes('giá') || lower.includes('phòng') || lower.includes('bảng giá')) {
        replyText = '🏨 BossHouse hiện có 3 hạng phòng tiêu chuẩn:\n• Deluxe Suite: 250.000đ/đêm (phòng VIP có camera 24/7)\n• Standard Room: 150.000đ/đêm\n• Cat Villa: 180.000đ/đêm\n\nBạn có muốn tiến hành đặt phòng ngay cho Boss không?';
      } else if (lower.includes('spa') || lower.includes('tỉa') || lower.includes('tắm') || lower.includes('dịch vụ')) {
        replyText = '✂️ Dịch vụ Spa bao gồm: Tắm thảo dược massage, Cắt tỉa tạo kiểu, Vệ sinh tai & Cắt móng chuyên nghiệp. Giá dao động từ 120.000đ - 350.000đ tùy trọng lượng bé!';
      } else if (lower.includes('đưa đón') || lower.includes('xe')) {
        replyText = '🚗 BossHouse cung cấp dịch vụ đưa đón Boss tận nhà trong bán kính 15km bằng xe chuyên dụng đưa đón an toàn có máy lạnh!';
      } else if (lower.includes('đặt') || lower.includes('lịch') || lower.includes('hướng dẫn')) {
        replyText = '📅 Để đặt phòng hoặc đặt Spa, bạn chỉ cần nhấn nút "Đặt Phòng Ngay" ở góc trên màn hình hoặc chọn phòng thích hợp tại tab "Phòng Khách Sạn"!';
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div 
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(245, 158, 11, 0.4)',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative'
          }}
          className="chatbox-trigger-btn"
          title="Trò chuyện với BossHouse Support"
        >
          {isOpen ? <X size={26} color="#0f172a" /> : <MessageCircle size={28} color="#0f172a" />}
          
          {!isOpen && unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#ef4444',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 800,
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #0f172a'
            }}>
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '96px',
          right: '24px',
          width: 'calc(100vw - 48px)',
          maxWidth: '380px',
          height: '520px',
          maxHeight: 'calc(100vh - 120px)',
          background: '#1e293b',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideInRight 0.25s ease-out'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem'
              }}>
                🐾
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', margin: 0 }}>Hỗ Trợ Khách Hàng</h4>
                <span style={{ fontSize: '0.75rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399' }} /> Online 24/7
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ color: 'var(--color-text-muted)' }}>
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: '#0f172a'
          }}>
            {messages.map(msg => (
              <div 
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%'
                }}
              >
                <div style={{
                  padding: '10px 14px',
                  borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                  background: msg.sender === 'user' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : '#1e293b',
                  color: msg.sender === 'user' ? '#0f172a' : '#f8fafc',
                  fontSize: '0.88rem',
                  fontWeight: msg.sender === 'user' ? 600 : 400,
                  whiteSpace: 'pre-line',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--color-border)'
                }}>
                  {msg.text}
                </div>
                <span style={{
                  fontSize: '0.68rem',
                  color: 'var(--color-text-subtle)',
                  marginTop: '4px',
                  display: 'block',
                  textAlign: msg.sender === 'user' ? 'right' : 'left'
                }}>
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div style={{ alignSelf: 'flex-start', background: '#1e293b', padding: '8px 14px', borderRadius: '16px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                🐾 Trợ lý đang soạn câu trả lời...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div style={{
            padding: '8px 12px',
            background: '#1e293b',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}>
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                style={{
                  padding: '5px 10px',
                  background: 'rgba(30, 41, 59, 0.9)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--color-primary)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div style={{
            padding: '12px',
            background: '#1e293b',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            gap: '8px'
          }}>
            <input 
              type="text"
              className="form-input"
              placeholder="Nhập câu hỏi..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              style={{ padding: '8px 12px', fontSize: '0.88rem' }}
            />
            <button 
              className="btn btn-primary"
              onClick={() => handleSendMessage()}
              style={{ padding: '8px 14px' }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
