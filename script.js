const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const products = [
  { id: 'ohagi', name: 'おはぎ', en: 'Ohagi', desc: '北海道産小豆の粒あんを、もち米のやさしい食感で包みました。', price: 320, labels: ['SEASONAL'], image: 'images/ohagi.jpg' },
  { id: 'botamochi', name: '牡丹餅', en: 'Botamochi', desc: 'もち米の粒感を残した餡で仕立てる、控えめな甘さの伝統菓子です。', price: 340, labels: ['SEASONAL'], image: 'images/botamochi.jpg' },
  { id: 'tsukimi-dango', name: '月見団子', en: 'Tsukimi Dango', desc: '満月を待つ夜に似合う、白くなめらかな団子の季節仕立てです。', price: 480, labels: ['BEST SELLER', 'SEASONAL'], image: 'images/tsukimi-dango.jpg' },
  { id: 'kuri-kinton', name: '栗きんとん', en: 'Kuri Kinton', desc: '栗の香りとほっくりした質感をそのまま生かした秋限定の上生菓子。', price: 560, labels: ['LIMITED', 'BEST SELLER'], image: 'images/kuri-kinton.jpg' },
  { id: 'kinako-mochi', name: 'きなこ餅', en: 'Kinako Mochi', desc: '香ばしいきなこをまとわせた、やわらかな余韻のある素朴な一品。', price: 390, labels: ['CLASSIC'], image: 'images/kinako-mochi.jpg' },
  { id: 'mitarashi-dango', name: 'みたらし団子', en: 'Mitarashi Dango', desc: '艶やかな甘辛だれを絡め、上品な香ばしさに仕上げました。', price: 420, labels: ['CLASSIC'], image: 'images/mitarashi-dango.jpg' },
  { id: 'matcha-monaka', name: '抹茶最中', en: 'Matcha Monaka', desc: '抹茶餡と小豆餡の香りを、香ばしい最中種で軽やかに挟みました。', price: 450, labels: ['BEST SELLER'], image: 'images/matcha-monaka.jpg' },
  { id: 'kuri-yokan', name: '栗羊羹', en: 'Kuri Yokan', desc: '大粒の栗を閉じ込めた、切り分けても美しい艶やかな羊羹です。', price: 1280, labels: ['LIMITED', 'GIFT'], image: 'images/kuri-yokan.jpg' },
  { id: 'tsuki-usagi-manju', name: '月うさぎ饅頭', en: 'Tsuki Usagi Manju', desc: '月兎をかたどった、甘さ控えめで上品な蒸し饅頭です。', price: 380, labels: ['SIGNATURE'], image: 'images/tsuki-usagi-manju.jpg' },
  { id: 'yuzu-yokan', name: '柚子羊羹', en: 'Yuzu Yokan', desc: '柚子の清らかな香りを淡く重ねた、爽やかな余韻の羊羹です。', price: 1350, labels: ['GIFT'], image: 'images/yuzu-yokan.jpg' },
  { id: 'kokuto-dorayaki', name: '黒糖どら焼き', en: 'Kokuto Dorayaki', desc: '黒糖の深いこくと小豆の香りを楽しむ、しっとりとしたどら焼き。', price: 360, labels: ['CLASSIC'], image: 'images/kokuto-dorayaki.jpg' },
  { id: 'hojicha-warabi', name: 'ほうじ茶わらび餅', en: 'Hojicha Warabi Mochi', desc: 'ほうじ茶の落ち着いた香りと、透明感のあるやわらかさを楽しめます。', price: 520, labels: ['SEASONAL'], image: 'images/hojicha-warabi-mochi.jpg' },
  { id: 'autumn-assortment', name: '秋の詰め合わせ箱', en: 'Autumn Assortment Box', desc: '栗、抹茶、月うさぎ饅頭を彩りよく詰めた、季節の贈答箱です。', price: 2980, labels: ['GIFT', 'BEST SELLER'], image: 'images/autumn-assortment-box.jpg' }
];

const bestSellerIds = ['kuri-kinton', 'tsukimi-dango', 'matcha-monaka', 'autumn-assortment'];

