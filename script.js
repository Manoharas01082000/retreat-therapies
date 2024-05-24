const therapies = [
    {
        name: "Abhyanga(Single)",
        priceINR: 4600,
        priceUSD: 70
      },
      {
        name: "Synchronized Abhyanga",
        priceINR: 3900,
        priceUSD: 58
      },
      {
        name: "Choornapinda Swedana",
        priceINR: 3900,
        priceUSD: 58
      },
      {
        name: "Nasyam",
        priceINR: 3100,
        priceUSD: 46
      },
      {
        name: "Navarakizhi",
        priceINR: 6400,
        priceUSD: 95
      },
      {
        name: "Pizichil",
        priceINR: 6400,
        priceUSD: 95
      },
      {
        name: "Netratarpana",
        priceINR: 3100,
        priceUSD: 46
      },
      {
        name: "Shirodhara",
        priceINR: 3900,
        priceUSD: 58
      },
      {
        name: "Shirolepam",
        priceINR: 6400,
        priceUSD: 95
      },
      {
        name: "Shirovasty",
        priceINR: 6400,
        priceUSD: 95
      },
      {
        name: "Vamana",
        priceINR: 4600,
        priceUSD: 69
      },
      {
        name: "Patrapinda Swedana",
        priceINR: 3900,
        priceUSD: 58
      },
      {
        name: "Udwartana",
        priceINR: 3900,
        priceUSD: 58
      },
      {
        name: "Pichu",
        priceINR: 3100,
        priceUSD: 46
      },
      {
        name: "Kati vasty",
        priceINR: 3100,
        priceUSD: 46
      },
      {
        name: "Januvasty",
        priceINR: 3100,
        priceUSD: 46
      },
      {
        name: "Greevavasty",
        priceINR: 3100,
        priceUSD: 46
      },
      {
        name: "Urovasty",
        priceINR: 3100,
        priceUSD: 46
      },
      {
        name: "Lepam",
        priceINR: 3100,
        priceUSD: 46
      },
      {
        name: "Pichu/Lepam( More than 2 joints)",
        priceINR: 3900,
        priceUSD: 58
      },
      {
        name: "Takradhara",
        priceINR: 6400,
        priceUSD: 95
      },
      {
        name: "Ksheeradhara",
        priceINR: 6400,
        priceUSD: 95
      },
      {
        name: "ShatahwadiKizhi",
        priceINR: 3900,
        priceUSD: 58
      },
      {
        name: "Narangakizhi",
        priceINR: 3900,
        priceUSD: 58
      },
      {
        name: "MatraVasti",
        priceINR: 3100,
        priceUSD: 46
      },
      {
        name: "NiroohaVasti",
        priceINR: 4600,
        priceUSD: 69
      },
      {
        name: "DhanyamlaDhara/ Swedam",
        priceINR: 6400,
        priceUSD: 95
      },
      {
        name: "Shirobhyanga",
        priceINR: 2900,
        priceUSD: 43
      },
      {
        name: "Padabhyanga",
        priceINR: 2900,
        priceUSD: 43
      },
      {
        name: "Virechana",
        priceINR: 3100,
        priceUSD: 46
      },
      {
        name: "Snehapanam",
        priceINR: 3100,
        priceUSD: 46
      },
      {
        name: "Thalam",
        priceINR: 2100,
        priceUSD: 31
      },
      {
        name: "Karnapoorna",
        priceINR: 2100,
        priceUSD: 31
      }
      
];

let currentCurrency = 'INR';
let selectedTherapies = [];

function selectCurrency(currency) {
    currentCurrency = currency;
    localStorage.setItem('currency', currency);
    window.location.href = 'prices.html';
}

function loadPrices() {
    currentCurrency = localStorage.getItem('currency');
    const menuDiv = document.getElementById('menu');
    menuDiv.innerHTML = '';
    therapies.forEach((therapy, index) => {
        const price = currentCurrency === 'INR' ? therapy.priceINR : therapy.priceUSD;
        menuDiv.innerHTML += `
            <div>
                <label>${therapy.name} - ${price} ${currentCurrency}</label>
                <input type="checkbox" name="therapy${index}" value="${index}">
            </div>
        `;
    });
}

function saveTherapies(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('therapyForm'));
    selectedTherapies = [];
    formData.forEach((value, key) => {
        const index = parseInt(value);
        selectedTherapies.push({
            ...therapies[index],
            price: currentCurrency === 'INR' ? therapies[index].priceINR : therapies[index].priceUSD
        });
    });
    localStorage.setItem('selectedTherapies', JSON.stringify(selectedTherapies));
    window.location.href = 'therapies.html';
}

function loadTherapies() {
    selectedTherapies = JSON.parse(localStorage.getItem('selectedTherapies'));
    const quantitiesDiv = document.getElementById('quantities');
    quantitiesDiv.innerHTML = '';
    selectedTherapies.forEach((therapy, index) => {
        quantitiesDiv.innerHTML += `
            <div>
                <label>${therapy.name} - ${therapy.price} ${currentCurrency}</label>
                <input type="number" name="quantity${index}" min="0" placeholder="Quantity">
            </div>
        `;
    });
}

function calculateTotal(event) {
    event.preventDefault();
    let total = 0;
    const formData = new FormData(document.getElementById('quantityForm'));
    selectedTherapies.forEach((therapy, index) => {
        const quantity = parseInt(formData.get(`quantity${index}`)) || 0;
        therapy.quantity = quantity;
        therapy.total = therapy.price * quantity;
        total += therapy.total;
    });
    localStorage.setItem('total', total);
    localStorage.setItem('selectedTherapies', JSON.stringify(selectedTherapies));
    window.location.href = 'total.html';
}

function loadSummary() {
    selectedTherapies = JSON.parse(localStorage.getItem('selectedTherapies'));
    const total = localStorage.getItem('total');
    const summaryTable = document.getElementById('summaryTable');
    const netTotalDiv = document.getElementById('netTotal');
    summaryTable.innerHTML = '<tr><th>Therapy</th><th>Price</th><th>Quantity</th><th>Total</th></tr>';
    selectedTherapies.forEach(therapy => {
        summaryTable.innerHTML += `<tr><td>${therapy.name}</td><td>${therapy.price}</td><td>${therapy.quantity}</td><td>${therapy.total}</td></tr>`;
    });
    netTotalDiv.innerHTML = `Net Total: ${total} ${currentCurrency}`;
}

function printSummary() {
    fetch('/generate-pdf', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ therapies: selectedTherapies, total: localStorage.getItem('total') })
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Summary.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.endsWith('prices.html')) {
        loadPrices();
    } else if (path.endsWith('therapies.html')) {
        loadTherapies();
    } else if (path.endsWith('total.html')) {
        loadSummary();
    }
});
