/**
 * IronPeak Gym — Shared Components & Utilities
 * Handles: Nav injection, Footer injection, Theme, RTL,
 *          Animations, Tabs, Counters, Accordions, Dashboard sidebar
 */

/* ─── THEME ────────────────────────────────────────────── */
(function initTheme() {
    const saved = localStorage.getItem('gym_theme');
    const html = document.documentElement;
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    const dir = localStorage.getItem('gym_dir');
    if (dir === 'rtl') {
        html.setAttribute('dir', 'rtl');
    }
})();

function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('gym_theme', isDark ? 'dark' : 'light');
    updateThemeIcons();
}

function toggleDir() {
    const html = document.documentElement;
    const isRTL = html.getAttribute('dir') === 'rtl';
    html.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
    localStorage.setItem('gym_dir', isRTL ? 'ltr' : 'rtl');
    document.querySelectorAll('[id$="-dir-btn"]').forEach(btn => {
        btn.textContent = isRTL ? 'LTR' : 'RTL';
    });
}

function updateThemeIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    const sunSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    const moonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    document.querySelectorAll('#dash-theme-icon,#login-theme-icon,#signup-theme-icon,#err-theme-icon,#cs-theme-icon').forEach(el => {
        el.innerHTML = isDark ? sunSVG : moonSVG;
    });
    // Main nav theme icon
    const navTheme = document.getElementById('nav-theme-icon');
    if (navTheme) navTheme.innerHTML = isDark ? sunSVG : moonSVG;
}

function togglePwd(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (!input) return;
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    if (icon) {
        icon.innerHTML = isHidden
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
    }
}

/* ─── NAV & FOOTER INJECTION ────────────────────────────── */
const NAV_LINKS = [
    { href: 'index.html', label: 'Home 1' },
    { href: 'home2.html', label: 'Home 2' },
    { href: 'about.html', label: 'About' },
    { href: 'classes.html', label: 'Classes' },
    { href: 'trainers.html', label: 'Trainers' },
    { href: 'pricing.html', label: 'Pricing' },
    { href: 'contact.html', label: 'Contact' },
];

