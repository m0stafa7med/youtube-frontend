import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    private darkMode = false;
    private readonly STORAGE_KEY = 'theme-preference';

    constructor() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            this.darkMode = saved === 'dark';
        }
        this.applyTheme();
    }

    toggleTheme(): void {
        this.darkMode = !this.darkMode;
        localStorage.setItem(this.STORAGE_KEY, this.darkMode ? 'dark' : 'light');
        this.applyTheme();
    }

    isDarkMode(): boolean {
        return this.darkMode;
    }

    private applyTheme(): void {
        document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light');
    }
}
