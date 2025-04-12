# ILO Alignment AI

A web application for analyzing alignment between Course Learning Outcomes (CLOs) and Module Learning Outcomes (MLOs) in educational settings.

## Overview

This tool allows educators and curriculum designers to:

1. Search for courses by code
2. View course information and associated Module Learning Outcomes
3. Generate or input Course Learning Outcomes
4. Analyze alignment between CLOs and MLOs
5. Receive suggestions for improving alignment
6. Generate comprehensive alignment reports

## Features

### Course Information Retrieval
- Input a course code (3 letters followed by 4 digits)
- View detailed course information (name, credits, etc.)
- See associated Module Learning Outcomes

### Course Learning Outcomes Management
- Generate suggested CLOs based on course content
- Input existing CLOs
- Edit and manage CLOs

### Alignment Analysis
- Sophisticated analysis between CLOs and MLOs
- 1-5 scoring system with detailed explanations
- Improvement suggestions for low-scoring alignments

### Reporting
- Comprehensive alignment reports
- Summary statistics
- Detailed alignment scores and suggestions

## Usage Instructions

1. **Open the application**: Open `index.html` in a web browser
2. **Enter a course code**: Type a valid course code (e.g., EKX0040) and click Search
3. **Review information**: View course details and Module Learning Outcomes
4. **Choose an option**:
   - Input existing CLOs
   - Get CLO suggestions
   - Search for another course
5. **Analyze alignment**: After inputting or selecting CLOs, analyze their alignment with MLOs
6. **Review results**: View the detailed alignment analysis and suggestions for improvement
7. **Generate report**: See a comprehensive report of the alignment analysis

## Deployment Options

### Option 1: Local Deployment
Simply open the `index.html` file in a web browser. All data is embedded in the application, so no server is required.

### Option 2: Simple Web Server
1. Host the files on any basic web server (Apache, Nginx, etc.)
2. Upload the following files to your server:
   - `index.html`
   - `styles.css`
   - `script.js`
3. No database setup is required as all data is embedded in the JavaScript

### Option 3: GitHub Pages
1. Create a GitHub repository
2. Upload the project files
3. Enable GitHub Pages in the repository settings
4. Your application will be available at `(https://eestiexile.github.io/iloalignment/)`

### Option 4: Netlify/Vercel Deployment
1. Create an account on Netlify or Vercel
2. Connect your GitHub repository or upload the files directly
3. The platform will automatically deploy your static site
4. You'll receive a custom URL, or you can configure your own domain

### Option 5: University LMS Integration
1. Package the application as a single HTML file using a bundler (optional)
2. Upload to your university's Learning Management System as a resource
3. Students and faculty can access it directly from the LMS

## Technical Details

The application uses:
- HTML, CSS, and JavaScript
- Embedded data (no external files needed)
- Semantic analysis for alignment scoring
- Custom scoring algorithms
- Responsive design

## Design

- **Primary color**: #e4067e (vibrant pink/magenta)
- **Secondary color**: #dadae4 (light gray)
- **Accent color**: #342b60 (deep purple)
- **Font**: Proxima Nova Regular

## Note on PDF Export

The current implementation simulates PDF export functionality. In a production environment, this would be implemented using a library like jsPDF or html2pdf.

## Example Course Codes for Testing

- EKX0040: Introduction to Circular Economy
- HHF3081: Philosophy
- IDK0043: IT Foundations I
- MEF3020: Personal Finance
- MMJ3050: Creativity and innovation
