document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const registrationTable = document.getElementById('registrationTable');
    const collegeSelect = document.getElementById('college');
    const courseSelect = document.getElementById('course');

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
            'Bachelor of Science in in Tourism Management'
        ]
    };

    collegeSelect.addEventListener('change', function() {
        const selectedCollege = this.value;
        courseSelect.innerHTML = '<option value="">Select Course</option>';
        if (selectedCollege && courses[selectedCollege]) {
            courses[selectedCollege].forEach(course => {
                const option = document.createElement('option');
                option.textContent = course;
                courseSelect.appendChild(option);
            });
        }
    });

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const lastname = document.getElementById('lastname').value;
        const firstname = document.getElementById('firstname').value;
        const middlename = document.getElementById('middlename').value;
        const status = document.querySelector('input[name="status"]:checked').value;
        const college = collegeSelect.value;
        const course = courseSelect.value;
        const year = document.getElementById('year').value;
        const section = document.getElementById('section').value;
        const cys = document.getElementById('cys').value;
        const studentNumber = document.getElementById('studentNumber').value;
        const contactNumber = document.getElementById('contactNumber').value;
        const emailAddress = document.getElementById('emailAddress').value;

        // Validate email address
        if (!emailAddress.endsWith('@dlsud.edu.ph')) {
            alert('Please enter a valid DLSU-D email address.');
            return;
        }

        // Validate student number format
        const studentNumberRegex = /^\d{4}-\d{5}$/;
        if (!studentNumberRegex.test(studentNumber)) {
            alert('Please enter a valid student number in the format YYYY-XXXXX.');
            return;
        }

        // Validate contact number format
        const contactNumberRegex = /^09\d{2} \d{3} \d{4}$/;
        if (!contactNumberRegex.test(contactNumber)) {
            alert('Please enter a valid contact number in the format 09XX XXX XXXX.');
            return;
        }

        const fullName = `${lastname}, ${firstname} ${middlename}`;
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${fullName}</td>
            <td>${status}</td>
            <td>${college}</td>
            <td>${cys}</td>
            <td>${studentNumber}</td>
            <td>${contactNumber}</td>
            <td>${emailAddress}</td>
        `;
        registrationTable.appendChild(newRow);

        registrationForm.reset();
    });
});
