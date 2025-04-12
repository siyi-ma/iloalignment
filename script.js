// Global variables to store data
let courseData = [];
let mloData = [];
let currentCourses = [];
let currentMLOs = [];
let currentCLOs = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadCSVData();
    setupEventListeners();
    console.log('Application initialized'); // Debug log
});

// Load CSV data directly from embedded strings
async function loadCSVData() {
    try {
        // Embedded course data (ainemoodle.csv content)
        const courseText = `ainekood;oppeainenimetusek;oppeainenimetusik;eap;moodlikood
EKX0040;Sissejuhatus ringmajandusse;Introduction to Circular Economy;3;e1mlo
EKX0040;Sissejuhatus ringmajandusse;Introduction to Circular Economy;3;e2mlo
HHF3081;Filosoofia;Philosophy;3;ylmlo
HOL6010;Euroopa Liidu igus;European Union Law;6;e1mlo
HOL6010;Euroopa Liidu igus;European Union Law;6;e2mlo
IDK0043;IT alused I;IT Foundations I;3;ylmlo
IDK0044;IT alused II;IT Foundations II;3;ylmlo
MEF3010;Finantsmodelleerimine;Financial Modelling;6;e1mlo
MEF3010;Finantsmodelleerimine;Financial Modelling;6;e2mlo
MEF3020;Eraisiku rahandus;Personal Finance;3;ylmlo
MEF3030;Bakalaureuseseminar;Bachelor Seminar;3;e2mlo
MEM3010;Matemaatika tienduspe rikorralduse lipilastele;Refresher Course in Mathematics for Business Students;3;ylmlo
MEM3020;Majandusmatemaatika alused;Fundamentals of Business Mathematics;6;p1mlo
MMA3090;ritarkvara ja arvestuse infossteemid;Business Software Solutions;6;e1mlo
MMA3090;ritarkvara ja arvestuse infossteemid;Business Software Solutions;6;e2mlo
MMA3100;rianaltika alused;Business Analytics;6;e1mlo
MMA3100;rianaltika alused;Business Analytics;6;e2mlo
MMA3110;Finantsarvestuse keskkursus;Intermediate Financial Accounting;6;e1mlo
MMA3110;Finantsarvestuse keskkursus;Intermediate Financial Accounting;6;e2mlo
MMA3160;Juhtimis- ja kuluarvestus;Management and Cost Accounting;6;e1mlo
MMA3160;Juhtimis- ja kuluarvestus;Management and Cost Accounting;6;e2mlo
MME3010;Keskkonna ja sstva arengu konoomika;Environmental and Sustainable Development Economics;6;p1mlo
MMJ3040;Rahvusvaheline ri ja eetika;International Business and Ethics;6;p2mlo
MMJ3050;Loovus ja innovatsioon;Creativity and innovation;6;e1mlo
MMJ3050;Loovus ja innovatsioon;Creativity and innovation;6;e2mlo
MMJ3070;Tpraktika;Internship;6;e1mlo
MMJ3070;Tpraktika;Internship;6;e2mlo
MMK3100;Tootmise juhtimine ja arengutrendid;Operations Management and Development Trends;6;e1mlo
MMK3100;Tootmise juhtimine ja arengutrendid;Operations Management and Development Trends;6;e2mlo
MMM3020;Bakalaureuseseminar;Bachelor Seminar;3;e1mlo
MMM3040;Turundusuuring;Marketing Research;6;e1mlo
MMM3040;Turundusuuring;Marketing Research;6;e2mlo
MMM3070;Turunduskommunikatsioon ja tarbijakitumine;Marketing Communication and Consumer Behaviour;6;e1mlo
MMO3030;Juhtimine ja eestvedamine;Management and Leadership;6;p2mlo
MMO3050;Rahvusvaheline inimeste juhtimine;International People Management;6;e1mlo
MMO3050;Rahvusvaheline inimeste juhtimine;International People Management;6;e2mlo
MMO3070;Teadmusjuhtimine;Knowledge Management;6;e1mlo
MMO3070;Teadmusjuhtimine;Knowledge Management;6;e2mlo
MMS3030;Majandussotsioloogia;Economic sociology;6;e1mlo
MMS3030;Majandussotsioloogia;Economic sociology;6;e2mlo
MMS3050;riuuringute alused;Research Methods in Business Studies;6;p2mlo
MOE5071;riiguse alused;Business Law;6;p2mlo
TAF2810;Finantsarvestuse alused;Principles of Financial Accounting;6;p2mlo
TER2550;Rahanduse alused;Basic Finance;6;p2mlo
TER2560;Raha, finantsinstitutsioonid ja turud;Money;6;e1mlo
TER2560;Raha, finantsinstitutsioonid ja turud;Money;6;e2mlo
TER2620;Finantsjuhtimine;Financial Management;6;e1mlo
TER2620;Finantsjuhtimine;Financial Management;6;e2mlo
TES0020;Statistika;Statistics;6;p1mlo
TES1140;konomeetria;Econometrics;6;e1mlo
TES1140;konomeetria;Econometrics;6;e2mlo
TET0010;Mikrokonoomika I;Microeconomics I;6;p1mlo
TET2550;Makrokonoomika I;Macroeconomics I;6;p1mlo
TMJ0140;Ettevtluse alused;Introduction to Entrepreneurship;6;p2mlo
TMJ0190;Start-up ettevtlus;Start-up Entrepreneurship;6;e1mlo
TMJ0190;Start-up ettevtlus;Start-up Entrepreneurship;6;e2mlo
TMJ0230;rilogistika ja varude juhtimine;Logistics and Inventory Management;6;p2mlo
TMM2150;Turundus;Basic Marketing;6;p2mlo
TMM2420;Turunduse juhtimine;Marketing Management;6;e1mlo
TMM2420;Turunduse juhtimine;Marketing Management;6;e2mlo
TMM2470;E-turundus;E-marketing;6;e1mlo
TMM2470;E-turundus;E-marketing;6;e2mlo
TMT2020;Tkeskkond ja ergonoomika;Working Environment and Ergonomics;6;ylmlo
TSK0028;Majandusalane inglise keel II;Business English II;6;ylmlo
TSK0326;Majandusalane inglise keel I;Business English I;6;ylmlo
TSP0073;Rahvusvahelised suhted kaasajal;Contemporary International Relations;6;ylmlo
UTT0120;Probleem- ja projektpe;Problem- and Project Based Learning;6;e1mlo
UTT0120;Probleem- ja projektpe;Problem- and Project Based Learning;6;e2mlo
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
        mloData = parseCSV(mloText);
        
        console.log('Data loaded successfully');
        document.getElementById('search-btn').disabled = false;
        
        // Populate the course code datalist for autocomplete
        populateCourseCodeDatalist();
    } catch (error) {
        console.error('Error loading data:', error);
        showError('Failed to load data: ' + error.message);
    }
}

// Populate the datalist with unique course codes for autocomplete
function populateCourseCodeDatalist() {
    const courseCodesDatalist = document.getElementById('course-codes-list');
    
    if (courseCodesDatalist) {
        // Clear existing options
        courseCodesDatalist.innerHTML = '';
        
        // Get unique course codes
        const uniqueCourseCodes = [...new Set(courseData.map(course => course.ainekood))];
        
        // Sort alphabetically
        uniqueCourseCodes.sort();
        
        // Add options to datalist
        uniqueCourseCodes.forEach(code => {
            // Find the course to get its name
            const course = courseData.find(c => c.ainekood === code);
            const optionElement = document.createElement('option');
            optionElement.value = code;
            // Add the course name as the label if available
            if (course && course.oppeainenimetusik) {
                optionElement.text = `${code} - ${course.oppeainenimetusik}`;
            }
            courseCodesDatalist.appendChild(optionElement);
        });
        
        console.log(`Populated autocomplete with ${uniqueCourseCodes.length} course codes`);
    } else {
        console.error('Course codes datalist element not found');
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
    const buttons = {
        'search-btn': searchCourse,
        'home-btn': resetToSearch,
        'new-course-btn': resetToSearch,
        'suggest-clo-btn': suggestCLOs,
        'input-clo-btn': showCLOInput,
        'add-clo-btn': addCLO,
        'use-suggestions-btn': useSuggestions,
        'modify-suggestions-btn': modifySuggestions,
        'analyze-btn': performAnalysis,
        'export-report-btn': exportReport
    };

    // Add event listeners for all buttons
    Object.entries(buttons).forEach(([id, handler]) => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', handler);
            console.log(`Event listener added for ${id}`); // Debug log
        } else {
            console.error(`Element not found: ${id}`); // Debug log
        }
    });

    // Course code input enter key and input events
    const courseCodeInput = document.getElementById('course-code');
    if (courseCodeInput) {
        // Enter key to trigger search
        courseCodeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchCourse();
            }
        });
        
        // Input event for real-time validation
        courseCodeInput.addEventListener('input', function() {
            const value = this.value.trim().toUpperCase();
            
            // Update the validation message in real-time
            const validationMessage = document.getElementById('validation-message');
            if (value && !isValidCourseCode(value) && value.length === 7) {
                validationMessage.textContent = 'Invalid course code. Please enter 3 letters followed by 4 digits (e.g., EKX0040).';
            } else {
                validationMessage.textContent = '';
            }
            
            // Enable or disable search button based on input
            const searchBtn = document.getElementById('search-btn');
            if (searchBtn) {
                searchBtn.disabled = !value;
            }
        });
    }
}

// Update the performAnalysis function
function performAnalysis() {
    console.log('performAnalysis called'); // Debug log

    // Validate prerequisites
    if (!currentCLOs || currentCLOs.length === 0) {
        alert('Please add at least one Course Learning Outcome.');
        console.log('Analysis stopped: No CLOs found'); // Debug log
        return;
    }

    if (!currentMLOs || currentMLOs.length === 0) {
        alert('No Module Learning Outcomes available for analysis.');
        console.log('Analysis stopped: No MLOs found'); // Debug log
        return;
    }

    try {
        // Perform the analysis
        const analysisResults = analyzeAlignment();
        console.log('Analysis completed', analysisResults); // Debug log

        // Display results
        displayAnalysisResults(analysisResults);
        
        // Show analysis section
        showSection('alignment-analysis');
        
        // Generate and display report
        generateReport(analysisResults);

        // Enable export button
        const exportBtn = document.getElementById('export-report-btn');
        if (exportBtn) {
            exportBtn.disabled = false;
        }
    } catch (error) {
        console.error('Error in analysis:', error); // Debug log
        showError('An error occurred during analysis. Please try again.');
    }
}

// Search for a course by code
function searchCourse() {
    const courseCodeInput = document.getElementById('course-code');
    
    // Get the value directly from the input field
    let courseCode = '';
    if (courseCodeInput && courseCodeInput.value) {
        courseCode = courseCodeInput.value.trim().toUpperCase();
    }
    
    const validationMessage = document.getElementById('validation-message');
    
    console.log("Searching for course code:", courseCode);
    
    // Check if the course code is empty
    if (!courseCode) {
        validationMessage.textContent = 'Please enter a course code.';
        return;
    }
    
    // Validate course code format (3 letters followed by 4 digits)
    if (!isValidCourseCode(courseCode)) {
        validationMessage.textContent = 'Invalid course code. Please enter 3 letters followed by 4 digits (e.g., EKX0040).';
        return;
    }
    
    // Find course in data
    const foundCourses = courseData.filter(course => course.ainekood === courseCode);
    
    if (foundCourses.length === 0) {
        validationMessage.textContent = 'Course not found. Please check the course code and try again.';
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
    
    // Get module names for each module code
    const moduleInfos = moduleCodes.map(code => {
        const moduleMLO = mloData.find(mlo => mlo.moodlikood === code);
        if (moduleMLO) {
            // Extract module name from oisnimetus
            const fullName = moduleMLO.oisnimetus;
            // Find the module code in the oisnimetus (e.g., "E1", "P2")
            const codeMatch = code.match(/([a-z]+)(\d*)/i);
            if (codeMatch && codeMatch.length > 2) {
                const shortCode = codeMatch[1].toUpperCase() + codeMatch[2];
                // Try to extract the module name after the short code
                const nameMatch = fullName.match(new RegExp(`${shortCode}\\s+([\\w\\s&-]+)`));
                if (nameMatch && nameMatch.length > 1) {
                    return {
                        code: shortCode,
                        name: nameMatch[1].trim(),
                        fullName: fullName
                    };
                }
                return {
                    code: shortCode,
                    name: fullName,
                    fullName: fullName
                };
            }
            return {
                code: code,
                name: fullName,
                fullName: fullName
            };
        }
        return {
            code: code,
            name: code,
            fullName: code
        };
    });
    
    // Create HTML for module codes and names
    const moduleCodeElement = document.getElementById('module-code');
    moduleCodeElement.innerHTML = '';
    
    // If there's only one module, display it as text
    if (moduleInfos.length === 1) {
        moduleCodeElement.textContent = `${moduleInfos[0].code} - ${moduleInfos[0].name}`;
    } else {
        // If there are multiple modules, display each on a new line
        moduleInfos.forEach(moduleInfo => {
            const moduleDiv = document.createElement('div');
            moduleDiv.className = 'module-info-item';
            moduleDiv.textContent = `${moduleInfo.code} - ${moduleInfo.name}`;
            moduleCodeElement.appendChild(moduleDiv);
        });
    }
    
    // Show course info section
    showSection('course-info');
    
    // Show options panel
    showSection('options-panel');
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
    
    // Create a section for each module
    Object.keys(moduleGroups).forEach(moduleCode => {
        const moduleMLOs = moduleGroups[moduleCode];
        
        // Get module name from the first MLO's oisnimetus
        const moduleName = moduleMLOs[0].oisnimetus;
        
        // Extract short module code (e.g., "E1", "P2")
        const codeMatch = moduleCode.match(/([a-z]+)(\d*)/i);
        let shortModuleCode = moduleCode.toUpperCase();
        if (codeMatch && codeMatch.length > 2) {
            shortModuleCode = codeMatch[1].toUpperCase() + codeMatch[2];
        }
        
        // Create module section
        const moduleSection = document.createElement('div');
        moduleSection.className = 'module-section';
        
        // Add module header with the full name from oisnimetus
        const moduleHeader = document.createElement('div');
        moduleHeader.className = 'module-header';
        moduleHeader.innerHTML = `<h3>${moduleName}</h3>`;
        moduleSection.appendChild(moduleHeader);
        
        // Add MLOs for this module
        moduleMLOs.forEach((mlo, index) => {
            const mloItem = document.createElement('div');
            mloItem.className = 'mlo-item';
            
            // Remove quotation marks from MLO text
            let mloText = mlo.ilosisu;
            if (mloText.startsWith('"') && mloText.endsWith('"')) {
                mloText = mloText.substring(1, mloText.length - 1);
            }
            
            mloItem.innerHTML = `
                <h4>${shortModuleCode} MLO ${index + 1}</h4>
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
    // Clear current courses and MLOs
    currentCourses = [];
    currentMLOs = [];
    currentCLOs = [];
    
    // Clear course code input
    document.getElementById('course-code').value = '';
    document.getElementById('validation-message').textContent = '';
    
    // Hide all sections except course input
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden-section');
        section.classList.remove('active-section');
    });
    
    // Show course input section
    document.getElementById('course-input').classList.remove('hidden-section');
    document.getElementById('course-input').classList.add('active-section');
}

