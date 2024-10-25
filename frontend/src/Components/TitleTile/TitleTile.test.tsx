import React from 'react';
import { render, screen } from '@testing-library/react';
import TitleTile from './TitleTile'; 

describe('Tests related to the TitleTile Component', () => {
    const imageName = 'testingimage';
    const title = 'Main Title';

    test('should renders TitleTile component with correct image and title', () => {
        render(<TitleTile imageName={imageName} title={title} />);

        const image = screen.getByAltText(imageName);
        const titleElement = screen.getByText(title);

        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', `/assets/${imageName}.png`);
        expect(titleElement).toBeInTheDocument();
    });

    test('should applies the correct class names', () => {
        const { container } = render(<TitleTile imageName={imageName} title={title} />);
    
        const boxDiv = container.querySelector('.box');
        expect(boxDiv).toBeInTheDocument();
        
        const imgDiv = container.querySelector('.img-div');
        expect(imgDiv).toBeInTheDocument();
        
        const tileImage = container.querySelector('.title-tile-image');
        expect(tileImage).toBeInTheDocument();
    });
});
