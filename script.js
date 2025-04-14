// Global variables to store data
let courseData = [];
let mloData = [];
let currentCourses = []; // Changed from currentCourse to currentCourses (array)
let currentMLOs = [];
let currentCLOs = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Load CSV data
    loadCSVData();
    
    // Set up event listeners
    setupEventListeners();

    // Initially hide home button on landing page
    document.getElementById('home-btn').style.display = 'none';
});

// Populate the datalist with course codes and names
function populateCourseCodeAutocomplete() {
    const datalist = document.getElementById('course-code-list');
    datalist.innerHTML = ''; // Clear existing options

    // Add unique course codes and names to the datalist
    const uniqueCourses = [...new Set(courseData.map(course => `${course.ainekood} - ${course.oppeainenimetusik}`))];
    uniqueCourses.forEach(course => {
        const option = document.createElement('option');
        option.value = course; // Format: "CourseCode - CourseName"
        datalist.appendChild(option);
    });
}

// Load CSV data directly from embedded strings
async function loadCSVData() {
    try {
        // Embedded course data with corrected special characters
        const courseText = `ainekood;oppeainenimetusek;oppeainenimetusik;eap;moodlikood
EKX0040;Sissejuhatus ringmajandusse;Introduction to Circular Economy;3;e1mlo
EKX0040;Sissejuhatus ringmajandusse;Introduction to Circular Economy;3;e2mlo
HHF3081;Filosoofia;Philosophy;3;ylmlo
HOL6010;Euroopa Liidu õigus;European Union Law;6;e1mlo
HOL6010;Euroopa Liidu õigus;European Union Law;6;e2mlo
IDK0043;IT alused I;IT Foundations I;3;ylmlo
IDK0044;IT alused II;IT Foundations II;3;ylmlo
MEF3010;Finantsmodelleerimine;Financial Modelling;6;e1mlo
MEF3010;Finantsmodelleerimine;Financial Modelling;6;e2mlo
MEF3020;Eraisiku rahandus;Personal Finance;3;ylmlo
MEF3030;Bakalaureusetöö seminar;Bachelor Seminar;3;e2mlo
MEM3010;Matemaatika täiendusõpe ärikorralduse üliõpilastele;Refresher Course in Mathematics for Business Students;3;ylmlo
MEM3020;Majandusmatemaatika alused;Fundamentals of Business Mathematics;6;p1mlo
MMA3090;Äritarkvara ja arvestuse infosüsteemid;Business Software Solutions;6;e1mlo
MMA3090;Äritarkvara ja arvestuse infosüsteemid;Business Software Solutions;6;e2mlo
MMA3100;Ärianalüütika alused;Business Analytics;6;e1mlo
MMA3100;Ärianalüütika alused;Business Analytics;6;e2mlo
MMA3110;Finantsarvestuse keskkursus;Intermediate Financial Accounting;6;e1mlo
MMA3110;Finantsarvestuse keskkursus;Intermediate Financial Accounting;6;e2mlo
MMA3160;Juhtimis- ja kuluarvestus;Management and Cost Accounting;6;e1mlo
MMA3160;Juhtimis- ja kuluarvestus;Management and Cost Accounting;6;e2mlo
MME3010;Keskkonna ja säästva arengu ökonoomika;Environmental and Sustainable Development Economics;6;p1mlo
MMJ3040;Rahvusvaheline äri ja eetika;International Business and Ethics;6;p2mlo
MMJ3050;Loovus ja innovatsioon;Creativity and innovation;6;e1mlo
MMJ3050;Loovus ja innovatsioon;Creativity and innovation;6;e2mlo
MMJ3070;Tööpraktika;Internship;6;e1mlo
MMJ3070;Tööpraktika;Internship;6;e2mlo
MMK3100;Tootmise juhtimine ja arengutrendid;Operations Management and Development Trends;6;e1mlo
MMK3100;Tootmise juhtimine ja arengutrendid;Operations Management and Development Trends;6;e2mlo
MMM3020;Bakalaureusetöö seminar;Bachelor Seminar;3;e1mlo
MMM3040;Turundusuuring;Marketing Research;6;e1mlo
MMM3040;Turundusuuring;Marketing Research;6;e2mlo
MMM3070;Turunduskommunikatsioon ja tarbijäkäitumine;Marketing Communication and Consumer Behaviour;6;e1mlo
MMO3030;Juhtimine ja eestvedamine;Management and Leadership;6;p2mlo
MMO3050;Rahvusvaheline inimeste juhtimine;International People Management;6;e1mlo
MMO3050;Rahvusvaheline inimeste juhtimine;International People Management;6;e2mlo
MMO3070;Teadmusjuhtimine;Knowledge Management;6;e1mlo
MMO3070;Teadmusjuhtimine;Knowledge Management;6;e2mlo
MMS3030;Majandussotsioloogia;Economic sociology;6;e1mlo
MMS3030;Majandussotsioloogia;Economic sociology;6;e2mlo
MMS3050;Äriuuringute alused;Research Methods in Business Studies;6;p2mlo
MOE5071;Äriõiguse alused;Business Law;6;p2mlo
TAF2810;Finantsarvestuse alused;Principles of Financial Accounting;6;p2mlo
TER2550;Rahanduse alused;Basic Finance;6;p2mlo
TER2560;Raha, finantsinstitutsioonid ja turud;Money;6;e1mlo
TER2560;Raha, finantsinstitutsioonid ja turud;Money;6;e2mlo
TER2620;Finantsjuhtimine;Financial Management;6;e1mlo
TER2620;Finantsjuhtimine;Financial Management;6;e2mlo
TES0020;Statistika;Statistics;6;p1mlo
TES1140;Ökonometria;Econometrics;6;e1mlo
TES1140;Ökonometria;Econometrics;6;e2mlo
TET0010;Mikroökonoomika I;Microeconomics I;6;p1mlo
TET2550;Makroökonoomika I;Macroeconomics I;6;p1mlo
TMJ0140;Ettevõtluse alused;Introduction to Entrepreneurship;6;p2mlo
TMJ0190;Start-up ettevõtlus;Start-up Entrepreneurship;6;e1mlo
TMJ0190;Start-up ettevõtlus;Start-up Entrepreneurship;6;e2mlo
TMJ0230;Ärilogistika ja varude juhtimine;Logistics and Inventory Management;6;p2mlo
TMM2150;Turundus;Basic Marketing;6;p2mlo
TMM2420;Turunduse juhtimine;Marketing Management;6;e1mlo
TMM2420;Turunduse juhtimine;Marketing Management;6;e2mlo
TMM2470;E-turundus;E-marketing;6;e1mlo
TMM2470;E-turundus;E-marketing;6;e2mlo
TMT2020;Töökeskkond ja ergonoomika;Working Environment and Ergonomics;6;ylmlo
TSK0028;Majandusalane inglise keel II;Business English II;6;ylmlo
TSK0326;Majandusalane inglise keel I;Business English I;6;ylmlo
TSP0073;Rahvusvahelised suhted kaasajal;Contemporary International Relations;6;ylmlo
UTT0120;Probleem- ja projektõpe;Problem- and Project Based Learning;6;e1mlo
UTT0120;Probleem- ja projektõpe;Problem- and Project Based Learning;6;e2mlo
YTM0071;Eluslooduse alused;Fundamentals of life;3;ylmlo`;
        courseData = parseCSV(courseText);
        
        // Embedded MLO data (mlosisu.csv content)
        const mloText = `moodlikood;kategooria;ilosisu;oisnimetus
kava;kava;"synthesizes wide-ranging knowledge and skills to overcome challenges in international organizations in various sectors as an employee, to run one's own business, and/or to continue studies on graduate level;";Learning outcomes of the study programme
kava;kava;"critically evaluates main concepts of business administration and relevant social and legal aspects, generally accepted foundational theories and models, and appraises operating environments, development trends in economy and society, and best practices in industries;";Learning outcomes of the study programme
kava;kava;"designs and evaluates business models and plans and evaluates strategic, tactical and functional decisions considering sustainability of the organization, people and environment, and adheres to the principles of corporate social responsibility and ethics;";Learning outcomes of the study programme
kava;kava;"purposefully synthesizes the acquired knowledge and skills to identify, solve or alleviate problems in the fields of management, marketing, supply chain, accounting and finance based on evidence and considering cross-functional dependencies; identifies and appraises alternative scenarios and plans work-related activities systematically and efficiently;";Learning outcomes of the study programme
kava;kava;expresses ideas fluently and efficiently in professional communication and applies modern information and communication technologies;Learning outcomes of the study programme
kava;kava;demonstrates proactive attitude towards change and continuous development at personal and organizational levels, formulates relevant individual and organizational goals, and assembles and leads a team.;Learning outcomes of the study programme
ylmlo;moodul;"knows the basic principles of ICT, is able to find and evaluate information efficiently, is able to use spreadsheets and word processing applications proficiently and is able to use programming tools for processing data;";Learning outcomes of the General studies module - Foundational Competences
ylmlo;moodul;"can scientifically interpret the effect of work environment on human body, knows the risk factors involved in work environment and is able to develop a healthy and ergonomic work environment;";Learning outcomes of the General studies module - Foundational Competences
ylmlo;moodul;has selectively strengthened and broadened knowledge and skills in communication skills in Estonian or in a foreign language, or regarding the principles of natural science.;Learning outcomes of the General studies module - Foundational Competences
p1mlo;moodul;"is able to think in economic terms and explain the economic behaviour of economic actors; comprehend the relationship between individual economic phenomena and economy as a whole;";Learning outcomes of the first Core studies module - P1 Methods, Markets and Economy
p1mlo;moodul;"knows the fundamental concepts of economics theory and principles of economics both on micro and macro level; is able to interpret microeconomic indicators and analyse relationships between and reasons for elementary macroeconomic processes;";Learning outcomes of the first Core studies module - P1 Methods, Markets and Economy
p1mlo;moodul;"demonstrates systematic knowledge about environmental economics and the economics of sustainable development, main environmental problems, their causes, consequences and the possibilities of influencing and preventing them, environment-based restrictions on the economy and about related regulations;";Learning outcomes of the first Core studies module - P1 Methods, Markets and Economy
p1mlo;moodul;"has an overview of statistics concepts and research methods used in economic and business studies;";Learning outcomes of the first Core studies module - P1 Methods, Markets and Economy
p1mlo;moodul;is able to interpret economic problems mathematically, formulate less sophisticated mathematical economics tasks and solve them.;Learning outcomes of the first Core studies module - P1 Methods, Markets and Economy
p2mlo;moodul;"demonstrates broad fundamental knowledge and skills across four pillars of the programme marketing, entrepreneurship and management, accounting and business intelligence, and finance from operative level to broadly outlined strategic level;";Learning outcomes of the second Core studies module - P2 Core Business Competences
p2mlo;moodul;"knows the basic terminology, theories and concepts of the above named areas and general conventional methods of analysis, and is able to set area-related aims and develop the processes in focus;";Learning outcomes of the second Core studies module - P2 Core Business Competences
p2mlo;moodul;"is able to perceive relationships and interdependence between business functions, their impact on total costs of enterprise, its efficiency and competitive position, and defines, analyses and improves practical problems and challenges of not overly sophisticated nature;";Learning outcomes of the second Core studies module - P2 Core Business Competences
p2mlo;moodul;"is able to evaluate positive and negative aspects and risks of being an entrepreneur; knows which personality traits are essential for an entrepreneur and is able to evaluate his/her own fitness for becoming an entrepreneur;";Learning outcomes of the second Core studies module - P2 Core Business Competences
p2mlo;moodul;"knows the principles of creative thinking, can demonstrate initiative, evaluate entrepreneurial opportunities, analyse impact of a business environment on the idea realisation potential and develop a business model; take the main decisions related to the establishment of an enterprise and plan business growth and development;";Learning outcomes of the second Core studies module - P2 Core Business Competences
p2mlo;moodul;"knows the characteristics of business research, stages of the research process, methods for gathering and analysing quantitative and qualitative data; is skilled in applying widely used data collection methods; is able to conduct data analysis, interpret results of analysis and present them in a generalised, informative way in agreement with academic requirements;";Learning outcomes of the second Core studies module - P2 Core Business Competences
p2mlo;moodul;"is able to analyse different situations and issues of dispute in the area of business law, and is able to envisage legal interpretations and potential consequences of related business decisions;";Learning outcomes of the second Core studies module - P2 Core Business Competences
p2mlo;moodul;"has knowledge about the essence of international business and basic principles of internationalisation;";Learning outcomes of the second Core studies module - P2 Core Business Competences
p2mlo;moodul;knows the theoretical bases of business ethics and is able to analyse business ethics dilemmas based on the principle of corporate social responsibility.;Learning outcomes of the second Core studies module - P2 Core Business Competences
e1mlo;moodul;"analyses the international business environment, constructs business ideas, and plans their realization; Show less...";Learning outcomes of the first Special studies module - E1 Entrepreneurship and Marketing
e1mlo;moodul;"analyses the role of human resource management in organisations and plans key sub-activities;";Learning outcomes of the first Special studies module - E1 Entrepreneurship and Marketing
e1mlo;moodul;"explains the nature of production and service management processes and their strategic importance, and places these into the wider development trends context of the world economy;";Learning outcomes of the first Special studies module - E1 Entrepreneurship and Marketing
e1mlo;moodul;"understands marketing concepts, the essence of marketing management, e-marketing, and context and influencing factors of marketing decisions;";Learning outcomes of the first Special studies module - E1 Entrepreneurship and Marketing
e1mlo;moodul;designs and conducts market research and interprets the results in the context of strategic positioning, competitive advantage, and development opportunities of the organisation.;Learning outcomes of the first Special studies module - E1 Entrepreneurship and Marketing
gdmlo;moodul;"formulates a research problem corresponding to the main speciality, sets the aim of the thesis and defines research questions/tasks/hypotheses; Show less...";Learning outcomes of the Graduation thesis module
gdmlo;moodul;"chooses appropriate scientific and field-specific literature, analyses and synthesizes their content;";Learning outcomes of the Graduation thesis module
gdmlo;moodul;"chooses appropriate methodology to fulfill the aim of the thesis;";Learning outcomes of the Graduation thesis module
gdmlo;moodul;"collects, processes and analyses relevant information;";Learning outcomes of the Graduation thesis module
gdmlo;moodul;"uses professional knowledge to solve the research problem, interpret the results and provide conclusions;";Learning outcomes of the Graduation thesis module
gdmlo;moodul;"formats the thesis according to pre-set requirements using scientific language and professional terminology and following proper citing principles;";Learning outcomes of the Graduation thesis module
gdmlo;moodul;presents and explains one's viewpoints in both written and oral form.;Learning outcomes of the Graduation thesis module
e2mlo;moodul;"can organize financial accounting within a company, comprehends, interprets, and analyzes financial statements;";Learning outcomes of the second Special studies module - E2 Finance and Accounting
e2mlo;moodul;"comprehends and interprets the content of financial statements and can generally manage financial accounting within a company;";Learning outcomes of the second Special studies module - E2 Finance and Accounting
e2mlo;moodul;"navigates the basic concepts of management and cost accounting, can prepare different decisions based on quantitative data, create various budgets, plans, and reports, perform ratio-based analysis, and evaluate the success of an international company using different financial performance criteria;";Learning outcomes of the second Special studies module - E2 Finance and Accounting
e2mlo;moodul;"analyzes practical financial issues, demonstrating a basic knowledge of the international financial system, services, and instruments;";Learning outcomes of the second Special studies module - E2 Finance and Accounting
e2mlo;moodul;"understands the impact and challenges of the digital age on traditional accounting, can collect financial information from various company information systems, process, analyze, interpret it, and present it to company management;";Learning outcomes of the second Special studies module - E2 Finance and Accounting
e2mlo;moodul;is familiar with the main research methods in econometrics and applies them in a practical context, handling quantitative analysis of economic problems.;Learning outcomes of the second Special studies module - E2 Finance and Accounting`;
        courseData = parseCSV(courseText);
        mloData = parseCSV(mloText);

        console.log('Data loaded successfully');
        document.getElementById('search-btn').disabled = false;

        // Populate the autocomplete datalist
        populateCourseCodeAutocomplete();
    } catch (error) {
        console.error('Error loading data:', error);
        showError('Failed to load data: ' + error.message);
    }
}