const giftBoxes = [
  { id: 'gift-tsukiakari', name: '月灯りセット', count: '6個入', desc: '月見団子、月うさぎ饅頭、抹茶最中を少しずつ楽しめる小さな贈り物。', price: 2800, use: 'お月見の手土産・少人数のご挨拶' },
  { id: 'gift-akiusagi', name: '秋うさぎセット', count: '10個入', desc: '栗きんとん、柚子羊羹、黒糖どら焼きを合わせた秋らしい詰め合わせ。', price: 4200, use: '敬老の日・季節の贈答' },
  { id: 'gift-tokusen', name: '月兎特選箱', count: '16個入', desc: '羊羹、最中、饅頭、生菓子をバランスよく詰めた特別な贈答箱です。', price: 6800, use: '法人向けギフト・大切な方への贈り物' }
];

const productQuantities = new Map(products.map(product => [product.id, 1]));
const cart = new Map();
const formatter = new Intl.NumberFormat('ja-JP', { maximumFractionDigits: 0 });

function yen(value) {
  return `¥${formatter.format(value)}`;
}

function findItem(id) {
  return products.find(product => product.id === id) || giftBoxes.find(gift => gift.id === id);
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  grid.innerHTML = products.map(product => `
    <article class="product-card reveal" data-product-id="${product.id}">
      <div class="product-photo">
        <img src="${product.image}" alt="${product.name}の商品写真" loading="lazy">
      </div>
      <div class="product-body">
        <div class="product-topline">
          <div>
            <h3 class="product-name-jp">${product.name}</h3>
            <p class="product-name-en">${product.en}</p>
          </div>
          <p class="product-price">${yen(product.price)}</p>
        </div>
        <p class="product-desc">${product.desc}</p>
        <div class="product-meta">${product.labels.map(label => `<span class="label-chip">${label}</span>`).join('')}</div>
        <div class="product-controls" aria-label="${product.name}の数量">
          <div class="qty-control">
            <button type="button" data-qty-minus="${product.id}" aria-label="${product.name}を減らす">−</button>
            <span data-qty-value="${product.id}">1</span>
            <button type="button" data-qty-plus="${product.id}" aria-label="${product.name}を増やす">＋</button>
          </div>
          <button class="btn btn-primary btn-small" type="button" data-add-to-cart="${product.id}">Add to Cart</button>
        </div>
        <div class="product-actions">
          <button class="btn btn-secondary btn-small detail-btn" type="button" data-view-details="${product.id}">View Details</button>
        </div>
      </div>
    </article>
  `).join('');
}