function buildNav() {
    const wrap = document.getElementById('main-nav');
    if (!wrap) return;

    const isDash = window.location.pathname.includes('/dashboard/');
    const base = isDash ? '../' : '';
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    wrap.innerHTML = `
<header class="main-header" id="main-header" role="banner">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between w-full" aria-label="Main navigation">

        <!-- Logo -->
        <a href="${base}index.html" class="flex items-center gap-2.5 logo-bounce flex-shrink-0" aria-label="IronPeak Gym Home">
            <div class="w-9 h-9 bg-[#E8401C] rounded-xl flex items-center justify-center shadow-md shrink-0">
                <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="10" y="42" width="80" height="16" rx="4" fill="white" opacity="0.95"/>
                    <rect x="6" y="28" width="16" height="44" rx="5" fill="white" opacity="0.9"/>
                    <rect x="78" y="28" width="16" height="44" rx="5" fill="white" opacity="0.9"/>
                    <rect x="0" y="35" width="10" height="30" rx="4" fill="white" opacity="0.7"/>
                    <rect x="90" y="35" width="10" height="30" rx="4" fill="white" opacity="0.7"/>
                </svg>
            </div>
            <div class="flex flex-col leading-none">
                <span class="font-black text-[#1A1A2E] dark:text-white text-base tracking-tight" style="font-family:'Barlow Condensed',sans-serif;">IRON<span class="text-[#E8401C]">PEAK</span></span>
                <span class="font-semibold text-[#5a5a7a] dark:text-[#9090b8] text-[10px] tracking-widest uppercase">Gym & Fitness</span>
            </div>
        </a>

        <!-- Desktop Links -->
        <ul class="hidden lg:flex items-center gap-1" role="list">
            ${NAV_LINKS.map(link => {
                const isActive = currentPage === link.href;
                return `<li><a href="${base}${link.href}" class="nav-link${isActive ? ' active' : ''}" aria-current="${isActive ? 'page' : 'false'}">${link.label}</a></li>`;
            }).join('')}
        </ul>

        <!-- Right Controls -->
        <div class="flex items-center gap-2">
            <!-- Dir toggle -->
            <button id="nav-dir-btn" onclick="toggleDir()" class="hidden md:flex w-9 h-9 items-center justify-center rounded-xl bg-[#1A1A2E]/6 dark:bg-white/6 border border-[#1A1A2E]/10 dark:border-white/10 text-[#5a5a7a] dark:text-[#9090b8] hover:text-[#E8401C] transition-all text-[10px] font-black" title="Toggle RTL/LTR">LTR</button>
            <!-- Theme -->
            <button onclick="toggleTheme()" class="w-9 h-9 flex items-center justify-center rounded-xl bg-[#1A1A2E]/6 dark:bg-white/6 border border-[#1A1A2E]/10 dark:border-white/10 text-[#5a5a7a] dark:text-[#9090b8] hover:text-[#E8401C] dark:hover:text-white transition-all" aria-label="Toggle dark/light mode">
                <span id="nav-theme-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></span>
            </button>
            <!-- Login -->
            <a href="${base}login.html" class="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#1A1A2E] dark:text-[#9090b8] hover:text-[#E8401C] dark:hover:text-white transition-colors px-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Sign In
            </a>
            <!-- CTA -->
            <a href="${base}signup.html" class="btn-primary text-xs px-5 py-2.5 hidden sm:flex items-center gap-1.5">Join Free</a>
            <!-- Mobile Hamburger -->
            <button id="mobile-menu-btn" onclick="toggleMobileMenu()" class="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-[#1A1A2E]/6 dark:bg-white/6 border border-[#1A1A2E]/10 dark:border-white/10 text-[#1A1A2E] dark:text-white" aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="mobile-menu">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" id="hamburger-icon"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
        </div>
    </nav>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden lg:hidden border-t border-[#e2e2ef] dark:border-[#252545] bg-white dark:bg-[#13132a]" role="navigation" aria-label="Mobile navigation">
        <div class="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            ${NAV_LINKS.map(link => {
                const isActive = currentPage === link.href;
                return `<a href="${base}${link.href}" class="mobile-nav-link${isActive ? ' active' : ''}" aria-current="${isActive ? 'page' : 'false'}">${link.label}</a>`;
            }).join('')}
            <div class="flex gap-3 pt-4 border-t border-[#e2e2ef] dark:border-[#252545] mt-2">
                <a href="${base}login.html" class="flex-1 btn-secondary text-center py-3 text-xs">Sign In</a>
                <a href="${base}signup.html" class="flex-1 btn-primary text-center py-3 text-xs">Join Free</a>
            </div>
        </div>
    </div>
</header>`;

    // Scroll shadow
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }
    }, { passive: true });

    // For public pages: offset body top so content flows below the fixed 68px nav
    if (!isDash) {
        document.body.style.paddingTop = '68px';
        // Hero sections that are full-bleed (absolute bg) should NOT be offset twice
        // We pull them back up by -68px via negative margin
        const firstSection = document.querySelector('section:first-of-type');
        if (firstSection) {
            const hasAbsoluteBg = firstSection.querySelector('.absolute.inset-0');
            if (hasAbsoluteBg) {
                // Full-bleed hero: remove body padding, keep nav overlay look
                document.body.style.paddingTop = '0';
                // Instead add padding to the hero inner content wrapper
                // (already done in index.html via pt-[100px])
            }
        }
    }

    // Update dir button
    if (localStorage.getItem('gym_dir') === 'rtl') {
        const btn = document.getElementById('nav-dir-btn');
        if (btn) btn.textContent = 'RTL';
    }

    updateThemeIcons();
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('mobile-menu-btn');
    if (!menu) return;
    const isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden', isOpen);
    if (btn) btn.setAttribute('aria-expanded', String(!isOpen));
}

