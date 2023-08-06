const fs = require('fs');
const inquirer = require('inquirer');

const isValidColor = (input) => {
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const colorKeywords = ["red", "green", "blue", "yellow", "purple", "cyan", "white", "black", "orange"];
    return hexColorRegex.test(input) || colorKeywords.includes(input);
};

const createSVGLogo = (text, textColor, shape, shapeColor) => {
    let shapeSVG = '';

    switch (shape) {
        case 'circle':
            shapeSVG = `<circle cx="150" cy="100" r="100" fill="${shapeColor}" />`;
            break;
        case 'triangle':
            shapeSVG = `<polygon points="150,0 300,200 0,200" fill="${shapeColor}" />`;
            break;
        case 'square':
            shapeSVG = `<rect x="50" y="0" width="200" height="200" fill="${shapeColor}" />`;
            break;
    }

    return `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        ${shapeSVG}
        <text x="150" y="100" font-size="24" fill="${textColor}" text-anchor="middle" dy=".3em">${text}</text>
    </svg>`;
};

(async function main() {
    const answers = await inquirer.prompt([
        {
            name: 'text',
            message: 'Enter the text for the logo (3 characters):',
            validate: input => input.length === 3 ? true : 'Text should be exactly 3 characters.'
        },
        {
            name: 'textColor',
            message: 'Enter the color for the text (color keyword or hex value):',
            validate: isValidColor
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape for the logo:',
            choices: ['circle', 'triangle', 'square']
        },
        {
            name: 'shapeColor',
            message: 'Enter the color for the shape (color keyword or hex value):',
            validate: isValidColor
        }
    ]);

    const svgContent = createSVGLogo(answers.text, answers.textColor, answers.shape, answers.shapeColor);
    fs.writeFileSync('logo.svg', svgContent, 'utf8');
    console.log('Generated logo.svg');
})();

