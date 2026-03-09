import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, setFilters, bulkDelete, bulkComplete } from './store/todoSlice';
import { Plus, Search, Filter, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';
import { toast } from 'react-toastify';

const App = () => {
  const dispatch = useDispatch();
  const { items, loading, filters } = useSelector((state) => state.todos);
  const [showForm, setShowForm] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBulkDelete = () => {
    if (confirm(`Xóa ${selectedIds.length} công việc đã chọn?`)) {
      dispatch(bulkDelete(selectedIds)).then(() => {
        toast.success('Đã xóa các công việc đã chọn');
        setSelectedIds([]);
      });
    }
  };

  const handleBulkComplete = () => {
    dispatch(bulkComplete(selectedIds)).then(() => {
      toast.success('Đã đánh dấu hoàn thành');
      setSelectedIds([]);
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-indigo-900 tracking-tight">Công việc của tôi</h1>
            <p className="text-slate-500 mt-1">Quản lý công việc hiệu quả và chuyên nghiệp.</p>
          </div>
          <button
            onClick={() => { setEditingTodo(null); setShowForm(true); }}
            className="btn-primary shadow-lg shadow-indigo-200"
          >
            <Plus size={20} /> Thêm công việc
          </button>
        </header>

        {/* Filters & Search */}
        <div className="glass rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm công việc..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500"
              value={filters.search}
              onChange={(e) => handleFilterChange({ search: e.target.value })}
            />
          </div>

          <select
            className="bg-slate-50 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            value={filters.priority || ''}
            onChange={(e) => handleFilterChange({ priority: e.target.value || null })}
          >
            <option value="">Tất cả ưu tiên</option>
            <option value="URGENT">Gấp</option>
            <option value="IMPORTANT">Quan trọng</option>
            <option value="NORMAL">Bình thường</option>
          </select>

          <select
            className="bg-slate-50 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            value={filters.completed === null ? '' : filters.completed}
            onChange={(e) => handleFilterChange({ completed: e.target.value === '' ? null : e.target.value === 'true' })}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="false">Chưa hoàn thành</option>
            <option value="true">Đã hoàn thành</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <div className="bg-indigo-900 text-white p-4 rounded-xl mb-6 flex items-center justify-between animate-in slide-in-from-top duration-300">
            <span>Đã chọn <b>{selectedIds.length}</b> mục</span>
            <div className="flex gap-2">
              <button onClick={handleBulkComplete} className="flex items-center gap-1 hover:text-green-300 transition-colors">
                <CheckCircle size={18} /> Hoàn thành
              </button>
              <button onClick={handleBulkDelete} className="flex items-center gap-1 hover:text-red-300 transition-colors">
                <Trash2 size={18} /> Xóa
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="glass p-4 rounded-2xl flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><Clock size={24} /></div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Tổng số</p>
              <p className="text-2xl font-black">{items.length}</p>
            </div>
          </div>
          <div className="glass p-4 rounded-2xl flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl text-green-600"><CheckCircle size={24} /></div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Đã xong</p>
              <p className="text-2xl font-black">{items.filter(i => i.completed).length}</p>
            </div>
          </div>
          <div className="glass p-4 rounded-2xl flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-xl text-red-600"><AlertCircle size={24} /></div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Quá hạn</p>
              <p className="text-2xl font-black">{items.filter(i => !i.completed && i.dueDate && new Date(i.dueDate) < new Date()).length}</p>
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">Đang tải dữ liệu...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 glass rounded-2xl italic text-slate-400">Không có công việc nào.</div>
          ) : (
            items.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isSelected={selectedIds.includes(todo.id)}
                onSelect={() => handleSelect(todo.id)}
                onEdit={() => { setEditingTodo(todo); setShowForm(true); }}
              />
            ))
          )}
        </div>

        {showForm && (
          <TodoForm
            todo={editingTodo}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
