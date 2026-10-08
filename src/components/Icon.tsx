import * as L from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const byEmoji: Record<string, string> = {
  '🧩': 'Puzzle', '🎬': 'PlayCircle', '🎨': 'Palette', '🧭': 'Compass', '🗺': 'Map', '🔬': 'Microscope', '📚': 'BookOpen', '📈': 'TrendingUp',
  '💻': 'Laptop', '🎓': 'GraduationCap', '🩺': 'HeartPulse', '🧠': 'Brain', '🤝': 'Handshake', '📊': 'BarChart3', '💼': 'Briefcase', '🏛': 'Landmark',
  '✨': 'Sparkles', '⚙': 'Cog', '🧬': 'Dna', '🛠': 'Wrench', '🔭': 'Compass', '👤': 'User', '🏠': 'Home', '🌱': 'Compass', '🧪': 'FlaskConical',
  '🤖': 'Bot', '🛡': 'ShieldCheck', '🛍': 'ShoppingBag', '🔧': 'Wrench', '🔎': 'Search', '💹': 'LineChart', '💡': 'Lightbulb', '💊': 'Pill',
  '🏗': 'HardHat', '🌍': 'Globe', '✈': 'Plane', '✅': 'CheckCircle2', '⚕': 'Stethoscope', '⚖': 'Scale', '🧾': 'Receipt', '🧳': 'Briefcase',
  '🧱': 'BrickWall', '🧫': 'FlaskConical', '🧗': 'Mountain', '🦾': 'Cpu', '🦌': 'TreePine', '🤲': 'HeartHandshake', '🛩': 'Plane', '🗂': 'FolderOpen',
  '🔐': 'Lock', '🔍': 'Search', '🔄': 'RefreshCw', '📱': 'Smartphone', '📰': 'Newspaper', '📣': 'Megaphone', '📜': 'ScrollText', '📘': 'Book',
  '📖': 'BookOpen', '📉': 'TrendingDown', '📁': 'Folder', '💪': 'Dumbbell', '👩': 'User', '👨': 'User', '👥': 'Users', '👋': 'Hand', '🏫': 'School',
  '🏨': 'Hotel', '🏦': 'Landmark', '🏥': 'Hospital', '🏘': 'Home', '🏆': 'Trophy', '🏅': 'Medal', '🎵': 'Music', '🎮': 'Gamepad2', '🎥': 'Video',
  '🎤': 'Mic', '🎙': 'Mic', '🍽': 'UtensilsCrossed', '🍎': 'Apple', '🌿': 'Leaf', '🌾': 'Wheat', '🌐': 'Globe', '🌉': 'Waypoints', '✦': 'Sparkle',
  '⚽': 'Dumbbell', '⚡': 'Zap', '⚛': 'Atom', '⚗': 'FlaskConical', '⏱': 'Timer', '🚀': 'Rocket', '⭐': 'Star', '🔔': 'Bell', '⌨': 'Keyboard', '👨‍💻': 'Code', '👩‍⚕': 'Stethoscope',
};

export function Ico({ e, size = 20, color, strokeWidth = 1.75, style }: { e: string; size?: number; color?: string; strokeWidth?: number; style?: React.CSSProperties }) {
  const key = byEmoji[e.replace(/\uFE0F/g, '')] ?? e;
  const Cmp = ((L as unknown as Record<string, LucideIcon>)[key] ?? L.Circle) as LucideIcon;
  return <Cmp size={size} color={color ?? 'currentColor'} strokeWidth={strokeWidth} aria-hidden style={{ flexShrink: 0, ...style }} />;
}
