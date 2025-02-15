function toggleHeightInput() {
    const unit = document.getElementById('heightUnit').value;
    const cmGroup = document.getElementById('cmGroup');
    const feetGroup = document.getElementById('feetGroup');
    
    if (unit === 'cm') {
        cmGroup.style.display = 'block';
        feetGroup.style.display = 'none';
    } else {
        cmGroup.style.display = 'none';
        feetGroup.style.display = 'block';
    }
}

function calculateHeartRate() {
    const age = document.getElementById('age').value;
    if (!age || age < 1 || age > 120) {
        alert('Please enter a valid age between 1 and 120');
        return;
    }
    
    const maxHR = 220 - age;
    const zones = {
        moderate: [(maxHR * 0.64).toFixed(0), (maxHR * 0.76).toFixed(0)],
        vigorous: [(maxHR * 0.77).toFixed(0), (maxHR * 0.93).toFixed(0)]
    };
    
    document.getElementById('heartRateResult').innerHTML = `
        <p>Your maximum heart rate: <strong>${maxHR} BPM</strong></p>
        <p>Training zones:</p>
        <ul>
            <li>Moderate intensity: ${zones.moderate[0]} - ${zones.moderate[1]} BPM</li>
            <li>Vigorous intensity: ${zones.vigorous[0]} - ${zones.vigorous[1]} BPM</li>
        </ul>
    `;
}

function getHeightInCm() {
    const unit = document.getElementById('heightUnit').value;
    if (unit === 'cm') {
        return parseFloat(document.getElementById('heightCm').value);
    } else {
        const feet = parseFloat(document.getElementById('heightFeet').value) || 0;
        const inches = parseFloat(document.getElementById('heightInches').value) || 0;
        return (feet * 12 + inches) * 2.54;
    }
}

function calculateIdealWeight() {
    const heightCm = getHeightInCm();
    const gender = document.getElementById('gender').value;
    
    if (!heightCm || heightCm < 100 || heightCm > 250) {
        alert('Please enter a valid height between 100-250 cm or 3\'3"-8\'2"');
        return;
    }

    const heightInInches = heightCm / 2.54;
    let baseWeight;
    if (gender === 'male') {
        baseWeight = 106 + 6 * (heightInInches - 60);
    } else {
        baseWeight = 100 + 5 * (heightInInches - 60);
    }
    
    const idealWeightKg = (baseWeight / 2.2).toFixed(1);
    const idealWeightLbs = baseWeight.toFixed(1);
    const range = {
        minKg: (idealWeightKg * 0.9).toFixed(1),
        maxKg: (idealWeightKg * 1.1).toFixed(1),
        minLbs: (baseWeight * 0.9).toFixed(1),
        maxLbs: (baseWeight * 1.1).toFixed(1)
    };

    document.getElementById('weightResult').innerHTML = `
        <p>Your ideal weight range:</p>
        <ul>
            <li><strong>${range.minKg} - ${range.maxKg} kg</strong></li>
            <li><strong>${range.minLbs} - ${range.maxLbs} lbs</strong></li>
        </ul>
        <p>Note: This is a general guideline based on the Hamwi formula. Factors like body composition, muscle mass, and overall health should be considered.</p>
    `;
}
