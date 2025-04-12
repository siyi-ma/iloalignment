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
    
    // Group results by module
    const moduleGroups = {};
    results.forEach(result => {
        const moduleCode = result.mloIndex + 1; // Use MLO index as module identifier
        if (!moduleGroups[moduleCode]) {
            moduleGroups[moduleCode] = [];
        }
        moduleGroups[moduleCode].push(result);
    });
    
    // Details section
    const detailsSection = document.createElement('div');
    detailsSection.className = 'report-section';
    detailsSection.innerHTML = `<h4>Alignment Details</h4>`;
    
    Object.keys(moduleGroups).forEach(moduleCode => {
        const moduleResults = moduleGroups[moduleCode];
        const moduleName = currentMLOs.find(mlo => mlo.moduleCode === moduleCode)?.oisnimetus || `Module ${moduleCode}`;
        
        const moduleTable = `
            <h5>${moduleName}</h5>
            <table class="report-table">
                <tr>
                    <th>CLO</th>
                    <th>MLO</th>
                    <th>Score</th>
                    <th>Adjustment</th>
                </tr>
                ${moduleResults.map(result => `
                    <tr>
                        <td>CLO ${result.cloIndex + 1}: ${result.clo}</td>
                        <td>MLO ${result.mloIndex + 1}: ${result.mlo}</td>
                        <td class="score-${result.score}">${result.score}/5</td>
                        <td>${result.score < 3 ? 'Consider revising the CLO to better align with this MLO.' : 'No adjustment needed.'}</td>
                    </tr>
                `).join('')}
            </table>
        `;
        detailsSection.innerHTML += moduleTable;
    });
    
    // Improved versions for low scores
    const lowScoreResults = results.filter(result => result.score < 3);
    if (lowScoreResults.length > 0) {
        const improvementSection = `
            <h4>Improved Versions for Low Scores</h4>
            <ul>
                ${lowScoreResults.map(result => `
                    <li>
                        <strong>CLO ${result.cloIndex + 1}:</strong> ${result.clo}<br>
                        <strong>Suggested Improvement:</strong> ${result.suggestion || 'Consider making the CLO more specific and measurable.'}
                    </li>
                `).join('')}
            </ul>
        `;
        detailsSection.innerHTML += improvementSection;
    }
    
    // Append all sections
    reportContainer.appendChild(reportHeader);
    reportContainer.appendChild(summarySection);
    reportContainer.appendChild(detailsSection);
    
    // Show report section
    showSection('report-section');
}
