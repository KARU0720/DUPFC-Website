document.addEventListener('DOMContentLoaded', function() {

    const personalDetailsForm = document.getElementById('personalDetailsForm');
    const membershipDetailsForm = document.getElementById('membershipDetails');
    const collegeSelect = document.getElementById('college');
    const courseSelect = document.getElementById('course');
    const birthdayMonthInput = document.getElementById('birthday-month');
    const birthdayDayInput = document.getElementById('birthday-day');
    const birthdayYearInput = document.getElementById('birthday-year');
    const roleSelect = document.getElementById('role');
    const positionSelect = document.getElementById('position');
    const membershipForm = document.getElementById('membershipForm');
    const registrationTable = document.getElementById('registrationTable');

    const courses = {
        'CBAA': [
            'Bachelor of Science in Accountancy',
            'Bachelor of Science in Management Accounting',
            'Bachelor of Science in Entrepreneurship with Specialization in Food Entrepreneurship',
            'Bachelor of Science in Entrepreneurship with Specialization in Agripreneurship',
            'Bachelor of Science in Business Administration Major in Business and Operations Management with Specialization Track in Business Analytics',
            'Bachelor of Science in Business Administration Major in Business Economics',
            'Bachelor of Science in Business Administration Major in Human Resource Development with Specialization Track in Business Analytics',
            'Bachelor of Science in Business Administration Major in Marketing Management with Specialization in Business Analytics',
            'Bachelor of Science in Business Administration major in Marketing Management with Specialization in Integrated Marketing Communications'
        ],
        'CCJE': [
            'BS in Criminology',
            'Bachelor of Forensic Science'
        ],
        'COED': [
            'Bachelor of Early Childhood Education',
            'Bachelor of Special Needs Education',
            'Bachelor of Secondary Education',
            'Bachelor of Physical Education',
            'Certificate in Teaching Program',
            'Certificate in Teaching Values Education',
            'Certificate in Sign Language',
            'Certificate in Teaching Early Childhood Learners'
        ],
        'CEAT': [
            'Bachelor of Science in Architecture',
            'Bachelor of Science in Civil Engineering',
            'Bachelor of Science in Computer Engineering',
            'Bachelor of Science in Electrical Engineering',
            'Bachelor of Science in Electronics Engineering',
            'Bachelor of Science in Industrial Engineering',
            'Bachelor of Science in Mechanical Engineering',
            'Bachelor of Science in Sanitary Engineering',
            'Bachelor of Multimedia Arts'
        ],
        'CLAC': [
            'Bachelor of Arts in Communication',
            'Bachelor of Arts in Digital and Multimedia Journalism',
            'Bachelor of Arts in Philosophy',
            'Bachelor of Arts in Political Science',
            'Bachelor of Arts in International Development',
            'Bachelor of Arts in Psychology',
            'Bachelor of Science in Psychology'
        ],
        'CSCS': [
            'Bachelor of Science in Biology with specialization in Medical Biology (3 year compressed program)',
            'Bachelor of Science in Biology with specialization in Medical Biology',
            'Bachelor of Science in Biology with specialization in Microbiology',
            'Bachelor of Science in Biology with specialization in Cell and Molecular Biology',
            'Bachelor of Science in Biology with specialization in Plant Biology',
            'Bachelor of Science in Biology with specialization in Animal Biology',
            'Bachelor of Science in Biology with specialization in Environmental Science',
            'Bachelor of Science in Applied Mathematics',
            'Bachelor of Science in Computer Science',
            'Bachelor of Science in Information Technology'
        ],
        'CTHM': [
            'Bachelor of Science Hospitality Management',
            'Bachelor of Science in Tourism Management'
        ]
    };
    
    const positions = {
        'Executive Board Officer': [
            'Secretary General',
            'Deputy Secretary',
            'Dir. for Public Relations',
            'Dir. for External Affairs',
            'Dir. for Creatives',
            'Dir. for Finance',
            'Dir. for Accounting',
            'Dir. for Audit',
            'Dir. for Outreach Activities',
            'Dir. for Spiritual Activities'
        ],
        'Junior Executive Board Officer': [
            'JO for Secretary General',
            'JO for Deputy Secretary',
            'JO for Public Relations',
            'JO for External Affairs',
            'JO for Creatives',
            'JO for Finance',
            'JO for Accounting',
            'JO for Audit',
            'JO for Outreach Activities',
            'JO for Spiritual Activities'
        ],
        'Committee Officer': [
            'Creatives Committee',
            'Finance Committee',
            'Media Committee',
            'Planning Committee'
        ],
        'Team Manager': [
            'Equipment Manager',
            'Kit Manager'
        ],
        'Player': [
            'With Experience',
            'Former Varsity',
            'Beginner'
        ]
    };

    function populateCourses(college) {
        courseSelect.innerHTML = '<option value="">Select Course</option>';
        if (college && courses[college]) {
            courses[college].forEach(course => {
                const option = document.createElement('option');
                option.textContent = course;
                courseSelect.appendChild(option);
            });
        } else {
            courseSelect.innerHTML = '<option value="">No Courses Available</option>';
        }
    }

    collegeSelect.addEventListener('change', function() {
        populateCourses(this.value);
    });

    function populatePositions(role) {
        positionSelect.innerHTML = '<option value="">Select Position</option>';
        if (role && positions[role]) {
            positions[role].forEach(position => {
                const option = document.createElement('option');
                option.textContent = position;
                positionSelect.appendChild(option);
            });
        } else {
            positionSelect.innerHTML = '<option value="">No Positions Available</option>';
        }
    }

    roleSelect.addEventListener('change', function() {
        populatePositions(this.value);
    });

    function populateTable() {
        const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
        registrationTable.innerHTML = '';
        registrations.forEach(entry => {
            const row = document.createElement('tr');
            const dateAdded = new Date(entry.createdAt).toLocaleString();
            row.innerHTML = `
                <td>${dateAdded}</td>
                <td>${entry.lastname}, ${entry.firstname} ${entry.middlename}</td>
                <td>${entry.status}</td>
                <td>${entry.college}</td>
                <td>${entry.cys}</td>
                <td>${entry.studentNumber}</td>
                <td>${entry.contactNumber}</td>
                <td>${entry.emailAddress}</td>
                <td>${entry.birthday}</td>
                <td>${entry.role}</td>
                <td>${entry.position}</td>
            `;
            registrationTable.appendChild(row);
        });
    }

    populateTable();

    personalDetailsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        sessionStorage.setItem('personalDetails', JSON.stringify({
            lastname: document.getElementById('lastname').value.toUpperCase(),
            firstname: document.getElementById('firstname').value,
            middlename: document.getElementById('middlename').value,
            status: document.querySelector('input[name="status"]:checked').value,
            college: document.getElementById('college').value,
            course: document.getElementById('course').value,
            year: document.getElementById('year').value,
            section: document.getElementById('section').value,
            cys: document.getElementById('cys').value,
            studentNumber: document.getElementById('studentNumber').value,
            contactNumber: document.getElementById('contactNumber').value,
            emailAddress: document.getElementById('emailAddress').value,
            birthday: `${birthdayMonthInput.value} ${birthdayDayInput.value}, ${birthdayYearInput.value}`
        }));
        
        personalDetailsForm.style.display = 'none';
        membershipDetailsForm.style.display = 'block';
    });

    membershipDetailsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const role = roleSelect.value;
        const position = positionSelect.value;
        const personalDetails = JSON.parse(sessionStorage.getItem('personalDetails'));
    
        if (!personalDetails) {
            alert('Personal details not found.');
            return;
        }
    
        const combinedData = { ...personalDetails, role, position, createdAt: new Date() };
        const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
        registrations.push(combinedData);
        localStorage.setItem('registrations', JSON.stringify(registrations));
        
        populateTable();
        window.location.href = 'registration.html';
                // Show the personal details form and hide the membership details form
                personalDetailsForm.style.display = 'block';
                membershipDetailsForm.style.display = 'none';
        
        // Clear session storage and reset the forms
        sessionStorage.removeItem('personalDetails');
        personalDetailsForm.reset();
        membershipDetailsForm.reset();
        

    });
});
