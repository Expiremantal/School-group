import React, { useState, useEffect } from 'react';
import styles from './styles/Resume.module.css'; // CSS module

const Resumes = () => {
    const [resumes, setResumes] = useState([]);
    const [filteredResumes, setFilteredResumes] = useState([]);
    const [filter, setFilter] = useState('');
    const [criteria, setCriteria] = useState('');

    // Available options for different filters
    const filterOptions = {
        "Availability": ["1 month", "2 months", "2 weeks", "7 days", "Immediate", "More than 2 months"],
        "Citizenship": ["South African", "Non South African", "Non South African with a Work Permit", "Non South African without a Work Permit"],
       "Country": [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Brazzaville)",
    "Congo (Kinshasa)",
    "Costa Rica",
    "Côte d'Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "North Korea",
    "South Korea",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste (East Timor)",  "Togo", "Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
],
        "Current Salary": ["0-50k", "50-100k", "100-150k", "150-200k", "200-250k", "250-300k", "300k+"],
        "Desired Salary": ["0-50k", "50-100k", "100-150k", "150-200k", "200-250k", "250-300k", "300k+"],
        "Disabled": ["Yes", "No"],
        "Highest Education Level": ["Accreditation", "Bachelors", "Certificate", "Diploma", "Doctorate", "Honors", "Masters", "Matric", "N1", "N2", "N3", "N4", "N5", "N6", "Post Graduate Diploma", "Recognition of Prior Learning"],
        "Ethnicity": ["African", "Asian", "Coloured", "Indian", "Other", "White"],
        "Gender": ["Male", "Female"],
        "Has Valid Driver's License": ["Yes", "No"],
        "Has Own Transport": ["Yes", "No"],
        "Is Employee": ["Yes", "No"],
        "Willing to Relocate": ["Yes Internationally", "Yes Within Country", "No"],
        "Work Experience": ["Less than 1 Year", "1-3 Years", "3-5 Years", "5+ Years"], // Add more as needed
    };

    useEffect(() => {
        fetch('http://localhost:8000/api/v1/resumes')
            .then(res => res.json())
            .then(data => {
                setResumes(data);
                setFilteredResumes(data); // Set default filtered data
            })
            .catch(err => console.error('Error fetching resumes:', err));
    }, []);

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
        setCriteria(''); // Reset criteria when filter changes
    };

    const handleCriteriaChange = (e) => {
        const value = e.target.value;
        setCriteria(value);
    };

    const applyFilter = () => {
        const filtered = resumes.filter((resume) => {
            console.log(`Checking resume:`, resume); // Log each resume item
            
            if (!criteria) return true; // Include all if no criteria
            
            // Check each field with added logging
            if (filter === "Desired Salary") {
                console.log(`Comparing desired salary: ${resume.desired_salary} === ${criteria}`);
                return resume.desired_salary === criteria;
            }
            if (filter === "Ethnicity") {
                console.log(`Comparing ethnicity: ${resume.ethnicity} === ${criteria}`);
                return resume.ethnicity === criteria;
            }
            
            // Add similar checks for other filters
            return true;
        });
    
        console.log(`Filtered Resumes:`, filtered); // Log result of filtering
        setFilteredResumes(filtered);
    };
    
    

    return (
        <div className={styles.resumePageContainer}>
            {/* Search and Filter Section */}
            <div className={styles.resumeFilterSection}>
                <h2>Filter Resumes</h2>
                <div className={styles.resumeFlex}>
                    <div>
                        <label htmlFor="filter">Select a Filter:</label>
                        <select id="filter" value={filter} onChange={handleFilterChange}>
                            <option value="">Select...</option>
                            {Object.keys(filterOptions).map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="criteria">Select a Field:</label>
                        <select id="criteria" value={criteria} onChange={handleCriteriaChange} disabled={!filter}>
                            <option value="">Select...</option>
                            {filter && filterOptions[filter].map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    <button className={styles.resumeButton} onClick={applyFilter}>Apply</button>
                    <button className={styles.resumeButton} onClick={() => {
                        setFilteredResumes(resumes);
                        setFilter('');
                        setCriteria('');
                    }}>Reset Filters</button>
                </div>
            </div>

            {/* Resume List */}
            <div>
                <h2>Resumes</h2>
                {filteredResumes.length > 0 ? (
                    filteredResumes.map((resume, index) => (
                        <div key={index} className={styles.resumeContactBox}>
                            <div className={styles.resumeFlex}>
                                <div>
                                    <h3><b>{resume.name}</b></h3>
                                    <div className={styles.resumeFlex}>
                                        <div className={styles.resumePrimary}>
                                            <i className="fa fa-envelope"></i>
                                            <a href={`mailto:${resume.email}`}>{resume.email}</a>
                                        </div>
                                        |
                                        <div className={styles.resumePrimary}>
                                            <i className="fa fa-phone"></i>
                                            <a href={`tel:${resume.work_number}`}>{resume.work_number}</a>
                                        </div>
                                        |
                                        <div className={styles.resumePrimary}>
                                            <i className="fa fa-phone"></i>
                                            <a href={`tel:${resume.cell_number}`}>{resume.cell_number}</a>
                                        </div>
                                        |
                                        <i className="fa fa-location-dot"></i>
                                        <a href="#">{resume.applying_from}</a>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.resumeFlex}>
                                <div><b>Job Title: </b>{resume.job_title_applied_for}</div>
                                <div><b>Citizenship: </b>{resume.is_sa_citizen ? "Yes" : "No"}</div>
                                <div><b>ID Number: </b>{resume.id_number}</div>
                                <div><b>Passport Number: </b>{resume.passport_number}</div>
                                <div><b>Birth Date: </b>{resume.date_of_birth}</div>
                            </div>

                            <div className={styles.resumeFlex}>
                                <div className={styles.resumePrimary}>
                                    <button onClick={() => window.open(`http://localhost:3000/files/${resume.cv_file_path}`, '_blank')}>View</button>
                                    <a href={`http://localhost:3000/files/${resume.cv_file_path}`} download>Download</a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No resumes found</p>
                )}
            </div>
        </div>
    );
};

export default Resumes;
