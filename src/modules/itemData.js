import broccoli from '../assets/menuItemProps/broccoli.png';
import ramen from '../assets/menuItemProps/ramen.png';
import lentil from '../assets/menuItemProps/lentil.png';
import tomato from '../assets/menuItemProps/tomato.png';
import mushroom from '../assets/menuItemProps/mushroom.png';
import minnestrone from '../assets/menuItemProps/minnestrone.png';
import seafood from '../assets/menuItemProps/seafood.png';
import borscht from '../assets/menuItemProps/borscht.png';


const itemData = [
    {
        id: 0,
        image: <img src={broccoli} alt="Broccoli soup"/>,
        name: "Broccoli soup",
        price: 99,
        description: "Creamy broccoli soup with spinach and onion",
        vegetarian: true,
        nutrition: {
            calories: 362,
            carbs: 60,
            protein: 8.9,
            fat: 10,
        },
        ingredients: [
            "Spinach",
            "Yellow Onion",
            "Broccoli", 
            "Heavy cream",
        ]
    },
    {
        id: 1,
        image: <img src={ramen} alt="Ramen soup"/>,
        name: "Ramen soup",
        price: 99,
        description: "Spicy noodle soup with chicken and topped with cilantro",
        vegetarian: false,
        nutrition: {
            calories: 440,
            carbs: 70,
            protein: 20,
            fat: 20,
        },
        ingredients: [
            "Ramen noodles",
            "Dashi",
            "Garlic", 
            "Seaweed",
        ]
    },
    {
        id: 2,
        image: <img src={lentil} alt="Lentil soup"/>,
        name: "Lentil soup",
        price: 99,
        description: "Creamy Lentil soup with vegetables and parsley",
        vegetarian: true,
        nutrition: {
            calories: 412,
            carbs: 63,
            protein: 15,
            fat: 19,
        },
        ingredients: [
            "Lentils",
            "Yellow Onion",
            "Garlic", 
            "Heavy cream",
        ]
    },
    {
        id: 3,
        image: <img src={tomato} alt="Tomato soup"/>,
        name: "Tomato soup",
        price: 89,
        description: "Fresh tomato soup with sour cream and sunflower seeds",
        vegetarian: false,
        nutrition: {
            calories: 390,
            carbs: 23,
            protein: 12,
            fat: 17,
        },
        ingredients: [
            "Tomatoes",
            "Yellow Onion",
            "Garlic", 
            "Cream",
        ]
    },
    {
        id: 4,
        image: <img src={mushroom} alt="Muhsroom soup"/>,
        name: "Mushroom soup",
        price: 99,
        description: "Creamy mushroom soup with white wine and parsley",
        vegetarian: true,
        nutrition: {
            calories: 512,
            carbs: 45,
            protein: 23,
            fat: 25,
        },
        ingredients: [
            "Chestnut mushrooms",
            "Yellow Onion",
            "Garlic", 
            "Heavy cream",
        ]
    },
    {
        id: 5,
        image: <img src={minnestrone} alt="Minnestrone soup"/>,
        name: "Minnestrone soup",
        price: 99,
        description: "Minnestrone soup with freshly cut vegetables and pasta, topped with parmesan cheese.",
        vegetarian: false,
        nutrition: {
            calories: 618,
            carbs: 90,
            protein: 12,
            fat: 23,
        },
        ingredients: [
            "Tomatoes",
            "Wheat pasta",
            "Yellow Onion", 
            "Red Onion",
        ]
    },
    {
        id: 6,
        image: <img src={seafood} alt="Seafood soup"/>,
        name: "Seafood soup",
        price: 119,
        description: "Seafood soup with vegetables, clams and shrimps",
        vegetarian: false,
        nutrition: {
            calories: 434,
            carbs: 67,
            protein: 29,
            fat: 19,
        },
        ingredients: [
            "Shrimp",
            "Mussels",
            "Garlic", 
            "Heavy cream",
        ]
    },
    {
        id: 7,
        image: <img src={borscht} alt="Borscht soup"/>,
        name: "Borscht",
        price: 119,
        description: "Classic Borscht Soup with beets, vegetables and meat",
        vegetarian: false,
        nutrition: {
            calories: 390,
            carbs: 54,
            protein: 30,
            fat: 20,
        },
        ingredients: [
            "Beets",
            "Beef",
            "Carrot", 
            "Heavy cream",
        ]
    }
];

export default itemData;