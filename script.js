// Particle background
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ['#00ff88', '#ff0077', '#f0f0f0'] },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#00ff88', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 1.5, direction: 'none', random: true }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'bubble' } },
        modes: { grab: { distance: 200, line_linked: { opacity: 0.7 } }, bubble: { distance: 200, size: 6, duration: 0.3 } }
    },
    retina_detect: true
});

// Smooth scrolling for navigation links
function attachScrollListeners() {
    const navLinks = document.querySelectorAll('.navigation a');
    navLinks.forEach(anchor => {
        anchor.removeEventListener('click', handleNavClick);
        anchor.addEventListener('click', handleNavClick);
    });
}

function handleNavClick(e) {
    e.preventDefault();
    if (!this) {
        console.warn('Navigation link context is undefined');
        return;
    }
    const href = this.getAttribute('href');
    if (typeof href !== 'string' || href === '') {
        console.warn('Invalid or missing href attribute on navigation link:', this, 'Text:', this.textContent);
        return;
    }
    const targetId = href.charAt(0) === '#' ? href.slice(1) : href;
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
        document.querySelectorAll('.navigation a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    } else {
        console.warn('Target element not found for ID:', targetId);
    }
}

// Update time display
function updateTime() {
    const now = new Date();
    const vietnamTime = now.toLocaleString('en-US', { 
        timeZone: 'Asia/Ho_Chi_Minh', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    });
    const timeElement = document.getElementById('time');
    if (timeElement) {
        timeElement.textContent = vietnamTime;
    }
}
setInterval(updateTime, 1000);
updateTime();

// Language switching
let currentLang = 'en';
let isUpdating = false;
const translations = {
    en: {
        navAbout: 'About',
        navProjects: 'Projects',
        navCertificates: 'Certificates',
        navSkills: 'Skills',
        navContact: 'Contact',
        headerDesc: 'DATA ANALYST & DEVELOPER',
        aboutTitle: 'Who Am I',
        aboutP1: 'I am Phan Danh Dat, a Computer Science student at Thang Long University, driven by data, LLM, AI, ML, and DL. As a data analyst and data scientist, I aim to transform raw data into actionable insights that drive change.',
        aboutP2: 'Movement, both in work and life, keeps me inspired—whether it\'s hitting the gym, swimming, or staying active. I believe that maintaining energy and adaptability fuels creativity and problem-solving.',
        aboutP3: 'I thrive in dynamic environments, always eager to learn, adapt, and innovate in the fast-evolving world of technology.',
        projectsTitle: 'Personal Projects',
        project1Title: 'Credit Card Clustering',
        project1Desc: 'Customer segmentation analysis using Python, R, Excel, SSMS, and Power BI to design loyalty programs.',
        project2Title: 'Risk Credit',
        project2Desc: 'Analysis to predict customer default risk using Python, R, SSMS, Excel, and Power BI to reduce bad debt rates.',
        project3Title: 'Revenue Forecast',
        project3Desc: 'Revenue prediction for 12 months using Python, R, SSMS, Excel, and Power BI, analyzing interest rates and inflation impact.',
        certificatesTitle: 'Certificates',
        skillsTitle: 'Skills'
    },
    vi: {
        navAbout: 'Giới Thiệu',
        navProjects: 'Dự Án',
        navCertificates: 'Chứng Chỉ',
        navSkills: 'Kỹ Năng',
        navContact: 'Liên Hệ',
        headerDesc: 'CHUYÊN GIA PHÂN TÍCH DỮ LIỆU & PHÁT TRIỂN',
        aboutTitle: 'Tôi Là Ai',
        aboutP1: 'Tôi là Phan Danh Đạt, sinh viên Khoa học Máy tính tại Đại học Thăng Long, đam mê dữ liệu, LLM, AI, ML, và DL. Là một nhà phân tích dữ liệu và nhà khoa học dữ liệu, tôi hướng đến việc biến dữ liệu thô thành những hiểu biết có thể tạo ra sự thay đổi.',
        aboutP2: 'Vận động, cả trong công việc và cuộc sống, giữ tôi luôn tràn đầy cảm hứng—dù là ở phòng gym, bơi lội, hay duy trì sự năng động. Tôi tin rằng việc giữ năng lượng và khả năng thích nghi sẽ nuôi dưỡng sự sáng tạo và cách tiếp cận giải quyết vấn đề.',
        aboutP3: 'Tôi phát triển trong môi trường năng động, luôn sẵn sàng học hỏi, thích nghi và đổi mới trong thế giới công nghệ không ngừng phát triển.',
        projectsTitle: 'Dự Án Cá Nhân',
        project1Title: 'Phân Cụm Thẻ Tín Dụng',
        project1Desc: 'Phân tích phân cụm khách hàng bằng Python, R, Excel, SSMS và Power BI để thiết kế chương trình khách hàng thân thiết.',
        project2Title: 'Rủi Ro Tín Dụng',
        project2Desc: 'Phân tích dự đoán rủi ro vỡ nợ của khách hàng bằng Python, R, SSMS, Excel và Power BI để giảm tỷ lệ nợ xấu.',
        project3Title: 'Dự Báo Doanh Thu',
        project3Desc: 'Dự báo doanh thu 12 tháng bằng Python, R, SSMS, Excel và Power BI, phân tích tác động của lãi suất và lạm phát.',
        certificatesTitle: 'Chứng Chỉ',
        skillsTitle: 'Kỹ Năng'
    }
};

function updateLanguage(lang) {
    if (isUpdating || currentLang === lang) return;
    isUpdating = true;
    const nav = document.getElementById('navigation');
    if (nav) nav.classList.add('disabled');

    setTimeout(() => {
        const translatableElements = document.querySelectorAll('[data-translate]');
        const projectTitleKeys = ['project1Title', 'project2Title', 'project3Title'];
        translatableElements.forEach(element => {
            try {
                const key = element.dataset.translate;
                if (!key) {
                    console.warn('Missing data-translate key on element:', element);
                    return;
                }
                if (!translations[lang][key]) {
                    console.warn('Translation key not found:', key, 'Element:', element);
                    return;
                }
                if (projectTitleKeys.includes(key)) {
                    const textNode = Array.from(element.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
                    if (textNode) {
                        textNode.textContent = translations[lang][key] + ' ';
                    } else {
                        console.warn('No text node found for project title:', element, 'Key:', key);
                    }
                } else {
                    element.textContent = translations[lang][key];
                }
            } catch (error) {
                console.error('Error processing element:', element, 'Error:', error);
            }
        });
        currentLang = lang;
        if (nav) nav.classList.remove('disabled');
        isUpdating = false;
    }, 100);
}

// Parallax and reveal effects
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.2, rootMargin: '-50px' });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    const scrollY = window.scrollY;
    header.style.setProperty('--scroll-y', scrollY + 'px');
});

// Initial setup
attachScrollListeners();
updateLanguage('en');