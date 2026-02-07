/* Data Definitions */
const PRICE_LISTS = {
    standard: { "20ml": 80, "30ml": 100, "40ml": 150, "50ml": 250, "100ml": 350 },
    hq: { "20ml": 100, "30ml": 150, "40ml": 200, "50ml": 300, "100ml": 400 },
    oud: { "20ml": 110, "30ml": 180, "40ml": 230, "50ml": 260, "100ml": 450, "100ml Premium": 600 }
};

// Raw Data from Prompt
const rawData = {
    mostRequested: ["سوفاج ديور", "كيركي", "خمره", "بلاك افغانو", "فيرزاتشى ايروس", "اربابورا", "لاڤي بيل", "وان مليون"],
    men: ["BMW", "بلاك ليكسيز", "بوص ذا سنت", "تشامبيون", "هاج سينت", "سكلبشر", "انفكتوس", "خمره", "سترونج ويز يو", "تومى هيل", "دانهيل ديزاير بلو", "بلاك اكس اس", "التراميل", "سوفاج ديور", "فوياج", "لاكوست وايت", "لاكوست بلاك", "لاكوست استنشال", "سيلفر سينت", "اوبن", "دركار", "لابيدوس", "رومبا", "عمرو دياب", "روشاز", "3G", "باد بوى", "هدسون ڤالى", "جاكوار جرين", "ازارو ونتد", "فيرزاتشى ايروس", "مونت بلاك ليجند", "بوما جام", "اقوى ديجو", "شروتى", "وان مان شو", "وان مليون", "مارلبت مان", "بلاتنيوم", "انترنتى", "VIP", "Kenzy Man", "زارا جولد", "جوتشى جيلتى بلاك", "ايس شوكلت", "الثائر"],
    men_hq: ["اربابورا", "اربابورا جولد", "جيمى شو", "بلاك اوركيد", "بكرات روج"],
    women: ["كيركي", "جوتشى فلورا", "فانتازيا برتنى", "بينك شوجر", "كاتى بيرى", "فيرى سيكسى ناو", "ميد نايت", "اوليمبيا", "كريستال نوار", "كريزى لاف", "سيكرت شارم", "تاج", "بربري هير", "جوتشى راش", "رالف لورين", "وصال", "لاڤ ذا هفلى", "ايدل لانكوم", "212 سيكسى", "تشيلز", "لڤي بيل", "سيكسى جرافيتى", "مون باريس", "اورجانزا", "بونبون", "ويك اند", "كوكونت", "وايلد مدغشقر", "مارشميلو", "باريس هيلتون", "مون سباركل", "سكيب", "فانيليا بودر"],
    women_hq: ["مانسيرا روز فانيليا", "ايلى صعب", "نساء العالم", "بيانكو لاتيه", "بلاك ابيوم", "هوت كنزى", "ليبر انتنس", "جود جيرل", "سى احمر", "بكرات روج", "باى نايت", "كوكو شانيل", "يارا كندى", "روبرتو كافالى", "چورچينا", "رش فيكتور"],
    oud: ["مضاوى", "بوكيه", "كلمات", "القصر", "امبريال فالى", "فورجرتنس", "عود ابيض", "اكسنتو سوسبيرو", "سultan العطور", "الف ليله وليله", "بلاك افغانو", "بيجاسوس ديمارلى", "بلاك اوركيد"]
};

// Heuristic Data (to auto-tag products)
const seasonMap = {
    summer: ["وايت", "بلو", "ايروس", "اكوا", "كول", "فريش", "سبورت", "ليمون", "ايس", "صيفي", "خفيف", "فواكه", "زهور"],
    winter: ["عود", "بلاك", "ليذر", "توباكو", "فانيليا", "عنبر", "خشب", "سبايسي", "ليل", "شوكلت", "قهوة", "شتاء", "ثقيل"]
};

// Product Database
let products = [];

