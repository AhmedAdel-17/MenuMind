export interface MenuItem {
    id: string;
    name: string;
    category: string;
    cost: number;
    price: number;
    margin: number;
    marginPercent: number;
    rating: number;
    feedback: number;
}

export interface Feedback {
    id: string;
    itemId: string;
    itemName: string;
    rating: number;
    comment: string;
    date: string;
    sentiment: 'positive' | 'neutral' | 'negative';
}

export interface AIRecommendation {
    id: string;
    itemId: string;
    itemName: string;
    type: 'increase' | 'decrease' | 'remove';
    currentPrice: number;
    suggestedPrice: number;
    confidence: number;
    rationale: string;
    impact: string;
}

export const menuItems: MenuItem[] = [
    {
        id: '1',
        name: 'Margherita Pizza',
        category: 'Pizza',
        cost: 45,
        price: 120,
        margin: 75,
        marginPercent: 62.5,
        rating: 4.5,
        feedback: 45,
    },
    {
        id: '2',
        name: 'Beef Burger',
        category: 'Burgers',
        cost: 65,
        price: 150,
        margin: 85,
        marginPercent: 56.7,
        rating: 4.8,
        feedback: 78,
    },
    {
        id: '3',
        name: 'Caesar Salad',
        category: 'Salads',
        cost: 30,
        price: 80,
        margin: 50,
        marginPercent: 62.5,
        rating: 4.2,
        feedback: 32,
    },
    {
        id: '4',
        name: 'Pasta Carbonara',
        category: 'Pasta',
        cost: 55,
        price: 110,
        margin: 55,
        marginPercent: 50,
        rating: 3.8,
        feedback: 28,
    },
    {
        id: '5',
        name: 'Grilled Chicken',
        category: 'Main Course',
        cost: 70,
        price: 180,
        margin: 110,
        marginPercent: 61.1,
        rating: 4.6,
        feedback: 56,
    },
    {
        id: '6',
        name: 'Seafood Paella',
        category: 'Main Course',
        cost: 95,
        price: 200,
        margin: 105,
        marginPercent: 52.5,
        rating: 4.7,
        feedback: 41,
    },
    {
        id: '7',
        name: 'Chocolate Cake',
        category: 'Desserts',
        cost: 25,
        price: 60,
        margin: 35,
        marginPercent: 58.3,
        rating: 4.9,
        feedback: 89,
    },
    {
        id: '8',
        name: 'French Fries',
        category: 'Sides',
        cost: 15,
        price: 35,
        margin: 20,
        marginPercent: 57.1,
        rating: 4.4,
        feedback: 102,
    },
];

export const feedbackData: Feedback[] = [
    {
        id: 'f1',
        itemId: '2',
        itemName: 'Beef Burger',
        rating: 5,
        comment: 'Best burger in town! Perfectly cooked and juicy.',
        date: '2026-03-10',
        sentiment: 'positive',
    },
    {
        id: 'f2',
        itemId: '7',
        itemName: 'Chocolate Cake',
        rating: 5,
        comment: 'Amazing dessert! Will definitely order again.',
        date: '2026-03-10',
        sentiment: 'positive',
    },
    {
        id: 'f3',
        itemId: '4',
        itemName: 'Pasta Carbonara',
        rating: 3,
        comment: 'Decent but a bit overpriced for the portion size.',
        date: '2026-03-09',
        sentiment: 'neutral',
    },
    {
        id: 'f4',
        itemId: '1',
        itemName: 'Margherita Pizza',
        rating: 4,
        comment: 'Good pizza, fresh ingredients. Could use more cheese.',
        date: '2026-03-09',
        sentiment: 'positive',
    },
    {
        id: 'f5',
        itemId: '5',
        itemName: 'Grilled Chicken',
        rating: 5,
        comment: 'Tender and flavorful. Great value!',
        date: '2026-03-08',
        sentiment: 'positive',
    },
];

export const aiRecommendations: AIRecommendation[] = [
    {
        id: 'r1',
        itemId: '4',
        itemName: 'Pasta Carbonara',
        type: 'decrease',
        currentPrice: 110,
        suggestedPrice: 95,
        confidence: 87,
        rationale:
            'Customer feedback indicates price sensitivity. Lower rating (3.8) suggests value concerns.',
        impact: '+15% orders, +8% profit',
    },
    {
        id: 'r2',
        itemId: '7',
        itemName: 'Chocolate Cake',
        type: 'increase',
        currentPrice: 60,
        suggestedPrice: 75,
        confidence: 92,
        rationale:
            'High demand (4.9 rating, 89 reviews). Low price point with strong margin. Customers willing to pay premium.',
        impact: '+EGP 1,200/month',
    },
    {
        id: 'r3',
        itemId: '2',
        itemName: 'Beef Burger',
        type: 'increase',
        currentPrice: 150,
        suggestedPrice: 165,
        confidence: 85,
        rationale:
            'Top-rated item (4.8 stars) with consistent positive feedback. Market positioning allows price increase.',
        impact: '+EGP 1,170/month',
    },
];

export const profitTrends = [
    { week: 'Week 1', profit: 45000, revenue: 120000 },
    { week: 'Week 2', profit: 48000, revenue: 125000 },
    { week: 'Week 3', profit: 52000, revenue: 132000 },
    { week: 'Week 4', profit: 55000, revenue: 138000 },
];

export const categoryPerformance = [
    { category: 'Pizza', profit: 15000, margin: 62 },
    { category: 'Burgers', profit: 18000, margin: 57 },
    { category: 'Pasta', profit: 8500, margin: 50 },
    { category: 'Main Course', profit: 22000, margin: 58 },
    { category: 'Desserts', profit: 7000, margin: 58 },
    { category: 'Sides', profit: 4500, margin: 57 },
];
