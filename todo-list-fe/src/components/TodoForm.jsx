import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../store/todoSlice';
import { X, Send } from 'lucide-react';
import { toast } from 'react-toastify';

const TodoForm = ({ todo, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: todo?.title || '',
    description: todo?.description || '',
    priority: todo?.priority || 'NORMAL',
    dueDate: todo?.dueDate || '',
    completed: todo?.completed || false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return toast.warn('Tiêu đề không được để trống');

    if (todo) {
      dispatch(updateTodo({ id: todo.id, todo: formData }))
        .then(() => { toast.success('Đã cập nhật công việc'); onClose(); });
    } else {
      dispatch(addTodo(formData))
        .then(() => { toast.success('Đã thêm công việc mới'); onClose(); });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-indigo-900/20 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-2xl font-black text-indigo-900">
            {todo ? 'Sửa công việc' : 'Thêm công việc'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1 uppercase tracking-wider">Tiêu đề</label>
            <input 
              autoFocus
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition-all"
              placeholder="Hôm nay cần làm gì?"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1 uppercase tracking-wider">Mô tả</label>
            <textarea 
              rows="3"
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition-all"
              placeholder="Chi tiết công việc..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1 uppercase tracking-wider">Ưu tiên</label>
              <select 
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-indigo-500 outline-none"
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
              >
                <option value="URGENT">Gấp</option>
                <option value="IMPORTANT">Quan trọng</option>
                <option value="NORMAL">Bình thường</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1 uppercase tracking-wider">Hạn chót</label>
              <input 
                type="date"
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-indigo-500 outline-none"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary py-4 justify-center text-lg font-bold mt-4 shadow-xl shadow-indigo-200">
            <Send size={20} /> {todo ? 'Cập nhật' : 'Tạo ngay'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
