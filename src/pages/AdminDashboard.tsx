import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';

export const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/admin');
        } else {
          setUser(session.user);
        }
      } catch (err) {
        console.error('Supabase error:', err);
        navigate('/admin');
      }
      setLoading(false);
    };

    checkUser();

    let subscription: any;
    try {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) {
          navigate('/admin');
        } else {
          setUser(session.user);
        }
      });
      subscription = data.subscription;
    } catch (err) {
      console.error('Supabase auth listener error:', err);
    }

    return () => subscription?.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const menuItems = [
    { name: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Testimonials', path: '/admin/dashboard/testimonials', icon: MessageSquare },
    { name: 'Gallery', path: '/admin/dashboard/gallery', icon: ImageIcon },
    { name: 'Categories', path: '/admin/dashboard/categories', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar Mobile Toggle */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-6 right-6 z-50 p-2 bg-gold text-black rounded-sm"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-zinc-950 border-r border-white/10 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col p-6">
          <div className="mb-10">
            <Link to="/" className="flex flex-col items-start">
              <span className="text-xl font-serif tracking-[0.2em] text-white">PIXVIBE</span>
              <span className="text-[8px] tracking-[0.5em] text-gold uppercase -mt-1">ADMIN</span>
            </Link>
          </div>

          <nav className="flex-grow space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-sm transition-all group",
                    isActive 
                      ? "bg-gold text-black" 
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon size={18} />
                    <span className="text-xs uppercase tracking-widest font-medium">{item.name}</span>
                  </div>
                  {isActive && <ChevronRight size={14} />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/10">
            <div className="flex items-center space-x-3 mb-6 px-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-bold">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-white/40 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 w-full text-white/60 hover:text-red-500 transition-colors"
            >
              <LogOut size={18} />
              <span className="text-xs uppercase tracking-widest font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
