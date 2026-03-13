import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { LightColors, DarkColors, ThemeColors } from './colors';

export function useAppTheme(): { colors: ThemeColors; isDark: boolean } {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const isDark = mode === 'dark';
    return {
        colors: isDark ? DarkColors : LightColors,
        isDark,
    };
}