// Parse CSV text into array of objects
function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(';');
    
    return lines.slice(1).filter(line => line.trim() !== '').map(line => {
        const values = line.split(';');
        const obj = {};
        
        headers.forEach((header, index) => {
            obj[header] = values[index] || '';
        });
        
        return obj;
    });
}

// Set up event listeners for user interactions
function setupEventListeners() {
    // Search button click
    document.getElementById('search-btn').addEventListener('click', searchCourse);
    
    // Course code input enter key
    document.getElementById('course-code').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchCourse();
        }
    });
    
    // Home button
    document.getElementById('home-btn').addEventListener('click', resetApp);
    
    // New course button
    document.getElementById('new-course-btn').addEventListener('click', resetApp);
    
    // Suggest CLOs button (commented out)
    // document.getElementById('suggest-clo-btn').addEventListener('click', suggestCLOs);
    
    // Input CLOs button
    document.getElementById('input-clo-btn').addEventListener('click', showCLOInput);
    
    // Add CLO button
    document.getElementById('add-clo-btn').addEventListener('click', addCLO);
    
    // Analyze button
    document.getElementById('analyze-btn').addEventListener('click', performAnalysis);
    
    // Use suggestions button
    document.getElementById('use-suggestions-btn').addEventListener('click', useSuggestions);
    
    // Modify suggestions button
    document.getElementById('modify-suggestions-btn').addEventListener('click', modifySuggestions);
    
    // Export report button
    document.getElementById('export-report-btn').addEventListener('click', exportReport);

    // Language switch buttons
    document.getElementById('lang-en').addEventListener('click', function() {
        switchLanguage('en', 'Enter each Course Learning Outcome on a new line...');
    });

    document.getElementById('lang-et').addEventListener('click', function() {
        switchLanguage('et', 'Sisesta iga õpiväljund uuele reale...');
    });
}

