#!/usr/bin/env node
import inquirer from "inquirer";
class Hero {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    decreaseHealth() {
        this.health -= 20;
    }
    increaseHealth() {
        this.health += 20; // Corrected typo and increased health instead of decreasing
    }
}
class Enemy {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    decreaseHealth() {
        this.health -= 20;
    }
    increaseHealth() {
        this.health += 20; // Corrected typo and increased health instead of decreasing
    }
}
async function main() {
    const { heroName } = await inquirer.prompt([
        {
            type: "input",
            name: "heroName",
            message: "Enter your Hero Name:"
        }
    ]);
    const { enemyType } = await inquirer.prompt([
        {
            type: "list",
            name: "enemyType",
            choices: ["alien", "witch", "zombie"], // Removed unnecessary comma
            message: "Select the enemy you Fight with:"
        }
    ]);
    const hero = new Hero(heroName);
    const enemy = new Enemy(enemyType);
    console.log(`${enemy.name} v/s ${hero.name}`);
    do {
        const { action } = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                choices: ["attack", "defend", "range", "target", "run"],
                message: "Choose the Attack type to perform action"
            }
        ]);
        switch (action.toLowerCase()) { // Converted action to lowercase for comparison
            case "attack":
                const randomNum = Math.random();
                if (randomNum > 0.5) {
                    hero.decreaseHealth();
                    console.log(`${hero.name} health: ${hero.health}`);
                    console.log(`${enemy.name} health: ${enemy.health}`);
                    if (hero.health <= 0) {
                        console.log("You loss! try again");
                        return;
                    }
                }
                else {
                    enemy.decreaseHealth();
                    console.log(`${hero.name} health: ${hero.health}`);
                    console.log(`${enemy.name} health: ${enemy.health}`);
                    if (enemy.health <= 0) { // Fixed condition for enemy health check
                        console.log("Congratulations! You won");
                        return;
                    }
                }
                break;
        }
    } while (true);
}
main();