function initProducts() {
    const addProduct = (name, category, priceType, tags = []) => {
        // Avoid duplicates
        if (products.find(p => p.name === name)) return;

        let season = "all"; // all, summer, winter
        let intensity = "medium"; // calm, medium, strong
        let gender = category.includes("men") ? "men" : (category.includes("women") ? "women" : "unisex");

        // Guess attributes based on name keywords
        if (seasonMap.summer.some(k => name.includes(k))) season = "summer";
        else if (seasonMap.winter.some(k => name.includes(k))) season = "winter";

        // Ouds are usually winter/strong
        if (category === "oud") {
            season = "winter";
            intensity = "strong";
            gender = "men"; // Default for recommender mainly, though unisex
        }

        // High quality might be stronger
        if (category.includes("hq")) intensity = "strong";

        products.push({
            id: products.length + 1,
            name: name,
            category: category, // internal category key
            priceType: priceType,
            season: season,
            intensity: intensity,
            gender: gender,
            image: "bottle.png", // All use same placeholder for now
            isPopular: rawData.mostRequested.includes(name)
        });
    };

    // Load Categories
    rawData.men.forEach(n => addProduct(n, "men", "standard"));
    rawData.men_hq.forEach(n => addProduct(n, "men-hq", "hq"));
    rawData.women.forEach(n => addProduct(n, "women", "standard"));
    rawData.women_hq.forEach(n => addProduct(n, "women-hq", "hq"));
    rawData.oud.forEach(n => addProduct(n, "oud", "oud"));

    // Ensure all most requested are present (some might not be in sub-lists)
    rawData.mostRequested.forEach(n => {
        if (!products.find(p => p.name === n)) {
            // Guess category if not found
            let cat = "men"; // Default fallback
            let pType = "standard";
            if (n.includes("ديور") || n.includes("افغانو")) { cat = "men-hq"; pType = "hq"; }
            if (n.includes("لڤي بيل")) { cat = "women"; pType = "standard"; }
            addProduct(n, cat, pType);
        }
    });
}

/* DOM Elements */
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const categoryBtns = document.querySelectorAll('.category-btn');
const noResults = document.getElementById('noResults');

/* State */
let currentCategory = 'all';
let searchQuery = '';

/* Init */
document.addEventListener('DOMContentLoaded', () => {
    initProducts();
    renderProducts();
    setupEventListeners();
});

/* Rendering */
function renderProducts() {
    productGrid.innerHTML = '';

    let filtered = products.filter(product => {
        // Category Filter
        let catMatch = true;
        if (currentCategory === 'most-requested') catMatch = product.isPopular;
        else if (currentCategory !== 'all') catMatch = product.category === currentCategory;

        // Search Filter
        let searchMatch = product.name.includes(searchQuery);

        return catMatch && searchMatch;
    });

    if (filtered.length === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        filtered.forEach(product => {
            const card = createProductCard(product);
            productGrid.appendChild(card);
        });
    }
}

function createProductCard(product) {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.onclick = () => openProductModal(product);

    let badgesHtml = '';
    if (product.isPopular) badgesHtml += '<span class="badge badge-popular">🔥 الأكثر طلباً</span>';
    if (product.priceType === 'hq') badgesHtml += '<span class="badge badge-hq">💎 هاي كواليتي</span>';
    if (product.category === 'oud') badgesHtml += '<span class="badge badge-luxury">⭐ فاخر</span>';

    const priceStart = getStartPrice(product.priceType);

    div.innerHTML = `
        <div class="card-image">
            <img src="${product.image}" loading="lazy" alt="${product.name}">
            <div class="card-badges">${badgesHtml}</div>
        </div>
        <div class="card-content">
            <span class="card-category">${getCategoryName(product.category)}</span>
            <h3 class="card-title">${product.name}</h3>
            <p class="card-price">يبدأ من ${priceStart} ج.م</p>
        </div>
    `;
    return div;
}

function getStartPrice(type) {
    if (type === 'hq') return PRICE_LISTS.hq["20ml"];
    if (type === 'oud') return PRICE_LISTS.oud["20ml"];
    return PRICE_LISTS.standard["20ml"];
}

function getCategoryName(cat) {
    const map = {
        'men': 'عطور رجالي',
        'men-hq': 'رجالي فاخر',
        'women': 'عطور حريمي',
        'women-hq': 'حريمي فاخر',
        'oud': 'عود وشرقيات'
    };
    return map[cat] || 'عطور';
}

/* Modal Logic */
const modal = document.getElementById('productModal');
const closeModal = document.querySelector('.close-modal');
const orderBtn = document.getElementById('orderBtn');