// Add this function for language detection
function detectLanguage(text) {
    // Common Estonian words
    const estonianWords = ['ja', 'ning', 'või', 'aga', 'kui', 'siis', 'et', 'on', 'oli', 'ole'];
    
    // Convert text to lowercase and split into words
    const words = text.toLowerCase().split(/\s+/);
    
    // Count Estonian words
    const estonianWordCount = words.filter(word => estonianWords.includes(word)).length;
    
    // If more than 10% of recognized words are Estonian, consider it Estonian
    return (estonianWordCount / words.length) > 0.1 ? 'et' : 'en';
}

// Modify the textarea input handler
document.getElementById('clo-textarea').addEventListener('input', function(e) {
    const text = e.target.value;
    if (text.trim().length > 0) {
        const detectedLang = detectLanguage(text);
        e.target.setAttribute('lang', detectedLang);
        e.target.setAttribute('spellcheck', 'true');
        
        // Update placeholder based on detected language
        e.target.placeholder = detectedLang === 'et' 
            ? 'Sisesta iga õpiväljund uuele reale...'
            : 'Enter each Course Learning Outcome on a new line...';
    }
});

// Function to reset the app
function resetApp() {
    // Clear input fields
    document.getElementById('course-code').value = '';

    // Clear displayed data
    document.getElementById('display-course-code').textContent = '';
    document.getElementById('course-name-en').textContent = '';
    document.getElementById('course-name-et').textContent = '';
    document.getElementById('course-credits').textContent = '';
    document.getElementById('module-code').textContent = '';
    document.getElementById('mlo-container').innerHTML = '';
    document.getElementById('clo-list').innerHTML = '';
    document.getElementById('analysis-container').innerHTML = '';
    document.getElementById('report-container').innerHTML = '';
    document.getElementById('suggestions-container').innerHTML = '';

    // Reset global variables
    currentCourses = [];
    currentMLOs = [];
    currentCLOs = [];

    // Hide all sections except the course input section
    document.querySelectorAll('section').forEach(section => {
        if (section.id === 'course-input') {
            section.classList.remove('hidden-section');
            section.classList.add('active-section');
        } else {
            section.classList.add('hidden-section');
            section.classList.remove('active-section');
        }
    });

    // Hide home button when returning to landing page
    document.getElementById('home-btn').style.display = 'none';
}