/* ─── FOOTER INJECTION ──────────────────────────────────── */
function buildFooter() {
    const wrap = document.getElementById('main-footer');
    if (!wrap) return;
    const isDash = window.location.pathname.includes('/dashboard/');
    const base = isDash ? '../' : '';

    wrap.innerHTML = `
<footer class="main-footer" role="contentinfo">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Top -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">
            <!-- Brand -->
            <div class="sm:col-span-2 lg:col-span-1">
                <a href="${base}index.html" class="flex items-center gap-2.5 mb-5 logo-bounce">
                    <div class="w-10 h-10 bg-[#E8401C] rounded-xl flex items-center justify-center shadow-md">
                        <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="10" y="42" width="80" height="16" rx="4" fill="white" opacity="0.95"/>
                            <rect x="6" y="28" width="16" height="44" rx="5" fill="white" opacity="0.9"/>
                            <rect x="78" y="28" width="16" height="44" rx="5" fill="white" opacity="0.9"/>
                            <rect x="0" y="35" width="10" height="30" rx="4" fill="white" opacity="0.7"/>
                            <rect x="90" y="35" width="10" height="30" rx="4" fill="white" opacity="0.7"/>
                        </svg>
                    </div>
                    <div class="flex flex-col leading-none">
                        <span class="font-black text-white text-base tracking-tight" style="font-family:'Barlow Condensed',sans-serif;">IRON<span class="text-[#E8401C]">PEAK</span></span>
                        <span class="text-[#9090b8] text-[10px] font-semibold tracking-widest uppercase">Gym & Fitness</span>
                    </div>
                </a>
                <p class="text-[#9090b8] text-sm leading-relaxed mb-5">Your neighborhood gym with expert trainers, diverse classes, and a community that lifts each other up.</p>
                <div class="flex gap-2">
                    <a href="#" class="w-9 h-9 bg-white/8 hover:bg-[#E8401C] border border-white/10 hover:border-[#E8401C] rounded-xl flex items-center justify-center transition-all" aria-label="Instagram">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </a>
                    <a href="#" class="w-9 h-9 bg-white/8 hover:bg-[#E8401C] border border-white/10 hover:border-[#E8401C] rounded-xl flex items-center justify-center transition-all" aria-label="Facebook">
                        <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                    <a href="#" class="w-9 h-9 bg-white/8 hover:bg-[#E8401C] border border-white/10 hover:border-[#E8401C] rounded-xl flex items-center justify-center transition-all" aria-label="YouTube">
                        <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1A1A2E"/></svg>
                    </a>
                    <a href="#" class="w-9 h-9 bg-white/8 hover:bg-[#E8401C] border border-white/10 hover:border-[#E8401C] rounded-xl flex items-center justify-center transition-all" aria-label="Twitter/X">
                        <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                </div>
            </div>

            <!-- Quick Links -->
            <div>
                <h3 class="text-white font-black text-sm uppercase tracking-widest mb-4">Quick Links</h3>
                <ul class="space-y-2.5">
                    <li><a href="${base}index.html" class="footer-link">Home 1</a></li>
                    <li><a href="${base}home2.html" class="footer-link">Home 2</a></li>
                    <li><a href="${base}about.html" class="footer-link">About Us</a></li>
                    <li><a href="${base}classes.html" class="footer-link">Classes</a></li>
                    <li><a href="${base}trainers.html" class="footer-link">Trainers</a></li>
                    <li><a href="${base}pricing.html" class="footer-link">Membership</a></li>
                    <li><a href="${base}contact.html" class="footer-link">Contact</a></li>
                </ul>
            </div>

            <!-- Services -->
            <div>
                <h3 class="text-white font-black text-sm uppercase tracking-widest mb-4">Services</h3>
                <ul class="space-y-2.5">
                    <li><a href="${base}classes.html" class="footer-link">Group Classes</a></li>
                    <li><a href="${base}trainers.html" class="footer-link">Personal Training</a></li>
                    <li><a href="${base}coming-soon.html" class="footer-link">Nutrition Coaching</a></li>
                    <li><a href="${base}dashboard/index.html" class="footer-link">Member Dashboard</a></li>
                    <li><a href="${base}coming-soon.html" class="footer-link">Online Classes</a></li>
                </ul>
            </div>

            <!-- Contact -->
            <div>
                <h3 class="text-white font-black text-sm uppercase tracking-widest mb-4">Contact</h3>
                <ul class="space-y-3 text-sm text-[#9090b8]">
                    <li class="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#E8401C" stroke-width="2" class="mt-0.5 shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        247 Fitness Blvd, NY 10001
                    </li>
                    <li class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#E8401C" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.44 2 2 0 0 1 3.6 2.24h3a2 2 0 0 1 2 1.72c.13.96.34 1.9.65 2.82a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.92.31 1.86.52 2.82.65A2 2 0 0 1 21.72 17z"/></svg>
                        +1 (212) 555-0192
                    </li>
                    <li class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#E8401C" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        hello@ironpeakgym.com
                    </li>
                    <li class="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#E8401C" stroke-width="2" class="mt-0.5 shrink-0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <span>Mon–Fri: 5AM–11PM<br>Sat: 6AM–10PM<br>Sun: 7AM–9PM</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9090b8]">
            <p>© ${new Date().getFullYear()} IronPeak Gym & Fitness Center. All rights reserved.</p>
            <div class="flex gap-5">
                <a href="${base}coming-soon.html" class="hover:text-[#E8401C] transition-colors">Privacy Policy</a>
                <a href="${base}coming-soon.html" class="hover:text-[#E8401C] transition-colors">Terms of Service</a>
                <a href="${base}coming-soon.html" class="hover:text-[#E8401C] transition-colors">Cookie Policy</a>
            </div>
        </div>
    </div>
</footer>`;
}

