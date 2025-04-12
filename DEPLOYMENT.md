# ILO Alignment AI Deployment Guide

This document provides detailed instructions for deploying the ILO Alignment AI application in various environments.

## Prerequisites

- No special server-side technologies required (pure client-side application)
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Basic understanding of web hosting (for server options)

## Deployment Options

### 1. Local Deployment

The simplest deployment option is to run the application locally:

1. Download all project files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`

2. Double-click on `index.html` to open it in your default web browser
   
3. The application will run entirely in your browser without any server requirements

**Pros**: Simple, no server needed, works offline
**Cons**: Limited to local use, not accessible to others

### 2. Basic Web Server Deployment

Deploy on a standard web server:

1. Access your web hosting control panel (cPanel, Plesk, etc.)

2. Upload the project files to your web server:
   ```
   /public_html/
     ├── index.html
     ├── styles.css
     └── script.js
   ```

3. If you want to place the application in a subdirectory:
   ```
   /public_html/ilo-alignment/
     ├── index.html
     ├── styles.css
     └── script.js
   ```

4. Access your application at:
   - `https://yourdomain.com/` (if in root directory)
   - `https://yourdomain.com/ilo-alignment/` (if in subdirectory)

**Pros**: Accessible online, simple setup
**Cons**: Requires web hosting

### 3. GitHub Pages Deployment

GitHub Pages provides free hosting for static websites:

1. Create a GitHub account if you don't have one

2. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name your repository (e.g., `ilo-alignment-ai`)
   - Make it public
   - Click "Create repository"

3. Upload your files to the repository:
   - Click "uploading an existing file" on the repository page
   - Drag and drop your project files or use the file selector
   - Commit the files to the repository

4. Enable GitHub Pages:
   - Go to repository Settings
   - Scroll down to "GitHub Pages" section
   - Set source to "main" branch
   - Click "Save"

5. Your site will be published at:
   `https://[username].github.io/[repository-name]/`

**Pros**: Free, easy to update, reliable hosting
**Cons**: Requires GitHub account, public by default (unless you have GitHub Pro)

### 4. Netlify/Vercel Deployment

Netlify and Vercel provide advanced hosting for static sites:

#### Netlify Deployment:

1. Create a Netlify account at https://netlify.com

2. From the Netlify dashboard, click "New site from Git"
   - Connect to your GitHub/GitLab/Bitbucket account
   - Select your repository
   - Configure build settings (not needed for this app)
   - Click "Deploy site"

3. Alternatively, use "drag & drop" deployment:
   - Go to Netlify dashboard
   - Drag your project folder directly onto the dashboard
   - Netlify will automatically upload and deploy

4. Your site will be available at a randomly generated subdomain:
   `https://random-name.netlify.app`

5. Configure a custom domain if desired:
   - Go to "Domain management" in site settings
   - Add your custom domain and follow DNS setup instructions

#### Vercel Deployment:

1. Create a Vercel account at https://vercel.com

2. From the Vercel dashboard, click "Import Project"
   - Connect to your Git repository
   - Or select "Upload" to upload your files directly
   - Configure project settings (not needed for this app)
   - Click "Deploy"

3. Your site will be available at:
   `https://project-name.vercel.app`

4. Configure a custom domain in the project settings

**Pros**: Free tier available, excellent performance, automated deployment, custom domains
**Cons**: Advanced features may require paid plans

### 5. University LMS Integration

Integrate with your Learning Management System:

1. **Simple Integration**:
   - Upload `index.html`, `styles.css`, and `script.js` as resources in your LMS
   - Create a link to the `index.html` file

2. **Embedded Integration**:
   - In your LMS course, create a new HTML page or module
   - Use an iframe to embed the application:
     ```html
     <iframe src="path/to/index.html" width="100%" height="800px" frameborder="0"></iframe>
     ```

3. **Single-File Integration** (Recommended for LMS):
   - Combine all files into a single HTML file:
     1. Create a new HTML file
     2. Copy the contents of `index.html`
     3. Add the CSS inside a `<style>` tag in the `<head>` section
     4. Add the JavaScript inside a `<script>` tag at the end of the `<body>` section
   - Upload this single file to your LMS
   
**Pros**: Direct integration with educational platform, accessible to enrolled students
**Cons**: May have limitations based on LMS security settings

## Customization for Deployment

The application is designed to work without any configuration changes. However, you might want to customize:

1. **University Branding**:
   - Update the header text in `index.html`
   - Modify colors in `styles.css` to match institutional branding
   - Add a university logo to the header

2. **Data Source**:
   - The application has course and MLO data embedded in the JavaScript
   - To update this data, modify the embedded data strings in `script.js`

3. **Export Functionality**:
   - To enable PDF export, consider adding jsPDF or html2pdf libraries
   - Example implementation in `script.js`:
     ```javascript
     // Import jsPDF in index.html
     // <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

     // Update the exportReport function
     function exportReport() {
       const { jsPDF } = window.jspdf;
       const doc = new jsPDF();
       
       // Add content to PDF
       const reportContent = document.getElementById('report-container');
       doc.html(reportContent, {
         callback: function(pdf) {
           pdf.save('alignment-report.pdf');
         }
       });
     }
     ```

## Troubleshooting Common Deployment Issues

1. **Files not loading**:
   - Check that all file paths are correct
   - Ensure file permissions are set correctly (usually 644)
   - Verify that file names match exactly (case-sensitive on some servers)

2. **CORS issues** (if accessing resources across domains):
   - Since data is embedded, CORS shouldn't be an issue
   - If you modify the app to fetch external resources, ensure proper CORS headers

3. **Browser compatibility**:
   - The application uses modern JavaScript features
   - For older browsers, consider using Babel to transpile the code

4. **Performance issues**:
   - The application is lightweight, but for better performance, consider:
     - Minifying CSS and JavaScript
     - Optimizing images if you add any
     - Using a CDN for Font Awesome or other external resources
