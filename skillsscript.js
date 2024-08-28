document.addEventListener('DOMContentLoaded', () => {
    const addSkillButton = document.getElementById('addSkillButton');
    const addSkillModal = document.querySelector('.modal');
    const closeButton = document.querySelector('.cancel');
    const addSkillForm = document.getElementById('addSkillForm');

    // Open modal when "Add Skill" button is clicked
    addSkillButton.addEventListener('click', () => {
        addSkillModal.style.display = 'flex'; // Show the modal with flex display
    });

    // Close modal when "CANCEL" button is clicked
    closeButton.addEventListener('click', () => {
        addSkillModal.style.display = 'none';
    });

    // Close modal when clicking outside of modal content
    window.addEventListener('click', (event) => {
        if (event.target === addSkillModal) {
            addSkillModal.style.display = 'none';
        }
    });

    // Handle form submission
    addSkillForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const domain = document.getElementById('domain').value;
        const skills = [];

        for (let i = 1; i <= 5; i++) {
            const skillInput = document.querySelector(`input[name="skill${i}"]`);
            const proficiencyInput = document.querySelector(`input[name="proficiency${i}"]`);

            const skill = skillInput.value;
            const proficiency = proficiencyInput.value;

            if (skill) {
                skills.push({ skill: skill, proficiency: proficiency || 0 });
            }
        }

        if (domain && skills.length > 0) {
            let skillCategory = document.getElementById(domain);

            // If domain section doesn't exist, create it
            if (!skillCategory) {
                skillCategory = document.createElement('div');
                skillCategory.className = 'skill-category';
                skillCategory.id = domain;

                const categoryTitle = document.createElement('h3');
                categoryTitle.textContent = domain;
                skillCategory.appendChild(categoryTitle);

                const skillSections = document.querySelector('.skill-sections');
                skillSections.appendChild(skillCategory);
            }

            // Create and append each skill card
            skills.forEach(({ skill, proficiency }) => {
                const skillCard = document.createElement('div');
                skillCard.className = 'skill-card';

                const skillName = document.createElement('p');
                skillName.textContent = skill;
                skillCard.appendChild(skillName);

                const progressBar = document.createElement('div');
                progressBar.className = 'progress-bar';

                const progress = document.createElement('div');
                progress.className = 'progress';
                progress.style.width = `${proficiency}%`;
                progressBar.appendChild(progress);

                skillCard.appendChild(progressBar);

                const skillProficiency = document.createElement('p');
                skillProficiency.textContent = `${proficiency}%`;
                skillCard.appendChild(skillProficiency);

                // Append new skill card to the selected domain
                skillCategory.appendChild(skillCard);
            });

            // Clear form inputs
            addSkillForm.reset();

            // Hide modal after submission
            addSkillModal.style.display = 'none';
        }
    });
});
