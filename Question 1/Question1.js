document.getElementById('compare-btn').addEventListener('click', function () {
      const expectedText = document.getElementById('expected').value;
      const actualText = document.getElementById('actual').value;
      const resultList = document.getElementById('result');
      const validationMsg = document.getElementById('validation-msg');
 
      resultList.innerHTML = '';
      resultList.className = '';
      validationMsg.textContent = '';
 
      if (expectedText.trim() === '' && actualText.trim() === '') {
        validationMsg.textContent = 'Please enter text in both text areas before comparing.';
        return;
      }
 
      const expectedLines = expectedText.split('\n');
      const actualLines = actualText.split('\n');
 
      const differences = [];
 
      const maxLen = Math.max(expectedLines.length, actualLines.length);
 
      for (let i = 0; i < maxLen; i++) {
        const exp = expectedLines[i];
        const act = actualLines[i];
 
        if (exp !== act) {
          const li = document.createElement('li');
          li.textContent = `Line ${i + 1}:\n  < ${exp !== undefined ? exp : '(missing)'}\n  > ${act !== undefined ? act : '(missing)'}`;
          differences.push(li);
        }
      }
 
      if (expectedLines.length !== actualLines.length) {
        const li = document.createElement('li');
        li.textContent = `Lengths differ: < ${expectedLines.length}, > ${actualLines.length}`;
        differences.push(li);
      }
 
      if (differences.length > 0) {
        const headerLi = document.createElement('li');
        headerLi.textContent = 'Texts are different';
        resultList.appendChild(headerLi);
 
        differences.forEach(li => resultList.appendChild(li));
        resultList.className = 'change';
      } else {
        const li = document.createElement('li');
        li.textContent = 'No differences found';
        resultList.appendChild(li);
        resultList.className = 'nochange';
      }
    });
 
    document.getElementById('clear-btn').addEventListener('click', function () {
      document.getElementById('expected').value = '';
      document.getElementById('actual').value = '';
      document.getElementById('result').innerHTML = '';
      document.getElementById('result').className = '';
      document.getElementById('validation-msg').textContent = '';
    })