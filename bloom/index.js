document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
    const root = document.documentElement;
    let currentLanguage =
        localStorage.getItem("site-language") ||
        root.dataset.currentLanguage ||
        "en";

    let startIndex = 0;
    let isAnimating = false;

    const translations = {
        en: {
            "nav.menu": "≡ Menu",
            "nav.shop": "Shop",
            "nav.bouquet": "Bouquet",
            "nav.giftBasket": "Gift Basket",
            "nav.about": "About Us",
            "nav.contact": "Contact",
            "nav.customOrder": "Custom Order",
            "hero.viewDemo": "View Demo",
            "hero.hibiscus": "Hibiscus",
            "hero.titlePrefix": "Curated Florals that ",
            "hero.titleSuffix": " Speak to the Soul",
            "hero.subtitle": "Each flower to evoke feelings and draw hearts closer",
            "hero.orderNow": "Order Now",
            "hero.newBouquetStyle": "NEW BOUQUET STYLE",
            "hero.craftingByLoves": "Crafting by Loves",
            "stats.valentineStories": "VALENTINE STORIES",
            "stats.monthlyUsers": "Monthly Users",
            "stats.floristBouquet": "Florist & Bouquet",
            "section.handPickedTitle": "Hand-picked for your heart picked person",
            "section.handPickedText": "If you want to greet or thank anyone, Don't know their taste? - Send flowers.",
            "section.customizeBouquet": "Customize Bouquet",
            "slider.orderWithConfidence": "Order with Confidence",
            "slider.exploreAll": "Explore All",
            "flowers.blushBloom": "Blush Bloom",
            "flowers.duneBeige": "Dune Beige",
            "flowers.prettyRoses": "Pretty Roses",
            "flowers.wildWhisper": "Wild Whisper",
            "flowers.addToCart": "Add to Cart >",
            "custom.title": "Why custom hand-picked flower?",
            "custom.text": "Each bloom recalls - soft laughter, secret glances and love that lingers forever",
            "custom.personalizedBouquet": "Personalized Bouquet",
            "quote.prefix": "\"We craft ",
            "quote.emotions": "emotions",
            "quote.suffix": " for you, beautifully\"",
            "quote.author": "- Jeniffer",
            "promo.elegantBlooms": "Elegant blooms that speak to the soul",
            "promo.bouquetDelivered": "Bouquet Delivered",
            "promo.bloomsLine1": "Blooms recalls the one",
            "promo.bloomsLine2": "you love",
            "promo.orderNow": "Order Now",
            "promo.loveAtFirstBloom": "Love at First Bloom",
            "promo.craftedToWarm": "Crafted to Warm the Heart",
            "promo.flowersSpeak": "Flowers that speak to the soul",
            "gifting.prefix": "Gifting made effortless, by ",
            "gifting.brand": "Bloom",
            "gifting.subtitle": "Handcrafted bouquets to doorstep delivery",
            "gifting.customizeBouquet": "Customize Bouquet",
            "gifting.special": "Special",
            "gifting.bouquet": "Bouquet",
            "gifting.viewBouquets": "VIEW BOUQUETS",
            "gifting.text": "Bloom makes \"Every gift\" personal and seamless.",
            "footer.tagline": "Curated Florals that Speak to the Soul",
            "footer.clutch": "Clutch",
            "footer.review": "Review",
            "footer.joinOurGroup": "Join Our Group",
            "footer.addressLine1": "185 Lismore, Sydney,",
            "footer.addressLine2": "NSW, Australia",
            "footer.anyQuery": "If you have any query -",
            "footer.about": "About Us",
            "footer.careTips": "Flower Care Tips",
            "footer.easterFlowers": "Easter Flowers",
            "footer.contactUs": "Contact Us",
            "footer.terms": "Terms and Conditions",
            "footer.followSocials": "Follow us on Socials -",
            "footer.marquee": " VALENTINE / ANNIVERSARY / CHRISTMAS / VALENTINE / ANNIVERSARY / CHRISTMAS / VALENTINE / ANNIVERSARY / CHRISTMAS /"
        },
        es: {

        },
        fr: {

        }
    };

    const flowersByLanguage = {
        en: [
            { key: "flowers.blushBloom", image: "pics/flower_1.png", alt: "Blush Bloom bouquet", link: "#" },
            { key: "flowers.duneBeige", image: "pics/flower_2.png", alt: "Dune Beige bouquet", link: "#" },
            { key: "flowers.prettyRoses", image: "pics/flower_3.png", alt: "Pretty Roses bouquet", link: "#" },
            { key: "flowers.wildWhisper", image: "pics/flower_4.png", alt: "Wild Whisper bouquet", link: "#" }
        ],
        es: [
            { key: "flowers.blushBloom", image: "pics/flower_1.png", alt: "Ramo Flor ruborizada", link: "#" },
            { key: "flowers.duneBeige", image: "pics/flower_2.png", alt: "Ramo Beige duna", link: "#" },
            { key: "flowers.prettyRoses", image: "pics/flower_3.png", alt: "Ramo Rosas bonitas", link: "#" },
            { key: "flowers.wildWhisper", image: "pics/flower_4.png", alt: "Ramo Susurro silvestre", link: "#" }
        ],
        fr: [
            { key: "flowers.blushBloom", image: "pics/flower_1.png", alt: "Bouquet Floraison tendre", link: "#" },
            { key: "flowers.duneBeige", image: "pics/flower_2.png", alt: "Bouquet Beige dune", link: "#" },
            { key: "flowers.prettyRoses", image: "pics/flower_3.png", alt: "Bouquet Belles roses", link: "#" },
            { key: "flowers.wildWhisper", image: "pics/flower_4.png", alt: "Bouquet Murmure sauvage", link: "#" }
        ]
    };

    const dom = {
        prev: document.getElementById("flowers-prev"),
        next: document.getElementById("flowers-next"),
        track: document.getElementById("flowers-track"),
        langLinks: Array.from(document.querySelectorAll(".language-link")),
        i18n: Array.from(document.querySelectorAll("[data-i18n]")),
        images: Array.from(document.querySelectorAll("[data-flower-image]")),
        titles: Array.from(document.querySelectorAll("[data-flower-title]")),
        links: Array.from(document.querySelectorAll("[data-flower-link]"))
    };


    function activeTranslations() {
        return translations[currentLanguage] || translations.en;
    }

    function flowerSet() {
        return flowersByLanguage[currentLanguage] || flowersByLanguage.en;
    }


    function translatePage() {
        const map = activeTranslations();

        dom.i18n.forEach(el => {
            const key = el.dataset.i18n;
            if (map[key]) el.textContent = map[key];
        });

        dom.langLinks.forEach(link => {
            const active = link.dataset.language === currentLanguage;
            link.classList.toggle("language-link-active", active);
            link.classList.toggle("text-white", !active);
        });

        root.lang = currentLanguage;
        root.dataset.currentLanguage = currentLanguage;
        localStorage.setItem("site-language", currentLanguage);
    }

    function renderFlowers() {
        const flowers = flowerSet();
        const map = activeTranslations();

        const visible = Math.min(
            dom.images.length,
            dom.titles.length,
            dom.links.length
        );

        for (let i = 0; i < visible; i++) {
            const flower = flowers[(startIndex + i) % flowers.length];

            dom.images[i].src = flower.image;
            dom.images[i].alt = flower.alt;
            dom.titles[i].textContent = map[flower.key] || flower.key;
            dom.links[i].textContent = map["flowers.addToCart"] || "Add to Cart >";
            dom.links[i].href = flower.link;
        }
    }

    function setLanguage(lang) {
        if (!translations[lang]) return;
        currentLanguage = lang;
        translatePage();
        renderFlowers();
    }

    function slide(direction) {
        if (isAnimating || !dom.track) return;

        const flowers = flowerSet();
        if (!flowers.length) return;

        isAnimating = true;
        dom.track.classList.add("is-changing");

        setTimeout(() => {
            startIndex = (startIndex + direction + flowers.length) % flowers.length;
            renderFlowers();
            dom.track.classList.remove("is-changing");

            setTimeout(() => {
                isAnimating = false;
            }, 280);
        }, 140);
    }

    dom.langLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            setLanguage(link.dataset.language);
        });
    });

    if (dom.prev) {
        dom.prev.type = "button";
        dom.prev.addEventListener("click", e => {
            e.preventDefault();
            slide(-1);
        });
    }

    if (dom.next) {
        dom.next.type = "button";
        dom.next.addEventListener("click", e => {
            e.preventDefault();
            slide(1);
        });
    }

    if (!translations[currentLanguage]) {
        currentLanguage = "en";
    }

    renderFlowers();
    translatePage();
    setLanguage(currentLanguage);
}