import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo, deleteTodo } from '../store/todoSlice';
import { Trash2, Edit2, Calendar, CheckSquare, Square, AlertTriangle } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';
import { toast } from 'react-toastify';

const TodoItem = ({ todo, isSelected, onSelect, onEdit }) => {
  const dispatch = useDispatch();

  const handleToggleComplete = () => {
    dispatch(updateTodo({ 
      id: todo.id, 
      todo: { ...todo, completed: !todo.completed } 
    })).then(() => toast.success(todo.completed ? 'Đã mở lại công việc' : 'Tuyệt vời! Đã hoàn thành'));
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm('Bạn có chắc chắn muốn xóa?')) {
      dispatch(deleteTodo(todo.id)).then(() => toast.info('Đã xóa công việc'));
    }
  };

  const getPriorityInfo = (p) => {
    switch(p) {
      case 'URGENT': return { label: 'Gấp', color: 'bg-red-500', bg: 'bg-red-50' };
      case 'IMPORTANT': return { label: 'Quan trọng', color: 'bg-amber-500', bg: 'bg-amber-50' };
      default: return { label: 'Bình thường', color: 'bg-blue-500', bg: 'bg-blue-50' };
    }
  };

  const pInfo = getPriorityInfo(todo.priority);
  const isOverdue = todo.dueDate && isPast(new Date(todo.dueDate)) && !isToday(new Date(todo.dueDate)) && !todo.completed;

  return (
    <div className={`group glass rounded-2xl p-4 flex items-center gap-4 transition-all hover:translate-x-1 ${isSelected ? 'ring-2 ring-indigo-500 bg-indigo-50/30' : ''} ${todo.completed ? 'opacity-60 grayscale' : ''}`}>
      <div 
        onClick={onSelect}
        className="cursor-pointer text-indigo-200 hover:text-indigo-500 transition-colors"
      >
        {isSelected ? <CheckSquare size={24} className="text-indigo-600" /> : <Square size={24} />}
      </div>

      <div className="flex-1 min-w-0" onClick={handleToggleComplete}>
        <div className="flex items-center gap-2 mb-1">
          <span className={`${pInfo.color} text-[10px] text-white px-2 py-0.5 rounded-lg font-bold uppercase tracking-tighter`}>
            {pInfo.label}
          </span>
          <h3 className={`font-bold text-lg truncate ${todo.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
            {todo.title}
          </h3>
        </div>
        
        {todo.description && (
          <p className="text-sm text-slate-500 line-clamp-1 mb-2">
            {todo.description}
          </p>
        )}

        <div className="flex flex-wrap gap-4 items-center text-xs font-medium">
            {todo.dueDate && (
                <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-600 font-bold' : 'text-slate-400'}`}>
                    <Calendar size={14}/>
                    {format(new Date(todo.dueDate), 'dd/MM/yyyy')}
                    {isOverdue && <AlertTriangle size={14} className="animate-pulse" />}
                </div>
            )}
            <div className="text-slate-400">
                Tạo lúc: {format(new Date(todo.createdAt), 'HH:mm dd/MM')}
            </div>
        </div>
      </div>

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={onEdit}
          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
        >
          <Edit2 size={18} />
        </button>
        <button 
          onClick={handleDelete}
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
