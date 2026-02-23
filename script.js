// --- 1. إدارة الوضع الليلي (Dark Mode) ---
function toggleDarkMode() {
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');
    
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        icon.className = 'fas fa-moon';
        localStorage.setItem('hospital-theme', 'light');
    } else {
        html.classList.add('dark');
        icon.className = 'fas fa-sun';
        localStorage.setItem('hospital-theme', 'dark');
    }
}

// تحميل تفضيلات المستخدم عند فتح الصفحة
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('hospital-theme') === 'dark') {
        document.documentElement.classList.add('dark');
        const icon = document.getElementById('theme-icon');
        if(icon) icon.className = 'fas fa-sun';
    }
});


// --- 2. نظام الحجز عبر واتساب ---
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelectorAll('input')[0].value;
    const dept = this.querySelector('select').value;
    const phoneNumber = "967782629622"; // رقم المستشفى

    const message = `تحية طيبة مستشفى ابن الحاج التخصصي..%0A%0A` +
                    `أود حجز موعد طبي عبر الموقع الإلكتروني:%0A` +
                    `• اسم المريض: ${name}%0A` +
                    `• العيادة المطلوبة: ${dept}%0A%0A` +
                    `يرجى تأكيد الحجز وموافاتي بالموعد.`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
});


// --- 3. حاسبة مؤشر كتلة الجسم (BMI) مع النصائح ---
function calculateBMI() {
    const weightInput = document.getElementById('weight').value;
    const heightInput = document.getElementById('height').value;
    const res = document.getElementById('bmi-result');

    const weight = parseFloat(weightInput);
    let height = parseFloat(heightInput);

    if (weight > 0 && height > 0) {
        // تصحيح الطول إذا تم إدخاله بالسنتيمتر
        if (height > 3) height = height / 100;

        const bmi = (weight / (height * height)).toFixed(1);
        let status = "", advice = "", colorClass = "", barWidth = "";

        if (bmi < 18.5) {
            status = "نقص في الوزن";
            advice = "تحتاج إلى استشارة أخصائي تغذية لزيادة السعرات الحرارية بشكل صحي.";
            colorClass = "text-blue-500";
            barWidth = "20%";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            status = "وزن مثالي";
            advice = "أنت في النطاق الصحي! حافظ على ممارسة الرياضة والغذاء المتوازن.";
            colorClass = "text-emerald-500";
            barWidth = "50%";
        } else if (bmi >= 25 && bmi <= 29.9) {
            status = "زيادة في الوزن";
            advice = "لديك زيادة بسيطة، ننصحك بتقليل النشويات والمشي نصف ساعة يومياً.";
            colorClass = "text-yellow-500";
            barWidth = "75%";
        } else {
            status = "سمنة مفرطة";
            advice = "نوصيك بزيارة د. أماني بن حفيظ أو د. أحمد الملاحي للاطمئنان على صحة القلب.";
            colorClass = "text-red-500";
            barWidth = "100%";
        }

        res.innerHTML = `
            <div class="mt-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 animate-fade-in">
                <div class="text-4xl font-black ${colorClass} mb-1">${bmi}</div>
                <div class="font-bold text-lg mb-4">${status}</div>
                
                <div class="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full mb-4 overflow-hidden">
                    <div class="h-full transition-all duration-1000 ${colorClass.replace('text', 'bg')}" style="width: ${barWidth}"></div>
                </div>

                <p class="text-sm opacity-80 italic leading-relaxed">
                    <i class="fas fa-info-circle ml-1"></i> ${advice}
                </p>
            </div>
        `;
        res.classList.remove('hidden');
    } else {
        alert("يرجى إدخال الوزن والطول بشكل صحيح");
    }
}


// --- 4. حاسبة موعد الولادة المتوقع ---
function calculateDueDate() {
    const lmpInput = document.getElementById('lmp-date').value;
    const res = document.getElementById('due-result');

    if (lmpInput) {
        const lmpDate = new Date(lmpInput);
        // إضافة 280 يوم (40 أسبوع) لتاريخ آخر دورة
        const dueDate = new Date(lmpDate.getTime() + (280 * 24 * 60 * 60 * 1000));
        
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = dueDate.toLocaleDateString('ar-EG', options);

        res.innerHTML = `
            <div class="mt-6 p-6 rounded-2xl bg-pink-50 dark:bg-pink-950/20 text-pink-700 dark:text-pink-300 border border-pink-100 dark:border-pink-900 animate-fade-in">
                <p class="font-bold mb-2">الموعد المتوقع للولادة بإذن الله:</p>
                <div class="text-2xl font-black mb-3">${formattedDate}</div>
                <hr class="opacity-20 mb-3">
                <p class="text-xs italic leading-relaxed">
                    <i class="fas fa-heart ml-1"></i> نوصي بالمتابعة الدورية مع الدكتورة مروى الأصبحي لضمان سلامتك وسلامة جنينك.
                </p>
            </div>
        `;
        res.classList.remove('hidden');
    } else {
        alert("يرجى اختيار التاريخ");
    }
}

// تأثير ظهور العناصر عند التمرير (بسيط)
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
    });
}, observerOptions);

document.querySelectorAll('.dept-card, .doc-item').forEach(el => {
    el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
    observer.observe(el);
});