// Search for a course by code
function searchCourse() {
    const courseCodeInput = document.getElementById('course-code');
    
    // Get the value directly from the input field
    let courseCode = '';
    if (courseCodeInput && courseCodeInput.value) {
        courseCode = courseCodeInput.value.trim();
    }
    
    const validationMessage = document.getElementById('validation-message');
    
    console.log("Searching for course code:", courseCode);
    
    // Remove validation message logic
    validationMessage.textContent = ''; // Clear any previous validation messages

    // Find course in data
    const foundCourses = courseData.filter(course => `${course.ainekood} - ${course.oppeainenimetusik}` === courseCode);
    
    if (foundCourses.length === 0) {
        validationMessage.textContent = 'Course not found. Please select a valid course from the list.';
        return;
    }
    
    // Clear validation message
    validationMessage.textContent = '';
    
    // Store all found courses
    currentCourses = foundCourses;
    
    // Display course information
    displayCourseInfo(currentCourses);
    
    // Retrieve and display MLOs for all module codes
    retrieveMLOs(currentCourses);
    
    // Show options panel
    showSection('options-panel');
}

// Validate course code format (3 letters followed by 4 digits)
function isValidCourseCode(code) {
    // Ensure code is a string and remove any spaces
    code = String(code).replace(/\s+/g, '');
    console.log("Validating code:", code);
    const regex = /^[A-Z]{3}\d{4}$/;
    const isValid = regex.test(code);
    console.log("Is valid:", isValid);
    return isValid;
}

// Display course information
function displayCourseInfo(courses) {
    // Use the first course for common information
    const course = courses[0];

    document.getElementById('display-course-code').textContent = course.ainekood;
    document.getElementById('course-name-en').textContent = course.oppeainenimetusik;
    document.getElementById('course-name-et').textContent = course.oppeainenimetusek;
    document.getElementById('course-credits').textContent = course.eap;

    // Get all unique module codes
    const moduleCodes = [...new Set(courses.map(c => c.moodlikood))];

    // Create comma-separated list of module codes in uppercase
    const moduleCodeElement = document.getElementById('module-code');
    moduleCodeElement.textContent = moduleCodes
        .map(code => code.toUpperCase().replace('MLO', ''))
        .join(', ');

    // Show course info section
    showSection('course-info');

    // Ensure options panel is visible
    const optionsPanel = document.getElementById('options-panel');
    optionsPanel.classList.remove('hidden-section');
    optionsPanel.classList.add('active-section');
}

// Retrieve MLOs based on module codes from all courses
function retrieveMLOs(courses) {
    // Get all unique module codes
    const moduleCodes = [...new Set(courses.map(c => c.moodlikood))];
    
    // Filter MLOs by all module codes
    currentMLOs = [];
    moduleCodes.forEach(moduleCode => {
        const moduleMLOs = mloData.filter(mlo => mlo.moodlikood === moduleCode);
        // Add module code information to each MLO for display purposes
        moduleMLOs.forEach(mlo => {
            mlo.moduleCode = moduleCode;
        });
        currentMLOs = currentMLOs.concat(moduleMLOs);
    });
    
    // Display MLOs
    displayMLOs(currentMLOs);
}