function renderBestSellers() {
  const grid = document.getElementById('best-grid');
  if (!grid) return;

  grid.innerHTML = bestSellerIds.map((id, index) => {
    const product = findItem(id);
    return `
      <article class="best-card reveal">
        <div class="best-photo">
          <span class="rank-badge">No.${index + 1}</span>
          <img src="${product.image}" alt="${product.name}の人気商品写真" loading="lazy">
        </div>
        <div class="best-body">
          <div>
            <h3 class="product-name-jp">${product.name}</h3>
            <p class="product-name-en">${product.en}</p>
          </div>
          <p class="product-desc">${product.desc}</p>
          <div class="best-foot">
            <span class="product-price">${yen(product.price)}</span>
            <button class="btn btn-primary btn-small" type="button" data-add-to-cart="${product.id}" data-default-qty="1">Add to Cart</button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function renderGiftBoxes() {
  const grid = document.getElementById('gift-grid');
  if (!grid) return;

  grid.innerHTML = giftBoxes.map(gift => `
    <article class="gift-card reveal">
      <header>
        <div>
          <h3 class="gift-name">${gift.name}</h3>
          <p class="gift-count">${gift.count}</p>
        </div>
        <p class="gift-price">${yen(gift.price)}</p>
      </header>
      <p class="gift-desc">${gift.desc}</p>
      <p class="gift-use">おすすめ用途：${gift.use}</p>
      <button class="btn btn-primary" type="button" data-add-gift="${gift.id}">Add to Cart</button>
    </article>
  `).join('');
}

function setProductQty(id, nextQty) {
  const qty = Math.max(1, Math.min(12, nextQty));
  productQuantities.set(id, qty);
  document.querySelectorAll(`[data-qty-value="${id}"]`).forEach(node => {
    node.textContent = qty;
  });
}

function addToCart(id, qty = 1) {
  const item = findItem(id);
  if (!item) return;
  const current = cart.get(id)?.qty || 0;
  cart.set(id, { ...item, qty: current + qty });
  renderCart();
}

function changeCartQty(id, delta) {
  const item = cart.get(id);
  if (!item) return;
  const nextQty = item.qty + delta;
  if (nextQty <= 0) {
    cart.delete(id);
  } else {
    cart.set(id, { ...item, qty: nextQty });
  }
  renderCart();
}

function renderCart() {
  const itemsNode = document.getElementById('cart-items');
  const subtotalNode = document.getElementById('cart-subtotal');
  const shippingNode = document.getElementById('cart-shipping');
  const totalNode = document.getElementById('cart-total');
  const countNodes = document.querySelectorAll('[data-cart-count]');
  const cartItems = [...cart.values()];
  const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 0 ? 880 : 0;

  countNodes.forEach(node => {
    node.textContent = itemCount;
  });

  if (itemsNode) {
    itemsNode.innerHTML = cartItems.length ? cartItems.map(item => `
      <div class="cart-line">
        <div>
          <p class="cart-line-name">${item.name}</p>
          <p class="cart-line-meta">${yen(item.price)} / 個</p>
        </div>
        <div class="qty-control">
          <button type="button" data-cart-minus="${item.id}" aria-label="${item.name}を減らす">−</button>
          <span>${item.qty}</span>
          <button type="button" data-cart-plus="${item.id}" aria-label="${item.name}を増やす">＋</button>
        </div>
        <p class="cart-line-total">${yen(item.price * item.qty)}</p>
      </div>
    `).join('') : '<p class="empty-cart">カートは空です。Collection または Gift Box から商品をお選びください。</p>';
  }

  if (subtotalNode) subtotalNode.textContent = yen(subtotal);
  if (shippingNode) shippingNode.textContent = yen(shipping);
  if (totalNode) totalNode.textContent = yen(subtotal + shipping);
}

function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

function initParallax() {
  if (prefersReducedMotion) return;
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;
  window.addEventListener('scroll', () => {
    heroBg.style.transform = `translateY(${window.scrollY * 0.18}px)`;
  }, { passive: true });
}

function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;
  if (prefersReducedMotion) {
    elements.forEach(element => element.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .1, rootMargin: '0px 0px -36px 0px' });
  elements.forEach(element => observer.observe(element));
}

function initParticles() {
  if (prefersReducedMotion) return;
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 16; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1.2;
    particle.className = 'particle';
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      bottom: -6px;
      --dur: ${Math.random() * 12 + 18}s;
      --del: ${Math.random() * -20}s;
      --tx: ${(Math.random() - .5) * 80}px;
    `;
    container.appendChild(particle);
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      const headerHeight = document.getElementById('site-header')?.offsetHeight || 76;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });
}

function initStoreEvents() {
  document.addEventListener('click', event => {
    const plus = event.target.closest('[data-qty-plus]');
    const minus = event.target.closest('[data-qty-minus]');
    const add = event.target.closest('[data-add-to-cart]');
    const addGift = event.target.closest('[data-add-gift]');
    const cartPlus = event.target.closest('[data-cart-plus]');
    const cartMinus = event.target.closest('[data-cart-minus]');
    const details = event.target.closest('[data-view-details]');

    if (plus) {
      const id = plus.dataset.qtyPlus;
      setProductQty(id, (productQuantities.get(id) || 1) + 1);
    }
    if (minus) {
      const id = minus.dataset.qtyMinus;
      setProductQty(id, (productQuantities.get(id) || 1) - 1);
    }
    if (add) {
      const id = add.dataset.addToCart;
      const qty = Number(add.dataset.defaultQty || productQuantities.get(id) || 1);
      addToCart(id, qty);
      document.getElementById('cart')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
    if (addGift) {
      addToCart(addGift.dataset.addGift, 1);
      document.getElementById('cart')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
    if (cartPlus) changeCartQty(cartPlus.dataset.cartPlus, 1);
    if (cartMinus) changeCartQty(cartMinus.dataset.cartMinus, -1);
    if (details) {
      const item = findItem(details.dataset.viewDetails);
      if (item) {
        details.textContent = `${item.name} ${yen(item.price)}`;
        setTimeout(() => { details.textContent = 'View Details'; }, 1800);
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderBestSellers();
  renderGiftBoxes();
  renderCart();
  initHeader();
  initMobileNav();
  initParallax();
  initParticles();
  initSmoothScroll();
  initStoreEvents();
  initReveal();
});
