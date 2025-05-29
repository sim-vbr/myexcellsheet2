document.addEventListener('DOMContentLoaded', () => {
    const sheetBody = document.getElementById('sheet-body');
    const addRowButton = document.getElementById('add-row');
    const grandTotalElement = document.getElementById('grand-total');
    let rowCount = 0;
	
	// Define your predefined list of names
    const predefinedNames = ["Apple", "Banana", "Orange", "Grapes", "Mango", "Pineapple"];

    function calculateNetPrice(row) {
        const weightInput = row.querySelector('.weight');
        const priceInput = row.querySelector('.price');
        const netPriceCell = row.querySelector('.net-price');

        const weight = parseFloat(weightInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;

        const netPrice = weight * price;
        netPriceCell.textContent = netPrice.toFixed(2);
        return netPrice;
    }

    function updateGrandTotal() {
        let totalSum = 0;
        document.querySelectorAll('.net-price').forEach(cell => {
            totalSum += parseFloat(cell.textContent) || 0;
        });
        grandTotalElement.textContent = totalSum.toFixed(2);
    }

    function addRow() {
        rowCount++;
        const newRow = sheetBody.insertRow();
		
		// Create the options for the dropdown
        let nameOptionsHtml = '';
        predefinedNames.forEach(name => {
            nameOptionsHtml += `<option value="${name}">${name}</option>`;
        });
		
        newRow.innerHTML = `
            <td>${rowCount}</td>
            <td>
			 <select class="name">
                    ${nameOptionsHtml}
                </select>
			</td>
            <td><input type="number" class="weight" value="0" min="0" step="0.01"></td>
            <td><input type="number" class="price" value="0" min="0" step="0.01"></td>
            <td class="net-price">0.00</td>
            <td><span class="row-total">0.00</span></td>
			<td></td>
			<td></td>
        `;

        const weightInput = newRow.querySelector('.weight');
        const priceInput = newRow.querySelector('.price');
        const rowTotalSpan = newRow.querySelector('.row-total'); // Column F

        const updateRowCalculations = () => {
            const netPrice = calculateNetPrice(newRow);
            rowTotalSpan.textContent = netPrice.toFixed(2); // Column F gets Net Price
            updateGrandTotal();
        };

        weightInput.addEventListener('input', updateRowCalculations);
        priceInput.addEventListener('input', updateRowCalculations);

        // Initial calculation for the new row
        updateRowCalculations();
    }

    // Add an initial row when the page loads
    addRow();

    // Event listener for the "Add Row" button
    addRowButton.addEventListener('click', addRow);
});