// Display MLOs
function displayMLOs(mlos) {
    const mloContainer = document.getElementById('mlo-container');
    mloContainer.innerHTML = '';
    
    if (mlos.length === 0) {
        mloContainer.innerHTML = '<p>No Module Learning Outcomes found for this course.</p>';
        showSection('mlo-display');
        return;
    }
    
    // Group MLOs by module code
    const moduleGroups = {};
    mlos.forEach(mlo => {
        if (!moduleGroups[mlo.moduleCode]) {
            moduleGroups[mlo.moduleCode] = [];
        }
        moduleGroups[mlo.moduleCode].push(mlo);
    });
    
    // Define module order
    const moduleOrder = ['ylmlo', 'p1mlo', 'p2mlo', 'e1mlo', 'e2mlo', 'gdmlo'];
    
    // Create a section for each module in the specified order
    moduleOrder.forEach(moduleCode => {
        if (!moduleGroups[moduleCode]) return; // Skip if module doesn't exist
        
        const moduleMLOs = moduleGroups[moduleCode];
        
        // Create module section
        const moduleSection = document.createElement('div');
        moduleSection.className = 'module-section';
        
        // Add module header with the full name
        const moduleHeader = document.createElement('div');
        moduleHeader.className = 'module-header';
        moduleHeader.innerHTML = `<h3>${getModuleFullName(moduleCode)}</h3>`;
        moduleSection.appendChild(moduleHeader);
        
        // Add MLOs for this module
        moduleMLOs.forEach((mlo, index) => {
            const mloItem = document.createElement('div');
            mloItem.className = 'mlo-item';
            
            // Remove quotation marks and clean up the text
            let mloText = mlo.ilosisu;
            mloText = mloText.replace(/^["']|["']$/g, '').trim(); // Remove leading/trailing quotes
            
            mloItem.innerHTML = `
                <h4>${moduleCode.toUpperCase()} ${index + 1}</h4>
                <p>${mloText}</p>
            `;
            moduleSection.appendChild(mloItem);
        });
        
        mloContainer.appendChild(moduleSection);
    });
    
    // Show MLO display section
    showSection('mlo-display');
}

// Reset to search view
function resetToSearch() {
    // Clear current CLOs
    currentCLOs = [];

    // Reset other UI elements
    document.getElementById('clo-list').innerHTML = '';
    document.getElementById('clo-textarea').value = '';
    showSection('course-input');
}

// Show CLO input section
function showCLOInput() {
    // Clear current CLOs
    currentCLOs = [];
    document.getElementById('clo-list').innerHTML = '';
    document.getElementById('clo-textarea').value = '';

    // Show CLO input section
    showSection('clo-input');
}

// Add CLO from textarea
function addCLO() {
    const cloTextarea = document.getElementById('clo-textarea');
    const cloText = cloTextarea.value.trim();

    if (cloText === '') {
        return; // Do nothing if the input is empty
    }

    // Split by new lines and add each as a CLO
    const cloLines = cloText.split('\n').filter(line => line.trim() !== '');

    cloLines.forEach(line => {
        // Add to current CLOs
        currentCLOs.push(line);

        // Add to display
        addCLOToDisplay(line);
    });

    // Clear textarea
    cloTextarea.value = '';
    console.log('Current CLOs:', currentCLOs);
}

// Add a CLO to the display
function addCLOToDisplay(cloText) {
    const cloList = document.getElementById('clo-list');
    const index = currentCLOs.length;
    
    const cloItem = document.createElement('div');
    cloItem.className = 'clo-item';
    cloItem.innerHTML = `
        <div class="clo-text">
            <strong>CLO ${index}:</strong> ${cloText}
        </div>
        <div class="clo-actions">
            <button class="edit-clo" data-index="${index - 1}"><i class="fas fa-edit"></i></button>
            <button class="delete-clo" data-index="${index - 1}"><i class="fas fa-trash"></i></button>
        </div>
    `;
    
    // Add event listeners for edit and delete buttons
    cloItem.querySelector('.edit-clo').addEventListener('click', function() {
        editCLO(this.getAttribute('data-index'));
    });
    
    cloItem.querySelector('.delete-clo').addEventListener('click', function() {
        deleteCLO(this.getAttribute('data-index'));
    });
    
    cloList.appendChild(cloItem);
}

// Edit a CLO
function editCLO(index) {
    const cloText = currentCLOs[index];
    const cloTextarea = document.getElementById('clo-textarea');
    
    // Set textarea value to CLO text
    cloTextarea.value = cloText;
    
    // Delete the CLO (will be re-added when user clicks Add CLO)
    deleteCLO(index);
    
    // Focus textarea
    cloTextarea.focus();
}

// Delete a CLO
function deleteCLO(index) {
    // Remove from array
    currentCLOs.splice(index, 1);
    
    // Refresh display
    const cloList = document.getElementById('clo-list');
    cloList.innerHTML = '';
    
    // Re-add all CLOs to display
    currentCLOs.forEach(clo => {
        addCLOToDisplay(clo);
    });
}

// Suggest CLOs based on course and MLOs
function suggestCLOs() {
    // Generate suggestions based on course name and MLOs
    const suggestions = generateCLOSuggestions();

    // Display suggestions without modifying currentCLOs
    displayCLOSuggestions(suggestions);

    // Show suggestions section
    showSection('clo-suggestions');
}

// Generate CLO suggestions based on course and MLOs
function generateCLOSuggestions() {
    // Use the first course for common information
    const course = currentCourses[0];
    const courseName = course.oppeainenimetusik;
    const suggestions = [];
    
    // Generate a basic set of CLOs based on the course name and MLOs
    // This is a simplified version - in a real application, this would use more sophisticated NLP
    
    // Suggestion 1: Understanding core concepts
    suggestions.push(`Demonstrate comprehensive understanding of core concepts and principles in ${courseName}.`);
    
    // Suggestion 2: Application of knowledge
    suggestions.push(`Apply theoretical knowledge of ${courseName} to solve practical problems in relevant contexts.`);
    
    // Suggestion 3: Critical analysis
    suggestions.push(`Critically analyze and evaluate approaches and methodologies used in ${courseName}.`);
    
    // Suggestion 4: Communication
    suggestions.push(`Effectively communicate ideas, findings, and solutions related to ${courseName} using appropriate terminology.`);
    
    // Suggestion 5: Based on MLOs if available
    if (currentMLOs.length > 0) {
        // Take keywords from the first MLO and create a related CLO
        const firstMLO = currentMLOs[0].ilosisu;
        const keywords = extractKeywords(firstMLO);
        suggestions.push(`Develop proficiency in ${keywords.join(', ')} as they relate to ${courseName}.`);
    }
    
    return suggestions;
}

// Extract keywords from text (simplified version)
function extractKeywords(text) {
    // Remove common words and punctuation
    const commonWords = ['the', 'and', 'is', 'in', 'to', 'of', 'a', 'for', 'with', 'on', 'at'];
    
    // Split text into words, filter out common words, and take unique words
    const words = text.toLowerCase()
        .replace(/[.,;:'"!?()]/g, '')
        .split(' ')
        .filter(word => word.length > 3 && !commonWords.includes(word));
    
    // Return up to 3 unique words
    return [...new Set(words)].slice(0, 3);
}

// Display CLO suggestions
function displayCLOSuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('suggestions-container');
    suggestionsContainer.innerHTML = '';
    
    suggestions.forEach((suggestion, index) => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.innerHTML = `
            <input type="checkbox" class="suggestion-checkbox" id="suggestion-${index}" checked>
            <label for="suggestion-${index}">${suggestion}</label>
        `;
        suggestionsContainer.appendChild(suggestionItem);
    });
}

// Use selected suggestions as CLOs
function useSuggestions() {
    // Clear current CLOs only if suggestions are explicitly used
    const checkboxes = document.querySelectorAll('.suggestion-checkbox:checked');
    if (checkboxes.length === 0) {
        alert('Please select at least one suggestion.');
        return;
    }

    // Replace currentCLOs with selected suggestions
    currentCLOs = [];
    checkboxes.forEach(checkbox => {
        const label = checkbox.nextElementSibling.textContent;
        currentCLOs.push(label);
    });

    // Perform analysis with selected CLOs
    performAnalysis();
}

// Modify suggestions (go to CLO input with suggestions pre-filled)
function modifySuggestions() {
    // Get all checked suggestions
    const checkboxes = document.querySelectorAll('.suggestion-checkbox:checked');
    let selectedSuggestions = [];
    
    checkboxes.forEach(checkbox => {
        const label = checkbox.nextElementSibling.textContent;
        selectedSuggestions.push(label);
    });
    
    // Show CLO input section
    showCLOInput();
    
    // Pre-fill textarea with selected suggestions
    document.getElementById('clo-textarea').value = selectedSuggestions.join('\n');
}

// Perform alignment analysis between CLOs and MLOs
function performAnalysis() {
    // Check if we have CLOs
    if (currentCLOs.length === 0) {
        alert('Please add at least one Course Learning Outcome.');
        return;
    }
    
    // Check if we have MLOs
    if (currentMLOs.length === 0) {
        alert('No Module Learning Outcomes available for analysis.');
        return;
    }
    
    // Perform the analysis
    const analysisResults = analyzeAlignment();
    
    // Display analysis results
    displayAnalysisResults(analysisResults);
    
    // Show analysis section
    showSection('alignment-analysis');
    
    // Generate and display report
    generateReport(analysisResults);
}

// Analyze alignment between CLOs and MLOs
function analyzeAlignment() {
    const results = [];

    // Loop through user-input CLOs only
    currentCLOs.forEach((clo, cloIndex) => {
        let bestMatch = {
            mlo: null,
            mloIndex: -1,
            score: 0,
            reason: '',
            suggestion: ''
        };

        // Compare with each MLO
        currentMLOs.forEach((mlo, mloIndex) => {
            const score = calculateAlignmentScore(clo, mlo.ilosisu);
            const reason = generateAlignmentReason(clo, mlo.ilosisu, score);

            // If this is the best match so far, update bestMatch
            if (score > bestMatch.score) {
                bestMatch = {
                    mlo: mlo,
                    mloIndex: mloIndex,
                    score: score,
                    reason: reason
                };
            }
        });

        // Add to results
        results.push({
            clo: clo, // Use the original CLO content from user input
            cloIndex: cloIndex,
            mlo: bestMatch.mlo,
            mloIndex: bestMatch.mloIndex,
            score: bestMatch.score,
            reason: bestMatch.reason
        });
    });

    return results;
}

// Calculate alignment score between CLO and MLO (1-5 scale)
function calculateAlignmentScore(clo, mloText) {
    // This is a simplified scoring algorithm
    // In a real application, this would use more sophisticated NLP techniques
    
    // Convert to lowercase for comparison
    const cloLower = clo.toLowerCase();
    const mloLower = mloText.toLowerCase();
    
    // Extract keywords from both
    const cloKeywords = extractKeywords(cloLower);
    const mloKeywords = extractKeywords(mloLower);
    
    // Count matching keywords
    let matchCount = 0;
    cloKeywords.forEach(keyword => {
        if (mloLower.includes(keyword)) {
            matchCount++;
        }
    });
    
    // Check for verb alignment (simplified)
    const verbs = ['analyze', 'apply', 'assess', 'create', 'define', 'demonstrate', 'design', 'develop', 'evaluate', 'explain', 'identify', 'implement', 'interpret', 'plan', 'solve', 'understand', 'use'];
    let verbAlignment = false;
    
    verbs.forEach(verb => {
        if (cloLower.includes(verb) && mloLower.includes(verb)) {
            verbAlignment = true;
        }
    });
    
    // Calculate score based on keyword matches and verb alignment
    let score = 1; // Base score
    
    if (matchCount > 0) {
        score += Math.min(matchCount, 2); // Up to 2 points for keyword matches
    }
    
    if (verbAlignment) {
        score += 1; // 1 point for verb alignment
    }
    
    // Check for overall thematic alignment
    if (cloLower.length > 20 && mloLower.includes(cloLower.substring(0, 20).split(' ').slice(-1)[0])) {
        score += 1; // 1 point for thematic alignment
    }
    
    return Math.min(score, 5); // Cap at 5
}

// Generate reason for alignment score
function generateAlignmentReason(clo, mloText, score) {
    switch (score) {
        case 1:
            return 'The CLO and MLO address different topics with minimal overlap in content or skills.';
        case 2:
            return 'There is some topical overlap, but the CLO and MLO focus on different aspects or levels of learning.';
        case 3:
            return 'The CLO and MLO share some common themes and learning objectives, but could be more closely aligned.';
        case 4:
            return 'The CLO clearly supports the MLO with significant overlap in content and skills development.';
        case 5:
            return 'The CLO directly supports and enhances the MLO with strong connections in both content and expected outcomes.';
        default:
            return 'Unable to determine alignment.';
    }
}

// Generate improvement suggestion for low scores
function generateImprovementSuggestion(clo, mloText) {
    // Extract keywords from MLO
    const mloKeywords = extractKeywords(mloText);
    
    // Generate suggestion based on keywords
    if (mloKeywords.length > 0) {
        return `Consider revising the CLO to incorporate key concepts from the MLO such as: ${mloKeywords.join(', ')}. Align the learning level (e.g., understand, apply, analyze) with the MLO expectations.`;
    } else {
        return 'Consider revising the CLO to more closely align with the themes and learning levels in the MLO.';
    }
}

// Display analysis results
function displayAnalysisResults(results) {
    const analysisContainer = document.getElementById('analysis-container');
    analysisContainer.innerHTML = '';
    
    results.forEach((result, index) => {
        const alignmentItem = document.createElement('div');
        alignmentItem.className = 'alignment-item';
        
        // Create header with title and score
        const header = document.createElement('div');
        header.className = 'alignment-header';
        
        const title = document.createElement('div');
        title.className = 'alignment-title';
        title.textContent = `Alignment ${index + 1}`;
        
        const score = document.createElement('div');
        score.className = `alignment-score score-${result.score}`;
        score.textContent = `Score: ${result.score}/5`;
        
        header.appendChild(title);
        header.appendChild(score);
        
        // Create details section
        const details = document.createElement('div');
        details.className = 'alignment-details';
        
        // CLO section
        const cloSection = document.createElement('div');
        cloSection.className = 'alignment-clo';
        cloSection.innerHTML = `
            <strong>CLO ${result.cloIndex + 1}:</strong>
            <p>${result.clo}</p>
        `;
        
        // MLO section
        const mloSection = document.createElement('div');
        mloSection.className = 'alignment-mlo';
        mloSection.innerHTML = `
            <strong>MLO ${result.mloIndex + 1}:</strong>
            <p>${result.mlo.ilosisu}</p>
        `;
        
        // Reason section
        const reasonSection = document.createElement('div');
        reasonSection.className = 'alignment-reason';
        reasonSection.innerHTML = `
            <strong>Reason:</strong>
            <p>${result.reason}</p>
        `;
        
        // Add sections to details
        details.appendChild(cloSection);
        details.appendChild(mloSection);
        details.appendChild(reasonSection);
        
        // Add suggestion if score is low
        if (result.score < 3 && result.suggestion) {
            const suggestionSection = document.createElement('div');
            suggestionSection.className = 'alignment-suggestion';
            suggestionSection.innerHTML = `
                <strong>Suggestion for Improvement:</strong>
                <p>${result.suggestion}</p>
            `;
            details.appendChild(suggestionSection);
        }
        
        // Add header and details to item
        alignmentItem.appendChild(header);
        alignmentItem.appendChild(details);
        
        // Add item to container
        analysisContainer.appendChild(alignmentItem);
    });
}

// Generate report
function generateReport(results) {
    const reportContainer = document.getElementById('report-container');
    reportContainer.innerHTML = '';

    const course = currentCourses[0];

    // Create report header
    const reportHeader = `
        <div class="report-header">
            <div class="report-title">
                <h3>Alignment Analysis Report</h3>
                <p>${course.oppeainenimetusik} (${course.ainekood})</p>
            </div>
            <div class="report-actions">
                <button id="continue-editing-btn" class="primary-btn">
                    <i class="fas fa-edit"></i> Continue Editing CLOs
                </button>
                <button id="export-report-btn" class="primary-btn">
                    <i class="fas fa-file-export"></i> Export Report
                </button>
            </div>
        </div>
    `;
    reportContainer.innerHTML += reportHeader;

    // Group results by module
    const moduleGroups = {};
    results.forEach(result => {
        const moduleCode = result.mlo.moduleCode;
        if (!moduleGroups[moduleCode]) {
            moduleGroups[moduleCode] = [];
        }
        moduleGroups[moduleCode].push(result);
    });

    // Define module order
    const moduleOrder = ['ylmlo', 'p1mlo', 'p2mlo', 'e1mlo', 'e2mlo', 'gdmlo'];

    // Generate report for each module in the specified order
    moduleOrder.forEach(moduleCode => {
        if (!moduleGroups[moduleCode]) return; // Skip if module doesn't exist in results

        const moduleResults = moduleGroups[moduleCode];
        const moduleMLOs = currentMLOs.filter(mlo => mlo.moduleCode === moduleCode);

        const moduleTable = `
            <div class="report-section">
                <h4>${getModuleFullName(moduleCode)}</h4>
                <table class="report-table">
                    <thead>
                        <tr>
                            <th>CLO</th>
                            <th>Best Matching MLO</th>
                            <th>Score</th>
                            <th>Justification</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${moduleResults.map(result => {
                            const mloNumber = moduleMLOs.findIndex(mlo => 
                                mlo.ilosisu === result.mlo.ilosisu) + 1;
                            
                            return `
                            <tr>
                                <td><strong>CLO ${result.cloIndex + 1}:</strong> ${result.clo}</td>
                                <td><strong>${moduleCode.toUpperCase()} ${mloNumber}:</strong> ${result.mlo.ilosisu}</td>
                                <td class="score-${result.score}">${result.score}/5</td>
                                <td>${result.reason}</td>
                            </tr>
                        `}).join('')}
                    </tbody>
                </table>
            </div>
        `;
        reportContainer.innerHTML += moduleTable;
    });

    // Add report footer
    const reportFooter = `
        <div class="report-footer">
            <button id="continue-editing-bottom-btn" class="primary-btn">
                <i class="fas fa-edit"></i> Continue Editing CLOs
            </button>
            <button id="export-report-btn" class="primary-btn">
                <i class="fas fa-file-export"></i> Export Report
            </button>
        </div>
    `;
    reportContainer.innerHTML += reportFooter;

    // Add event listeners for all export report buttons
    document.querySelectorAll('#export-report-btn, [id^="export-report-btn"]').forEach(btn => {
        // Remove existing listeners
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        // Add new listener
        newBtn.addEventListener('click', function() {
            const previewWindow = window.open('', '_blank');
            const reportContent = generateExportContent(results);
            previewWindow.document.write(reportContent);
            previewWindow.document.close();
        });
    });

    // Add event listeners for all continue editing buttons
    document.querySelectorAll('#continue-editing-btn, #continue-editing-bottom-btn').forEach(btn => {
        // Remove existing listeners
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        // Add new listener
        newBtn.addEventListener('click', continueEditing);
    });

    showSection('report-section');
}

// Move the export content generation to a separate function
function generateExportContent(results) {
    const course = currentCourses[0];
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Group results by module for organized display
    const moduleGroups = {};
    results.forEach(result => {
        const moduleCode = result.mlo.moduleCode;
        if (!moduleGroups[moduleCode]) {
            moduleGroups[moduleCode] = [];
        }
        moduleGroups[moduleCode].push(result);
    });

    // Define module order
    const moduleOrder = ['ylmlo', 'p1mlo', 'p2mlo', 'e1mlo', 'e2mlo', 'gdmlo'];
    
    return `
        <html>
        <head>
            <title>TVTB ILO Alignment Report - ${course.ainekood}</title>
            <style>
                body { 
                    font-family: Arial, sans-serif;
                    padding: 40px;
                    max-width: 1000px;
                    margin: 0 auto;
                    line-height: 1.6;
                }
                h3 { margin-top: 30px; }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }
                th, td {
                    padding: 12px;
                    border: 1px solid #ddd;
                    text-align: left;
                }
                .module-section {
                    margin-bottom: 30px;
                    page-break-inside: avoid;
                }
                .mlo-list {
                    margin: 20px 0;
                    padding: 20px;
                    background-color: #f8f9fa;
                    border-radius: 4px;
                }
                .mlo-item {
                    margin-bottom: 10px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #eee;
                }
                .mlo-item:last-child {
                    border-bottom: none;
                }
                .print-controls {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: white;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                @media print {
                    .print-controls { display: none; }
                }
            </style>
        </head>
        <body>
            <h1>TVTB ILO Alignment Report</h1>
            <h2>${course.ainekood} - ${course.oppeainenimetusik}</h2>
            <p><strong>Generated:</strong> ${currentDate}</p>
            
            <div class="course-info">
                <h3>Course Information</h3>
                <table>
                    <tr><td><strong>Course Code:</strong></td><td>${course.ainekood}</td></tr>
                    <tr><td><strong>Name (EN):</strong></td><td>${course.oppeainenimetusik}</td></tr>
                    <tr><td><strong>Name (ET):</strong></td><td>${course.oppeainenimetusek}</td></tr>
                    <tr><td><strong>Credits:</strong></td><td>${course.eap} EAP</td></tr>
                </table>
            </div>

            <div class="mlo-info">
                <h3>Module Learning Outcomes</h3>
                ${moduleOrder.map(moduleCode => {
                    const moduleMLOs = currentMLOs.filter(mlo => mlo.moduleCode === moduleCode);
                    if (moduleMLOs.length === 0) return '';
                    
                    return `
                        <div class="mlo-list">
                            <h4>${getModuleFullName(moduleCode)}</h4>
                            ${moduleMLOs.map((mlo, index) => `
                                <div class="mlo-item">
                                    <strong>${moduleCode.toUpperCase()} ${index + 1}:</strong> ${mlo.ilosisu}
                                </div>
                            `).join('')}
                        </div>
                    `;
                }).join('')}
            </div>

            <h3>Alignment Analysis</h3>
            ${moduleOrder.map(moduleCode => {
                if (!moduleGroups[moduleCode]) return '';
                const moduleResults = moduleGroups[moduleCode];
                const moduleMLOs = currentMLOs.filter(mlo => mlo.moduleCode === moduleCode);
                
                return `
                    <div class="module-section">
                        <h4>${getModuleFullName(moduleCode)}</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>CLO</th>
                                    <th>MLO</th>
                                    <th>Score</th>
                                    <th>Justification</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${moduleResults.map(result => {
                                    const mloNumber = moduleMLOs.findIndex(mlo => 
                                        mlo.ilosisu === result.mlo.ilosisu) + 1;
                                    return `
                                        <tr>
                                            <td><strong>CLO ${result.cloIndex + 1}:</strong><br>${result.clo}</td>
                                            <td><strong>${moduleCode.toUpperCase()} ${mloNumber}:</strong><br>${result.mlo.ilosisu}</td>
                                            <td>${result.score}/5</td>
                                            <td>${result.reason}</td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
            }).join('')}

            <div class="print-controls">
                <button onclick="window.print()" style="margin-right: 10px;">Save as PDF/Print</button>
                <button onclick="window.close()">Close Preview</button>
            </div>
        </body>
        </html>
    `;
}

// Add the continue editing function
function continueEditing() {
    // Show the CLO input section
    const cloInputSection = document.getElementById('clo-input');
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden-section');
    });
    cloInputSection.classList.remove('hidden-section');
    
    // Pre-fill the textarea with current CLOs
    const cloTextarea = document.getElementById('clo-textarea');
    const existingCLOs = currentCLOs.map(clo => clo.text || clo).join('\n');
    cloTextarea.value = existingCLOs;
    
    // Update the CLO list display
    const cloList = document.getElementById('clo-list');
    cloList.innerHTML = ''; // Clear existing list
    
    // Re-add each CLO to the display
    currentCLOs.forEach((clo, index) => {
        const cloText = clo.text || clo;
        const cloItem = document.createElement('div');
        cloItem.className = 'clo-item';
        cloItem.innerHTML = `
            <span class="clo-text">${cloText}</span>
            <div class="clo-actions">
                <button onclick="editCLO(${index})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteCLO(${index})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cloList.appendChild(cloItem);
    });
}

// Helper function to get full module names
function getModuleFullName(moduleCode) {
    const moduleNames = {
        'ylmlo': 'General Studies Module - Foundational Competences (YL)',
        'p1mlo': 'First Core Studies Module - P1 Methods, Markets and Economy',
        'p2mlo': 'Second Core Studies Module - P2 Core Business Competences',
        'e1mlo': 'First Special Studies Module - E1 Entrepreneurship and Marketing',
        'e2mlo': 'Second Special Studies Module - E2 Finance and Accounting',
        'gdmlo': 'Graduation Thesis Module (GD)'
    };
    return moduleNames[moduleCode] || moduleCode.toUpperCase();
}

// Truncate text to a certain length
function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
}

// Toggle text display between truncated and full
function toggleText(element, fullText) {
    const parent = element.previousSibling;
    const isTruncated = parent.textContent.endsWith('...');
    if (isTruncated) {
        parent.textContent = fullText;
        element.textContent = 'Show less';
    } else {
        parent.textContent = truncateText(fullText, 50);
        element.textContent = 'Show more';
    }
}

// Show a specific section and hide others
function showSection(sectionId) {
    const keepVisible = ['course-info', 'mlo-display'];
    const homeBtn = document.getElementById('home-btn');
    
    // Show/hide home button based on section
    if (sectionId === 'course-input') {
        homeBtn.style.display = 'none'; // Hide on landing page
    } else {
        homeBtn.style.display = 'block'; // Show on other pages
    }
    
    document.querySelectorAll('section').forEach(section => {
        if (keepVisible.includes(section.id) && !section.classList.contains('hidden-section')) {
            return;
        }
        
        if (section.id === sectionId) {
            section.classList.remove('hidden-section');
            section.classList.add('active-section');
        } else if (!keepVisible.includes(section.id)) {
            section.classList.add('hidden-section');
            section.classList.remove('active-section');
        }
    });
}

// Show error message
function showError(message) {
    alert(message);
}

// Generate improved CLO based on MLO
function generateImprovedCLO(clo, mloText) {
    const mloKeywords = extractKeywords(mloText);
    if (mloKeywords.length > 0) {
        return `Revise the CLO to: "Develop proficiency in ${mloKeywords.join(', ')} and align with the MLO expectations."`;
    }
    return 'Revise the CLO to better align with the MLO themes and learning levels.';
}

// Email report
function emailReport(results) {
    if (confirm('This will open your Outlook. Do you want to continue?')) {
        const course = currentCourses[0];
        const currentDate = new Date().toISOString().split('T')[0];
        
        // Create email subject
        const subject = `TVTB ILO Alignment: ${course.ainekood} ${course.oppeainenimetusik} (${currentDate})`;
        
        // Generate email body with report content
        let body = `TVTB ILO Alignment Report\n`;
        body += `${'-'.repeat(50)}\n\n`;
        
        // Course Information
        body += `Course Information:\n`;
        body += `Code: ${course.ainekood}\n`;
        body += `Name (EN): ${course.oppeainenimetusik}\n`;
        body += `Name (ET): ${course.oppeainenimetusek}\n`;
        body += `Credits: ${course.eap} EAP\n\n`;
        
        // Module Information
        const moduleCodes = [...new Set(currentCourses.map(c => c.moodlikood))];
        body += `Modules: ${moduleCodes.join(', ').toUpperCase()}\n\n`;
        
        // CLOs and Alignments
        body += `Analysis Results:\n${'-'.repeat(20)}\n\n`;
        results.forEach((result, index) => {
            body += `CLO ${result.cloIndex + 1}: ${result.clo}\n`;
            body += `Aligned with ${result.mlo.moduleCode.toUpperCase()}\n`;
            body += `Score: ${result.score}/5\n`;
            body += `Reason: ${result.reason}\n\n`;
        });
        
        body += `\nReport generated on ${currentDate}`;
        
        // Create mailto link with subject and body
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    }
}
