import Ingredient from '../shared/ingredient.model';
import { Injectable } from '@angular/core';

export default class Recipe {

    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(name: string = null, desc: string = null, imagePath: string = null, ingredients: Ingredient[] = []) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}