function openProductModal(product) {
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalCategory').textContent = getCategoryName(product.category);
    document.getElementById('modalImg').src = product.image;

    // Randomize or set details
    document.getElementById('modalScentType').textContent = product.category === 'oud' ? 'شرقي / خشبي' : (product.season === 'summer' ? 'منعش / حمضيات' : 'دافئ / سويت');
    document.getElementById('modalOccasion').textContent = product.season === 'summer' ? 'الصباح / العمل' : 'المساء / السهرات';
    document.getElementById('modalLongevity').textContent = product.priceType === 'standard' ? 'متوسط - عالي' : 'عالي جداً (Super)';

    // Prices
    const priceList = product.category === 'oud' ? PRICE_LISTS.oud : (product.category.includes('hq') ? PRICE_LISTS.hq : PRICE_LISTS.standard);
    const pricesContainer = document.getElementById('modalPrices');
    pricesContainer.innerHTML = '';

    for (const [size, price] of Object.entries(priceList)) {
        const row = document.createElement('div');
        row.className = 'price-row';
        row.innerHTML = `<span>${size}</span> <span>${price} ج.م</span>`;
        pricesContainer.appendChild(row);
    }

    // Whatsapp
    orderBtn.onclick = () => {
        const msg = `مرحبا، اريد طلب هذا العطر: ${product.name} (${getCategoryName(product.category)})`;
        window.open(`https://wa.me/201124512664?text=${encodeURIComponent(msg)}`, '_blank');
    };

    modal.classList.add('active');
}

closeModal.onclick = () => modal.classList.remove('active');
window.onclick = (e) => {
    if (e.target == modal) modal.classList.remove('active');
    if (e.target == recommenderModal) recommenderModal.classList.remove('active');
}

/* Event Listeners */
function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderProducts();
    });

    // Categories
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderProducts();
        });
    });

    // Scroll to products
    window.scrollToProducts = () => {
        document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
    };
}

/* Recommender System */
const recommenderBtn = document.getElementById('recommenderBtn');
const recommenderModal = document.getElementById('recommenderModal');
const closeRecommender = recommenderModal.querySelector('.close-modal');
let recState = { gender: '', intensity: '', season: '', price: '' };

recommenderBtn.onclick = () => {
    recommenderModal.classList.add('active');
    resetRecommender();
};
closeRecommender.onclick = () => recommenderModal.classList.remove('active');

window.selectRecommenderOption = (key, value) => {
    recState[key] = value;

    // Move to next step
    const currentStep = document.querySelector(`.step[data-step="${getCurrentStep()}"]`);
    currentStep.classList.remove('active');

    const nextStepNum = getCurrentStep() + 1;
    let nextStep = document.querySelector(`.step[data-step="${nextStepNum}"]`);

    // If next is results (step 5)
    if (nextStepNum === 5) {
        showRecommendations();
    }

    if (nextStep) nextStep.classList.add('active');
};

function getCurrentStep() {
    if (!recState.gender) return 1;
    if (!recState.intensity) return 2;
    if (!recState.season) return 3;
    if (!recState.price) return 4;
    return 5;
}

window.resetRecommender = () => {
    recState = { gender: '', intensity: '', season: '', price: '' };
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.querySelector('.step[data-step="1"]').classList.add('active');
};

function showRecommendations() {
    // Logic to find best 3 matches
    // 1. Filter by Gender (broadly)
    let candidates = products.filter(p => {
        if (recState.gender === 'men') return p.category.includes('men') || p.category === 'oud';
        return p.category.includes('women');
    });

    // 2. Filter by Price
    if (recState.price === 'economic') {
        candidates = candidates.filter(p => !p.category.includes('hq') && p.category !== 'oud');
    } else {
        candidates = candidates.filter(p => p.category.includes('hq') || p.category === 'oud');
    }

    // 3. Filter by Season (Soft filter, sort to top)
    // If no match on season, keep them but score lower.

    // 4. Randomize and pick 3
    // Shuffle
    candidates.sort(() => 0.5 - Math.random());
    const results = candidates.slice(0, 3);

    const container = document.getElementById('recommenderResults');
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = '<p>عفواً، جرب تغيير خياراتك للعثور على نتائج أكثر.</p>';
        return;
    }

    results.forEach(p => {
        const div = document.createElement('div');
        div.className = 'recommender-item';
        div.onclick = () => {
            recommenderModal.classList.remove('active');
            openProductModal(p);
        };
        div.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <div>
                <h4>${p.name}</h4>
                <small>${getCategoryName(p.category)}</small>
            </div>
        `;
        container.appendChild(div);
    });
}