// Show CLO input section
function showCLOInput() {
    // Clear existing CLOs
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
        return;
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
            <button class="remove-clo" onclick="removeCLO(${index - 1})"><i class="fas fa-trash"></i></button>
        </div>
    `;
    
    cloList.appendChild(cloItem);
}

// Remove a CLO from the list
function removeCLO(index) {
    // Remove from array
    currentCLOs.splice(index, 1);
    
    // Refresh display
    const cloList = document.getElementById('clo-list');
    cloList.innerHTML = '';
    
    // Rebuild display
    currentCLOs.forEach(clo => {
        addCLOToDisplay(clo);
    });
}

// Show a specific section and hide others
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden-section');
        section.classList.remove('active-section');
    });
    
    // Show the requested section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden-section');
        targetSection.classList.add('active-section');
    }
}

// Show error message
function showError(message) {
    alert(message);
    console.error(message);
}

// Suggest CLOs based on MLOs
function suggestCLOs() {
    console.log('Suggesting CLOs...');
    
    // Validate prerequisites
    if (!currentMLOs || currentMLOs.length === 0) {
        showError('No Module Learning Outcomes available for suggestions.');
        return;
    }
    
    // In a real app, this would call an API or AI to generate suggestions
    // For now, we'll create dummy suggestions
    const suggestions = [
        `Understand key concepts of ${currentCourses[0].oppeainenimetusik}`,
        `Apply theoretical knowledge to solve problems related to ${currentCourses[0].oppeainenimetusik}`,
        `Analyze and evaluate challenges in the field of ${currentCourses[0].oppeainenimetusik}`,
        `Design and implement solutions using methods from ${currentCourses[0].oppeainenimetusik}`
    ];
    
    // Display suggestions
    const suggestionsContainer = document.getElementById('suggestions-container');
    suggestionsContainer.innerHTML = '';
    
    suggestions.forEach((suggestion, index) => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.innerHTML = `
            <input type="checkbox" id="suggestion-${index}" class="suggestion-checkbox" checked>
            <label for="suggestion-${index}">${suggestion}</label>
        `;
        suggestionsContainer.appendChild(suggestionItem);
    });
    
    // Show suggestions section
    showSection('clo-suggestions');
}

// Use the suggested CLOs
function useSuggestions() {
    console.log('Using suggestions...');
    
    // Clear existing CLOs
    currentCLOs = [];
    
    // Get all checked suggestions
    const checkboxes = document.querySelectorAll('.suggestion-checkbox:checked');
    const suggestions = Array.from(checkboxes).map(checkbox => {
        return checkbox.nextElementSibling.textContent;
    });
    
    // Add as CLOs
    currentCLOs = [...suggestions];
    
    // Show CLO input section with the suggestions
    showCLOInput();
    
    // Display the CLOs
    suggestions.forEach(suggestion => {
        addCLOToDisplay(suggestion);
    });
}

// Modify suggestions
function modifySuggestions() {
    console.log('Modifying suggestions...');
    
    // Get all checked suggestions
    const checkboxes = document.querySelectorAll('.suggestion-checkbox:checked');
    const suggestions = Array.from(checkboxes).map(checkbox => {
        return checkbox.nextElementSibling.textContent;
    }).join('\n');
    
    // Show CLO input with suggestions in textarea
    showCLOInput();
    document.getElementById('clo-textarea').value = suggestions;
}

// Analyze alignment between CLOs and MLOs
function analyzeAlignment() {
    console.log('Analyzing alignment...');
    
    // In a real app, this would use AI or algorithms to analyze alignment
    // For now, we'll create dummy analysis results
    const results = [];
    
    currentCLOs.forEach((clo, cloIndex) => {
        // For each CLO, find a sample of related MLOs
        const relatedMLOs = currentMLOs.slice(0, Math.min(2, currentMLOs.length));
        
        relatedMLOs.forEach((mlo, mloIndex) => {
            // Generate a sample score between 1-5
            const score = Math.floor(Math.random() * 5) + 1;
            
            results.push({
                clo: clo,
                cloIndex: cloIndex,
                mlo: mlo.ilosisu.replace(/"/g, ''),
                mloIndex: mloIndex,
                score: score,
                reason: `The CLO ${score < 3 ? 'somewhat addresses' : 'strongly aligns with'} this MLO.`,
                suggestion: score < 3 ? `Consider modifying the CLO to better align with this MLO by using action verbs and focusing on measurable outcomes.` : ''
            });
        });
    });
    
    return results;
}

// Display analysis results
function displayAnalysisResults(results) {
    console.log('Displaying analysis results...');
    
    const analysisContainer = document.getElementById('analysis-container');
    analysisContainer.innerHTML = '';
    
    if (results.length === 0) {
        analysisContainer.innerHTML = '<p>No alignment analysis results available.</p>';
        return;
    }
    
    results.forEach(result => {
        const alignmentItem = document.createElement('div');
        alignmentItem.className = 'alignment-item';
        
        alignmentItem.innerHTML = `
            <div class="alignment-header">
                <div class="alignment-title">CLO ${result.cloIndex + 1} → MLO Alignment</div>
                <div class="alignment-score score-${result.score}">${result.score}/5</div>
            </div>
            <div class="alignment-details">
                <div class="alignment-clo">
                    <strong>Course Learning Outcome:</strong>
                    <p>${result.clo}</p>
                </div>
                <div class="alignment-mlo">
                    <strong>Module Learning Outcome:</strong>
                    <p>${result.mlo}</p>
                </div>
                <div class="alignment-reason">
                    <strong>Analysis:</strong>
                    <p>${result.reason}</p>
                </div>
                ${result.suggestion ? `
                <div class="alignment-suggestion">
                    <strong>Suggestion:</strong>
                    <p>${result.suggestion}</p>
                </div>
                ` : ''}
            </div>
        `;
        
        analysisContainer.appendChild(alignmentItem);
    });
}

// Generate a report based on analysis results
function generateReport(results) {
    console.log('Generating report...');
    
    const reportContainer = document.getElementById('report-container');
    reportContainer.innerHTML = '';
    
    // Course info section
    const course = currentCourses[0];
    
    const reportHeader = document.createElement('div');
    reportHeader.className = 'report-header';
    reportHeader.innerHTML = `
        <h3>Alignment Report for ${course.ainekood}: ${course.oppeainenimetusik}</h3>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
    `;
    
    // Summary section
    const summaryCounts = {};
    results.forEach(result => {
        if (!summaryCounts[result.score]) {
            summaryCounts[result.score] = 0;
        }
        summaryCounts[result.score]++;
    });
    
    const summarySection = document.createElement('div');
    summarySection.className = 'report-section';
    summarySection.innerHTML = `
        <h4>Summary</h4>
        <p>Total alignments analyzed: ${results.length}</p>
        <p>Average alignment score: ${(results.reduce((total, r) => total + r.score, 0) / results.length).toFixed(1)}/5</p>
        <table class="report-table">
            <tr>
                <th>Alignment Score</th>
                <th>Count</th>
                <th>Percentage</th>
            </tr>
            ${[5, 4, 3, 2, 1].map(score => `
                <tr>
                    <td>${score}/5</td>
                    <td>${summaryCounts[score] || 0}</td>
                    <td>${Math.round(((summaryCounts[score] || 0) / results.length) * 100)}%</td>
                </tr>
            `).join('')}
        </table>
    `;
    
    // Details section
    const detailsSection = document.createElement('div');
    detailsSection.className = 'report-section';
    detailsSection.innerHTML = `
        <h4>Alignment Details</h4>
        <table class="report-table">
            <tr>
                <th>CLO</th>
                <th>MLO</th>
                <th>Score</th>
                <th>Analysis</th>
            </tr>
            ${results.map(result => `
                <tr>
                    <td>${result.clo}</td>
                    <td>${result.mlo}</td>
                    <td class="score-${result.score}">${result.score}/5</td>
                    <td>${result.reason} ${result.suggestion ? `<br><em>${result.suggestion}</em>` : ''}</td>
                </tr>
            `).join('')}
        </table>
    `;
    
    // Append all sections
    reportContainer.appendChild(reportHeader);
    reportContainer.appendChild(summarySection);
    reportContainer.appendChild(detailsSection);
    
    // Show report section
    showSection('report-section');
}

// Export the report
function exportReport() {
    console.log('Exporting report...');
    
    // In a real app, this would generate a PDF or document
    alert('Report exported successfully! (This is a placeholder - in a real app, this would download a PDF)');
}
