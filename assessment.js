let currentArchetype = null;

const archetypes = {
    'presence': {
        name: 'Expert Ghost',
        subtitle: 'Invisible Excellence',
        quote: 'You\'re like a lighthouse with no beam - your expertise never reaches those who need what you offer.',
        description: 'You\'ve built something strategically valuable with great systems and clear positioning, but nobody knows you exist. You perfect before you promote, and your success is invisible.',
        nextSteps: 'Focus on building consistent market presence. Start sharing your expertise through content, join industry conversations, and make your valuable work visible to those who need it most.'
    },
    'systems': {
        name: 'Brilliant Chaos',
        subtitle: 'Overwhelming Success',
        quote: 'Like an enigmatic artist, you treat every task as a unique creation rather than a repeatable process.',
        description: 'You have clear positioning and strong market presence, but everything depends on you personally. Success creates stress because you handle everything yourself.',
        nextSteps: 'Invest in building robust systems and processes. Document your methodologies, create repeatable workflows, and build a team that can deliver quality without your constant involvement.'
    },
    'positioning': {
        name: 'Swiss Army Knife',
        subtitle: 'Versatile but Unfocused',
        quote: 'Like water flowing downstream, you take the path of least resistance and have no control over where you end up.',
        description: 'You\'re well-organised with good systems and presence, but you take on any opportunity. You compete on price because you can\'t show what makes you different.',
        nextSteps: 'Develop distinctive positioning that makes you the obvious choice for specific clients. Stop being everything to everyone and start owning your unique space in the market.'
    },
    'growth': {
        name: 'Busy Trap',
        subtitle: 'Sophisticated Standstill',
        quote: 'Like a master chef making the same intricate dish every night - people recognise your value, but you\'re not building anything beyond personal income.',
        description: 'You have functional systems, distinctive positioning, and consistent presence, but you\'re creating an expensive job rather than building enterprise value.',
        nextSteps: 'Focus on intentional growth that builds lasting value. Develop proprietary assets, create scalable methodologies, and make strategic decisions that compound over time.'
    }
};

// Track answers and enable button
document.addEventListener('change', function(e) {
    if (e.target.type === 'radio') {
        // Update visual selection
        document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
        e.target.closest('.option').classList.add('selected');
        
        // Check if all questions answered
        checkAllAnswered();
    }
});

function checkAllAnswered() {
    const questions = ['challenge', 'discovery', 'description', 'metaphor'];
    const answered = questions.every(q => document.querySelector(`input[name="${q}"]:checked`));
    
    const btn = document.getElementById('calculateBtn');
    if (answered) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
}

function calculateArchetype() {
    if (!document.getElementById('calculateBtn').classList.contains('active')) return;
    
    // Count votes for each archetype
    const votes = { presence: 0, systems: 0, positioning: 0, growth: 0 };
    
    document.querySelectorAll('input[type="radio"]:checked').forEach(input => {
        votes[input.value]++;
    });
    
    // Find the archetype with most votes
    const winningArchetype = Object.keys(votes).reduce((a, b) => 
        votes[a] > votes[b] ? a : b
    );
    
    currentArchetype = winningArchetype;
    
    // Show email capture instead of results
    document.getElementById('assessment').style.display = 'none';
    document.getElementById('emailCapture').style.display = 'block';
    document.getElementById('emailCapture').scrollIntoView({ behavior: 'smooth' });
}

function submitEmail(event) {
    event.preventDefault();
    
    // Check for consent
    if (!document.getElementById('consentCheck').checked) {
        alert('Please confirm consent to continue');
        return;
    }
    
    const email = document.getElementById('emailInput').value;
    const archetype = archetypes[currentArchetype];
    
    // Create email content
    const subject = `Four Pillars Assessment: ${archetype.name} - ${email}`;
    const body = `New Four Pillars Assessment completed:

Email: ${email}
Timestamp: ${new Date().toLocaleString()}

ARCHETYPE: ${archetype.name}
Subtitle: ${archetype.subtitle}

Quote: "${archetype.quote}"

Description: ${archetype.description}

Recommended Next Steps: ${archetype.nextSteps}

---
This person has consented to follow-up contact about business growth opportunities.`;
    
    // Open default email client
    window.location.href = `mailto:cal@designingvalue.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Show results regardless of email client behavior
    showResults(currentArchetype);
}

function showResults(archetypeKey) {
    const archetype = archetypes[archetypeKey];
    
    document.getElementById('archetypeName').textContent = archetype.name;
    document.getElementById('archetypeSubtitle').textContent = archetype.subtitle;
    document.getElementById('archetypeQuote').textContent = archetype.quote;
    document.getElementById('archetypeDescription').textContent = archetype.description;
    document.getElementById('nextSteps').textContent = archetype.nextSteps;
    
    // Hide email capture and show results
    document.getElementById('emailCapture').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

function restartAssessment() {
    // Reset all radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.checked = false;
    });
    
    // Remove selected classes
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Reset button state
    document.getElementById('calculateBtn').classList.remove('active');
    
    // Reset email input
    document.getElementById('emailInput').value = '';
    
    // Reset current archetype
    currentArchetype = null;
    
    // Show assessment and hide everything else
    document.getElementById('assessment').style.display = 'block';
    document.getElementById('emailCapture').style.display = 'none';
    document.getElementById('results').style.display = 'none';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