/* ─── BACK TO TOP ───────────────────────────────────────── */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ─── SCROLL ANIMATIONS ─────────────────────────────────── */
function initScrollAnimations() {
    const selectors = '.reveal,.reveal-left,.reveal-right,.stagger-item,.stat-card';
    const elements = document.querySelectorAll(selectors);
    if (!elements.length) return;

    const revealEl = (el) => {
        el.classList.add('visible');
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revealEl(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    elements.forEach(el => {
        // Immediately reveal elements already in viewport (above fold)
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            revealEl(el);
        } else {
            observer.observe(el);
        }
    });
}

/* ─── COUNT-UP ANIMATION ────────────────────────────────── */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            const suffix = el.dataset.suffix || '';
            const duration = 1800;
            const start = performance.now();

            const tick = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target) + suffix;
                if (progress < 1) requestAnimationFrame(tick);
                else el.textContent = target + suffix;
            };
            requestAnimationFrame(tick);
            observer.unobserve(el);
        });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
}

/* ─── TABS ──────────────────────────────────────────────── */
function initTabs() {
    document.querySelectorAll('.cat-tab').forEach(tab => {
        tab.addEventListener('click', function () {
            const targetId = this.dataset.tab;
            if (!targetId) return;

            // Sibling tabs
            const siblings = this.parentElement.querySelectorAll('.cat-tab');
            siblings.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Tab contents — find all siblings of target
            const target = document.getElementById(targetId);
            if (!target) return;
            const allContents = target.parentElement.querySelectorAll('.tab-content');
            allContents.forEach(c => c.classList.remove('active'));
            target.classList.add('active');
        });
    });
}

/* ─── ACCORDION (FAQ) ───────────────────────────────────── */
function toggleAccordion(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('[data-acc-icon]');
    const isOpen = content.classList.contains('open');

    // Close all in same container
    const parent = btn.closest('section') || document.body;
    parent.querySelectorAll('.accordion-content.open').forEach(c => {
        c.classList.remove('open');
        c.style.maxHeight = null;
        const ic = c.previousElementSibling.querySelector('[data-acc-icon]');
        if (ic) ic.style.transform = 'rotate(0deg)';
    });

    if (!isOpen) {
        content.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
        if (icon) icon.style.transform = 'rotate(180deg)';
    }
}

/* ─── DASHBOARD SIDEBAR ─────────────────────────────────── */
function toggleSidebar() {
    const sidebar = document.getElementById('dash-sidebar');
    const overlay = document.getElementById('dash-overlay');
    const closeBtn = document.getElementById('sidebar-close');
    if (!sidebar) return;

    const isOpen = sidebar.classList.contains('open');
    sidebar.classList.toggle('open', !isOpen);
    if (overlay) overlay.classList.toggle('active', !isOpen);
    if (closeBtn) closeBtn.classList.toggle('hidden', isOpen);
    document.body.style.overflow = (!isOpen) ? 'hidden' : '';
}

function closeSidebar() {
    const sidebar = document.getElementById('dash-sidebar');
    const overlay = document.getElementById('dash-overlay');
    const closeBtn = document.getElementById('sidebar-close');
    if (!sidebar) return;
    sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    if (closeBtn) closeBtn.classList.add('hidden');
    document.body.style.overflow = '';
}

/* ─── MARQUEE ───────────────────────────────────────────── */
function initMarquee() {
    const containers = document.querySelectorAll('.marquee-container');
    containers.forEach(container => {
        const content = container.querySelector('.marquee-content');
        if (!content) return;
        // Already doubled via HTML; ensure animation is running
    });
}

/* ─── INIT ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
    buildNav();
    buildFooter();
    initBackToTop();
    // Small delay so layout settles after nav injection before checking
    // element positions for scroll reveal
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            initScrollAnimations();
            initCounters();
        });
    });
    initTabs();
    initMarquee();
    updateThemeIcons();

    // Sync dir button labels on load
    if (localStorage.getItem('gym_dir') === 'rtl') {
        document.querySelectorAll('[id$="-dir-btn"]').forEach(b => {
            b.textContent = 'RTL';
        });
    }
});
