// index.html 用
if (document.getElementById('dispatchForm')) {
    document.getElementById('time').value = new Date().toLocaleString();

    document.getElementById('dispatchForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const record = {
            caseType: document.getElementById('caseType').value,
            caseCategory: document.getElementById('caseCategory').value,
            vehicle: document.getElementById('vehicle').value,
            person1: document.getElementById('person1').value,
            person2: document.getElementById('person2').value,
            status: document.getElementById('status').value,
            time: document.getElementById('time').value
        };

        let records = JSON.parse(localStorage.getItem('dispatchRecords')) || [];
        records.push(record);
        localStorage.setItem('dispatchRecords', JSON.stringify(records));

        const webhookURL = ""; // Discord Webhook
        if (webhookURL) {
            fetch(webhookURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: JSON.stringify(record, null, 2) })
            });
        }

        alert("紀錄已送出！");
        this.reset();
        document.getElementById('time').value = new Date().toLocaleString();
    });
}

// admin.html 用
if (document.getElementById('recordsTable')) {
    const records = JSON.parse(localStorage.getItem('dispatchRecords')) || [];
    const tableBody = document.getElementById('recordsTable');

    records.forEach(r => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${r.caseType}</td>
            <td>${r.caseCategory}</td>
            <td>${r.vehicle}</td>
            <td>${r.person1}</td>
            <td>${r.person2}</td>
            <td>${r.status}</td>
            <td>${r.time}</td>
        `;
        tableBody.appendChild(row);
    });
}
