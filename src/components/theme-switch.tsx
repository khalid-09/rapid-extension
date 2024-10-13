import { useTheme } from './theme-provider';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Switch } from './ui/switch';

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme-toggle"
        checked={theme === 'dark'}
        onCheckedChange={handleToggle}
      />
      {theme === 'dark' ? (
        <SunIcon className="size-5" />
      ) : (
        <MoonIcon className="size-5" />
      )}
    </div>
  );
};

export default ThemeSwitch;
