const products = [
    {
        id: 1,
        name: "Gentle Rose Cleanser",
        price: 42.00,
        category: "Cleansers",
        skinType: "Sensitive",
        image: "img/GentleRose_Cleanser.jpg",
        description: "A delicate rose petal cleanser, perfect for skin that reddens easily.",
        isNew: true,
        ingredients: ["Rose centifolia oil, Allantoin", "Eriobotrya japonica extract", "Chondrus crispus extract", "Mild cleansing agents, Glycerin"],
        howToUse: "Apply a small amount to damp skin and massage genlty to remove impuritises. Rinse thoroughly with water"
    },
    {
        id: 2,
        name: "Vitamin C Brightening Serum",
        price: 58.00,
        category: "Serums",
        skinType: "All types",
        image: "img/VitaminC_Brightening_Serum.jpg",
        description: "Brightening serum for radiant and even-toned skin.",
        isNew: true
    },
    {
        id: 3,
        name: "Deep Hydration Face Cream",
        price: 45.00,
        category: "Creams",
        skinType: "Dry",
        image: "img/Deep_Hydration_Face_Cream.jpg",
        description: "24h deep hydration with plant-based hyaluronic acid.",
        isNew: false,
        isBestseller: true
    },
    {
        id: 4,
        name: "Purifying Detox Clay Mask",
        price: 38.00,
        category: "Masks",
        skinType: "Oily",
        image: "img/PurifyingDetoxClay_Mask.jpeg",
        description: "Green clay mask to deeply purify pores.",
        isNew: false
    },
    {
        id: 5,
        name: "Midnight Recovery Oil",
        price: 65.00,
        category: "Serums",
        skinType: "All types",
        image: "img/Midnight_Recovery_Oil.jpg",
        description: "Regenerating night oil to wake up with rested skin.",
        isNew: false,
        isBestseller: true
    },
    {
        id: 6,
        name: "Ocean Mist Toner",
        price: 28.00,
        category: "Cleansers",
        skinType: "Combination",
        image: "img/Ocean_Mist_Toner.jpeg",
        description: "Refreshing toner with marine extracts and brown algae.",
        isNew: true
    },
    {
        id: 7,
        name: "Retinol Alternative Cream",
        price: 72.00,
        category: "Creams",
        skinType: "Mature",
        image: "img/retinol_Alternative_Cream.jpg",
        description: "Natural anti-aging treatment with Bakuchiol.",
        isNew: false,
        isBestseller: true
    },
    {
        id: 8,
        name: "Daily Sun Shield SPF 50",
        price: 34.00,
        category: "Creams",
        skinType: "All types",
        image: "img/DailySun_Shield_SPF50.jpg",
        description: "Invisible, non-greasy mineral sun protection.",
        isNew: true
    },
    {
        id: 9,
        name: "Bamboo Exfoliating Scrub",
        price: 26.00,
        category: "Cleansers",
        skinType: "Combination",
        image: "img/bamboo_exfoliating_scrub.jpg",
        description: "Bamboo micro-granules for gentle mechanical exfoliation.",
        isNew: false
    },
    {
        id: 10,
        name: "Hyaluronic Acid Booster",
        price: 49.00,
        category: "Serums",
        skinType: "Dry",
        image: "img/Hyaluronic_Acid_Booster.jpg",
        description: "Pure hydration concentrate to plump the skin tissues.",
        isNew: false
    },
    {
        id: 11,
        name: "Calm Chamomile Eye Balm",
        price: 32.00,
        category: "Creams",
        skinType: "Sensitive",
        image: "img/calm_chamomile_eye.jpg",
        description: "Soothing eye contour balm with chamomile and blueberry.",
        isNew: false
    },
    {
        id: 12,
        name: "Niacinamide Pore Shrinker",
        price: 44.00,
        category: "Serums",
        skinType: "Oily",
        image: "img/Niacinamide_pore_Shrinker.jpg",
        description: "Specific treatment to reduce enlarged pores and excess sebum.",
        isNew: false,
        isBestseller: true
    },
    {
        id: 13,
        name: "Matcha Tea Glow Mask",
        price: 36.00,
        category: "Masks",
        skinType: "Combination",
        image: "img/Matcha_Tea_GlowMask.jpg",
        description: "Antioxidant matcha tea mask to brighten the face.",
        isNew: true
    },
    {
        id: 14,
        name: "Lavender Sleeping Face Oil",
        price: 52.00,
        category: "Serums",
        skinType: "Sensitive",
        image: "img/Lavander_Sleeping_faceOil.jpg",
        description: "Relaxing lavender oil to nourish the skin while you sleep.",
        isNew: false
    },
    {
        id: 15,
        name: "Citrus Refreshing Foam",
        price: 24.00,
        category: "Cleansers",
        skinType: "Oily",
        image: "img/Citrus_Refreshing_Foam.jpg",
        description: "Energizing cleansing mousse with Sicilian citrus fruits.",
        isNew: false
    },
    {
        id: 16,
        name: "Peptide Firming Cream",
        price: 78.00,
        category: "Creams",
        skinType: "Mature",
        image: "img/Peptide_Firming_Cream.jpg",
        description: "Firming cream with plant peptides for a lifting effect.",
        isNew: true
    },
    {
        id: 17,
        name: "Probiotic Balancing Mist",
        price: 30.00,
        category: "Cleansers",
        skinType: "All types",
        image: "img/Priobiotic_Balacing_Mist.jpg",
        description: "Probiotic spray mist to balance the skin microbiome.",
        isNew: false
    },
    {
        id: 18,
        name: "Gold Infused Sheet Mask",
        price: 12.00,
        category: "Masks",
        skinType: "Mature",
        image: "img/gold_infused_SheetMask.jpg",
        description: "Single-use sheet mask with gold particles and collagen.",
        isNew: false
    },
    {
        id: 19,
        name: "Aloe Vera Soothing Gel",
        price: 22.00,
        category: "Creams",
        skinType: "Sensitive",
        image: "img/nature-republic-soothing-amp-moisture-aloe-vera-92-soothing-gel.jpg",
        description: "Soothing multipurpose gel for post-sun exposure or irritation.",
        isNew: false
    },
    {
        id: 20,
        name: "Squalane Facial Oil",
        price: 46.00,
        category: "Serums",
        skinType: "Dry",
        image: "img/SqualoneFacialOil.jpg",
        description: "Pure olive-derived squalane for hydration without weight.",
        isNew: false
    }
];